"use client"

import { Children, useState } from "react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const COLLAPSED_COUNT = 6

// Masonry wall that shows the first few cards until expanded. Cards come in
// as children so tweet cards can be fetched on the server. It limits by count,
// not height: a height-capped multi-column box spills extra cards into hidden
// columns on the right instead of clipping the bottom row.
export function ReviewWall({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false)
  const cards = Children.toArray(children)
  const hasMore = cards.length > COLLAPSED_COUNT
  const visible = expanded ? cards : cards.slice(0, COLLAPSED_COUNT)

  return (
    <div className="relative mx-auto mt-20 max-w-6xl px-4 md:px-8">
      <div className="relative">
        <div className="columns-1 gap-4 md:columns-2 lg:columns-3">{visible}</div>
        {hasMore && !expanded ? (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-card to-transparent"
          />
        ) : null}
      </div>
      {hasMore ? (
        <div className={cn("relative flex justify-center", expanded ? "mt-6" : "-mt-6")}>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 bg-background px-5 shadow-sm")}
          >
            {expanded ? "Show fewer reviews" : "Show more reviews"}
          </button>
        </div>
      ) : null}
    </div>
  )
}
