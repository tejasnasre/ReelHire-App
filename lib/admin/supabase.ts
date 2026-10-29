import "server-only"

/**
 * Service-role PostgREST access for the admin area. Mirrors the existing anon
 * `fetch` pattern in `lib/job-preview.ts`, but with the service-role key, which
 * bypasses RLS — so this must only ever be reached from inside `requireAdmin()`.
 * The key is server-only (no `NEXT_PUBLIC_`), so it never leaves the server.
 */

type QueryValue = string | number | undefined

function config() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set")
  return { url, key }
}

function toParams(query: Record<string, QueryValue>): URLSearchParams {
  const params = new URLSearchParams()
  for (const [k, v] of Object.entries(query)) if (v !== undefined) params.set(k, String(v))
  return params
}

function baseHeaders(key: string): Record<string, string> {
  return { apikey: key, Authorization: `Bearer ${key}` }
}

/** Fetch rows. `cache: no-store` keeps the admin always live (and dynamic under cacheComponents). */
export async function sbSelect<T>(
  table: string,
  query: Record<string, QueryValue> = {},
  opts: { limit?: number } = {},
): Promise<T[]> {
  const { url, key } = config()
  const headers = baseHeaders(key)
  if (opts.limit) headers.Range = `0-${opts.limit - 1}`
  const res = await fetch(`${url}/rest/v1/${table}?${toParams(query)}`, {
    headers,
    cache: "no-store",
  })
  if (!res.ok) throw new Error(`select ${table} ${res.status}: ${await res.text()}`)
  return res.json() as Promise<T[]>
}

/** Exact row count via PostgREST's `Content-Range` header, without pulling the rows. */
export async function sbCount(
  table: string,
  query: Record<string, QueryValue> = {},
): Promise<number> {
  const { url, key } = config()
  const res = await fetch(`${url}/rest/v1/${table}?${toParams(query)}`, {
    headers: { ...baseHeaders(key), Prefer: "count=exact", Range: "0-0" },
    cache: "no-store",
  })
  // 206 Partial Content is expected for a ranged request; 200 is fine too.
  if (!res.ok && res.status !== 206) throw new Error(`count ${table} ${res.status}`)
  const total = res.headers.get("content-range")?.split("/")[1]
  return total && total !== "*" ? Number(total) : 0
}

/** Update rows matching `query`. Returns nothing (`return=minimal`). */
export async function sbPatch(
  table: string,
  query: Record<string, QueryValue>,
  body: Record<string, unknown>,
): Promise<void> {
  const { url, key } = config()
  const res = await fetch(`${url}/rest/v1/${table}?${toParams(query)}`, {
    method: "PATCH",
    headers: { ...baseHeaders(key), "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify(body),
    cache: "no-store",
  })
  if (!res.ok) throw new Error(`patch ${table} ${res.status}: ${await res.text()}`)
}

/** PostgREST `in.(a,b,c)` filter value, safely quoted. Empty list yields a never-match. */
export function inList(values: Array<string | null | undefined>): string | undefined {
  const unique = [...new Set(values.filter((v): v is string => !!v))]
  if (unique.length === 0) return undefined
  return `in.(${unique.map((v) => `"${v.replace(/"/g, '""')}"`).join(",")})`
}
