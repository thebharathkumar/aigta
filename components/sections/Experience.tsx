"use client";

import { CheckCircle2, Activity } from "lucide-react";
import { missions } from "@/lib/content";
import { Section, Reveal, Eyebrow, Heading } from "../ui/Section";

// Environment flavour mapped from the real location. Clearly descriptive.
function envFor(place: string): string {
  if (place.includes("New York")) return "production";
  if (place.includes("Bangalore")) return "staging";
  return "sandbox";
}

export default function Experience() {
  return (
    <Section id="experience">
      <Reveal>
        <Eyebrow>Deployment Log</Eyebrow>
        <Heading>SHIPPING HISTORY</Heading>
      </Reveal>

      <div className="relative mt-12 pl-6 md:pl-8">
        <div
          className="absolute left-0 top-2 h-full w-px bg-gradient-to-b from-hudcyan via-hudblue/40 to-transparent"
          aria-hidden
        />

        <div className="flex flex-col gap-6">
          {missions.map((m, i) => {
            const live = m.status === "IN PROGRESS";
            const build = String(missions.length - i).padStart(2, "0");
            return (
              <Reveal key={m.role} delay={i * 0.06}>
                <div className="relative">
                  <span
                    className="absolute -left-[1.65rem] top-5 h-3 w-3 rounded-full md:-left-[2.15rem]"
                    style={{
                      background: live ? "var(--hud-green)" : "var(--hud-cyan)",
                      boxShadow: `0 0 12px ${live ? "var(--hud-green)" : "var(--hud-cyan)"}`,
                    }}
                    aria-hidden
                  />
                  <article className="glass rounded-2xl p-5 shadow-hud md:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-hudblue">
                          Build {build}{" // env: "}{envFor(m.place)}
                        </span>
                        <h3 className="mt-1 font-display text-xl font-bold text-ink md:text-2xl">
                          {m.role}
                        </h3>
                        <p className="font-mono text-xs uppercase tracking-wide text-hudcyan">
                          {m.company}{" // "}{m.place}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span
                          className="inline-flex items-center gap-1 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-widest"
                          style={{
                            color: live ? "var(--hud-green)" : "var(--hud-cyan)",
                            borderColor: live ? "var(--hud-green)" : "rgba(34,211,238,0.4)",
                          }}
                        >
                          {live ? <Activity size={11} /> : <CheckCircle2 size={11} />}
                          {live ? "RUNNING" : "SHIPPED"}
                        </span>
                        <span className="font-mono text-[11px] text-muted">{m.dates}</span>
                      </div>
                    </div>
                    <ul className="mt-4 flex flex-col gap-2">
                      {m.bullets.map((b, bi) => (
                        <li key={bi} className="flex gap-2 text-sm leading-relaxed text-muted">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-hudcyan" aria-hidden />
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
