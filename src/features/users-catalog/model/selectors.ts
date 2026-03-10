import type { UsersResponse } from '../../../entities/user/model/types'

export const getUsersCatalogTotalPages = (
  total: number,
  pageSize: number,
) => Math.max(1, Math.ceil(total / pageSize))

export const clampUsersCatalogPage = (
  page: number,
  totalPages: number,
) => Math.min(Math.max(page, 1), totalPages)

export const getUsersCatalogRange = (data: UsersResponse) => {
  if (data.users.length === 0) {
    return { start: 0, end: 0 }
  }

  return {
    start: data.skip + 1,
    end: Math.min(data.skip + data.users.length, data.total),
  }
}
