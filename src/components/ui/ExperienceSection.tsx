"use client";

import React from "react";
import { portfolioData } from "@/data/portfolioData";
import {
  Briefcase,
  Calendar,
  MapPin,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export function ExperienceSection() {
  const { experiences } = portfolioData;

  return (
    <section
      id="experience"
      className="relative min-h-screen py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center lg:pr-28"
    >
      {/* Header */}
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c67d1f]/20 border border-[#c67d1f]/40 text-[#f5c07b] text-xs font-mono uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Career Milestones
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Engineering Track Record <br className="hidden sm:block" />
          <span className="text-gradient-cinematic">& High-Impact Systems</span>
        </h2>
        <p className="text-stone-300 max-w-2xl text-base sm:text-lg leading-relaxed">
          Delivering production-grade and responsive microservice architectures.
        </p>
      </div>

      {/* Timeline container */}
      <div className="relative border-l border-white/10 ml-3 sm:ml-6 space-y-12">
        {experiences.map((exp, index) => (
          <div key={exp.id} className="relative pl-6 sm:pl-10 group">
            {/* Timeline Dot */}
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#140a06] border-2 border-[#d85827] group-hover:scale-125 group-hover:border-[#f5ab79] transition-all duration-300">
              <div className="w-1.5 h-1.5 rounded-full bg-[#d85827] m-auto mt-[3px]" />
            </div>

            {/* Experience Card */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-[#d85827]/40 transition-all hover:-translate-y-1">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-6 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {exp.role}
                    </h3>
                    {exp.isCurrent && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#c67d1f]/20 text-[#f5c07b] text-[11px] font-mono border border-[#c67d1f]/40">
                        Current Role
                      </span>
                    )}
                  </div>
                  <div className="text-base font-semibold text-[#f5ab79] mt-1">
                    {exp.company}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-stone-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-stone-500" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-500" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Quantifiable Metrics badges if available */}
              {exp.metrics && exp.metrics.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                  {exp.metrics.map((metric, mIdx) => (
                    <div
                      key={mIdx}
                      className="px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/5 flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-xl bg-[#d85827]/15 flex items-center justify-center text-[#f0834c]">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-base font-bold font-mono text-white">
                          {metric.value}
                        </div>
                        <div className="text-[11px] text-stone-300 leading-tight">
                          {metric.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Bullet Achievements */}
              <div className="space-y-3 mb-6">
                {exp.achievements.map((achieve, aIdx) => (
                  <div key={aIdx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#d85827] shrink-0 mt-1" />
                    <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-normal">
                      {achieve}
                    </p>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
                {exp.techStack.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 text-stone-200 border border-white/10 hover:border-[#d85827]/40 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
