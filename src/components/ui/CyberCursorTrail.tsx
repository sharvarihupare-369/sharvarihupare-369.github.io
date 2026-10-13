"use client";

import React, { useEffect, useRef } from "react";

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

export function CyberCursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Check reduced motion or touch device
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);

    if (prefersReducedMotion || isTouch) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const sparks: Spark[] = [];
    const colors = ["#e76735", "#f5ab79", "#c67d1f", "#ff9d5c"];

    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 3) {
        lastX = e.clientX;
        lastY = e.clientY;

        // Emit 1-2 small subtle sparks
        for (let i = 0; i < 2; i++) {
          sparks.push({
            x: e.clientX,
            y: e.clientY,
            vx: (Math.random() - 0.5) * 1.5 - dx * 0.08,
            vy: (Math.random() - 0.5) * 1.5 - dy * 0.08,
            life: 0,
            maxLife: 20 + Math.random() * 15,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 2.2 + 1.2,
          });
        }
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Small particle burst on click
      for (let i = 0; i < 12; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        sparks.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 25 + Math.random() * 15,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 2.5 + 1.5,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("pointerdown", handleClick, { passive: true });

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life++;

        if (s.life >= s.maxLife) {
          sparks.splice(i, 1);
          continue;
        }

        const progress = s.life / s.maxLife;
        const alpha = Math.max(0, 1 - progress);
        const radius = Math.max(0.1, s.size * (1 - progress));

        ctx.fillStyle = s.color;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(s.x, s.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointerdown", handleClick);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden"
      aria-hidden="true"
    />
  );
}
