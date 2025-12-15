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
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{__html: `
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  'tribal-green': '#2D5A3D',
                  'tribal-green-light': '#3D7A52',
                  'tribal-green-dark': '#1D3A2D',
                  'tribal-yellow': '#F5C842',
                  'tribal-yellow-light': '#FFE066',
                  'tribal-cream': '#FDF6E3',
                  'tribal-sand': '#E8DCC4',
                  'tribal-dark': '#1A1A1A',
                },
                fontFamily: {
                  'display': ['Caveat', 'cursive'],
                  'body': ['DM Sans', 'system-ui', 'sans-serif'],
                },
              },
            },
          }
        `}} />
        <link rel="stylesheet" href="/styles/global.css" />
      </head>
      <body class="bg-tribal-cream min-h-screen font-body text-tribal-dark">
        <div class="relative overflow-hidden">
          {/* Background decorations */}
          <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
            <ScribbleSVG class="absolute -top-20 -left-20 w-64 h-64 text-tribal-yellow/20" />
            <ScribbleSVG class="absolute top-1/3 -right-32 w-96 h-96 text-tribal-green/10 rotate-45" />
            <ScribbleSVG class="absolute -bottom-20 left-1/4 w-72 h-72 text-tribal-yellow/15 -rotate-12" />
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
