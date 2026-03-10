export const usersCatalogQueryKeys = {
  all: ['users'] as const,
  list: (query: string, page: number, pageSize: number) =>
    [...usersCatalogQueryKeys.all, 'list', { page, pageSize, query }] as const,
}
