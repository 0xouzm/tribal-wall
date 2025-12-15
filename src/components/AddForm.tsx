import type { FC } from 'hono/jsx'

interface AddFormProps {
  error?: string
}

const contactTypes = [
  { value: 'ig', label: 'Instagram', icon: '@', placeholder: 'username', color: 'from-purple-500 to-pink-500' },
  { value: 'whatsapp', label: 'WhatsApp', icon: 'W', placeholder: '+1234567890', color: 'bg-emerald-500' },
  { value: 'telegram', label: 'Telegram', icon: 'T', placeholder: '@username', color: 'bg-sky-500' },
  { value: 'email', label: 'Email', icon: '✉', placeholder: 'you@email.com', color: 'bg-blue-500' },
  { value: 'website', label: 'Website', icon: '🌐', placeholder: 'yoursite.com', color: 'bg-gray-600' },
  { value: 'twitter', label: 'X/Twitter', icon: '𝕏', placeholder: 'username', color: 'bg-black' },
  { value: 'linkedin', label: 'LinkedIn', icon: 'in', placeholder: 'username', color: 'bg-blue-700' },
]

export const AddForm: FC<AddFormProps> = ({ error }) => {
  return (
    <form action="/api/profiles" method="post" class="space-y-6">
      {error && (
        <div class="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Name */}
      <div>
        <label class="block font-semibold text-tribal-dark mb-2">
          Your Name <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          required
          placeholder="How should we call you?"
          class="w-full px-4 py-4 bg-white border-2 border-tribal-sand rounded-xl focus:outline-none focus:border-tribal-green transition-colors text-lg"
        />
      </div>

      {/* Contact Methods */}
      <div>
        <label class="block font-semibold text-tribal-dark mb-3">
          Contact Info
        </label>

        {/* Contact 1 */}
        <div class="flex gap-2 mb-3">
          <select
            name="contact_type_1"
            class="w-32 px-3 py-3 bg-white border-2 border-tribal-sand rounded-xl focus:outline-none focus:border-tribal-green transition-colors text-sm font-medium"
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
            class="flex-1 px-4 py-3 bg-white border-2 border-tribal-sand rounded-xl focus:outline-none focus:border-tribal-green transition-colors"
          />
        </div>

        {/* Contact 2 */}
        <div class="flex gap-2 mb-3">
          <select
            name="contact_type_2"
            class="w-32 px-3 py-3 bg-white border-2 border-tribal-sand rounded-xl focus:outline-none focus:border-tribal-green transition-colors text-sm font-medium"
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
            class="flex-1 px-4 py-3 bg-white border-2 border-tribal-sand rounded-xl focus:outline-none focus:border-tribal-green transition-colors"
          />
        </div>

        {/* Contact 3 */}
        <div class="flex gap-2">
          <select
            name="contact_type_3"
            class="w-32 px-3 py-3 bg-white border-2 border-tribal-sand rounded-xl focus:outline-none focus:border-tribal-green transition-colors text-sm font-medium"
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
            class="flex-1 px-4 py-3 bg-white border-2 border-tribal-sand rounded-xl focus:outline-none focus:border-tribal-green transition-colors"
          />
        </div>

        <p class="mt-2 text-xs text-tribal-dark/50">
          Add up to 3 contact methods. Skip type selection to show as plain text.
        </p>
      </div>

      {/* About */}
      <div>
        <label class="block font-semibold text-tribal-dark mb-2">
          What do you do?
        </label>
        <textarea
          name="about"
          rows={3}
          placeholder="Your skills, interests, what you're working on..."
          class="w-full px-4 py-4 bg-white border-2 border-tribal-sand rounded-xl focus:outline-none focus:border-tribal-green transition-colors text-lg resize-none"
        />
      </div>

      {/* Info Banner */}
      <div class="p-4 bg-tribal-yellow/20 rounded-xl border border-tribal-yellow/50">
        <div class="flex items-start gap-3">
          <svg class="w-5 h-5 text-tribal-green mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
          <div class="text-sm text-tribal-dark/80">
            <p class="font-semibold mb-1">Your card will be visible for 7 days</p>
            <p>After that, it will be automatically archived. You can renew it anytime to stay visible!</p>
          </div>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        class="w-full py-4 bg-tribal-green text-white font-bold text-lg rounded-xl hover:bg-tribal-green-dark transition-colors shadow-lg active:scale-[0.98]"
      >
        Add Me to the Wall
      </button>
    </form>
  )
}
