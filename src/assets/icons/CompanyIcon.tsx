import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

export const CompanyIcon = (props: IconProps) => {
  return (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true" {...props}>
      <path d="M7 7h7a2 2 0 0 1 2 2v8H5V9a2 2 0 0 1 2-2Z" />
      <path d="M9 7V5a2 2 0 0 1 2-2h6v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-1" />
      <path d="M9 11H5m4 4H5" />
    </svg>
  )
}
