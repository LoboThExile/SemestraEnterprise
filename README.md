# Semestra Enterprise

Official website repository for Semestra Enterprise (SMK Pantai Sepang Putra) under the JA Malaysia Young Enterprise Program 2026.

- **School:** SMK Pantai Sepang Putra
- **Website:** https://lobothexile.github.io/SemestraEnterprise/
- **JA Mall Store:** https://jamalaysia.org.my/JAMall/semestraenterprise/
- **Instagram:** @semestraenterprise
- **Contact:** 011-2828 2939 / semestraenterprise@gmail.com

## Products

- Malaysian Heritage Match — flagship educational card game (RM 55)
- PipeCleaner Flowers (RM 15)
- Handmade Hairclips (RM 4)
- Pixel-Art Heritage Keychains (RM 4)

Product data lives in one place, `docs/script.js` (`products`), and is rendered
into the homepage, catalogue and product detail page. Prices and product
details in the HTML cards should stay in sync with that list.

## Site structure

All published pages live in `docs/` (the GitHub Pages source):

- `docs/index.html` — homepage
- `docs/products.html` — catalogue, search and category filters
- `docs/product.html` — single product detail, driven by `?id=`
- `docs/about.html`, `docs/faq.html`, `docs/contact.html`, `docs/privacy.html`
- `docs/404.html` — branded not-found page for GitHub Pages
- `docs/style.css` — shared design system (light / dark / system themes)
- `docs/script.js` — shared theme, product rendering, order modal, FAQ and forms
- `docs/assets/` — images and icons
- `docs/sitemap.xml`, `docs/robots.txt` — search-engine files

## Run it locally

No build step is needed — this is a static site. From the repository root:

```bash
cd docs
python3 -m http.server 8000
```

Then open http://localhost:8000/ . Serving over HTTP (rather than opening
the files directly) keeps relative links, images and scripts working as they
do on GitHub Pages.

A quick sanity check before opening a pull request:

```bash
node --check docs/script.js
```

## Sales status

Ordering is currently halted site-wide. That is controlled by one flag at the
top of `docs/script.js`:

```js
var SALES_HALTED = 'yes';
```

Set it to `'no'` only when the team is ready to accept orders again — it
updates the banners, product buttons and order modal across every page.
Do not remove the halted handling when editing the order flow.

## Contact / ordering

Orders and inquiries go through the JA Mall storefront, WhatsApp
(011-2828 2939) or email (semestraenterprise@gmail.com). The site itself
does not process payments.
