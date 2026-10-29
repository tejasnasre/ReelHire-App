import type { ReactNode } from "react"

import { AdminSidebar } from "./nav"

/**
 * The authed shell: a fixed sidebar (see {@link AdminSidebar}) plus a content
 * column offset by `lg:pl-64`. Pass `title`/`description` to render the page
 * header; `actions` sits on the right of that header.
 */
export function AdminChrome({
  title,
  description,
  pendingModeration,
  actions,
  children,
}: {
  title?: string
  description?: string
  pendingModeration?: number
  actions?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AdminSidebar title={title} pendingModeration={pendingModeration} />
      <div className="lg:pl-64">
        <main className="w-full max-w-[1680px] px-4 py-6 sm:px-6 lg:px-10">
          {title ? (
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
                {description ? (
                  <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                ) : null}
              </div>
              {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
            </div>
          ) : null}
          {children}
        </main>
      </div>
    </div>
  )
}
