import { HeroSection } from '@/components/landing/HeroSection'
import { BentoGrid } from '@/components/landing/BentoGrid'
import { ArchitectureSection } from '@/components/landing/ArchitectureSection'
import { AnalyticsPreview } from '@/components/landing/AnalyticsPreview'
import { LandingFooter } from '@/components/landing/LandingFooter'
import { LandingNav } from '@/components/landing/LandingNav'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-surface-50 overflow-x-hidden">
      <LandingNav />
      <HeroSection />
      <BentoGrid />
      <ArchitectureSection />
      <AnalyticsPreview />
      <LandingFooter />
    </main>
  )
}
