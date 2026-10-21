"use client"

import React, { memo, useMemo } from "react"
import { cn } from "@/lib/utils"

export type Logo = {
  src: string
  alt: string
  width?: number
  height?: number
}

const LogoImage = memo(function LogoImage({ logo }: { logo: Logo }) {
  return (
    // Logos are sized by height with intrinsic width, which next/image can't express.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={logo.alt}
      src={logo.src}
      width={logo.width}
      height={logo.height}
      loading="lazy"
      className="pointer-events-none h-4 select-none md:h-5 dark:brightness-0 dark:invert"
    />
  )
})

type LogoCardProps = React.ComponentProps<"div"> & { logo: Logo }

const LogoCard = memo(function LogoCard({
  logo,
  className,
  children,
  ...props
}: LogoCardProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center bg-background px-4 py-8 md:p-8",
        className
      )}
      {...props}
    >
      <LogoImage logo={logo} />
      {children}
    </div>
  )
})

export const LogoGrid = memo(function LogoGrid({
  logos,
  className,
}: {
  logos: Logo[]
  className?: string
}) {
  const gridLogos = useMemo(() => logos.slice(0, 8), [logos])

  return (
    <div
      className={cn(
        "relative grid grid-cols-2 border-x md:grid-cols-4",
        className
      )}
    >
      <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t" />

      {gridLogos.map((logo, i) => {
        const isHighlighted = i === 0 || i === 2 || i === 5 || i === 7

        return (
          <LogoCard
            key={logo.alt}
            logo={logo}
            className={cn(
              i < 4 && "border-b",
              (i === 4 || i === 5) && "border-b md:border-b-0",
              (i === 0 || i === 2 || i === 4 || i === 6) && "border-r",
              (i === 1 || i === 5) && "md:border-r",
              isHighlighted
                ? "bg-secondary dark:bg-secondary/30"
                : "bg-background"
            )}
          />
        )
      })}

      <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b" />
    </div>
  )
})

LogoGrid.displayName = "LogoGrid"