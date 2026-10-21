/**
 * Links back into the ReelHire Android app. Shared job links are
 * `https://reelhire.xyz/opening/<id>`: with the app installed, Android opens
 * them straight in the app (Android App Links, verified through
 * `public/.well-known/assetlinks.json`), so this site only sees people who
 * don't have it — or whose in-app browser didn't hand the link over.
 */
export const ANDROID_PACKAGE = "com.tejasnaz.reelhire"

/** The app's job ids are uuids; anything else 404s. */
export const JOB_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/**
 * Play listing that carries the in-app path through the install referrer, so
 * the app can open it on first launch after installing (deferred deep link —
 * read by `features/deep-links/install-referrer.ts` in the app).
 */
export function playStoreUrl(appPath?: string, medium = "share") {
  const url = new URL("https://play.google.com/store/apps/details")
  url.searchParams.set("id", ANDROID_PACKAGE)
  const referrer = new URLSearchParams({ utm_source: "reelhire.xyz", utm_medium: medium })
  if (appPath) referrer.set("deeplink", appPath)
  url.searchParams.set("referrer", referrer.toString())
  return url.toString()
}

/** Play listing for the landing page's download buttons, attributed separately from shared job links. */
export const LANDING_PLAY_URL = playStoreUrl(undefined, "landing")

export const CONTACT_HREF = "mailto:support@reelhire.xyz"

/**
 * Android intent URL: opens the app if it's installed (for in-app browsers
 * and links typed into Chrome, where App Links don't fire), otherwise Chrome
 * follows the fallback to Play — with the referrer, so nothing is lost.
 */
export function openInAppUrl(appPath: string) {
  const fallback = encodeURIComponent(playStoreUrl(appPath))
  return `intent:/${appPath}#Intent;scheme=reelhire;package=${ANDROID_PACKAGE};S.browser_fallback_url=${fallback};end`
}
