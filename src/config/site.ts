// Single source of truth for site-wide SEO defaults. Keep this in sync
// with `astro.config.mjs` `site` and the JSON-LD block in `index.astro`.

export const site = {
  url: 'https://eawanders.com',
  name: 'Edward Anders',
  author: 'Edward Anders',
  // Title template used by `SEO.astro`. Pass `undefined` for the homepage
  // (no leading "Page title — " prefix).
  titleTemplate: (pageTitle?: string) =>
    pageTitle ? `${pageTitle} — Edward Anders` : 'Edward Anders',
  defaultDescription:
    'Edward Anders — DPhil candidate in Social Data Science at the Oxford Internet Institute, researching how AI-generated content shapes affective polarisation across democracies.',
  // PER-151 will replace this placeholder with a generated 1200×630 PNG.
  defaultOgImage: '/og-default.png',
  twitterHandle: '@edwardaw',
  locale: 'en_GB',
} as const;
