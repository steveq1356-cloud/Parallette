# FORM — Portable Parallettes

A luxury product website for FORM portable parallettes. Pure HTML, CSS, and vanilla JavaScript — no build tools, no dependencies (except Google Fonts).

## Project structure

```
parallette/
├── index.html          # Main page
├── css/
│   └── style.css       # All styles
├── js/
│   └── main.js         # Configurator + checkout logic
├── images/
│   └── product-hero.png
└── README.md
```

## Running locally

Just open `index.html` in a browser — no server required.

For the best experience, serve it with a local server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying to GitHub Pages

1. Push this folder to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to `main` branch, `/ (root)` folder
4. Your site will be live at `https://<username>.github.io/<repo-name>`

## Customizing

- **Prices:** Edit `data-price` attributes on `.size-btn` elements in `index.html`
- **Colors:** Update `.color-btn` elements and their `data-color` / `--c` values
- **Photos:** Replace files in `/images/` — add lifestyle shots to the gallery placeholders
- **Specs:** Edit the `.spec-row` entries in the specs section
- **Copy:** All text is in `index.html` — no external CMS

## Adding real payments

The checkout form is a demo UI. To take real payments, integrate [Stripe Checkout](https://stripe.com/docs/checkout/quickstart) — replace the `submitOrder` function in `main.js` with a call to your Stripe payment link or backend endpoint.

## Photo placeholders

The gallery section has three placeholder slots for lifestyle photos. Replace the `.gallery-placeholder` divs with `<img>` tags pointing to your photos.
