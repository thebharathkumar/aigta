"use client";

import { motion } from "framer-motion";
import { Volume2, VolumeX, Gauge, Flag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navItems } from "@/lib/content";
import { useGame } from "./providers/GameProvider";

// A simple closed racing-line path for the mini track map.
const TRACK_PATH =
  "M14 40 C14 18 40 14 60 16 C84 18 70 34 90 36 C112 38 116 18 134 24 C150 30 146 52 124 54 C100 56 96 44 70 48 C44 52 40 60 22 56 C8 53 14 50 14 40 Z";

function DrsBadge({ active }: { active: boolean }) {
  return (
    <span
      className="rounded px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-widest"
      style={{
        color: active ? "#001b16" : "var(--muted)",
        background: active ? "var(--hud-green)" : "transparent",
        border: `1px solid ${active ? "var(--hud-green)" : "rgba(255,255,255,0.15)"}`,
      }}
    >
      DRS
    </span>
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
  const [speed, setSpeed] = useState(0);
  const lastY = useRef(0);
  const lastT = useRef(0);

  // Derive a flavor speed and gear from scroll velocity.
  useEffect(() => {
    let raf = 0;
    let decay = 0;
    const tick = () => {
      const y = window.scrollY;
      const now = performance.now();
      const dt = Math.max(16, now - lastT.current);
      const v = Math.abs(y - lastY.current) / dt; // px per ms
      lastY.current = y;
      lastT.current = now;
      // Map velocity to a 0 to 340 km/h readout with smoothing.
      const target = Math.min(340, v * 900);
      setSpeed((s) => s + (target - s) * 0.2);
      cancelAnimationFrame(decay);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const gear = Math.max(1, Math.min(8, Math.round(speed / 44) + 1));
  const drsActive = speed > 180;
  const trackProgress =
    navItems.length > 1 ? activeIndex / (navItems.length - 1) : 0;

  return (
    <>
      {/* Top-left: mini track map with car position and current sector. */}
      <div className="pointer-events-auto fixed left-3 top-3 z-50 md:left-4 md:top-4">
        <div className="carbon rounded-xl border border-white/10 p-2.5 shadow-hud md:p-3">
          <div className="mb-1.5 flex items-center justify-between gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
              Track
            </span>
            <DrsBadge active={drsActive} />
          </div>
          <div className="relative h-20 w-28 md:h-24 md:w-32">
            <svg viewBox="0 0 150 75" className="h-full w-full">
              <path d={TRACK_PATH} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth={4} />
              <path
                d={TRACK_PATH}
                fill="none"
                stroke="var(--f1-red)"
                strokeWidth={2.5}
                strokeDasharray="6 200"
                strokeDashoffset={-trackProgress * 206}
                strokeLinecap="round"
              />
              {/* Start/finish line */}
              <rect x={11} y={36} width={6} height={8} className="fill-white" />
            </svg>
            <motion.span
              className="absolute h-2.5 w-2.5 rounded-full bg-hudcyan shadow-glow"
              animate={{
                left: `${10 + Math.cos(trackProgress * Math.PI * 2) * 38 + 38}%`,
                top: `${20 + Math.sin(trackProgress * Math.PI * 2) * 28 + 24}%`,
              }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
            />
          </div>
          <p className="mt-1 max-w-[7rem] truncate font-mono text-[10px] text-hudcyan">
            {navItems[activeIndex]?.label ?? "Grid"}
          </p>
        </div>
      </div>

      {/* Top-right: speed, gear, points counter, mute. */}
      <div className="pointer-events-auto fixed right-3 top-3 z-50 md:right-4 md:top-4">
        <div className="carbon rounded-xl border border-white/10 px-3 py-2 text-right shadow-hud">
          <div className="flex items-center justify-end gap-2">
            <Gauge size={14} className="text-hudcyan" />
            <span className="font-mono text-lg font-bold tabular-nums text-ink md:text-2xl">
              {Math.round(speed)}
            </span>
            <span className="font-mono text-[10px] text-muted">km/h</span>
          </div>
          <div className="mt-0.5 flex items-center justify-end gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
              Gear
            </span>
            <motion.span
              key={gear}
              initial={{ scale: 1.4, color: "var(--hud-green)" }}
              animate={{ scale: 1, color: "var(--text)" }}
              className="font-display text-xl leading-none"
            >
              {gear}
            </motion.span>
          </div>
          <div className="mt-1 flex items-center justify-end gap-3 border-t border-white/10 pt-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
              Points
            </span>
            <span className="font-mono text-sm font-bold text-hudgreen">
              {Math.round(money / 1000).toLocaleString("en-US")}
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              toggleMute();
              play("click");
            }}
            className="mt-1 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted hover:text-ink"
            aria-pressed={!muted}
            aria-label={muted ? "Unmute team radio" : "Mute team radio"}
          >
            {muted ? <VolumeX size={12} /> : <Volume2 size={12} />}
            {muted ? "Radio off" : "Radio on"}
          </button>
        </div>
      </div>

      {/* Bottom-left: tyre and status bars. Hidden on small screens. */}
      <div className="pointer-events-none fixed bottom-3 left-3 z-50 hidden md:block">
        <div className="carbon rounded-xl border border-white/10 p-3 shadow-hud">
          <StatusBar label="Driver: Open to a seat" color="var(--hud-green)" value={100} />
          <div className="h-2" />
          <StatusBar label="Strategy: Pushing" color="var(--hud-cyan)" value={88} />
          {wanted > 0 && (
            <div className="mt-2 flex items-center gap-1.5">
              <Flag size={11} className="text-hudpink" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-hudpink">
                Push mode x{wanted}
              </span>
            </div>
          )}
          <div className="mt-2 font-mono text-[9px] uppercase tracking-widest text-muted">
            Tab for steering wheel. Tilde for pit commands.
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
