import type { FC } from 'hono/jsx'

interface AddFormProps {
  error?: string
}

const contactTypes = [
  { value: 'ig', label: 'Instagram', placeholder: 'username' },
  { value: 'whatsapp', label: 'WhatsApp', placeholder: '+1234567890' },
  { value: 'telegram', label: 'Telegram', placeholder: '@username' },
  { value: 'email', label: 'Email', placeholder: 'you@email.com' },
  { value: 'website', label: 'Website', placeholder: 'yoursite.com' },
  { value: 'twitter', label: 'X/Twitter', placeholder: 'username' },
  { value: 'linkedin', label: 'LinkedIn', placeholder: 'username' },
]

const selectStyle = `
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236B6560' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
`

export const AddForm: FC<AddFormProps> = ({ error }) => {
  return (
    <form action="/api/profiles" method="post" class="space-y-6">
      {error && (
        <div class="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-600 text-sm">
          {error}
        </div>
      )}

      {/* Name */}
      <div>
        <label class="block font-semibold text-earth-bark mb-2">
          Your Name <span class="text-rose-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          required
          placeholder="How should we call you?"
          class="w-full px-4 py-4 bg-white/80 border border-forest-mist rounded-2xl focus:outline-none focus:border-forest-sage focus:bg-white focus:ring-2 focus:ring-forest-sage/20 transition-all text-lg placeholder:text-earth-stone/50"
        />
      </div>

      {/* Contact Methods */}
      <div>
        <label class="block font-semibold text-earth-bark mb-3">
          Contact Info
        </label>

        {/* Contact 1 */}
        <div class="flex gap-2 mb-3">
          <select
            name="contact_type_1"
            class="w-32 px-3 py-3.5 bg-white/80 border border-forest-mist rounded-xl focus:outline-none focus:border-forest-sage focus:bg-white transition-all text-sm font-medium text-earth-bark appearance-none cursor-pointer"
            style={selectStyle}
          >
            <option value="">Type</option>
            {contactTypes.map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
          <input
            type="text"
            name="contact_value_1"
            placeholder="Enter your contact..."
            class="flex-1 px-4 py-3.5 bg-white/80 border border-forest-mist rounded-xl focus:outline-none focus:border-forest-sage focus:bg-white focus:ring-2 focus:ring-forest-sage/20 transition-all placeholder:text-earth-stone/50"
          />
        </div>

        {/* Contact 2 */}
        <div class="flex gap-2 mb-3">
          <select
            name="contact_type_2"
            class="w-32 px-3 py-3.5 bg-white/80 border border-forest-mist rounded-xl focus:outline-none focus:border-forest-sage focus:bg-white transition-all text-sm font-medium text-earth-bark appearance-none cursor-pointer"
            style={selectStyle}
          >
            <option value="">Type</option>
            {contactTypes.map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
          <input
            type="text"
            name="contact_value_2"
            placeholder="Add another (optional)..."
            class="flex-1 px-4 py-3.5 bg-white/80 border border-forest-mist rounded-xl focus:outline-none focus:border-forest-sage focus:bg-white focus:ring-2 focus:ring-forest-sage/20 transition-all placeholder:text-earth-stone/50"
          />
        </div>

        {/* Contact 3 */}
        <div class="flex gap-2">
          <select
            name="contact_type_3"
            class="w-32 px-3 py-3.5 bg-white/80 border border-forest-mist rounded-xl focus:outline-none focus:border-forest-sage focus:bg-white transition-all text-sm font-medium text-earth-bark appearance-none cursor-pointer"
            style={selectStyle}
          >
            <option value="">Type</option>
            {contactTypes.map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
          <input
            type="text"
            name="contact_value_3"
            placeholder="Add another (optional)..."
            class="flex-1 px-4 py-3.5 bg-white/80 border border-forest-mist rounded-xl focus:outline-none focus:border-forest-sage focus:bg-white focus:ring-2 focus:ring-forest-sage/20 transition-all placeholder:text-earth-stone/50"
          />
        </div>

        <p class="mt-3 text-xs text-earth-stone/60">
          Add up to 3 contact methods. Skip type selection to show as plain text.
        </p>
      </div>

      {/* About */}
      <div>
        <label class="block font-semibold text-earth-bark mb-2">
          What do you do?
        </label>
        <textarea
          name="about"
          rows={3}
          placeholder="Your skills, interests, what you're working on..."
          class="w-full px-4 py-4 bg-white/80 border border-forest-mist rounded-2xl focus:outline-none focus:border-forest-sage focus:bg-white focus:ring-2 focus:ring-forest-sage/20 transition-all text-lg resize-none placeholder:text-earth-stone/50"
        />
      </div>

      {/* Info Banner */}
      <div class="p-4 bg-amber-gold/15 rounded-2xl border border-amber-gold/30">
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 rounded-full bg-amber-gold/30 flex items-center justify-center flex-shrink-0">
            <svg class="w-4 h-4 text-amber-warm" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="text-sm text-earth-bark/80">
            <p class="font-semibold mb-1">Your card will be visible for 7 days</p>
            <p class="text-earth-stone">After that, it will be automatically archived. You can renew it anytime to stay visible!</p>
          </div>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        class="w-full py-4 bg-forest-gradient text-white font-bold text-lg rounded-2xl hover:shadow-elevated transition-all active:scale-[0.98]"
      >
        Add Me to the Wall
      </button>
    </form>
  )
}
