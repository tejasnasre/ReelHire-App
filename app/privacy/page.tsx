import type { Metadata } from "next"

import { PRIVACY } from "@/components/legal/content"
import { LegalPage } from "@/components/legal/legal-page"

// The app and its Google Play listing link here as the full privacy policy.
export const metadata: Metadata = {
  title: "Privacy Policy | ReelHire",
  description: PRIVACY.description,
}

export default function PrivacyPage() {
  return <LegalPage doc={PRIVACY} />
}
