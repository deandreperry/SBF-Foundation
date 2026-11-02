(() => {
  const frame = document.getElementById('resource-preview-frame');
  const buttons = [...document.querySelectorAll('[data-resource-section]')];
  if (!frame) return;
  let selected = 0;

  function showSection() {
    const doc = frame.contentDocument;
    const section = doc?.querySelectorAll('.resource-section')[selected];
    if (!section) return;
    frame.contentWindow.scrollTo({
      top: section.getBoundingClientRect().top + frame.contentWindow.scrollY - 24,
      behavior: 'instant',
    });
    frame.title = `Interactive preview of ${buttons[selected].textContent.toLowerCase()} in the SBF Resource Center`;
  }

  frame.addEventListener('load', async () => {
    await frame.contentDocument?.fonts?.ready;
    showSection();
  });
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      selected = index;
      buttons.forEach((item, i) => item.setAttribute('aria-pressed', String(i === index)));
      showSection();
    });
  });
  if (frame.contentDocument?.readyState === 'complete') showSection();
})();
