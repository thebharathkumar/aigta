"use client";

import { motion } from "framer-motion";
import { ExternalLink, Star, Pin } from "lucide-react";
import type { Heist } from "@/lib/content";
import { heists, mainMission } from "@/lib/content";
import { Section, Reveal, Eyebrow, Heading } from "../ui/Section";
import { useGame } from "../providers/GameProvider";

function Difficulty({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Difficulty ${level} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < level ? "fill-wanted text-wanted" : "text-white/15"}
        />
      ))}
    </div>
  );
}

function HeistCard({ heist, featured = false }: { heist: Heist; featured?: boolean }) {
  const { play } = useGame();
  const coming = heist.comingSoon;

  return (
    <motion.article
      className={`hud-panel group relative flex flex-col overflow-hidden rounded-2xl p-5 shadow-hud md:p-6 ${
        featured ? "border-hudgold/40" : ""
      }`}
      whileHover={{ y: -4 }}
      onHoverStart={() => play("click")}
    >
      {/* Stamp: MISSION PASSED on hover, or a persistent COMING SOON for the main mission. */}
      {coming ? (
        <span className="absolute right-3 top-3 rotate-6 rounded border-2 border-hudpink px-2 py-0.5 font-display text-sm tracking-widest text-hudpink">
          COMING SOON
        </span>
      ) : (
        <span className="pointer-events-none absolute right-3 top-3 rotate-6 rounded border-2 border-hudgreen px-2 py-0.5 font-display text-sm tracking-widest text-hudgreen opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          MISSION PASSED
        </span>
      )}

      <div className="flex items-center gap-2">
        {(heist.pinned || featured) && (
          <Pin size={14} className={featured ? "text-hudpink" : "text-hudgold"} aria-hidden />
        )}
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          {featured ? "Main Mission" : heist.pinned ? "Pinned Heist" : "Heist"}
        </span>
      </div>

      <h3 className="mt-1 font-display text-2xl text-ink md:text-3xl">{heist.codename}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{heist.objective}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {heist.tags.map((t) => (
          <span
            key={t}
            className="rounded border border-white/10 bg-black/30 px-2 py-1 font-mono text-[10px] text-hudcyan"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-end justify-between gap-3 border-t border-white/10 pt-4">
        <div>
          <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">
            Payout
          </span>
          <span className="font-mono text-xl font-bold text-hudgreen">
            ${heist.payout.toLocaleString("en-US")}
          </span>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Difficulty level={heist.difficulty} />
          {!coming && (
            <a
              href={heist.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => play("click")}
              className="inline-flex items-center gap-1 font-display text-sm tracking-wide text-hudgold hover:underline"
            >
              GO TO REPO <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects({ onComplete }: { onComplete: () => void }) {
  return (
    <Section id="projects">
      <Reveal>
        <Eyebrow>Heist Board</Eyebrow>
        <Heading>RUN THE MISSIONS</Heading>
      </Reveal>

      {/* Featured upcoming flagship */}
      <Reveal delay={0.05}>
        <div className="mt-10">
          <HeistCard heist={mainMission} featured />
        </div>
      </Reveal>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {heists.map((h, i) => (
          <Reveal key={h.codename} delay={(i % 3) * 0.06}>
            <HeistCard heist={h} />
          </Reveal>
        ))}
      </div>

      {/* Sentinel: scrolling past this triggers the one-time MISSION PASSED banner. */}
      <motion.div
        className="h-1 w-full"
        onViewportEnter={onComplete}
        viewport={{ once: true }}
        aria-hidden
      />
    </Section>
  );
}
