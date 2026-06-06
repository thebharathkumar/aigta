"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, BookOpen, Mic, FileText, MapPin } from "lucide-react";
import type { PhoneApp } from "@/lib/content";
import { phoneApps, profile } from "@/lib/content";
import { Section, Reveal, Eyebrow, Heading } from "../ui/Section";
import { useGame } from "../providers/GameProvider";

const iconFor: Record<PhoneApp["kind"], React.ReactNode> = {
  email: <Mail />,
  linkedin: <Linkedin />,
  github: <Github />,
  medium: <BookOpen />,
  podcast: <Mic />,
  resume: <FileText />,
};

const colorFor: Record<PhoneApp["kind"], string> = {
  email: "var(--hud-gold)",
  linkedin: "var(--hud-cyan)",
  github: "var(--text)",
  medium: "var(--hud-green)",
  podcast: "var(--hud-pink)",
  resume: "var(--hud-gold)",
};

export default function Contact() {
  const { play } = useGame();
  const now = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  return (
    <Section id="contact">
      <Reveal>
        <Eyebrow>Pit Wall</Eyebrow>
        <Heading>TEAM RADIO</Heading>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        {/* Original phone UI homage. All assets are custom CSS, no third-party marks. */}
        <Reveal>
          <div className="mx-auto w-[300px] max-w-full">
            <div className="relative rounded-[2.5rem] border-4 border-white/10 bg-black p-3 shadow-hud">
              {/* Notch */}
              <div className="mx-auto mb-2 h-5 w-28 rounded-b-2xl bg-black" aria-hidden />
              <div
                className="rounded-[2rem] p-5"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(242,193,78,0.12), rgba(14,14,16,0.95))",
                }}
              >
                {/* Status bar */}
                <div className="mb-6 flex items-center justify-between font-mono text-[11px] text-ink">
                  <span>{now}</span>
                  <span className="text-hudgreen">PIT WALL // COMMS</span>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {phoneApps.map((app, i) => (
                    <motion.a
                      key={app.id}
                      href={app.href}
                      target={app.kind === "email" ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      onClick={() => play("click")}
                      className="flex flex-col items-center gap-1.5"
                      initial={{ opacity: 0, scale: 0.7 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -3 }}
                      aria-label={app.label}
                    >
                      <span
                        className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-surface"
                        style={{ color: colorFor[app.kind] }}
                      >
                        {iconFor[app.kind]}
                      </span>
                      <span className="font-mono text-[10px] text-muted">{app.label}</span>
                    </motion.a>
                  ))}
                </div>

                {/* Home indicator */}
                <div className="mx-auto mt-8 h-1.5 w-24 rounded-full bg-white/30" aria-hidden />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="carbon rounded-2xl border border-white/10 p-6 shadow-hud">
            <h3 className="font-display text-3xl text-ink">BOX, BOX. LET&apos;S TALK</h3>
            <p className="mt-3 text-base leading-relaxed text-muted">
              Open a channel to reach me. I am open to AI/ML Engineer, Forward Deployed Engineer,
              and Software Engineer roles.
            </p>
            <div className="mt-5 flex items-center gap-2 rounded-lg border border-hudcyan/30 bg-hudcyan/5 px-4 py-3">
              <MapPin size={16} className="text-hudcyan" />
              <span className="font-mono text-xs uppercase tracking-wide text-hudcyan">
                {profile.location}
              </span>
            </div>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => play("stamp")}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-3 font-display text-lg tracking-wide text-white shadow-glow transition-transform hover:scale-[1.03]"
            >
              <FileText size={18} />
              GRAB THE MEDIA PASS (RESUME)
            </a>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted">
              Drop resume.pdf into /public to arm this download.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
