"use client"

import { useState } from "react"

import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"

// Not wired to a mailing list yet: it only confirms locally.
export function NewsletterForm() {
  const [done, setDone] = useState(false)

  if (done) {
    return (
      <p role="status" className="mt-5 rounded-full border bg-background px-4 py-2.5 text-sm">
        Thanks! You&apos;re on the list.
      </p>
    )
  }

  return (
    <form
      className="mt-5 flex items-center rounded-full border bg-background p-1 focus-within:ring-[3px] focus-within:ring-ring/50"
      onSubmit={(e) => {
        e.preventDefault()
        setDone(true)
      }}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="you@company.com"
        className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground"
      />
      <InteractiveHoverButton type="submit" className="shrink-0 px-5 py-1.5 text-sm">
        Subscribe
      </InteractiveHoverButton>
    </form>
  )
}
