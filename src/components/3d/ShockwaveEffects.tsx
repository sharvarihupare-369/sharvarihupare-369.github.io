"use client";

import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Wave {
  id: number;
  x: number;
  y: number;
  scale: number;
  opacity: number;
  color: string;
}

export function ShockwaveEffects() {
  const [waves, setWaves] = useState<Wave[]>([]);
  const nextId = useRef(1);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Normalized click coords
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;

      const colors = ["#d85827", "#f5ab79", "#c67d1f", "#e76735"];
      const color = colors[Math.floor(Math.random() * colors.length)];

      setWaves((prev) => [
        ...prev.slice(-3), // keep maximum 4 active waves for performance
        {
          id: nextId.current++,
          x: nx * 3.2,
          y: ny * 2.4,
          scale: 0.1,
          opacity: 0.9,
          color,
        },
      ]);
    };

    window.addEventListener("pointerdown", handleClick);
    return () => window.removeEventListener("pointerdown", handleClick);
  }, []);

  useFrame((_, delta) => {
    if (waves.length === 0) return;

    setWaves((prev) =>
      prev
        .map((w) => ({
          ...w,
          scale: w.scale + delta * 5.0,
          opacity: w.opacity - delta * 1.8,
        }))
        .filter((w) => w.opacity > 0.05)
    );
  });

  return (
    <group>
      {waves.map((w) => (
        <mesh key={w.id} position={[w.x, w.y, 1.5]} scale={[w.scale, w.scale, 1]}>
          <ringGeometry args={[0.3, 0.38, 32]} />
          <meshBasicMaterial
            color={w.color}
            transparent
            opacity={w.opacity}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
