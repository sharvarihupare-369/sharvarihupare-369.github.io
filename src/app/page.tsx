"use client";

import React from "react";
import dynamic from "next/dynamic";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import { useScrollJourney } from "@/hooks/useScrollJourney";
import { Navbar } from "@/components/ui/Navbar";
import { HeroSection } from "@/components/ui/HeroSection";
import { AboutSection } from "@/components/ui/AboutSection";
import { ExperienceSection } from "@/components/ui/ExperienceSection";
import { ProjectsSection } from "@/components/ui/ProjectsSection";
import { SkillsSection } from "@/components/ui/SkillsSection";
import { ContactSection } from "@/components/ui/ContactSection";
import { Footer } from "@/components/ui/Footer";
import { Preloader } from "@/components/ui/Preloader";

import { JourneyHUD } from "@/components/ui/JourneyHUD";
import { ArcadeButton } from "@/components/game/ArcadeButton";
import { CyberCursorTrail } from "@/components/ui/CyberCursorTrail";

// Gentle Starfield with Warm Radial Gradients (No big golden ring, no heavy models)
const Scene = dynamic(() => import("@/components/3d/Scene"), {
  ssr: false,
});

function PortfolioContent() {
  const { progress, activeSection, mouse, velocity, isWarping } = useScrollJourney();

  return (
    <>
      <Preloader />

      {/* Interactive Cyber Cursor Particle Spark Trail */}
      <CyberCursorTrail />

      {/* Gentle Starfield & Warm Gradient Background */}
      <Scene
        progress={progress}
        mouse={mouse}
        velocity={velocity}
        isWarping={isWarping}
      />

      {/* Sticky Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Section Progress & Milestone HUD */}
      <JourneyHUD
        progress={progress}
        activeSection={activeSection}
        velocity={velocity}
      />

      {/* Floating Arcade Mini-Game Launcher */}
      <ArcadeButton />

      {/* Main Narrative Flow */}
      <main className="relative z-10 w-full overflow-hidden">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>

      {/* Closing Footer */}
      <Footer />
    </>
  );
}

export default function Home() {
  return (
    <SmoothScrollProvider>
      <PortfolioContent />
    </SmoothScrollProvider>
  );
}
