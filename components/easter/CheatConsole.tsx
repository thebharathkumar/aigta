"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useGame } from "../providers/GameProvider";

// Pit commands. Typing one toggles a theme or pokes the HUD. Pure fun.
const CHEATS: Record<string, { label: string; run: (g: ReturnType<typeof useGame>) => void }> = {
  NIGHTRACE: { label: "Night race under the lights", run: (g) => g.setTheme("night") },
  RACEDAY: { label: "Race day, full sun", run: (g) => g.setTheme("race") },
  PUSH: { label: "Push mode engaged", run: (g) => g.setWanted(5) },
  BOX: { label: "Box this lap, cool down", run: (g) => g.setWanted(0) },
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
    game.play("rev");
    if (cheat) {
      cheat.run(game);
      setFeedback(`COPY THAT: ${cheat.label}`);
    } else {
      setFeedback("RADIO CHECK: command not recognised");
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
          <div className="carbon w-full max-w-lg rounded-xl border border-white/10 p-3 shadow-hud">
            <form onSubmit={submit} className="flex items-center gap-2">
              <Terminal size={16} className="text-hudgreen" />
              <span className="font-mono text-xs text-hudgreen">pit:</span>
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Try NIGHTRACE or RACEDAY"
                aria-label="Pit command console"
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
              Commands: NIGHTRACE, RACEDAY, PUSH, BOX. Tilde to close.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
