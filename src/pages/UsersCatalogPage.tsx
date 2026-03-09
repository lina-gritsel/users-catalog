import { useEffect, useState } from 'react'
import { getUsers, searchUsers } from '../api/users'
import { Pagination } from '../components/Pagination'
import { SearchInput } from '../components/SearchInput'
import { StatusBlock } from '../components/StatusBlock'
import { UsersGrid } from '../components/UsersGrid'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import type { UsersResponse } from '../types/users'
import styles from './UsersCatalogPage.module.css'

const PAGE_SIZE = 12
const SEARCH_DEBOUNCE_MS = 350

const initialState: UsersResponse = {
  users: [],
  total: 0,
  skip: 0,
  limit: PAGE_SIZE,
}

export function UsersCatalogPage() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [data, setData] = useState<UsersResponse>(initialState)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  const trimmedQuery = query.trim()
  const debouncedQuery = useDebouncedValue(trimmedQuery, SEARCH_DEBOUNCE_MS)
  const totalPages = Math.max(1, Math.ceil(data.total / PAGE_SIZE))

  useEffect(() => {
    const skip = (page - 1) * PAGE_SIZE
    const controller = new AbortController()

    async function loadUsers() {
      setIsLoading(true)
      setError(null)

      try {
        const response = debouncedQuery
          ? await searchUsers({ query: debouncedQuery, limit: PAGE_SIZE, skip }, { signal: controller.signal })
          : await getUsers({ limit: PAGE_SIZE, skip }, { signal: controller.signal })

        const lastPage = Math.max(1, Math.ceil(response.total / response.limit))

        if (page > lastPage) {
          setPage(lastPage)
          return
        }

        if (!controller.signal.aborted) {
          setData(response)
        }
      } catch (loadError) {
        if (loadError instanceof DOMException && loadError.name === 'AbortError') {
          return
        }

        if (!controller.signal.aborted) {
          setError(loadError instanceof Error ? loadError.message : 'Что-то пошло не так.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void loadUsers()

    return () => {
      controller.abort()
    }
  }, [debouncedQuery, page, reloadKey])

  function handleSearchChange(nextValue: string) {
    setQuery(nextValue)
    setPage(1)
  }

  function handleRetry() {
    setReloadKey((value) => value + 1)
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.kicker}>Users Catalog</p>
          <h1>Каталог пользователей с поиском и серверной пагинацией</h1>
          <p className={styles.lead}>
            Данные загружаются из DummyJSON. Можно искать по имени, листать страницы и быстро
            просматривать ключевую информацию по каждому пользователю.
          </p>
        </div>

        <div className={styles.panel}>
          <SearchInput value={query} isBusy={isLoading} onChange={handleSearchChange} />
          <div className={styles.summary}>
            <div>
              <span>Найдено</span>
              <strong>{data.total}</strong>
            </div>
            <div>
              <span>Страница</span>
              <strong>
                {Math.min(page, totalPages)} / {totalPages}
              </strong>
            </div>
            <div>
              <span>Лимит</span>
              <strong>{PAGE_SIZE}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        {error ? (
          <StatusBlock
            title="Не удалось загрузить каталог"
            description={error}
            actionLabel="Повторить"
            onAction={handleRetry}
          />
        ) : null}

        {!error && isLoading && data.users.length === 0 ? (
          <StatusBlock
            title="Загружаем пользователей"
            description="Подтягиваем данные из публичного API и готовим каталог."
          />
        ) : null}

        {!error && !isLoading && data.users.length === 0 ? (
          <StatusBlock
            title="Ничего не найдено"
            description={
              debouncedQuery
                ? 'Попробуйте изменить поисковый запрос или очистить строку поиска.'
                : 'API не вернул пользователей для текущего запроса.'
            }
          />
        ) : null}

        {!error && data.users.length > 0 ? (
          <>
            <UsersGrid users={data.users} />
            <div className={styles.footer}>
              <p className={styles.range}>
                Показаны {data.skip + 1}-{Math.min(data.skip + data.users.length, data.total)} из{' '}
                {data.total}
              </p>
              <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
          </>
        ) : null}
      </section>
    </main>
  )
}
