"use client";

import { motion } from "framer-motion";
import { Trophy, Radio } from "lucide-react";
import { profile } from "@/lib/content";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useGame } from "../providers/GameProvider";
import RaceCar from "../art/RaceCar";

export default function Hero({ onNavigate }: { onNavigate: (id: string) => void }) {
  const reduced = useReducedMotion();
  const { play } = useGame();

  return (
    <section
      id="hero"
      className="section-anchor relative flex min-h-[100svh] items-center overflow-hidden px-5 pt-24 md:px-8"
    >
      {/* Asphalt + racing-line backdrop. */}
      <div className="track-bg absolute inset-0 -z-10 opacity-70" aria-hidden />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(110% 80% at 50% -10%, rgba(225,6,0,0.16), transparent 55%), linear-gradient(180deg, rgba(10,10,15,0.2), var(--bg) 75%)",
        }}
        aria-hidden
      />
      {/* Top start/finish gantry line. */}
      <div className="checkered absolute left-0 right-0 top-0 -z-10 h-3 opacity-60" aria-hidden />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.p
            className="mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-hudcyan md:text-sm"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-hudgreen" /> Car 01 // On track
          </motion.p>

          <motion.h1
            className="font-display text-5xl leading-[0.88] text-ink sm:text-7xl md:text-8xl"
            initial={{ opacity: 0, y: reduced ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {profile.name}
          </motion.h1>

          <motion.p
            className="mt-4 font-mono text-sm tracking-widest text-[var(--accent)] md:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            {profile.tagline}
          </motion.p>

          <motion.p
            className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            {profile.pitch}
          </motion.p>

          {/* Telemetry strip */}
          <motion.div
            className="mt-6 grid max-w-md grid-cols-3 gap-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {[
              { k: "Top Speed", v: "340" },
              { k: "Podiums", v: "8" },
              { k: "Pubs", v: "2" },
            ].map((s) => (
              <div key={s.k} className="carbon rounded-lg border border-white/10 px-3 py-2">
                <span className="block font-display text-2xl text-ink">{s.v}</span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted">
                  {s.k}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="mt-8 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <button
              type="button"
              onClick={() => {
                play("rev");
                onNavigate("projects");
              }}
              className="group inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-3 font-display text-lg tracking-wide text-white shadow-glow transition-transform hover:scale-[1.03]"
            >
              <Trophy size={18} />
              SEE THE WINS
            </button>
            <button
              type="button"
              onClick={() => {
                play("click");
                onNavigate("contact");
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-hudcyan/60 px-6 py-3 font-display text-lg tracking-wide text-hudcyan transition-colors hover:bg-hudcyan/10"
            >
              <Radio size={18} />
              RADIO THE PIT WALL
            </button>
          </motion.div>
        </div>

        {/* The car character drives in from the right. */}
        <motion.div
          className="relative"
          initial={{ x: reduced ? 0 : 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="speed-lines absolute inset-0 -z-10 rounded-2xl opacity-40" aria-hidden />
          <RaceCar className="w-full drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]" />
          <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
            Power Unit: Production AI // Spec 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
}
