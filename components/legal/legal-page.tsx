import { ArrowDown01Icon, ArrowUp02Icon, Mail01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"

import { DitherBackdrop } from "@/components/landing/dither-backdrop"
import { Eyebrow, Logo } from "@/components/landing/primitives"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { LEGAL_CONTACT_EMAIL, type LegalDoc } from "./content"
import { LegalToc } from "./legal-toc"

const LEGAL_LINKS = [
  { label: "Terms", href: "/terms", title: "Terms of Service" },
  { label: "Privacy", href: "/privacy", title: "Privacy Policy" },
]

export function LegalPage({ doc }: { doc: LegalDoc }) {
  const toc = doc.sections.map(({ id, heading }) => ({ id, heading }))

  return (
    <div id="top" className="min-h-[100dvh] bg-card font-sans">
      <header className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-20 md:px-8">
        <Logo href="/" />
        <nav aria-label="Legal" className="flex rounded-full border bg-background p-1 text-sm">
          {LEGAL_LINKS.map((link) => {
            const current = link.title === doc.title
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-1.5 font-medium transition-colors",
                  current ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-20 md:px-8">
        <div className="max-w-3xl pt-10 md:pt-16">
          <Eyebrow>Last updated {doc.updated}</Eyebrow>
          <h1 className="mt-5 text-4xl font-medium tracking-tight text-balance md:text-6xl">{doc.title}</h1>
          <p className="mt-5 max-w-[65ch] text-lg leading-relaxed text-muted-foreground text-pretty">{doc.intro}</p>
        </div>

        <section aria-labelledby="glance" className="mt-12 md:mt-16">
          <h2 id="glance" className="text-sm font-medium">
            At a glance
          </h2>
          <ul className="mt-4 grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2">
            {doc.highlights.map((item) => (
              <li key={item.title} className="bg-background">
                <a href={`#${item.section}`} className="group flex h-full gap-4 p-6 transition-colors hover:bg-secondary/60">
                  <span className="grid size-10 shrink-0 place-items-center rounded-md bg-foreground text-background">
                    <HugeiconsIcon icon={item.icon} size={18} strokeWidth={1.8} />
                  </span>
                  <span>
                    <span className="block font-medium tracking-tight">{item.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted-foreground text-pretty">
                      {item.body}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-muted-foreground">
            This summary is here to help. The full text below is what applies.
          </p>
        </section>

        <div className="mt-16 grid gap-10 md:mt-20 md:grid-cols-[14rem_1fr] md:gap-16">
          <aside className="md:sticky md:top-8 md:self-start">
            {/* Mobile: folded away so it doesn't push the text a screen down. */}
            <details className="group rounded-xl border bg-background md:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium [&::-webkit-details-marker]:hidden">
                On this page
                <HugeiconsIcon
                  icon={ArrowDown01Icon}
                  size={16}
                  className="text-muted-foreground transition-transform group-open:rotate-180"
                />
              </summary>
              <ol className="space-y-1 border-t px-4 py-3 text-sm text-muted-foreground">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="block py-1 hover:text-foreground">
                      {item.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </details>

            <nav aria-label="On this page" className="hidden md:block">
              <p className="mb-3 text-sm font-medium">On this page</p>
              <LegalToc items={toc} />
              <a
                href="#top"
                className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <HugeiconsIcon icon={ArrowUp02Icon} size={14} />
                Back to top
              </a>
            </nav>
          </aside>

          <article className="min-w-0 max-w-[68ch]">
            {doc.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-8 border-t py-10 first:border-t-0 first:pt-0">
                <h2 className="text-2xl font-medium tracking-tight text-balance">{section.heading}</h2>
                <div className="mt-4 space-y-4 leading-relaxed text-foreground/80">
                  {section.body.map((block, j) =>
                    typeof block === "string" ? (
                      <p
                        key={j}
                        className={cn("text-pretty", block.endsWith(":") && block.length < 50 && "font-medium text-foreground")}
                      >
                        {block}
                      </p>
                    ) : (
                      <ul key={j} className="space-y-2.5">
                        {block.map((item) => (
                          <li key={item} className="relative pl-5 text-pretty">
                            <span
                              aria-hidden
                              className="absolute top-[0.7em] left-0 size-1.5 rounded-[1px] bg-foreground/35"
                            />
                            <ListItem text={item} />
                          </li>
                        ))}
                      </ul>
                    ),
                  )}
                </div>
              </section>
            ))}

            <section
              id="contact"
              className="relative mt-6 scroll-mt-8 overflow-hidden rounded-xl bg-neutral-950 p-7 text-white md:p-9"
            >
              <DitherBackdrop scrim />
              <div className="relative">
                <h2 className="text-2xl font-medium tracking-tight">Questions about any of this?</h2>
                <p className="mt-1.5 max-w-md text-white/65">
                  Email us at {LEGAL_CONTACT_EMAIL} and a real person will get back to you.
                </p>
                <a
                  href={`mailto:${LEGAL_CONTACT_EMAIL}`}
                  className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "mt-8 h-10 gap-2 px-5")}
                >
                  <HugeiconsIcon icon={Mail01Icon} size={16} />
                  Email us
                </a>
              </div>
            </section>
          </article>
        </div>
      </main>

      <footer className="mx-auto max-w-6xl px-4 pb-8 md:px-8">
        <div className="flex flex-col justify-between gap-3 border-t pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© 2026 ReelHire. All rights reserved.</p>
          <ul className="flex gap-5">
            <li>
              <Link href="/" className="transition-colors hover:text-foreground">
                Home
              </Link>
            </li>
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-foreground">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  )
}

/** "Account details: your email…" reads faster with the label set in bold. */
function ListItem({ text }: { text: string }) {
  const colon = text.indexOf(": ")
  if (colon === -1 || colon > 40) return text
  return (
    <>
      <span className="font-medium text-foreground">{text.slice(0, colon + 1)}</span>
      {text.slice(colon + 1)}
    </>
  )
}
