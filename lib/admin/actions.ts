"use server"

import { revalidatePath } from "next/cache"

import { requireAdmin } from "./auth"
import { sbPatch } from "./supabase"

const REPORT_STATUSES = new Set(["open", "reviewing", "actioned", "dismissed"])

/** Move a report through the moderation pipeline. Re-verifies admin server-side. */
export async function setReportStatus(formData: FormData): Promise<void> {
  await requireAdmin()
  const id = String(formData.get("id") ?? "")
  const status = String(formData.get("status") ?? "")
  if (!id || !REPORT_STATUSES.has(status)) throw new Error("Invalid report update")
  await sbPatch("reports", { id: `eq.${id}` }, { status })
  revalidatePath("/admin/moderation")
  revalidatePath("/admin")
}

/** Grant or revoke an employer's verified badge (`employer_profiles.is_verified`). */
export async function setEmployerVerified(formData: FormData): Promise<void> {
  await requireAdmin()
  const userId = String(formData.get("user_id") ?? "")
  const verified = String(formData.get("verified") ?? "") === "true"
  if (!userId) throw new Error("Invalid employer update")
  await sbPatch("employer_profiles", { user_id: `eq.${userId}` }, { is_verified: verified })
  revalidatePath("/admin/people")
  revalidatePath("/admin")
}
