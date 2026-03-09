import type { KeyboardEvent } from 'react'
import type { User } from '../types/users'
import styles from './UserCard.module.css'

type UserCardProps = {
  user: User
  viewMode: 'grid' | 'list'
  onClick: (user: User) => void
}

export function UserCard({ user, viewMode, onClick }: UserCardProps) {
  const fullName = `${user.firstName} ${user.lastName}`
  const location = [user.address.city, user.address.state].filter(Boolean).join(', ')
  const position = user.company.title || user.role
  const cardClassName = viewMode === 'list' ? `${styles.card} ${styles.cardList}` : styles.card

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onClick(user)
    }
  }

  if (viewMode === 'list') {
    return (
      <article
        className={cardClassName}
        role="button"
        tabIndex={0}
        onClick={() => onClick(user)}
        onKeyDown={handleKeyDown}
      >
        <div className={styles.listIdentity}>
          <img className={styles.avatar} src={user.image} alt={fullName} loading="lazy" />
          <div className={styles.identity}>
            <h3 className={styles.listName}>{fullName}</h3>
            <p className={styles.listMeta}>
              {position} <span aria-hidden="true">·</span> {user.email}
            </p>
          </div>
        </div>

        <div className={styles.listDetails}>
          <span className={styles.listValue}>{user.company.name}</span>
          <span className={styles.listLocation}>
            <span className={styles.icon} aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path d="M12 21s6-5.33 6-11a6 6 0 1 0-12 0c0 5.67 6 11 6 11Z" />
                <path d="M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
              </svg>
            </span>
            <span>{location}</span>
          </span>
          <span className={styles.ageBadge}>{user.age} лет</span>
        </div>
      </article>
    )
  }

  return (
    <article
      className={cardClassName}
      role="button"
      tabIndex={0}
      onClick={() => onClick(user)}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.header}>
        <img className={styles.avatar} src={user.image} alt={fullName} loading="lazy" />
        <div className={styles.identity}>
          <h3 className={styles.name}>{fullName}</h3>
          <p className={styles.role}>{position}</p>
          <p className={styles.email}>{user.email}</p>
        </div>
      </div>

      <dl className={styles.meta}>
        <div className={styles.metaItem}>
          <dt className={styles.srOnly}>Компания</dt>
          <dd className={styles.value}>
            <span className={styles.icon} aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path d="M7 7h7a2 2 0 0 1 2 2v8H5V9a2 2 0 0 1 2-2Z" />
                <path d="M9 7V5a2 2 0 0 1 2-2h6v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-1" />
                <path d="M9 11H5m4 4H5" />
              </svg>
            </span>
            <span>{user.company.name}</span>
          </dd>
        </div>
        <div className={styles.metaItem}>
          <dt className={styles.srOnly}>Локация</dt>
          <dd className={styles.value}>
            <span className={styles.icon} aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path d="M12 21s6-5.33 6-11a6 6 0 1 0-12 0c0 5.67 6 11 6 11Z" />
                <path d="M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
              </svg>
            </span>
            <span>{location}</span>
          </dd>
        </div>
        <div className={styles.metaItem}>
          <dt className={styles.srOnly}>Телефон</dt>
          <dd className={styles.value}>
            <span className={styles.icon} aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path d="M21 16.5v3a2 2 0 0 1-2.18 2 19.78 19.78 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.78 19.78 0 0 1 1.12 3.8 2 2 0 0 1 3.1 1.62h3a2 2 0 0 1 2 1.72l.35 2.82a2 2 0 0 1-.57 1.73L6 9.76a16 16 0 0 0 8.24 8.24l1.87-1.88a2 2 0 0 1 1.73-.57l2.82.35A2 2 0 0 1 21 16.5Z" />
              </svg>
            </span>
            <span>{user.phone}</span>
          </dd>
        </div>
        <div className={styles.metaItem}>
          <dt className={styles.srOnly}>Возраст</dt>
          <dd className={styles.value}>
            <span className={styles.icon} aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path d="M8 2v4M16 2v4M3 10h18" />
                <rect x="3" y="4" width="18" height="17" rx="2" />
              </svg>
            </span>
            <span>{user.age} лет</span>
          </dd>
        </div>
      </dl>
    </article>
  )
}
