import { cn } from "@/lib/utils"
import { setReportStatus } from "@/lib/admin/actions"
import { REPORT_REASON_LABEL, REPORT_STATUS_LABEL, relativeTime } from "@/lib/admin/format"
import type { ReportView } from "@/lib/admin/queries"
import { buttonVariants } from "@/components/ui/button"

import { Avatar, Badge } from "./kit"

const REASON_TONE: Record<string, string> = {
  harassment: "red",
  discrimination: "red",
  scam: "red",
  inappropriate: "amber",
  misleading: "amber",
  spam: "amber",
  other: "neutral",
}

const STATUS_TONE: Record<string, string> = {
  open: "red",
  reviewing: "amber",
  actioned: "green",
  dismissed: "neutral",
}

function StatusButton({
  id,
  status,
  label,
  variant = "outline",
}: {
  id: string
  status: string
  label: string
  variant?: "outline" | "default" | "destructive" | "secondary"
}) {
  return (
    <form action={setReportStatus}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={status} />
      <button className={cn(buttonVariants({ variant, size: "sm" }))}>{label}</button>
    </form>
  )
}

function Target({ report }: { report: ReportView }) {
  if (report.job) {
    return (
      <p className="text-sm">
        <span className="text-muted-foreground">Job · </span>
        <span className="font-medium">{report.job.title}</span>{" "}
        <Badge>{report.job.status}</Badge>
      </p>
    )
  }
  if (report.reel) {
    return (
      <p className="text-sm">
        <span className="text-muted-foreground">Reel · </span>
        <span className="font-medium">{report.reel.kind}</span> <Badge>{report.reel.status}</Badge>
      </p>
    )
  }
  const name = report.reportedUser?.full_name ?? report.reportedUser?.username ?? "Deleted user"
  return (
    <div className="flex items-center gap-2">
      <Avatar name={report.reportedUser?.full_name ?? name} size={28} />
      <span className="text-sm font-medium">{name}</span>
    </div>
  )
}

export function ReportCard({ report }: { report: ReportView }) {
  const reporter = report.reporter?.full_name ?? report.reporter?.username ?? "Unknown"
  const resolved = report.status === "actioned" || report.status === "dismissed"
  return (
    <div className="border-b border-border px-4 py-4 last:border-b-0">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={REASON_TONE[report.reason] ?? "neutral"}>
          {REPORT_REASON_LABEL[report.reason] ?? report.reason}
        </Badge>
        <Badge tone={STATUS_TONE[report.status] ?? "neutral"}>
          {REPORT_STATUS_LABEL[report.status] ?? report.status}
        </Badge>
        <span className="text-xs text-muted-foreground">{relativeTime(report.created_at)}</span>
        <span className="ml-auto text-xs text-muted-foreground">reported by {reporter}</span>
      </div>

      <div className="mt-3">
        <Target report={report} />
      </div>

      {report.details && (
        <p className="mt-2 rounded-lg bg-muted/50 px-3 py-2 text-sm text-foreground/90">
          {report.details}
        </p>
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        {!resolved && report.status === "open" && (
          <StatusButton id={report.id} status="reviewing" label="Start reviewing" />
        )}
        {!resolved && (
          <>
            <StatusButton id={report.id} status="actioned" label="Action" variant="default" />
            <StatusButton id={report.id} status="dismissed" label="Dismiss" variant="secondary" />
          </>
        )}
        {resolved && <StatusButton id={report.id} status="open" label="Reopen" />}
      </div>
    </div>
  )
}
