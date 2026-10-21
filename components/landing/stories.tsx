import { cacheLife } from "next/cache"

import { TweetCard } from "@/components/ui/tweet-card"

import { REVIEWS, TWEET_IDS } from "./data"
import { Eyebrow, Monogram, SectionTitle } from "./primitives"
import { ReelStrip } from "./reel-strip"
import { ReviewWall } from "./review-wall"

export function Stories() {
  return (
    <section className="overflow-hidden py-20 md:py-28">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 text-center md:px-8">
        <Eyebrow>Stories</Eyebrow>
        <SectionTitle className="mt-4" lead="Careers moving" tail="one reel at a time." />
        <p className="mt-4 max-w-md text-muted-foreground text-pretty">
          Candidates, recruiters and founders from our pilot on what changes when the first impression is a reel.
        </p>
      </div>
      <ReelStrip />
      <ReviewWall>
        {TWEET_IDS.length > 0
          ? TWEET_IDS.map((id) => <Tweet key={id} id={id} />)
          : REVIEWS.map((review) => <ReviewCard key={review.name} review={review} />)}
      </ReviewWall>
    </section>
  )
}

// Cached so tweets are fetched once and land in the static shell.
async function Tweet({ id }: { id: string }) {
  "use cache"
  cacheLife("days")
  return <TweetCard id={id} className="mb-4 max-w-none break-inside-avoid bg-background shadow-xs" />
}

function ReviewCard({ review }: { review: (typeof REVIEWS)[number] }) {
  return (
    <figure className="mb-4 break-inside-avoid rounded-xl border bg-background p-5 shadow-xs">
      <figcaption className="flex items-center gap-3">
        <Monogram name={review.name} />
        <div className="flex-1">
          <p className="text-sm font-medium">{review.name}</p>
          <p className="text-xs text-muted-foreground">{review.role}</p>
        </div>
      </figcaption>
      <p className="mt-4 font-medium">{review.title}</p>
      <blockquote className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        &ldquo;{review.body}&rdquo;
      </blockquote>
      <p className="mt-4 text-xs text-muted-foreground">{review.date}</p>
    </figure>
  )
}
