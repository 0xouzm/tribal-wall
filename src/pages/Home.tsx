import type { FC } from 'hono/jsx'
import type { Profile } from '../types'
import { Layout } from '../components/Layout'
import { Header } from '../components/Header'
import { ProfileCard } from '../components/ProfileCard'

interface HomeProps {
  profiles: Profile[]
  searchQuery: string
  totalCount: number
}

export const Home: FC<HomeProps> = ({ profiles, searchQuery, totalCount }) => {
  return (
    <Layout title="Tribal Wall - Digital Nomad Community">
      <Header searchQuery={searchQuery} />

      <main class="max-w-6xl mx-auto px-4 py-6">
        {/* Stats */}
        <div class="flex items-center justify-between mb-6">
          <p class="text-tribal-dark/60 text-sm">
            {searchQuery ? (
              <>Found <span class="font-semibold text-tribal-green">{profiles.length}</span> nomads</>
            ) : (
              <><span class="font-semibold text-tribal-green">{totalCount}</span> nomads on the wall</>
            )}
          </p>
          {searchQuery && (
            <a href="/" class="text-sm text-tribal-green hover:underline">
              Clear search
            </a>
          )}
        </div>

        {/* Profile Grid */}
        {profiles.length > 0 ? (
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {profiles.map((profile, index) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                isArchived={false}
                delay={index * 50}
              />
            ))}
          </div>
        ) : (
          <div class="text-center py-16">
            <div class="w-20 h-20 mx-auto mb-4 bg-tribal-sand rounded-full flex items-center justify-center">
              <svg class="w-10 h-10 text-tribal-dark/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="font-display text-2xl font-bold text-tribal-green mb-2">
              {searchQuery ? 'No nomads found' : 'The wall is empty'}
            </h3>
            <p class="text-tribal-dark/60 mb-6">
              {searchQuery
                ? 'Try a different search term'
                : 'Be the first to add yourself!'}
            </p>
            <a
              href="/add"
              class="inline-block px-6 py-3 bg-tribal-yellow text-tribal-dark font-semibold rounded-xl hover:bg-tribal-yellow-light transition-colors"
            >
              + Add Me to the Wall
            </a>
          </div>
        )}
      </main>

      {/* Mobile FAB */}
      <a
        href="/add"
        class="fixed bottom-6 right-6 w-14 h-14 bg-tribal-yellow text-tribal-dark rounded-full shadow-lg flex items-center justify-center text-2xl font-bold hover:bg-tribal-yellow-light transition-colors sm:hidden z-50"
      >
        +
      </a>
    </Layout>
  )
}
