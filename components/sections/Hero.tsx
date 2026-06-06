"use client";

import { motion } from "framer-motion";
import { Boxes, Terminal } from "lucide-react";
import { profile } from "@/lib/content";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useGame } from "../providers/GameProvider";
import HeroBackground from "../three/HeroBackground";

export default function Hero({ onNavigate }: { onNavigate: (id: string) => void }) {
  const reduced = useReducedMotion();
  const { play } = useGame();

  return (
    <section
      id="hero"
      className="section-anchor relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 text-center md:px-8"
    >
      {/* Live WebGL neural field. */}
      <HeroBackground />

      {/* Receding data grid along the floor. */}
      <div className="holo-grid pointer-events-none absolute bottom-0 left-0 right-0 -z-10 h-1/2" aria-hidden />

      <div className="relative mx-auto w-full max-w-4xl">
        <motion.div
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-hudcyan backdrop-blur md:text-xs"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-hudgreen" />
          Status: Shipping // Open to roles
        </motion.div>

        <motion.h1
          className="glow-text font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-ink sm:text-7xl md:text-8xl"
          initial={{ opacity: 0, y: reduced ? 0 : 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {profile.name}
        </motion.h1>

        <motion.p
          className="mx-auto mt-5 max-w-fit bg-gradient-to-r from-hudcyan via-hudblue to-hudpink bg-clip-text font-mono text-sm tracking-widest text-transparent md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          {profile.tagline}
        </motion.p>

        <motion.p
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          {profile.pitch}
        </motion.p>

        <motion.div
          className="mt-9 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
        >
          <button
            type="button"
            onClick={() => {
              play("click");
              onNavigate("projects");
            }}
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-hudcyan to-hudblue px-6 py-3 font-display text-base font-bold tracking-wide text-[#04040a] shadow-glow transition-transform hover:scale-[1.04]"
          >
            <Boxes size={18} />
            EXPLORE SYSTEMS
          </button>
          <button
            type="button"
            onClick={() => {
              play("click");
              onNavigate("contact");
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-hudpink/50 bg-hudpink/5 px-6 py-3 font-display text-base font-bold tracking-wide text-hudpink transition-colors hover:bg-hudpink/15"
          >
            <Terminal size={18} />
            OPEN CONSOLE
          </button>
        </motion.div>

        <motion.p
          className="mt-10 font-mono text-[10px] uppercase tracking-[0.3em] text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Drag to orbit the latent space. Scroll to begin.
        </motion.p>
      </div>
    </section>
  );
}
