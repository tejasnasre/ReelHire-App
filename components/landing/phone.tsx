import Image from "next/image"

import { cn } from "@/lib/utils"

import { PhoneNotes, type Note } from "./phone-notes"

/*
 * Phones showing the ReelHire app, using the framed captures in
 * /public/screenshots/final-portrait. Each capture is 1840×3600 with the
 * device frame at 1540×3324, offset 156×146 into transparent padding, so the
 * image is placed to let the frame itself fill the 280px-wide box. The whole
 * device is scaled with CSS `zoom`, so it reads correctly at any size.
 */

const DIR = "/screenshots/final-portrait"

const SCREENS = {
  feed: { label: "job reel for a Senior React Native Engineer", shot: "12-home-feed-react-native-portrait.png" },
  feedBackend: { label: "job reel for a Backend Engineer", shot: "01-home-feed-portrait.png" },
  feedDesign: { label: "job reel for a Product Designer", shot: "02-home-feed-designer-portrait.png" },
  job: { label: "a job's details", shot: "03-job-detail-portrait.png" },
  discover: { label: "discover people", shot: "04-discover-people-portrait.png" },
  discoverRoles: { label: "discover roles", shot: "05-discover-roles-portrait.png" },
  myProfile: { label: "your profile", shot: "06-my-profile-portrait.png" },
  profile: { label: "a candidate profile", shot: "07-candidate-profile-portrait.png" },
  record: { label: "a candidate's video resume", shot: "08-video-resume-fullscreen-portrait.png" },
  create: { label: "getting ready to apply", shot: "09-create-ready-to-apply-portrait.png" },
  intro: { label: "recording a video resume", shot: "10-video-resume-intro-portrait.png" },
} satisfies Record<string, { label: string; shot: string }>

export type ScreenName = keyof typeof SCREENS

/*
 * Doodled notes per screen, in the frame's 649×1400 space. feed, feedDesign,
 * job, profile, record and discoverRoles reuse the app's welcome-screen notes
 * as-is. Keep notes in the top ~65% of the frame where you can: most sections
 * crop the phone's bottom.
 */
const FEED_NOTES: Note[] = [
  { label: "picked for you", at: [70, 180], tilt: -4, arrow: { from: [250, 175], to: [275, 140], bend: -14 } },
  {
    label: "meet the hiring manager",
    at: [40, 650],
    tilt: -3,
    arrow: { from: [200, 640], to: [290, 500], bend: 40 },
  },
]

const NOTES: Record<ScreenName, Note[]> = {
  feed: FEED_NOTES,
  feedDesign: FEED_NOTES,
  feedBackend: [
    FEED_NOTES[0],
    { label: "pay on every reel", at: [300, 880], tilt: -3, arrow: { from: [420, 926], to: [452, 1074], bend: -20 } },
  ],
  job: [
    { label: "the pay, upfront", at: [320, 150], tilt: 4, arrow: { from: [400, 215], to: [270, 390], bend: -50 } },
    { label: "the team, on video", at: [275, 740], tilt: -3, arrow: { from: [285, 760], to: [170, 720], bend: 30 } },
  ],
  discoverRoles: [
    { label: "search by skill", at: [350, 110], tilt: 4, arrow: { from: [440, 175], to: [400, 240], bend: -16 } },
    {
      label: "every role has a video",
      at: [400, 540],
      tilt: -4,
      maxWidth: 220,
      arrow: { from: [440, 545], to: [395, 505], bend: 10 },
    },
  ],
  create: [
    { label: "start here", at: [330, 606], tilt: 4, arrow: { from: [340, 612], to: [262, 562], bend: 20 } },
    { label: "one step left", at: [380, 735], tilt: -3, arrow: { from: [396, 778], to: [292, 792], bend: -15 } },
  ],
  discover: [
    { label: "search by skill", at: [360, 165], tilt: 4, arrow: { from: [440, 210], to: [400, 252], bend: -12 } },
    {
      label: "every one has a video",
      at: [400, 500],
      tilt: -3,
      maxWidth: 200,
      arrow: { from: [410, 505], to: [345, 448], bend: 14 },
    },
  ],
  profile: [
    { label: "recruiters see this", at: [285, 400], tilt: 3, arrow: { from: [305, 410], to: [160, 360], bend: -30 } },
    {
      label: "your video goes first",
      at: [250, 790],
      tilt: -3,
      arrow: { from: [270, 800], to: [150, 745], bend: 30 },
    },
  ],
  myProfile: [
    {
      label: "your stack, your city",
      at: [35, 220],
      tilt: -4,
      arrow: { from: [110, 268], to: [140, 442], bend: -28 },
    },
    {
      label: "recruiter's view",
      at: [24, 590],
      tilt: -4,
      arrow: { from: [100, 636], to: [160, 656], bend: 12 },
    },
  ],
  record: [
    {
      label: "30–90 sec, just you",
      at: [35, 300],
      tilt: -5,
      maxWidth: 260,
      arrow: { from: [140, 430], to: [230, 540], bend: -30 },
    },
  ],
  intro: [
    { label: "just 30–90 sec", at: [340, 478], tilt: 4, arrow: { from: [340, 506], to: [292, 518], bend: -8 } },
    {
      label: "one take is fine",
      at: [300, 1000],
      tilt: -3,
      arrow: { from: [360, 995], to: [290, 760], bend: 30 },
    },
  ],
}

export function Phone({
  screen,
  zoom = 1,
  eager,
  notes,
  className,
}: {
  screen: ScreenName
  zoom?: number
  /** Load the capture right away, for a phone above the fold. */
  eager?: boolean
  /** Doodle the screen's notes over it, drawn on when it scrolls into view. */
  notes?: boolean
  className?: string
}) {
  const s = SCREENS[screen]
  return (
    <div
      role="img"
      aria-label={`ReelHire app: ${s.label}`}
      style={{ zoom }}
      className={cn("relative h-[604px] w-[280px] shrink-0 drop-shadow-[0_30px_30px_rgb(0_0_0/0.25)]", className)}
    >
      <div className="absolute top-[-4.39%] left-[-10.13%] h-[108.3%] w-[119.48%]">
        <Image src={`${DIR}/${s.shot}`} alt="" fill sizes="340px" loading={eager ? "eager" : "lazy"} />
      </div>
      {notes ? <PhoneNotes notes={NOTES[screen]} /> : null}
    </div>
  )
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
