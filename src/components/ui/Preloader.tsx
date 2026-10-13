"use client";

import React, { useEffect, useState } from "react";
import { portfolioData } from "@/data/portfolioData";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoaded(true), 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20) + 10;
      });
    }, 40);

    return () => clearInterval(timer);
  }, []);

  if (isLoaded) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#140a06] transition-opacity duration-700 ${
        progress >= 100 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative flex flex-col items-center max-w-sm px-6 text-center">
        {/* Glowing Monogram */}
        <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-tr from-[#d85827] to-[#c67d1f] flex items-center justify-center font-bold text-white text-xl shadow-xl shadow-[#d85827]/40 animate-pulse">
          SH
        </div>

        <h2 className="text-lg font-semibold tracking-wide text-white mb-1">
          {portfolioData.personal.name}
        </h2>
        <p className="text-xs text-stone-400 font-mono mb-8 uppercase tracking-widest">
          Loading Portfolio...
        </p>

        {/* Progress bar */}
        <div className="w-56 h-1.5 bg-[#24130c] rounded-full overflow-hidden border border-white/10">
          <div
            className="h-full bg-gradient-to-r from-[#d85827] to-[#c67d1f] transition-all duration-150 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <div className="mt-3 text-[11px] font-mono text-[#f5ab79]">
          {Math.min(progress, 100)}%
        </div>
      </div>
    </div>
  );
}
