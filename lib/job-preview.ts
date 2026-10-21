import { cacheLife } from "next/cache"

import { JOB_ID_PATTERN } from "@/lib/app-links"

export type JobPreview = {
  title: string
  companyName: string | null
  location: string | null
  workMode: string | null
}

const WORK_MODES: Record<string, string> = { onsite: "On-site", hybrid: "Hybrid", remote: "Remote" }

/**
 * The few public fields of a published job, for the `/opening/<id>` page and
 * its link preview. Comes from the app's `job_link_preview()` database
 * function (migration 0022 in the app repo) — jobs themselves are only
 * readable signed in, and this site has just the anon key.
 *
 * `null` for an unknown, unpublished or malformed id, missing config, or a
 * failed request; the page then falls back to its generic copy.
 */
export async function getJobPreview(id: string): Promise<JobPreview | null> {
  if (!JOB_ID_PATTERN.test(id)) return null
  try {
    return await fetchJobPreview(id)
  } catch {
    // Outside the cache on purpose: a failed request throws out of
    // `fetchJobPreview` uncached, so the next visit retries.
    return null
  }
}

async function fetchJobPreview(id: string): Promise<JobPreview | null> {
  "use cache"
  // Titles rarely change once posted; a closed job dropping off within the
  // hour is fine for a preview.
  cacheLife("hours")

  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_ANON_KEY
  if (!url || !key) return null

  const res = await fetch(`${url}/rest/v1/rpc/job_link_preview`, {
    method: "POST",
    headers: { apikey: key, "Content-Type": "application/json" },
    body: JSON.stringify({ p_job_id: id }),
  })
  if (!res.ok) throw new Error(`job_link_preview ${res.status}`)

  const [row] = (await res.json()) as {
    title: string
    company_name: string | null
    location: string | null
    work_mode: string | null
  }[]
  if (!row) return null
  return {
    title: row.title,
    companyName: row.company_name,
    location: row.location,
    workMode: row.work_mode ? (WORK_MODES[row.work_mode] ?? null) : null,
  }
}
