import type { User } from '@entities/user'
import { UserCard } from '@entities/user'
import type { UsersViewMode } from '@features/users-catalog/model'
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
