# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static portfolio site for a Korean UX/UI · web · graphic designer ("BKLimpf"), live at https://www.bklimportfolio.com/ (originally migrated from Wix). Plain HTML/CSS/vanilla JS: no package.json, no build step, no external JS libraries. The 2026-11 renewal added motion (hero intro, cursor trail, grid focus hover, detail-page reveals); its design and plan live in `docs/superpowers/specs/` and `docs/superpowers/plans/`.

## Commands

- Dev server: `python -m http.server 8080` in the repo root, then open `http://localhost:8080/index.html`.
- Tests: `python -I tests/smoke.py` (all) or `python -I tests/smoke.py test_hero_intro` (one). It serves the repo on port 8765 and drives Chromium through Python Playwright. Pillow is also used. There is no pytest; `smoke.py` has its own runner.
- Deploy: Vercel (`vercel --yes`), project `bklimpf-portfolio` linked via `.vercel/`. `.vercelignore` excludes the migration helper files.
- The live site can be ahead of this repo. Before large changes, compare it with the local files (e.g. `curl https://www.bklimportfolio.com/data.js`). The renewal started by importing the live files for that reason.

## Architecture

Two pages share one data file; there is no routing or framework.

- `data.js` is the single source of truth, loaded first on both pages as plain globals:
  - `imageUrls[]` — grid thumbnails
  - `backButtonHtml` — shared "back to list" snippet
  - `projectsData[]` — `{ title, htmlContent }`. `htmlContent` is a template literal of HTML embedding `${backButtonHtml}`. Backticks or `${` inside it must stay escaped correctly.
- **Index/detail pairing is positional**: `imageUrls[i]` ↔ `projectsData[i]` ↔ `project.html?id=i`. Adding or reordering a project means editing both arrays at the same index. The detail-page count ("08 / 20") is computed from array length, never hard-coded.
- `index.html` loads scripts in this order: `data.js` → `hero.js` → `script.js` → `reveal.js`.
  - `hero.css` / `hero.js`: the hero.
    - The intro flies a line along the logo's arrow shaft and reveals the logo with `clip-path` in sync. The shaft centre is 49.13% of the logo artwork height, measured from the 2000×1035 original.
    - After the intro: cursor light, a thumbnail trail (at most one per 350 ms, max 3 visible) and a custom cursor. All of these are disabled on `(pointer: coarse)`.
    - `body.home` turns the header into a transparent overlay until the hero is scrolled past.
  - `script.js`: builds the 5-column square grid as `<a>` tiles with the focus hover.
    - On a plain left click it opens a white `.grid-trans` panel from the tile's rect (clip-path, thumbnail dissolving inside), then navigates after 760 ms. The detail page continues on the same white.
    - Modified clicks (Ctrl, middle click, etc.) navigate normally. `pageshow` removes the panel on back/forward.
  - `reveal.js`: shared IntersectionObserver that adds `.in` to `[data-reveal]` elements, with stagger from CSS var `--i`. Also used by About and the detail page.
- `project.html` + `project.js` + `project-detail.css`:
  - `project.js` validates `?id` (`/^\d+$/`) and injects `htmlContent`. Its own `.project-title-bar` stays hidden by CSS, so there is no title block above the images (the user removed it: serif headings did not fit).
  - It also marks images and text blocks for reveal, drives the top progress bar, and builds the prev/next side nav (wraps around).
  - Per-project CSS (`.chrono-page`, `.vl-project-page`, `.gransaga-sns-page`, AI-project sections) assumes full-width images, so don't constrain image width globally.

## Design rules (from the user's feedback during the renewal)

- Keep the original light warm-grey hero background and the original brown logo image. No colour changes to the logo. The user rejected strong gradients, gold tones and a black background.
- Logo must stay crisp. The hero uses `srcset` with `assets/logo-1000.png` / `assets/logo-2000.png`, so wide Retina screens get the 2000px original. The header uses `assets/logo-160.png`. Never apply 3D transforms, blur or opacity animation to the logo.
- No milky/blurry effects. Dim with a dark veil, not transparency. Blur is only used briefly (2px, 0.4s) on hero trail thumbnails.
- Easing: enter `cubic-bezier(.16,1,.3,1)`, exit `cubic-bezier(.4,0,.2,1)`. No bounce or overshoot.
- Palette: bg `#ccc8c2`/`#e6e2dc`, ink `#3e3431`/`#4f4540`, muted `#857870`, button `#4B3D39` (hover `#2f2523`).
- Only hard-code text that appears outside portfolio images. Text baked into images stays in the image.
- No serif (명조) headings on the detail page or above the grid. The user removed them.
- Respect `prefers-reduced-motion` (show final states immediately).
