import styles from './Pagination.module.css'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

type PaginationItem = number | 'ellipsis'

function getVisiblePages(currentPage: number, totalPages: number): PaginationItem[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 'ellipsis', totalPages]
  }

  if (currentPage >= totalPages - 2) {
    return [1, 'ellipsis', totalPages - 2, totalPages - 1, totalPages]
  }

  return [1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages]
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) {
    return null
  }

  const visiblePages = getVisiblePages(currentPage, totalPages)

  return (
    <nav className={styles.pagination} aria-label="Пагинация">
      <button
        className={styles.navButton}
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-disabled={currentPage === 1}
        aria-label="Предыдущая страница"
      >
        <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
          <path d="m14 6-6 6 6 6" />
        </svg>
      </button>

      <div className={styles.pages}>
        {visiblePages.map((page, index) =>
          page === 'ellipsis' ? (
            <span key={`ellipsis-${index}`} className={styles.ellipsis} aria-hidden="true">
              ...
            </span>
          ) : (
            <button
              key={page}
              className={page === currentPage ? styles.pageButtonActive : styles.pageButton}
              type="button"
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          ),
        )}
      </div>

      <button
        className={styles.navButton}
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-disabled={currentPage === totalPages}
        aria-label="Следующая страница"
      >
        <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
          <path d="m10 6 6 6-6 6" />
        </svg>
      </button>
    </nav>
  )
}
