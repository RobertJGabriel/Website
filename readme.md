# robertgabriel.ninja

The personal site of Robert James Gabriel — Irish software engineer and founder of
Helperbird. Bio, blog, work history, awards, and a few experiments.

Built as a static site with **Eleventy**, **Tailwind CSS v4**, and **DaisyUI**.
It works offline (service worker) and ships almost no JavaScript.

## Develop

```bash
npm install      # install dependencies
npm start        # Eleventy dev server with live reload → http://localhost:8080
npm run dev       # rebuild the JS bundle (webpack) then serve
npm run build    # production build → ./docs
npm run format   # Prettier
```

## How it fits together

- **Pages** live in `src/pages/` (`.liquid`, `.md`, `.html`). Markdown is mapped to
  Tailwind classes in `.eleventy.js`.
- **Layouts & partials** are in `src/_includes/templates/` — `base.html` and
  `blog.html` both pull in the shared `head.html` (all SEO/meta/Open Graph live
  there, so edit it once).
- **Theme** is defined in `src/assets/css/styles.css` (the custom DaisyUI "irish"
  theme). Eleventy compiles it to `docs/assets/css/engine.css` at build time.
- **JavaScript** is a single tiny entry point, `src/assets/js/index.js`, bundled by
  webpack to `docs/assets/js/main.bundle.js`. It only registers the service worker.
- **Offline**: `src/service-worker.js` precaches an app shell and serves
  same-origin requests stale-while-revalidate, with `/offline/` as a fallback.

## Content

### Add a blog post

Create `src/pages/blog/<slug>.md`:

```markdown
---
layout: templates/blog.html
title: Post Title
cardTitle: Post Title
description: One-sentence summary (used for SEO and social cards).
keywords: comma, separated, keywords
url: blog/<slug>/
tags: blog
date: 2026-01-15          # ISO date — powers sitemap + article schema
dated: January 15 2026    # human-friendly date shown on the page
img: /assets/images/blog/<slug>.png   # social/OG image
---

Content here…
```

### Add a page

Create a `.liquid` / `.html` file in `src/pages/` with front matter:
`layout: templates/base.html`, `title`, `description`, `keywords`.

Social cards use each page's `img` if set, otherwise a sensible default — no build
step or image generation required.

## Deploy

Pushing to `main` triggers `.github/workflows/webpack.yml`, which runs
`npm run build` and publishes `docs/` to the `gh-pages` branch. The custom domain
is set via `src/CNAME`.
