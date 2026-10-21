import { Carousel_001 } from "@/components/ui/skiper-ui/skiper47"

import { Phone, type ScreenName } from "./phone"
import { PlayStoreButton } from "./primitives"

const SCREENS: ScreenName[] = ["feed", "discover", "chat", "record", "applicants", "profile"]
// Swiper's loop needs more slides than fit on a wide screen, so run the set twice.
const SLIDES = [...SCREENS, ...SCREENS].map((screen, i) => ({ key: `${screen}-${i}`, node: <Phone screen={screen} /> }))

export function Showcase() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(ellipse_60%_40%_at_50%_45%,var(--secondary),transparent)]"
      />
      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-3xl font-medium tracking-tight text-balance md:text-5xl md:leading-[1.1]">
          A hiring profile that shows{" "}
          <span className="text-muted-foreground">how you think, how you talk and what you&apos;ve built.</span>
        </h2>
      </div>

      <Carousel_001
        slides={SLIDES}
        slidesPerView="auto"
        slideClassName="!w-[280px] py-6"
        spaceBetween={24}
        autoplay
        autoplayDelay={2500}
        showPagination
        className="relative mt-8 w-full mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
      />

      <div className="relative mx-auto mt-14 max-w-xl px-4 text-center">
        <h3 className="text-2xl font-medium tracking-tight md:text-3xl">Hire for the person, not the paperwork.</h3>
        <p className="mt-3 text-muted-foreground text-pretty">
          Stack, level and experience stay front and centre for filtering. The reel adds what a PDF never could: how
          someone explains a trade-off, talks about their team and lights up about their work.
        </p>
        <PlayStoreButton className="mt-7" />
      </div>
    </section>
  )
}
