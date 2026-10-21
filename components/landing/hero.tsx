import { PlayIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { InfiniteSlider } from "@/components/grootstudio/logo-marquee"
import { buttonVariants } from "@/components/ui/button"
import { Skiper67 } from "@/components/ui/skiper-ui/skiper67"
import TextAnimation from "@/components/ui/staggerText"
import { LANDING_PLAY_URL } from "@/lib/app-links"
import { cn } from "@/lib/utils"

import { FEATURE_CHIPS } from "./data"
import { GooglePlayIcon } from "./google-play-icon"
import { Phone } from "./phone"
import { BlackButton } from "./primitives"

// Stock footage (Pexels, free license): swap for the real ReelHire showreel.
const SHOWREEL = { src: "/showreel/reelhire-showreel.mp4", poster: "/showreel/reelhire-showreel.jpg" }

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 md:pt-24">

      <div className="relative mx-auto max-w-3xl px-4 text-center">
        <h1 className="text-5xl font-medium tracking-tight text-balance md:text-7xl">
          <TextAnimation>Tech hiring,</TextAnimation>
          <br />
          <TextAnimation delay={0.15}>told in reels.</TextAnimation>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-pretty text-muted-foreground md:text-lg">
          ReelHire swaps resumes and job posts for short vertical videos. Candidates pitch, teams pitch back.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <BlackButton href={LANDING_PLAY_URL}>
            <GooglePlayIcon className="mr-2" />
            Download the app
          </BlackButton>
          <Skiper67
            {...SHOWREEL}
            radius={22}
            playHint={false}
            label="Watch the demo"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 bg-background px-5 shadow-xs")}
          >
            <HugeiconsIcon icon={PlayIcon} data-icon="inline-start" />
            Watch the demo
          </Skiper67>
        </div>
      </div>

      <HeroPhones />
      <FeatureMarquee />
    </section>
  )
}

function HeroPhones() {
  return (
    <div className="relative mx-auto mt-14 h-[430px] max-w-5xl overflow-hidden md:mt-16 md:h-[520px]">

      <div className="absolute top-24 right-[calc(50%+80px)] hidden -rotate-[8deg] sm:block md:right-[calc(50%+110px)]">
        <Phone screen="discover" zoom={0.82} />
      </div>
      <div className="absolute top-24 left-[calc(50%+80px)] hidden rotate-[8deg] sm:block md:left-[calc(50%+110px)]">
        <Phone screen="applicants" zoom={0.82} />
      </div>
      <div className="absolute top-0 left-1/2 z-10 -translate-x-1/2">
        <Phone screen="feed" />
      </div>

      <div aria-hidden className="absolute inset-x-0 bottom-0 z-20 h-40 bg-gradient-to-t from-card via-card/80 to-transparent" />
    </div>
  )
}

function FeatureMarquee() {
  return (
    <div className="relative mx-auto max-w-4xl px-4 pb-6 text-center">
      <p className="text-sm text-muted-foreground">Built around how tech teams actually hire</p>
      <InfiniteSlider
        gap={8}
        duration={40}
        durationOnHover={90}
        className="mt-4 rounded-xl border bg-background py-2.5 mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
      >
        {FEATURE_CHIPS.map((chip) => (
          <span
            key={chip.label}
            className="flex items-center gap-1.5 rounded-lg border bg-card px-3 py-1.5 text-sm font-medium whitespace-nowrap shadow-xs"
          >
            <HugeiconsIcon icon={chip.icon} size={15} />
            {chip.label}
          </span>
        ))}
      </InfiniteSlider>
    </div>
  )
}
