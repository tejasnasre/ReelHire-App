import { UserButton } from "@clerk/nextjs"

export const instant = false

/** Shown to a signed-in Clerk user who does not have the admin role. */
export default function AdminDeniedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-6 text-center">
        <h1 className="text-base font-semibold">Not authorized</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          You&rsquo;re signed in, but this account doesn&rsquo;t have admin access. Ask an admin to
          set <code className="font-mono text-xs">{`{ "role": "admin" }`}</code> on your Clerk
          public metadata, or switch to an account that has it.
        </p>
        <div className="mt-5 flex justify-center">
          <UserButton />
        </div>
      </div>
    </div>
  )
}
