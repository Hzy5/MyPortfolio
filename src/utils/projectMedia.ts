import { fetchAppStoreMedia } from './appStore'

export interface ProjectMedia {
  icon: string
  screenshots: string[]
  description?: string
}

export interface ProjectWithMedia {
  name: string
  role: string
  desc: string
  tech: string[]
  appStore: string | null
  playStore: string | null
  /** Fetch screenshots from website instead of App Store */
  screenshotSource?: 'website' | 'playstore'
  /** URL for website screenshots (e.g. https://vesselhealth.com) */
  screenshotUrl?: string
}

/** Dev uses Vite proxies; production uses the Vercel /api/proxy function. */
function htmlFetchUrl(absoluteUrl: string, viteProxyPrefix: string): string {
  if (import.meta.env.DEV) {
    const url = new URL(absoluteUrl)
    return `${viteProxyPrefix}${url.pathname}${url.search}`
  }
  return `/api/proxy?url=${encodeURIComponent(absoluteUrl)}`
}

/**
 * Fetch screenshots from a website (e.g. vesselhealth.com)
 */
async function fetchScreenshotsFromWebsite(url: string | null): Promise<string[]> {
  if (!url) return []
  try {
    const fetchUrl = url.includes('vesselhealth.com')
      ? htmlFetchUrl(url, '/api/vessel')
      : url
    const res = await fetch(fetchUrl, { mode: 'cors' })
    const html = await res.text()
    // Match CDN images from vesselhealth.com (Shopify)
    const regex = /https?:\/\/(?:vesselhealth\.com\/cdn\/shop\/files|cdn\.shopify\.com\/s\/files\/[^"'\s]+)\/[^"'\s]+\.(png|webp|jpg|jpeg|gif)(?:\?[^"'\s]*)?/gi
    const seen = new Set<string>()
    const screenshots: string[] = []
    let m: RegExpExecArray | null
    while ((m = regex.exec(html)) !== null) {
      let imgUrl = m[0]
      if (imgUrl.startsWith('//')) imgUrl = 'https:' + imgUrl
      if (seen.has(imgUrl)) continue
      seen.add(imgUrl)
      // Skip tiny thumbnails (e.g. 48x48, 64x64)
      if (/[_\-](?:48|64)x\d*\./i.test(imgUrl)) continue
      screenshots.push(imgUrl)
    }
    return screenshots.slice(0, 10) // Limit to 10
  } catch {
    return []
  }
}

/**
 * Fetch icon and screenshots from Play Store page HTML.
 * Uses full URLs from the page (not constructed) to avoid broken images.
 * Adds referrerPolicy for Play Store images - see ProjectModal.
 */
async function fetchPlayStoreMedia(playStoreUrl: string | null): Promise<{ icon: string; screenshots: string[] }> {
  const empty = { icon: '', screenshots: [] }
  if (!playStoreUrl) return empty
  try {
    const fetchUrl = htmlFetchUrl(playStoreUrl, '/api/playstore')
    const res = await fetch(fetchUrl, { mode: 'cors' })
    const html = await res.text()

    // Extract full URLs with size params - use as-is (constructed URLs can break)
    const urlRegex = /https?:\/\/play-lh\.googleusercontent\.com\/([a-zA-Z0-9_-]+)(=[^"'\s\)]+)?/g
    const byBase = new Map<string, string[]>()
    let m: RegExpExecArray | null
    while ((m = urlRegex.exec(html)) !== null) {
      const base = m[1]
      const sizeParam = m[2] || ''
      const fullUrl = `https://play-lh.googleusercontent.com/${base}${sizeParam}`

      // Skip tiny thumbnails and URLs without size params (may not load)
      if (!sizeParam) continue
      if (/=s(20|40)(?:[^0-9]|$)/.test(sizeParam) || /=w(48|96)-h\d+/.test(sizeParam)) continue

      if (!byBase.has(base)) byBase.set(base, [])
      byBase.get(base)!.push(fullUrl)
    }

    // App icon: IDs that have s20/s40 (icon sizes) - use =s128 for display
    const iconIds = new Set<string>()
    const iconRegex = /https?:\/\/play-lh\.googleusercontent\.com\/([a-zA-Z0-9_-]+)=s(20|40)(?:[^0-9]|$)/g
    while ((m = iconRegex.exec(html)) !== null) {
      iconIds.add(m[1])
    }

    // Build screenshots: prefer phone (w240-h480, w480-h960), then feature graphics (w526-h296, w1052-h592)
    const phoneScreenshots: string[] = []
    const featureGraphics: string[] = []
    for (const [, urls] of byBase) {
      const best = urls.find((u) => /w(240|480)-h(480|960)/.test(u)) || urls.find((u) => /w(526|1052)-h(296|592)/.test(u)) || urls[0]
      if (/w(240|480)-h(480|960)/.test(best)) phoneScreenshots.push(best)
      else if (/w(526|1052)-h(296|592)/.test(best)) featureGraphics.push(best)
    }
    const screenshots = [...phoneScreenshots, ...featureGraphics].slice(0, 8)

    // Icon: use first icon ID with =s128, or first screenshot
    let icon = ''
    for (const id of iconIds) {
      icon = `https://play-lh.googleusercontent.com/${id}=s128`
      break
    }
    if (!icon && screenshots[0]) icon = screenshots[0]

    return { icon, screenshots }
  } catch {
    return empty
  }
}

/**
 * Unified fetcher: gets icon, screenshots, description based on project config
 */
export async function fetchProjectMedia(project: ProjectWithMedia | null): Promise<ProjectMedia | null> {
  if (!project) return null

  // 1. Website screenshots (e.g. Vessel Health from vesselhealth.com)
  if (project.screenshotSource === 'website' && project.screenshotUrl) {
    const screenshots = await fetchScreenshotsFromWebsite(project.screenshotUrl)
    const icon = project.appStore
      ? (await fetchAppStoreMedia(project.appStore))?.icon ?? ''
      : ''
    return {
      icon: icon || (screenshots[0] ?? ''),
      screenshots,
      description: project.appStore
        ? (await fetchAppStoreMedia(project.appStore))?.description ?? project.desc
        : project.desc,
    }
  }

  // 2. Play Store screenshots (e.g. Remember RQR, Podify)
  if (project.screenshotSource === 'playstore' && project.playStore) {
    const { icon, screenshots } = await fetchPlayStoreMedia(project.playStore)
    return {
      icon,
      screenshots,
      description: project.desc,
    }
  }

  // 3. App Store (default) — fall back to Play Store when iTunes has no screenshots
  if (project.appStore) {
    const data = await fetchAppStoreMedia(project.appStore)
    if (data?.screenshots.length) {
      return {
        icon: data.icon,
        screenshots: data.screenshots,
        description: data.description,
      }
    }

    if (project.playStore) {
      const play = await fetchPlayStoreMedia(project.playStore)
      if (play.screenshots.length || play.icon) {
        return {
          icon: data?.icon || play.icon,
          screenshots: play.screenshots,
          description: data?.description || project.desc,
        }
      }
    }

    if (data) {
      return {
        icon: data.icon,
        screenshots: data.screenshots,
        description: data.description,
      }
    }
    return null
  }

  // 4. Play Store only, no explicit screenshotSource - try Play Store fallback
  if (project.playStore) {
    const { icon, screenshots } = await fetchPlayStoreMedia(project.playStore)
    return {
      icon,
      screenshots,
      description: project.desc,
    }
  }

  return null
}
