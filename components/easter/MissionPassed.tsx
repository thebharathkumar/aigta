"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useGame } from "../providers/GameProvider";

// One-time chequered-flag banner that slaps in when the race wins are completed.
export default function MissionPassed({
  show,
  onHide,
}: {
  show: boolean;
  onHide: () => void;
}) {
  const reduced = useReducedMotion();
  const { play } = useGame();

  useEffect(() => {
    if (!show) return;
    play("stamp");
    if (!reduced) {
      document.body.classList.add("animate-shake");
      setTimeout(() => document.body.classList.remove("animate-shake"), 400);
    }
    const id = setTimeout(onHide, 2800);
    return () => clearTimeout(id);
  }, [show, onHide, play, reduced]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[85] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Chequered flag waving across the top and bottom. */}
          <motion.div
            className="checkered absolute left-0 right-0 top-0 h-10 opacity-90"
            initial={{ x: reduced ? 0 : "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
            aria-hidden
          />
          <motion.div
            className="checkered absolute bottom-0 left-0 right-0 h-10 opacity-90"
            initial={{ x: reduced ? 0 : "100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
            aria-hidden
          />

          <motion.div
            className="text-center"
            initial={{ scale: reduced ? 1 : 1.6, opacity: 0, rotate: reduced ? 0 : -5 }}
            animate={{ scale: 1, opacity: 1, rotate: -3 }}
            transition={{ type: "spring", stiffness: 320, damping: 14 }}
          >
            <div className="border-y-4 border-[var(--accent)] bg-black/75 px-10 py-6 backdrop-blur-sm">
              <p className="font-display text-5xl tracking-wider text-[var(--accent)] md:text-7xl">
                CHEQUERED FLAG
              </p>
              <p className="mt-2 font-mono text-lg tracking-[0.4em] text-hudgreen">
                P1 // FASTEST LAP
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
