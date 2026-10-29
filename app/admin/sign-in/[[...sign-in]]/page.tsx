import { Suspense } from "react"
import { SignIn } from "@clerk/nextjs"

export const instant = false

export default function AdminSignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Suspense fallback={<SignInFallback />}>
        <SignIn routing="path" path="/admin/sign-in" fallbackRedirectUrl="/admin" />
      </Suspense>
    </div>
  )
}

// Clerk's <SignIn /> reads client-only state (URL, session), so it bails out to
// browser rendering during prerendering. With cacheComponents enabled, that bailout
// must be contained by a <Suspense> boundary or the production build fails. The
// fallback reserves space for the widget in the prerendered static shell.
function SignInFallback() {
  return <div className="h-[30rem] w-full max-w-[25rem] animate-pulse rounded-xl bg-muted" />
}
