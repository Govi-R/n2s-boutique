# N2S Boutique Website

Static catalog site for N2S Boutique, a home-based boutique in the Prosper and Celina area of
Texas selling South Indian traditional wear.

Handpicked sarees and traditional wear for Prosper and Celina families.

## What this is

A statically generated catalog built with Next.js and deployed to GitHub Pages. Product data lives
in `data/products.csv` and is read at build time. Order requests are submitted through a hosted
form service that emails the boutique owner. No payment is taken online.

This is version 1 of the plan described in `docs/`. It deliberately does not include an admin
panel, inventory holds, or order status tracking. Those require a database and arrive in version 2.

## Project structure

```
n2s-boutique/
  data/
    products.csv        Single source of truth for the catalog
    SCHEMA.md           Column definitions and allowed values. Read this first.
  docs/                 Business specification and planning documents
  app/                  Next.js pages
  components/           Reusable UI components
  lib/                  CSV parsing and data helpers
  public/               Logo, favicon, static assets
```

## Getting started

Requires Node.js 18 or later.

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Adding products

1. Photograph items in batches of 20 to 30 with a consistent backdrop and lighting.
2. Upload the photos to the image host and copy the URLs.
3. Open `data/products.csv` in Excel or Google Sheets and add one row per item.
4. Follow `data/SCHEMA.md` exactly. Allowed values matter, since the filters depend on them.
5. Save as CSV, replacing `data/products.csv`.
6. Commit and push. The site rebuilds and deploys automatically.

Never commit image files to this repository. Store URLs only. See SCHEMA.md for the reasoning.

## Deployment

Pushing to the `main` branch triggers a GitHub Actions workflow that builds the static site and
publishes it to GitHub Pages. The custom domain n2sboutique.com is registered with Ionos and its
DNS points at GitHub Pages.

## What is out of scope in version 1

Online payments, tailoring services, customer accounts, product reviews, email newsletter,
languages other than English, automated delivery pricing, and shipping outside the local area.

Holding this line is what gets version 1 launched. See the specification in `docs/`.

## Upgrade path to version 2

This project is built with Next.js specifically so the same codebase can add API routes, a
Postgres database, an admin panel, and inventory holds without a rewrite. Three decisions protect
that path and should not be changed:

1. Images are hosted externally and referenced by URL, never stored in the repository.
2. `products.csv` uses fixed column names and value lists so it imports into a database unchanged.
3. `item_code` is permanent and never reused.
