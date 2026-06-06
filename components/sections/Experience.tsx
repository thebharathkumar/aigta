"use client";

import { CheckCircle2, Loader } from "lucide-react";
import { missions } from "@/lib/content";
import { Section, Reveal, Eyebrow, Heading } from "../ui/Section";

export default function Experience() {
  return (
    <Section id="experience">
      <Reveal>
        <Eyebrow>Mission Log</Eyebrow>
        <Heading>COMPLETED MISSIONS</Heading>
      </Reveal>

      <div className="relative mt-12 pl-6 md:pl-8">
        {/* Timeline rail */}
        <div className="absolute left-0 top-2 h-full w-px bg-gradient-to-b from-hudgold via-white/20 to-transparent" aria-hidden />

        <div className="flex flex-col gap-6">
          {missions.map((m, i) => {
            const inProgress = m.status === "IN PROGRESS";
            return (
              <Reveal key={m.role} delay={i * 0.06}>
                <div className="relative">
                  {/* Node */}
                  <span
                    className="absolute -left-[1.65rem] top-5 h-3 w-3 rounded-full border-2 md:-left-[2.15rem]"
                    style={{
                      borderColor: inProgress ? "var(--hud-cyan)" : "var(--hud-green)",
                      background: "var(--bg)",
                    }}
                    aria-hidden
                  />
                  <article className="hud-panel rounded-2xl p-5 shadow-hud md:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-xl text-ink md:text-2xl">{m.role}</h3>
                        <p className="font-mono text-xs uppercase tracking-wide text-hudgold">
                          {m.company} // {m.place}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span
                          className="inline-flex items-center gap-1 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-widest"
                          style={{
                            color: inProgress ? "var(--hud-cyan)" : "var(--hud-green)",
                            borderColor: inProgress ? "var(--hud-cyan)" : "var(--hud-green)",
                          }}
                        >
                          {inProgress ? <Loader size={11} /> : <CheckCircle2 size={11} />}
                          {m.status}
                        </span>
                        <span className="font-mono text-[11px] text-muted">{m.dates}</span>
                      </div>
                    </div>
                    <ul className="mt-4 flex flex-col gap-2">
                      {m.bullets.map((b, bi) => (
                        <li key={bi} className="flex gap-2 text-sm leading-relaxed text-muted">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-hudgold" aria-hidden />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </article>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
