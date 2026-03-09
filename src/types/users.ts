export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  image: string
  phone: string
  age: number
  role: string
  company: {
    name: string
  }
  address: {
    city: string
    state: string
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
