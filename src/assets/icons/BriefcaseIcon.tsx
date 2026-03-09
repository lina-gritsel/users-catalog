import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

export const BriefcaseIcon = (props: IconProps) => {
  return (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true" {...props}>
      <path d="M7 7h10a2 2 0 0 1 2 2v9H5V9a2 2 0 0 1 2-2Z" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
    </svg>
  )
}
