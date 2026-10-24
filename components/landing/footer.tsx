import { LineHoverLink } from "@/components/ui/line-hover-link"

import { FOOTER_COLUMNS } from "./data"
import { Logo } from "./primitives"

export function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-4 pt-4 pb-8 md:px-8">
      <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            The video-first hiring app for tech roles. Every candidate applies with a reel, every team hires with one.
          </p>
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
      </div>

      <div className="mt-14 flex flex-col justify-between gap-2 border-t pt-6 text-sm text-muted-foreground sm:flex-row">
        <p>© 2026 ReelHire. All rights reserved.</p>
        <p>Made for people who build.</p>
      </div>
    </footer>
  )
}
