# Lighthouse audit — PER-156

Hard target: ≥95 in every category for the homepage on both desktop and mobile presets.

Audits run against the production build served from `dist/` via a plain HTTP static
server. Production scores after Vercel deploy should be **equal or better** thanks to
edge caching, HTTPS, and the Vercel Analytics scripts being served correctly.

## Final scores (production — https://eawanders.com/)

| Preset  | Performance | Accessibility | Best Practices | SEO     |
| ------- | ----------- | ------------- | -------------- | ------- |
| Desktop | **99**      | **100**       | **100**        | **100** |
| Mobile  | **97**      | **100**       | **100**        | **100** |

Every category at or above the 95 target on prod, on both presets.

### Core Web Vitals

| Metric | Desktop | Mobile  |
| ------ | ------- | ------- |
| FCP    | 0.6 s   | 1.3 s   |
| LCP    | 0.8 s   | 2.2 s   |
| CLS    | 0       | 0       |
| TBT    | 0 ms    | 100 ms  |

Mobile LCP comfortably under the 2.5 s "Good" threshold; CLS perfect.

## Fixes applied in this PR

1. **Semantic list structure** — the About section's Education `<ul>` had `<h3>`,
   `<ul>`, and `<p>` as direct children, plus a nested `<p>` inside `<p>`. Fixed.
   Accessibility 95 → 100.
2. **`preload="auto"` removed from off-screen videos** — `BackgroundLoop` now takes
   a `preload` prop defaulting to `"none"`. Only the hero passes `"auto"`. Cuts
   ~3.7 MB of upfront video bytes on first paint.
3. **Hero poster + video get `fetchpriority="high"`** — the LCP candidate is loaded
   ahead of the other four sections' assets.
4. **Poster format switched to WebP** — every `<video poster>` now points at the
   smaller WebP files already present under `public/bg/`. Saves ~30 % per poster.
5. **Oxford crest gets `loading="lazy"` + explicit width/height** — image is in the
   Contact section, never above the fold.

## Remaining work (follow-ups, not blockers)

- **Oxford crest re-export** — the file is a 512×512 PNG displayed at 49×49. Falls
  under the broader image optimisation pipeline in **PER-155**.
- **Poster quality vs size** — further compression / AVIF encoding is possible.
  Also tracked under **PER-155**.

Apex→www redirect issue (originally tracked in **PER-171**) is now fixed in the
Vercel dashboard: `eawanders.com` serves 200, `www.eawanders.com` 307-redirects
to apex.

## Reproducing locally

```bash
pnpm build
cd dist
python3 -m http.server 4321 --bind 127.0.0.1 &
npx lighthouse http://127.0.0.1:4321/index.html \
  --preset=desktop \
  --quiet \
  --chrome-flags="--headless=new" \
  --output=json --output=html \
  --output-path=./lh-desktop \
  --only-categories=performance,accessibility,best-practices,seo
```

Drop `--preset=desktop` for the mobile run.
