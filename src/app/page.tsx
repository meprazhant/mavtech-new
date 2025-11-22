'use client';

import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import ScrollHero from "@/components/ScrollHero";
import Projects from "@/components/Projects";
import PoweredByAI from "@/components/PoweredByAI";
import BlurText from "@/components/BlurText";
import Clients from "@/components/Clients";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import Gallery from "@/components/Gallery";

import TeamSection from "@/components/TeamSection";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen relative">
      {/* All components render immediately */}
      <Navbar />

      <div data-theme="dark">
        <ScrollHero />
      </div>

      <div data-theme="light">
        <Projects />
      </div>

      <div data-theme="dark">
        <PoweredByAI />
      </div>

      <div data-theme="light">
        <BlurText />
      </div>

      <div data-theme="dark">
        <TeamSection />
      </div>

      <div data-theme="dark">
        <Gallery />
      </div>

      <div data-theme="light">
        <Clients />
      </div>

      <div data-theme="light">
        <Footer />
      </div>

      {/* Overlay LoadingScreen */}
      {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}
    </div>
  );
}
