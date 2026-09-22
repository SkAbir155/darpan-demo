/* =====================================================================
   দর্পণ — free AI virtual try-on (IDM-VTON on Hugging Face)
   ---------------------------------------------------------------------
   Model: IDM-VTON, an open-source try-on model, running on the public
   Hugging Face Space "yisol/IDM-VTON". It is free, needs no account and
   no API key, and is called straight from the browser with the official
   Gradio JS client.

   Being a free shared service it can be busy, queue requests, or hit its
   daily GPU limit — callers should fall back to the demo result on error.
   TODO: for production, host the model (or a paid API) behind our own server.
   ===================================================================== */

window.DarpanAI = (function () {
  'use strict';

  const SPACE = 'yisol/IDM-VTON';
  const CLIENT_URL = 'https://cdn.jsdelivr.net/npm/@gradio/client@2.7.0/dist/index.min.js';
  const SITE_URL = 'https://skabir155.github.io/darpan-demo/'; // fallback for product photos when opened from file://
  const TIMEOUT_MS = 150000;
  // Long side of the uploaded photo. The Space crops/resizes internally and
  // returns an image the same size as the one we send, so before/after line up.
  const MAX_SIDE = 1024;

  let clientPromise = null;
  let currentJob = null;

  /* ---------------------------- connection ---------------------------- */
  function connect() {
    if (!clientPromise) {
      clientPromise = import(CLIENT_URL)
        .then((lib) => lib.Client.connect(SPACE, { events: ['data', 'status'] }))
        .catch((err) => { clientPromise = null; throw err; });
    }
    return clientPromise;
  }

  // Start connecting as soon as a product page opens, so "Try on" feels instant.
  function warmUp() {
    connect().catch(() => { /* retried when the customer actually tries on */ });
  }

  /* ------------------------------ images ------------------------------ */
  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const im = new Image();
      im.onload = () => resolve(im);
      im.onerror = () => reject(new Error('image-load'));
      im.src = src;
    });
  }

  function canvasToBlob(canvas) {
    return new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.9));
  }

  /** Customer's gallery photo → resized JPEG { blob, dataUrl, width, height } (shape kept). */
  async function fileToJpeg(file) {
    if (!file || !/^image\//.test(file.type)) throw new Error('bad-file');
    const url = URL.createObjectURL(file);
    try {
      const im = await loadImage(url);
      const scale = Math.min(1, MAX_SIDE / Math.max(im.naturalWidth, im.naturalHeight));
      const c = document.createElement('canvas');
      c.width = Math.round(im.naturalWidth * scale);
      c.height = Math.round(im.naturalHeight * scale);
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.drawImage(im, 0, 0, c.width, c.height);
      return { blob: await canvasToBlob(c), dataUrl: c.toDataURL('image/jpeg', 0.85), width: c.width, height: c.height };
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  async function dataUrlToBlob(dataUrl) {
    return (await fetch(dataUrl)).blob();
  }

  /** Product photo from /Images → JPEG blob (served as image/pjpeg, so re-label it). */
  async function garmentBlob(src) {
    let res;
    try {
      res = await fetch(src);
      if (!res.ok) throw new Error('HTTP ' + res.status);
    } catch (e) {
      res = await fetch(SITE_URL + src); // file:// can't fetch local files
    }
    return new Blob([await res.arrayBuffer()], { type: 'image/jpeg' });
  }

  /* ------------------------------ try-on ------------------------------ */
  /**
   * @param {{person: Blob, garment: Blob, description: string, onStatus?: Function}} opts
   *   onStatus receives { stage: 'connecting' | 'queue' | 'processing', position?, eta? }
   * @returns {Promise<string>} URL of the generated image (same size as the person photo).
   */
  async function tryOn(opts) {
    const onStatus = opts.onStatus || function () {};
    onStatus({ stage: 'connecting' });
    const client = await connect();
    const lib = await import(CLIENT_URL);

    const job = client.submit('/tryon', {
      dict: { background: lib.handle_file(opts.person), layers: [], composite: null },
      garm_img: lib.handle_file(opts.garment),
      garment_des: opts.description || 'garment',
      is_checked: true,       // auto-detect where the clothes are on the person
      is_checked_crop: true,  // let the Space crop to 3:4 and paste the result back at full size
      denoise_steps: 30,
      seed: 42
    });
    currentJob = job;

    let timer;
    const timeout = new Promise((_, reject) => {
      timer = setTimeout(() => { job.cancel(); reject(new Error('timeout')); }, TIMEOUT_MS);
    });

    const run = (async () => {
      for await (const msg of job) {
        if (msg.type === 'status') {
          if (msg.stage === 'error') throw new Error(msg.message || 'AI error');
          if (msg.original_msg === 'process_starts' || msg.stage === 'generating') {
            onStatus({ stage: 'processing', eta: msg.eta });
          } else if (msg.queue && typeof msg.position === 'number') {
            onStatus(msg.position > 0 ? { stage: 'queue', position: msg.position, eta: msg.eta } : { stage: 'processing', eta: msg.eta });
          }
        }
        if (msg.type === 'data') {
          const out = msg.data && msg.data[0];
          const url = out && (out.url || out);
          if (!url) throw new Error('Empty result');
          return url;
        }
      }
      throw new Error('No result');
    })();

    run.catch(() => {}); // if the timeout wins, ignore the late failure
    try {
      return await Promise.race([run, timeout]);
    } finally {
      clearTimeout(timer);
      currentJob = null;
    }
  }

  function cancel() {
    if (currentJob) currentJob.cancel();
    currentJob = null;
  }

  return { warmUp, fileToJpeg, dataUrlToBlob, garmentBlob, tryOn, cancel };
})();
