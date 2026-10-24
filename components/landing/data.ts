import {
  Analytics01Icon,
  Briefcase01Icon,
  Building03Icon,
  CodeIcon,
  FilterHorizontalIcon,
  Message01Icon,
  Mic01Icon,
  Rocket01Icon,
  Shield01Icon,
  TextIcon,
  UserGroupIcon,
  Video01Icon,
} from "@hugeicons/core-free-icons"
import type { IconSvgElement } from "@hugeicons/react"

import { CONTACT_HREF, LANDING_PLAY_URL } from "@/lib/app-links"

import type { ScreenName } from "./phone"

export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
]

export const FEATURE_CHIPS: { label: string; icon: IconSvgElement }[] = [
  { label: "Video resumes", icon: Video01Icon },
  { label: "Job reels", icon: Briefcase01Icon },
  { label: "Stack & level filters", icon: FilterHorizontalIcon },
  { label: "Searchable transcripts", icon: TextIcon },
  { label: "In-app chat", icon: Message01Icon },
  { label: "Applicant pipeline", icon: Analytics01Icon },
  { label: "Guided recording", icon: Mic01Icon },
  { label: "Block & report", icon: Shield01Icon },
]

export type Persona = {
  id: string
  label: string
  icon: IconSvgElement
  title: string
  body: string
  stat?: { value: number; suffix?: string; label: string }
  points: string[]
  screen: ScreenName
}

export const PERSONAS: Persona[] = [
  {
    id: "seekers",
    label: "Job seekers",
    icon: CodeIcon,
    title: "Show how you think, not just where you've worked.",
    body: "Your reel is your application. Record a short pitch or walk through something you built, and it plays first on your profile, with your stack, experience and links right below it.",
    stat: { value: 90, suffix: "s", label: "Max reel length" },
    points: ["Guided intro → experience → close", "Re-record any time", "Track every application"],
    screen: "intro",
  },
  {
    id: "recruiters",
    label: "Recruiters",
    icon: UserGroupIcon,
    title: "Screen for communication before the first call.",
    body: "Every applicant arrives with a reel, so you hear how they explain their work before you book a call. Filter by stack, level and location, watch the shortlist, and move people from New to Hired in one place.",
    stat: { value: 5, label: "Pipeline stages" },
    points: ["Every applicant has a reel", "Filter, then watch", "One-tap shortlist"],
    screen: "discover",
  },
  {
    id: "founders",
    label: "Startup founders",
    icon: Rocket01Icon,
    title: "Pitch the mission in your own voice.",
    body: "A copy-paste JD can't say why your team is worth joining. A 60-second reel from the founder can. Every job on ReelHire is posted as a reel, and it reaches people who care about the stack you use.",
    points: ["Film a job reel on your phone", "Post in minutes", "Reach tech talent only"],
    screen: "feed",
  },
  {
    id: "managers",
    label: "Hiring managers",
    icon: Building03Icon,
    title: "Talk to the people you'd actually work with.",
    body: "Message candidates straight from their reel, line up interviews and keep the context, from first watch to offer, in one thread.",
    points: ["Chat from any reel", "Interview invites in-thread", "Context stays with the candidate"],
    screen: "profile",
  },
]

// Team pricing isn't decided yet, so paid plans show "Coming soon".
export const PLANS = [
  {
    name: "Seeker",
    blurb: "For engineers, designers and PMs looking for their next role.",
    free: true,
    cta: "Get started",
    href: LANDING_PLAY_URL,
    features: [
      "Video resume with unlimited re-records",
      "Swipe to apply on any job reel",
      "Track applications from Sent to Hired",
      "Chat with recruiters in-app",
      "Block and report controls",
    ],
  },
  {
    name: "Recruiter",
    blurb: "For individual recruiters and hiring managers.",
    cta: "Start hiring",
    href: LANDING_PLAY_URL,
    popular: true,
    features: [
      "Everything in Seeker",
      "Up to 5 active job reels",
      "Applicant pipeline, New → Hired",
      "Stack, level and location filters",
      "Candidate search and shortlists",
    ],
  },
  {
    name: "Startup",
    blurb: "For founders hiring fast across several roles.",
    cta: "Contact us",
    href: CONTACT_HREF,
    features: [
      "Everything in Recruiter",
      "Unlimited job reels",
      "Insights for every opening",
      "Featured placement in the feed",
      "Priority support",
    ],
  },
]

export const FAQS = [
  {
    q: "Who is ReelHire for?",
    a: "Tech roles only: engineers, designers, product managers and the startups and teams hiring them. Keeping it focused means every reel in your feed is relevant.",
  },
  {
    q: "Do I need a video to apply?",
    a: "Yes. ReelHire is video-first: every application starts with your reel. It's the first thing a team sees, so it's what gets you noticed. The guided recorder makes it quick even if you've never filmed yourself.",
  },
  {
    q: "How long should my video resume be?",
    a: "Between 20 and 90 seconds. Most strong reels land around a minute: a quick intro, one or two things you've built or shipped, and what you're looking for next.",
  },
  {
    q: "I've never recorded myself. Where do I start?",
    a: "The recorder walks you through an intro → experience → close structure, and you can trim, re-record or replace your reel whenever you like.",
  },
  {
    q: "Do companies have to film a video?",
    a: "Yes. Every job on ReelHire is posted as a reel. Candidates record one to apply, so teams pitch back the same way. A phone and 60 seconds is enough: who you are, what you're building and who you're looking for.",
  },
  {
    q: "Can recruiters still filter like they normally do?",
    a: "Yes. Every reel comes with structured profile data: stack, experience, role level and location. Filter down to the people who fit, then let their reels show you who to talk to first.",
  },
  {
    q: "How do I know where my application stands?",
    a: "Every application shows its live status: Sent, Shortlisted, Interview, Hired or Not selected. You can withdraw any time before a decision is made.",
  },
  {
    q: "What if someone makes me uncomfortable?",
    a: "You can block or report any account from their profile or a conversation. Blocked accounts can't see you or message you.",
  },
  {
    q: "Is ReelHire free?",
    a: "Free for job seekers, always. Recruiters and startups pick a plan when they're ready to post openings.",
  },
]

export const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact us", href: CONTACT_HREF },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
]
