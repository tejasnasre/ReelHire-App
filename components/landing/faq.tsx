import { buttonVariants } from "@/components/ui/button"
import { FaqAccordion } from "@/components/ui/faq-accordion"
import { CONTACT_HREF } from "@/lib/app-links"
import { cn } from "@/lib/utils"

import { FAQS } from "./data"
import { DitherBackdrop } from "./dither-backdrop"
import { Eyebrow, SectionTitle } from "./primitives"

export function Faq() {
  return (
    <section id="faq" className="mx-auto grid max-w-6xl scroll-mt-24 gap-12 px-4 py-20 md:grid-cols-[1fr_1.35fr] md:px-8 md:py-28">
      <div className="md:sticky md:top-28 md:self-start">
        <Eyebrow>FAQ</Eyebrow>
        <SectionTitle className="mt-4" lead="Common questions," tail="quick answers." />
        <p className="mt-4 max-w-sm text-muted-foreground text-pretty">
          Everything you need to know about recording, applying and hiring on ReelHire.
        </p>

        <div className="relative mt-10 overflow-hidden rounded-xl bg-neutral-950 p-7 text-white">
          <DitherBackdrop scrim />
          <div className="relative">
            <p className="text-2xl font-medium tracking-tight">Still curious?</p>
            <p className="mt-1 text-sm text-white/65">Talk to the team behind ReelHire.</p>
            <a
              href={CONTACT_HREF}
              className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "mt-16 h-10 px-5")}
            >
              Contact us
            </a>
          </div>
        </div>
      </div>

      <FaqAccordion
        title=""
        items={FAQS.map((item) => ({ question: item.q, answer: item.a }))}
        className="mx-0 max-w-none py-0"
      />
    </section>
  )
}
