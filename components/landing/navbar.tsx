import { LineHoverLink } from "@/components/ui/line-hover-link"
import { LANDING_PLAY_URL } from "@/lib/app-links"
import { cn } from "@/lib/utils"

import { NAV_LINKS } from "./data"
import { GooglePlayIcon } from "./google-play-icon"
import { MobileMenu } from "./mobile-menu"
import { BlackButton, Logo } from "./primitives"

export function Navbar() {
  return (
    <header className="sticky top-3 z-50 px-3 pt-3 md:px-6">
      <nav
        className={cn(
          "relative mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full pr-2 pl-5",
          // Liquid glass: a thin, saturated, heavily blurred layer over the page
          "bg-card/70 backdrop-blur-2xl backdrop-saturate-[1.8]",
          "shadow-[0_10px_30px_-12px_rgb(0_0_0/0.25),0_2px_6px_-2px_rgb(0_0_0/0.08)]",
          "dark:bg-card/30",
        )}
      >
        {/* Sheen across the upper half, like light catching curved glass */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-linear-to-b from-white/55 via-white/10 to-transparent dark:from-white/10"
        />

        <Logo className="relative" />
        <ul className="relative hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <LineHoverLink
                variant="scribble"
                href={link.href}
                className="text-sm text-foreground/75 transition-colors hover:text-foreground"
              >
                {link.label}
              </LineHoverLink>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1">
          <BlackButton href={LANDING_PLAY_URL} aria-label="Get the app on Google Play" className="relative h-10 px-4">
            <GooglePlayIcon className="mr-2" />
            Get the app
          </BlackButton>
          <MobileMenu />
        </div>
      </nav>
    </header>
  )
}
