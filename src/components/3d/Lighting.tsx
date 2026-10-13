"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface LightingProps {
  progress?: number;
}

export function Lighting({ progress = 0 }: LightingProps) {
  const cyanLightRef = useRef<THREE.PointLight>(null);
  const violetLightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (cyanLightRef.current) {
      cyanLightRef.current.position.x = Math.sin(time * 0.7) * 4;
      cyanLightRef.current.position.y = Math.cos(time * 0.5) * 3 + 1;
      cyanLightRef.current.position.z = Math.cos(time * 0.7) * 4;
    }

    if (violetLightRef.current) {
      violetLightRef.current.position.x = -Math.sin(time * 0.6) * 4;
      violetLightRef.current.position.y = -Math.cos(time * 0.4) * 3 - 1;
      violetLightRef.current.position.z = -Math.cos(time * 0.6) * 4;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} color="#fed7aa" />

      {/* Main key directional light */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.3}
        color="#fffbeb"
      />

      {/* Warm Terracotta dynamic point light */}
      <pointLight
        ref={cyanLightRef}
        color="#e76735"
        intensity={3.4}
        distance={14}
        decay={2}
      />

      {/* Golden Amber dynamic point light */}
      <pointLight
        ref={violetLightRef}
        color="#d97706"
        intensity={2.9}
        distance={14}
        decay={2}
      />

      {/* Warm copper cognac back rim light */}
      <directionalLight
        position={[-5, -4, -6]}
        intensity={1.1}
        color="#c2410c"
      />
    </>
  );
}
