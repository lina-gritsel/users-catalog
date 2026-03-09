import type { KeyboardEvent } from 'react'
import { CalendarIcon } from '../assets/icons/CalendarIcon'
import { CompanyIcon } from '../assets/icons/CompanyIcon'
import { LocationIcon } from '../assets/icons/LocationIcon'
import { PhoneIcon } from '../assets/icons/PhoneIcon'
import type { User } from '../types/users'
import styles from './UserCard.module.css'

type UserCardProps = {
  user: User
  viewMode: 'grid' | 'list'
  onClick: (user: User) => void
}

export const UserCard = ({ user, viewMode, onClick }: UserCardProps) => {
  const fullName = `${user.firstName} ${user.lastName}`
  const location = [user.address.city, user.address.state].filter(Boolean).join(', ')
  const position = user.company.title || user.role
  const cardClassName = viewMode === 'list' ? `${styles.card} ${styles.cardList}` : styles.card

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
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
              <LocationIcon />
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
              <CompanyIcon />
            </span>
            <span>{user.company.name}</span>
          </dd>
        </div>
        <div className={styles.metaItem}>
          <dt className={styles.srOnly}>Локация</dt>
          <dd className={styles.value}>
            <span className={styles.icon} aria-hidden="true">
              <LocationIcon />
            </span>
            <span>{location}</span>
          </dd>
        </div>
        <div className={styles.metaItem}>
          <dt className={styles.srOnly}>Телефон</dt>
          <dd className={styles.value}>
            <span className={styles.icon} aria-hidden="true">
              <PhoneIcon />
            </span>
            <span>{user.phone}</span>
          </dd>
        </div>
        <div className={styles.metaItem}>
          <dt className={styles.srOnly}>Возраст</dt>
          <dd className={styles.value}>
            <span className={styles.icon} aria-hidden="true">
              <CalendarIcon />
            </span>
            <span>{user.age} лет</span>
          </dd>
        </div>
      </dl>
    </article>
  )
}
