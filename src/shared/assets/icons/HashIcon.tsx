import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

export const HashIcon = (props: IconProps) => {
  return (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true" {...props}>
      <path d="M9 3 7 21M17 3l-2 18M4 9h16M3 15h16" />
    </svg>
  )
}
