# Holiday Outreach Program archive instructions

The 2026 application period has ended. The program must not appear in active navigation, homepage promotions, or application entry points.

## WordPress cleanup

1. Remove the Holiday Outreach Program menu item from desktop and mobile navigation.
2. Remove any Holiday Outreach application buttons or promotional blocks.
3. Configure a permanent **301 redirect** from both legacy paths to the Programs page:
   - `/holiday-outreach-program/` → `/programs/`
   - `/holiday-outreach/` → `/programs/`
4. Remove the page from any XML sitemap after the redirect is active.
5. Do not delete internal application records, historical submissions, or media assets.

If a server-side redirect cannot be configured immediately, use the fallback WordPress HTML in `wordpress/holiday-outreach.html`. It contains no application link and directs visitors to current programs.

The standalone `index.html` files use a client-side redirect only for local/static preview. A server-side 301 is preferred for the live WordPress site.
