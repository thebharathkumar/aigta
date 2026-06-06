"use client";

import { BadgeCheck, ShieldCheck } from "lucide-react";
import { licenses } from "@/lib/content";
import { Section, Reveal, Eyebrow, Heading } from "../ui/Section";

export default function Certifications() {
  return (
    <Section id="certifications">
      <Reveal>
        <Eyebrow>Credentials</Eyebrow>
        <Heading>VERIFIED CREDENTIALS</Heading>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {licenses.map((l, i) => (
          <Reveal key={l.title} delay={i * 0.08}>
            <article className="glass relative h-full overflow-hidden rounded-xl p-5 shadow-hud">
              <div
                className="absolute right-0 top-0 h-24 w-24 rounded-bl-full opacity-25"
                style={{ background: "radial-gradient(circle at 70% 30%, var(--hud-cyan), transparent 70%)" }}
                aria-hidden
              />
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-hudcyan">
                  {l.className}
                </span>
                <BadgeCheck className="text-hudgreen" size={20} />
              </div>

              <div className="mt-6 flex items-center gap-4">
                <div className="duotone-portrait flex h-16 w-16 items-center justify-center rounded-xl border border-white/10">
                  <ShieldCheck className="text-hudcyan" size={28} />
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">
                    Issued by
                  </span>
                  <span className="font-display text-lg font-bold text-ink">{l.issuer}</span>
                </div>
              </div>

              <p className="mt-5 border-t border-white/10 pt-3 text-sm leading-snug text-ink">
                {l.title}
              </p>
              <span className="mt-2 block font-mono text-[10px] uppercase tracking-widest text-hudgreen">
                Status: Verified
              </span>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
