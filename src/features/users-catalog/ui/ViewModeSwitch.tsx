import { GridIcon } from '../../../shared/assets/icons/GridIcon'
import { ListIcon } from '../../../shared/assets/icons/ListIcon'
import type { UsersViewMode } from '../model/types'

type ViewModeSwitchProps = {
  activeViewMode: UsersViewMode
  getButtonClassName: (viewMode: UsersViewMode) => string
  onChange: (viewMode: UsersViewMode) => void
}

export const ViewModeSwitch = ({
  activeViewMode,
  getButtonClassName,
  onChange,
}: ViewModeSwitchProps) => {
  return (
    <div role="group" aria-label="Режим отображения">
      <button
        type="button"
        className={getButtonClassName('grid')}
        onClick={() => onChange('grid')}
        aria-label="Показать сеткой"
        aria-pressed={activeViewMode === 'grid'}
      >
        <GridIcon />
      </button>
      <button
        type="button"
        className={getButtonClassName('list')}
        onClick={() => onChange('list')}
        aria-label="Показать списком"
        aria-pressed={activeViewMode === 'list'}
      >
        <ListIcon />
      </button>
    </div>
  )
}
