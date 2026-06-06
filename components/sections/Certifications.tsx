"use client";

import { BadgeCheck } from "lucide-react";
import { licenses } from "@/lib/content";
import { Section, Reveal, Eyebrow, Heading } from "../ui/Section";
import Helmet from "../art/Helmet";

export default function Certifications() {
  return (
    <Section id="certifications">
      <Reveal>
        <Eyebrow>Super License</Eyebrow>
        <Heading>FIA SUPER LICENSE</Heading>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {licenses.map((l, i) => (
          <Reveal key={l.title} delay={i * 0.08}>
            {/* Original super-license-style card, not a real license design. */}
            <article className="relative h-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-surface to-black p-5 shadow-hud">
              <div
                className="absolute right-0 top-0 h-24 w-24 rounded-bl-full opacity-20"
                style={{ background: "var(--accent)" }}
                aria-hidden
              />
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
                  {l.className}
                </span>
                <BadgeCheck className="text-hudgreen" size={20} />
              </div>

              <div className="mt-6 flex items-center gap-4">
                <div className="duotone-portrait flex h-16 w-14 items-center justify-center rounded border border-white/10">
                  <Helmet className="h-11 w-11" />
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">
                    Sanctioned by
                  </span>
                  <span className="font-display text-lg text-ink">{l.issuer}</span>
                </div>
              </div>

              <p className="mt-5 border-t border-white/10 pt-3 text-sm leading-snug text-ink">
                {l.title}
              </p>
              <span className="mt-2 block font-mono text-[10px] uppercase tracking-widest text-hudcyan">
                Status: Valid // Super License Points 40
              </span>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
