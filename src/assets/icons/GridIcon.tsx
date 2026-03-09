import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

export const GridIcon = (props: IconProps) => {
  return (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true" {...props}>
      <rect x="4" y="4" width="6" height="6" rx="1.5" />
      <rect x="14" y="4" width="6" height="6" rx="1.5" />
      <rect x="4" y="14" width="6" height="6" rx="1.5" />
      <rect x="14" y="14" width="6" height="6" rx="1.5" />
    </svg>
  )
}
