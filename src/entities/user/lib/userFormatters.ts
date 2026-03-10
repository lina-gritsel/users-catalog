import type { User } from '../model/types'

export const getUserFullName = ({ firstName, lastName }: User) =>
  `${firstName} ${lastName}`

export const getUserLocation = ({ address }: User) =>
  [address.city, address.state].filter(Boolean).join(', ')

export const getUserPosition = ({ company, role }: User) => company.title || role

export const getUserAgeLabel = ({ age }: User) => `${age} лет`

export const getUserDisplayId = ({ id }: User) =>
  `#${String(id).padStart(4, '0')}`
