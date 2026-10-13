"use client";

import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  speed: number;
  twinklePhase: number;
  twinkleSpeed: number;
}

export function StaticBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let cx = 0;
    let cy = 0;
    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 1.5);

    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = width / 2;
      cy = height / 2;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Warm starlight palette matching the user's espresso & terracotta aesthetic
    const colors = [
      "#e76735", // terracotta bright
      "#f5ab79", // warm amber
      "#c67d1f", // amber gold
      "#fdfbf7", // starlight cream
      "#ff9d5c", // soft sunset orange
    ];

    const starCount = 420;
    const maxDepth = 1200;
    const fov = 380;
    const stars: Star[] = [];

    // Initialize 3D cylindrical distribution of stars
    for (let i = 0; i < starCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 60 + Math.random() * Math.max(width, height) * 0.95;
      stars.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: Math.random() * maxDepth + 1,
        size: Math.random() * 1.5 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 0.8 + 0.6,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.04 + 0.015,
      });
    }

    // Gentle mouse tilt parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - cx) * 0.12;
      targetMouseY = (e.clientY - cy) * 0.12;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Track scroll velocity for gentle forward momentum boost
    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    let scrollVelocity = 0;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = Math.abs(currentScrollY - lastScrollY);
      scrollVelocity = Math.min(diff * 0.08, 3.5);
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    let animId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const delta = Math.min((currentTime - lastTime) / 16.67, 2.5); // normalized around 60fps
      lastTime = currentTime;

      // Smooth lerp mouse parallax
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Decay scroll boost
      scrollVelocity *= 0.92;

      ctx.clearRect(0, 0, width, height);

      const forwardStep = prefersReducedMotion
        ? 0.1
        : (0.9 + scrollVelocity) * delta;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        if (!prefersReducedMotion) {
          star.z -= star.speed * forwardStep;

          // Recycle star when it flies past camera
          if (star.z <= 10) {
            star.z = maxDepth;
            const angle = Math.random() * Math.PI * 2;
            const radius = 60 + Math.random() * Math.max(width, height) * 0.95;
            star.x = Math.cos(angle) * radius;
            star.y = Math.sin(angle) * radius;
          }

          star.twinklePhase += star.twinkleSpeed;
        }

        // Perspective 3D projection to 2D screen
        const scale = fov / star.z;
        const screenX = cx + (star.x + mouseX) * scale;
        const screenY = cy + (star.y + mouseY) * scale;

        // Skip if outside screen bounds
        if (
          screenX < -20 ||
          screenX > width + 20 ||
          screenY < -20 ||
          screenY > height + 20
        ) {
          continue;
        }

        const depthRatio = 1 - star.z / maxDepth;
        const twinkle = 0.75 + Math.sin(star.twinklePhase) * 0.25;
        const alpha = Math.min(Math.max(depthRatio * twinkle, 0.1), 0.95);
        const radius = Math.max(star.size * scale * 0.85, 0.6);

        // Draw glowing star dot
        ctx.save();
        ctx.globalAlpha = alpha;

        // Brighter / closer stars get a subtle glow halo
        if (depthRatio > 0.55 && radius > 1.2) {
          ctx.shadowBlur = radius * 3.5;
          ctx.shadowColor = star.color;
        }

        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 -z-10 bg-[#140a06] pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Ambient radial blur orbs recreating the warm dark espresso & terracotta aesthetic of the user image */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-[#d85827]/18 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[750px] h-[750px] bg-[#c67d1f]/15 rounded-full blur-[175px] pointer-events-none" />
      <div className="absolute top-3/4 left-1/4 w-[600px] h-[600px] bg-[#d85827]/12 rounded-full blur-[160px] pointer-events-none" />

      {/* Lightweight 3D Starfield Canvas (No heavy WebGL/Three.js, No big golden rings) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
