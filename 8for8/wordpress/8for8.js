// Paste into the page's JavaScript field without <script> tags.
// Loads the official Zeffy embed and provides its iframe fallback.
(() => {
  function initCampaign() {
    const page = document.querySelector('.sbf-campaign-page');
    const embed = page && page.querySelector('[data-zeffy-embed]');
    if (!embed || embed.dataset.sbfInitialized) return;
    embed.dataset.sbfInitialized = 'true';

    function labelFrames() {
      embed.querySelectorAll('iframe').forEach(frame => {
        if (!frame.title) frame.title = 'Anniversary campaign donation form powered by Zeffy';
      });
    }
    labelFrames();
    new MutationObserver(labelFrames).observe(embed, { childList: true, subtree: true });

    function showFallback() {
      page.querySelectorAll('[data-zeffy-embed-fallback]').forEach(element => {
        element.style.display = 'block';
        element.querySelectorAll('iframe[data-zeffy-embed-src]').forEach(frame => {
          frame.src = frame.getAttribute('data-zeffy-embed-src');
        });
      });
    }

    const source = 'https://www.zeffy.com/embed/v2/zeffy-embed.js';
    const existingScript = document.querySelector('script[src="' + source + '"]');
    if (existingScript) {
      existingScript.addEventListener('error', showFallback, { once: true });
      return;
    }
    const script = document.createElement('script');
    script.src = source;
    script.addEventListener('error', showFallback, { once: true });
    document.body.appendChild(script);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCampaign, { once: true });
  } else {
    initCampaign();
  }
})();
