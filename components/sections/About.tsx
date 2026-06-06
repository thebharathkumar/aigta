"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { bio, profile, skills, specializations } from "@/lib/content";
import { Section, Reveal, Eyebrow, Heading } from "../ui/Section";

function StatBar({ label, value, delay }: { label: string; value: number; delay: number }) {
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-2">
        <span className="text-sm text-ink">{label}</span>
        <span className="font-mono text-xs text-hudgold">{value}</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-black/50">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-hudgreen to-hudgold"
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

export default function About() {
  return (
    <Section id="about">
      <Reveal>
        <Eyebrow>Character Bio</Eyebrow>
        <Heading>THE PLAYER</Heading>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Reveal>
          <div className="hud-panel rounded-2xl p-6 shadow-hud">
            <p className="text-base leading-relaxed text-muted md:text-lg">{bio}</p>
            <div className="mt-6 flex items-center gap-2 rounded-lg border border-hudpink/30 bg-hudpink/5 px-4 py-3">
              <Zap size={16} className="text-hudpink" />
              <span className="font-mono text-xs uppercase tracking-widest text-hudpink">
                Special: {profile.funStat}
              </span>
            </div>

            <h3 className="mt-8 font-display text-2xl text-ink">SPECIALIZATIONS</h3>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {specializations.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-white/10 bg-black/30 px-3 py-2 text-center font-mono text-[11px] uppercase tracking-wide text-hudcyan"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="hud-panel rounded-2xl p-6 shadow-hud">
            <h3 className="mb-5 font-display text-2xl text-ink">STAT PANEL</h3>
            <div className="flex flex-col gap-4">
              {skills.map((s, i) => (
                <StatBar key={s.label} label={s.label} value={s.value} delay={i * 0.05} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
