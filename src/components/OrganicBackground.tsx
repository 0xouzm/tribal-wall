import type { FC } from 'hono/jsx'

interface OrganicBackgroundProps {
  class?: string
}

export const LeafPattern: FC<OrganicBackgroundProps> = ({ class: className = '' }) => {
  return (
    <svg class={className} viewBox="0 0 200 200" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 20c-30 10-50 40-50 80 0 50 30 80 50 80s50-30 50-80c0-40-20-70-50-80z" opacity="0.6"/>
      <path d="M100 30c0 60 0 140 0 140" stroke="currentColor" stroke-width="2" fill="none" opacity="0.4"/>
      <path d="M100 50c-15 10-25 30-25 50" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.3"/>
      <path d="M100 50c15 10 25 30 25 50" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.3"/>
      <path d="M100 80c-12 8-18 20-18 35" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.3"/>
      <path d="M100 80c12 8 18 20 18 35" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.3"/>
    </svg>
  )
}

export const FernSpiral: FC<OrganicBackgroundProps> = ({ class: className = '' }) => {
  return (
    <svg class={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M50 90 Q30 70 35 50 Q40 30 50 20 Q60 30 65 50 Q70 70 50 90"
        stroke="currentColor"
        stroke-width="1.5"
        opacity="0.5"
      />
      <path d="M50 85 Q35 65 40 45" stroke="currentColor" stroke-width="1" opacity="0.3"/>
      <path d="M50 85 Q65 65 60 45" stroke="currentColor" stroke-width="1" opacity="0.3"/>
      <circle cx="50" cy="20" r="3" fill="currentColor" opacity="0.4"/>
    </svg>
  )
}

export const BranchPattern: FC<OrganicBackgroundProps> = ({ class: className = '' }) => {
  return (
    <svg class={className} viewBox="0 0 300 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 50 Q75 30 150 50 Q225 70 300 50"
        stroke="currentColor"
        stroke-width="2"
        opacity="0.4"
      />
      <path d="M50 50 Q60 35 75 30" stroke="currentColor" stroke-width="1.5" opacity="0.3"/>
      <path d="M100 45 Q110 55 125 60" stroke="currentColor" stroke-width="1.5" opacity="0.3"/>
      <path d="M200 55 Q210 40 220 35" stroke="currentColor" stroke-width="1.5" opacity="0.3"/>
      <path d="M250 50 Q260 60 275 65" stroke="currentColor" stroke-width="1.5" opacity="0.3"/>
      <circle cx="75" cy="30" r="4" fill="currentColor" opacity="0.25"/>
      <circle cx="125" cy="60" r="3" fill="currentColor" opacity="0.25"/>
      <circle cx="220" cy="35" r="4" fill="currentColor" opacity="0.25"/>
      <circle cx="275" cy="65" r="3" fill="currentColor" opacity="0.25"/>
    </svg>
  )
}

export const DotCluster: FC<OrganicBackgroundProps> = ({ class: className = '' }) => {
  return (
    <svg class={className} viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="8" opacity="0.15"/>
      <circle cx="30" cy="35" r="5" opacity="0.1"/>
      <circle cx="70" cy="40" r="6" opacity="0.12"/>
      <circle cx="35" cy="65" r="4" opacity="0.1"/>
      <circle cx="65" cy="70" r="5" opacity="0.08"/>
      <circle cx="20" cy="55" r="3" opacity="0.08"/>
      <circle cx="80" cy="55" r="4" opacity="0.1"/>
    </svg>
  )
}
