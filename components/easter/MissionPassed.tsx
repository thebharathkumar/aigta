"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useGame } from "../providers/GameProvider";

// One-time banner that slaps in when the projects section is completed.
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
          <motion.div
            className="text-center"
            initial={{ scale: reduced ? 1 : 1.6, opacity: 0, rotate: reduced ? 0 : -6 }}
            animate={{ scale: 1, opacity: 1, rotate: -4 }}
            transition={{ type: "spring", stiffness: 320, damping: 14 }}
          >
            <div className="border-y-4 border-hudgold bg-black/70 px-10 py-6 backdrop-blur-sm">
              <p className="font-display text-5xl tracking-wider text-hudgold md:text-7xl">
                MISSION PASSED
              </p>
              <p className="mt-2 font-mono text-lg tracking-[0.4em] text-hudgreen">RESPECT++</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
