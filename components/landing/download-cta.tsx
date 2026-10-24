import { DitherBackdrop } from "./dither-backdrop"
import { Phone } from "./phone"
import { SectionTitle, PlayStoreButton } from "./primitives"

export function DownloadCta() {
  return (
    <section id="download" className="scroll-mt-24 px-4 pb-20 md:px-8 md:pb-28">
      <div className="relative mx-auto grid max-w-6xl overflow-hidden rounded-xl border bg-background md:grid-cols-2">
        <DitherBackdrop tone="light" scrim />
        <div className="relative flex flex-col justify-center p-8 md:min-h-[26rem] md:p-12 md:py-24">
          <SectionTitle as="h2" lead="Your next role is" tail="one reel away." className="md:text-4xl" />
          <p className="mt-4 max-w-sm text-muted-foreground text-pretty">
            Record your pitch, browse job reels and hear back from real teams, all from your phone.
          </p>
          <PlayStoreButton className="mt-8 justify-start" />
        </div>
        <div className="relative h-80 md:h-auto">
          <Phone screen="myProfile" zoom={0.85} notes className="absolute top-10 left-1/2 -translate-x-1/2" />
        </div>
      </div>
    </section>
  )
}
