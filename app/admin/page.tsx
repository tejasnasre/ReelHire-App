import { connection } from "next/server"
import {
  Ban,
  Briefcase,
  Building2,
  Clapperboard,
  Eye,
  FileText,
  Flag,
  MessageSquare,
  PlaySquare,
  Trophy,
  UserRound,
  Users,
} from "lucide-react"

import { requireAdmin } from "@/lib/admin/auth"
import { missingAdminEnv } from "@/lib/admin/env"
import { fullNumber } from "@/lib/admin/format"
import { getActivitySeries, getFunnel, getOverview } from "@/lib/admin/queries"

import { AdminChrome } from "./_components/chrome"
import { AreaChart, DonutChart, FunnelList, Panel, RangeTabs, StatCard, type Delta } from "./_components/kit"
import { SetupNotice } from "./_components/setup-notice"

export const instant = false

const RANGE_OPTIONS = [7, 30, 90]

/** A "+N this week" trend chip, only when there's movement. */
function weekDelta(count: number): Delta | undefined {
  return count > 0 ? { value: `+${fullNumber(count)}`, dir: "up" } : undefined
}

export default async function AdminOverviewPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>
}) {
  await connection() // dynamic: session check + rolling windows are request-time (Date.now)
  await requireAdmin()

  const missingData = missingAdminEnv().filter(
    (k) => k === "SUPABASE_URL" || k === "SUPABASE_SERVICE_ROLE_KEY",
  )
  if (missingData.length > 0) return <SetupNotice missing={missingData} />

  const { range } = await searchParams
  const parsed = Number(range)
  const days = RANGE_OPTIONS.includes(parsed) ? parsed : 30

  const [overview, series, funnel] = await Promise.all([
    getOverview(),
    getActivitySeries(days),
    getFunnel(),
  ])

  const otherUsers = Math.max(overview.users - overview.seekers - overview.recruiters, 0)
  const signupsInRange = series.signups.reduce((sum, n) => sum + n, 0)

  return (
    <AdminChrome
      title="Dashboard"
      description={`Platform health at a glance · last ${days} days`}
      pendingModeration={overview.pendingModeration}
      actions={<RangeTabs value={days} options={RANGE_OPTIONS} basePath="/admin" />}
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <StatCard
          label="Total users"
          value={overview.users}
          icon={Users}
          sub={`${fullNumber(signupsInRange)} new in ${days}d`}
          delta={weekDelta(overview.users7d)}
          spark={series.signups}
        />
        <StatCard label="Seekers" value={overview.seekers} icon={UserRound} />
        <StatCard
          label="Recruiters"
          value={overview.recruiters}
          icon={Building2}
          sub={`${fullNumber(overview.verifiedEmployers)} verified`}
        />
        <StatCard
          label="Published jobs"
          value={overview.jobsPublished}
          icon={Briefcase}
          sub={`${fullNumber(overview.jobs)} total`}
          delta={weekDelta(overview.jobs7d)}
        />
        <StatCard
          label="Applications"
          value={overview.applications}
          icon={FileText}
          delta={weekDelta(overview.applications7d)}
          spark={series.applications}
        />
        <StatCard label="Hires" value={overview.hired} icon={Trophy} />
        <StatCard
          label="Published reels"
          value={overview.reelsPublished}
          icon={Clapperboard}
          sub={
            overview.reelsFailed > 0
              ? `${fullNumber(overview.reelsFailed)} failed`
              : `${fullNumber(overview.reels)} total`
          }
          tone={overview.reelsFailed > 0 ? "warn" : "default"}
        />
        <StatCard
          label="Messages"
          value={overview.messages}
          icon={MessageSquare}
          delta={weekDelta(overview.messages7d)}
        />
        <StatCard label="Reel views" value={overview.reelViews} icon={PlaySquare} />
        <StatCard label="Job views" value={overview.jobViews} icon={Eye} />
        <StatCard
          label="Pending reports"
          value={overview.pendingModeration}
          icon={Flag}
          tone="warn"
          sub={`${fullNumber(overview.openReports)} open`}
        />
        <StatCard label="Blocks" value={overview.blocks} icon={Ban} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Panel
          title="Growth"
          description={`New signups vs. applications, last ${days} days`}
          className="lg:col-span-2"
        >
          <AreaChart
            series={[
              { name: "New signups", values: series.signups },
              { name: "Applications", values: series.applications },
            ]}
            labels={series.labels}
            ariaLabel={`New signups and applications per day, last ${days} days`}
          />
        </Panel>
        <Panel title="User roles" description="Composition of all users">
          <DonutChart
            segments={[
              { label: "Seekers", value: overview.seekers },
              { label: "Recruiters", value: overview.recruiters },
              { label: "Other", value: otherUsers },
            ].filter((s) => s.value > 0)}
            centerValue={fullNumber(overview.users)}
            centerLabel="users"
          />
        </Panel>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Panel title="Activation" description="Share of all users">
          <FunnelList steps={funnel.overall} base={overview.users} />
        </Panel>
        <Panel title="Seeker funnel" description="Share of all users">
          <FunnelList steps={funnel.seeker} base={overview.users} />
        </Panel>
        <Panel title="Recruiter funnel" description="Share of all users">
          <FunnelList steps={funnel.recruiter} base={overview.users} />
        </Panel>
      </div>
    </AdminChrome>
  )
}
