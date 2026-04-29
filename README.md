# eawanders.github.io

Personal website source. Production live at https://eawanders.com.

## Deployment

| Branch       | Serves                              | Hosted by      | Notes                                             |
| ------------ | ----------------------------------- | -------------- | ------------------------------------------------- |
| `main`       | https://eawanders.com (production)  | Vercel         | Project: `eawanders-projects/eawanders-github-io` |
| `gh-pages`   | https://eawanders.github.io         | GitHub Pages   | Static redirect to https://eawanders.com          |

## DNS

Domain `eawanders.com` registered and DNS-managed via Cloudflare.

| Type  | Name              | Value                  | Mode      |
| ----- | ----------------- | ---------------------- | --------- |
| CNAME | eawanders.com     | cname.vercel-dns.com   | DNS-only  |
| CNAME | www.eawanders.com | cname.vercel-dns.com   | DNS-only  |

Cloudflare proxy is **disabled** (DNS-only) so Vercel issues its own
Let's Encrypt certificates end-to-end. Don't enable proxy without
switching SSL/TLS mode to Full (strict) first.

Cloudflare zone ID: `ca573780900333e057915d385d2d8314`.

## Project tracking

Linear project: [Personal Website](https://linear.app/eawanders/project/personal-website-5a41dd05d0c5)
under the `personal` team (PER prefix). Build-out is tracked across
milestones M1–M6.
