import { ClerkProvider } from "@clerk/nextjs"
import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "ReelHire Admin",
  robots: { index: false, follow: false },
}

// The admin area is fully dynamic and session-gated, so it blocks on the server
// rather than prerendering a static shell. See Next.js "Authentication with
// Cache Components" — `instant = false` is the documented opt-out.
export const instant = false

// Clerk is scoped to /admin only — the marketing site stays Clerk-free.
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      signInUrl="/admin/sign-in"
      signInFallbackRedirectUrl="/admin"
      afterSignOutUrl="/admin/sign-in"
    >
      {children}
    </ClerkProvider>
  )
}
