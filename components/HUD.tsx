"use client";

import { motion } from "framer-motion";
import { Volume2, VolumeX, Activity, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navItems } from "@/lib/content";
import { useGame } from "./providers/GameProvider";

export default function HUD({ money, activeIndex }: { money: number; activeIndex: number }) {
  const { muted, toggleMute, wanted, play } = useGame();
  const [rate, setRate] = useState(0);
  const [spark, setSpark] = useState<number[]>(Array(20).fill(4));
  const lastY = useRef(0);
  const lastT = useRef(0);

  // Derive a flavor token rate from scroll velocity and feed a sparkline.
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const y = window.scrollY;
      const now = performance.now();
      const dt = Math.max(16, now - lastT.current);
      const v = Math.abs(y - lastY.current) / dt;
      lastY.current = y;
      lastT.current = now;
      const target = Math.min(2400, v * 6000);
      setRate((s) => s + (target - s) * 0.2);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setSpark((s) => [...s.slice(1), 3 + Math.round((rate / 2400) * 18 + Math.random() * 4)]);
    }, 220);
    return () => clearInterval(id);
  }, [rate]);

  return (
    <>
      {/* Top-left: system status with a live throughput sparkline. */}
      <div className="pointer-events-auto fixed left-3 top-3 z-50 md:left-4 md:top-4">
        <div className="glass rounded-xl p-2.5 shadow-hud md:p-3">
          <div className="mb-1.5 flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
              <Activity size={10} className="text-hudgreen" /> System
            </span>
            <span className="font-mono text-[9px] text-hudgreen">ONLINE</span>
          </div>
          <svg viewBox="0 0 80 26" className="h-8 w-24 md:w-28" aria-hidden>
            <polyline
              points={spark.map((v, i) => `${(i / (spark.length - 1)) * 80},${26 - v}`).join(" ")}
              fill="none"
              stroke="var(--hud-cyan)"
              strokeWidth={1.5}
            />
          </svg>
          <p className="mt-1 max-w-[7rem] truncate font-mono text-[10px] text-hudcyan">
            {navItems[activeIndex]?.label ?? "Home"}
          </p>
        </div>
      </div>

      {/* Top-right: token counter, throughput, mute. */}
      <div className="pointer-events-auto fixed right-3 top-3 z-50 md:right-4 md:top-4">
        <div className="glass rounded-xl px-3 py-2 text-right shadow-hud">
          <div className="flex items-center justify-end gap-2">
            <Zap size={14} className="text-hudpink" />
            <span className="font-mono text-lg font-bold tabular-nums text-ink md:text-2xl">
              {Math.round(money / 1000).toLocaleString("en-US")}
            </span>
            <span className="font-mono text-[10px] text-muted">tok</span>
          </div>
          <div className="mt-0.5 font-mono text-[10px] text-hudcyan">
            {Math.round(rate)} tok/s
          </div>
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
            {muted ? "Audio off" : "Audio on"}
          </button>
        </div>
      </div>

      {/* Bottom-left: status bars. Hidden on small screens. */}
      <div className="pointer-events-none fixed bottom-3 left-3 z-50 hidden md:block">
        <div className="glass rounded-xl p-3 shadow-hud">
          <StatusBar label="Availability: Open to roles" color="var(--hud-green)" value={100} />
          <div className="h-2" />
          <StatusBar label="Pipeline: Shipping" color="var(--hud-cyan)" value={88} />
          {wanted > 0 && (
            <div className="mt-2 inline-flex items-center gap-1.5">
              <Zap size={11} className="text-hudpink" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-hudpink">
                Turbo x{wanted}
              </span>
            </div>
          )}
          <div className="mt-2 font-mono text-[9px] uppercase tracking-widest text-muted">
            Tab for the command hub. Tilde for the console.
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
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: color, boxShadow: `0 0 10px ${color}` }} />
      </div>
    </div>
  );
}
