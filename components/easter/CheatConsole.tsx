"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useGame } from "../providers/GameProvider";

// Fake cheat codes. Typing one toggles a theme or pokes the HUD. Pure fun.
const CHEATS: Record<string, { label: string; run: (g: ReturnType<typeof useGame>) => void }> = {
  VICECITY: { label: "Vice City night mode", run: (g) => g.setTheme("vice") },
  LOSSANTOS: { label: "Los Santos day mode", run: (g) => g.setTheme("los-santos") },
  WANTED: { label: "Heat is on", run: (g) => g.setWanted(5) },
  COOLDOWN: { label: "Lose the cops", run: (g) => g.setWanted(0) },
};

export default function CheatConsole() {
  const game = useGame();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [feedback, setFeedback] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing = ["INPUT", "TEXTAREA"].includes(target?.tagName);
      if ((e.key === "~" || e.key === "`") && !typing) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = value.trim().toUpperCase();
    const cheat = CHEATS[code];
    game.play("click");
    if (cheat) {
      cheat.run(game);
      setFeedback(`CHEAT ACTIVATED: ${cheat.label}`);
    } else {
      setFeedback("UNKNOWN CHEAT");
    }
    setValue("");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-x-0 top-0 z-[80] flex justify-center p-4"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
        >
          <div className="hud-panel w-full max-w-lg rounded-xl p-3 shadow-hud">
            <form onSubmit={submit} className="flex items-center gap-2">
              <Terminal size={16} className="text-hudgreen" />
              <span className="font-mono text-xs text-hudgreen">cheat:</span>
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Try VICECITY or LOSSANTOS"
                aria-label="Cheat code console"
                className="flex-1 bg-transparent font-mono text-sm text-ink outline-none placeholder:text-muted"
                autoComplete="off"
                spellCheck={false}
              />
              <button type="submit" className="font-mono text-[10px] uppercase tracking-widest text-hudgold">
                Enter
              </button>
            </form>
            {feedback && (
              <p className="mt-2 font-mono text-[11px] text-hudcyan" aria-live="polite">
                {feedback}
              </p>
            )}
            <p className="mt-1 font-mono text-[10px] text-muted">
              Codes: VICECITY, LOSSANTOS, WANTED, COOLDOWN. Tilde to close.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
