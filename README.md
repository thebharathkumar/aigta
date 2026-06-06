# thebharath.co // AI Engineer Portfolio

An interactive, WebGL-driven portfolio for Bharath Kumar Rajesh, AI Engineer. It
opens with a glowing neural-network field you can orbit, walks through a live
multi-agent orchestration schematic, and presents shipped systems, deployments,
research, and credentials in a dark holographic AI-lab interface.

## Tech stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Three.js + React Three Fiber + drei for real WebGL graphics
- @react-three/postprocessing for bloom and vignette
- Framer Motion for UI animation and transitions
- Lucide React for icons
- A tiny Web Audio sound layer (muted by default, with a persistent toggle)
- No backend. All content is static and typed in `lib/content.ts`.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. The WebGL hero needs a browser, so to see the 3D
scene run it in the browser (it does not render in a headless terminal).

## Build and run production

```bash
npm run build
npm run start
```

## The graphics

- `components/three/NeuralScene.tsx`: the latent-space field. A twinkling
  additive particle nebula plus a neural-net core of glowing nodes on a sphere
  connected by additive edges, with custom GLSL point shaders, slow rotation,
  breathing, and mouse parallax.
- `components/three/SceneCanvas.tsx`: the canvas, bloom, and vignette.
- `components/three/HeroBackground.tsx`: loads the canvas lazily and client-only,
  with a gradient fallback for reduced-motion users and anyone without WebGL.
- `components/three/SceneBoundary.tsx`: an error boundary so a WebGL failure
  degrades to the gradient instead of breaking the page.
- `components/sections/AgentGraph.tsx`: a live, animated multi-agent
  orchestration diagram (SVG plus Framer Motion) tied to the real stack.

## Editing content

Every string lives in one typed file: `lib/content.ts`. Edit the profile, skills,
deployments (experience), systems (projects), research (publications),
credentials (certifications), and contact channels there and the whole site
updates.

## Easter eggs

- The HUD shows a live throughput sparkline and a token counter that climbs as
  you scroll and lands on a round number.
- An INFERENCE COMPLETE banner fires once when you scroll past the systems.
- Command console: press the tilde key and type a command. SYNTH switches to a
  synthwave palette, CORE returns to the default holographic palette, TURBO and
  CHILL change the turbo level.
- Konami sequence (up, up, down, down, left, right, left, right, b, a) engages
  GPU turbo in the HUD with a flash.
- Command hub: press Tab on desktop, or use the node button bottom-right. On
  mobile the same button opens a slide-in menu. Both reach every section.

## Accessibility and performance

- The heavy Three.js bundle is code-split and loaded only on the client, so the
  initial HTML and the rest of the site stay light.
- Honors prefers-reduced-motion: skips the WebGL scene (shows the gradient),
  disables the agent-graph motion and screen shake, keeps simple fades.
- Semantic HTML, keyboard navigable, visible focus rings, ARIA labels on the
  command hub and contact channels. The menu and jump strip reach every section
  without the radial.

## Assets you can drop in

- `public/resume.pdf`: arms the "DOWNLOAD RESUME" link and the Resume channel.

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
