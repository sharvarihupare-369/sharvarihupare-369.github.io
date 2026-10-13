"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";

interface MorphingCoreProps {
  progress: number;
}

interface CoreWaypoint {
  t: number;
  pos: [number, number, number];
  scale: number;
  ringSpeed: number;
  glowColor: string;
}

export function MorphingCore({ progress }: MorphingCoreProps) {
  const rootGroupRef = useRef<THREE.Group>(null);
  const outerMeshRef = useRef<THREE.Mesh>(null);
  const latticeMeshRef = useRef<THREE.Mesh>(null);
  const innerMeshRef = useRef<THREE.Mesh>(null);
  const coreLightRef = useRef<THREE.PointLight>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);
  const sat1Ref = useRef<THREE.Mesh>(null);
  const sat2Ref = useRef<THREE.Mesh>(null);
  const sat3Ref = useRef<THREE.Mesh>(null);

  // Position & morph waypoints across the 6 journey stops
  const waypoints: CoreWaypoint[] = useMemo(
    () => [
      { t: 0.0, pos: [1.7, 0.05, 0], scale: 1.05, ringSpeed: 1.0, glowColor: "#e76735" }, // Hero: Right side, framing hero text
      { t: 0.2, pos: [-1.85, 0.2, 0], scale: 1.25, ringSpeed: 1.8, glowColor: "#c67d1f" }, // About: Swoops to left
      { t: 0.4, pos: [1.9, -0.25, 0], scale: 1.2, ringSpeed: 2.5, glowColor: "#ea580c" }, // Experience: Swoops to right, rapid rings
      { t: 0.65, pos: [0, 1.2, -0.6], scale: 1.35, ringSpeed: 1.4, glowColor: "#d85827" }, // Projects: Elevated top-center portal
      { t: 0.85, pos: [-1.8, 0, 0], scale: 1.25, ringSpeed: 2.0, glowColor: "#f5ab79" }, // Skills: Left side matrix
      { t: 1.0, pos: [0, 0.2, 0], scale: 1.4, ringSpeed: 1.2, glowColor: "#f0834c" }, // Contact: Centered finale
    ],
    []
  );

  const currentPos = useRef(new THREE.Vector3(1.7, 0.05, 0));
  const currentScale = useRef(1.0);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const isMobile = state.viewport.width < 7; // Responsive screen check in 3D units

    // Clamp progress
    const t = Math.max(0, Math.min(progress, 1));

    // Find surrounding waypoints
    let startW = waypoints[0];
    let endW = waypoints[waypoints.length - 1];

    for (let i = 0; i < waypoints.length - 1; i++) {
      if (t >= waypoints[i].t && t <= waypoints[i + 1].t) {
        startW = waypoints[i];
        endW = waypoints[i + 1];
        break;
      }
    }

    const range = endW.t - startW.t;
    const localT = range === 0 ? 0 : (t - startW.t) / range;
    // Cubic smoothstep easing
    const smoothT = localT * localT * (3 - 2 * localT);

    // Target positions
    const targetX = isMobile
      ? 0
      : THREE.MathUtils.lerp(startW.pos[0], endW.pos[0], smoothT);
    const targetY = THREE.MathUtils.lerp(startW.pos[1], endW.pos[1], smoothT);
    const targetZ = THREE.MathUtils.lerp(startW.pos[2], endW.pos[2], smoothT);
    const targetScale = THREE.MathUtils.lerp(startW.scale, endW.scale, smoothT);
    const targetSpeed = THREE.MathUtils.lerp(startW.ringSpeed, endW.ringSpeed, smoothT);

    // Smoothly damp position and scale (swooping animation as user scrolls)
    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, targetX, delta * 3.5);
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, targetY, delta * 3.5);
    currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, targetZ, delta * 3.5);
    currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale, delta * 3.5);

    if (rootGroupRef.current) {
      rootGroupRef.current.position.copy(currentPos.current);
      rootGroupRef.current.scale.set(
        currentScale.current,
        currentScale.current,
        currentScale.current
      );

      // Responsive cursor tilt with physics damping
      const targetTiltX = state.pointer.y * 0.45;
      const targetTiltY = state.pointer.x * 0.5;
      rootGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        rootGroupRef.current.rotation.x,
        targetTiltX,
        delta * 3.5
      );
      rootGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        rootGroupRef.current.rotation.y,
        targetTiltY,
        delta * 3.5
      );
    }

    // Outer crystal rotation accelerates with scroll speed
    if (outerMeshRef.current) {
      outerMeshRef.current.rotation.x = time * 0.3 * targetSpeed + progress * Math.PI * 2;
      outerMeshRef.current.rotation.y = time * 0.4 * targetSpeed + progress * Math.PI * 3;
      const breathing = 1 + Math.sin(time * 2.5) * 0.05;
      outerMeshRef.current.scale.set(breathing, breathing, breathing);
    }

    if (latticeMeshRef.current && outerMeshRef.current) {
      latticeMeshRef.current.rotation.copy(outerMeshRef.current.rotation);
      latticeMeshRef.current.scale.copy(outerMeshRef.current.scale);
    }

    // Inner chromatic core breathes and pulses intensely
    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.x = -time * 0.5 * targetSpeed - progress * Math.PI * 2;
      innerMeshRef.current.rotation.y = time * 0.7 * targetSpeed + progress * Math.PI * 2.5;
      innerMeshRef.current.rotation.z = time * 0.4;

      const innerScale = 1 + Math.sin(time * 3.5) * 0.15;
      innerMeshRef.current.scale.set(innerScale, innerScale, innerScale);

      const mat = innerMeshRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.emissiveIntensity = 1.5 + Math.sin(time * 4) * 0.8 + progress * 0.8;
      }
    }

    // Internal point light pulsation
    if (coreLightRef.current) {
      coreLightRef.current.intensity = 4.0 + Math.sin(time * 3.5) * 2.0;
    }

    // Cybernetic orbital rings - expand and spin dynamically across sections
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = time * 0.6 * targetSpeed + progress * 5;
      ring1Ref.current.rotation.x = Math.sin(time * 0.5) * 0.3 + progress * 1.5;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -time * 0.5 * targetSpeed - progress * 4;
      ring2Ref.current.rotation.z = Math.cos(time * 0.5) * 0.4 + progress * 2;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = time * 0.4 * targetSpeed + progress * 3;
      ring3Ref.current.rotation.y = time * 0.3 + progress * 2.5;
    }

    // Revolving satellite nodes orbiting along each ring
    if (sat1Ref.current) {
      const angle = time * 2.2 * targetSpeed;
      sat1Ref.current.position.x = Math.cos(angle) * 2.05;
      sat1Ref.current.position.y = Math.sin(angle) * 2.05;
    }
    if (sat2Ref.current) {
      const angle = -time * 1.8 * targetSpeed;
      sat2Ref.current.position.x = Math.cos(angle) * 2.45;
      sat2Ref.current.position.z = Math.sin(angle) * 2.45;
    }
    if (sat3Ref.current) {
      const angle = time * 1.5 * targetSpeed;
      sat3Ref.current.position.y = Math.cos(angle) * 2.85;
      sat3Ref.current.position.z = Math.sin(angle) * 2.85;
    }
  });

  return (
    <group ref={rootGroupRef} position={[1.7, 0.05, 0]}>
      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.6}>
        {/* Core Internal Light Source */}
        <pointLight
          ref={coreLightRef}
          color="#f0834c"
          intensity={4.5}
          distance={8}
          decay={2}
        />

        {/* Outer Translucent Glass Polyhedron */}
        <mesh ref={outerMeshRef} castShadow={false} receiveShadow={false}>
          <icosahedronGeometry args={[1.35, 1]} />
          <MeshTransmissionMaterial
            backside
            samples={6}
            resolution={512}
            transmission={0.85}
            roughness={0.16}
            thickness={1.1}
            ior={1.45}
            chromaticAberration={0.14}
            anisotropy={0.35}
            distortion={0.3}
            distortionScale={0.3}
            temporalDistortion={0.15}
            color="#fed7aa"
          />
        </mesh>

        {/* Glowing Holographic Wireframe Lattice */}
        <mesh ref={latticeMeshRef}>
          <icosahedronGeometry args={[1.38, 1]} />
          <meshBasicMaterial
            color="#f5ab79"
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>

        {/* Inner Luminous Metallic Core */}
        <mesh ref={innerMeshRef}>
          <octahedronGeometry args={[0.75, 0]} />
          <meshStandardMaterial
            color="#d85827"
            emissive="#ea580c"
            emissiveIntensity={1.8}
            roughness={0.18}
            metalness={0.88}
            wireframe={false}
          />
        </mesh>

        {/* Orbit Ring 1 (Terracotta Glow with Satellite) */}
        <group ref={ring1Ref}>
          <mesh rotation={[Math.PI / 2.5, 0, 0]}>
            <torusGeometry args={[2.05, 0.022, 16, 90]} />
            <meshBasicMaterial color="#e76735" transparent opacity={0.8} />
          </mesh>
          <mesh ref={sat1Ref}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshBasicMaterial color="#fdfbf7" />
          </mesh>
        </group>

        {/* Orbit Ring 2 (Golden Amber Glow with Satellite) */}
        <group ref={ring2Ref}>
          <mesh rotation={[-Math.PI / 3, 0, 0]}>
            <torusGeometry args={[2.45, 0.018, 16, 90]} />
            <meshBasicMaterial color="#c67d1f" transparent opacity={0.75} />
          </mesh>
          <mesh ref={sat2Ref}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color="#fed7aa" />
          </mesh>
        </group>

        {/* Orbit Ring 3 (Warm Copper Horizon Ring with Satellite) */}
        <group ref={ring3Ref}>
          <mesh rotation={[0, Math.PI / 4, 0]}>
            <torusGeometry args={[2.85, 0.016, 16, 90]} />
            <meshBasicMaterial color="#f59e0b" transparent opacity={0.6} />
          </mesh>
          <mesh ref={sat3Ref}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color="#f5ab79" />
          </mesh>
        </group>
      </Float>
    </group>
  );
}
