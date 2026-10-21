import {
  Add01Icon,
  ArrowLeft01Icon,
  Bookmark01Icon,
  Calendar03Icon,
  Camera01Icon,
  FavouriteIcon,
  FilterHorizontalIcon,
  Home01Icon,
  Location01Icon,
  Message01Icon,
  Notification01Icon,
  PlayIcon,
  Search01Icon,
  Share01Icon,
  Tick02Icon,
  UserIcon,
  Video01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"

import { cn } from "@/lib/utils"

/*
 * Phone mockups of the ReelHire app. Every screen is laid out at a fixed
 * 280×606 design size and the whole device is scaled with CSS `zoom`, so the
 * same screen reads correctly at any size on the page.
 */

export type ScreenName = "feed" | "discover" | "applicants" | "record" | "profile" | "chat"

const SCREENS: Record<ScreenName, { dark: boolean; render: () => React.ReactNode }> = {
  feed: { dark: true, render: () => <FeedScreen /> },
  discover: { dark: false, render: () => <DiscoverScreen /> },
  applicants: { dark: false, render: () => <ApplicantsScreen /> },
  record: { dark: true, render: () => <RecordScreen /> },
  profile: { dark: false, render: () => <ProfileScreen /> },
  chat: { dark: false, render: () => <ChatScreen /> },
}

export function Phone({
  screen,
  zoom = 1,
  className,
}: {
  screen: ScreenName
  zoom?: number
  className?: string
}) {
  const { dark, render } = SCREENS[screen]
  return (
    <div
      role="img"
      aria-label={`ReelHire app: ${screen} screen`}
      style={{ zoom }}
      className={cn(
        "relative w-[280px] shrink-0 rounded-[46px] bg-neutral-900 p-[7px] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.35),inset_0_0_0_1.5px_rgb(255_255_255/0.12)] ring-1 ring-neutral-950/80",
        className,
      )}
    >
      <div
        className={cn(
          "relative h-[592px] overflow-hidden rounded-[39px]",
          dark ? "bg-neutral-950 text-white" : "bg-card text-foreground",
        )}
      >
        <div className="absolute top-2.5 left-1/2 z-40 h-[26px] w-[86px] -translate-x-1/2 rounded-full bg-black" />
        <StatusBar dark={dark} />
        {render()}
      </div>
    </div>
  )
}

function StatusBar({ dark }: { dark: boolean }) {
  return (
    <div
      className={cn(
        "absolute inset-x-0 top-0 z-30 flex h-11 items-center justify-between px-7 text-[11px] font-semibold",
        dark ? "text-white" : "text-foreground",
      )}
    >
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <span className="flex items-end gap-px">
          {[4, 6, 8, 10].map((h) => (
            <span key={h} style={{ height: h }} className="w-[3px] rounded-[1px] bg-current" />
          ))}
        </span>
        <span className="ml-1 flex h-[10px] w-5 items-center rounded-[3px] border border-current p-px opacity-90">
          <span className="h-full w-3/4 rounded-[1px] bg-current" />
        </span>
      </span>
    </div>
  )
}

function Icon({ icon, size = 16, className }: { icon: IconSvgElement; size?: number; className?: string }) {
  return <HugeiconsIcon icon={icon} size={size} strokeWidth={1.8} className={className} />
}

const SUBJECT_SIZES = {
  lg: { top: "top-[22%]", head: "size-24", body: "mt-3 h-52 w-56 rounded-t-[110px]" },
  md: { top: "top-[20%]", head: "size-12", body: "mt-1.5 h-24 w-28 rounded-t-[56px]" },
  sm: { top: "top-[26%]", head: "size-[22px]", body: "mt-0.5 h-12 w-[52px] rounded-t-[26px]" },
}

/** Stand-in for live video: a lit subject over the halftone texture. */
export function VideoBackdrop({
  tone = 0,
  size = "lg",
  className,
}: {
  tone?: number
  size?: keyof typeof SUBJECT_SIZES
  className?: string
}) {
  const offsets = ["left-1/2", "left-[44%]", "left-[57%]"]
  const subject = SUBJECT_SIZES[size]
  return (
    <div aria-hidden className={cn("absolute inset-0 overflow-hidden bg-neutral-700", className)}>
      <div className="absolute inset-0 bg-[url(/images/halftone.png)] bg-cover bg-bottom opacity-80 mix-blend-multiply" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgb(255_255_255/0.28),transparent_55%)]" />
      <div className={cn("absolute flex -translate-x-1/2 flex-col items-center", subject.top, offsets[tone % offsets.length])}>
        <div
          className={cn(
            "rounded-full bg-gradient-to-b from-neutral-300 to-neutral-500 shadow-[0_10px_40px_rgb(0_0_0/0.4)]",
            subject.head,
          )}
        />
        <div className={cn("bg-gradient-to-b from-neutral-400 to-neutral-800", subject.body)} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/85" />
    </div>
  )
}

function TabBar({ dark, active }: { dark?: boolean; active: "home" | "discover" | "activity" | "profile" }) {
  const items: { key: string; icon: IconSvgElement }[] = [
    { key: "home", icon: Home01Icon },
    { key: "discover", icon: Search01Icon },
    { key: "create", icon: Add01Icon },
    { key: "activity", icon: Notification01Icon },
    { key: "profile", icon: UserIcon },
  ]
  return (
    <div
      className={cn(
        "absolute inset-x-0 bottom-0 z-20 flex items-center justify-around border-t px-3 pt-2.5 pb-6",
        dark ? "border-white/10 bg-black/70 text-white backdrop-blur" : "bg-card text-foreground",
      )}
    >
      {items.map(({ key, icon }) =>
        key === "create" ? (
          <span
            key={key}
            className={cn("grid size-8 place-items-center rounded-md", dark ? "bg-white text-black" : "bg-foreground text-background")}
          >
            <Icon icon={icon} size={16} />
          </span>
        ) : (
          <span key={key} className={cn("grid size-8 place-items-center", key === active ? "opacity-100" : "opacity-45")}>
            <HugeiconsIcon icon={icon} size={18} strokeWidth={key === active ? 2.4 : 1.8} />
          </span>
        ),
      )}
    </div>
  )
}

function Chip({ children, dark, active }: { children: React.ReactNode; dark?: boolean; active?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-[4px] border px-1.5 py-0.5 text-[9px] font-medium tracking-wide uppercase",
        dark && "border-white/30 bg-white/10 text-white",
        !dark && active && "border-foreground bg-foreground text-background",
        !dark && !active && "border-border bg-secondary text-foreground",
      )}
    >
      {children}
    </span>
  )
}

function Thumb({ tone = 0, className }: { tone?: number; className?: string }) {
  return (
    <span className={cn("relative block shrink-0 overflow-hidden rounded-[5px]", className)}>
      <VideoBackdrop tone={tone} size="sm" />
      <span className="absolute inset-0 grid place-items-center">
        <span className="grid size-5 place-items-center rounded-[4px] bg-white/90 text-black">
          <HugeiconsIcon icon={PlayIcon} size={10} strokeWidth={2.5} />
        </span>
      </span>
    </span>
  )
}

/* ---------------------------------------------------------------- screens */

function FeedScreen() {
  const rail: { icon: IconSvgElement; label: string }[] = [
    { icon: FavouriteIcon, label: "1.2k" },
    { icon: Message01Icon, label: "84" },
    { icon: Bookmark01Icon, label: "Save" },
    { icon: Share01Icon, label: "Share" },
  ]
  return (
    <>
      <VideoBackdrop />
      <div className="absolute inset-x-0 top-12 z-10 flex justify-center gap-4 text-[12px] font-semibold">
        <span className="opacity-60">Following</span>
        <span className="border-b-2 border-white pb-0.5">For you</span>
      </div>
      <div className="absolute right-3 bottom-[150px] z-10 flex flex-col items-center gap-3.5">
        <span className="grid size-9 place-items-center rounded-md border-2 border-white bg-neutral-200 text-[10px] font-bold text-black">
          NL
        </span>
        {rail.map(({ icon, label }) => (
          <span key={label} className="flex flex-col items-center gap-0.5 text-[9px] font-medium">
            <Icon icon={icon} size={20} />
            {label}
          </span>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-[78px] z-10 space-y-2 px-4 pr-14">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold">
          Northwind Labs
          <span className="rounded-[3px] bg-white px-1 py-px text-[8px] font-bold tracking-wider text-black uppercase">
            Verified
          </span>
        </div>
        <p className="text-[17px] leading-tight font-bold">Senior Frontend Engineer</p>
        <p className="text-[10px] text-white/75">Remote · $140-170k · Full-time</p>
        <div className="flex gap-1">
          <Chip dark>React</Chip>
          <Chip dark>TypeScript</Chip>
          <Chip dark>Next.js</Chip>
        </div>
        <div className="flex items-center justify-between rounded-md bg-white px-3 py-2 text-[11px] font-semibold text-black">
          Swipe up to apply
          <span className="text-[9px] font-medium text-neutral-500">0:48 / 1:12</span>
        </div>
      </div>
      <div className="absolute inset-x-4 bottom-[70px] z-10 h-[2px] rounded-full bg-white/25">
        <div className="h-full w-[62%] rounded-full bg-white" />
      </div>
      <TabBar dark active="home" />
    </>
  )
}

function DiscoverScreen() {
  const jobs = [
    { co: "Fieldnote", role: "Product Designer", meta: "Hybrid · Bengaluru · Mid", tags: ["Figma", "Systems"] },
    { co: "Lattice Ops", role: "Backend Engineer", meta: "Remote · Senior · $150k", tags: ["Go", "Postgres"] },
    { co: "Brightpath", role: "Mobile Engineer", meta: "Remote · Mid · $120k", tags: ["React Native"] },
  ]
  return (
    <div className="absolute inset-0 pt-12">
      <div className="px-4">
        <p className="text-[20px] font-bold tracking-tight">Discover</p>
        <div className="mt-2.5 flex gap-2">
          <div className="flex h-8 flex-1 items-center gap-1.5 rounded-md border bg-background px-2.5 text-[10px] text-muted-foreground">
            <Icon icon={Search01Icon} size={12} />
            Roles, stacks, companies
          </div>
          <span className="grid size-8 place-items-center rounded-md bg-foreground text-background">
            <Icon icon={FilterHorizontalIcon} size={13} />
          </span>
        </div>
        <div className="mt-2.5 flex gap-1 overflow-hidden">
          <Chip active>Remote</Chip>
          <Chip active>Senior</Chip>
          <Chip>React</Chip>
          <Chip>$120k+</Chip>
          <Chip>Seed</Chip>
        </div>
      </div>
      <div className="mt-3 space-y-2 px-4">
        {jobs.map((job, i) => (
          <div key={job.role} className="flex gap-2.5 rounded-md border bg-background p-2.5">
            <Thumb tone={i} className="h-[74px] w-[48px]" />
            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-medium text-muted-foreground uppercase">{job.co}</p>
              <p className="text-[12px] leading-tight font-bold">{job.role}</p>
              <p className="mt-0.5 text-[9px] text-muted-foreground">{job.meta}</p>
              <div className="mt-1.5 flex gap-1">
                {job.tags.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
            </div>
            <Icon icon={Bookmark01Icon} size={13} className="shrink-0 opacity-60" />
          </div>
        ))}
      </div>
      <TabBar active="discover" />
    </div>
  )
}

function ApplicantsScreen() {
  const people = [
    { name: "Ananya Rao", role: "Frontend · 5 yrs", tags: ["React", "TS"], len: "1:04", status: "New" },
    { name: "Marco Silva", role: "Full-stack · 7 yrs", tags: ["Next.js", "Node"], len: "0:52", status: "Shortlisted" },
    { name: "Hana Kim", role: "Frontend · 4 yrs", tags: ["Vue", "TS"], len: "1:18", status: "New" },
    { name: "Dev Patel", role: "UI Engineer · 6 yrs", tags: ["React", "CSS"], len: "0:47", status: "Interview" },
  ]
  return (
    <div className="absolute inset-0 pt-12">
      <div className="flex items-center gap-2 px-4">
        <Icon icon={ArrowLeft01Icon} size={16} />
        <div>
          <p className="text-[14px] leading-tight font-bold">Applicants</p>
          <p className="text-[9px] text-muted-foreground">Senior Frontend Engineer</p>
        </div>
      </div>
      <div className="mt-3 flex gap-1 px-4">
        {[
          ["New", 12],
          ["Shortlisted", 4],
          ["Interview", 2],
        ].map(([label, n], i) => (
          <span
            key={label}
            className={cn(
              "rounded-[4px] border px-2 py-1 text-[9px] font-semibold",
              i === 0 ? "border-foreground bg-foreground text-background" : "bg-secondary",
            )}
          >
            {label} {n}
          </span>
        ))}
      </div>
      <div className="mt-3 divide-y border-y">
        {people.map((p, i) => (
          <div key={p.name} className="flex items-center gap-2.5 px-4 py-2.5">
            <Thumb tone={i + 1} className="h-[58px] w-[40px]" />
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold">{p.name}</p>
              <p className="text-[9px] text-muted-foreground">
                {p.role} · {p.len}
              </p>
              <div className="mt-1 flex gap-1">
                {p.tags.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
            </div>
            <span
              className={cn(
                "rounded-[3px] px-1.5 py-0.5 text-[8px] font-bold tracking-wide uppercase",
                p.status === "New" ? "border" : "bg-foreground text-background",
              )}
            >
              {p.status}
            </span>
          </div>
        ))}
      </div>
      <div className="absolute inset-x-4 bottom-[84px] flex gap-2">
        <span className="flex-1 rounded-md border py-2 text-center text-[10px] font-semibold">Pass</span>
        <span className="flex-1 rounded-md bg-foreground py-2 text-center text-[10px] font-semibold text-background">
          Shortlist
        </span>
      </div>
      <TabBar active="activity" />
    </div>
  )
}

function RecordScreen() {
  return (
    <>
      <VideoBackdrop tone={1} />
      <div className="absolute inset-x-0 top-12 z-10 flex items-center justify-between px-4">
        <Icon icon={ArrowLeft01Icon} size={18} />
        <span className="flex items-center gap-1.5 rounded-[4px] bg-black/50 px-2 py-1 text-[10px] font-semibold backdrop-blur">
          <span className="size-1.5 rounded-full bg-white" />
          0:42 / 1:30
        </span>
        <Icon icon={Camera01Icon} size={18} />
      </div>
      <div className="absolute inset-x-4 top-[88px] z-10 rounded-md border border-white/20 bg-black/45 p-2.5 backdrop-blur">
        <p className="text-[8px] font-semibold tracking-widest text-white/60 uppercase">Guide · 2 of 3</p>
        <p className="mt-1 text-[11px] leading-snug font-semibold">
          Experience: one thing you built, the hardest call you made, and what shipped.
        </p>
        <div className="mt-2 flex gap-1">
          <span className="h-[3px] flex-1 rounded-full bg-white" />
          <span className="h-[3px] flex-1 rounded-full bg-white" />
          <span className="h-[3px] flex-1 rounded-full bg-white/25" />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-9 z-10 flex items-center justify-around px-8">
        <span className="grid size-9 place-items-center rounded-md border border-white/40 bg-white/10">
          <Icon icon={Video01Icon} size={16} />
        </span>
        <span className="grid size-[68px] place-items-center rounded-full border-[3px] border-white">
          <span className="size-7 rounded-md bg-white" />
        </span>
        <span className="grid size-9 place-items-center rounded-md border border-white/40 bg-white/10 text-[9px] font-bold">
          Flip
        </span>
      </div>
      <p className="absolute inset-x-0 bottom-[118px] z-10 text-center text-[10px] font-medium text-white/80">
        Video resume · 20-90 seconds
      </p>
    </>
  )
}

function ProfileScreen() {
  return (
    <div className="absolute inset-0 pt-12">
      <div className="px-4">
        <div className="flex items-center gap-3">
          <span className="grid size-14 place-items-center rounded-md bg-secondary text-[16px] font-bold">AM</span>
          <div>
            <p className="text-[15px] leading-tight font-bold">Aarav Mehta</p>
            <p className="text-[10px] text-muted-foreground">Full-stack Engineer</p>
            <p className="mt-0.5 flex items-center gap-1 text-[9px] text-muted-foreground">
              <Icon icon={Location01Icon} size={10} /> Pune · Open to remote
            </p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 divide-x rounded-md border text-center">
          {[
            ["1.4k", "Reel views"],
            ["9", "Applied"],
            ["3", "Shortlisted"],
          ].map(([v, l]) => (
            <div key={l} className="py-2">
              <p className="text-[13px] font-bold">{v}</p>
              <p className="text-[8px] text-muted-foreground uppercase">{l}</p>
            </div>
          ))}
        </div>
        <p className="mt-3.5 text-[9px] font-semibold tracking-widest text-muted-foreground uppercase">Video resume</p>
        <div className="relative mt-1.5 h-[150px] overflow-hidden rounded-md">
          <VideoBackdrop tone={2} size="md" />
          <span className="absolute bottom-2 left-2 rounded-[3px] bg-white px-1.5 py-0.5 text-[8px] font-bold text-black">
            1:02
          </span>
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid size-9 place-items-center rounded-md bg-white/90 text-black">
              <Icon icon={PlayIcon} size={16} />
            </span>
          </span>
        </div>
        <p className="mt-3.5 text-[9px] font-semibold tracking-widest text-muted-foreground uppercase">Stack</p>
        <div className="mt-1.5 flex flex-wrap gap-1">
          {["TypeScript", "React", "Node", "Postgres", "AWS"].map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>
        <p className="mt-3.5 text-[9px] font-semibold tracking-widest text-muted-foreground uppercase">Experience</p>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="size-7 rounded-md bg-secondary" />
          <div>
            <p className="text-[11px] font-semibold">Software Engineer II · Paywise</p>
            <p className="text-[9px] text-muted-foreground">2022 - now · 3 yrs</p>
          </div>
        </div>
      </div>
      <TabBar active="profile" />
    </div>
  )
}

function ChatScreen() {
  return (
    <div className="absolute inset-0 flex flex-col pt-12">
      <div className="flex items-center gap-2.5 border-b px-4 pb-2.5">
        <Icon icon={ArrowLeft01Icon} size={16} />
        <span className="grid size-8 place-items-center rounded-md bg-secondary text-[10px] font-bold">JL</span>
        <div>
          <p className="text-[12px] leading-tight font-bold">Jess Lin</p>
          <p className="text-[9px] text-muted-foreground">Talent · Northwind Labs</p>
        </div>
      </div>
      <div className="flex-1 space-y-2 px-4 pt-3 text-[10.5px] leading-snug">
        <div className="flex items-center gap-2 rounded-md border bg-background p-2">
          <Thumb tone={0} className="h-[44px] w-[30px]" />
          <div>
            <p className="text-[8px] font-semibold text-muted-foreground uppercase">Applied with reel</p>
            <p className="text-[10px] font-semibold">Senior Frontend Engineer</p>
          </div>
        </div>
        <p className="max-w-[80%] rounded-md rounded-tl-[2px] bg-secondary px-2.5 py-2">
          Loved the walkthrough of your payments dashboard, especially the bit about optimistic updates.
        </p>
        <p className="max-w-[80%] rounded-md rounded-tl-[2px] bg-secondary px-2.5 py-2">Free for a 30-min call this week?</p>
        <p className="ml-auto max-w-[78%] rounded-md rounded-tr-[2px] bg-foreground px-2.5 py-2 text-background">
          Thanks! Thursday afternoon works for me.
        </p>
        <div className="rounded-md border bg-background p-2.5">
          <p className="flex items-center gap-1.5 text-[10px] font-bold">
            <Icon icon={Calendar03Icon} size={12} /> Interview · Thu, 3:00 PM
          </p>
          <p className="mt-0.5 text-[9px] text-muted-foreground">Status moved to Interview</p>
          <span className="mt-2 flex items-center justify-center gap-1 rounded-[4px] bg-foreground py-1.5 text-[9px] font-semibold text-background">
            <Icon icon={Tick02Icon} size={11} /> Confirmed
          </span>
        </div>
      </div>
      <div className="mx-4 mb-8 flex h-9 items-center rounded-md border bg-background px-3 text-[10px] text-muted-foreground">
        Message…
      </div>
    </div>
  )
}
