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

// Brand marks from simple-icons (CC0), stored in public/logos.
export const STACK_LOGOS = [
  "React",
  "TypeScript",
  "Next.js",
  "Node.js",
  "Python",
  "Go",
  "Rust",
  "Kotlin",
  "Swift",
  "Flutter",
  "Figma",
  "PostgreSQL",
  "GraphQL",
  "Docker",
  "Kubernetes",
  "Tailwind CSS",
].map((name) => ({
  alt: name,
  src: `/logos/${name.toLowerCase().replace(/\./g, "dot").replace(/\s/g, "")}.svg`,
  width: 20,
  height: 20,
}))

export type Persona = {
  id: string
  label: string
  icon: IconSvgElement
  title: string
  body: string
  stat?: { value: number; suffix?: string; label: string }
  points: string[]
  screen: "feed" | "applicants" | "record" | "chat"
}

export const PERSONAS: Persona[] = [
  {
    id: "seekers",
    label: "Job seekers",
    icon: CodeIcon,
    title: "Show how you think, not just where you've worked.",
    body: "Record a short pitch or walk through something you built. Your reel sits on top of your stack, experience and links, so you're filterable and memorable.",
    stat: { value: 90, suffix: "s", label: "Max reel length" },
    points: ["Guided intro → experience → close", "Re-record any time", "Track every application"],
    screen: "record",
  },
  {
    id: "recruiters",
    label: "Recruiters",
    icon: UserGroupIcon,
    title: "Screen for communication before the first call.",
    body: "Filter by stack, level and location first, then watch the shortlist. Move people from New to Hired without leaving the app.",
    stat: { value: 5, label: "Pipeline stages" },
    points: ["Filters before video", "One-tap shortlist", "Applicant reels in one queue"],
    screen: "applicants",
  },
  {
    id: "founders",
    label: "Startup founders",
    icon: Rocket01Icon,
    title: "Pitch the mission in your own voice.",
    body: "A copy-paste JD can't say why your team is worth joining. A 60-second reel from the founder can, and it reaches people who care about the stack you use.",
    points: ["Post a job in minutes", "Video is optional", "Reach tech talent only"],
    screen: "feed",
  },
  {
    id: "managers",
    label: "Hiring managers",
    icon: Building03Icon,
    title: "Talk to the people you'd actually work with.",
    body: "Message candidates straight from their reel, line up interviews and keep the context, from first watch to offer, in one thread.",
    points: ["Chat from any reel", "Interview invites in-thread", "Context stays with the candidate"],
    screen: "chat",
  },
]

// Placeholder quotes: swap these for real pilot feedback before launch.
export const REEL_STORIES = [
  { name: "Ananya R.", role: "Frontend Engineer", quote: "I walked through my side project in 70 seconds. Two founders messaged me the same week." },
  { name: "Marcus T.", role: "Engineering Lead", quote: "I can tell in the first ten seconds whether someone can explain a trade-off. That used to take a call." },
  { name: "Priya S.", role: "Product Designer", quote: "My portfolio finally has a voice. Recruiters reply to the reel, not the PDF." },
  { name: "Daniel K.", role: "Founder, seed-stage", quote: "Our job reel got more thoughtful applicants than six months of text listings." },
  { name: "Lena W.", role: "Backend Engineer", quote: "Filters first, then video. It feels built by people who have actually hired engineers." },
  { name: "Omar H.", role: "Technical Recruiter", quote: "Shortlisting from reels is fast, and the pipeline keeps everyone on the same page." },
  { name: "Sofia M.", role: "Product Manager", quote: "Swipe, watch, apply. It's the first job app I didn't dread opening." },
]

// Tweet IDs (the number at the end of an x.com/<user>/status/<id> URL) shown on
// the review wall. While this is empty the wall falls back to REVIEWS below.
// Only add real posts about ReelHire: anything here reads as an endorsement.
export const TWEET_IDS: string[] = []

// Placeholder reviews: swap these for real pilot feedback before launch.
export const REVIEWS = [
  { name: "Rohan P.", role: "Full-stack Engineer", title: "Finally, signal", body: "My resume looked like everyone else's. A two-minute demo of my CLI tool did what three pages couldn't.", date: "Aug 14, 2026" },
  { name: "Jess L.", role: "Talent Partner", title: "Faster first rounds", body: "I watch the reel before booking anything. The calls I do take are with people I already want to talk to.", date: "Sep 2, 2026" },
  { name: "Kenji A.", role: "iOS Engineer", title: "Feels native", body: "Recording, trimming and uploading all happen in the app. No editing software, no awkward links.", date: "Jul 28, 2026" },
  { name: "Maya G.", role: "Design Lead", title: "Culture fit, early", body: "You can hear how someone gives feedback in the way they talk about their own work. That matters on a small team.", date: "Sep 19, 2026" },
  { name: "Tom B.", role: "CTO, Series A", title: "Our JD, in our voice", body: "We filmed the role on a phone in the office. Applicants mentioned details from it in their first message.", date: "Aug 30, 2026" },
  { name: "Ines F.", role: "Junior Developer", title: "A fair shot", body: "No referrals, no big-name employer. The reel let me show I can explain what I build.", date: "Sep 8, 2026" },
  { name: "Arjun V.", role: "Data Engineer", title: "Status I can see", body: "I know when I've been shortlisted or moved to interview. No more applying into a void.", date: "Jul 11, 2026" },
  { name: "Claire D.", role: "Recruiting Ops", title: "Filters that work", body: "Stack, level and location narrow it down. The reel helps me pick between people who already fit.", date: "Sep 25, 2026" },
  { name: "Sam O.", role: "Product Engineer", title: "Less busywork", body: "One profile, one reel, swipe to apply. I spent my time preparing for interviews instead of rewriting cover letters.", date: "Aug 6, 2026" },
]

// Placeholder pricing: confirm plans and numbers before launch.
export const PLANS = [
  {
    name: "Seeker",
    blurb: "For engineers, designers and PMs looking for their next role.",
    monthly: 0,
    yearly: 0,
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
    monthly: 29,
    yearly: 23,
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
    monthly: 79,
    yearly: 63,
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
    q: "How long should my video resume be?",
    a: "Between 20 and 90 seconds. Most strong reels land around a minute: a quick intro, one or two things you've built or shipped, and what you're looking for next.",
  },
  {
    q: "I've never recorded myself. Where do I start?",
    a: "The recorder walks you through an intro → experience → close structure, and you can trim, re-record or replace your reel whenever you like.",
  },
  {
    q: "Do companies have to film a video?",
    a: "No. Video is optional for job posts. A short reel from the team usually gets more thoughtful applicants, but a well-written listing works too.",
  },
  {
    q: "Can recruiters still filter like they normally do?",
    a: "Yes. Stack, experience, role level and location come first. Video sits on top of structured profile data, not in place of it.",
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

// Journal section is off the page until real posts exist (see journal.tsx).
export const POSTS = [
  {
    tag: "Video resumes",
    title: "How to record a 60-second reel that gets replies",
    date: "Oct 2, 2026",
    read: "5 min read",
  },
  {
    tag: "For recruiters",
    title: "What to watch for in the first ten seconds of a candidate reel",
    date: "Sep 24, 2026",
    read: "4 min read",
  },
  {
    tag: "Startups",
    title: "A script template for founders filming their first job reel",
    date: "Sep 12, 2026",
    read: "6 min read",
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
