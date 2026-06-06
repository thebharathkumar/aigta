# thebharath.co // GTA-Inspired Open-World Portfolio

An original Grand Theft Auto inspired open-world portfolio for Bharath Kumar Rajesh.
Each section is reframed as a game system: a loading screen, character stats, a
mission log, a heist board, a trophy case, license cards, and a safehouse phone.
It reads cleanly as a professional portfolio for AI/ML and forward-deployed
engineering roles while feeling like a AAA game HUD.

This is an original homage. It does not use Rockstar Games trademarks, the GTA
logo, the Pricedown font, or any official art.

## Tech stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Framer Motion for animation and transitions
- Lucide React for icons
- A tiny Web Audio sound layer (muted by default, with a persistent toggle)
- No backend. All content is static and typed in `lib/content.ts`.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build and run production

```bash
npm run build
npm run start
```

## Editing content

Every string lives in one typed file: `lib/content.ts`. Edit the profile, skills,
missions, heists (projects), trophies (publications), licenses (certifications),
and phone apps (contact) there and the whole site updates.

## Assets you can drop in

- `public/resume.pdf`: arms the "PICK UP THE BRIEFCASE" resume download and the
  phone Resume app. Until then the link points to a missing file.
- Portrait image: the loading screen and license cards use a CSS silhouette
  placeholder. Swap in a real portrait by replacing those blocks if desired.
- Skyline background: the hero uses a CSS gradient and a CSS skyline. Drop an
  image behind the hero if you want a photo backdrop.

## Easter eggs

- Scroll-money counter in the HUD ticks up as you scroll and lands on a round
  number at the bottom.
- MISSION PASSED banner slaps in once when you scroll past the projects.
- Cheat console: press the tilde key and type a code. VICECITY switches to Vice
  City night mode, LOSSANTOS returns to Los Santos day mode. WANTED and COOLDOWN
  change the wanted level.
- Konami sequence (up, up, down, down, left, right, left, right, b, a) raises a
  wanted level in the HUD with a siren flash.
- Weapon wheel: press Tab on desktop, or use the target button bottom-right. On
  mobile the same button opens a pause-menu list. Both reach every section.

## Accessibility and performance

- Semantic HTML, keyboard navigable, visible focus rings, ARIA labels on the
  weapon wheel and phone apps.
- The pause-menu list and radio tuner reach every section without the wheel.
- Honors prefers-reduced-motion: disables screen shake and heavy parallax while
  keeping simple fades.
- Below-the-fold sections are lazy-loaded.

## Deploy to Vercel (thebharath.co)

1. Push this repo to GitHub.
2. Import it at https://vercel.com/new. Vercel auto-detects Next.js, so the
   default build command (`next build`) and output settings work as is.
3. In Project Settings, Domains, add `thebharath.co` (and `www.thebharath.co`).
4. Point your DNS at Vercel:
   - An apex `A` record to `76.76.21.21`, or a `CNAME` for `www` to
     `cname.vercel-dns.com`, per the values Vercel shows for your domain.
5. Every push to the main branch ships a new production deploy.

No environment variables are required.
