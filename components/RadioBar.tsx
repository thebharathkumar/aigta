"use client";

import { Radio } from "lucide-react";
import { navItems } from "@/lib/content";
import { useGame } from "./providers/GameProvider";

// Bottom "radio station" strip that is really a section switcher styled like a
// tuner. Audio stays muted by default; this is navigation flavor.
export default function RadioBar({
  activeIndex,
  onNavigate,
}: {
  activeIndex: number;
  onNavigate: (id: string) => void;
}) {
  const { play } = useGame();

  return (
    <div className="pointer-events-auto fixed bottom-0 left-1/2 z-40 hidden -translate-x-1/2 pb-2 md:block">
      <div className="hud-panel flex items-center gap-1 rounded-full px-3 py-1.5 shadow-hud">
        <Radio size={14} className="mr-1 text-hudpink" aria-hidden />
        <span className="mr-2 font-mono text-[9px] uppercase tracking-widest text-muted">
          Tuner
        </span>
        {navItems.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              play("click");
              onNavigate(item.id);
            }}
            className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide transition-colors ${
              i === activeIndex
                ? "bg-hudgold text-black"
                : "text-muted hover:text-ink"
            }`}
            aria-current={i === activeIndex ? "true" : undefined}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
