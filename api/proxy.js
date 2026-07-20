const ALLOWED_HOSTS = new Set([
  'play.google.com',
  'apps.apple.com',
  'vesselhealth.com',
  'www.vesselhealth.com',
])

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const rawUrl = typeof req.query.url === 'string' ? req.query.url : ''
  if (!rawUrl) {
    res.status(400).json({ error: 'url query param is required' })
    return
  }

  let target
  try {
    target = new URL(rawUrl)
  } catch {
    res.status(400).json({ error: 'invalid url' })
    return
  }

  if (!ALLOWED_HOSTS.has(target.hostname)) {
    res.status(403).json({ error: 'host not allowed' })
    return
  }

  try {
    const upstream = await fetch(target.toString(), {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      redirect: 'follow',
    })

    const text = await upstream.text()
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
    res.status(upstream.status).send(text)
  } catch {
    res.status(502).json({ error: 'Failed to fetch upstream page' })
  }
}
