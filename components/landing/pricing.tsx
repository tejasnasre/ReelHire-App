import { Briefcase01Icon, Rocket01Icon, Tick02Icon, UserIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { BorderBeam } from "@/components/ui/border-beam"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { PLANS } from "./data"
import { BlackButton, SectionTitle } from "./primitives"

const PLAN_ICONS = [UserIcon, Briefcase01Icon, Rocket01Icon]

export function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 md:px-8 md:py-28">
      <div>
        <SectionTitle lead="Free for seekers." tail="Simple for teams." />
        <p className="mt-4 max-w-md text-muted-foreground text-pretty">
          Job seekers never pay. Plans for recruiters and startups are coming soon.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {PLANS.map((plan, i) => (
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
                {plan.free ? (
                  <div className="flex items-baseline gap-1 text-right">
                    <span className="text-3xl font-medium tracking-tight">$0</span>
                    <span className="text-sm text-muted-foreground">/ forever</span>
                  </div>
                ) : (
                  <span className="rounded-full border bg-background px-3 py-1 text-sm font-medium text-muted-foreground">
                    Coming soon
                  </span>
                )}
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
        ))}
      </div>
    </section>
  )
}
