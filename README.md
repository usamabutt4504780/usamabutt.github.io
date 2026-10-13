# Portfolio

This repository keeps the original standalone HTML/CSS/JavaScript portfolio at its root and adds a Next.js + Tailwind CSS version in `nextjs-portfolio/`. GitHub Pages deploys the Next.js version as static files; no server runtime is required.

## Personalize it

Both versions are personalized with Usama Ahmed's profile, experience, education, certification, email, LinkedIn, and GitHub links. The technology section uses logo images from the Devicon CDN for tools listed in the supplied profile; additional enterprise platforms are listed as text. The projects section links to SimplyCharge, the FashionPedia dashboard, and Descon's public website (the tender app itself has no separate public link). Update `index.html` and `styles.css` for the standalone version, or `nextjs-portfolio/app/page.tsx`, `nextjs-portfolio/app/globals.css`, and `nextjs-portfolio/app/layout.tsx` for the Next.js version. Update the `UA` monogram, page description, and title if you adapt it for someone else.

The page uses Google Fonts for its typography. The font stack includes local system fallbacks if the fonts cannot be reached.

## Standalone HTML version

Open `index.html` in a browser, or serve this folder with any static file server. This original plain HTML/CSS/JavaScript version remains available independently.

## Next.js version

```powershell
cd nextjs-portfolio
npm ci
npm run dev
```

The Next.js app uses Tailwind CSS, responsive styling, reveal and ambient animations, and honors reduced-motion preferences. To produce a static export locally, run `npm run build` from `nextjs-portfolio`; the generated static site is written to `nextjs-portfolio/out`. It can be previewed with any static file server.

## Publish with GitHub Pages

For a personal or organization root-domain site, the GitHub repository must be named `<github-owner>.github.io` (for example, `usamaahmed.github.io`). Push these files to that repository's `main` branch. The site will be published at `https://<github-owner>.github.io/`.

In the repository, open **Settings → Pages** and set the build and deployment source to **GitHub Actions**. The workflow in `.github/workflows/pages.yml` installs and builds `nextjs-portfolio/`, then deploys its static `out/` files on each push to `main`. It automatically omits the repository path for `<github-owner>.github.io` sites, while retaining the repository path for project Pages sites. Find the published URL under the repository's **Settings → Pages** after the first successful deployment.
