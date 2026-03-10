import type {
  FetchUsersParams,
  SearchUsersParams,
  UsersResponse,
} from '../../../entities/user/model/types'
import type {
  UsersCatalogListParams,
  UsersRequestOptions,
} from './types'

const BASE_URL = 'https://dummyjson.com/users'

const requestUsers = async (
  path: string,
  params: Record<string, string | number>,
  options: UsersRequestOptions = {},
) => {
  const searchParams = new URLSearchParams(
    Object.entries(params).reduce<Record<string, string>>(
      (accumulator, [key, value]) => {
        accumulator[key] = String(value)
        return accumulator
      },
      {},
    ),
  )

  const response = await fetch(
    `${BASE_URL}${path}?${searchParams.toString()}`,
    {
      signal: options.signal,
    },
  )

  if (!response.ok) {
    throw new Error('Не удалось загрузить пользователей. Попробуйте еще раз.')
  }

  return (await response.json()) as UsersResponse
}

export const getUsers = (
  { limit, skip }: FetchUsersParams,
  options?: UsersRequestOptions,
) => requestUsers('', { limit, skip }, options)

export const searchUsers = (
  { query, limit, skip }: SearchUsersParams,
  options?: UsersRequestOptions,
) => requestUsers('/search', { q: query, limit, skip }, options)

export const getUsersCatalogList = (
  { page, pageSize, query }: UsersCatalogListParams,
  options?: UsersRequestOptions,
) => {
  const skip = (page - 1) * pageSize

  return query
    ? searchUsers({ query, limit: pageSize, skip }, options)
    : getUsers({ limit: pageSize, skip }, options)
}
