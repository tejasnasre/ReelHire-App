import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

/**
 * Next.js 16 Proxy (formerly Middleware). Scoped by the matcher to `/admin` only,
 * so the marketing site never loads Clerk. This is the optimistic gate — it just
 * requires a signed-in Clerk user; the admin **role** is enforced authoritatively
 * in `requireAdmin()` on each page/action (Next.js: Proxy is not the auth boundary).
 */
const isProtectedAdminRoute = createRouteMatcher(["/admin(.*)"])
const isSignInRoute = createRouteMatcher(["/admin/sign-in(.*)"])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedAdminRoute(req) && !isSignInRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: ["/admin/:path*"],
}
