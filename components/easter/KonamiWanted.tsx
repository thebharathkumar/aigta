"use client";

import { useEffect, useRef } from "react";
import { useGame } from "../providers/GameProvider";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

// Typing the Konami sequence raises the HUD wanted level with a siren flash.
export default function KonamiWanted() {
  const { setWanted, play } = useGame();
  const pos = useRef(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const expected = SEQUENCE[pos.current];
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === expected) {
        pos.current += 1;
        if (pos.current === SEQUENCE.length) {
          pos.current = 0;
          setWanted(Math.floor(Math.random() * 3) + 3); // 3 to 5 stars
          play("siren");
          document.body.classList.add("animate-siren");
          setTimeout(() => document.body.classList.remove("animate-siren"), 1800);
        }
      } else {
        pos.current = key === SEQUENCE[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setWanted, play]);

  return null;
}
