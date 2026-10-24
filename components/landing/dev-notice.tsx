const NOTES = [
  "ReelHire is in development",
  "The demo video isn't ready yet",
  "Internal testing starts soon",
]

/** Notes repeated enough to overfill wide screens before the loop resets. */
const RUN = Array.from({ length: 4 }, () => NOTES).flat()

export function DevNotice() {
  return (
    <div role="note" aria-label="Development notice" className="relative z-50 overflow-hidden bg-black text-white">
      <p className="sr-only">{NOTES.join(". ")}.</p>
      {/* Two identical halves: shifting by -50% lands exactly where it started. */}
      <div aria-hidden className="flex w-max animate-marquee motion-reduce:animate-none">
        {[0, 1].map((half) => (
          <ul key={half} className="flex shrink-0 items-center">
            {RUN.map((note, i) => (
              <li key={i} className="flex items-center gap-6 px-3 py-2 text-xs font-medium tracking-wide whitespace-nowrap">
                <span className="size-1.5 rounded-full bg-red-500" />
                {note}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
