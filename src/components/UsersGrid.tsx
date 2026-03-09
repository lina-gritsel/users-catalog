import type { User } from '../types/users'
import { UserCard } from './UserCard'
import styles from './UsersGrid.module.css'

type UsersGridProps = {
  users: User[]
  viewMode: 'grid' | 'list'
  onUserClick: (user: User) => void
}

export const UsersGrid = ({ users, viewMode, onUserClick }: UsersGridProps) => {
  return (
    <section
      className={viewMode === 'list' ? styles.list : styles.grid}
      aria-label="Список пользователей"
    >
      {users.map((user) => (
        <UserCard key={user.id} user={user} viewMode={viewMode} onClick={onUserClick} />
      ))}
    </section>
  )
}
