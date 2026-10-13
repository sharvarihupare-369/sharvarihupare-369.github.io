"use client";

import React, { useState, useEffect } from "react";
import { Gamepad2, Sparkles } from "lucide-react";
import { ArcadeModal } from "./ArcadeGame";

export function ArcadeButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Optional keyboard shortcut: Press 'G' (when not typing in an input) to open arcade
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === "input" || activeTag === "textarea") return;

      if ((e.key === "g" || e.key === "G") && !e.metaKey && !e.ctrlKey) {
        setIsOpen((prev) => !prev);
      }
    };

    // Listen for custom open-arcade event from Navbar or other triggers
    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener("open-arcade", handleOpenEvent);

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("open-arcade", handleOpenEvent);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Floating Arcade Launch Button (Bottom Left) */}
      <aside
        aria-label="Arcade Mini-Game Launcher"
        className="fixed bottom-6 left-6 z-40 select-none animate-in fade-in slide-in-from-bottom-4 duration-500"
      >
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#1a0e08]/90 border border-[#d85827]/40 hover:border-[#f5ab79] text-white shadow-2xl shadow-black/80 backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          title="Play Bug Hunter Arcade Mini-Game (Press 'G')"
          aria-label="Play Bug Hunter Arcade Mini-Game"
        >
          {/* Subtle Ambient Pulse */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e76735] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d85827]"></span>
          </span>

          <Gamepad2 className="w-4 h-4 text-[#f5ab79] group-hover:rotate-12 transition-transform duration-300" />

          <div className="flex items-center gap-1.5 font-mono">
            <span className="text-xs font-semibold text-stone-200 group-hover:text-white transition-colors">
              Arcade Game
            </span>
            <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded bg-[#d85827]/20 border border-[#d85827]/30 text-[#f5ab79]">
              PLAY
            </span>
          </div>
        </button>
      </aside>

      {/* Arcade Game Modal */}
      <ArcadeModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
