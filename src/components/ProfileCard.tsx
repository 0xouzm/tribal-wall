import type { FC } from 'hono/jsx'
import type { Profile } from '../types'

interface ProfileCardProps {
  profile: Profile
  isArchived?: boolean
  delay?: number
}

const getDaysRemaining = (expiresAt: number): number => {
  const now = Date.now()
  const diff = expiresAt - now
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

interface ContactItem {
  type: string
  display: string
  href?: string
}

const getContactLink = (type: string, value: string): string | undefined => {
  const cleanValue = value.replace(/^[@+]/, '').trim()
  switch (type) {
    case 'ig':
      return `https://instagram.com/${cleanValue}`
    case 'whatsapp':
      return `https://wa.me/${value.replace(/[^+\d]/g, '').replace('+', '')}`
    case 'telegram':
      return `https://t.me/${cleanValue}`
    case 'email':
      return `mailto:${value}`
    case 'website':
      return value.startsWith('http') ? value : `https://${value}`
    case 'twitter':
      return `https://x.com/${cleanValue}`
    case 'linkedin':
      return `https://linkedin.com/in/${cleanValue}`
    default:
      return undefined
  }
}

const formatContact = (contact: string): ContactItem[] => {
  if (!contact) return []

  // Try to parse as JSON (new format)
  try {
    const parsed = JSON.parse(contact)
    if (Array.isArray(parsed)) {
      return parsed.map(item => ({
        type: item.type,
        display: item.value,
        href: getContactLink(item.type, item.value)
      }))
    }
  } catch {
    // Fall back to legacy format (pipe-separated)
  }

  // Legacy format: pipe-separated values with auto-detection
  const parts = contact.split('|').map(s => s.trim())
  return parts.map(part => {
    if (part.startsWith('@')) {
      return { type: 'ig', display: part.slice(1), href: `https://instagram.com/${part.slice(1)}` }
    }
    if (part.startsWith('+') || /^\d/.test(part)) {
      const clean = part.replace(/[^+\d]/g, '')
      return { type: 'whatsapp', display: part, href: `https://wa.me/${clean.replace('+', '')}` }
    }
    if (part.includes('@') && part.includes('.')) {
      return { type: 'email', display: part, href: `mailto:${part}` }
    }
    if (part.includes('.')) {
      return { type: 'website', display: part, href: `https://${part.replace(/^https?:\/\//, '')}` }
    }
    return { type: 'other', display: part }
  })
}

export const ProfileCard: FC<ProfileCardProps> = ({ profile, isArchived = false, delay = 0 }) => {
  const daysRemaining = getDaysRemaining(profile.expires_at)
  const contacts = formatContact(profile.contact)
  const isUrgent = daysRemaining <= 2 && !isArchived

  return (
    <div
      class={`tribal-card h-full flex flex-col bg-white rounded-2xl p-5 shadow-lg border-2 border-tribal-sand opacity-0 animate-fade-up ${isArchived ? 'opacity-80' : ''}`}
      style={`animation-delay: ${delay}ms`}
    >
      {/* Header */}
      <div class="flex items-start justify-between gap-2 mb-3">
        <h3 class="font-display text-2xl font-bold text-tribal-green leading-tight">
          {profile.name || 'Anonymous'}
        </h3>
        {!isArchived && (
          <div class={`flex-shrink-0 px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
            isUrgent
              ? 'bg-red-100 text-red-600'
              : 'bg-tribal-yellow/20 text-tribal-green-dark'
          }`}>
            {daysRemaining}d
          </div>
        )}
      </div>

      {/* About - flex-grow to push contacts to bottom */}
      <div class="flex-grow mb-3">
        {profile.about ? (
          <p class="text-tribal-dark/70 text-sm line-clamp-3">
            {profile.about}
          </p>
        ) : (
          <p class="text-tribal-dark/30 text-sm italic">No description</p>
        )}
      </div>

      {/* Contacts - always at bottom */}
      <div class="mt-auto">
        {contacts.length > 0 ? (
          <div class="flex flex-wrap gap-1.5">
            {contacts.map((c, i) => (
              <a
                key={i}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                class={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all hover:scale-105 ${
                  c.type === 'ig' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' :
                  c.type === 'whatsapp' ? 'bg-emerald-500 text-white' :
                  c.type === 'telegram' ? 'bg-sky-500 text-white' :
                  c.type === 'email' ? 'bg-blue-500 text-white' :
                  c.type === 'twitter' ? 'bg-black text-white' :
                  c.type === 'linkedin' ? 'bg-blue-700 text-white' :
                  c.type === 'website' ? 'bg-gray-600 text-white' :
                  'bg-tribal-sand/80 text-tribal-dark'
                }`}
              >
                {c.type === 'ig' && (
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                )}
                {c.type === 'whatsapp' && (
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                )}
                {c.type === 'telegram' && (
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                )}
                {c.type === 'email' && (
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                )}
                {c.type === 'twitter' && (
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                )}
                {c.type === 'linkedin' && (
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                )}
                {c.type === 'website' && (
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                  </svg>
                )}
                <span class="truncate max-w-24">{c.display}</span>
              </a>
            ))}
          </div>
        ) : (
          <p class="text-tribal-dark/30 text-xs">No contact info</p>
        )}
      </div>

      {/* Bring Back Button - Only in Archive */}
      {isArchived && (
        <form action={`/api/profiles/${profile.id}/renew`} method="post" class="mt-4">
          <button
            type="submit"
            class="w-full py-2.5 px-4 bg-tribal-green/10 text-tribal-green border border-tribal-green/20 rounded-xl font-semibold text-sm hover:bg-tribal-green hover:text-white transition-all active:scale-[0.98]"
          >
            ↩ Bring me back to the wall
          </button>
        </form>
      )}
    </div>
  )
}
