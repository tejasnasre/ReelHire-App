"use client"

import { Cancel01Icon, Menu01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useEffect, useState } from "react"

import { NAV_LINKS } from "./data"

/** Below md the nav links collapse into this dropdown under the pill. */
export function MobileMenu() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="relative grid size-10 place-items-center rounded-full text-foreground transition-colors hover:bg-secondary"
      >
        <HugeiconsIcon icon={open ? Cancel01Icon : Menu01Icon} size={20} />
      </button>

      {open ? (
        <ul
          id="mobile-menu"
          className="absolute inset-x-0 top-full mt-2 rounded-3xl border bg-card p-2 shadow-[0_10px_30px_-12px_rgb(0_0_0/0.25)]"
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-base font-medium transition-colors hover:bg-secondary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
