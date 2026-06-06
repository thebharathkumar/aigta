"use client";

import { motion } from "framer-motion";
import { ExternalLink, Gauge, Trophy } from "lucide-react";
import type { Heist } from "@/lib/content";
import { heists, mainMission } from "@/lib/content";
import { Section, Reveal, Eyebrow, Heading } from "../ui/Section";
import { useGame } from "../providers/GameProvider";
import { CheckeredFlagIcon } from "../art/icons";

function Rating({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Track rating ${level} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: i < level ? "var(--accent)" : "rgba(255,255,255,0.15)" }}
        />
      ))}
    </div>
  );
}

function WinCard({ heist, featured = false }: { heist: Heist; featured?: boolean }) {
  const { play } = useGame();
  const coming = heist.comingSoon;
  const points = heist.difficulty * 5; // flavor championship points
  const fastestLap = !coming && heist.difficulty === 5;

  return (
    <motion.article
      className={`carbon group relative flex flex-col overflow-hidden rounded-2xl border p-5 shadow-hud md:p-6 ${
        featured ? "border-[var(--accent)]/50" : "border-white/10"
      }`}
      whileHover={{ y: -4 }}
      onHoverStart={() => play("rev")}
    >
      {/* Stamp: chequered flag on hover, or a COMING SOON badge for the next race. */}
      {coming ? (
        <span className="absolute right-3 top-3 rotate-6 rounded border-2 border-hudcyan px-2 py-0.5 font-display text-sm tracking-widest text-hudcyan">
          NEXT RACE
        </span>
      ) : (
        <span className="pointer-events-none absolute right-3 top-3 flex rotate-6 items-center gap-1 rounded border-2 border-white bg-black/70 px-2 py-0.5 font-display text-sm tracking-widest text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <CheckeredFlagIcon className="h-4 w-4" /> CHEQUERED FLAG
        </span>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <span
          className="inline-flex h-7 items-center gap-1 rounded-full px-2 font-display text-sm"
          style={{
            color: coming ? "var(--hud-cyan)" : "#1a1300",
            background: coming ? "transparent" : "var(--hud-gold)",
            border: coming ? "1px solid var(--hud-cyan)" : "none",
          }}
        >
          <Trophy size={13} /> {coming ? "FORMATION LAP" : "P1 WIN"}
        </span>
        {fastestLap && (
          <span className="inline-flex items-center gap-1 rounded-full bg-hudpink/20 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-hudpink">
            <Gauge size={11} /> Fastest Lap
          </span>
        )}
        {featured && (
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
            Main Event
          </span>
        )}
      </div>

      <h3 className="mt-2 font-display text-2xl text-ink md:text-3xl">{heist.codename}</h3>
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
        <div className="flex gap-5">
          <div>
            <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">
              Points
            </span>
            <span className="font-mono text-xl font-bold text-hudgreen">{points}</span>
          </div>
          <div>
            <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">
              Prize
            </span>
            <span className="font-mono text-xl font-bold text-ink">
              ${heist.payout.toLocaleString("en-US")}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Rating level={heist.difficulty} />
          {!coming && (
            <a
              href={heist.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => play("click")}
              className="inline-flex items-center gap-1 font-display text-sm tracking-wide text-[var(--accent)] hover:underline"
            >
              OPEN GARAGE <ExternalLink size={13} />
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
        <Eyebrow>Race Wins</Eyebrow>
        <Heading>THE WINNERS CIRCLE</Heading>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-10">
          <WinCard heist={mainMission} featured />
        </div>
      </Reveal>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {heists.map((h, i) => (
          <Reveal key={h.codename} delay={(i % 3) * 0.06}>
            <WinCard heist={h} />
          </Reveal>
        ))}
      </div>

      {/* Sentinel: scrolling past triggers the one-time chequered-flag banner. */}
      <motion.div
        className="h-1 w-full"
        onViewportEnter={onComplete}
        viewport={{ once: true }}
        aria-hidden
      />
    </Section>
  );
}
