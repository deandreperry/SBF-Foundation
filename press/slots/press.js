(() => {
 function initializePressFilters() {
  const root = document.querySelector('.sbf-press-page');
  if (!root) return;
  const filters = root.querySelector('.press-filters');
  const cards = [...root.querySelectorAll('#coverage-grid [data-categories]')];
  const count = root.querySelector('#coverage-count');
  if (!filters || !cards.length || !count) return;
  if (filters.dataset.initialized === 'true') return;
  filters.dataset.initialized = 'true';
  filters.hidden = false;
  filters.addEventListener('click', event => {
    const button = event.target.closest('button[data-filter]');
    if (!button || !filters.contains(button)) return;
    const selected = button.dataset.filter;
    filters.querySelectorAll('button').forEach(control => control.setAttribute('aria-pressed', String(control === button)));
    let visible = 0;
    cards.forEach(card => {
      card.hidden = selected !== 'All' && !card.dataset.categories.split('|').includes(selected);
      if (!card.hidden) visible++;
    });
    count.textContent = visible + (visible === 1 ? ' story' : ' stories') + ' · ' + (selected === 'All' ? 'All coverage' : selected);
  });
 }
 if (document.readyState === 'loading') {
   document.addEventListener('DOMContentLoaded', initializePressFilters, { once: true });
 } else {
   initializePressFilters();
 }
})();
