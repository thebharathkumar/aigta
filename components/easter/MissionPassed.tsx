"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useGame } from "../providers/GameProvider";

// One-time banner that fires when the systems section is fully explored.
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
    const id = setTimeout(onHide, 2600);
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
          {/* Radial energy burst. */}
          <motion.div
            className="absolute h-[40vmin] w-[40vmin] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(34,211,238,0.4), transparent 70%)" }}
            initial={{ scale: reduced ? 1 : 0.2, opacity: 0.9 }}
            animate={{ scale: reduced ? 1 : 3, opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            aria-hidden
          />
          <motion.div
            className="text-center"
            initial={{ scale: reduced ? 1 : 1.5, opacity: 0, y: reduced ? 0 : 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 15 }}
          >
            <div className="glass rounded-2xl border-y-2 border-hudcyan px-10 py-6 backdrop-blur-md">
              <p className="glow-text font-display text-4xl font-extrabold tracking-wide text-hudcyan md:text-6xl">
                INFERENCE COMPLETE
              </p>
              <p className="mt-2 font-mono text-base tracking-[0.4em] text-hudgreen md:text-lg">
                ALL SYSTEMS GREEN
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
