import "server-only"

import { redirect } from "next/navigation"
import { auth, clerkClient } from "@clerk/nextjs/server"

/**
 * Admin authorization via Clerk. Authentication (is this a signed-in Clerk
 * user?) is Clerk's; authorization (is this user an admin?) is a `role: "admin"`
 * value in the user's Clerk **public metadata**, set from the Clerk dashboard —
 * so granting/revoking an admin is a dashboard toggle, no deploy.
 *
 * This gates the page only. The dashboard still reads/writes through the
 * service-role key (see `supabase.ts`), because RLS gives no admin bypass to a
 * normal authenticated user. The Clerk role decides who reaches that server
 * code; it does not itself grant database access.
 */
type AdminState = { userId: string | null; isAdmin: boolean }

function roleFromClaims(sessionClaims: unknown): string | undefined {
  const claims = sessionClaims as { metadata?: { role?: string }; publicMetadata?: { role?: string } } | null
  return claims?.metadata?.role ?? claims?.publicMetadata?.role
}

async function getAdminState(): Promise<AdminState> {
  const { userId, sessionClaims } = await auth()
  if (!userId) return { userId: null, isAdmin: false }

  // Fast path: the role is in the session token (if the Clerk session token was
  // customized to expose public metadata). Otherwise read it directly — works
  // with no session-token customization, at the cost of one Clerk API call.
  const claimRole = roleFromClaims(sessionClaims)
  if (claimRole) return { userId, isAdmin: claimRole === "admin" }

  try {
    const user = await (await clerkClient()).users.getUser(userId)
    const role = (user.publicMetadata as { role?: string } | null)?.role
    return { userId, isAdmin: role === "admin" }
  } catch {
    return { userId, isAdmin: false }
  }
}

/**
 * Gate for every protected page and server action. Not signed in → Clerk
 * sign-in; signed in but not an admin → the denied page.
 */
export async function requireAdmin(): Promise<void> {
  const { userId, isAdmin } = await getAdminState()
  if (!userId) redirect("/admin/sign-in")
  if (!isAdmin) redirect("/admin/denied")
}

export { getAdminState }
