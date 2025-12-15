import { Hono } from 'hono'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'
import { serveStatic } from 'hono/cloudflare-pages'
import type { Env, Profile, ProfileInput } from './types'
import { Home } from './pages/Home'
import { AddPage } from './pages/Add'
import { Archive } from './pages/Archive'
import { Admin } from './pages/Admin'
import './styles/global.css'

const app = new Hono<{ Bindings: Env }>()

// Helper: Generate UUID
const generateId = () => crypto.randomUUID()

// Helper: Get QR Code URL
const getQRCodeUrl = (baseUrl: string, size = 200) => {
  const addUrl = `${baseUrl}/add`
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(addUrl)}`
}

// ============ Pages ============

// Home page
app.get('/', async (c) => {
  const query = c.req.query('q') || ''
  const db = c.env.DB

  let profiles: Profile[]
  let totalCount: number

  if (query) {
    const searchPattern = `%${query}%`
    profiles = await db
      .prepare('SELECT * FROM profiles WHERE is_archived = 0 AND (name LIKE ? OR about LIKE ?) ORDER BY created_at DESC')
      .bind(searchPattern, searchPattern)
      .all<Profile>()
      .then(r => r.results)
  } else {
    profiles = await db
      .prepare('SELECT * FROM profiles WHERE is_archived = 0 ORDER BY created_at DESC')
      .all<Profile>()
      .then(r => r.results)
  }

  const countResult = await db
    .prepare('SELECT COUNT(*) as count FROM profiles WHERE is_archived = 0')
    .first<{ count: number }>()
  totalCount = countResult?.count || 0

  return c.html(<Home profiles={profiles} searchQuery={query} totalCount={totalCount} />)
})

// Add page
app.get('/add', (c) => {
  const error = c.req.query('error')
  return c.html(<AddPage error={error} />)
})

// Archive page
app.get('/archive', async (c) => {
  const query = c.req.query('q') || ''
  const db = c.env.DB

  let profiles: Profile[]

  if (query) {
    const searchPattern = `%${query}%`
    profiles = await db
      .prepare('SELECT * FROM profiles WHERE is_archived = 1 AND (name LIKE ? OR about LIKE ?) ORDER BY created_at DESC')
      .bind(searchPattern, searchPattern)
      .all<Profile>()
      .then(r => r.results)
  } else {
    profiles = await db
      .prepare('SELECT * FROM profiles WHERE is_archived = 1 ORDER BY created_at DESC')
      .all<Profile>()
      .then(r => r.results)
  }

  return c.html(<Archive profiles={profiles} searchQuery={query} />)
})

// Admin page
app.get('/admin', async (c) => {
  const authenticated = getCookie(c, 'admin_auth') === 'true'
  const db = c.env.DB
  const baseUrl = new URL(c.req.url).origin

  const profiles = authenticated
    ? await db.prepare('SELECT * FROM profiles ORDER BY is_archived ASC, created_at DESC').all<Profile>().then(r => r.results)
    : []

  return c.html(<Admin profiles={profiles} qrCodeUrl={getQRCodeUrl(baseUrl)} authenticated={authenticated} />)
})

// Admin login
app.post('/admin', async (c) => {
  const formData = await c.req.formData()
  const password = formData.get('password') as string
  const adminPassword = c.env.ADMIN_PASSWORD || 'tribal2024'

  if (password === adminPassword) {
    setCookie(c, 'admin_auth', 'true', { httpOnly: true, maxAge: 60 * 60 * 24 })
    return c.redirect('/admin')
  }

  return c.redirect('/admin?error=invalid')
})

// Admin logout
app.get('/admin/logout', (c) => {
  deleteCookie(c, 'admin_auth')
  return c.redirect('/admin')
})

// ============ API ============

// Create profile
app.post('/api/profiles', async (c) => {
  const formData = await c.req.formData()
  const name = (formData.get('name') as string)?.trim() || ''
  const about = (formData.get('about') as string)?.trim() || ''

  // Parse structured contacts
  const contacts: { type: string; value: string }[] = []
  for (let i = 1; i <= 3; i++) {
    const type = (formData.get(`contact_type_${i}`) as string)?.trim() || ''
    const value = (formData.get(`contact_value_${i}`) as string)?.trim() || ''
    if (value) {
      // If no type selected, default to 'other' (plain text)
      contacts.push({ type: type || 'other', value })
    }
  }

  if (!name) {
    return c.redirect('/add?error=Name is required')
  }

  const now = Date.now()
  const expiresAt = now + 7 * 24 * 60 * 60 * 1000 // 7 days
  const contactJson = JSON.stringify(contacts)

  const db = c.env.DB
  await db
    .prepare('INSERT INTO profiles (id, name, contact, about, created_at, expires_at, is_archived) VALUES (?, ?, ?, ?, ?, ?, 0)')
    .bind(generateId(), name, contactJson, about, now, expiresAt)
    .run()

  return c.redirect('/')
})

// Renew profile
app.post('/api/profiles/:id/renew', async (c) => {
  const id = c.req.param('id')
  const newExpiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000

  await c.env.DB
    .prepare('UPDATE profiles SET expires_at = ?, is_archived = 0 WHERE id = ?')
    .bind(newExpiresAt, id)
    .run()

  return c.redirect('/')
})

// Archive profile (admin)
app.post('/api/profiles/:id/archive', async (c) => {
  const id = c.req.param('id')

  await c.env.DB
    .prepare('UPDATE profiles SET is_archived = 1 WHERE id = ?')
    .bind(id)
    .run()

  return c.redirect('/admin')
})

// Delete profile (admin)
app.post('/api/profiles/:id/delete', async (c) => {
  const id = c.req.param('id')

  await c.env.DB
    .prepare('DELETE FROM profiles WHERE id = ?')
    .bind(id)
    .run()

  return c.redirect('/admin')
})

// QR Code generation
app.get('/api/qrcode', async (c) => {
  const format = c.req.query('format') || 'png'
  const size = parseInt(c.req.query('size') || '300')
  const baseUrl = new URL(c.req.url).origin
  const addUrl = `${baseUrl}/add`

  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(addUrl)}&format=${format}`

  const response = await fetch(qrApiUrl)
  const contentType = format === 'svg' ? 'image/svg+xml' : 'image/png'

  return new Response(response.body, {
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="tribal-wall-qr.${format}"`,
    },
  })
})

// ============ Scheduled (Cron) ============

export default {
  fetch: app.fetch,
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    const now = Date.now()
    await env.DB
      .prepare('UPDATE profiles SET is_archived = 1 WHERE expires_at < ? AND is_archived = 0')
      .bind(now)
      .run()
  },
}
