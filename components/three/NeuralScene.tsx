"use client";

import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

// Fibonacci sphere distribution so points spread evenly over the surface.
function fibonacciSphere(count: number, radius: number): Float32Array {
  const arr = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    arr[i * 3] = Math.cos(theta) * r * radius;
    arr[i * 3 + 1] = y * radius;
    arr[i * 3 + 2] = Math.sin(theta) * r * radius;
  }
  return arr;
}

// Twinkling additive particle nebula that drifts behind everything.
function Nebula({ count = 3500 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Spread in a thick shell so depth reads well.
      const r = 5 + Math.random() * 7;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = Math.sin(p) * Math.cos(t) * r;
      positions[i * 3 + 1] = Math.sin(p) * Math.sin(t) * r * 0.7;
      positions[i * 3 + 2] = Math.cos(p) * r;
      seeds[i] = Math.random() * 10;
    }
    return { positions, seeds };
  }, [count]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
          uniform float uTime;
          attribute float seed;
          varying float vTw;
          void main() {
            vTw = 0.5 + 0.5 * sin(uTime * 1.5 + seed * 6.2831);
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = (1.6 + vTw * 1.8) * (60.0 / -mv.z);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          varying float vTw;
          void main() {
            float d = length(gl_PointCoord - 0.5);
            if (d > 0.5) discard;
            float a = smoothstep(0.5, 0.0, d) * (0.25 + vTw * 0.55);
            vec3 cyan = vec3(0.18, 0.9, 1.0);
            vec3 mag = vec3(0.95, 0.25, 0.85);
            vec3 col = mix(cyan, mag, vTw);
            gl_FragColor = vec4(col, a);
          }
        `,
      }),
    []
  );

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref} material={material}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-seed" args={[seeds, 1]} />
      </bufferGeometry>
    </points>
  );
}

// The neural-net core: glowing nodes on a sphere connected by additive edges.
function NeuralCore({ nodeCount = 150 }: { nodeCount?: number }) {
  const group = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Points>(null);

  const { nodePositions, edgePositions } = useMemo(() => {
    const radius = 2.6;
    const nodePositions = fibonacciSphere(nodeCount, radius);
    // Connect each node to a few nearest neighbours to form a network.
    const edges: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const ax = nodePositions[i * 3];
      const ay = nodePositions[i * 3 + 1];
      const az = nodePositions[i * 3 + 2];
      const dists: { j: number; d: number }[] = [];
      for (let j = 0; j < nodeCount; j++) {
        if (i === j) continue;
        const dx = ax - nodePositions[j * 3];
        const dy = ay - nodePositions[j * 3 + 1];
        const dz = az - nodePositions[j * 3 + 2];
        dists.push({ j, d: dx * dx + dy * dy + dz * dz });
      }
      dists.sort((p, q) => p.d - q.d);
      for (let k = 0; k < 2; k++) {
        const j = dists[k].j;
        if (j > i) {
          edges.push(ax, ay, az, nodePositions[j * 3], nodePositions[j * 3 + 1], nodePositions[j * 3 + 2]);
        }
      }
    }
    return { nodePositions, edgePositions: new Float32Array(edges) };
  }, [nodeCount]);

  const nodeMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
          uniform float uTime;
          varying float vP;
          void main() {
            vP = 0.5 + 0.5 * sin(uTime * 2.0 + position.x * 2.0 + position.y * 3.0);
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = (5.0 + vP * 7.0) * (60.0 / -mv.z);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          varying float vP;
          void main() {
            float d = length(gl_PointCoord - 0.5);
            if (d > 0.5) discard;
            float core = smoothstep(0.5, 0.0, d);
            vec3 cyan = vec3(0.3, 0.95, 1.0);
            vec3 blue = vec3(0.35, 0.5, 1.0);
            vec3 col = mix(blue, cyan, vP);
            gl_FragColor = vec4(col, core);
          }
        `,
      }),
    []
  );

  const edgeMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        color: new THREE.Color(0.2, 0.7, 1.0),
      }),
    []
  );

  useFrame((state) => {
    nodeMaterial.uniforms.uTime.value = state.clock.elapsedTime;
    if (group.current) {
      const t = state.clock.elapsedTime;
      group.current.rotation.y = t * 0.12;
      group.current.rotation.x = Math.sin(t * 0.15) * 0.18;
      // Gentle breathing scale.
      const s = 1 + Math.sin(t * 0.8) * 0.03;
      group.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={group}>
      <lineSegments material={edgeMaterial}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edgePositions, 3]} />
        </bufferGeometry>
      </lineSegments>
      <points ref={nodesRef} material={nodeMaterial}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
      </points>
    </group>
  );
}

// Wraps the whole scene and applies mouse parallax to the camera rig.
export default function NeuralScene() {
  const rig = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!rig.current) return;
    // Ease the rig toward the pointer for parallax.
    rig.current.rotation.y += (state.pointer.x * 0.35 - rig.current.rotation.y) * 0.04;
    rig.current.rotation.x += (-state.pointer.y * 0.25 - rig.current.rotation.x) * 0.04;
  });

  return (
    <group ref={rig}>
      <Nebula />
      <NeuralCore />
    </group>
  );
}
