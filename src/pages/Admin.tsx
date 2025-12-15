import type { FC } from 'hono/jsx'
import type { Profile } from '../types'
import { Layout } from '../components/Layout'

interface AdminProps {
  profiles: Profile[]
  qrCodeUrl: string
  authenticated: boolean
}

export const Admin: FC<AdminProps> = ({ profiles, qrCodeUrl, authenticated }) => {
  if (!authenticated) {
    return (
      <Layout title="Admin - Tribal Wall">
        <div class="min-h-screen flex items-center justify-center bg-tribal-cream px-4">
          <div class="w-full max-w-sm">
            <h1 class="font-display text-3xl font-bold text-tribal-green text-center mb-8">Admin Login</h1>
            <form action="/admin" method="post" class="space-y-4">
              <input
                type="password"
                name="password"
                placeholder="Enter admin password"
                class="w-full px-4 py-3 bg-white border-2 border-tribal-sand rounded-xl focus:outline-none focus:border-tribal-green"
                required
              />
              <button
                type="submit"
                class="w-full py-3 bg-tribal-green text-white font-semibold rounded-xl hover:bg-tribal-green-dark transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </Layout>
    )
  }

  const activeProfiles = profiles.filter(p => !p.is_archived)
  const archivedProfiles = profiles.filter(p => p.is_archived)

  return (
    <Layout title="Admin - Tribal Wall">
      <div class="min-h-screen bg-tribal-cream">
        {/* Header */}
        <header class="bg-tribal-dark text-white py-6 px-4">
          <div class="max-w-6xl mx-auto flex items-center justify-between">
            <div>
              <a href="/" class="inline-flex items-center gap-2 text-tribal-yellow hover:underline mb-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Wall
              </a>
              <h1 class="font-display text-3xl font-bold">Admin Panel</h1>
            </div>
            <a
              href="/admin/logout"
              class="px-4 py-2 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition-colors"
            >
              Logout
            </a>
          </div>
        </header>

        <main class="max-w-6xl mx-auto px-4 py-8">
          {/* QR Code Section */}
          <section class="bg-white rounded-2xl p-6 shadow-lg mb-8">
            <h2 class="font-display text-2xl font-bold text-tribal-green mb-4">Entry QR Code</h2>
            <p class="text-tribal-dark/60 mb-4">Print this QR code for the physical space. Scanning leads to the "Add Me" page.</p>

            <div class="flex flex-col sm:flex-row items-center gap-6">
              <div class="w-48 h-48 bg-white border-4 border-tribal-sand rounded-xl flex items-center justify-center">
                <img src={qrCodeUrl} alt="QR Code" class="w-40 h-40" />
              </div>
              <div class="space-y-3">
                <a
                  href="/api/qrcode?format=png&size=500"
                  download="tribal-wall-qr.png"
                  class="block px-6 py-3 bg-tribal-green text-white font-semibold rounded-xl text-center hover:bg-tribal-green-dark transition-colors"
                >
                  Download PNG (500px)
                </a>
                <a
                  href="/api/qrcode?format=svg"
                  download="tribal-wall-qr.svg"
                  class="block px-6 py-3 bg-tribal-sand text-tribal-dark font-semibold rounded-xl text-center hover:bg-tribal-sand/70 transition-colors"
                >
                  Download SVG
                </a>
              </div>
            </div>
          </section>

          {/* Stats */}
          <div class="grid grid-cols-2 gap-4 mb-8">
            <div class="bg-white rounded-xl p-4 shadow">
              <p class="text-3xl font-bold text-tribal-green">{activeProfiles.length}</p>
              <p class="text-sm text-tribal-dark/60">Active Profiles</p>
            </div>
            <div class="bg-white rounded-xl p-4 shadow">
              <p class="text-3xl font-bold text-tribal-dark/40">{archivedProfiles.length}</p>
              <p class="text-sm text-tribal-dark/60">Archived</p>
            </div>
          </div>

          {/* Profile List */}
          <section class="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div class="px-6 py-4 border-b border-tribal-sand">
              <h2 class="font-display text-xl font-bold text-tribal-green">All Profiles</h2>
            </div>
            <div class="divide-y divide-tribal-sand">
              {profiles.map(profile => (
                <div key={profile.id} class="px-6 py-4 flex items-center justify-between">
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2">
                      <p class="font-semibold text-tribal-dark truncate">{profile.name || 'Anonymous'}</p>
                      {profile.is_archived ? (
                        <span class="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs rounded-full">Archived</span>
                      ) : (
                        <span class="px-2 py-0.5 bg-tribal-green/10 text-tribal-green text-xs rounded-full">Active</span>
                      )}
                    </div>
                    <p class="text-sm text-tribal-dark/60 truncate">{profile.about || 'No description'}</p>
                  </div>
                  <div class="flex items-center gap-2 ml-4">
                    {!profile.is_archived && (
                      <form action={`/api/profiles/${profile.id}/archive`} method="post">
                        <button
                          type="submit"
                          class="px-3 py-1.5 text-sm bg-tribal-sand text-tribal-dark rounded-lg hover:bg-tribal-sand/70"
                        >
                          Archive
                        </button>
                      </form>
                    )}
                    <form action={`/api/profiles/${profile.id}/delete`} method="post">
                      <button
                        type="submit"
                        class="px-3 py-1.5 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                        onclick="return confirm('Are you sure you want to delete this profile?')"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </Layout>
  )
}
