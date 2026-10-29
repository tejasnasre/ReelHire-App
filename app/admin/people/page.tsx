import { connection } from "next/server"

import { requireAdmin } from "@/lib/admin/auth"
import { missingAdminEnv } from "@/lib/admin/env"
import {
  COMPANY_SIZE_LABEL,
  JOB_STATUS_LABEL,
  REEL_KIND_LABEL,
  fullNumber,
  relativeTime,
} from "@/lib/admin/format"
import { getOverview, getPeople } from "@/lib/admin/queries"

import { AdminChrome } from "../_components/chrome"
import { Avatar, Badge, EmptyState, Panel } from "../_components/kit"
import { SetupNotice } from "../_components/setup-notice"
import { VerifyToggle } from "../_components/verify-toggle"

export const instant = false

const JOB_STATUS_TONE: Record<string, string> = {
  published: "green",
  draft: "neutral",
  closed: "amber",
  archived: "neutral",
}

const REEL_STATUS_TONE: Record<string, string> = {
  published: "green",
  processing: "blue",
  draft: "neutral",
  failed: "red",
  archived: "neutral",
}

function Th({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  return (
    <th className={`px-4 py-2 text-left text-xs font-medium text-muted-foreground ${className}`}>
      {children}
    </th>
  )
}

function Td({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 align-middle ${className}`}>{children}</td>
}

export default async function AdminPeoplePage() {
  await connection() // dynamic: session check + relative timestamps are request-time
  await requireAdmin()

  const missingData = missingAdminEnv().filter(
    (k) => k === "SUPABASE_URL" || k === "SUPABASE_SERVICE_ROLE_KEY",
  )
  if (missingData.length > 0) return <SetupNotice missing={missingData} />

  const [people, overview] = await Promise.all([getPeople(), getOverview()])

  return (
    <AdminChrome
      title="People & content"
      description="Newest users, employers, jobs, and reels"
      pendingModeration={overview.pendingModeration}
    >

      <Panel title="Newest users" description="Most recent 25 signups">
        <div className="overflow-x-auto">
          <table className="w-full min-w-150 text-sm">
            <thead className="border-b border-border">
              <tr>
                <Th>User</Th>
                <Th>Side</Th>
                <Th>Country</Th>
                <Th>Onboarded</Th>
                <Th className="text-right">Joined</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {people.newUsers.map((u) => (
                <tr key={u.user_id}>
                  <Td>
                    <div className="flex items-center gap-2">
                      <Avatar name={u.full_name} size={30} />
                      <div className="min-w-0">
                        <p className="truncate font-medium">{u.full_name ?? "—"}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {u.username ? `@${u.username}` : (u.headline ?? "")}
                        </p>
                      </div>
                    </div>
                  </Td>
                  <Td>
                    <div className="flex gap-1">
                      {u.isSeeker && <Badge tone="blue">Seeker</Badge>}
                      {u.isRecruiter && <Badge tone="green">Recruiter</Badge>}
                      {!u.isSeeker && !u.isRecruiter && <Badge>—</Badge>}
                    </div>
                  </Td>
                  <Td className="text-muted-foreground">{u.country_code ?? "—"}</Td>
                  <Td>{u.onboarded_at ? <Badge tone="green">Yes</Badge> : <Badge tone="amber">No</Badge>}</Td>
                  <Td className="text-right text-muted-foreground">{relativeTime(u.created_at)}</Td>
                </tr>
              ))}
            </tbody>
          </table>
          {people.newUsers.length === 0 && <EmptyState>No users yet.</EmptyState>}
        </div>
      </Panel>

      <div className="mt-6">
        <Panel title="Employers" description="Verify a company to grant its badge in-app">
          <div className="overflow-x-auto">
            <table className="w-full min-w-150 text-sm">
              <thead className="border-b border-border">
                <tr>
                  <Th>Company</Th>
                  <Th>Contact</Th>
                  <Th>Size</Th>
                  <Th>Status</Th>
                  <Th className="text-right">Action</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {people.employers.map((e) => (
                  <tr key={e.user_id}>
                    <Td>
                      <p className="font-medium">{e.company_name}</p>
                      <p className="text-xs text-muted-foreground">{e.name ?? "—"}</p>
                    </Td>
                    <Td className="text-muted-foreground">
                      <p>{e.contact_role ?? "—"}</p>
                      <p className="text-xs">{e.work_email ?? ""}</p>
                    </Td>
                    <Td className="text-muted-foreground">
                      {e.company_size ? (COMPANY_SIZE_LABEL[e.company_size] ?? e.company_size) : "—"}
                    </Td>
                    <Td>
                      {e.is_verified ? <Badge tone="green">Verified</Badge> : <Badge tone="amber">Unverified</Badge>}
                    </Td>
                    <Td className="text-right">
                      <div className="flex justify-end">
                        <VerifyToggle userId={e.user_id} verified={e.is_verified} />
                      </div>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
            {people.employers.length === 0 && <EmptyState>No employers yet.</EmptyState>}
          </div>
        </Panel>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Panel title="Recent jobs" description="Most recent 25">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr>
                  <Th>Title</Th>
                  <Th>Status</Th>
                  <Th className="text-right">Apps</Th>
                  <Th className="text-right">Views</Th>
                  <Th className="text-right">Created</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {people.recentJobs.map((j) => (
                  <tr key={j.id}>
                    <Td>
                      <p className="truncate font-medium">{j.title}</p>
                      <p className="truncate text-xs text-muted-foreground">{j.poster ?? "—"}</p>
                    </Td>
                    <Td>
                      <Badge tone={JOB_STATUS_TONE[j.status] ?? "neutral"}>
                        {JOB_STATUS_LABEL[j.status] ?? j.status}
                      </Badge>
                    </Td>
                    <Td className="text-right tabular-nums">{fullNumber(j.application_count)}</Td>
                    <Td className="text-right tabular-nums">{fullNumber(j.view_count)}</Td>
                    <Td className="text-right text-muted-foreground">{relativeTime(j.created_at)}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
            {people.recentJobs.length === 0 && <EmptyState>No jobs yet.</EmptyState>}
          </div>
        </Panel>

        <Panel title="Recent reels" description="Most recent 25">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr>
                  <Th>Kind</Th>
                  <Th>Owner</Th>
                  <Th>Status</Th>
                  <Th className="text-right">Views</Th>
                  <Th className="text-right">Created</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {people.recentReels.map((r) => (
                  <tr key={r.id}>
                    <Td className="font-medium">{REEL_KIND_LABEL[r.kind] ?? r.kind}</Td>
                    <Td className="truncate text-muted-foreground">{r.owner ?? "—"}</Td>
                    <Td>
                      <Badge tone={REEL_STATUS_TONE[r.status] ?? "neutral"}>{r.status}</Badge>
                    </Td>
                    <Td className="text-right tabular-nums">{fullNumber(r.view_count)}</Td>
                    <Td className="text-right text-muted-foreground">{relativeTime(r.created_at)}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
            {people.recentReels.length === 0 && <EmptyState>No reels yet.</EmptyState>}
          </div>
        </Panel>
      </div>
    </AdminChrome>
  )
}
