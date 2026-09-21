/* Tailwind (CDN) theme — brand colours and fonts shared by every page. */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#1F3864', 50: '#EEF2F9', 100: '#D9E1F0', 700: '#1A2F55', 900: '#111F3A' },
        accent: { DEFAULT: '#2E74B5', 50: '#EAF3FB', 100: '#D3E6F6', 600: '#25629B' }
      },
      fontFamily: {
        // Inter has no Bengali glyphs, so Bangla falls through to Noto Sans Bengali
        // while Latin letters and digits stay in Inter.
        sans: ['Inter', '"Noto Sans Bengali"', 'system-ui', 'sans-serif'],
        bn: ['"Noto Sans Bengali"', 'Inter', 'sans-serif']
      },
      boxShadow: {
        card: '0 1px 2px rgba(31,56,100,.06), 0 4px 16px rgba(31,56,100,.06)',
        lift: '0 10px 30px -10px rgba(31,56,100,.35)'
      }
    }
  }
};
