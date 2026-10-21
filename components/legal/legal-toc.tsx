"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

type TocItem = { id: string; heading: string }

/**
 * Sticky "On this page" list that marks the section being read. The band
 * between 15% and 35% of the viewport counts as "reading", so the mark moves
 * when a heading reaches the upper part of the screen rather than its edge.
 */
export function LegalToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id)

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) setActive(visible[0].target.id)
      },
      { rootMargin: "-15% 0px -65% 0px" },
    )
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items])

  return (
    <ol className="space-y-0.5 border-l text-sm">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            aria-current={active === item.id ? "location" : undefined}
            className={cn(
              "-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-muted-foreground transition-colors hover:text-foreground",
              active === item.id && "border-foreground font-medium text-foreground",
            )}
          >
            {item.heading}
          </a>
        </li>
      ))}
    </ol>
  )
}
