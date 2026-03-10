import { ChevronLeftIcon, ChevronRightIcon } from '@shared/assets/icons'
import styles from './Pagination.module.css'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

type PaginationItem = number | 'ellipsis'

const clampPage = (page: number, totalPages: number) =>
  Math.min(Math.max(page, 1), totalPages)

const getVisiblePages = (
  currentPage: number,
  totalPages: number,
): PaginationItem[] => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 'ellipsis', totalPages]
  }

  if (currentPage >= totalPages - 2) {
    return [1, 'ellipsis', totalPages - 2, totalPages - 1, totalPages]
  }

  return [
    1,
    'ellipsis',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    'ellipsis',
    totalPages,
  ]
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) {
    return null
  }

  const safeCurrentPage = clampPage(currentPage, totalPages)
  const visiblePages = getVisiblePages(safeCurrentPage, totalPages)
  const handlePageChange = (nextPage: number) => {
    onPageChange(clampPage(nextPage, totalPages))
  }

  return (
    <nav className={styles.pagination} aria-label="Пагинация">
      <button
        className={styles.navButton}
        type="button"
        onClick={() => handlePageChange(safeCurrentPage - 1)}
        disabled={safeCurrentPage === 1}
        aria-disabled={safeCurrentPage === 1}
        aria-label="Предыдущая страница"
      >
        <ChevronLeftIcon />
      </button>

      <div className={styles.pages}>
        {visiblePages.map((page, index) =>
          page === 'ellipsis' ? (
            <span
              key={`ellipsis-${index}`}
              className={styles.ellipsis}
              aria-hidden="true"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              className={
                page === safeCurrentPage
                  ? styles.pageButtonActive
                  : styles.pageButton
              }
              type="button"
              onClick={() => handlePageChange(page)}
              aria-current={page === safeCurrentPage ? 'page' : undefined}
            >
              {page}
            </button>
          ),
        )}
      </div>

      <button
        className={styles.navButton}
        type="button"
        onClick={() => handlePageChange(safeCurrentPage + 1)}
        disabled={safeCurrentPage === totalPages}
        aria-disabled={safeCurrentPage === totalPages}
        aria-label="Следующая страница"
      >
        <ChevronRightIcon />
      </button>
    </nav>
  )
}
