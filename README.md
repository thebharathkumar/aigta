# thebharath.co // Formula 1 Themed Portfolio

A Formula 1 race-team themed portfolio for Bharath Kumar Rajesh. Each section is
reframed as part of a race weekend: a start-lights launch sequence, a driver
profile with a car setup sheet, a season race calendar, a winners circle, a
trophy cabinet, an FIA super license, and a pit-wall team radio. It reads
cleanly as a professional portfolio for AI/ML and forward-deployed engineering
roles while feeling like a broadcast race HUD.

This is an original homage. It does not use Formula 1, FIA, or any team
trademarks, logos, liveries, or official art. The car, helmet, and HUD are all
original SVG and CSS.

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

Every string lives in one typed file: `lib/content.ts`. Edit the profile, skills
(car setup), missions (season results), projects (race wins), publications
(trophies), certifications (super license), and contact channels there and the
whole site updates.

## The character

The "driver" is an original SVG: a side-view formula car with spinning wheels
(`components/art/RaceCar.tsx`) and a racing helmet avatar
(`components/art/Helmet.tsx`). The car launches off the line on the loading
screen and drives into the hero.

## Animations and motion

- Start-lights launch sequence: five lights go red one by one, then lights out
  and the car fires off the line into the hero.
- Telemetry HUD: a live speed and gear readout that responds to scroll velocity,
  a DRS indicator, a points counter, a mini track map that fills as you move
  through sections, and tyre and strategy status bars.
- Scrolling asphalt with a moving racing line behind the hero.
- Car setup bars animate in with F1 timing colours (purple is fastest, green is
  strong, yellow is mid).
- Section reveals stagger upward on scroll.

## Easter eggs

- Speed and gear in the HUD react to how fast you scroll.
- A points counter ticks up as you scroll and lands on a round number.
- CHEQUERED FLAG banner waves in once when you scroll past the race wins.
- Pit command console: press the tilde key and type a command. NIGHTRACE switches
  to a night race under the lights, RACEDAY returns to full sun, PUSH and BOX
  change push mode.
- Konami sequence (up, up, down, down, left, right, left, right, b, a) engages
  push mode in the HUD with a siren flash.
- Steering wheel: press Tab on desktop, or use the wheel button bottom-right. On
  mobile the same button opens a pit-menu list. Both reach every section.

## Accessibility and performance

- Semantic HTML, keyboard navigable, visible focus rings, ARIA labels on the
  steering wheel and pit-wall channels.
- The pit-menu list and radio strip reach every section without the wheel.
- Honors prefers-reduced-motion: disables screen shake, wheel spin, and the
  scrolling track while keeping simple fades.
- Below-the-fold sections are lazy-loaded.

## Assets you can drop in

- `public/resume.pdf`: arms the "GRAB THE MEDIA PASS" resume download and the
  pit-wall Resume channel.
- Portrait image: the driver profile and super-license cards use the SVG helmet
  placeholder. Swap in a real portrait if desired.

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
