import styles from '@features/users-catalog/ui/SearchInput.module.css'

type SearchInputProps = {
  value: string
  isBusy: boolean
  onChange: (value: string) => void
}

export const SearchInput = ({ value, isBusy, onChange }: SearchInputProps) => {
  return (
    <label className={styles.searchField}>
      <span className={styles.label}>Поиск по имени</span>
      <div className={styles.inputWrap}>
        <input
          className={styles.input}
          type="search"
          value={value}
          placeholder="Например, Emily"
          onChange={(event) => onChange(event.target.value)}
        />
        <span className={styles.status}>{isBusy ? 'Ищем...' : 'Search'}</span>
      </div>
    </label>
  )
}
