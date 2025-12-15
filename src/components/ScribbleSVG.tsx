import type { FC } from 'hono/jsx'

interface ScribbleSVGProps {
  class?: string
}

export const ScribbleSVG: FC<ScribbleSVGProps> = ({ class: className = '' }) => {
  return (
    <svg
      class={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20,100 Q60,20 100,100 T180,100"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="round"
        fill="none"
        class="animate-scribble"
      />
      <path
        d="M40,60 Q80,120 120,60 T160,80"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        fill="none"
        class="animate-scribble"
        style="animation-delay: 0.3s"
      />
      <path
        d="M30,140 Q70,180 110,140 T170,150"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        fill="none"
        class="animate-scribble"
        style="animation-delay: 0.6s"
      />
      <circle
        cx="50"
        cy="50"
        r="8"
        fill="currentColor"
        opacity="0.5"
      />
      <circle
        cx="150"
        cy="150"
        r="6"
        fill="currentColor"
        opacity="0.4"
      />
    </svg>
  )
}
