# Deploy: Cam Anh's web on Hostinger

Repo: https://github.com/camanh88/camanh.git

## Branches

- `main`: the project (`content/`, `site/`, `assets/`). To change anything, edit here and rebuild.
- `deploy`: only the built static site (the contents of `site/dist/`, including `.htaccess`). Hostinger copies this branch as it is. Hostinger shared hosting does not run `npm`, so the build is made on this computer.

## Before the first deploy

1. Decide the address. Set it in two places: `SITE_URL` in `site/src/lib/site.ts` and `site` in `site/astro.config.mjs` (they feed the canonical link and the share image).
2. Search engines: `INDEXABLE` in `site/src/lib/site.ts` is `false` (every page has "noindex": only people with the link find it). Set `true` when the site is ready to be listed.

## Hostinger (hPanel), first time

1. Websites > Add website (or Domains > Subdomains) for the address you chose. Note its folder (usually `public_html`, or `domains/…/public_html`).
2. That website > Advanced > Git > Create repository: URL `https://github.com/camanh88/camanh.git`, branch `deploy`, install path = that folder (the web root of this address only).
3. Press Deploy. For automatic updates, add the webhook Hostinger shows to the GitHub repo (Settings > Webhooks).
4. SSL > install the free certificate.

## Update the site later

```bash
cd site && npm run build           # writes site/dist/
cd .. && ./make-deploy-branch.sh   # pushes the build to the `deploy` branch
```

Then press Deploy in hPanel (or let the webhook do it). Also push `main` (`git push origin main`) so the source is saved.
