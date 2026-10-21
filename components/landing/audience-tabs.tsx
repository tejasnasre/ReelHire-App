"use client"

import { Tick02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useState } from "react"

import StatsCounter from "@/components/ui/stats-counter"
import { cn } from "@/lib/utils"

import { PERSONAS } from "./data"
import { Phone } from "./phone"
import { DitherBackdrop } from "./dither-backdrop"
import { DotGrid, SectionTitle } from "./primitives"

export function AudienceTabs() {
  const [activeId, setActiveId] = useState(PERSONAS[0].id)
  const active = PERSONAS.find((p) => p.id === activeId) ?? PERSONAS[0]

  return (
    <section className="px-4 md:px-8">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-xl border bg-background px-4 py-16 md:px-10 md:py-20">
        <DotGrid />
        <div className="relative text-center">
          <SectionTitle className="mx-auto max-w-2xl" lead="One app," tail="for every side of the hire." />
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground text-pretty">
            Whether you&apos;re looking for your next role or building a team, ReelHire fits the way you already work.
          </p>

          <div
            role="tablist"
            aria-label="Who ReelHire is for"
            className="mx-auto mt-8 inline-flex max-w-full gap-1 overflow-x-auto rounded-full border bg-card p-1 shadow-xs"
          >
            {PERSONAS.map((p) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                id={`persona-tab-${p.id}`}
                aria-selected={p.id === active.id}
                aria-controls="persona-panel"
                onClick={() => setActiveId(p.id)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                  p.id === active.id ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <HugeiconsIcon icon={p.icon} size={15} />
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div
          id="persona-panel"
          role="tabpanel"
          aria-labelledby={`persona-tab-${active.id}`}
          className="relative mt-8 overflow-hidden rounded-xl bg-neutral-950 text-white md:h-[480px]"
        >
          <DitherBackdrop />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

          <div key={active.id} className="relative grid h-full md:grid-cols-[1.2fr_1fr]">
            <div className="flex flex-col justify-end gap-6 p-6 md:p-10">
              <div>
                <h3 className="max-w-md text-2xl font-medium tracking-tight text-balance md:text-3xl">{active.title}</h3>
                <p className="mt-3 max-w-md text-sm text-white/70 md:text-base">{active.body}</p>
              </div>
              <ul className="flex flex-wrap gap-2">
                {active.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-1.5 rounded-md border border-white/15 bg-white/10 px-2.5 py-1 text-xs backdrop-blur"
                  >
                    <HugeiconsIcon icon={Tick02Icon} size={12} />
                    {point}
                  </li>
                ))}
              </ul>
              {active.stat ? (
                <div className="flex items-end gap-3 border-t border-white/15 pt-5">
                  <StatsCounter value={active.stat.value} suffix={active.stat.suffix} className="text-5xl font-medium tracking-tight" />
                  <span className="pb-1.5 text-sm text-white/70">{active.stat.label}</span>
                </div>
              ) : null}
            </div>
            <div className="relative hidden md:block">
              <Phone screen={active.screen} zoom={0.85} className="absolute top-10 left-1/2 -translate-x-1/2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
