"use client";

import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { Suspense } from "react";
import NeuralScene from "./NeuralScene";

// Full WebGL canvas with bloom. Rendered behind the hero content.
export default function SceneCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 55 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <color attach="background" args={["#05060e"]} />
      <fog attach="fog" args={["#05060e", 8, 18]} />
      <Suspense fallback={null}>
        <NeuralScene />
      </Suspense>
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={1.4}
          luminanceThreshold={0.05}
          luminanceSmoothing={0.85}
          mipmapBlur
          radius={0.7}
        />
        <Vignette eskil={false} offset={0.25} darkness={0.85} />
      </EffectComposer>
    </Canvas>
  );
}
