"use client";

import React, { useState, useEffect } from "react";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { ArrowDown, ArrowUp, Zap } from "lucide-react";

interface JourneyHUDProps {
  progress: number;
  activeSection: string;
  velocity?: number;
  isWarping?: boolean;
}

const sectionMilestones: { id: string; label: string; sector: string; index: string }[] = [
  { id: "hero", label: "Hero", sector: "GENESIS", index: "01" },
  { id: "about", label: "Story", sector: "PHARMA_CODE", index: "02" },
  { id: "experience", label: "Career", sector: "CAREER_RAILS", index: "03" },
  { id: "projects", label: "Projects", sector: "PROJECT_NEXUS", index: "04" },
  { id: "skills", label: "Matrix", sector: "TECH_MATRIX", index: "05" },
  { id: "contact", label: "Connect", sector: "TRANSMISSION", index: "06" },
];

export function JourneyHUD({
  progress,
  activeSection,
  velocity = 0,
  isWarping = false,
}: JourneyHUDProps) {
  const { scrollTo } = useSmoothScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentMilestone =
    sectionMilestones.find((s) => s.id === activeSection) ||
    sectionMilestones[0];
  const currentIndex = sectionMilestones.findIndex(
    (s) => s.id === activeSection
  );

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % sectionMilestones.length;
    scrollTo(`#${sectionMilestones[nextIdx].id}`, { offset: -70 });
  };

  const handlePrev = () => {
    const prevIdx =
      (currentIndex - 1 + sectionMilestones.length) % sectionMilestones.length;
    scrollTo(`#${sectionMilestones[prevIdx].id}`, { offset: -70 });
  };

  const percent = Math.round(progress * 100);

  return (
    <aside
      aria-label="3D Flight Telemetry & Navigation HUD"
      className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-3 select-none animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      <div className="glass-panel px-4 py-2.5 rounded-full border border-white/15 shadow-2xl shadow-black/80 flex items-center gap-3 backdrop-blur-2xl">
        {/* Animated 3D Craft Thruster indicator */}
        <div className="relative flex items-center justify-center">
          <span className="w-2.5 h-2.5 rounded-full bg-[#d85827] animate-ping absolute" />
          <span className="w-2 h-2 rounded-full bg-[#e76735] relative" />
        </div>

        {/* Warp Speed Status Badge or Sector Name */}
        {isWarping ? (
          <span className="px-2 py-0.5 rounded-full bg-[#e76735]/25 border border-[#e76735]/50 text-[#f5ab79] text-[10px] font-mono font-bold animate-pulse flex items-center gap-1">
            <Zap className="w-3 h-3" />
            WARP SPEED
          </span>
        ) : (
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <span className="text-[#f5ab79] font-bold">
              {currentMilestone.index}
            </span>
            <span className="text-stone-500">/</span>
            <span className="text-white font-medium uppercase tracking-wider text-[11px]">
              {currentMilestone.sector}
            </span>
          </div>
        )}

        {/* Progress Mini Bar */}
        <div className="w-14 h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#d85827] via-[#e76735] to-[#c67d1f] transition-all duration-150 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Percentage */}
        <span className="text-[10px] font-mono font-semibold text-[#f5c07b] min-w-[28px]">
          {percent}%
        </span>

        {/* Next & Prev Waypoint quick jump controls */}
        <div className="flex items-center gap-1 pl-1 border-l border-white/10">
          <button
            onClick={handlePrev}
            className="p-1 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Previous sector"
            title="Previous sector"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleNext}
            className="p-1 rounded-full text-stone-400 hover:text-[#f5ab79] hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-1"
            aria-label="Next sector"
            title="Hyperjump to next sector"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
