import { ArrowUpRight01Icon, Calendar03Icon, Clock01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { POSTS } from "./data"
import { VideoBackdrop } from "./phone"
import { DitherBackdrop } from "./dither-backdrop"
import { Eyebrow, SectionTitle } from "./primitives"

export function Journal() {
  return (
    <section id="journal" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 md:px-8 md:py-28">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Eyebrow>Journal</Eyebrow>
          <SectionTitle className="mt-4" lead="Better hiring" tail="starts with a story." />
        </div>
        <p className="max-w-sm text-muted-foreground text-pretty">
          Practical guides on recording reels, screening with video and writing job posts people finish watching.
        </p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {POSTS.map((post, i) => (
          <a
            key={post.title}
            href="#journal"
            className="group flex flex-col rounded-xl border bg-background p-2 shadow-xs transition-shadow hover:shadow-md"
          >
            <div className="relative h-56 overflow-hidden rounded-lg bg-neutral-950">
              <DitherBackdrop frame={i * 4000} />
              <Cover index={i} />
              <span className="absolute top-4 left-4 font-mono text-xs text-white/60">0{i + 1}</span>
              <span className="absolute top-3 right-3 grid size-8 place-items-center rounded-full bg-white/90 text-black transition-transform group-hover:rotate-45">
                <HugeiconsIcon icon={ArrowUpRight01Icon} size={15} />
              </span>
              <span className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                {post.tag}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-3 pt-4">
              <h3 className="flex-1 font-medium text-pretty">{post.title}</h3>
              <p className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <HugeiconsIcon icon={Calendar03Icon} size={13} />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <HugeiconsIcon icon={Clock01Icon} size={13} />
                  {post.read}
                </span>
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

/** Small typographic cover for each post, echoing its topic. */
function Cover({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="absolute top-5 bottom-14 left-1/2 w-24 -translate-x-1/2 overflow-hidden rounded-md border-2 border-white/80 shadow-xl">
        <VideoBackdrop size="md" />
        <span className="absolute bottom-1.5 left-1.5 rounded-[3px] bg-white px-1 text-[10px] font-semibold text-black">
          1:00
        </span>
      </div>
    )
  }
  if (index === 1) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <span className="font-mono text-6xl font-medium tracking-tight">0:10</span>
        <span className="mt-3 h-1 w-40 overflow-hidden rounded-full bg-white/20">
          <span className="block h-full w-1/6 rounded-full bg-white" />
        </span>
      </div>
    )
  }
  return (
    <div className="absolute inset-x-10 top-10 space-y-2 rounded-md border border-white/15 bg-black/40 p-3 text-white backdrop-blur">
      {["Hook · who we are", "The role · what you'll own", "The team · why now"].map((line, n) => (
        <p key={line} className="flex items-center gap-2 text-xs">
          <span className="font-mono text-white/50">0{n + 1}</span>
          {line}
        </p>
      ))}
    </div>
  )
}
