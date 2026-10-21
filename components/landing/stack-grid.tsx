import { LogoGrid } from "@/components/grootstudio/logo-grid"

import { STACK_LOGOS } from "./data"
import { SectionTitle } from "./primitives"

const GRID_STACKS = ["React", "TypeScript", "Python", "Go", "Kotlin", "Swift", "Figma", "PostgreSQL"]

export function StackGrid() {
  const logos = STACK_LOGOS.filter((logo) => GRID_STACKS.includes(logo.alt))

  return (
    <section className="overflow-hidden pb-20 md:pb-28">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <SectionTitle lead="Filter by the stack" tail="you actually ship." />
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground text-pretty">
          Every profile and job reel carries real stack, level and location data, so recruiters narrow the field first
          and only watch the reels that fit.
        </p>
      </div>
      <LogoGrid logos={logos} className="mx-auto mt-12 max-w-4xl [&_img]:opacity-75" />
    </section>
  )
}
