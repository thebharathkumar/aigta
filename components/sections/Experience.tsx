"use client";

import { CheckeredFlagIcon } from "../art/icons";
import { Flag } from "lucide-react";
import { missions } from "@/lib/content";
import { Section, Reveal, Eyebrow, Heading } from "../ui/Section";

// Circuit flavour names mapped from the real location. Clearly fictional.
function circuitFor(place: string): string {
  if (place.includes("New York")) return "Liberty Street Circuit";
  if (place.includes("Bangalore")) return "Bengaluru City Circuit";
  return "Simulator Grand Prix";
}

export default function Experience() {
  return (
    <Section id="experience">
      <Reveal>
        <Eyebrow>Season Results</Eyebrow>
        <Heading>THE RACE CALENDAR</Heading>
      </Reveal>

      <div className="relative mt-12 pl-6 md:pl-8">
        {/* Track rail with a dashed racing line. */}
        <div
          className="absolute left-0 top-2 h-full w-1 rounded bg-[repeating-linear-gradient(to_bottom,var(--accent)_0,var(--accent)_10px,transparent_10px,transparent_20px)]"
          aria-hidden
        />

        <div className="flex flex-col gap-6">
          {missions.map((m, i) => {
            const live = m.status === "IN PROGRESS";
            const round = String(missions.length - i).padStart(2, "0");
            return (
              <Reveal key={m.role} delay={i * 0.06}>
                <div className="relative">
                  <span
                    className="absolute -left-[1.7rem] top-5 flex h-5 w-5 items-center justify-center rounded-full border-2 md:-left-[2.2rem]"
                    style={{
                      borderColor: live ? "var(--hud-green)" : "var(--accent)",
                      background: "var(--bg)",
                    }}
                    aria-hidden
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: live ? "var(--hud-green)" : "var(--accent)" }}
                    />
                  </span>

                  <article className="carbon rounded-2xl border border-white/10 p-5 shadow-hud md:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
                          Round {round}{" // "}{circuitFor(m.place)}
                        </span>
                        <h3 className="mt-1 font-display text-xl text-ink md:text-2xl">{m.role}</h3>
                        <p className="font-mono text-xs uppercase tracking-wide text-hudcyan">
                          {m.company}{" // "}{m.place}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span
                          className="inline-flex items-center gap-1 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-widest"
                          style={{
                            color: live ? "var(--hud-green)" : "var(--ink)",
                            borderColor: live ? "var(--hud-green)" : "rgba(255,255,255,0.25)",
                          }}
                        >
                          {live ? <Flag size={11} /> : <CheckeredFlagIcon className="h-3 w-3" />}
                          {live ? "ON TRACK" : "CLASSIFIED"}
                        </span>
                        <span className="font-mono text-[11px] text-muted">{m.dates}</span>
                      </div>
                    </div>
                    <ul className="mt-4 flex flex-col gap-2">
                      {m.bullets.map((b, bi) => (
                        <li key={bi} className="flex gap-2 text-sm leading-relaxed text-muted">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-[var(--accent)]" aria-hidden />
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
