"use client";

import React from "react";
import { portfolioData } from "@/data/portfolioData";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { ArrowUp, Mail, Heart } from "lucide-react";

export function Footer() {
  const { scrollTo } = useSmoothScroll();
  const { personal } = portfolioData;

  return (
    <footer className="relative border-t border-white/10 bg-[#140a06]/95 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Branding */}
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#d85827] to-[#c67d1f] flex items-center justify-center font-bold text-white text-xs">
              SH
            </div>
            <span className="font-semibold text-sm text-white">
              {personal.name}
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-1 max-w-sm">
            {personal.role} • Crafting resilient web applications, payment systems, and generative AI platforms.
          </p>
        </div>

        {/* Center Links */}
        <div className="flex items-center gap-4 text-xs font-mono text-stone-400">
          <a
            href={personal.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#f0834c] transition-colors"
          >
            GitHub
          </a>
          <span>•</span>
          <a
            href={personal.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#f0834c] transition-colors"
          >
            LinkedIn
          </a>
          <span>•</span>
          <a
            href={`mailto:${personal.email}`}
            className="hover:text-[#f0834c] transition-colors"
          >
            Email
          </a>
          <span>•</span>
          <span className="text-stone-500">{personal.location}</span>
        </div>

        {/* Back to top button */}
        <button
          onClick={() => scrollTo("#hero")}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-xs font-medium text-stone-300 hover:text-white border border-white/10 transition-all hover:border-[#d85827]/40 cursor-pointer group"
          aria-label="Back to top"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform text-[#f5ab79]" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 text-center text-[11px] text-stone-500 font-mono">
        © 2026 {personal.name}.
        {/* Designed & Built with Next.js, TypeScript, React Three Fiber & Tailwind CSS. */}
      </div>
    </footer>
  );
}
