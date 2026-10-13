"use client";

import React from "react";
import Image from "next/image";
import { portfolioData } from "@/data/portfolioData";
import {
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Cpu,
  Workflow,
  HeartPulse,
  CreditCard,
  Binary,
} from "lucide-react";

export function AboutSection() {
  const { personal, education } = portfolioData;

  return (
    <section
      id="about"
      className="relative min-h-screen py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center lg:pl-28"
    >
      {/* Section Header */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c67d1f]/20 border border-[#c67d1f]/40 text-[#f5c07b] text-xs font-mono uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Background & Engineering Story
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Bridging Pharmaceutical & Medical Sciences <br className="hidden sm:block" />
          <span className="text-gradient-cinematic">with Modern Full-Stack & AI Systems</span>
        </h2>
        <p className="text-stone-300 max-w-2xl text-base sm:text-lg leading-relaxed">
          How a formal degree in pharmacy and medicine translates into domain-native expertise for architecting healthcare-insurance platforms, and fintech rails.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Main Story Narrative (7 cols) */}
        <div className="md:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-white/10 hover:border-[#d85827]/40 transition-all">
          <div>
            <div className="flex items-center gap-4 mb-5">
              {personal.avatarUrl ? (
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-[#d85827]/50 p-0.5 bg-[#20110b] shadow-xl shadow-[#d85827]/20 shrink-0">
                  <Image
                    src={personal.avatarUrl}
                    alt={personal.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-2xl bg-[#d85827]/15 border border-[#d85827]/30 flex items-center justify-center text-[#f0834c]">
                  <Cpu className="w-6 h-6" />
                </div>
              )}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                  Medical & Healthcare Background Meets Software Engineering
                </h3>
                <span className="text-xs font-mono text-[#f5ab79]">
                  {personal.name} • {personal.location}
                </span>
              </div>
            </div>
            <div className="space-y-4 text-stone-200 text-sm sm:text-base leading-relaxed">
              <p>{personal.story.intro}</p>
              <p>{personal.story.journey}</p>
              <p className="text-stone-300 font-normal">{personal.story.vision}</p>
            </div>
          </div>

          {/* Quick Pillar Tags */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#d85827]/15 text-[#f5ab79] border border-[#d85827]/30">
              <HeartPulse className="w-3.5 h-3.5" /> ABDM Health Stack
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#c67d1f]/15 text-[#f5c07b] border border-[#c67d1f]/30">
              <CreditCard className="w-3.5 h-3.5" /> Payment Gateways
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#24130c] text-[#fdfbf7] border border-white/15">
              <Binary className="w-3.5 h-3.5 text-[#f5ab79]" /> Enterprise RAG & AI
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-stone-300 border border-white/10">
              <Workflow className="w-3.5 h-3.5" /> Microservices
            </span>
          </div>
        </div>

        {/* Engineering Philosophy & Key Domains (5 cols) */}
        <div className="md:col-span-5 flex flex-col gap-5">
          {/* Domain Expertise Card */}
          <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-[#c67d1f]/40 transition-all flex-1">
            <div className="w-10 h-10 rounded-2xl bg-[#c67d1f]/15 border border-[#c67d1f]/30 flex items-center justify-center text-[#f5c07b] mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">
              Mission-Critical Production Experience
            </h4>
            <p className="text-sm text-stone-300 leading-relaxed mb-4">
              Experienced in delivering high-stakes production features where zero-downtime and data integrity are non-negotiable:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-300">
              <li className="flex items-start gap-2">
                <span className="text-[#d85827] font-bold">•</span>
                <span>
                  <strong>UPI Payment Migration:</strong> Migrated UPI Collect to UPI Intent within one month to comply with NPCI changes.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#f5ab79] font-bold">•</span>
                <span>
                  <strong>ABDM Digital Health Stack:</strong> End-to-end ABHA card generation, Aadhaar OTP verification, and multi-mode KYC.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#f5c07b] font-bold">•</span>
                <span>
                  <strong>Payment Orchestration:</strong> Razorpay & Cashfree NetBanking for HDFC and ICICI banks with reliable webhook processing.
                </span>
              </li>

            </ul>
          </div>
        </div>

        {/* Education Row (12 cols, split 2) */}
        {education.map((edu, idx) => (
          <div
            key={idx}
            className="md:col-span-6 glass-panel rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-[#d85827]/40 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#f5ab79]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-[#f5c07b] px-2.5 py-1 rounded-full bg-[#24130c] border border-white/10">
                {edu.period}
              </span>
            </div>
            <h4 className="text-lg font-bold text-white mb-0.5">
              {edu.institution}
            </h4>
            <div className="text-xs text-[#f5ab79] font-mono mb-3">
              {edu.degree} • {edu.location}
            </div>
            <p className="text-sm text-stone-300 leading-relaxed mb-4">
              {edu.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {edu.skillsLearned.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="px-2.5 py-0.5 rounded-md bg-white/5 text-[11px] font-mono text-stone-300 border border-white/10"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
