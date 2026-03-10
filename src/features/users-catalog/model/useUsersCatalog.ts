import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { User } from '@entities/user/model/types'
import { useDebouncedValue } from '@shared/hooks'
import {
  DEFAULT_USERS_VIEW_MODE,
  EMPTY_USERS_RESPONSE,
  USERS_CATALOG_PAGE_SIZE,
  USERS_CATALOG_SEARCH_DEBOUNCE_MS,
} from '@features/users-catalog/config/usersCatalog'
import type { UsersViewMode } from './types'
import { usersCatalogQueryOptions } from '@features/users-catalog/api'
import {
  clampUsersCatalogPage,
  getUsersCatalogRange,
  getUsersCatalogTotalPages,
} from './selectors'

type UsersCatalogActions = {
  changePage: (nextPage: number) => void
  changeSearch: (nextValue: string) => void
  changeViewMode: (nextViewMode: UsersViewMode) => void
  closeUserDetails: () => void
  retry: () => void
  selectUser: (user: User) => void
}

type UsersCatalogState = {
  currentPage: number
  error: unknown
  errorMessage: string
  hasUsers: boolean
  isBusy: boolean
  isEmpty: boolean
  isInitialLoading: boolean
  normalizedQuery: string
  query: string
  range: {
    start: number
    end: number
  }
  selectedUser: User | null
  total: number
  totalPages: number
  users: User[]
  viewMode: UsersViewMode
}

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

  const state: UsersCatalogState = {
    currentPage,
    error,
    errorMessage,
    hasUsers,
    isBusy,
    isEmpty,
    isInitialLoading,
    normalizedQuery,
    query,
    range,
    selectedUser,
    total: data.total,
    totalPages,
    users: data.users,
    viewMode,
  }

  const actions: UsersCatalogActions = {
    changePage: handlePageChange,
    changeSearch: handleSearchChange,
    changeViewMode: handleViewModeChange,
    closeUserDetails: handleUserDetailsClose,
    retry: handleRetry,
    selectUser: handleUserSelect,
  }

  return { actions, state }
}
