import type {
  FetchUsersParams,
  SearchUsersParams,
  UsersResponse,
} from '../types/users'

const BASE_URL = 'https://dummyjson.com/users'

type RequestOptions = {
  signal?: AbortSignal
}

const requestUsers = async (
  path: string,
  params: Record<string, string | number>,
  options: RequestOptions = {},
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
  options?: RequestOptions,
) => requestUsers('', { limit, skip }, options)

export const searchUsers = (
  { query, limit, skip }: SearchUsersParams,
  options?: RequestOptions,
) => requestUsers('/search', { q: query, limit, skip }, options)
