// Zeffy's v2 script creates an iframe without a title. Label the outer frame
// without accessing its cross-origin document or changing payment behavior.
(() => {
  const root = document.querySelector('.sbf-campaign-page [data-zeffy-embed]');
  if (!root) return;
  const labelFrames = () => {
    root.querySelectorAll('iframe').forEach(frame => {
      if (!frame.title) frame.title = 'Anniversary campaign donation form powered by Zeffy';
    });
  };
  labelFrames();
  new MutationObserver(labelFrames).observe(root, { childList: true, subtree: true });
})();
