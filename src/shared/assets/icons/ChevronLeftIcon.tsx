import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

export const ChevronLeftIcon = (props: IconProps) => {
  return (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true" {...props}>
      <path d="m14 6-6 6 6 6" />
    </svg>
  )
}
