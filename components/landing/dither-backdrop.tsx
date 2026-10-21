"use client"

import { Dithering } from "@paper-design/shaders-react"
import { useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

const TONES = {
  dark: { back: "#0a0a0a", front: "#6e6e6e", scrim: "from-neutral-950/90 via-neutral-950/55" },
  light: { back: "#f2f2f2", front: "#bdbdbd", scrim: "from-background/90 via-background/55" },
}

/**
 * Black-and-white dithered warp (Paper's "Warp" preset, in greys) used as the
 * texture on the site's cards. Fills its nearest positioned parent.
 */
export function DitherBackdrop({
  tone = "dark",
  scrim = false,
  frame = 0,
  className,
}: {
  /** "dark" for the black cards, "light" for cards on the page background. */
  tone?: keyof typeof TONES
  /** Fade the left side to the card's ground so copy sitting there stays readable. */
  scrim?: boolean
  /** Start offset (ms), so cards side by side don't show the same frame. */
  frame?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  const colors = TONES[tone]

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      <Dithering
        className="size-full"
        colorBack={colors.back}
        colorFront={colors.front}
        shape="warp"
        type="4x4"
        size={2.5}
        frame={frame}
        speed={reduce ? 0 : 1}
      />
      {scrim ? <div className={cn("absolute inset-0 bg-linear-to-r to-transparent", colors.scrim)} /> : null}
    </div>
  )
}
