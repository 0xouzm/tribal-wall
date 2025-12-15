import type { FC } from 'hono/jsx'
import type { Profile } from '../types'
import { Layout } from '../components/Layout'
import { ProfileCard } from '../components/ProfileCard'

interface ArchiveProps {
  profiles: Profile[]
  searchQuery: string
}

export const Archive: FC<ArchiveProps> = ({ profiles, searchQuery }) => {
  return (
    <Layout title="Archive - Tribal Wall">
      {/* Header */}
      <header class="bg-forest-gradient text-white py-6 px-4">
        <div class="max-w-6xl mx-auto">
          <a href="/" class="inline-flex items-center gap-2 text-amber-light hover:text-amber-gold transition-colors mb-4">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Wall
          </a>
          <h1 class="font-display text-3xl font-semibold mb-2 tracking-tight">Archive</h1>
          <p class="text-white/60">Past members of the tribe</p>
        </div>
      </header>

      <main class="max-w-6xl mx-auto px-4 py-6">
        {/* Search */}
        <form action="/archive" method="get" class="mb-6">
          <div class="relative group">
            <input
              type="text"
              name="q"
              value={searchQuery}
              placeholder="Search archived profiles..."
              class="w-full px-4 py-3.5 pl-12 bg-white/80 border border-forest-mist rounded-2xl focus:outline-none focus:border-forest-sage focus:bg-white focus:ring-2 focus:ring-forest-sage/20 transition-all placeholder:text-earth-stone/60"
            />
            <svg
              class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-earth-stone/50 group-focus-within:text-forest-sage transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </form>

        {/* Stats */}
        <p class="text-earth-stone text-sm mb-6">
          <span class="font-semibold text-forest-moss">{profiles.length}</span> archived profiles
        </p>

        {/* Profile Grid */}
        {profiles.length > 0 ? (
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {profiles.map((profile, index) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                isArchived={true}
                delay={index * 50}
              />
            ))}
          </div>
        ) : (
          <div class="text-center py-16">
            <div class="w-20 h-20 mx-auto mb-4 bg-forest-fern/20 rounded-full flex items-center justify-center">
              <svg class="w-10 h-10 text-forest-sage/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <h3 class="font-display text-2xl font-semibold text-forest-deep mb-2">
              Archive is empty
            </h3>
            <p class="text-earth-stone">
              No archived profiles yet
            </p>
          </div>
        )}
      </main>
    </Layout>
  )
}
