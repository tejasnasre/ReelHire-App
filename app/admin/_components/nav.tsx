"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserButton } from "@clerk/nextjs"
import { LayoutDashboard, Menu, ShieldCheck, Users, X } from "lucide-react"

import { cn } from "@/lib/utils"

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/moderation", label: "Moderation", icon: ShieldCheck, badge: "moderation" as const },
  { href: "/admin/people", label: "People & content", icon: Users },
]

function NavList({
  pendingModeration,
  onNavigate,
}: {
  pendingModeration?: number
  onNavigate?: () => void
}) {
  const pathname = usePathname()
  return (
    <nav className="flex flex-col gap-1">
      {LINKS.map((link) => {
        const Icon = link.icon
        const active = pathname === link.href
        const badge = link.badge === "moderation" ? pendingModeration : undefined
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            )}
          >
            <Icon className="size-4 shrink-0" aria-hidden />
            <span className="flex-1 truncate">{link.label}</span>
            {badge ? (
              <span
                className={cn(
                  "ml-auto rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums",
                  active
                    ? "bg-sidebar-primary-foreground/20 text-sidebar-primary-foreground"
                    : "bg-destructive/15 text-destructive",
                )}
              >
                {badge}
              </span>
            ) : null}
          </Link>
        )
      })}
    </nav>
  )
}

function Brand() {
  return (
    <Link href="/admin" className="flex items-center gap-2">
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-sidebar-primary text-sm font-bold text-sidebar-primary-foreground">
        R
      </span>
      <span className="text-sm font-semibold">
        ReelHire <span className="font-normal text-muted-foreground">admin</span>
      </span>
    </Link>
  )
}

function AccountRow() {
  return (
    <div className="flex items-center gap-3 rounded-lg px-1 py-1">
      <UserButton />
      <span className="text-xs text-muted-foreground">Your account</span>
    </div>
  )
}

/**
 * The admin navigation: a fixed sidebar on desktop, and a sticky top bar with a
 * slide-over drawer on mobile. Rendered by {@link AdminChrome}; the content
 * column is offset with `lg:pl-64` to sit beside the fixed sidebar.
 */
export function AdminSidebar({
  title,
  pendingModeration,
}: {
  title?: string
  pendingModeration?: number
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex">
        <div className="flex h-16 items-center border-b border-sidebar-border px-5">
          <Brand />
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <NavList pendingModeration={pendingModeration} />
        </div>
        <div className="border-t border-sidebar-border p-3">
          <AccountRow />
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="-ml-1 grid size-9 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Menu className="size-5" aria-hidden />
        </button>
        <span className="truncate text-sm font-semibold">{title ?? "ReelHire admin"}</span>
        <div className="ml-auto">
          <UserButton />
        </div>
      </div>

      {/* Mobile drawer */}
      {open ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-foreground/40"
          />
          <aside className="absolute inset-y-0 left-0 flex w-64 flex-col bg-sidebar text-sidebar-foreground shadow-xl">
            <div className="flex h-14 items-center justify-between border-b border-sidebar-border px-4">
              <Brand />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              <NavList pendingModeration={pendingModeration} onNavigate={() => setOpen(false)} />
            </div>
            <div className="border-t border-sidebar-border p-3">
              <AccountRow />
            </div>
          </aside>
        </div>
      ) : null}
    </>
  )
}
