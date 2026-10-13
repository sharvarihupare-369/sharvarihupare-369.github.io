"use client";

import React, { useState } from "react";
import Image from "next/image";
import { portfolioData } from "@/data/portfolioData";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { FileText, Menu, X, ArrowUpRight, Sparkles, Gamepad2 } from "lucide-react";

interface NavbarProps {
  activeSection: string;
}

export function Navbar({ activeSection }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollTo } = useSmoothScroll();

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    scrollTo(href, { offset: -70 });
  };

  const handleOpenArcade = () => {
    setMobileMenuOpen(false);
    window.dispatchEvent(new CustomEvent("open-arcade"));
  };

  const handleResumeClick = () => {
    // Trigger download of the PDF file
    const downloadAnchor = document.createElement("a");
    downloadAnchor.href =
      portfolioData.personal.resumePdfUrl || "/Sharvari_Hupare_Resume.pdf";
    downloadAnchor.download = "Sharvari_Hupare_Resume.pdf";
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-5 py-3 rounded-full bg-[#1a0e08]/85 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/60">
          {/* Logo / Monogram */}
          <button
            onClick={() => handleNavClick("#hero")}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
            aria-label="Back to top"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden border border-[#d85827]/50 shadow-md shadow-[#d85827]/25 group-hover:scale-105 transition-transform bg-gradient-to-tr from-[#d85827] to-[#c67d1f] flex items-center justify-center font-bold text-white text-sm">
              {portfolioData.personal.avatarUrl ? (
                <Image
                  src={portfolioData.personal.avatarUrl}
                  alt={portfolioData.personal.name}
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                />
              ) : (
                "SH"
              )}
            </div>
            <div className="hidden sm:block">
              <span className="font-semibold text-sm tracking-tight text-[#fdfbf7] group-hover:text-[#f0834c] transition-colors">
                {portfolioData.personal.name}
              </span>
              <span className="block text-[10px] text-stone-400 font-mono tracking-wider uppercase">
                SDE • Full-Stack & AI
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5" aria-label="Main Navigation">
            {portfolioData.navItems.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;

              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#d85827]/20 text-[#f5ab79] border border-[#d85827]/40 shadow-sm shadow-[#d85827]/20"
                      : "text-stone-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Status Beacon - Amber Ochre Pill matching Image 1 */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-[#c67d1f]/20 border border-[#c67d1f]/40 text-[#f5c07b] text-[11px] font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f5c07b] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c67d1f]"></span>
              </span>
              Available for Roles
            </div>

            {/* Arcade Game Button */}
            <button
              onClick={handleOpenArcade}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-[#d85827]/15 hover:bg-[#d85827]/25 text-[#f5ab79] hover:text-white border border-[#d85827]/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              title="Play Bug Hunter Arcade Mini-Game"
            >
              <Gamepad2 className="w-3.5 h-3.5 text-[#f5ab79]" />
              <span>Arcade</span>
            </button>

            {/* Resume Button */}
            <a
              href={
                portfolioData.personal.resumeUrl ||
                "https://drive.google.com/file/d/17Jv9iKYVOez6MPqBFYxZTkCcr279rYzd/view?usp=sharing"
              }
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleResumeClick}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/5 hover:bg-white/10 text-stone-200 hover:text-white border border-white/10 transition-all hover:border-[#d85827]/40 cursor-pointer"
              title="Open Google Drive & Download Resume PDF"
            >
              <FileText className="w-3.5 h-3.5 text-[#f5ab79]" />
              <span>Resume</span>
            </a>

            {/* Contact CTA */}
            <button
              onClick={() => handleNavClick("#contact")}
              className="flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-[#d85827] to-[#c67d1f] hover:from-[#e76735] hover:to-[#d98d2b] text-white shadow-md shadow-[#d85827]/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-stone-300 hover:text-white rounded-lg hover:bg-white/5 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 rounded-2xl bg-[#1a0e08]/95 backdrop-blur-2xl border border-white/10 shadow-2xl space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            {portfolioData.navItems.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? "bg-[#d85827]/20 text-[#f5ab79] border border-[#d85827]/30"
                      : "text-stone-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Mobile Resume Link */}
            <a
              href={
                portfolioData.personal.resumeUrl ||
                "https://drive.google.com/file/d/17Jv9iKYVOez6MPqBFYxZTkCcr279rYzd/view?usp=sharing"
              }
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                handleResumeClick();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-stone-200 bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#f5ab79]" />
                <span>Resume (View & Download)</span>
              </span>
              <ArrowUpRight className="w-4 h-4 text-stone-400" />
            </a>

            {/* Mobile Arcade trigger */}
            <button
              onClick={handleOpenArcade}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-[#f5ab79] bg-[#d85827]/15 border border-[#d85827]/30 flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Gamepad2 className="w-4 h-4" />
                <span>Play Bug Hunter Arcade</span>
              </span>
              <span className="text-[10px] font-mono uppercase bg-[#d85827]/30 px-2 py-0.5 rounded text-white font-bold">
                GAME
              </span>
            </button>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-[#f5c07b] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#c67d1f] inline-block"></span>
                Open to Opportunities
              </span>
              <a
                href="mailto:sharvarihupare15@gmail.com"
                className="text-xs text-[#f0834c] hover:underline"
              >
                sharvarihupare15@gmail.com
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
