"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CyberShipProps {
  progress: number;
  mouse: { x: number; y: number };
  velocity?: number;
  isWarping?: boolean;
}

export function CyberShip({
  progress,
  mouse,
  velocity = 0,
  isWarping = false,
}: CyberShipProps) {
  const shipGroupRef = useRef<THREE.Group>(null);
  const thrusterLRef = useRef<THREE.Mesh>(null);
  const thrusterRRef = useRef<THREE.Mesh>(null);
  const thrusterGlowLRef = useRef<THREE.PointLight>(null);
  const thrusterGlowRRef = useRef<THREE.PointLight>(null);
  const barrelRollProgress = useRef<number>(0);
  const [isRolling, setIsRolling] = useState(false);

  // Trigger barrel roll on window click or custom event
  useEffect(() => {
    const handleClick = () => {
      if (!isRolling) {
        setIsRolling(true);
        barrelRollProgress.current = 0;
      }
    };

    window.addEventListener("pointerdown", handleClick);
    return () => window.removeEventListener("pointerdown", handleClick);
  }, [isRolling]);

  // Section waypoints for the Cyber Craft flight trajectory
  const shipWaypoints = useMemo(
    () => [
      { t: 0.0, pos: [1.7, 0.0, 1.2], rotY: -0.2 }, // Hero: Hovering on right
      { t: 0.2, pos: [-1.9, 0.3, 0.8], rotY: 0.25 }, // About: Swoops to left flank
      { t: 0.4, pos: [2.0, -0.2, 0.9], rotY: -0.28 }, // Experience: Swoops to right
      { t: 0.65, pos: [0.0, 1.4, 0.3], rotY: 0.0 }, // Projects: Elevated top-center
      { t: 0.85, pos: [-1.9, -0.1, 0.8], rotY: 0.22 }, // Skills: Left flank
      { t: 1.0, pos: [0.0, 0.2, 1.4], rotY: 0.0 }, // Contact: Centered finale
    ],
    []
  );

  const currentPos = useRef(new THREE.Vector3(1.7, 0, 1.2));

  // Procedural Materials
  const hullMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1a0e08"),
        metalness: 0.85,
        roughness: 0.2,
      }),
    []
  );

  const armorPlateMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#2a150e"),
        metalness: 0.7,
        roughness: 0.3,
      }),
    []
  );

  const glowAccentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#f5ab79"),
        emissive: new THREE.Color("#d85827"),
        emissiveIntensity: 2.5,
        metalness: 0.2,
        roughness: 0.1,
      }),
    []
  );

  const thrusterFlameMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#ff8c42"),
        transparent: true,
        opacity: 0.85,
      }),
    []
  );

  const cockpitMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#ffffff"),
        emissive: new THREE.Color("#f5c07b"),
        emissiveIntensity: 1.2,
        roughness: 0.1,
        metalness: 0.9,
      }),
    []
  );

  useFrame((state, delta) => {
    if (!shipGroupRef.current) return;

    const time = state.clock.getElapsedTime();
    const isMobile = state.viewport.width < 7;

    // Interpolate trajectory along waypoints
    const t = Math.max(0, Math.min(progress, 1));
    let startW = shipWaypoints[0];
    let endW = shipWaypoints[shipWaypoints.length - 1];

    for (let i = 0; i < shipWaypoints.length - 1; i++) {
      if (t >= shipWaypoints[i].t && t <= shipWaypoints[i + 1].t) {
        startW = shipWaypoints[i];
        endW = shipWaypoints[i + 1];
        break;
      }
    }

    const range = endW.t - startW.t;
    const localT = range === 0 ? 0 : (t - startW.t) / range;
    const smoothT = localT * localT * (3 - 2 * localT);

    const targetX = isMobile
      ? 0
      : THREE.MathUtils.lerp(startW.pos[0], endW.pos[0], smoothT);
    const targetY = THREE.MathUtils.lerp(startW.pos[1], endW.pos[1], smoothT);
    const targetZ = THREE.MathUtils.lerp(startW.pos[2], endW.pos[2], smoothT);

    // Natural idle hovering float
    const hoverY = Math.sin(time * 2.2) * 0.08;
    const hoverRoll = Math.sin(time * 1.5) * 0.04;

    // Flight dynamics: Pointer tracking with aerodynamic banking
    const pointerInfluenceX = mouse.x * (isMobile ? 0.3 : 0.6);
    const pointerInfluenceY = mouse.y * (isMobile ? 0.2 : 0.4);

    currentPos.current.x = THREE.MathUtils.lerp(
      currentPos.current.x,
      targetX + pointerInfluenceX,
      delta * 4.0
    );
    currentPos.current.y = THREE.MathUtils.lerp(
      currentPos.current.y,
      targetY + pointerInfluenceY + hoverY,
      delta * 4.0
    );
    currentPos.current.z = THREE.MathUtils.lerp(
      currentPos.current.z,
      targetZ,
      delta * 4.0
    );

    shipGroupRef.current.position.copy(currentPos.current);

    // Aerodynamic Banking Physics (Roll into turns like an F-22 or Starfighter)
    const targetRoll = -mouse.x * 0.65 + hoverRoll;
    const targetPitch = mouse.y * 0.4 - (isWarping ? 0.25 : 0.0);
    const targetYaw =
      THREE.MathUtils.lerp(startW.rotY, endW.rotY, smoothT) + mouse.x * 0.3;

    // Barrel Roll execution when clicked
    let rollBonus = 0;
    if (isRolling) {
      barrelRollProgress.current += delta * 4.5;
      rollBonus = barrelRollProgress.current * Math.PI * 2;
      if (barrelRollProgress.current >= 1) {
        setIsRolling(false);
        barrelRollProgress.current = 0;
      }
    }

    shipGroupRef.current.rotation.z = THREE.MathUtils.lerp(
      shipGroupRef.current.rotation.z,
      targetRoll + rollBonus,
      delta * 5.0
    );
    shipGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      shipGroupRef.current.rotation.x,
      targetPitch,
      delta * 4.0
    );
    shipGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      shipGroupRef.current.rotation.y,
      targetYaw,
      delta * 4.0
    );

    // Dynamic Thruster Booster Flames (grow when scrolling or warping!)
    const thrustScale = 1 + velocity * 1.5 + (isWarping ? 1.2 : 0);
    const flicker = 1 + Math.sin(time * 30) * 0.15;

    if (thrusterLRef.current && thrusterRRef.current) {
      const scaleZ = thrustScale * flicker;
      thrusterLRef.current.scale.set(1, 1, scaleZ);
      thrusterRRef.current.scale.set(1, 1, scaleZ);
    }

    if (thrusterGlowLRef.current && thrusterGlowRRef.current) {
      const intensity = (1.5 + velocity * 2.5) * flicker;
      thrusterGlowLRef.current.intensity = intensity;
      thrusterGlowRRef.current.intensity = intensity;
    }
  });

  return (
    <group ref={shipGroupRef} scale={0.75}>
      {/* Central Aerodynamic Fuselage */}
      <mesh material={hullMaterial}>
        <coneGeometry args={[0.32, 1.6, 6]} />
      </mesh>

      {/* Main Cockpit Canopy */}
      <mesh position={[0, 0.12, 0.1]} material={cockpitMaterial}>
        <sphereGeometry args={[0.13, 16, 12]} />
      </mesh>

      {/* Upper Armor Dorsal Ridge */}
      <mesh position={[0, 0.08, -0.2]} material={armorPlateMaterial}>
        <boxGeometry args={[0.14, 0.18, 0.8]} />
      </mesh>

      {/* Swept Delta Wings (Left & Right) */}
      <group position={[0, -0.05, -0.25]}>
        {/* Left Wing */}
        <mesh position={[-0.7, 0, 0]} rotation={[0, 0, -0.1]} material={hullMaterial}>
          <boxGeometry args={[0.9, 0.04, 0.7]} />
        </mesh>
        {/* Left Wing Leading Edge Glow Trim */}
        <mesh position={[-0.72, 0.02, 0.32]} material={glowAccentMaterial}>
          <boxGeometry args={[0.9, 0.02, 0.04]} />
        </mesh>
        {/* Left Winglet Tip */}
        <mesh position={[-1.15, 0.12, 0]} material={glowAccentMaterial}>
          <boxGeometry args={[0.04, 0.25, 0.45]} />
        </mesh>

        {/* Right Wing */}
        <mesh position={[0.7, 0, 0]} rotation={[0, 0, 0.1]} material={hullMaterial}>
          <boxGeometry args={[0.9, 0.04, 0.7]} />
        </mesh>
        {/* Right Wing Leading Edge Glow Trim */}
        <mesh position={[0.72, 0.02, 0.32]} material={glowAccentMaterial}>
          <boxGeometry args={[0.9, 0.02, 0.04]} />
        </mesh>
        {/* Right Winglet Tip */}
        <mesh position={[1.15, 0.12, 0]} material={glowAccentMaterial}>
          <boxGeometry args={[0.04, 0.25, 0.45]} />
        </mesh>
      </group>

      {/* Twin Ion Thruster Nacelles */}
      <group position={[0, 0, -0.85]}>
        {/* Left Thruster Housing */}
        <mesh position={[-0.22, 0, 0]} material={armorPlateMaterial}>
          <cylinderGeometry args={[0.12, 0.14, 0.35, 12]} />
        </mesh>
        {/* Left Plasma Flame Cone */}
        <mesh
          ref={thrusterLRef}
          position={[-0.22, 0, -0.32]}
          rotation={[Math.PI / 2, 0, 0]}
          material={thrusterFlameMaterial}
        >
          <coneGeometry args={[0.09, 0.6, 12]} />
        </mesh>
        <pointLight
          ref={thrusterGlowLRef}
          position={[-0.22, 0, -0.35]}
          color="#ff7a18"
          distance={3}
          intensity={1.8}
        />

        {/* Right Thruster Housing */}
        <mesh position={[0.22, 0, 0]} material={armorPlateMaterial}>
          <cylinderGeometry args={[0.12, 0.14, 0.35, 12]} />
        </mesh>
        {/* Right Plasma Flame Cone */}
        <mesh
          ref={thrusterRRef}
          position={[0.22, 0, -0.32]}
          rotation={[Math.PI / 2, 0, 0]}
          material={thrusterFlameMaterial}
        >
          <coneGeometry args={[0.09, 0.6, 12]} />
        </mesh>
        <pointLight
          ref={thrusterGlowRRef}
          position={[0.22, 0, -0.35]}
          color="#ff7a18"
          distance={3}
          intensity={1.8}
        />
      </group>

      {/* Nose Sensor Glow */}
      <pointLight position={[0, 0.05, 0.8]} color="#f5c07b" distance={2} intensity={0.8} />
    </group>
  );
}
