import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const root = new URL('./', import.meta.url);
const data = JSON.parse(readFileSync(new URL('coverage.json', root), 'utf8'));
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const categories = ['All', 'TV & Video', 'News', 'Interviews', 'Podcasts', 'Community Features'];
const seen = new Set();
for (const item of data) {
  if (seen.has(item.url) || !categories.includes(item.type) || new URL(item.url).protocol !== 'https:') throw new Error('Invalid or duplicate coverage: ' + item.title);
  seen.add(item.url);
}
const arrow = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const butterfly = '<svg class="press-butterfly" viewBox="0 0 200 160" aria-hidden="true"><path d="M100 82C45-14 2 6 20 62c10 29 49 35 80 20Zm0 0c55-96 98-76 80-20-10 29-49 35-80 20Zm0 0c-73-8-74 67-35 58 19-4 26-28 35-58Zm0 0c73-8 74 67 35 58-19-4-26-28-35-58Zm0-12v65" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>';
function card(item, featured = false, i = 0) {
  const date = item.date ? '<time datetime="' + item.date + '">' + new Date(item.date + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }) + '</time>' : '';
  const cats = [item.type, ...(item.id === 'coverage-6' ? ['News'] : []), ...(item.id === 'coverage-21' ? ['TV & Video'] : [])];
  const link = item.unavailable
    ? '<p class="press-availability">The original feature is currently unavailable.</p><a class="press-story-link" href="mailto:press@mysbf.org?subject=' + encodeURIComponent('Coverage inquiry: ' + item.title) + '" aria-label="' + esc('Ask about this feature: ' + item.title) + '">Ask About This Feature ' + arrow + '</a>'
    : '<a class="press-story-link" href="' + esc(item.url) + '" target="_blank" rel="noopener noreferrer" aria-label="' + esc(item.cta + ': ' + item.title + ' — ' + item.outlet + ' (opens in a new tab)') + '">' + esc(item.cta) + arrow + '</a>';
  return '<article class="press-card' + (featured ? ' press-feature press-tone-' + i : '') + '"' + (!featured ? ' data-categories="' + esc(cats.join('|')) + '"' : '') + '>' +
    (featured ? '<div class="press-visual" aria-hidden="true">' + butterfly + '<span>' + esc(item.outlet) + '</span><small>' + esc(item.type) + '</small></div>' : '') +
    '<div class="press-card-body"><div class="press-meta"><span>' + esc(item.type) + '</span>' + date + '</div><p class="press-outlet">' + esc(item.outlet) + '</p><h3>' + esc(item.title) + '</h3>' + link + '</div></article>';
}
let html = readFileSync(new URL('page.template.html', root), 'utf8');
html = html.replace('<!-- FEATURED -->', data.filter(x => x.featured).map((x,i) => card(x,true,i)).join('\n'))
 .replace('<!-- FILTERS -->', categories.map((c,i) => '<button type="button" data-filter="' + esc(c) + '" aria-pressed="' + (i === 0) + '" aria-controls="coverage-grid">' + esc(c) + '</button>').join('\n'))
 .replace('<!-- COVERAGE -->', data.map(x => card(x)).join('\n'))
 .replaceAll('{{COUNT}}', data.length);
writeFileSync(new URL('index.html', root), html);
// Paste-ready exports for editors with separate HTML, CSS and JavaScript slots.
// Keep document metadata in the host CMS settings, not inside its content slot.
const slots = new URL('slots/', root);
mkdirSync(slots, { recursive: true });
const content = html.match(/<body class="sbf-press-page">([\s\S]*?)<\/body>/)[1].trim();
writeFileSync(new URL('press.html', slots), '<div class="sbf-press-page">\n' + content + '\n</div>\n');
writeFileSync(new URL('press.css', slots), readFileSync(new URL('styles.css', root), 'utf8'));
writeFileSync(new URL('press.js', slots), readFileSync(new URL('filters.js', root), 'utf8'));
console.log('Built ' + fileURLToPath(new URL('index.html', root)) + ': ' + data.length + ' unique stories.');
