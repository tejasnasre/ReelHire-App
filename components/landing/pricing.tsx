"use client"

import { Briefcase01Icon, Rocket01Icon, Tick02Icon, UserIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useState } from "react"

import { AnimatedNumber } from "@/components/ui/animated-number"
import { BorderBeam } from "@/components/ui/border-beam"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { PLANS } from "./data"
import { BlackButton, SectionTitle } from "./primitives"

const PLAN_ICONS = [UserIcon, Briefcase01Icon, Rocket01Icon]

export function Pricing() {
  const [yearly, setYearly] = useState(false)

  return (
    <section id="pricing" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 md:px-8 md:py-28">
      <div>
        <SectionTitle lead="Free for seekers." tail="Simple for teams." />
        <p className="mt-4 max-w-md text-muted-foreground text-pretty">
          Job seekers never pay. Recruiters and startups choose a plan when they&apos;re ready to post.
        </p>

        <div className="mt-8 inline-flex items-center gap-1 rounded-full border bg-background p-1 shadow-xs">
          {[
            { label: "Monthly", value: false },
            { label: "Yearly", value: true },
          ].map((option) => (
            <button
              key={option.label}
              type="button"
              aria-pressed={yearly === option.value}
              onClick={() => setYearly(option.value)}
              className={cn(
                "flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                yearly === option.value ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {option.label}
              {option.value ? (
                <span
                  className={cn(
                    "rounded-full px-1.5 py-px text-[10px] font-semibold",
                    yearly ? "bg-background text-foreground" : "bg-secondary text-foreground",
                  )}
                >
                  Save 20%
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {PLANS.map((plan, i) => {
          const price = yearly ? plan.yearly : plan.monthly
          return (
            <article
              key={plan.name}
              className={cn(
                "relative flex flex-col rounded-xl border bg-card p-1.5 shadow-sm",
                plan.popular && "border-foreground/40 shadow-lg md:-translate-y-2",
              )}
            >
              {plan.popular ? (
                <BorderBeam size={120} duration={8} colorFrom="var(--foreground)" colorTo="var(--muted-foreground)" />
              ) : null}
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <span className="grid size-10 place-items-center rounded-lg border bg-background">
                    <HugeiconsIcon icon={PLAN_ICONS[i]} size={18} />
                  </span>
                  <div className="flex items-baseline gap-1 text-right">
                    <span className="flex text-3xl font-medium tracking-tight" aria-label={`$${price}`}>
                      $<AnimatedNumber value={price} />
                    </span>
                    <span className="text-sm text-muted-foreground">/ {price === 0 ? "forever" : "month"}</span>
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-2">
                  <h3 className="font-medium">{plan.name}</h3>
                  {plan.popular ? (
                    <span className="rounded-md bg-foreground px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-background uppercase">
                      Most popular
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{plan.blurb}</p>
                {yearly && price > 0 ? (
                  <p className="mt-1 text-xs text-muted-foreground">Billed ${price * 12} yearly</p>
                ) : null}
              </div>
              <div className="flex flex-1 flex-col rounded-lg border bg-background p-4">
                <p className="text-sm font-medium">What&apos;s included</p>
                <ul className="mt-3 flex-1 divide-y text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5 py-2.5">
                      <HugeiconsIcon icon={Tick02Icon} size={16} className="mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {plan.popular ? (
                  <BlackButton href={plan.href} className="mt-5 w-full">
                    {plan.cta}
                  </BlackButton>
                ) : (
                  <a
                    href={plan.href}
                    className={cn(buttonVariants({ variant: "outline", size: "lg" }), "mt-5 h-11 w-full bg-card")}
                  >
                    {plan.cta}
                  </a>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
