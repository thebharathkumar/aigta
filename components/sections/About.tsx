"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { bio, profile, skills, specializations } from "@/lib/content";
import { Section, Reveal, Eyebrow, Heading } from "../ui/Section";
import Helmet from "../art/Helmet";

// F1 timing colours: purple is fastest, green is strong, yellow is mid.
function barColor(value: number): string {
  if (value >= 90) return "var(--hud-pink)"; // purple = fastest
  if (value >= 84) return "var(--hud-green)"; // green = personal best
  return "var(--hud-gold)"; // yellow = mid sector
}

function SetupBar({ label, value, delay }: { label: string; value: number; delay: number }) {
  const color = barColor(value);
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-2">
        <span className="text-sm text-ink">{label}</span>
        <span className="font-mono text-xs" style={{ color }}>
          {value}
        </span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-black/50">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
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
        <Eyebrow>Driver Profile</Eyebrow>
        <Heading>MEET THE DRIVER</Heading>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Reveal>
          <div className="carbon rounded-2xl border border-white/10 p-6 shadow-hud">
            <div className="mb-5 flex items-center gap-4">
              <div className="duotone-portrait flex h-20 w-20 items-center justify-center rounded-xl border border-white/10">
                <Helmet className="h-14 w-14" />
              </div>
              <div>
                <span className="font-display text-2xl text-ink">BKR</span>
                <span className="block font-mono text-[11px] uppercase tracking-widest text-[var(--accent)]">
                  Car 01 // Lead Driver
                </span>
              </div>
            </div>

            <p className="text-base leading-relaxed text-muted md:text-lg">{bio}</p>

            <div className="mt-6 flex items-center gap-2 rounded-lg border border-hudpink/30 bg-hudpink/5 px-4 py-3">
              <Zap size={16} className="text-hudpink" />
              <span className="font-mono text-xs uppercase tracking-widest text-hudpink">
                Reaction time: {profile.funStat}
              </span>
            </div>

            <h3 className="mt-8 font-display text-2xl text-ink">ENGINEERING MODES</h3>
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
          <div className="carbon rounded-2xl border border-white/10 p-6 shadow-hud">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-2xl text-ink">CAR SETUP</h3>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                Telemetry
              </span>
            </div>
            <div className="flex flex-col gap-4">
              {skills.map((s, i) => (
                <SetupBar key={s.label} label={s.label} value={s.value} delay={i * 0.05} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
