"use client"

import { motion, useInView, useReducedMotion } from "motion/react"
import { useRef } from "react"

/*
 * Hand-drawn notes over a phone, like the app's welcome screen
 * (app/src/components/onboarding/screenshot-notes.tsx). Notes are placed in
 * the device frame's own 649×1400 space, the same space the app's onboarding
 * screenshots use, so positions carry over from the app unchanged.
 */

export const FRAME = { width: 649, height: 1400 }

/** The Phone box is 280px wide; strokes and tags are sized in its CSS pixels. */
const SCALE = 280 / FRAME.width

type Point = [x: number, y: number]

export type Note = {
  label: string
  /** The tag's top-left corner. */
  at: Point
  /** Degrees; a little tilt so it reads as stuck on by hand. */
  tilt?: number
  /** Width the label wraps at, in frame pixels. */
  maxWidth?: number
  /** From near the tag to the thing it explains, bowed sideways by `bend`. */
  arrow?: { from: Point; to: Point; bend: number }
}

const STROKE_PX = 2.5
const HALO_PX = 3
const HEAD_LENGTH = 24
const HEAD_ANGLE = (28 * Math.PI) / 180

const DELAY_S = 0.35
const DRAW_S = 1.1
const EASE_OUT = [0.23, 1, 0.32, 1] as const

/** A quadratic curve for the shaft plus a two-stroke head that follows it. */
function arrowPaths({ from, to, bend }: NonNullable<Note["arrow"]>) {
  const [x1, y1] = from
  const [x2, y2] = to
  const dx = x2 - x1
  const dy = y2 - y1
  const length = Math.hypot(dx, dy)
  const cx = (x1 + x2) / 2 - (dy / length) * bend
  const cy = (y1 + y2) / 2 + (dx / length) * bend

  const angle = Math.atan2(y2 - cy, x2 - cx)
  const wing = (side: number) => {
    const a = angle + Math.PI + side * HEAD_ANGLE
    return `${x2 + Math.cos(a) * HEAD_LENGTH} ${y2 + Math.sin(a) * HEAD_LENGTH}`
  }

  return {
    shaft: `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`,
    head: `M ${wing(-1)} L ${x2} ${y2} L ${wing(1)}`,
  }
}

/**
 * Draws on the first time the phone scrolls into view. The section copy says
 * the same thing in words, so the notes are hidden from screen readers.
 * Under Reduce Motion they're simply there.
 */
export function PhoneNotes({ notes }: { notes: Note[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const reduce = useReducedMotion()
  const shown = reduce || inView

  // Each note gets its own stretch of the run, overlapping the next.
  const span = 1 / (1 + (notes.length - 1) * 0.6)
  const at = (fraction: number) => DELAY_S + fraction * DRAW_S

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0">
      <svg viewBox={`0 0 ${FRAME.width} ${FRAME.height}`} className="absolute inset-0 size-full overflow-visible">
        {notes.map((note, i) => {
          if (!note.arrow) return null
          const { shaft, head } = arrowPaths(note.arrow)
          const start = i * span * 0.6
          // The tag lands first, then the shaft draws, then the head.
          const strokes = [
            { d: shaft, delay: at(start + span * 0.25), duration: span * 0.5 * DRAW_S },
            { d: head, delay: at(start + span * 0.75), duration: span * 0.25 * DRAW_S },
          ]
          return [
            { color: "var(--background)", width: (STROKE_PX + HALO_PX * 2) / SCALE },
            { color: "var(--foreground)", width: STROKE_PX / SCALE },
          ].flatMap((ink) =>
            strokes.map((stroke) => (
              <motion.path
                key={`${note.label}-${ink.color}-${stroke.d}`}
                d={stroke.d}
                fill="none"
                stroke={ink.color}
                strokeWidth={ink.width}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                animate={shown ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{
                  pathLength: { delay: stroke.delay, duration: stroke.duration, ease: EASE_OUT },
                  opacity: { delay: stroke.delay, duration: 0.01 },
                }}
              />
            )),
          )
        })}
      </svg>

      {notes.map((note, i) => {
        const start = i * span * 0.6
        const tilt = note.tilt ?? 0
        return (
          <motion.span
            key={note.label}
            className="absolute rounded-md bg-foreground px-1.5 pt-px pb-0.5 font-hand text-[15px] leading-4 font-bold text-background shadow-sm"
            style={{
              left: note.at[0] * SCALE,
              top: note.at[1] * SCALE,
              maxWidth: note.maxWidth ? note.maxWidth * SCALE : undefined,
              width: note.maxWidth ? "max-content" : undefined,
              whiteSpace: note.maxWidth ? undefined : "nowrap",
            }}
            initial={reduce ? false : { opacity: 0, scale: 0.85, rotate: tilt }}
            animate={shown ? { opacity: 1, scale: 1, rotate: tilt } : { opacity: 0, scale: 0.85, rotate: tilt }}
            transition={{ delay: at(start), duration: span * 0.3 * DRAW_S, ease: EASE_OUT }}
          >
            {note.label}
          </motion.span>
        )
      })}
    </div>
  )
}
