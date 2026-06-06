"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import SceneBoundary from "./SceneBoundary";

// The WebGL canvas is client-only and heavy, so load it lazily and never on
// the server. Reduced-motion users get a calm CSS gradient instead.
const SceneCanvas = dynamic(() => import("./SceneCanvas"), { ssr: false });

export default function HeroBackground() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Always-present gradient. Acts as the canvas backdrop and the reduced
          motion fallback. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 30%, rgba(40,120,255,0.18), transparent 60%), radial-gradient(60% 50% at 80% 80%, rgba(255,40,200,0.14), transparent 60%), #05060e",
        }}
        aria-hidden
      />
      {mounted && !reduced && (
        <SceneBoundary>
          <SceneCanvas />
        </SceneBoundary>
      )}
    </div>
  );
}
