"use client"

import { ArrowLeft01Icon, ArrowRight01Icon, PauseIcon, PlayIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useInView, useReducedMotion } from "motion/react"
import { useRef, useState } from "react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { REEL_STORIES } from "./data"
import { VideoBackdrop } from "./phone"
import { Monogram } from "./primitives"

const SIDE_CARDS = 3
/** How long each story plays before the strip moves on, like a reel. */
const STORY_MS = 6500

export function ReelStrip() {
  const [active, setActive] = useState(Math.floor(REEL_STORIES.length / 2))
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.5 })
  const reduce = useReducedMotion()

  const count = REEL_STORIES.length
  const go = (delta: number) => setActive((i) => (i + delta + count) % count)
  // Hover and focus hold the story while someone reads it; off-screen it
  // waits instead of advancing unseen.
  const autoplay = !reduce && !paused
  const playing = autoplay && !hovered && inView

  // Lay the stories out around the active one so the strip wraps endlessly.
  const slots = Array.from({ length: SIDE_CARDS * 2 + 1 }, (_, n) => {
    const offset = n - SIDE_CARDS
    return { offset, index: (active + offset + count * 2) % count }
  })

  return (
    <div
      ref={ref}
      role="region"
      aria-roledescription="carousel"
      aria-label="Pilot stories"
      className="mt-14"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1)
        if (e.key === "ArrowRight") go(1)
      }}
    >
      <div
        className="flex h-115 items-center justify-center gap-2.5 mask-[linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] md:gap-3"
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        {slots.map(({ offset, index }) => {
          const story = REEL_STORIES[index]
          const distance = Math.abs(offset)
          const isActive = offset === 0
          return (
            <button
              key={story.name}
              type="button"
              onClick={() => setActive(index)}
              aria-label={isActive ? undefined : `Show story from ${story.name}`}
              aria-current={isActive || undefined}
              disabled={isActive}
              className={cn(
                "relative shrink-0 overflow-hidden rounded-xl text-left text-white transition-all duration-500 ease-out",
                isActive && "h-full w-[min(320px,78vw)] shadow-xl",
                distance === 1 && "h-[86%] w-14 md:w-16",
                distance === 2 && "hidden h-[76%] w-14 opacity-80 sm:block md:w-16",
                distance === 3 && "hidden h-[66%] w-14 opacity-60 md:block",
                !isActive && "cursor-pointer grayscale hover:opacity-100 hover:grayscale-0",
              )}
            >
              <VideoBackdrop tone={index} size={isActive ? "lg" : "md"} />
              {isActive ? (
                <>
                  <div aria-hidden className="absolute inset-x-3 top-3 flex gap-1">
                    {REEL_STORIES.map((s, i) => (
                      <span key={s.name} className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/25">
                        {i < active || (i === active && !autoplay) ? (
                          <span className="block size-full bg-white" />
                        ) : i === active ? (
                          <span
                            key={active}
                            className="block size-full origin-left animate-reel-progress bg-white"
                            style={{
                              animationDuration: `${STORY_MS}ms`,
                              animationPlayState: playing ? "running" : "paused",
                            }}
                            onAnimationEnd={() => go(1)}
                          />
                        ) : null}
                      </span>
                    ))}
                  </div>
                  <div
                    aria-live={autoplay ? "off" : "polite"}
                    className="absolute inset-x-3 bottom-3 rounded-lg border border-white/15 bg-black/45 p-4 backdrop-blur-md"
                  >
                    <p className="text-sm leading-relaxed">&ldquo;{story.quote}&rdquo;</p>
                    <div className="mt-3 flex items-center gap-2.5 border-t border-white/15 pt-3">
                      <Monogram name={story.name} className="size-8 bg-white text-black" />
                      <div>
                        <p className="text-sm font-medium">{story.name}</p>
                        <p className="text-xs text-white/65">{story.role}</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
            </button>
          )
        })}
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous story"
          className={cn(buttonVariants({ variant: "outline", size: "icon" }), "size-10 rounded-full bg-background")}
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} />
        </button>
        {reduce ? null : (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Play stories" : "Pause stories"}
            className={cn(buttonVariants({ size: "icon" }), "size-12 rounded-full active:scale-95")}
          >
            <HugeiconsIcon icon={paused ? PlayIcon : PauseIcon} size={18} />
          </button>
        )}
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next story"
          className={cn(buttonVariants({ variant: "outline", size: "icon" }), "size-10 rounded-full bg-background")}
        >
          <HugeiconsIcon icon={ArrowRight01Icon} />
        </button>
      </div>
    </div>
  )
}
