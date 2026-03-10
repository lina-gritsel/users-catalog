import {
  keepPreviousData,
  queryOptions,
} from '@tanstack/react-query'
import { usersCatalogQueryKeys } from './queryKeys'
import type { UsersCatalogListParams } from './types'
import { getUsersCatalogList } from './usersApi'

export const usersCatalogQueryOptions = ({
  query,
  page,
  pageSize,
}: UsersCatalogListParams) => {
  return queryOptions({
    queryKey: usersCatalogQueryKeys.list(query, page, pageSize),
    queryFn: ({ signal }) =>
      getUsersCatalogList({ query, page, pageSize }, { signal }),
    placeholderData: keepPreviousData,
  })
}
