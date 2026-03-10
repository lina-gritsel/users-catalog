export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  image: string
  phone: string
  age: number
  role: string
  username?: string
  gender?: string
  birthDate?: string
  university?: string
  company: {
    name: string
    title?: string
    department?: string
  }
  address: {
    address?: string
    city: string
    state: string
    country?: string
  }
}

export type UsersResponse = {
  users: User[]
  total: number
  skip: number
  limit: number
}

export type FetchUsersParams = {
  limit: number
  skip: number
}

export type SearchUsersParams = FetchUsersParams & {
  query: string
}
