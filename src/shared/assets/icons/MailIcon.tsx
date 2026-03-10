import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

export const MailIcon = (props: IconProps) => {
  return (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true" {...props}>
      <path d="M4 6h16v12H4z" />
      <path d="m4 8 8 6 8-6" />
    </svg>
  )
}
