import type {
  FetchUsersParams,
  SearchUsersParams,
  UsersResponse,
} from '../../../entities/user/model/types'

export type UsersRequestOptions = {
  signal?: AbortSignal
}

export type UsersCatalogListParams = {
  page: number
  pageSize: number
  query: string
}

export type UsersApiRequestParams = FetchUsersParams | SearchUsersParams

export type UsersApiRequest = (
  params: UsersApiRequestParams,
  options?: UsersRequestOptions,
) => Promise<UsersResponse>
