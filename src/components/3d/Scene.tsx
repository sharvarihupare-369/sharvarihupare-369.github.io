"use client";

import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraRig } from "./CameraRig";
import { StarField } from "./StarField";
import { Lighting } from "./Lighting";

interface SceneProps {
  progress?: number;
  mouse?: { x: number; y: number };
  velocity?: number;
  isWarping?: boolean;
}

export default function Scene({
  progress = 0,
  mouse = { x: 0, y: 0 },
  velocity = 0,
  isWarping = false,
}: SceneProps) {
  const [mounted, setMounted] = useState(false);
  const [hasWebGl, setHasWebGl] = useState(true);

  useEffect(() => {
    setMounted(true);
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setHasWebGl(false);
    } catch {
      setHasWebGl(false);
    }
  }, []);

  if (!mounted) {
    return (
      <div className="fixed inset-0 z-0 bg-[#140a06] pointer-events-none" />
    );
  }

  return (
    <div
      className="fixed inset-0 z-0 bg-[#140a06] pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Subtle corner ambient glows matching Image 2 without any bright spotlight in the center */}
      <div className="absolute top-1/6 left-1/12 w-[550px] h-[550px] bg-[#d85827]/10 rounded-full blur-[190px] pointer-events-none" />
      <div className="absolute bottom-1/6 right-1/12 w-[600px] h-[600px] bg-[#c67d1f]/10 rounded-full blur-[190px] pointer-events-none" />

      {hasWebGl ? (
        <Canvas
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          camera={{ position: [0, 0, 4.2], fov: 45 }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <Suspense fallback={null}>
            <Lighting progress={progress} />
            <CameraRig
              progress={progress}
              mouse={mouse}
              velocity={velocity}
              isWarping={isWarping}
            />
            {/* Exact StarField from Image 2 without big golden ring or heavy models */}
            <StarField
              count={1400}
              mouse={mouse}
              velocity={velocity}
              isWarping={isWarping}
            />
          </Suspense>
        </Canvas>
      ) : (
        /* Fallback for devices without WebGL */
        <div className="absolute inset-0 bg-[#140a06]" />
      )}
    </div>
  );
}
