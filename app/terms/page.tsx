import type { Metadata } from "next"

import { TERMS } from "@/components/legal/content"
import { LegalPage } from "@/components/legal/legal-page"

// The app links here as the full version of its in-app summary.
export const metadata: Metadata = {
  title: "Terms of Service | ReelHire",
  description: TERMS.description,
}

export default function TermsPage() {
  return <LegalPage doc={TERMS} />
}
