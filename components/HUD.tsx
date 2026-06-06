"use client";

import { motion } from "framer-motion";
import { Volume2, VolumeX, Radio } from "lucide-react";
import { navItems, profile } from "@/lib/content";
import { useGame } from "./providers/GameProvider";

function WantedStars({ level }: { level: number }) {
  if (level <= 0) return null;
  return (
    <div className="flex items-center gap-0.5" aria-label={`Wanted level ${level} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="text-sm leading-none"
          style={{ color: i < level ? "var(--wanted)" : "rgba(255,255,255,0.15)" }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function HUD({
  money,
  activeIndex,
}: {
  money: number;
  activeIndex: number;
}) {
  const { muted, toggleMute, wanted, play } = useGame();

  return (
    <>
      {/* Top-left minimap / radar. Highlights the current section. */}
      <div className="pointer-events-auto fixed left-3 top-3 z-50 md:left-4 md:top-4">
        <div className="hud-panel rounded-xl p-2.5 shadow-hud md:p-3">
          <div className="mb-1.5 flex items-center justify-between gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
              Radar
            </span>
            <WantedStars level={wanted} />
          </div>
          <div className="relative h-20 w-20 overflow-hidden rounded-lg border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(127,184,0,0.15),transparent_60%)] md:h-24 md:w-24">
            {/* Faux street grid */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)",
                backgroundSize: "14px 14px",
              }}
              aria-hidden
            />
            {/* Player blip moves with the active section. */}
            <motion.span
              className="absolute h-2.5 w-2.5 rounded-full bg-hudgold shadow-glow"
              animate={{
                left: `${15 + (activeIndex / Math.max(1, navItems.length - 1)) * 65}%`,
                top: `${20 + ((activeIndex * 37) % 60)}%`,
              }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
            />
          </div>
          <p className="mt-1.5 max-w-[5.5rem] truncate font-mono text-[10px] text-hudcyan">
            {navItems[activeIndex]?.label ?? "Home"}
          </p>
        </div>
      </div>

      {/* Top-right money counter. */}
      <div className="pointer-events-auto fixed right-3 top-3 z-50 md:right-4 md:top-4">
        <div className="hud-panel rounded-xl px-3 py-2 text-right shadow-hud">
          <span className="block font-mono text-lg font-bold text-hudgreen md:text-2xl">
            ${money.toLocaleString("en-US")}
          </span>
          <button
            type="button"
            onClick={() => {
              toggleMute();
              play("click");
            }}
            className="mt-1 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted hover:text-ink"
            aria-pressed={!muted}
            aria-label={muted ? "Unmute interface sounds" : "Mute interface sounds"}
          >
            {muted ? <VolumeX size={12} /> : <Volume2 size={12} />}
            {muted ? "Muted" : "Sound"}
          </button>
        </div>
      </div>

      {/* Bottom-left status bars (themed health/armor). Hidden on small screens. */}
      <div className="pointer-events-none fixed bottom-3 left-3 z-50 hidden md:block">
        <div className="hud-panel rounded-xl p-3 shadow-hud">
          <StatusBar label={`Availability: ${profile.availability}`} color="var(--hud-green)" value={100} />
          <div className="h-2" />
          <StatusBar label={`Status: ${profile.status}`} color="var(--hud-cyan)" value={85} />
          <div className="mt-2 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-muted">
            <Radio size={11} className="text-hudpink" />
            Press Tab for weapon wheel. Tilde for cheats.
          </div>
        </div>
      </div>
    </>
  );
}

function StatusBar({ label, color, value }: { label: string; color: string; value: number }) {
  return (
    <div className="w-56">
      <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-muted">
        {label}
      </span>
      <div className="h-2 w-full overflow-hidden rounded-full bg-black/50">
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: color }} />
      </div>
    </div>
  );
}
