import { PlayIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { ThreeDButton } from "@/components/grootstudio/3d-button"
import TextAnimation from "@/components/ui/staggerText"
import { LANDING_PLAY_URL } from "@/lib/app-links"
import { cn } from "@/lib/utils"

import { GooglePlayIcon } from "./google-play-icon"

export function Logo({ className, href = "#top" }: { className?: string; href?: string }) {
  return (
    <a href={href} className={cn("inline-flex items-center gap-2", className)} aria-label="ReelHire home">
      <span className="relative grid size-7 place-items-center rounded-md bg-foreground text-background">
        <HugeiconsIcon icon={PlayIcon} size={14} strokeWidth={2.5} className="translate-x-px" />
        <span className="absolute -right-0.5 -bottom-0.5 size-2 rounded-[2px] border-2 border-card bg-foreground" />
      </span>
      <span className="text-lg font-semibold tracking-tight">ReelHire</span>
    </a>
  )
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border bg-background px-3 py-1 text-xs font-medium text-foreground shadow-xs",
        className,
      )}
    >
      {children}
    </span>
  )
}

/** Large headline whose trailing phrase is set in the muted tone. */
export function SectionTitle({
  lead,
  tail,
  as: Tag = "h2",
  className,
}: {
  lead: React.ReactNode
  tail?: React.ReactNode
  as?: "h1" | "h2" | "h3"
  className?: string
}) {
  return (
    <Tag className={cn("text-4xl font-medium tracking-tight text-balance md:text-5xl", className)}>
      {typeof lead === "string" ? <TextAnimation>{lead}</TextAnimation> : lead}
      {tail ? (
        <span className="text-muted-foreground">
          {typeof tail === "string" ? <TextAnimation delay={0.15}>{tail}</TextAnimation> : tail}
        </span>
      ) : null}
    </Tag>
  )
}

/** Primary call to action: the 3D button in a black, grayscale-only shade. */
export function BlackButton({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ThreeDButton>, "color1" | "color2">) {
  return (
    <ThreeDButton
      {...props}
      color1="oklch(0.42 0 0)"
      color2="oklch(0.16 0 0)"
      className={cn("h-11 rounded-full px-5 [&_svg]:size-4", className)}
    />
  )
}

/** The app is Android-only for now: a Google Play badge on the black 3D button. */
export function PlayStoreButton({ className, href = LANDING_PLAY_URL }: { className?: string; href?: string }) {
  return (
    <div className={cn("flex justify-center", className)}>
      <BlackButton href={href} aria-label="Get it on Google Play" className="h-12 pr-6 pl-5">
        <GooglePlayIcon className="mr-2.5 size-5!" />
        <span className="flex flex-col items-start leading-none">
          <span className="text-[9px] font-medium tracking-[0.14em] uppercase opacity-75">Get it on</span>
          <span className="mt-1 text-base font-semibold tracking-tight">Google Play</span>
        </span>
      </BlackButton>
    </div>
  )
}

export function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .replace(/[^A-Z]/gi, "")
    .slice(0, 2)
    .toUpperCase()
}

/** Square-cornered monogram, matching the app's square avatars. */
export function Monogram({ name, className }: { name: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-md bg-secondary text-xs font-semibold text-secondary-foreground",
        className,
      )}
    >
      {initials(name)}
    </span>
  )
}

/** Faint dot grid drawn with the border token, faded out at the edges. */
export function DotGrid({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]",
        className,
      )}
    />
  )
}
