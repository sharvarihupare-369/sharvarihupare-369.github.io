"use client";

import React from "react";
import Image from "next/image";
import { portfolioData } from "@/data/portfolioData";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import {
  ArrowDown,
  ArrowRight,
  Mail,
  MapPin,
  Sparkles,
  Compass,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export function HeroSection() {
  const { scrollTo } = useSmoothScroll();
  const { personal, stats } = portfolioData;

  return (
    <>
      {/* First Fold: Full Viewport Hero Screen with Dedicated 3D Stage Presentation */}
      <section
        id="hero"
        className="relative min-h-[100svh] flex flex-col justify-between px-4 sm:px-6 lg:px-12 pt-24 pb-6 overflow-hidden max-w-7xl mx-auto w-full"
      >
        {/* Main Grid: Split Layout on Desktop to give the 3D Core Full Visibility */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-2 z-10 w-full">
          {/* Left Column: Core Narrative & Actions */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Floating Glowing Portrait - Prominent & Premium */}
            {personal.avatarUrl && (
              <div className="relative mb-4 sm:mb-5 group cursor-pointer">
                {/* Dynamic Multi-Color Glow Aura in Terracotta and Amber */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-[#d85827] via-[#c67d1f] to-[#e76735] rounded-full blur-xl opacity-80 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden border-2 border-[#d85827]/50 p-1 bg-[#20110b] shadow-2xl">
                  <Image
                    src={personal.avatarUrl}
                    alt={personal.name}
                    width={160}
                    height={160}
                    priority
                    className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Status dot in Amber Ochre */}
                <div className="absolute bottom-1.5 right-1.5 px-2.5 py-1 rounded-full bg-[#c67d1f] text-white font-bold text-[10px] tracking-wider uppercase border border-white/30 shadow-lg shadow-[#c67d1f]/50 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping inline-block" />
                  Active
                </div>
              </div>
            )}

            {/* Status & 3D Stage Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-3 sm:mb-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#24130c] border border-white/15 text-[#fdfbf7] text-xs font-medium backdrop-blur-md shadow-lg shadow-black/30">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e76735] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d85827]"></span>
                </span>
                <span className="text-[#fdfbf7]">Software Development Engineer</span>
                {/* <span className="text-stone-500">•</span> */}
                <span className="text-stone-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#f5ab79]" />
                  {personal.location}
                </span>
              </div>

              {/* <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d85827]/15 border border-[#d85827]/30 text-[#f5ab79] text-xs font-mono">
                <Sparkles className="w-3 h-3 text-[#e76735] animate-spin" style={{ animationDuration: "6s" }} />
                <span>3D Interactive World</span>
              </div> */}
            </div>

            {/* Hero Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-2 sm:mb-3 leading-[1.08]">
              Hi, I&apos;m{" "}
              <span className="text-gradient-cinematic">
                {personal.name}
              </span>
            </h1>

            {/* Dynamic Tagline */}
            <p className="text-base sm:text-lg md:text-xl text-[#fdfbf7] font-medium max-w-2xl mb-2 sm:mb-3 leading-snug">
              {personal.tagline}
            </p>

            {/* Sub-Tagline */}
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl mb-5 sm:mb-6 leading-relaxed font-normal">
              {personal.subTagline}
            </p>

            {/* CTA Buttons & Social Icons Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                onClick={() => scrollTo("#projects", { offset: -70 })}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#d85827] to-[#e76735] hover:from-[#c24b1d] hover:to-[#d85827] text-white font-semibold text-xs sm:text-sm shadow-xl shadow-[#d85827]/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollTo("#experience", { offset: -70 })}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#24130c] hover:bg-[#341b11] text-[#fdfbf7] font-semibold text-xs sm:text-sm border border-white/15 backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
              >
                <span>Career Journey</span>
                <ArrowDown className="w-4 h-4 text-[#f5ab79]" />
              </button>

              <button
                onClick={() => scrollTo("#contact", { offset: -70 })}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-stone-200 hover:text-white font-medium text-xs sm:text-sm border border-white/10 transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4 text-stone-400" />
                <span>Get In Touch</span>
              </button>

              {/* Social Icons */}
              <div className="flex items-center gap-2 pl-1">
                <a
                  href={personal.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 sm:p-2.5 rounded-full bg-[#20110b] hover:bg-white/10 text-stone-300 hover:text-white border border-white/10 hover:border-[#d85827]/50 transition-all"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={personal.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 sm:p-2.5 rounded-full bg-[#20110b] hover:bg-white/10 text-stone-300 hover:text-[#f5ab79] border border-white/10 hover:border-[#d85827]/50 transition-all"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${personal.email}`}
                  className="p-2 sm:p-2.5 rounded-full bg-[#20110b] hover:bg-white/10 text-stone-300 hover:text-[#f5ab79] border border-white/10 hover:border-[#d85827]/50 transition-all"
                  aria-label="Send Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column (Desktop): Open 3D Space View with Cyber Craft Telemetry */}
          {/* <div className="lg:col-span-5 hidden lg:flex flex-col items-end justify-between py-6 pointer-events-none min-h-[340px]">
            <div className="px-3.5 py-1.5 rounded-full bg-[#1a0e08]/80 border border-[#d85827]/40 backdrop-blur-md shadow-xl text-[11px] font-mono text-[#f5ab79] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e76735] animate-ping" />
              <span>3D RECON CRAFT // ACTIVE</span>
            </div>

            <div className="mt-auto px-4 py-1.5 rounded-full bg-[#1a0e08]/70 border border-white/10 backdrop-blur-md text-[10px] font-mono text-stone-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#c67d1f]" />
              <span>Move mouse to steer • Click screen to barrel roll</span>
            </div>
          </div> */}
        </div>

        {/* First Fold Bottom Cue: "Click or scroll to explore 3D journey" - PROMINENT & VISIBLE IMMEDIATELY */}
        <div className="w-full flex justify-center pb-2 z-20">
          <button
            onClick={() => scrollTo("#about", { offset: -70 })}
            className="group flex flex-col items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95"
            aria-label="Click to explore 3D journey and scroll to career milestones"
          >
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#24130c]/90 border border-white/15 group-hover:border-[#d85827]/60 group-hover:bg-[#2e1810] shadow-lg shadow-black/40 transition-all">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d85827] animate-ping inline-block" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-stone-300 group-hover:text-white transition-colors">
                Click or scroll to explore journey
              </span>
              <ArrowDown className="w-3.5 h-3.5 text-[#f5ab79] group-hover:translate-y-0.5 transition-transform" />
            </div>
            <div className="w-5 h-8 rounded-full border-2 border-stone-600 group-hover:border-[#d85827] flex justify-center pt-1.5 transition-colors">
              <div className="w-1 h-2 bg-[#d85827] rounded-full animate-bounce" />
            </div>
          </button>
        </div>
      </section>

      {/* Quantifiable Highlights Strip - Opening Milestone of the 3D Journey */}
      <section
        id="impact"
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-2xl p-4 sm:p-5 text-left border border-white/10 hover:border-[#d85827]/40 transition-all hover:-translate-y-1"
            >
              <div className="text-2xl sm:text-3xl font-bold font-mono text-gradient-cinematic mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-stone-300 font-medium leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
