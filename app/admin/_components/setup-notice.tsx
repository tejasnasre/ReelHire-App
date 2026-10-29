/** Shown when required admin env vars are missing, so the area degrades to a checklist instead of a crash. */
export function SetupNotice({ missing }: { missing: string[] }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col justify-center gap-4 px-4 text-foreground">
      <div className="rounded-xl border border-border bg-card p-6">
        <h1 className="text-base font-semibold">Admin setup incomplete</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Set these environment variables (server-only — never prefixed <code>NEXT_PUBLIC_</code>)
          and redeploy. See <code>.env.example</code>.
        </p>
        <ul className="mt-4 space-y-1.5">
          {missing.map((key) => (
            <li key={key} className="flex items-center gap-2 text-sm">
              <span className="inline-block size-1.5 rounded-full bg-destructive" />
              <code className="font-mono text-xs">{key}</code>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
