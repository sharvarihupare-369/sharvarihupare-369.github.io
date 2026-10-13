"use client";

import React from "react";
import { portfolioData } from "@/data/portfolioData";
import {
  ExternalLink,
  Sparkles,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  Calendar,
  Cpu,
  Database,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

export function ProjectsSection() {
  const { projects } = portfolioData;

  return (
    <section
      id="projects"
      className="relative min-h-screen py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center"
    >
      {/* Header */}
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c67d1f]/20 border border-[#c67d1f]/40 text-[#f5c07b] text-xs font-mono uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Featured Work & Architecture
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Engineered for Scale, <br className="hidden sm:block" />
          <span className="text-gradient-cinematic">Powered by Generative AI</span>
        </h2>
        <p className="text-stone-300 max-w-2xl text-base sm:text-lg leading-relaxed">
          Production applications showcasing end-to-end full-stack architectures, high-performance RAG pipelines, and conversational AI workflows.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {projects.map((project) => {
          const isClinicPilot = project.id === "clinicpilot";

          return (
            <div
              key={project.id}
              className={`glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between border transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group ${
                isClinicPilot
                  ? "border-[#d85827]/60 shadow-2xl shadow-[#d85827]/15 lg:col-span-1 ring-1 ring-[#d85827]/30"
                  : "border-white/10 hover:border-[#c67d1f]/50"
              }`}
            >
              {/* Subtle Ambient Card Glow in Terracotta and Amber */}
              <div
                className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-opacity duration-300 ${
                  isClinicPilot
                    ? "bg-[#d85827]/25 group-hover:bg-[#d85827]/35"
                    : "bg-[#c67d1f]/20 group-hover:bg-[#c67d1f]/30"
                }`}
              />

              <div>
                {/* Header badges matching Image 1 */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-mono text-[#f5ab79] px-3 py-1 rounded-full bg-[#24130c] border border-white/15 font-medium">
                    {project.category}
                  </span>
                  {project.badge && (
                    <span
                      className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${
                        isClinicPilot
                          ? "bg-[#c67d1f] text-white border-white/20 font-semibold"
                          : "bg-white/5 text-stone-300 border-white/10"
                      }`}
                    >
                      {project.badge}
                    </span>
                  )}
                </div>

                {/* Project Title */}
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-[#f0834c] transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-[#f5c07b] mb-4">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm text-stone-200 leading-relaxed mb-6 font-normal">
                  {project.description}
                </p>

                {/* Key Architectural Highlights */}
                <div className="space-y-2.5 mb-6 pt-4 border-t border-white/10">
                  <div className="text-xs font-mono uppercase tracking-wider text-stone-400 font-semibold">
                    Core Engineering Highlights:
                  </div>
                  {project.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#d85827] shrink-0 mt-0.5" />
                      <span className="leading-snug">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer with Tech Stack and Action Buttons */}
              <div>
                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-white/10">
                  {project.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.04] text-stone-200 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#d85827] to-[#e76735] hover:from-[#c24b1d] hover:to-[#d85827] text-white font-semibold text-xs shadow-lg shadow-[#d85827]/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>Live Application</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white border border-white/10 text-xs font-medium transition-all hover:border-[#d85827]/40 ${
                        !project.liveUrl ? "flex-1" : ""
                      }`}
                      aria-label={`${project.title} GitHub Repository`}
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>{project.liveUrl ? "Code" : "View Code & Architecture"}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
