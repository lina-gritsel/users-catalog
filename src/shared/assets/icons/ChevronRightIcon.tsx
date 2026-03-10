import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

export const ChevronRightIcon = (props: IconProps) => {
  return (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true" {...props}>
      <path d="m10 6 6 6-6 6" />
    </svg>
  )
}
