"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Waypoint {
  t: number;
  pos: [number, number, number];
  target: [number, number, number];
}

interface CameraRigProps {
  progress: number;
  mouse: { x: number; y: number };
  velocity?: number;
  isWarping?: boolean;
}

export function CameraRig({
  progress,
  mouse,
  velocity = 0,
  isWarping = false,
}: CameraRigProps) {
  const currentPos = useRef(new THREE.Vector3(0, 0, 4.2));
  const currentTarget = useRef(new THREE.Vector3(0.6, 0, -0.8));

  // Deep space flight waypoints tracking the 6 portal gates
  const waypoints: Waypoint[] = useMemo(
    () => [
      { t: 0.0, pos: [0, 0, 4.2], target: [0.6, 0, -0.8] }, // Hero: Station overview
      { t: 0.2, pos: [0.5, 0.2, -1.2], target: [-0.9, 0.2, -5.5] }, // About: Flying towards Sector 02
      { t: 0.4, pos: [-0.5, -0.1, -6.2], target: [1.0, -0.2, -10.5] }, // Experience: Flying towards Sector 03
      { t: 0.65, pos: [0, 0.4, -11.2], target: [0, 0.6, -15.5] }, // Projects: Elevated view into Sector 04
      { t: 0.85, pos: [0.5, 0, -16.2], target: [-0.8, -0.1, -20.5] }, // Skills: Matrix Sector 05
      { t: 1.0, pos: [0, 0.1, -21.2], target: [0, 0.1, -25.5] }, // Contact: Sector 06 Finale
    ],
    []
  );

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

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
    const smoothT = localT * localT * (3 - 2 * localT);

    // Subtle engine vibration during high speed warp
    const rumble = isWarping ? Math.sin(time * 35) * 0.02 * velocity : 0;

    // Desired positions from waypoint interpolation
    const desiredX =
      THREE.MathUtils.lerp(startW.pos[0], endW.pos[0], smoothT) +
      mouse.x * 0.45 +
      rumble;
    const desiredY =
      THREE.MathUtils.lerp(startW.pos[1], endW.pos[1], smoothT) +
      mouse.y * 0.35 +
      rumble;
    const desiredZ = THREE.MathUtils.lerp(startW.pos[2], endW.pos[2], smoothT);

    const desiredTargetX =
      THREE.MathUtils.lerp(startW.target[0], endW.target[0], smoothT) +
      mouse.x * 0.2;
    const desiredTargetY =
      THREE.MathUtils.lerp(startW.target[1], endW.target[1], smoothT) +
      mouse.y * 0.15;
    const desiredTargetZ = THREE.MathUtils.lerp(
      startW.target[2],
      endW.target[2],
      smoothT
    );

    // Smoothly damp camera towards desired coordinates
    const dampSpeed = 3.8;
    currentPos.current.x += (desiredX - currentPos.current.x) * delta * dampSpeed;
    currentPos.current.y += (desiredY - currentPos.current.y) * delta * dampSpeed;
    currentPos.current.z += (desiredZ - currentPos.current.z) * delta * dampSpeed;

    currentTarget.current.x +=
      (desiredTargetX - currentTarget.current.x) * delta * dampSpeed;
    currentTarget.current.y +=
      (desiredTargetY - currentTarget.current.y) * delta * dampSpeed;
    currentTarget.current.z +=
      (desiredTargetZ - currentTarget.current.z) * delta * dampSpeed;

    state.camera.position.copy(currentPos.current);
    state.camera.lookAt(currentTarget.current);

    // Dynamic FOV zoom for Warp Speed effect
    const cam = state.camera as THREE.PerspectiveCamera;
    if (cam.fov) {
      const targetFov = isWarping ? 55 : 45;
      cam.fov = THREE.MathUtils.lerp(cam.fov, targetFov, delta * 3.5);
      cam.updateProjectionMatrix();
    }
  });

  return null;
}
