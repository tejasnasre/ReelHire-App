import { Briefcase01Icon, CheckmarkCircle02Icon, Location01Icon, Search01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { cn } from "@/lib/utils"

import { Phone } from "./phone"
import { DitherBackdrop } from "./dither-backdrop"
import { DotGrid, SectionTitle } from "./primitives"

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 md:px-8 md:py-28">
      <SectionTitle lead="Everything you need to" tail="hire and get hired." />
      <p className="mt-4 max-w-xl text-muted-foreground text-pretty">
        Video comes first. Every profile and every job is a reel, backed by the structured filters recruiters already
        rely on.
      </p>

      <div className="mt-12 grid gap-4 md:grid-cols-3 md:grid-rows-[300px_300px]">
        {/* Video resume */}
        <article className="relative overflow-hidden rounded-xl border bg-secondary p-6 md:row-span-2">
          <DotGrid className="[mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
          <div className="relative">
            <h3 className="text-xl font-medium">Video resumes in minutes</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              A guided 20-90 second reel, recorded and trimmed right in the app.
            </p>
          </div>
          <div className="relative mt-8 flex h-[380px] justify-center md:h-[460px]">
            <Phone screen="record" zoom={0.9} notes className="absolute top-0" />
          </div>
        </article>

        {/* Job reels */}
        <article className="relative overflow-hidden rounded-xl bg-neutral-950 p-6 text-white md:col-span-2">
          <DitherBackdrop scrim />
          <div className="relative grid h-full gap-6 md:grid-cols-[1fr_1.1fr] md:items-center">
            <div>
              <h3 className="text-xl font-medium">Job reels from real teams</h3>
              <p className="mt-2 max-w-xs text-sm text-white/65">
                Meet the people, the stack and the mission in under a minute before you hit apply.
              </p>
            </div>
            <div className="relative flex flex-col gap-3 md:pl-6">
              <Notice
                title="Northwind Labs posted a reel"
                body="Staff Backend Engineer · Remote · Go, Postgres"
                className="md:-rotate-2"
              />
              <Notice
                title="You were shortlisted"
                body="Product Designer at Fieldnote watched your reel"
                className="md:translate-x-8 md:rotate-1"
                solid
              />
            </div>
          </div>
        </article>

        {/* Filters */}
        <article className="relative overflow-hidden rounded-xl border bg-background p-6">
          <h3 className="text-xl font-medium">Filter fast, then watch</h3>
          <p className="mt-2 text-sm text-muted-foreground">Narrow by stack, level and location. Every match has a reel.</p>
          <div className="mt-5 rounded-lg border bg-card p-3 shadow-sm">
            <div className="flex flex-wrap gap-1.5">
              {["Junior", "Mid", "Senior", "Staff"].map((l) => (
                <span
                  key={l}
                  className={cn(
                    "rounded-md border px-2 py-0.5 text-xs font-medium",
                    l === "Senior" ? "border-foreground bg-foreground text-background" : "bg-secondary",
                  )}
                >
                  {l}
                </span>
              ))}
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {["React", "TypeScript", "GraphQL"].map((s) => (
                <span key={s} className="rounded-md border border-foreground px-2 py-0.5 text-xs font-medium">
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between border-t pt-2.5 text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <HugeiconsIcon icon={Location01Icon} size={13} /> Remote only
              </span>
              <span className="flex h-4 w-7 items-center justify-end rounded-full bg-foreground p-0.5">
                <span className="size-3 rounded-full bg-background" />
              </span>
            </div>
          </div>
        </article>

        {/* Searchable */}
        <article className="relative overflow-hidden rounded-xl border bg-background p-6">
          <h3 className="text-xl font-medium">Every reel, searchable</h3>
          <p className="mt-2 text-sm text-muted-foreground">Transcripts and tags keep video as skimmable as text.</p>
          <div className="mt-5 rounded-lg border bg-card p-3 text-xs shadow-sm">
            <div className="flex items-center gap-1.5 rounded-md border bg-background px-2 py-1.5 text-muted-foreground">
              <HugeiconsIcon icon={Search01Icon} size={12} />
              <span className="text-foreground">design systems</span>
            </div>
            <p className="mt-2.5 leading-relaxed text-muted-foreground">
              <span className="font-mono text-[10px]">0:21</span> …I led the migration to a shared{" "}
              <mark className="rounded-[3px] bg-foreground px-1 text-background">design system</mark> across three
              product teams, which cut…
            </p>
            <div className="mt-2 flex gap-1.5">
              {["#frontend", "#leadership", "#a11y"].map((t) => (
                <span key={t} className="rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

function Notice({ title, body, className, solid }: { title: string; body: string; className?: string; solid?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border p-3 shadow-lg",
        solid ? "border-transparent bg-card text-card-foreground" : "border-white/15 bg-white/10 backdrop-blur",
        className,
      )}
    >
      <span
        className={cn(
          "grid size-8 shrink-0 place-items-center rounded-md",
          solid ? "bg-foreground text-background" : "bg-white text-black",
        )}
      >
        <HugeiconsIcon icon={solid ? CheckmarkCircle02Icon : Briefcase01Icon} size={16} />
      </span>
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className={cn("text-xs", solid ? "text-muted-foreground" : "text-white/65")}>{body}</p>
      </div>
    </div>
  )
}
