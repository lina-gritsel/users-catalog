import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { User } from '../../../entities/user/model/types'
import { useDebouncedValue } from '../../../shared/hooks/useDebouncedValue'
import {
  DEFAULT_USERS_VIEW_MODE,
  EMPTY_USERS_RESPONSE,
  USERS_CATALOG_PAGE_SIZE,
  USERS_CATALOG_SEARCH_DEBOUNCE_MS,
} from '../config/usersCatalog'
import type { UsersViewMode } from './types'
import { usersCatalogQueryOptions } from '../api/usersQueries'
import {
  clampUsersCatalogPage,
  getUsersCatalogRange,
  getUsersCatalogTotalPages,
} from './selectors'

export const useUsersCatalog = () => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [viewMode, setViewMode] =
    useState<UsersViewMode>(DEFAULT_USERS_VIEW_MODE)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const normalizedQuery = useDebouncedValue(
    query.trim(),
    USERS_CATALOG_SEARCH_DEBOUNCE_MS,
  )

  const { data: queryData, error, isFetching, isLoading, refetch } = useQuery(
    usersCatalogQueryOptions({
      query: normalizedQuery,
      page,
      pageSize: USERS_CATALOG_PAGE_SIZE,
    }),
  )
  const data = queryData ?? EMPTY_USERS_RESPONSE
  const totalPages = getUsersCatalogTotalPages(
    data.total,
    USERS_CATALOG_PAGE_SIZE,
  )
  const currentPage = clampUsersCatalogPage(page, totalPages)
  const hasUsers = data.users.length > 0
  const isInitialLoading = isLoading && !hasUsers
  const isEmpty = !error && !isLoading && !hasUsers
  const isBusy = isLoading || isFetching
  const errorMessage =
    error instanceof Error ? error.message : 'Что-то пошло не так.'
  const range = getUsersCatalogRange(data)

  useEffect(() => {
    const lastPage = getUsersCatalogTotalPages(data.total, data.limit)

    if (page > lastPage) {
      setPage(lastPage)
    }
  }, [data.limit, data.total, page])

  const handleSearchChange = (nextValue: string) => {
    setQuery(nextValue)
    setPage(1)
  }

  const handleRetry = () => {
    void refetch()
  }

  const handleViewModeChange = (nextViewMode: UsersViewMode) => {
    setViewMode(nextViewMode)
  }

  const handlePageChange = (nextPage: number) => {
    setPage(clampUsersCatalogPage(nextPage, totalPages))
  }

  const handleUserSelect = (user: User) => {
    setSelectedUser(user)
  }

  const handleUserDetailsClose = () => {
    setSelectedUser(null)
  }

  return {
    currentPage,
    error,
    errorMessage,
    handleRetry,
    handleSearchChange,
    handleUserDetailsClose,
    handleUserSelect,
    handleViewModeChange,
    hasUsers,
    isBusy,
    isEmpty,
    isInitialLoading,
    normalizedQuery,
    page,
    query,
    range,
    selectedUser,
    handlePageChange,
    total: data.total,
    totalPages,
    users: data.users,
    viewMode,
  }
}
