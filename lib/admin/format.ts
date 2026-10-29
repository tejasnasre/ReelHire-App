/** Pure, client-safe formatting + label maps shared by the admin UI. */

export function compactNumber(n: number): string {
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n)
}

export function fullNumber(n: number): string {
  return new Intl.NumberFormat("en").format(n)
}

export function shortDate(iso: string | null): string {
  if (!iso) return "—"
  return new Date(iso).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })
}

export function relativeTime(iso: string | null): string {
  if (!iso) return "—"
  const then = new Date(iso).getTime()
  const diffMs = Date.now() - then
  const mins = Math.round(diffMs / 60000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m ago`
  const hours = Math.round(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.round(hours / 24)
  if (days < 30) return `${days}d ago`
  return shortDate(iso)
}

/** ISO timestamp N days before now — for `created_at=gte.<iso>` windows. */
export function daysAgoIso(days: number): string {
  return new Date(Date.now() - days * 86_400_000).toISOString()
}

export function initials(name: string | null, fallback = "?"): string {
  if (!name) return fallback
  const parts = name.trim().split(/\s+/)
  return (parts[0]?.[0] ?? "") + (parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "")
}

export const REPORT_REASON_LABEL: Record<string, string> = {
  spam: "Spam",
  scam: "Scam",
  inappropriate: "Inappropriate",
  harassment: "Harassment",
  misleading: "Misleading",
  discrimination: "Discrimination",
  other: "Other",
}

export const REPORT_STATUS_LABEL: Record<string, string> = {
  open: "Open",
  reviewing: "Reviewing",
  actioned: "Actioned",
  dismissed: "Dismissed",
}

export const APPLICATION_STATUS_LABEL: Record<string, string> = {
  new: "New",
  shortlisted: "Shortlisted",
  interview: "Interview",
  rejected: "Rejected",
  hired: "Hired",
}

export const JOB_STATUS_LABEL: Record<string, string> = {
  draft: "Draft",
  published: "Published",
  closed: "Closed",
  archived: "Archived",
}

export const REEL_KIND_LABEL: Record<string, string> = {
  pitch: "Pitch",
  project_demo: "Project demo",
  job_description: "Job reel",
}

export const COMPANY_SIZE_LABEL: Record<string, string> = {
  solo: "Solo",
  "2_10": "2–10",
  "11_50": "11–50",
  "51_200": "51–200",
  "201_500": "201–500",
  "500_plus": "500+",
}
