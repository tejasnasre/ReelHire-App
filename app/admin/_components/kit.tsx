import type { ReactNode } from "react"

import Link from "next/link"
import { TrendingDown, TrendingUp, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { compactNumber, fullNumber, initials } from "@/lib/admin/format"

/** Series/segment colors — the theme's `--chart-*` tokens (monochrome + one accent). */
const CHART_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
]

export function Panel({
  title,
  description,
  action,
  children,
  className,
}: {
  title?: string
  description?: string
  action?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <section className={cn("rounded-xl border border-border bg-card", className)}>
      {(title || action) && (
        <header className="flex items-start justify-between gap-3 border-b border-border px-4 py-3">
          <div>
            {title && <h2 className="text-sm font-semibold text-card-foreground">{title}</h2>}
            {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
          </div>
          {action}
        </header>
      )}
      {children}
    </section>
  )
}

export type Delta = { value: string; dir?: "up" | "down" }

function DeltaChip({ delta }: { delta: Delta }) {
  const down = delta.dir === "down"
  const Icon = down ? TrendingDown : TrendingUp
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums",
        down
          ? "bg-destructive/15 text-destructive"
          : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
      )}
    >
      <Icon className="size-3" aria-hidden />
      {delta.value}
    </span>
  )
}

export function StatCard({
  label,
  value,
  sub,
  tone,
  delta,
  spark,
  icon: Icon,
}: {
  label: string
  value: number
  sub?: string
  tone?: "default" | "warn"
  delta?: Delta
  spark?: number[]
  icon?: LucideIcon
}) {
  const warn = tone === "warn" && value > 0
  return (
    <div className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-muted-foreground/30">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        {Icon ? (
          <span
            className={cn(
              "grid size-8 shrink-0 place-items-center rounded-lg",
              warn ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground",
            )}
          >
            <Icon className="size-4" aria-hidden />
          </span>
        ) : null}
      </div>
      <p
        className={cn(
          "mt-2 text-2xl font-semibold tabular-nums",
          warn ? "text-destructive" : "text-card-foreground",
        )}
        title={fullNumber(value)}
      >
        {compactNumber(value)}
      </p>
      {sub || delta ? (
        <div className="mt-1 flex items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">{sub ?? ""}</p>
          {delta ? <DeltaChip delta={delta} /> : null}
        </div>
      ) : null}
      {spark && spark.length > 1 ? (
        <div className="mt-2 -mb-1">
          <Sparkline values={spark} />
        </div>
      ) : null}
    </div>
  )
}

const BADGE_TONES: Record<string, string> = {
  neutral: "bg-muted text-muted-foreground",
  green: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  amber: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  red: "bg-destructive/15 text-destructive",
  blue: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode
  tone?: keyof typeof BADGE_TONES | string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        BADGE_TONES[tone] ?? BADGE_TONES.neutral,
      )}
    >
      {children}
    </span>
  )
}

export function Avatar({ name, size = 32 }: { name: string | null; size?: number }) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground uppercase"
      style={{ width: size, height: size }}
      aria-hidden
    >
      {initials(name)}
    </span>
  )
}

export function EmptyState({ children }: { children: ReactNode }) {
  return <div className="px-4 py-10 text-center text-sm text-muted-foreground">{children}</div>
}

/**
 * Minimal responsive bar chart (inline SVG, no chart library). `preserveAspectRatio="none"`
 * lets the bars stretch to the container width while the height stays fixed.
 */
export function BarChart({
  values,
  labels,
  ariaLabel,
}: {
  values: number[]
  labels: string[]
  ariaLabel: string
}) {
  const max = Math.max(1, ...values)
  const n = values.length
  const gap = 0.25
  const barW = (100 - gap * (n - 1)) / n
  const ticks = [0, Math.floor(n / 2), n - 1]
  return (
    <div className="px-4 py-4">
      <svg
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        className="h-28 w-full text-primary"
        role="img"
        aria-label={ariaLabel}
      >
        {values.map((v, i) => {
          const h = (v / max) * 38
          return (
            <rect
              key={i}
              x={i * (barW + gap)}
              y={40 - h}
              width={barW}
              height={Math.max(h, v > 0 ? 0.6 : 0)}
              rx={0.4}
              fill="currentColor"
              opacity={0.85}
            >
              <title>{`${labels[i]}: ${v}`}</title>
            </rect>
          )
        })}
      </svg>
      <div className="mt-2 flex justify-between text-[10px] text-muted-foreground tabular-nums">
        {ticks.map((t) => (
          <span key={t}>{labels[t]?.slice(5)}</span>
        ))}
      </div>
    </div>
  )
}

export function FunnelList({ steps, base }: { steps: { label: string; value: number }[]; base: number }) {
  const denom = Math.max(1, base)
  return (
    <ul className="space-y-2 px-4 py-4">
      {steps.map((step) => {
        const pct = Math.round((step.value / denom) * 100)
        return (
          <li key={step.label}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="font-medium text-card-foreground">{step.label}</span>
              <span className="tabular-nums text-muted-foreground">
                {fullNumber(step.value)} · {pct}%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
            </div>
          </li>
        )
      })}
    </ul>
  )
}

/** Tiny inline trend line for stat cards. Stroke stays crisp via non-scaling-stroke. */
export function Sparkline({ values, className }: { values: number[]; className?: string }) {
  const max = Math.max(1, ...values)
  const n = values.length
  const w = 100
  const h = 28
  const step = n > 1 ? w / (n - 1) : 0
  const line = values
    .map((v, i) => `${i ? "L" : "M"}${(i * step).toFixed(1)},${(h - 1 - (v / max) * (h - 2)).toFixed(1)}`)
    .join(" ")
  const area = `${line} L${w},${h} L0,${h} Z`
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className={cn("h-7 w-full text-primary", className)}
      aria-hidden
    >
      <path d={area} fill="currentColor" opacity={0.12} />
      <path
        d={line}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

export type ChartSeries = { name: string; values: number[] }

/**
 * Responsive multi-series area chart (inline SVG, no chart library). Fills to the
 * container width via `preserveAspectRatio="none"`; strokes use
 * `vectorEffect="non-scaling-stroke"` so lines stay crisp despite the x-stretch.
 */
export function AreaChart({
  series,
  labels,
  ariaLabel,
  height = 200,
}: {
  series: ChartSeries[]
  labels: string[]
  ariaLabel: string
  height?: number
}) {
  const max = Math.max(1, ...series.flatMap((s) => s.values))
  const n = labels.length
  const W = 1000
  const padT = 10
  const padB = 20
  const innerH = height - padT - padB
  const stepX = n > 1 ? W / (n - 1) : 0
  const xAt = (i: number) => i * stepX
  const yAt = (v: number) => padT + innerH - (v / max) * innerH
  // Gridlines + matching y-axis labels (top = max, bottom = 0), drawn as HTML in
  // a left gutter so the text isn't stretched by the chart's x-axis scaling.
  const gridFractions = [0, 0.25, 0.5, 0.75, 1]
  const yTicks = [0, 0.5, 1].map((f) => ({ f, y: padT + innerH * f, value: max * (1 - f) }))
  const ticks = [0, Math.floor(n / 2), n - 1]

  return (
    <div className="px-4 py-4">
      <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1">
        {series.map((s, si) => (
          <span key={s.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span
              className="size-2.5 rounded-full"
              style={{ backgroundColor: CHART_COLORS[si % CHART_COLORS.length] }}
            />
            {s.name}
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <div className="relative w-8 shrink-0" style={{ height }} aria-hidden>
          {yTicks.map((t) => (
            <span
              key={t.f}
              className="absolute right-0 -translate-y-1/2 text-[10px] tabular-nums text-muted-foreground"
              style={{ top: t.y }}
            >
              {compactNumber(Math.round(t.value))}
            </span>
          ))}
        </div>
        <div className="min-w-0 flex-1">
          <svg
            viewBox={`0 0 ${W} ${height}`}
            preserveAspectRatio="none"
            className="w-full"
            style={{ height }}
            role="img"
            aria-label={ariaLabel}
          >
            {gridFractions.map((f, i) => (
              <line
                key={i}
                x1={0}
                x2={W}
                y1={padT + innerH * f}
                y2={padT + innerH * f}
                stroke="var(--color-border)"
                strokeWidth={1}
                opacity={0.6}
                vectorEffect="non-scaling-stroke"
              />
            ))}
            {series.map((s, si) => {
              const color = CHART_COLORS[si % CHART_COLORS.length]
              const line = s.values
                .map((v, i) => `${i ? "L" : "M"}${xAt(i).toFixed(1)},${yAt(v).toFixed(1)}`)
                .join(" ")
              const area = `${line} L${xAt(n - 1).toFixed(1)},${height - padB} L0,${height - padB} Z`
              return (
                <g key={s.name}>
                  <path d={area} fill={color} opacity={0.1} />
                  <path
                    d={line}
                    fill="none"
                    stroke={color}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              )
            })}
            {labels.map((label, i) => (
              <rect
                key={i}
                x={Math.max(0, xAt(i) - stepX / 2)}
                y={0}
                width={stepX || W}
                height={height}
                fill="transparent"
              >
                <title>{`${label}\n${series.map((s) => `${s.name}: ${s.values[i]}`).join("\n")}`}</title>
              </rect>
            ))}
          </svg>
          <div className="mt-2 flex justify-between text-[10px] text-muted-foreground tabular-nums">
            {ticks.map((t) => (
              <span key={t}>{labels[t]?.slice(5)}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Segmented control that switches a URL query param (e.g. `?range=30`) — used to
 * pick a chart window. Server-rendered; `value` is the active option, resolved by
 * the page from the same param.
 */
export function RangeTabs({
  value,
  options,
  basePath = "",
  param = "range",
}: {
  value: number
  options: number[]
  basePath?: string
  param?: string
}) {
  return (
    <div className="inline-flex items-center rounded-lg border border-border bg-card p-0.5">
      {options.map((opt) => {
        const active = opt === value
        return (
          <Link
            key={opt}
            href={`${basePath}?${param}=${opt}`}
            scroll={false}
            aria-current={active ? "true" : undefined}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs font-medium tabular-nums transition-colors",
              active
                ? "bg-secondary text-secondary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {opt}d
          </Link>
        )
      })}
    </div>
  )
}

export type DonutSegment = { label: string; value: number }

/** Donut chart with a legend — composition at a glance (user roles, content mix, …). */
export function DonutChart({
  segments,
  centerLabel,
  centerValue,
  size = 160,
}: {
  segments: DonutSegment[]
  centerLabel?: string
  centerValue?: string
  size?: number
}) {
  const total = Math.max(1, segments.reduce((acc, s) => acc + s.value, 0))
  const r = 60
  const circumference = 2 * Math.PI * r
  // Precompute each arc's length + start offset (a prefix sum) so render stays
  // side-effect free. Segment counts are tiny, so the O(n^2) offset is fine.
  const dashes = segments.map((s) => (s.value / total) * circumference)
  const arcs = segments.map((s, i) => ({
    ...s,
    dash: dashes[i],
    offset: dashes.slice(0, i).reduce((acc, d) => acc + d, 0),
  }))

  return (
    <div className="flex flex-col items-center gap-5 px-4 py-5 sm:flex-row sm:justify-center">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg viewBox="0 0 160 160" className="size-full -rotate-90">
          <circle cx={80} cy={80} r={r} fill="none" stroke="var(--color-muted)" strokeWidth={20} opacity={0.5} />
          {arcs.map((s, i) => (
            <circle
              key={s.label}
              cx={80}
              cy={80}
              r={r}
              fill="none"
              stroke={CHART_COLORS[i % CHART_COLORS.length]}
              strokeWidth={20}
              strokeDasharray={`${s.dash} ${circumference - s.dash}`}
              strokeDashoffset={-s.offset}
            >
              <title>{`${s.label}: ${fullNumber(s.value)}`}</title>
            </circle>
          ))}
        </svg>
        {centerValue || centerLabel ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {centerValue ? <span className="text-xl font-semibold tabular-nums">{centerValue}</span> : null}
            {centerLabel ? <span className="text-[11px] text-muted-foreground">{centerLabel}</span> : null}
          </div>
        ) : null}
      </div>
      <ul className="w-full space-y-1.5 sm:w-auto sm:min-w-40">
        {segments.map((s, i) => (
          <li key={s.label} className="flex items-center gap-2 text-xs">
            <span
              className="size-2.5 shrink-0 rounded-sm"
              style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }}
            />
            <span className="text-card-foreground">{s.label}</span>
            <span className="ml-auto tabular-nums text-muted-foreground">
              {fullNumber(s.value)} · {Math.round((s.value / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
