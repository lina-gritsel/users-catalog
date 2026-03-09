import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { BriefcaseIcon } from '../assets/icons/BriefcaseIcon'
import { CalendarIcon } from '../assets/icons/CalendarIcon'
import { CloseIcon } from '../assets/icons/CloseIcon'
import { CompanyIcon } from '../assets/icons/CompanyIcon'
import { HashIcon } from '../assets/icons/HashIcon'
import { LocationIcon } from '../assets/icons/LocationIcon'
import { MailIcon } from '../assets/icons/MailIcon'
import { PhoneIcon } from '../assets/icons/PhoneIcon'
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

const DetailRow = ({ label, value, icon }: DetailRowProps) => {
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

export const UserDetailsModal = ({ user, onClose }: UserDetailsModalProps) => {
  const fullName = `${user.firstName} ${user.lastName}`
  const position = user.company.title || user.role
  const location = [user.address.city, user.address.state].filter(Boolean).join(', ')

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
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
          <CloseIcon />
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
              icon={<MailIcon />}
            />
            <DetailRow
              label="Телефон"
              value={user.phone}
              icon={<PhoneIcon />}
            />
          </dl>
        </section>

        <section className={styles.section}>
          <h3>Информация</h3>
          <dl className={styles.details}>
            <DetailRow
              label="Возраст"
              value={`${user.age} лет`}
              icon={<CalendarIcon />}
            />
            <DetailRow
              label="Должность"
              value={position}
              icon={<BriefcaseIcon />}
            />
            <DetailRow
              label="Компания"
              value={user.company.name}
              icon={<CompanyIcon />}
            />
            <DetailRow
              label="Локация"
              value={location || 'Не указана'}
              icon={<LocationIcon />}
            />
            <DetailRow
              label="ID"
              value={`#${String(user.id).padStart(4, '0')}`}
              icon={<HashIcon />}
            />
          </dl>
        </section>
      </aside>
    </div>
  )
}
