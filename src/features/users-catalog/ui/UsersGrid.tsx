import type { User } from '../../../entities/user/model/types'
import { UserCard } from '../../../entities/user/ui/UserCard'
import type { UsersViewMode } from '../model/types'
import styles from './UsersGrid.module.css'

type UsersGridProps = {
  users: User[]
  viewMode: UsersViewMode
  onUserClick: (user: User) => void
}

export const UsersGrid = ({ users, viewMode, onUserClick }: UsersGridProps) => {
  return (
    <section
      className={viewMode === 'list' ? styles.list : styles.grid}
      aria-label="Список пользователей"
    >
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          viewMode={viewMode}
          onClick={onUserClick}
        />
      ))}
    </section>
  )
}
