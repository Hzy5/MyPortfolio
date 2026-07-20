/**
 * Extract App Store app ID from App Store URL
 */
export function extractAppStoreId(url: string | null): string | null {
  if (!url) return null
  const match = url.match(/id(\d+)/)
  return match ? match[1] : null
}

/**
 * Extract country code from App Store URL (e.g. pk, us, ca)
 * Apps geo-restricted to certain regions return no data when queried with wrong country.
 */
function extractCountryFromUrl(url: string | null): string {
  if (!url) return 'us'
  const match = url.match(/apps\.apple\.com\/([a-z]{2})\//)
  return match ? match[1].toLowerCase() : 'us'
}

export interface AppStoreMedia {
  icon: string
  screenshots: string[]
  ipadScreenshots?: string[]
  description?: string
}

/**
 * Fallback: fetch screenshot URLs from App Store page HTML when iTunes Lookup returns empty.
 * Works in dev (Vite proxy); may fail in production due to CORS.
 */
async function fetchScreenshotsFromAppStorePage(appStoreUrl: string | null): Promise<string[]> {
  if (!appStoreUrl) return []
  try {
    const url = new URL(appStoreUrl)
    const fetchUrl = import.meta.env.DEV
      ? `/api/appstore${url.pathname}${url.search}`
      : `/api/proxy?url=${encodeURIComponent(appStoreUrl)}`
    const res = await fetch(fetchUrl, { mode: 'cors' })
    const html = await res.text()
    // Match mzstatic URLs that contain "Screenshot" or "Store_Graphic(s)" and use the {w}x{h}{c}.{f} template
    const templateRegex = /(https:\/\/is\d+-ssl\.mzstatic\.com\/image\/thumb\/[^"'\s]+(?:Screenshot|Store_Graphic[s]?)[^"'\s]+)\/\{w\}x\{h\}\{c\}\.\{f\}/g
    const seen = new Set<string>()
    const screenshots: string[] = []
    let m: RegExpExecArray | null
    while ((m = templateRegex.exec(html)) !== null) {
      const base = m[1]
      if (seen.has(base)) continue
      seen.add(base)
      // Use 600x1300 for portrait iPhone screenshots
      screenshots.push(`${base}/600x1300bb.jpg`)
    }
    return screenshots
  } catch {
    return []
  }
}

/**
 * Fetch app icon, screenshots, and description from iTunes Lookup API
 */
export async function fetchAppStoreMedia(appStoreUrl: string | null): Promise<AppStoreMedia | null> {
  const appId = extractAppStoreId(appStoreUrl)
  if (!appId) return null

  const country = extractCountryFromUrl(appStoreUrl)

  try {
    // Use proxy in dev to avoid CORS; direct URL in production (iTunes API allows CORS)
    const baseUrl = import.meta.env.DEV ? '/api/itunes' : 'https://itunes.apple.com'
    const res = await fetch(
      `${baseUrl}/lookup?id=${appId}&country=${country}`,
      { mode: 'cors' }
    )
    const data = await res.json()
    const result = data?.results?.[0]
    if (!result) return null

    let screenshots = [...(result.screenshotUrls || []), ...(result.ipadScreenshotUrls || [])].filter(Boolean)
    if (screenshots.length === 0 && appStoreUrl) {
      screenshots = await fetchScreenshotsFromAppStorePage(appStoreUrl)
    }

    return {
      icon: result.artworkUrl512 || result.artworkUrl100 || result.artworkUrl60 || '',
      screenshots,
      description: result.description || undefined,
    }
  } catch {
    return null
  }
}

/**
 * Fetch only app description from iTunes Lookup API (lighter for bulk fetching)
 */
export async function fetchAppStoreDescription(appStoreUrl: string | null): Promise<string | null> {
  const appId = extractAppStoreId(appStoreUrl)
  if (!appId) return null

  const country = extractCountryFromUrl(appStoreUrl)

  try {
    const baseUrl = import.meta.env.DEV ? '/api/itunes' : 'https://itunes.apple.com'
    const res = await fetch(
      `${baseUrl}/lookup?id=${appId}&country=${country}`,
      { mode: 'cors' }
    )
    const data = await res.json()
    const result = data?.results?.[0]
    return result?.description || null
  } catch {
    return null
  }
}
