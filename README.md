# eawanders.com — personal website

Source for Edward Anders's personal site. Production live at https://eawanders.com.
Repo is named `eawanders.github.io` for historical reasons (it was previously
served by GitHub Pages); the `gh-pages` branch is retained as a static
meta-refresh redirect from `eawanders.github.io` → `eawanders.com` so old
links continue to resolve.

## Stack

- [Astro](https://astro.build) static site generator
- TypeScript (strict)
- pnpm
- Vanilla CSS (no framework — design tokens land in M2)
- Self-hosted on Vercel

## Local development

Requires Node `>=22.12.0` (see `.nvmrc`) and pnpm.

```bash
pnpm install
pnpm dev          # http://localhost:4321
pnpm build        # static output to ./dist
pnpm preview      # serve ./dist locally
pnpm format       # write Prettier formatting
pnpm format:check # CI-friendly check
```

## Deployment

| Branch     | Serves                             | Hosted by    | Notes                                             |
| ---------- | ---------------------------------- | ------------ | ------------------------------------------------- |
| `main`     | https://eawanders.com (production) | Vercel       | Project: `eawanders-projects/eawanders-github-io` |
| `gh-pages` | https://eawanders.github.io        | GitHub Pages | Static redirect to https://eawanders.com          |

Vercel auto-deploys on push to `main` and creates preview deployments for every PR.

## Analytics

Vercel Web Analytics and Speed Insights are mounted on every page. Both are
cookieless and use anonymised aggregate data, so no consent banner is
required under GDPR.

Dashboards live in the Vercel project under **Analytics** (pageviews,
referrers, top pages) and **Speed Insights** (Core Web Vitals — CLS, LCP,
INP).

Custom events:

| Event          | Where it fires                                            | Properties      |
| -------------- | --------------------------------------------------------- | --------------- |
| `pdf_download` | Any `<a href="*.pdf">` click on the site                  | `file`, `href`  |
| `nav_click`    | Click on a nav-bar item (about / research / projects …)   | `section`       |
| `section_view` | Each section's first time entering the active scroll band | `section`       |

`section_view` is deduped per-session via an in-memory `Set`, so scrolling
up and back down a section won't double-count.

Currently tracked PDFs: `edward-anders-cv.pdf`, `edward-anders-mphil-thesis.pdf`.
Events appear in Vercel Analytics under **Custom Events** with a 24h delay
on first deploy.

## DNS

Domain `eawanders.com` registered and DNS-managed via Cloudflare.

| Type  | Name              | Value                | Mode     |
| ----- | ----------------- | -------------------- | -------- |
| CNAME | eawanders.com     | cname.vercel-dns.com | DNS-only |
| CNAME | www.eawanders.com | cname.vercel-dns.com | DNS-only |

Cloudflare proxy is **disabled** (DNS-only) so Vercel issues its own
Let's Encrypt certificates end-to-end. Don't enable proxy without
switching SSL/TLS mode to Full (strict) first.

Cloudflare zone ID: `ca573780900333e057915d385d2d8314`.

## Project tracking

Linear project: [Personal Website](https://linear.app/eawanders/project/personal-website-5a41dd05d0c5)
under the `personal` team (PER prefix). Build-out is tracked across milestones M1–M6.
