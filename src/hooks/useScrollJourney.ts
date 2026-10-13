"use client";

import { useState, useEffect } from "react";

export interface ScrollJourneyState {
  progress: number; // 0 to 1
  activeSection: string;
  mouse: { x: number; y: number };
  scrollY: number;
  velocity: number; // 0 to 4
  isWarping: boolean;
}

export function useScrollJourney() {
  const [journey, setJourney] = useState<ScrollJourneyState>({
    progress: 0,
    activeSection: "hero",
    mouse: { x: 0, y: 0 },
    scrollY: 0,
    velocity: 0,
    isWarping: false,
  });

  useEffect(() => {
    let ticking = false;
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let currentVelocity = 0;

    const sections = ["hero", "about", "experience", "projects", "skills", "contact"];

    // Continuous loop to decay velocity smoothly back to 0
    let animId: number;
    const decayLoop = () => {
      if (currentVelocity > 0.02) {
        currentVelocity *= 0.92;
        setJourney((prev) => ({
          ...prev,
          velocity: currentVelocity,
          isWarping: currentVelocity > 0.35,
        }));
      } else if (currentVelocity !== 0) {
        currentVelocity = 0;
        setJourney((prev) => ({
          ...prev,
          velocity: 0,
          isWarping: false,
        }));
      }
      animId = requestAnimationFrame(decayLoop);
    };
    animId = requestAnimationFrame(decayLoop);

    const handleScroll = () => {
      const now = performance.now();
      const dt = Math.max(now - lastTime, 16);
      const currentScroll = window.scrollY;
      const deltaScroll = Math.abs(currentScroll - lastScrollY);

      // Compute raw velocity (pixels per ms, scaled)
      const instantVelocity = Math.min((deltaScroll / dt) * 1.8, 3.5);
      currentVelocity = Math.max(currentVelocity, instantVelocity);

      lastScrollY = currentScroll;
      lastTime = now;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = docHeight > 0 ? Math.min(Math.max(currentScroll / docHeight, 0), 1) : 0;

          // Determine active section
          let currentSection = "hero";
          for (const id of sections) {
            const el = document.getElementById(id);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.2) {
                currentSection = id;
              }
            }
          }

          setJourney((prev) => ({
            ...prev,
            progress,
            scrollY: currentScroll,
            activeSection: currentSection,
            velocity: currentVelocity,
            isWarping: currentVelocity > 0.35,
          }));

          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setJourney((prev) => ({
        ...prev,
        mouse: { x, y },
      }));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return journey;
}
