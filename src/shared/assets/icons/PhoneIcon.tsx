import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

export const PhoneIcon = (props: IconProps) => {
  return (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true" {...props}>
      <path d="M21 16.5v3a2 2 0 0 1-2.18 2 19.78 19.78 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.78 19.78 0 0 1 1.12 3.8 2 2 0 0 1 3.1 1.62h3a2 2 0 0 1 2 1.72l.35 2.82a2 2 0 0 1-.57 1.73L6 9.76a16 16 0 0 0 8.24 8.24l1.87-1.88a2 2 0 0 1 1.73-.57l2.82.35A2 2 0 0 1 21 16.5Z" />
    </svg>
  )
}
