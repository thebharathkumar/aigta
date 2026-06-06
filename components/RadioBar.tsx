"use client";

import { LayoutGrid } from "lucide-react";
import { navItems } from "@/lib/content";
import { useGame } from "./providers/GameProvider";

// Bottom strip that jumps between sections, styled like a tab switcher.
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
      <div className="glass flex items-center gap-1 rounded-full px-3 py-1.5 shadow-hud">
        <LayoutGrid size={13} className="mr-1 text-[var(--accent)]" aria-hidden />
        <span className="mr-2 font-mono text-[9px] uppercase tracking-widest text-muted">
          Jump
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
                ? "bg-[var(--accent)] text-[#04040a]"
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
