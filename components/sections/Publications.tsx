"use client";

import { FileText, Quote } from "lucide-react";
import { trophies } from "@/lib/content";
import { Section, Reveal, Eyebrow, Heading } from "../ui/Section";

export default function Publications() {
  return (
    <Section id="publications">
      <Reveal>
        <Eyebrow>Research</Eyebrow>
        <Heading>PEER REVIEWED PAPERS</Heading>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {trophies.map((t, i) => (
          <Reveal key={t.title} delay={i * 0.08}>
            <article className="glass relative h-full overflow-hidden rounded-2xl p-6 shadow-hud">
              <div
                className="absolute inset-0 -z-10 opacity-25"
                style={{
                  background:
                    "radial-gradient(80% 60% at 85% 0%, rgba(217,70,239,0.25), transparent 60%)",
                }}
                aria-hidden
              />
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-hudpink/40 bg-white/[0.03]">
                  <FileText className="text-hudpink" />
                </div>
                <span className="inline-flex items-center gap-1 rounded-full border border-hudcyan/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-hudcyan">
                  <Quote size={11} /> Peer Reviewed
                </span>
              </div>
              <h3 className="font-display text-xl font-bold leading-tight text-ink md:text-2xl">
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
