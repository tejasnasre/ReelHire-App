import {
  ArrowRight01Icon,
  Calendar03Icon,
  CheckmarkCircle02Icon,
  Message01Icon,
  PlayIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"

import { cn } from "@/lib/utils"

import { VideoBackdrop } from "./phone"
import { DotGrid, Eyebrow, SectionTitle, PlayStoreButton } from "./primitives"

const STEPS = [
  {
    title: "Record your reel",
    body: "Your reel is your application. Follow the built-in guide, trim it, and post a 20-90 second pitch.",
    visual: <ReelStack />,
  },
  {
    title: "Swipe, watch, apply",
    body: "Browse job reels filtered to your stack and level. Swipe up to apply.",
    visual: <SwipeCard />,
  },
  {
    title: "Chat and get hired",
    body: "Get shortlisted, book interviews and follow every status in one place.",
    visual: <AlertStack />,
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 md:px-8 md:py-28">
      <div className="text-center">
        <Eyebrow>How it works</Eyebrow>
        <SectionTitle className="mx-auto mt-4 max-w-xl" lead="From first reel" tail="to first offer." />
        <p className="mx-auto mt-4 max-w-md text-muted-foreground text-pretty">
          No cover letters, no portals. Three steps from download to your first conversation.
        </p>
      </div>

      <ol className="mt-14 grid gap-8 md:grid-cols-3 md:gap-5">
        {STEPS.map((step, i) => (
          <li key={step.title} className={cn("flex flex-col gap-5", i === 1 && "md:flex-col-reverse md:justify-end")}>
            <div className="relative h-64 overflow-hidden rounded-xl border bg-secondary">
              <DotGrid />
              {step.visual}
            </div>
            <div className="px-1">
              <h3 className="text-lg font-medium">
                <span className="text-muted-foreground">{i + 1} ·</span> {step.title}
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <PlayStoreButton className="mt-12" />
    </section>
  )
}

function ReelStack() {
  const cards = [
    { tone: 1, className: "-rotate-12 -translate-x-16 translate-y-4 scale-90" },
    { tone: 2, className: "rotate-12 translate-x-16 translate-y-4 scale-90" },
    { tone: 0, className: "z-10" },
  ]
  return (
    <div className="absolute inset-0 grid place-items-center">
      {cards.map((card) => (
        <div
          key={card.tone}
          className={cn(
            "absolute h-44 w-28 overflow-hidden rounded-lg border-4 border-card shadow-lg",
            card.className,
          )}
        >
          <VideoBackdrop tone={card.tone} size="md" />
          {card.tone === 0 ? (
            <>
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid size-8 place-items-center rounded-md bg-white/90 text-black">
                  <HugeiconsIcon icon={PlayIcon} size={14} />
                </span>
              </span>
              <span className="absolute bottom-1.5 left-1.5 rounded-[3px] bg-white px-1 text-[10px] font-semibold text-black">
                1:02
              </span>
            </>
          ) : null}
        </div>
      ))}
    </div>
  )
}

function SwipeCard() {
  return (
    <div className="absolute inset-0 grid place-items-center p-6">
      <div className="w-full max-w-[250px] rounded-lg border bg-card p-3 shadow-lg">
        <div className="flex gap-3">
          <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded-md">
            <VideoBackdrop size="sm" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">Northwind Labs</p>
            <p className="text-sm leading-tight font-semibold">Senior Frontend Engineer</p>
            <p className="mt-1 text-xs text-muted-foreground">Remote · $140-170k</p>
          </div>
        </div>
        <div className="mt-3 flex h-10 items-center rounded-md bg-secondary p-1">
          <span className="grid h-full w-12 place-items-center rounded-[5px] bg-foreground text-background shadow-sm">
            <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
          </span>
          <span className="flex-1 text-center text-xs font-medium text-muted-foreground">Swipe to apply</span>
        </div>
      </div>
    </div>
  )
}

function AlertStack() {
  const alerts: { icon: IconSvgElement; title: string; body: string; className?: string }[] = [
    { icon: CheckmarkCircle02Icon, title: "Shortlisted", body: "Fieldnote · Product Designer", className: "translate-x-10" },
    { icon: Message01Icon, title: "New message", body: "Jess from Northwind Labs" },
    { icon: Calendar03Icon, title: "Interview booked", body: "Thursday · 3:00 PM", className: "translate-x-12" },
  ]
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-3 py-6 pl-8">
      {alerts.map((alert) => (
        <div
          key={alert.title}
          className={cn("flex w-[250px] items-center gap-3 rounded-full border bg-card py-2 pr-4 pl-2 shadow-md", alert.className)}
        >
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-foreground text-background">
            <HugeiconsIcon icon={alert.icon} size={15} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{alert.title}</p>
            <p className="truncate text-xs text-muted-foreground">{alert.body}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
