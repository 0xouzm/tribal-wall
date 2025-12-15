import type { FC } from 'hono/jsx'
import { Layout } from '../components/Layout'
import { AddForm } from '../components/AddForm'
import { ScribbleSVG } from '../components/ScribbleSVG'

interface AddPageProps {
  error?: string
}

export const AddPage: FC<AddPageProps> = ({ error }) => {
  return (
    <Layout title="Join the Wall - Tribal">
      <div class="min-h-screen flex flex-col">
        {/* Header */}
        <header class="bg-tribal-green text-white py-6 px-4 relative overflow-hidden">
          <ScribbleSVG class="absolute -top-10 -right-10 w-40 h-40 text-tribal-yellow/20" />
          <div class="max-w-lg mx-auto relative z-10">
            <a href="/" class="inline-flex items-center gap-2 text-tribal-yellow hover:underline mb-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Wall
            </a>
            <h1 class="font-display text-4xl font-bold mb-2">Join the Tribe</h1>
            <p class="text-white/80">Add yourself to the digital nomad wall</p>
          </div>
        </header>

        {/* Form */}
        <main class="flex-1 bg-tribal-cream py-8 px-4">
          <div class="max-w-lg mx-auto">
            <AddForm error={error} />
          </div>
        </main>

        {/* Footer */}
        <footer class="bg-tribal-sand py-4 px-4 text-center text-sm text-tribal-dark/60">
          <p>Part of the <span class="font-semibold text-tribal-green">Tribal</span> community</p>
        </footer>
      </div>
    </Layout>
  )
}
