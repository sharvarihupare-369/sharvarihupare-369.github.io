"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolioData";
import {
  Code2,
  Layout,
  Server,
  Database,
  Sparkles,
  Terminal,
  Search,
  Check,
} from "lucide-react";

export function SkillsSection() {
  const { skillCategories } = portfolioData;
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Languages":
        return <Code2 className="w-4 h-4" />;
      case "Frontend":
        return <Layout className="w-4 h-4" />;
      case "Backend & Cloud":
        return <Server className="w-4 h-4" />;
      case "Databases & Vector Search":
        return <Database className="w-4 h-4" />;
      case "AI & LLM Tools":
        return <Sparkles className="w-4 h-4" />;
      default:
        return <Terminal className="w-4 h-4" />;
    }
  };

  const categories = ["All", ...skillCategories.map((c) => c.category)];

  const filteredCategories = skillCategories.filter((cat) => {
    if (activeCategory !== "All" && cat.category !== activeCategory) {
      return false;
    }
    if (searchQuery.trim() === "") return true;
    return (
      cat.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  });

  return (
    <section
      id="skills"
      className="relative min-h-screen py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center lg:pl-28"
    >
      {/* Header */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c67d1f]/20 border border-[#c67d1f]/40 text-[#f5c07b] text-xs font-mono uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Technical Matrix & Tooling
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Core Technologies <br className="hidden sm:block" />
          <span className="text-gradient-cinematic">& Production Capabilities</span>
        </h2>
        <p className="text-stone-300 max-w-2xl text-base sm:text-lg leading-relaxed">
          Comprehensive stack spanning reactive frontend frameworks, asynchronous Python & Node backends, vector search, and AI developer workflows.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#d85827] text-white shadow-md shadow-[#d85827]/30 border border-[#e76735]"
                  : "glass-pill text-stone-300 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Live Search */}
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills (e.g. Next.js, FastAPI, Qdrant)..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#24130c]/90 border border-white/15 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#d85827]/70 focus:ring-1 focus:ring-[#d85827]/40 transition-all"
          />
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((cat, idx) => (
          <div
            key={idx}
            className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-[#d85827]/40 transition-all hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-[#d85827]/15 border border-[#d85827]/30 flex items-center justify-center text-[#f0834c]">
                {getCategoryIcon(cat.category)}
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  {cat.category}
                </h3>
                <p className="text-[11px] text-stone-400 font-mono">
                  {cat.description}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
              {cat.skills.map((skill, sIdx) => {
                const isMatch =
                  searchQuery.trim() !== "" &&
                  skill.toLowerCase().includes(searchQuery.toLowerCase());

                return (
                  <span
                    key={sIdx}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                      isMatch
                        ? "bg-[#d85827]/40 text-[#fdfbf7] border border-[#d85827] shadow-sm shadow-[#d85827]/30 scale-105"
                        : "bg-white/[0.04] text-stone-200 border border-white/5 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {skill}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
