import type { User } from '../types/users'
import { UserCard } from './UserCard'
import styles from './UsersGrid.module.css'

type UsersGridProps = {
  users: User[]
}

export function UsersGrid({ users }: UsersGridProps) {
  return (
    <section className={styles.grid} aria-label="Список пользователей">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </section>
  )
}
