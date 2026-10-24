import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { CONTACT_HREF } from "@/lib/app-links"
import { cn } from "@/lib/utils"

import { SectionTitle } from "./primitives"

// No customers yet, so the wall shows ghost logos in numbered, open slots.
const GHOST_LOGOS = [
  { mark: "rounded-md", bar: "w-16" },
  { mark: "rounded-full", bar: "w-12" },
  { mark: "rounded-sm rotate-45 scale-75", bar: "w-20" },
  { mark: "rounded-full", bar: "w-14" },
  { mark: "rounded-md", bar: "w-10" },
  { mark: "rounded-sm rotate-45 scale-75", bar: "w-16" },
  { mark: "rounded-full", bar: "w-[4.5rem]" },
]

const FOUNDING_HREF = `${CONTACT_HREF}?subject=${encodeURIComponent("Partnership with ReelHire")}`

export function FoundingTeams() {
  return (
    <section className="overflow-hidden pb-20 md:pb-28">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <SectionTitle lead="Your logo could be" tail="the first one here." />
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground text-pretty">
          ReelHire is new, so this wall is still empty. The first teams to post a job reel get a spot on it, right where
          every candidate scrolls past.
        </p>
      </div>

      <div className="relative mx-auto mt-12 max-w-4xl border-x">
        <div className="pointer-events-none absolute -top-px left-1/2 w-screen -translate-x-1/2 border-t" />

        <ul className="grid grid-cols-2 gap-px bg-border md:grid-cols-4">
          {GHOST_LOGOS.map((logo, i) => (
            <li
              key={i}
              className={cn(
                "group relative flex h-28 items-center justify-center md:h-32",
                i === 0 || i === 2 || i === 5 ? "bg-secondary dark:bg-secondary/30" : "bg-background",
              )}
            >
              <span className="absolute top-3 left-3 font-mono text-[10px] text-muted-foreground/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="absolute top-3 right-3 flex items-center gap-1.5 text-[10px] text-muted-foreground/70">
                <span className="size-1.5 rounded-full bg-muted-foreground/40" />
                Open
              </span>

              <span
                aria-hidden
                className="flex items-center gap-2 opacity-50 transition-opacity duration-300 group-hover:opacity-0"
              >
                <span className={cn("size-5 border border-dashed border-foreground/50", logo.mark)} />
                <span className={cn("h-2.5 rounded-full bg-foreground/15", logo.bar)} />
              </span>
              <span className="absolute inset-0 grid place-items-center text-sm font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Your logo here
              </span>
            </li>
          ))}

          <li className="relative bg-foreground text-background">
            <a
              href={FOUNDING_HREF}
              className="group flex h-28 flex-col justify-end p-4 md:h-32"
            >
              <span className="absolute top-3 left-3 font-mono text-[10px] opacity-60">08</span>
              <span className="flex items-center justify-between gap-2 text-sm font-medium">
                Claim a spot
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </a>
          </li>
        </ul>

        <div className="pointer-events-none absolute -bottom-px left-1/2 w-screen -translate-x-1/2 border-b" />
      </div>
    </section>
  )
}
