type UsersSummaryProps = {
  currentPage: number
  total: number
  totalPages: number
}

export const UsersSummary = ({
  currentPage,
  total,
  totalPages,
}: UsersSummaryProps) => {
  return (
    <>
      <div>
        <span>Найдено</span>
        <strong>{total}</strong>
      </div>
      <div>
        <span>Страница</span>
        <strong>
          {currentPage} / {totalPages}
        </strong>
      </div>
    </>
  )
}
