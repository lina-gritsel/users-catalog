import { UserDetailsModal } from '../../../entities/user/ui/UserDetailsModal'
import { SearchInput } from '../../../features/users-catalog/ui/SearchInput'
import { UsersGrid } from '../../../features/users-catalog/ui/UsersGrid'
import { UsersSummary } from '../../../features/users-catalog/ui/UsersSummary'
import { ViewModeSwitch } from '../../../features/users-catalog/ui/ViewModeSwitch'
import { useUsersCatalog } from '../../../features/users-catalog/model/useUsersCatalog'
import { Pagination } from '../../../shared/ui/pagination/Pagination'
import { StatusBlock } from '../../../shared/ui/status-block/StatusBlock'
import styles from './UsersCatalogPage.module.css'

export const UsersCatalogPage = () => {
  const {
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
    query,
    range,
    selectedUser,
    handlePageChange,
    total,
    totalPages,
    users,
    viewMode,
  } = useUsersCatalog()

  const getViewButtonClassName = (mode: 'grid' | 'list') =>
    viewMode === mode ? styles.viewButtonActive : styles.viewButton

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
            onChange={handleSearchChange}
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
          <div className={styles.viewSwitch}>
            <ViewModeSwitch
              activeViewMode={viewMode}
              getButtonClassName={getViewButtonClassName}
              onChange={handleViewModeChange}
            />
          </div>
        </div>

        {error ? (
          <StatusBlock
            title="Не удалось загрузить каталог"
            description={errorMessage}
            actionLabel="Повторить"
            onAction={handleRetry}
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
              onUserClick={handleUserSelect}
            />
            <div className={styles.footer}>
              <p className={styles.range}>
                Показаны {range.start}-{range.end} из {total}
              </p>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        ) : null}
      </section>
      {selectedUser ? (
        <UserDetailsModal user={selectedUser} onClose={handleUserDetailsClose} />
      ) : null}
    </main>
  )
}
