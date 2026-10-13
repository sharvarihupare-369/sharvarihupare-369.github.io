"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface StarFieldProps {
  count?: number;
  mouse?: { x: number; y: number };
  velocity?: number;
  isWarping?: boolean;
}

export function StarField({
  count = 1400,
  mouse = { x: 0, y: 0 },
  velocity = 0,
  isWarping = false,
}: StarFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const geomRef = useRef<THREE.BufferGeometry>(null);

  const { positions, colors, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const spd = new Float32Array(count);

    const terracotta = new THREE.Color("#e76735");
    const amber = new THREE.Color("#c67d1f");
    const cream = new THREE.Color("#fdfbf7");
    const tempColor = new THREE.Color();

    for (let i = 0; i < count; i++) {
      // Deep flight space corridor matching Image 2
      const radius = 1.8 + Math.random() * 14.5;
      const angle = Math.random() * Math.PI * 2;

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius;
      // Spread stars along Z axis
      pos[i * 3 + 2] = -35 + Math.random() * 40;

      spd[i] = 0.8 + Math.random() * 1.6;

      const choice = Math.random();
      if (choice < 0.48) {
        tempColor.copy(terracotta);
      } else if (choice < 0.82) {
        tempColor.copy(amber);
      } else {
        tempColor.copy(cream);
      }

      col[i * 3] = tempColor.r;
      col[i * 3 + 1] = tempColor.g;
      col[i * 3 + 2] = tempColor.b;
    }

    return { positions: pos, colors: col, speeds: spd };
  }, [count]);

  useFrame((state, delta) => {
    if (!geomRef.current) return;

    const posAttr = geomRef.current.attributes.position as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    // Slow-motion forward space flight speed
    const baseSpeed = 1.0;
    const warpBoost = velocity * 12.0 + (isWarping ? 10.0 : 0.0);
    const forwardStep = delta * (baseSpeed + warpBoost);

    for (let i = 0; i < count; i++) {
      const zIdx = i * 3 + 2;
      posArray[zIdx] += forwardStep * speeds[i];

      // Loop back to deep space when passing camera
      if (posArray[zIdx] > 6.0) {
        posArray[zIdx] = -35.0 - Math.random() * 4.0;
      }
    }

    posAttr.needsUpdate = true;

    if (pointsRef.current) {
      // Gentle cursor parallax tilt in slow motion
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(
        pointsRef.current.rotation.x,
        state.pointer.y * 0.12,
        0.04
      );
      pointsRef.current.rotation.y = THREE.MathUtils.lerp(
        pointsRef.current.rotation.y,
        state.pointer.x * 0.12,
        0.04
      );
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geomRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      {/* Crisp, luminous stars exactly matching Image 2 */}
      <pointsMaterial
        size={isWarping ? 0.075 : 0.052}
        vertexColors
        transparent
        opacity={0.92}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
