"use client";

import { motion } from "framer-motion";
import { Crosshair, Home } from "lucide-react";
import { profile } from "@/lib/content";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useGame } from "../providers/GameProvider";

export default function Hero({ onNavigate }: { onNavigate: (id: string) => void }) {
  const reduced = useReducedMotion();
  const { play } = useGame();

  return (
    <section
      id="hero"
      className="section-anchor relative flex min-h-[100svh] items-center overflow-hidden px-5 pt-24 md:px-8"
    >
      {/* Skyline gradient backdrop. Swap for an image by dropping one behind. */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, rgba(242,193,78,0.18), transparent 55%), linear-gradient(180deg, #0e0e10 0%, #14110a 60%, #0e0e10 100%)",
        }}
        aria-hidden
      />
      {/* Faux skyline silhouette built from CSS bars. */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 -z-10 flex h-40 items-end justify-center gap-1 opacity-30 md:h-56" aria-hidden>
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="block w-[2.2%] rounded-t-sm bg-black"
            style={{ height: `${20 + ((i * 53) % 80)}%` }}
          />
        ))}
      </div>

      <div className="mx-auto w-full max-w-6xl">
        <motion.p
          className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-hudgold md:text-sm"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to Los Santos
        </motion.p>

        <motion.h1
          className="font-display text-5xl leading-[0.9] text-ink sm:text-7xl md:text-8xl lg:text-9xl"
          initial={{ opacity: 0, y: reduced ? 0 : 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {profile.name}
        </motion.h1>

        <motion.p
          className="mt-4 font-mono text-sm tracking-widest text-hudcyan md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          {profile.tagline}
        </motion.p>

        <motion.p
          className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          {profile.pitch}
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap gap-4"
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
            className="group inline-flex items-center gap-2 rounded-lg bg-hudgold px-6 py-3 font-display text-lg tracking-wide text-black shadow-glow transition-transform hover:scale-[1.03]"
          >
            <Crosshair size={18} />
            VIEW MISSIONS
          </button>
          <button
            type="button"
            onClick={() => {
              play("click");
              onNavigate("contact");
            }}
            className="inline-flex items-center gap-2 rounded-lg border border-hudcyan/60 px-6 py-3 font-display text-lg tracking-wide text-hudcyan transition-colors hover:bg-hudcyan/10"
          >
            <Home size={18} />
            ENTER SAFEHOUSE
          </button>
        </motion.div>
      </div>
    </section>
  );
}
