"use client";

import { Trophy } from "lucide-react";
import { trophies } from "@/lib/content";
import { Section, Reveal, Eyebrow, Heading } from "../ui/Section";

export default function Publications() {
  return (
    <Section id="publications">
      <Reveal>
        <Eyebrow>Trophy Cabinet</Eyebrow>
        <Heading>CHAMPIONSHIP TROPHIES</Heading>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {trophies.map((t, i) => (
          <Reveal key={t.title} delay={i * 0.08}>
            <article className="carbon relative h-full overflow-hidden rounded-2xl border border-white/10 p-6 shadow-hud">
              <div
                className="absolute inset-0 -z-10 opacity-20"
                style={{
                  background:
                    "radial-gradient(80% 60% at 80% 0%, var(--hud-gold), transparent 60%)",
                }}
                aria-hidden
              />
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-hudgold/40 bg-black/30">
                  <Trophy className="text-hudgold" />
                </div>
                <span className="font-display text-3xl text-hudgold/80">P1</span>
              </div>
              <h3 className="font-display text-xl leading-tight text-ink md:text-2xl">
                {t.title}
              </h3>
              <p className="mt-3 font-mono text-xs uppercase tracking-wide text-hudcyan">
                {t.venue}
              </p>
              <p className="mt-2 text-sm text-muted">{t.detail}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
