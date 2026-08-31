# Social Butterflies Foundation website pages

This repository collects the editable HTML and CSS pages prepared for Social Butterflies Foundation (SBF), a 501(c)(3) nonprofit supporting people impacted by lupus and fibromyalgia.

## Pages

| Page | Local path |
| --- | --- |
| Home | `/index.html` |
| About | `/about/index.html` |
| Programs | `/programs/index.html` |
| Resource Center | `/resources/index.html` |
| Contact | `/contact/index.html` |
| Get Involved | `/get-involved/index.html` |
| DMV Plates | `/dmv-plates/index.html` |
| Custom Apparel | `/custom-apparel/index.html` |

Each page keeps its stylesheet beside its HTML file. Some images, downloads, forms, and store links are intentionally loaded from the live SBF website or the nonprofit's external services.

## Preview locally

From this repository folder, run:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## Editing workflow

1. Create a branch for the change.
2. Edit the relevant `index.html` and `styles.css` files.
3. Preview the changed page locally at the matching route.
4. Commit the change with a short description.
5. Open a pull request before updating the live nonprofit website.

## Current scope

These are static page implementations. They do not include the WordPress theme, plugins, WooCommerce data, forms backend, media library, or the live site's administrative configuration.
