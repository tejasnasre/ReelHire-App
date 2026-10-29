import { cn } from "@/lib/utils"
import { setEmployerVerified } from "@/lib/admin/actions"
import { buttonVariants } from "@/components/ui/button"

/** Grant/revoke an employer's verified badge. The hidden `verified` carries the NEXT value. */
export function VerifyToggle({ userId, verified }: { userId: string; verified: boolean }) {
  return (
    <form action={setEmployerVerified}>
      <input type="hidden" name="user_id" value={userId} />
      <input type="hidden" name="verified" value={verified ? "false" : "true"} />
      <button className={cn(buttonVariants({ variant: verified ? "outline" : "default", size: "sm" }))}>
        {verified ? "Unverify" : "Verify"}
      </button>
    </form>
  )
}
