import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

export const CloseIcon = (props: IconProps) => {
  return (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true" {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}
