import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"

import { BlackButton, DotGrid, Logo, PlayStoreButton, SectionTitle } from "@/components/landing/primitives"
import { JOB_ID_PATTERN, openInAppUrl, playStoreUrl } from "@/lib/app-links"
import { getJobPreview, type JobPreview } from "@/lib/job-preview"

const FALLBACK_TITLE = "A job on ReelHire"
const DESCRIPTION = "Watch the role and apply with a video resume on ReelHire."

/**
 * The link preview chat apps show. WhatsApp, LinkedIn, Slack and the like
 * are on Next's HTML-limited bot list, so for them this blocks and lands in
 * `<head>` rather than streaming.
 */
export async function generateMetadata({ params }: PageProps<"/opening/[id]">): Promise<Metadata> {
  const { id } = await params
  // Here too, not just in `SharedJob`: for the bots above metadata blocks,
  // so this is what gets them a real 404 status rather than a streamed one.
  if (!JOB_ID_PATTERN.test(id)) notFound()
  const job = await getJobPreview(id)
  const title = job ? headline(job) : FALLBACK_TITLE
  const description = job ? [details(job), DESCRIPTION].filter(Boolean).join(" · ") : DESCRIPTION
  return {
    title,
    description,
    openGraph: { title, description, siteName: "ReelHire" },
    // One page per job id: nothing here worth indexing.
    robots: { index: false, follow: true },
  }
}

/**
 * Landing spot for a shared job link (`https://reelhire.xyz/opening/<id>`)
 * when the app didn't open it: no app installed, an in-app browser that
 * doesn't hand App Links over, or a desktop. See `lib/app-links.ts`.
 */
export default function OpeningPage({ params }: PageProps<"/opening/[id]">) {
  return (
    <div className="relative grid min-h-svh place-items-center bg-card px-4 py-16 font-sans">
      <div className="relative w-full max-w-md overflow-hidden rounded-xl border bg-background p-8 text-center md:p-10">
        <DotGrid className="[mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="relative flex flex-col items-center">
          <Logo href="/" />
          {/* The id is runtime data under Cache Components, so everything
              that needs it streams in; the fallback is the generic page. */}
          <Suspense fallback={<GenericJob />}>
            {params.then(({ id }) => (
              <SharedJob id={id} />
            ))}
          </Suspense>
          <p className="mt-6 text-xs text-muted-foreground">ReelHire is on Android. Open this link on your phone.</p>
        </div>
      </div>
    </div>
  )
}

async function SharedJob({ id }: { id: string }) {
  if (!JOB_ID_PATTERN.test(id)) notFound()
  const job = await getJobPreview(id)
  const appPath = `/opening/${id}`
  return (
    <>
      {job ? (
        <>
          <p className="mt-8 text-sm font-medium text-muted-foreground">Someone shared a job with you</p>
          <h1 className="mt-2 text-3xl font-medium tracking-tight text-balance md:text-4xl">{job.title}</h1>
          {job.companyName ? <p className="mt-2 text-lg text-muted-foreground">{job.companyName}</p> : null}
          {details(job) ? <p className="mt-1 text-sm text-muted-foreground">{details(job)}</p> : null}
        </>
      ) : (
        <GenericHeading />
      )}
      <p className="mt-4 text-muted-foreground text-pretty">
        Watch the role in ReelHire and apply with a short video resume.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3">
        <BlackButton href={openInAppUrl(appPath)} className="h-12 px-6">
          Open in ReelHire
        </BlackButton>
        <a
          href={playStoreUrl(appPath)}
          className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Don&rsquo;t have it? Get it on Google Play
        </a>
      </div>
    </>
  )
}

function GenericHeading() {
  return <SectionTitle as="h1" lead="Someone shared a job" tail=" with you." className="mt-8 text-3xl md:text-4xl" />
}

function GenericJob() {
  return (
    <>
      <GenericHeading />
      <p className="mt-4 text-muted-foreground text-pretty">
        Watch the role in ReelHire and apply with a short video resume.
      </p>
      <PlayStoreButton href={playStoreUrl()} className="mt-8" />
    </>
  )
}

function headline(job: JobPreview) {
  return job.companyName ? `${job.title} at ${job.companyName}` : job.title
}

function details(job: JobPreview) {
  return [job.location, job.workMode].filter(Boolean).join(" · ")
}
