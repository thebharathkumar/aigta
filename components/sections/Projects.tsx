"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, GitBranch, Star, CircleDot } from "lucide-react";
import type { Heist } from "@/lib/content";
import { heists, mainMission } from "@/lib/content";
import { Section, Reveal, Eyebrow, Heading } from "../ui/Section";
import { useGame } from "../providers/GameProvider";
import { useReducedMotion } from "@/lib/useReducedMotion";

function Complexity({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Complexity ${level} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <CircleDot
          key={i}
          size={12}
          className={i < level ? "text-hudcyan" : "text-white/15"}
        />
      ))}
    </div>
  );
}

function SystemCard({ heist, featured = false }: { heist: Heist; featured?: boolean }) {
  const { play } = useGame();
  const reduced = useReducedMotion();
  const dev = heist.comingSoon;

  // Pointer-driven 3D tilt.
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const rotateX = useTransform(rx, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(ry, [-0.5, 0.5], ["-7deg", "7deg"]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    rx.set((e.clientY - r.top) / r.height - 0.5);
    ry.set((e.clientX - r.left) / r.width - 0.5);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="h-full"
    >
      <article
        className={`glass group relative flex h-full flex-col overflow-hidden rounded-2xl p-5 shadow-hud md:p-6 ${
          featured ? "border-hudpink/40" : ""
        }`}
        onMouseEnter={() => play("click")}
      >
        {/* Glow that follows on hover. */}
        <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: "radial-gradient(60% 50% at 50% 0%, rgba(34,211,238,0.12), transparent 70%)" }}
          aria-hidden
        />

        {dev ? (
          <span className="absolute right-3 top-3 rounded border border-hudpink px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-hudpink">
            In Dev
          </span>
        ) : (
          <span className="pointer-events-none absolute right-3 top-3 rounded border border-hudgreen bg-hudgreen/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-hudgreen opacity-0 transition-opacity group-hover:opacity-100">
            Build Passing
          </span>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest"
            style={{
              color: dev ? "var(--hud-pink)" : "var(--hud-green)",
              border: `1px solid ${dev ? "var(--hud-pink)" : "var(--hud-green)"}`,
            }}
          >
            {dev ? "Roadmap" : "Deployed"}
          </span>
          {!dev && heist.difficulty === 5 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-hudpink/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-hudpink">
              <Star size={11} /> Flagship
            </span>
          )}
          {featured && (
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-hudcyan">
              Main Build
            </span>
          )}
        </div>

        <h3 className="mt-2 font-display text-2xl font-bold text-ink md:text-3xl">{heist.codename}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{heist.objective}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {heist.tags.map((t) => (
            <span
              key={t}
              className="rounded border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-[10px] text-hudcyan"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-end justify-between gap-3 border-t border-white/10 pt-4">
          <div>
            <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">
              Impact
            </span>
            <span className="font-mono text-lg font-bold text-hudgreen">
              {Math.round(heist.payout / 100000) / 10}M
            </span>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Complexity level={heist.difficulty} />
            {!dev && (
              <a
                href={heist.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => play("click")}
                className="inline-flex items-center gap-1 font-display text-sm font-bold tracking-wide text-hudcyan hover:underline"
              >
                <GitBranch size={13} /> VIEW REPO <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>
      </article>
    </motion.div>
  );
}

export default function Projects({ onComplete }: { onComplete: () => void }) {
  return (
    <Section id="projects">
      <Reveal>
        <Eyebrow>Systems</Eyebrow>
        <Heading>WHAT I HAVE SHIPPED</Heading>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-10">
          <SystemCard heist={mainMission} featured />
        </div>
      </Reveal>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {heists.map((h, i) => (
          <Reveal key={h.codename} delay={(i % 3) * 0.06}>
            <SystemCard heist={h} />
          </Reveal>
        ))}
      </div>

      {/* Sentinel: scrolling past triggers the one-time completion banner. */}
      <motion.div
        className="h-1 w-full"
        onViewportEnter={onComplete}
        viewport={{ once: true }}
        aria-hidden
      />
    </Section>
  );
}
