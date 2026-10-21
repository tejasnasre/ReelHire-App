import { GithubIcon, InstagramIcon, Linkedin01Icon, NewTwitterIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { LineHoverLink } from "@/components/ui/line-hover-link"

import { FOOTER_COLUMNS } from "./data"
import { NewsletterForm } from "./newsletter-form"
import { Logo } from "./primitives"

const SOCIALS = [
  { label: "LinkedIn", icon: Linkedin01Icon },
  { label: "X", icon: NewTwitterIcon },
  { label: "Instagram", icon: InstagramIcon },
  { label: "GitHub", icon: GithubIcon },
]

export function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-4 pt-4 pb-8 md:px-8">
      <div className="grid gap-10 md:grid-cols-[1.3fr_0.7fr_0.7fr_1.5fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            The reels-style hiring app for tech roles. Video resumes for candidates, video job posts for teams.
          </p>
          <ul className="mt-5 flex gap-2">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href="#"
                  aria-label={s.label}
                  className="grid size-9 place-items-center rounded-full border bg-background text-muted-foreground transition-colors hover:text-foreground"
                >
                  <HugeiconsIcon icon={s.icon} size={15} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="font-medium">{col.title}</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {col.links.map((link) => (
                <li key={link.label}>
                  <LineHoverLink variant="scribble" href={link.href} className="transition-colors hover:text-foreground">
                    {link.label}
                  </LineHoverLink>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="rounded-xl border bg-secondary p-6">
          <p className="text-lg font-medium tracking-tight">Get the weekly reel</p>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Hand-picked tech roles, recording tips and product updates. One email a week.
          </p>
          <NewsletterForm />
        </div>
      </div>

      <div className="mt-14 flex flex-col justify-between gap-2 border-t pt-6 text-sm text-muted-foreground sm:flex-row">
        <p>© 2026 ReelHire. All rights reserved.</p>
        <p>Made for people who build.</p>
      </div>
    </footer>
  )
}
