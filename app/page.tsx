"use client";
import { HeroSection } from "@/components/landing/HeroSection";
import { BentoGrid } from "@/components/landing/BentoGrid";
import { ArchitectureSection } from "@/components/landing/ArchitectureSection";
import { AnalyticsPreview } from "@/components/landing/AnalyticsPreview";
import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050507] overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <BentoGrid />
      <ArchitectureSection />
      <AnalyticsPreview />
      <Footer />
    </main>
  );
}
