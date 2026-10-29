import { connection } from "next/server"

import { requireAdmin } from "@/lib/admin/auth"
import { missingAdminEnv } from "@/lib/admin/env"
import { fullNumber } from "@/lib/admin/format"
import { getModeration, getOverview, getReportsSeries } from "@/lib/admin/queries"

import { AdminChrome } from "../_components/chrome"
import { Avatar, BarChart, EmptyState, Panel, StatCard } from "../_components/kit"
import { ReportCard } from "../_components/report-card"
import { SetupNotice } from "../_components/setup-notice"

export const instant = false

export default async function AdminModerationPage() {
  await connection() // dynamic: session check + relative timestamps are request-time
  await requireAdmin()

  const missingData = missingAdminEnv().filter(
    (k) => k === "SUPABASE_URL" || k === "SUPABASE_SERVICE_ROLE_KEY",
  )
  if (missingData.length > 0) return <SetupNotice missing={missingData} />

  const [moderation, overview, reportsSeries] = await Promise.all([
    getModeration(),
    getOverview(),
    getReportsSeries(30),
  ])

  const reportsInRange = reportsSeries.reports.reduce((sum, n) => sum + n, 0)

  return (
    <AdminChrome
      title="Moderation"
      description="Reports queue and recently resolved cases"
      pendingModeration={overview.pendingModeration}
    >

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Open reports" value={overview.openReports} tone="warn" />
        <StatCard label="Reviewing" value={overview.reviewingReports} />
        <StatCard label="User blocks" value={moderation.blocksTotal} />
        <StatCard label="Reported accounts" value={moderation.topReported.length} sub="distinct, see below" />
      </div>

      <div className="mt-6">
        <Panel
          title="Reports over time"
          description={`New reports per day · ${fullNumber(reportsInRange)} in the last 30 days`}
        >
          <BarChart
            values={reportsSeries.reports}
            labels={reportsSeries.labels}
            ariaLabel="New reports per day, last 30 days"
          />
        </Panel>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Panel title="Queue" description="Open and in-review reports, oldest first">
            {moderation.queue.length === 0 ? (
              <EmptyState>Nothing to review. 🎉</EmptyState>
            ) : (
              moderation.queue.map((report) => <ReportCard key={report.id} report={report} />)
            )}
          </Panel>
        </div>

        <div className="space-y-4">
          <Panel title="Most-reported accounts">
            {moderation.topReported.length === 0 ? (
              <EmptyState>No reports yet.</EmptyState>
            ) : (
              <ul className="divide-y divide-border">
                {moderation.topReported.map((entry) => (
                  <li key={entry.id} className="flex items-center gap-3 px-4 py-3">
                    <Avatar name={entry.user?.full_name ?? null} size={28} />
                    <span className="truncate text-sm font-medium">
                      {entry.user?.full_name ?? entry.user?.username ?? "Deleted user"}
                    </span>
                    <span className="ml-auto text-sm tabular-nums text-muted-foreground">
                      {fullNumber(entry.count)}×
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>
      </div>

      <div className="mt-6">
        <Panel title="Recently resolved" description="Last 20 actioned or dismissed">
          {moderation.resolved.length === 0 ? (
            <EmptyState>Nothing resolved yet.</EmptyState>
          ) : (
            moderation.resolved.map((report) => <ReportCard key={report.id} report={report} />)
          )}
        </Panel>
      </div>
    </AdminChrome>
  )
}
