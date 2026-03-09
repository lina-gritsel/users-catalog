import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

export const ListIcon = (props: IconProps) => {
  return (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true" {...props}>
      <path d="M9 6h11M9 12h11M9 18h11" />
      <circle cx="5" cy="6" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="5" cy="12" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="5" cy="18" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  )
}
