import { SignIn } from "@clerk/nextjs"

export const instant = false

export default function AdminSignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <SignIn routing="path" path="/admin/sign-in" fallbackRedirectUrl="/admin" />
    </div>
  )
}
