import type { User } from '../types/users'
import styles from './UserCard.module.css'

type UserCardProps = {
  user: User
}

export function UserCard({ user }: UserCardProps) {
  const fullName = `${user.firstName} ${user.lastName}`
  const location = [user.address.city, user.address.state].filter(Boolean).join(', ')

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <img className={styles.avatar} src={user.image} alt={fullName} loading="lazy" />
        <div className={styles.identity}>
          <p className={styles.name}>{fullName}</p>
          <p className={styles.role}>{user.role}</p>
        </div>
      </div>

      <dl className={styles.meta}>
        <div>
          <dt>Email</dt>
          <dd>
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </dd>
        </div>
        <div>
          <dt>Телефон</dt>
          <dd>
            <a href={`tel:${user.phone}`}>{user.phone}</a>
          </dd>
        </div>
        <div>
          <dt>Возраст</dt>
          <dd>{user.age}</dd>
        </div>
        <div>
          <dt>Компания</dt>
          <dd>{user.company.name}</dd>
        </div>
        <div>
          <dt>Локация</dt>
          <dd>{location}</dd>
        </div>
      </dl>
    </article>
  )
}
