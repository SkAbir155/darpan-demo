/* =====================================================================
   দর্পণ — optional FASHN relay (Cloudflare Worker, free plan is enough)
   ---------------------------------------------------------------------
   Keeps the FASHN API key on the server so visitors never need one.
   Setup:
     1. dash.cloudflare.com → Workers & Pages → Create → "Hello World" worker
     2. Replace its code with this file, then Deploy.
     3. Settings → Variables and Secrets → add secret FASHN_API_KEY.
     4. On the Darpan site: AI সেটিংস → Advanced → Proxy URL =
        https://<your-worker>.workers.dev   (leave the key empty)
   Only /run and /status/:id are forwarded, and only for ALLOWED_ORIGINS.
   ===================================================================== */

const FASHN = 'https://api.fashn.ai/v1';
const ALLOWED_ORIGINS = ['https://skabir155.github.io'];

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const cors = {
      'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin'
    };
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (!ALLOWED_ORIGINS.includes(origin)) return new Response('Forbidden', { status: 403, headers: cors });

    const path = new URL(request.url).pathname;
    const isRun = request.method === 'POST' && path === '/run';
    const isStatus = request.method === 'GET' && /^\/status\/[\w-]+$/.test(path);
    if (!isRun && !isStatus) return new Response('Not found', { status: 404, headers: cors });

    const upstream = await fetch(FASHN + path, {
      method: request.method,
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + env.FASHN_API_KEY },
      body: isRun ? await request.text() : undefined
    });
    return new Response(upstream.body, {
      status: upstream.status,
      headers: Object.assign({ 'Content-Type': 'application/json' }, cors)
    });
  }
};
