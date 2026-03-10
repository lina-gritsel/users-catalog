import { GridIcon, ListIcon } from '@shared/assets/icons'
import type { UsersViewMode } from '@features/users-catalog/model'
import styles from '@features/users-catalog/ui/ViewModeSwitch.module.css'

type ViewModeSwitchProps = {
  value: UsersViewMode
  onChange: (viewMode: UsersViewMode) => void
}

const getButtonClassName = (
  currentValue: UsersViewMode,
  buttonValue: UsersViewMode,
) => (currentValue === buttonValue ? styles.buttonActive : styles.button)

export const ViewModeSwitch = ({ value, onChange }: ViewModeSwitchProps) => {
  return (
    <div className={styles.switch} role="group" aria-label="Режим отображения">
      <button
        type="button"
        className={getButtonClassName(value, 'grid')}
        onClick={() => onChange('grid')}
        aria-label="Показать сеткой"
        aria-pressed={value === 'grid'}
      >
        <GridIcon />
      </button>
      <button
        type="button"
        className={getButtonClassName(value, 'list')}
        onClick={() => onChange('list')}
        aria-label="Показать списком"
        aria-pressed={value === 'list'}
      >
        <ListIcon />
      </button>
    </div>
  )
}
