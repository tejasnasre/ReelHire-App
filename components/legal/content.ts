// The full, canonical Terms and Privacy Policy. The app shows a short summary
// of each (app/src/features/legal/content.ts) and links here for the rest, so
// keep the two in step: a material change here means bumping LEGAL_VERSION in
// the app so members are asked to accept again.

import {
  Camera01Icon,
  CopyrightIcon,
  Delete02Icon,
  Flag02Icon,
  MoneyNotFound01Icon,
  SecurityLockIcon,
  ViewOffSlashIcon,
} from "@hugeicons/core-free-icons"
import type { IconSvgElement } from "@hugeicons/react"

export const LEGAL_CONTACT_EMAIL = "support@reelhire.xyz"

/** A paragraph, or a bulleted list when it's an array. */
export type LegalBlock = string | string[]

export type LegalSection = {
  id: string
  heading: string
  body: LegalBlock[]
}

/** One line of the "at a glance" summary. It restates a section, never adds to it. */
export type LegalHighlight = {
  icon: IconSvgElement
  title: string
  body: string
  /** The section that says this in full. */
  section: string
}

export type LegalDoc = {
  title: string
  description: string
  updated: string
  intro: string
  highlights: LegalHighlight[]
  sections: LegalSection[]
}

export const TERMS: LegalDoc = {
  title: "Terms of Service",
  description: "The rules for using ReelHire, the reels-style hiring app for tech roles.",
  updated: "October 20, 2026",
  intro:
    "These terms are an agreement between you and ReelHire. They cover the ReelHire app and reelhire.xyz. We've kept them as plain as we can. Please read them, because by using ReelHire you agree to them.",
  highlights: [
    {
      icon: CopyrightIcon,
      title: "You own your content",
      body: "Your reels, resume and job posts stay yours. We only use them to run ReelHire.",
      section: "content",
    },
    {
      icon: MoneyNotFound01Icon,
      title: "Candidates never pay to get hired",
      body: "Recruiters can't charge fees to apply, interview or be hired.",
      section: "recruiters",
    },
    {
      icon: Flag02Icon,
      title: "Block or report anyone",
      body: "We review reports and remove fake jobs, scams and abuse.",
      section: "safety",
    },
    {
      icon: Delete02Icon,
      title: "Leave whenever you like",
      body: "Delete your account in Settings and your data goes with it.",
      section: "ending",
    },
  ],
  sections: [
    {
      id: "agreeing",
      heading: "Agreeing to these terms",
      body: [
        "By creating an account or using ReelHire, you agree to these Terms of Service and to our Privacy Policy. If you don't agree, don't use ReelHire.",
        "If you use ReelHire on behalf of a company, you confirm you're allowed to accept these terms for that company, and \"you\" includes the company.",
      ],
    },
    {
      id: "eligibility",
      heading: "Who can use ReelHire",
      body: [
        "You must be at least 16 years old, and old enough to work in the country where you're looking for work. If you're under the age of majority where you live, you need a parent's or guardian's permission.",
        "You can't use ReelHire if we've previously banned you, or if the law where you live doesn't allow it.",
      ],
    },
    {
      id: "account",
      heading: "Your account",
      body: [
        "You can sign up with email and password, Google, or GitHub. Keep your login details private. You're responsible for everything that happens under your account, so tell us right away at the address below if you think someone else has used it.",
        "Give accurate information about yourself and keep it up to date. That means your name, experience and skills and, if you recruit, your company and the jobs you post. One person, one account. Don't create accounts for someone else without their permission.",
      ],
    },
    {
      id: "candidates",
      heading: "If you're looking for work",
      body: [
        "Your profile, video resume and applications should be about you and your own work. Only show projects, code and designs you have the right to share, and don't include confidential information from a current or past employer.",
        "When you apply to a job, the recruiter who posted it sees the profile, video resume and anything else you send with the application. You can withdraw an application any time before a decision is made.",
      ],
    },
    {
      id: "recruiters",
      heading: "If you're hiring",
      body: [
        "Only post real, open roles you're authorised to hire for, and describe the role, company, location and pay honestly. When you post a job you agree to:",
        [
          "never charge candidates a fee to apply, interview, train or be hired",
          "follow the employment and anti-discrimination laws that apply to you, and make hiring decisions on job-related grounds, not on someone's appearance, accent, age, gender, religion, ethnicity, disability or other protected characteristic",
          "use candidate information only to assess them for the role they applied to or that you contacted them about, keep it secure, and delete it when you no longer need it for that",
          "not export, scrape or resell candidate profiles or videos, or add candidates to mailing lists without their consent",
        ],
        "A verified badge means we've checked some details about a company. It isn't an endorsement, and we can remove it at any time.",
      ],
    },
    {
      id: "content",
      heading: "Your content",
      body: [
        "You own the video reels, video resumes, photos, resumes, job posts, messages and other content you upload. We don't claim ownership of any of it.",
        "So that ReelHire can work, you give us a worldwide, non-exclusive, royalty-free licence to host, store, copy, process (for example by compressing or transcoding video), display and share your content within ReelHire. For example, we show your reel to recruiters or your job post to candidates. If you share a job link, we may show a preview of it outside the app.",
        "This licence ends when you delete the content or your account. It doesn't cover copies kept for a limited time in backups or where the law requires it, or content you've already shared with someone, such as an application you sent or a message.",
        "You're responsible for your content, and you confirm you have the rights to everything in it, including any music, logos or other people who appear in your videos.",
      ],
    },
    {
      id: "conduct",
      heading: "What you can't do",
      body: [
        "To keep ReelHire safe and useful, don't:",
        [
          "post anything illegal, hateful, sexually explicit, violent, defamatory or misleading, or that infringes someone else's rights",
          "post fake jobs, pyramid schemes or \"opportunities\" that are really sales, or ask anyone for money, bank details or ID documents outside a genuine hiring process",
          "harass, threaten, discriminate against, spam or impersonate anyone",
          "collect other members' personal data for anything other than hiring through ReelHire",
          "scrape, copy or bulk download content, use bots or automated accounts, or get around blocks, limits or security features",
          "reverse engineer, overload or disrupt the app or the systems behind it, or upload malware",
          "use ReelHire to build a competing service",
        ],
      ],
    },
    {
      id: "hiring",
      heading: "Hiring happens between you",
      body: [
        "ReelHire is a platform that connects candidates and recruiters. We're not an employer, recruiter or staffing agency. We aren't part of any job offer or employment contract, and we don't guarantee that any job will be filled or that anyone will be hired.",
        "We don't check every profile, job post or message, and we can't promise that they're accurate. Do your own checks before you share sensitive information, travel to an interview or accept an offer. A genuine employer will never ask you to pay to get a job.",
      ],
    },
    {
      id: "safety",
      heading: "Safety and moderation",
      body: [
        "You can block or report any account, job post or video from inside the app. Blocked accounts can't see your profile or message you.",
        "We review reports and may remove content, remove a verified badge, or limit, suspend or close accounts that break these terms or put other members at risk. Where we reasonably can, we'll tell you what we did and why. If you think we got it wrong, email us and we'll take another look.",
      ],
    },
    {
      id: "plans",
      heading: "Paid plans",
      body: [
        "ReelHire is free for job seekers. Recruiters and companies may need a paid plan to post openings. Before you pay, we'll show you the price, what the plan includes, how often you'll be billed and how to cancel. Those details form part of these terms.",
      ],
    },
    {
      id: "ours",
      heading: "Our app and brand",
      body: [
        "Apart from your content, ReelHire and everything in it, including the app, the website, our designs, code, logos and the ReelHire name, belongs to us or our licensors. You can use the app as intended, but you can't copy, modify or redistribute it.",
        "If you send us feedback or ideas, we can use them without owing you anything.",
      ],
    },
    {
      id: "third-parties",
      heading: "Other services",
      body: [
        "ReelHire relies on other services, such as Google and GitHub for sign-in and Google Play for downloads, and members may share links to other sites. Your use of those services is covered by their own terms, and we aren't responsible for them.",
      ],
    },
    {
      id: "ending",
      heading: "Ending your account",
      body: [
        "You can delete your account at any time in Settings. This permanently deletes your profiles, reels, job posts and applications, as described in our Privacy Policy.",
        "We may suspend or close your account if you break these terms, if the law requires it, or if your account puts other members or ReelHire at risk. Sections that by their nature should continue, such as content you've already shared, disclaimers and limits of liability, still apply after your account ends.",
      ],
    },
    {
      id: "disclaimers",
      heading: "Disclaimers",
      body: [
        "We work hard to keep ReelHire running well, but it's provided \"as is\" and \"as available\". To the extent the law allows, we don't make promises that it will always be available, free of errors or right for your purposes, or about the content, conduct or claims of other members.",
      ],
    },
    {
      id: "liability",
      heading: "Limits on our liability",
      body: [
        "To the extent the law allows, ReelHire isn't liable for indirect, incidental, special or consequential losses, or for lost profits, earnings, data or opportunities, including a job you didn't get or a hire that didn't work out. We're also not liable for what other members post, say or do.",
        "To the extent the law allows, our total liability to you for any claim about ReelHire is limited to the greater of the amount you paid us in the 12 months before the claim, or USD 100.",
        "Nothing in these terms limits liability that can't be limited by law, or takes away rights you have under consumer protection law where you live.",
      ],
    },
    {
      id: "indemnity",
      heading: "Your responsibility to us",
      body: [
        "If someone brings a claim against ReelHire because of content you posted, a job you advertised, a hiring decision you made or a breach of these terms by you, you agree to cover the reasonable losses and costs that result, to the extent the law allows.",
      ],
    },
    {
      id: "changes",
      heading: "Changes to these terms",
      body: [
        "We may update these terms as ReelHire grows. When we do, we'll change the date at the top of this page. If a change is significant, we'll tell you in the app and ask you to accept the new version before you keep using ReelHire. If you don't agree, you can delete your account.",
      ],
    },
    {
      id: "general",
      heading: "The legal bits",
      body: [
        "If any part of these terms can't be enforced, the rest still applies. If we don't enforce a term straight away, we haven't waived our right to enforce it later. You can't transfer your rights under these terms to anyone else. We may transfer ours, for example if ReelHire is sold or reorganised. These terms and our Privacy Policy are the whole agreement between us about ReelHire.",
      ],
    },
  ],
}

export const PRIVACY: LegalDoc = {
  title: "Privacy Policy",
  description: "What ReelHire collects, how it's used, who can see it and the choices you have.",
  updated: "October 20, 2026",
  intro:
    "ReelHire is built around video, and putting yourself on camera takes trust. This policy explains what we collect when you use the ReelHire app and reelhire.xyz, why we collect it, who can see it and how you stay in control. The short version: we use your data to run ReelHire and keep it safe, and we never sell it.",
  highlights: [
    {
      icon: SecurityLockIcon,
      title: "We never sell your data",
      body: "And we don't use it for third-party advertising.",
      section: "use",
    },
    {
      icon: Camera01Icon,
      title: "Camera only while you record",
      body: "Nothing is ever recorded in the background.",
      section: "camera",
    },
    {
      icon: ViewOffSlashIcon,
      title: "Hide from search any time",
      body: "Turn off Show me in search and only recruiters you apply to see you.",
      section: "visibility",
    },
    {
      icon: Delete02Icon,
      title: "Delete everything in Settings",
      body: "Your profile, reels, resume and applications go with your account.",
      section: "retention",
    },
  ],
  sections: [
    {
      id: "collect",
      heading: "What we collect",
      body: [
        "Information you give us:",
        [
          "Account details: your email address, name and how you sign in (email and password, Google or GitHub). If you sign in with Google or GitHub, we receive your name, email address and profile picture from them, but never your password.",
          "Candidate profile: your photo, headline, location, experience, role level, skills and tech stack, links, project images, resume file and video resume.",
          "Recruiter profile: your role, company name and details, job posts and job video reels.",
          "Messages and applications: the messages you send, the applications you submit and their status.",
          "Reports and support requests: what you tell us when you report something or contact us.",
        ],
        "Information we collect as you use ReelHire:",
        [
          "Activity: the jobs and reels you view, save and apply to, the applicants you review, the people you block and your settings.",
          "Device and diagnostics: device model, operating system and app version, your IP address, crash reports, performance traces and the screens you visited just before a crash.",
          "Notifications: a push notification token for your device, if you allow notifications.",
        ],
      ],
    },
    {
      id: "camera",
      heading: "Camera, microphone and photos",
      body: [
        "ReelHire only uses your camera and microphone while you're recording a reel, and your photo library only when you choose an image or video to upload. We never record in the background, and you can turn these permissions off at any time in your phone's settings.",
        "Your videos show your face and voice. Only upload what you're comfortable with recruiters and other members seeing.",
      ],
    },
    {
      id: "use",
      heading: "How we use your information",
      body: [
        [
          "To run ReelHire: create your account, show your profile and reels, match candidates with jobs, deliver applications and messages, and process and store your videos.",
          "To keep you posted: send emails and push notifications about your applications, applicants, messages, job deadlines and your account.",
          "To keep members safe: detect spam, fake jobs, scams and abuse, verify companies, and act on reports.",
          "To fix and improve the app: diagnose crashes and bugs, and understand which features are used.",
          "To meet legal obligations, and to protect our rights and the rights of our members.",
        ],
        "Where the law asks for a legal basis, we rely on performing our contract with you (running ReelHire), our legitimate interests (safety, security and improving the app), your consent (such as camera access and push notifications, which you can withdraw), and our legal obligations.",
        "We don't sell your personal data, and we don't use it for third-party advertising.",
      ],
    },
    {
      id: "visibility",
      heading: "Who can see your information",
      body: [
        [
          "Candidate profiles: recruiters and other members can find your profile and video resume in Discover. To stop this, turn off Show me in search in Settings.",
          "Applications: recruiters you apply to always see the profile, video resume and anything else you send them, even if you're hidden from search.",
          "Job posts and recruiter profiles are visible to all members. If you share a job link, anyone with the link can see a preview of the job title, company and location.",
          "Messages can be seen only by you and the people you're talking to, except when we need to review a conversation that's been reported to us.",
          "Accounts you block can't see your profile or message you.",
        ],
        "Remember that anyone who sees your content could screenshot or record it. That's why we ask everyone to use candidate information only for hiring.",
      ],
    },
    {
      id: "providers",
      heading: "Service providers",
      body: [
        "We use trusted companies to run ReelHire. They process data only on our behalf and under our instructions:",
        [
          "Clerk, for sign-in and account security",
          "Supabase, for our database and for storing videos, photos and files",
          "Resend, for sending emails",
          "Expo and Google Firebase Cloud Messaging, for delivering push notifications and app updates",
          "Sentry, for crash reports and performance diagnostics",
          "Google and GitHub, if you choose to sign in with them",
        ],
        "We may also share information if the law requires it, to protect someone's safety, or as part of a merger or sale of ReelHire. If that happens, this policy will still protect your data.",
      ],
    },
    {
      id: "transfers",
      heading: "Where your data is stored",
      body: [
        "Our providers run servers in several countries, including the United States, so your data may be stored or processed outside the country where you live. Where the law requires it, we rely on appropriate safeguards, such as standard contractual clauses, for these transfers.",
      ],
    },
    {
      id: "retention",
      heading: "How long we keep it",
      body: [
        "We keep your data while your account is active. When you delete your account in Settings, we delete your profiles, reels, photos, resume, job posts, applications and saved items, and remove your sign-in account.",
        "A few things can last longer. Messages and applications you sent stay with the people who received them. Copies in backups are removed on a rolling schedule. We may keep a limited record of reports and enforcement actions to stop banned members from returning, and anything else the law requires us to keep.",
      ],
    },
    {
      id: "choices",
      heading: "Your choices",
      body: [
        [
          "Edit or remove your profile, reels and job posts at any time in the app.",
          "Hide your candidate profile from search with Show me in search in Settings.",
          "Choose which push notifications you get in Settings, or turn them off in your phone's settings.",
          "Unsubscribe from each type of email using the link at the bottom of that email. We'll still send essential account and security emails.",
          "Delete your account and its data at any time in Settings.",
        ],
      ],
    },
    {
      id: "rights",
      heading: "Your rights",
      body: [
        "Depending on where you live, including the EU, the UK, India and some US states, you may have the right to access the personal data we hold about you, correct it, delete it, get a copy in a portable format, object to or restrict how we use it, and withdraw consent you've given. You can also nominate someone to act for you.",
        "To make a request, email us at the address below. We'll respond within the time the law requires and won't treat you differently for exercising your rights. If you're not happy with our answer, you can complain to your local data protection authority.",
      ],
    },
    {
      id: "security",
      heading: "Security",
      body: [
        "Data is encrypted in transit. Access to it is restricted so that each member can reach only what they're allowed to see, and our team's access is limited to what they need. No system is perfectly secure, so use a strong, unique password and tell us right away if you think your account has been compromised. If a breach affects your data, we'll notify you and the authorities as the law requires.",
      ],
    },
    {
      id: "website",
      heading: "Our website",
      body: [
        "reelhire.xyz doesn't use advertising cookies or third-party tracking. Like most websites, our hosting provider records basic technical logs, such as your IP address and browser type, to keep the site running and secure.",
      ],
    },
    {
      id: "children",
      heading: "Children",
      body: [
        "ReelHire isn't for anyone under 16, and we don't knowingly collect their data. If you believe a child has created an account, email us and we'll delete it.",
      ],
    },
    {
      id: "changes",
      heading: "Changes to this policy",
      body: [
        "We may update this policy. When we do, we'll change the date at the top of this page. If a change is significant, we'll tell you in the app and ask you to accept the new version.",
      ],
    },
  ],
}
