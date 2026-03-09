import type { ReactNode } from 'react'
import { useEffect } from 'react'
import type { User } from '../types/users'
import styles from './UserDetailsModal.module.css'

type UserDetailsModalProps = {
  user: User
  onClose: () => void
}

type DetailRowProps = {
  label: string
  value: string
  icon: ReactNode
}

function DetailRow({ label, value, icon }: DetailRowProps) {
  return (
    <div className={styles.detailRow}>
      <span className={styles.detailIcon} aria-hidden="true">
        {icon}
      </span>
      <div className={styles.detailBody}>
        <dt>{label}</dt>
        <dd>{value}</dd>
      </div>
    </div>
  )
}

export function UserDetailsModal({ user, onClose }: UserDetailsModalProps) {
  const fullName = `${user.firstName} ${user.lastName}`
  const position = user.company.title || user.role
  const location = [user.address.city, user.address.state].filter(Boolean).join(', ')

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div className={styles.overlay} role="presentation" onClick={onClose}>
      <aside
        className={styles.drawer}
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-details-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Закрыть">
          <svg viewBox="0 0 24 24" focusable="false">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        <h2 className={styles.srOnly} id="user-details-title">
          Профиль пользователя
        </h2>

        <div className={styles.header}>
          <img className={styles.avatar} src={user.image} alt={fullName} />
          <p className={styles.name}>
            {fullName}
          </p>
          <p className={styles.role}>{position}</p>
          <p className={styles.company}>{user.company.name}</p>
        </div>

        <section className={styles.section}>
          <h3>Контакты</h3>
          <dl className={styles.details}>
            <DetailRow
              label="Email"
              value={user.email}
              icon={
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M4 6h16v12H4z" />
                  <path d="m4 8 8 6 8-6" />
                </svg>
              }
            />
            <DetailRow
              label="Телефон"
              value={user.phone}
              icon={
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M21 16.5v3a2 2 0 0 1-2.18 2 19.78 19.78 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.78 19.78 0 0 1 1.12 3.8 2 2 0 0 1 3.1 1.62h3a2 2 0 0 1 2 1.72l.35 2.82a2 2 0 0 1-.57 1.73L6 9.76a16 16 0 0 0 8.24 8.24l1.87-1.88a2 2 0 0 1 1.73-.57l2.82.35A2 2 0 0 1 21 16.5Z" />
                </svg>
              }
            />
          </dl>
        </section>

        <section className={styles.section}>
          <h3>Информация</h3>
          <dl className={styles.details}>
            <DetailRow
              label="Возраст"
              value={`${user.age} лет`}
              icon={
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M8 2v4M16 2v4M3 10h18" />
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                </svg>
              }
            />
            <DetailRow
              label="Должность"
              value={position}
              icon={
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M7 7h10a2 2 0 0 1 2 2v9H5V9a2 2 0 0 1 2-2Z" />
                  <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                </svg>
              }
            />
            <DetailRow
              label="Компания"
              value={user.company.name}
              icon={
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M7 7h7a2 2 0 0 1 2 2v8H5V9a2 2 0 0 1 2-2Z" />
                  <path d="M9 7V5a2 2 0 0 1 2-2h6v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-1" />
                  <path d="M9 11H5m4 4H5" />
                </svg>
              }
            />
            <DetailRow
              label="Локация"
              value={location || 'Не указана'}
              icon={
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M12 21s6-5.33 6-11a6 6 0 1 0-12 0c0 5.67 6 11 6 11Z" />
                  <path d="M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                </svg>
              }
            />
            <DetailRow
              label="ID"
              value={`#${String(user.id).padStart(4, '0')}`}
              icon={
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M9 3 7 21M17 3l-2 18M4 9h16M3 15h16" />
                </svg>
              }
            />
          </dl>
        </section>
      </aside>
    </div>
  )
}
