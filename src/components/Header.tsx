import type { FC } from 'hono/jsx'

interface HeaderProps {
  showAdd?: boolean
  showArchive?: boolean
  searchQuery?: string
}

export const Header: FC<HeaderProps> = ({
  showAdd = true,
  showArchive = true,
  searchQuery = ''
}) => {
  return (
    <header class="sticky top-0 z-50 bg-earth-cream/90 glass-effect border-b border-forest-mist/50">
      <div class="max-w-6xl mx-auto px-4 py-4">
        {/* Logo & Title */}
        <div class="flex items-center justify-between mb-4">
          <a href="/" class="group flex items-center gap-3">
            {/* Logo - Organic leaf shape */}
            <div class="relative w-11 h-11 bg-forest-gradient rounded-2xl flex items-center justify-center shadow-soft overflow-hidden group-hover:scale-105 transition-transform">
              <svg class="w-6 h-6 text-amber-gold" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
              </svg>
              {/* Subtle shine effect */}
              <div class="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
            </div>
            <div>
              <h1 class="font-display text-2xl font-semibold text-forest-deep tracking-tight">
                Tribal Wall
              </h1>
              <p class="text-xs text-earth-stone tracking-wide">
                Digital Nomad Community
              </p>
            </div>
          </a>

          <nav class="flex items-center gap-2">
            {showArchive && (
              <a
                href="/archive"
                class="px-4 py-2.5 text-sm font-medium text-forest-moss hover:text-forest-deep hover:bg-forest-sage/10 rounded-xl transition-all"
              >
                Archive
              </a>
            )}
            {showAdd && (
              <a
                href="/add"
                class="px-5 py-2.5 bg-amber-gradient text-forest-deep font-semibold text-sm rounded-xl hover:shadow-card transition-all active:scale-[0.98]"
              >
                + Add Me
              </a>
            )}
          </nav>
        </div>

        {/* Search */}
        <form action="/" method="get" class="relative group">
          <input
            type="text"
            name="q"
            value={searchQuery}
            placeholder="Search by name or skill..."
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
        </form>
      </div>
    </header>
  )
}
