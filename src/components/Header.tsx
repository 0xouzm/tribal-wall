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
    <header class="sticky top-0 z-50 bg-tribal-cream/95 backdrop-blur-sm border-b border-tribal-sand">
      <div class="max-w-6xl mx-auto px-4 py-4">
        {/* Logo & Title */}
        <div class="flex items-center justify-between mb-4">
          <a href="/" class="flex items-center gap-3">
            <div class="w-10 h-10 bg-tribal-green rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-tribal-yellow" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </div>
            <div>
              <h1 class="font-display text-2xl font-bold text-tribal-green">Tribal Wall</h1>
              <p class="text-xs text-tribal-dark/50">Digital Nomad Community</p>
            </div>
          </a>

          <div class="flex items-center gap-2">
            {showArchive && (
              <a
                href="/archive"
                class="px-4 py-2 text-sm font-medium text-tribal-green hover:bg-tribal-green/10 rounded-xl transition-colors"
              >
                Archive
              </a>
            )}
            {showAdd && (
              <a
                href="/add"
                class="px-4 py-2 bg-tribal-yellow text-tribal-dark font-semibold text-sm rounded-xl hover:bg-tribal-yellow-light transition-colors shadow-md"
              >
                + Add Me
              </a>
            )}
          </div>
        </div>

        {/* Search */}
        <form action="/" method="get" class="relative">
          <input
            type="text"
            name="q"
            value={searchQuery}
            placeholder="Search by name or skill..."
            class="w-full px-4 py-3 pl-12 bg-white border-2 border-tribal-sand rounded-xl focus:outline-none focus:border-tribal-green transition-colors"
          />
          <svg
            class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-tribal-dark/40"
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
