import { AudienceTabs } from "@/components/landing/audience-tabs"
import { DownloadCta } from "@/components/landing/download-cta"
import { Faq } from "@/components/landing/faq"
import { Features } from "@/components/landing/features"
import { Footer } from "@/components/landing/footer"
import { Hero } from "@/components/landing/hero"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Navbar } from "@/components/landing/navbar"
import { Pricing } from "@/components/landing/pricing"
import { Showcase } from "@/components/landing/showcase"
import { StackGrid } from "@/components/landing/stack-grid"
import { LightLines } from "@/components/ui/light-lines"

export default function Home() {
  return (
    <div id="top" className="relative min-h-screen overflow-clip bg-card font-sans">
      <LightLines
        className="h-[840px] mask-[linear-gradient(to_bottom,black_45%,transparent)]"
        gradientFrom="var(--card)"
        gradientTo="var(--card)"
        lineColor="var(--foreground)"
        lightColor="var(--foreground)"
        linesOpacity={0.07}
        lightsOpacity={0.3}
      />
      <Navbar />
      <main>
        <Hero />
        <Showcase />
        <Features />
        <StackGrid />
        <HowItWorks />
        <AudienceTabs />
        <Pricing />
        <Faq />
        <DownloadCta />
      </main>
      <Footer />
    </div>
  )
}
