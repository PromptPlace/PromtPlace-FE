import { useEffect } from 'react';

const GTMScript = () => {
  useEffect(() => {
    if (import.meta.env.MODE !== 'production') return;

    // Google Tag Manager
    const script = document.createElement('script');
    script.innerHTML = `
        (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, 'script', 'dataLayer', '${import.meta.env.VITE_GTM_ID}');
    `;
    document.head.appendChild(script);

    // Google Tag Manager (noscript)
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${import.meta.env.VITE_GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    document.body.appendChild(noscript);

    return () => {
      document.head.removeChild(script);
      document.body.removeChild(noscript);
    };
  }, []);

  return null;
};

export default GTMScript;
