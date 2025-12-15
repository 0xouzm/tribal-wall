import type { FC, PropsWithChildren } from 'hono/jsx'
import { ScribbleSVG } from './ScribbleSVG'

interface LayoutProps extends PropsWithChildren {
  title?: string
}

export const Layout: FC<LayoutProps> = ({ children, title = 'Tribal Wall' }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Source+Sans+3:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{__html: `
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  'forest': {
                    'deep': '#1B3A2F',
                    'moss': '#2D5A4A',
                    'sage': '#6B8F71',
                    'fern': '#8FB996',
                    'mist': '#C8D5C0',
                  },
                  'amber': {
                    'warm': '#D4A373',
                    'gold': '#E9C46A',
                    'light': '#F4D58D',
                  },
                  'earth': {
                    'cream': '#FAF8F5',
                    'sand': '#EDE8E0',
                    'bark': '#3D3229',
                    'stone': '#6B6560',
                  },
                },
                fontFamily: {
                  'display': ['Caveat', 'cursive'],
                  'body': ['Source Sans 3', 'system-ui', 'sans-serif'],
                },
                boxShadow: {
                  'soft': '0 2px 15px -3px rgba(27, 58, 47, 0.08), 0 4px 6px -4px rgba(27, 58, 47, 0.04)',
                  'card': '0 4px 20px -4px rgba(27, 58, 47, 0.12), 0 8px 16px -8px rgba(27, 58, 47, 0.08)',
                  'elevated': '0 12px 40px -8px rgba(27, 58, 47, 0.18)',
                },
                backgroundImage: {
                  'forest-gradient': 'linear-gradient(135deg, #1B3A2F 0%, #2D5A4A 100%)',
                  'amber-gradient': 'linear-gradient(135deg, #D4A373 0%, #E9C46A 100%)',
                  'mist-gradient': 'linear-gradient(180deg, #FAF8F5 0%, #EDE8E0 100%)',
                },
              },
            },
          }
        `}} />
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-8px) rotate(2deg); }
          }
          @keyframes breathe {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 0.6; }
          }
          .animate-fade-up {
            animation: fadeUp 0.5s ease-out forwards;
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animate-breathe {
            animation: breathe 4s ease-in-out infinite;
          }
          .tribal-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .tribal-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 40px -8px rgba(27, 58, 47, 0.18);
          }
          .noise-overlay {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
            opacity: 0.03;
          }
          .glass-effect {
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
          }
          ::selection {
            background-color: #8FB996;
            color: #1B3A2F;
          }
        `}} />
      </head>
      <body class="bg-earth-cream min-h-screen font-body text-earth-bark antialiased">
        <div class="relative overflow-hidden">
          {/* Subtle noise texture overlay */}
          <div class="fixed inset-0 pointer-events-none noise-overlay z-0" />

          {/* Scribble background decorations */}
          <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
            <ScribbleSVG class="absolute -top-20 -left-20 w-64 h-64 text-amber-gold/20" />
            <ScribbleSVG class="absolute top-1/3 -right-32 w-96 h-96 text-forest-sage/15 rotate-45" />
            <ScribbleSVG class="absolute -bottom-20 left-1/4 w-72 h-72 text-amber-gold/15 -rotate-12" />
          </div>

          {/* Content */}
          <div class="relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
