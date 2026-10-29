import "server-only"

import { daysAgoIso } from "./format"
import { inList, sbCount, sbSelect } from "./supabase"

/* -------------------------------------------------------------------------- */
/* Shared types + helpers                                                     */
/* -------------------------------------------------------------------------- */

export type ProfileLite = {
  user_id: string
  full_name: string | null
  username: string | null
  avatar_url: string | null
}

const FETCH_CAP = 20_000 // early-stage volumes; dedupe/tally happen in JS

/** Resolve a set of user ids to their public profile fields, as a lookup map. */
async function profileMap(ids: Array<string | null | undefined>): Promise<Map<string, ProfileLite>> {
  const filter = inList(ids)
  if (!filter) return new Map()
  const rows = await sbSelect<ProfileLite>("profiles", {
    select: "user_id,full_name,username,avatar_url",
    user_id: filter,
  })
  return new Map(rows.map((r) => [r.user_id, r]))
}

function countByDay(rows: { created_at: string }[], days: number): number[] {
  const buckets = new Array<number>(days).fill(0)
  const start = Date.now() - (days - 1) * 86_400_000
  const startDay = new Date(start).setHours(0, 0, 0, 0)
  for (const row of rows) {
    const idx = Math.floor((new Date(row.created_at).setHours(0, 0, 0, 0) - startDay) / 86_400_000)
    if (idx >= 0 && idx < days) buckets[idx] += 1
  }
  return buckets
}

/** `YYYY-MM-DD` label for each of the last `days` days, oldest first. */
function dayLabels(days: number): string[] {
  return Array.from({ length: days }, (_, i) =>
    new Date(Date.now() - (days - 1 - i) * 86_400_000).toISOString().slice(0, 10),
  )
}

/* -------------------------------------------------------------------------- */
/* Overview KPIs                                                              */
/* -------------------------------------------------------------------------- */

export type Overview = Awaited<ReturnType<typeof getOverview>>

export async function getOverview() {
  const d7 = daysAgoIso(7)
  const d30 = daysAgoIso(30)

  const [
    users,
    users7d,
    users30d,
    seekers,
    recruiters,
    verifiedEmployers,
    jobs,
    jobsPublished,
    jobs7d,
    applications,
    applications7d,
    hired,
    reels,
    reelsPublished,
    reelsFailed,
    reels7d,
    messages,
    messages7d,
    reelViews,
    jobViews,
    openReports,
    reviewingReports,
    blocks,
  ] = await Promise.all([
    sbCount("profiles"),
    sbCount("profiles", { created_at: `gte.${d7}` }),
    sbCount("profiles", { created_at: `gte.${d30}` }),
    sbCount("seeker_profiles"),
    sbCount("employer_profiles"),
    sbCount("employer_profiles", { is_verified: "eq.true" }),
    sbCount("jobs"),
    sbCount("jobs", { status: "eq.published" }),
    sbCount("jobs", { created_at: `gte.${d7}` }),
    sbCount("applications"),
    sbCount("applications", { created_at: `gte.${d7}` }),
    sbCount("applications", { status: "eq.hired" }),
    sbCount("reels"),
    sbCount("reels", { status: "eq.published" }),
    sbCount("reels", { status: "eq.failed" }),
    sbCount("reels", { created_at: `gte.${d7}` }),
    sbCount("messages"),
    sbCount("messages", { created_at: `gte.${d7}` }),
    sbCount("reel_views"),
    sbCount("job_views"),
    sbCount("reports", { status: "eq.open" }),
    sbCount("reports", { status: "eq.reviewing" }),
    sbCount("user_blocks"),
  ])

  return {
    users,
    users7d,
    users30d,
    seekers,
    recruiters,
    verifiedEmployers,
    pendingEmployers: Math.max(recruiters - verifiedEmployers, 0),
    jobs,
    jobsPublished,
    jobs7d,
    applications,
    applications7d,
    hired,
    reels,
    reelsPublished,
    reelsFailed,
    reels7d,
    messages,
    messages7d,
    reelViews,
    jobViews,
    openReports,
    reviewingReports,
    pendingModeration: openReports + reviewingReports,
    blocks,
  }
}

/* -------------------------------------------------------------------------- */
/* Growth series                                                              */
/* -------------------------------------------------------------------------- */

export type ActivitySeries = Awaited<ReturnType<typeof getActivitySeries>>

export async function getActivitySeries(days = 30) {
  const since = daysAgoIso(days)
  const [signupRows, applicationRows] = await Promise.all([
    sbSelect<{ created_at: string }>(
      "profiles",
      { select: "created_at", created_at: `gte.${since}`, order: "created_at.asc" },
      { limit: FETCH_CAP },
    ),
    sbSelect<{ created_at: string }>(
      "applications",
      { select: "created_at", created_at: `gte.${since}`, order: "created_at.asc" },
      { limit: FETCH_CAP },
    ),
  ])
  return {
    days,
    labels: dayLabels(days),
    signups: countByDay(signupRows, days),
    applications: countByDay(applicationRows, days),
  }
}

/* -------------------------------------------------------------------------- */
/* Funnel                                                                     */
/* -------------------------------------------------------------------------- */

export type FunnelStep = { label: string; value: number }
export type Funnel = Awaited<ReturnType<typeof getFunnel>>

export async function getFunnel() {
  const [users, onboarded, seekers, recruiters, reelRows, appRows, pubJobRows, hired] =
    await Promise.all([
      sbCount("profiles"),
      sbCount("profiles", { onboarded_at: "not.is.null" }),
      sbCount("seeker_profiles"),
      sbCount("employer_profiles"),
      sbSelect<{ user_id: string }>(
        "reels",
        { select: "user_id", kind: "in.(pitch,project_demo)" },
        { limit: FETCH_CAP },
      ),
      sbSelect<{ seeker_id: string }>("applications", { select: "seeker_id" }, { limit: FETCH_CAP }),
      sbSelect<{ user_id: string }>(
        "jobs",
        { select: "user_id", status: "eq.published" },
        { limit: FETCH_CAP },
      ),
      sbCount("applications", { status: "eq.hired" }),
    ])

  const reelUploaders = new Set(reelRows.map((r) => r.user_id)).size
  const appliedSeekers = new Set(appRows.map((r) => r.seeker_id)).size
  const publishedJobPosters = new Set(pubJobRows.map((r) => r.user_id)).size

  return {
    overall: [
      { label: "Signed up", value: users },
      { label: "Onboarded", value: onboarded },
    ] satisfies FunnelStep[],
    seeker: [
      { label: "Seeker profile", value: seekers },
      { label: "Uploaded a reel", value: reelUploaders },
      { label: "Applied to a job", value: appliedSeekers },
    ] satisfies FunnelStep[],
    recruiter: [
      { label: "Recruiter profile", value: recruiters },
      { label: "Published a job", value: publishedJobPosters },
      { label: "Made a hire", value: hired },
    ] satisfies FunnelStep[],
  }
}

/* -------------------------------------------------------------------------- */
/* Moderation                                                                 */
/* -------------------------------------------------------------------------- */

type ReportRow = {
  id: string
  reporter_id: string | null
  reported_user_id: string | null
  job_id: string | null
  reel_id: string | null
  reason: string
  details: string | null
  status: string
  created_at: string
}

export type ReportView = {
  id: string
  reason: string
  details: string | null
  status: string
  created_at: string
  reporter: ProfileLite | null
  reportedUser: ProfileLite | null
  job: { id: string; title: string; status: string } | null
  reel: { id: string; kind: string; status: string } | null
}

export type ReportsSeries = Awaited<ReturnType<typeof getReportsSeries>>

/** New reports per day over the last `days` days — for the moderation trend chart. */
export async function getReportsSeries(days = 30) {
  const since = daysAgoIso(days)
  const rows = await sbSelect<{ created_at: string }>(
    "reports",
    { select: "created_at", created_at: `gte.${since}`, order: "created_at.asc" },
    { limit: FETCH_CAP },
  )
  return { days, labels: dayLabels(days), reports: countByDay(rows, days) }
}

export type Moderation = Awaited<ReturnType<typeof getModeration>>

export async function getModeration() {
  const [queueRows, resolvedRows, blocksTotal, allReportedRows] = await Promise.all([
    sbSelect<ReportRow>(
      "reports",
      { select: "*", status: "in.(open,reviewing)", order: "created_at.asc" },
      { limit: 100 },
    ),
    sbSelect<ReportRow>(
      "reports",
      { select: "*", status: "in.(actioned,dismissed)", order: "created_at.desc" },
      { limit: 20 },
    ),
    sbCount("user_blocks"),
    sbSelect<{ reported_user_id: string | null }>(
      "reports",
      { select: "reported_user_id" },
      { limit: FETCH_CAP },
    ),
  ])

  const rows = [...queueRows, ...resolvedRows]
  const [profiles, jobs, reels] = await Promise.all([
    profileMap(rows.flatMap((r) => [r.reporter_id, r.reported_user_id])),
    (async () => {
      const filter = inList(rows.map((r) => r.job_id))
      if (!filter) return new Map<string, { id: string; title: string; status: string }>()
      const data = await sbSelect<{ id: string; title: string; status: string }>("jobs", {
        select: "id,title,status",
        id: filter,
      })
      return new Map(data.map((j) => [j.id, j]))
    })(),
    (async () => {
      const filter = inList(rows.map((r) => r.reel_id))
      if (!filter) return new Map<string, { id: string; kind: string; status: string }>()
      const data = await sbSelect<{ id: string; kind: string; status: string }>("reels", {
        select: "id,kind,status",
        id: filter,
      })
      return new Map(data.map((r) => [r.id, r]))
    })(),
  ])

  const toView = (r: ReportRow): ReportView => ({
    id: r.id,
    reason: r.reason,
    details: r.details,
    status: r.status,
    created_at: r.created_at,
    reporter: r.reporter_id ? (profiles.get(r.reporter_id) ?? null) : null,
    reportedUser: r.reported_user_id ? (profiles.get(r.reported_user_id) ?? null) : null,
    job: r.job_id ? (jobs.get(r.job_id) ?? null) : null,
    reel: r.reel_id ? (reels.get(r.reel_id) ?? null) : null,
  })

  // Most-reported users — a founder signal the queue alone doesn't surface.
  const tally = new Map<string, number>()
  for (const r of allReportedRows) {
    if (r.reported_user_id) tally.set(r.reported_user_id, (tally.get(r.reported_user_id) ?? 0) + 1)
  }
  const topIds = [...tally.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5)
  const topProfiles = await profileMap(topIds.map(([id]) => id))
  const topReported = topIds.map(([id, count]) => ({ user: topProfiles.get(id) ?? null, id, count }))

  return {
    queue: queueRows.map(toView),
    resolved: resolvedRows.map(toView),
    blocksTotal,
    topReported,
  }
}

/* -------------------------------------------------------------------------- */
/* People & content browsers                                                  */
/* -------------------------------------------------------------------------- */

export type NewUser = {
  user_id: string
  full_name: string | null
  username: string | null
  avatar_url: string | null
  headline: string | null
  country_code: string | null
  onboarded_at: string | null
  active_role: string | null
  created_at: string
  isSeeker: boolean
  isRecruiter: boolean
}

export type EmployerRow = {
  user_id: string
  company_name: string
  company_size: string | null
  work_email: string | null
  contact_role: string | null
  is_verified: boolean
  created_at: string
  name: string | null
}

export type JobRow = {
  id: string
  title: string
  status: string
  application_count: number
  view_count: number
  created_at: string
  poster: string | null
}

export type ReelRow = {
  id: string
  kind: string
  status: string
  view_count: number
  duration_seconds: number | null
  created_at: string
  owner: string | null
}

export type People = Awaited<ReturnType<typeof getPeople>>

export async function getPeople() {
  const [users, employers, jobs, reels] = await Promise.all([
    sbSelect<Omit<NewUser, "isSeeker" | "isRecruiter">>(
      "profiles",
      {
        select:
          "user_id,full_name,username,avatar_url,headline,country_code,onboarded_at,active_role,created_at",
        order: "created_at.desc",
      },
      { limit: 25 },
    ),
    sbSelect<Omit<EmployerRow, "name">>(
      "employer_profiles",
      {
        select: "user_id,company_name,company_size,work_email,contact_role,is_verified,created_at",
        order: "created_at.desc",
      },
      { limit: 50 },
    ),
    sbSelect<Omit<JobRow, "poster"> & { user_id: string }>(
      "jobs",
      {
        select: "id,title,status,user_id,application_count,view_count,created_at",
        order: "created_at.desc",
      },
      { limit: 25 },
    ),
    sbSelect<Omit<ReelRow, "owner"> & { user_id: string }>(
      "reels",
      {
        select: "id,kind,status,user_id,view_count,duration_seconds,created_at",
        order: "created_at.desc",
      },
      { limit: 25 },
    ),
  ])

  // Which of the newest users have a seeker / employer profile (for side badges).
  const userIds = users.map((u) => u.user_id)
  const [seekerIdRows, employerIdRows, posterNames] = await Promise.all([
    (async () => {
      const filter = inList(userIds)
      return filter
        ? sbSelect<{ user_id: string }>("seeker_profiles", { select: "user_id", user_id: filter })
        : []
    })(),
    (async () => {
      const filter = inList(userIds)
      return filter
        ? sbSelect<{ user_id: string }>("employer_profiles", { select: "user_id", user_id: filter })
        : []
    })(),
    profileMap([
      ...employers.map((e) => e.user_id),
      ...jobs.map((j) => j.user_id),
      ...reels.map((r) => r.user_id),
    ]),
  ])

  const seekerSet = new Set(seekerIdRows.map((r) => r.user_id))
  const employerSet = new Set(employerIdRows.map((r) => r.user_id))

  return {
    newUsers: users.map<NewUser>((u) => ({
      ...u,
      isSeeker: seekerSet.has(u.user_id),
      isRecruiter: employerSet.has(u.user_id),
    })),
    employers: employers.map<EmployerRow>((e) => ({
      ...e,
      name: posterNames.get(e.user_id)?.full_name ?? null,
    })),
    recentJobs: jobs.map<JobRow>((j) => ({
      id: j.id,
      title: j.title,
      status: j.status,
      application_count: j.application_count,
      view_count: j.view_count,
      created_at: j.created_at,
      poster: posterNames.get(j.user_id)?.full_name ?? posterNames.get(j.user_id)?.username ?? null,
    })),
    recentReels: reels.map<ReelRow>((r) => ({
      id: r.id,
      kind: r.kind,
      status: r.status,
      view_count: r.view_count,
      duration_seconds: r.duration_seconds,
      created_at: r.created_at,
      owner: posterNames.get(r.user_id)?.full_name ?? posterNames.get(r.user_id)?.username ?? null,
    })),
  }
}
