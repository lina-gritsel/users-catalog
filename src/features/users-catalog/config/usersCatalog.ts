import type { UsersResponse } from '@entities/user/model/types'

export const USERS_CATALOG_PAGE_SIZE = 12
export const USERS_CATALOG_SEARCH_DEBOUNCE_MS = 350
export const DEFAULT_USERS_VIEW_MODE = 'grid' as const

export const EMPTY_USERS_RESPONSE: UsersResponse = {
  users: [],
  total: 0,
  skip: 0,
  limit: USERS_CATALOG_PAGE_SIZE,
}
