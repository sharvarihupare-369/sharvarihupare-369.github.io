"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PortalGate {
  id: string;
  name: string;
  position: [number, number, number];
  color: string;
  radius: number;
}

export function SpacePortals({ progress }: { progress: number }) {
  const gatesRef = useRef<THREE.Group>(null);

  const gates: PortalGate[] = useMemo(
    () => [
      { id: "hero", name: "SECTOR 01: GENESIS", position: [0.8, 0, -1.0], color: "#e76735", radius: 2.2 },
      { id: "about", name: "SECTOR 02: MEDICINE_CODE", position: [-0.9, 0.2, -5.5], color: "#c67d1f", radius: 2.4 },
      { id: "experience", name: "SECTOR 03: CAREER_RAILS", position: [1.0, -0.2, -10.5], color: "#ea580c", radius: 2.3 },
      { id: "projects", name: "SECTOR 04: PROJECT_NEXUS", position: [0.0, 0.6, -15.5], color: "#d85827", radius: 2.5 },
      { id: "skills", name: "SECTOR 05: TECH_MATRIX", position: [-0.8, -0.1, -20.5], color: "#f5ab79", radius: 2.3 },
      { id: "contact", name: "SECTOR 06: TRANSMISSION", position: [0.0, 0.1, -25.5], color: "#f0834c", radius: 2.4 },
    ],
    []
  );

  useFrame((state, delta) => {
    if (!gatesRef.current) return;
    const time = state.clock.getElapsedTime();

    gatesRef.current.children.forEach((child, index) => {
      // Rotate inner energy ring
      child.rotation.z = time * (0.25 + index * 0.05);

      // Subtle breathing pulse
      const pulse = 1 + Math.sin(time * 2.0 + index) * 0.04;
      child.scale.set(pulse, pulse, pulse);
    });
  });

  return (
    <group ref={gatesRef}>
      {gates.map((gate) => (
        <group key={gate.id} position={gate.position}>
          {/* Main Glowing Holographic Ring */}
          <mesh>
            <torusGeometry args={[gate.radius, 0.045, 16, 48]} />
            <meshStandardMaterial
              color={gate.color}
              emissive={gate.color}
              emissiveIntensity={2.8}
              transparent
              opacity={0.82}
              roughness={0.1}
            />
          </mesh>

          {/* Outer Segmented Tech Ring */}
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <torusGeometry args={[gate.radius + 0.18, 0.02, 12, 32]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive={gate.color}
              emissiveIntensity={1.2}
              transparent
              opacity={0.5}
            />
          </mesh>

          {/* Orbiting Waypoint Light */}
          <pointLight color={gate.color} distance={6} intensity={1.5} />
        </group>
      ))}
    </group>
  );
}
