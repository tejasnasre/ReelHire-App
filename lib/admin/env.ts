import "server-only"

/**
 * The Supabase data secrets the dashboard needs. Both server-only (never
 * `NEXT_PUBLIC_`) — the service-role key bypasses RLS and must never reach the
 * browser. Clerk keys are validated by Clerk itself, so they're not listed
 * here; see `.env.example`.
 */
export const ADMIN_ENV_KEYS = ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"] as const

/** Which required data env vars are unset — pages show a setup checklist instead of crashing. */
export function missingAdminEnv(): string[] {
  return ADMIN_ENV_KEYS.filter((key) => !process.env[key])
}
