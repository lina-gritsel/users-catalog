import { UserDetailsModal } from '@entities/user'
import {
  SearchInput,
  useUsersCatalog,
  UsersGrid,
  UsersSummary,
  ViewModeSwitch,
} from '@features/users-catalog'
import { Pagination, StatusBlock } from '@shared/ui'
import styles from './UsersCatalogPage.module.css'

export const UsersCatalogPage = () => {
  const {
    actions: {
      changePage,
      changeSearch,
      changeViewMode,
      closeUserDetails,
      retry,
      selectUser,
    },
    state: {
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
      total,
      totalPages,
      users,
      viewMode,
    },
  } = useUsersCatalog()

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.kicker}>Users Catalog</p>
          <h1>Каталог пользователей</h1>
          <p className={styles.lead}>
            Данные загружаются из DummyJSON. Можно искать по имени, листать
            страницы и быстро просматривать ключевую информацию по каждому
            пользователю.
          </p>
        </div>

        <div className={styles.panel}>
          <SearchInput
            value={query}
            isBusy={isBusy}
            onChange={changeSearch}
          />
          <div className={styles.summary}>
            <UsersSummary
              currentPage={currentPage}
              total={total}
              totalPages={totalPages}
            />
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.toolbar}>
          <ViewModeSwitch value={viewMode} onChange={changeViewMode} />
        </div>

        {error ? (
          <StatusBlock
            title="Не удалось загрузить каталог"
            description={errorMessage}
            actionLabel="Повторить"
            onAction={retry}
          />
        ) : null}

        {!error && isInitialLoading ? (
          <StatusBlock
            title="Загружаем пользователей"
            description="Подтягиваем данные из публичного API и готовим каталог."
          />
        ) : null}

        {!error && isEmpty ? (
          <StatusBlock
            title="Ничего не найдено"
            description={
              normalizedQuery
                ? 'Попробуйте изменить поисковый запрос или очистить строку поиска.'
                : 'API не вернул пользователей для текущего запроса.'
            }
          />
        ) : null}

        {!error && hasUsers ? (
          <>
            <UsersGrid
              users={users}
              viewMode={viewMode}
              onUserClick={selectUser}
            />
            <div className={styles.footer}>
              <p className={styles.range}>
                Показаны {range.start}-{range.end} из {total}
              </p>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={changePage}
              />
            </div>
          </>
        ) : null}
      </section>
      {selectedUser ? (
        <UserDetailsModal user={selectedUser} onClose={closeUserDetails} />
      ) : null}
    </main>
  )
}
