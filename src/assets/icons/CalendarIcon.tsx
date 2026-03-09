import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

export const CalendarIcon = (props: IconProps) => {
  return (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true" {...props}>
      <path d="M8 2v4M16 2v4M3 10h18" />
      <rect x="3" y="4" width="18" height="17" rx="2" />
    </svg>
  )
}
