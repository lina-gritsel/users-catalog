import type { ReactNode } from 'react'
import {
  BriefcaseIcon,
  CalendarIcon,
  CloseIcon,
  CompanyIcon,
  HashIcon,
  LocationIcon,
  MailIcon,
  PhoneIcon,
} from '@shared/assets/icons'
import {
  getUserAgeLabel,
  getUserDisplayId,
  getUserFullName,
  getUserLocation,
  getUserPosition,
} from '@entities/user'
import type { User } from '@entities/user'
import { useModalBehavior } from '@shared/hooks'
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
  const fullName = getUserFullName(user)
  const position = getUserPosition(user)
  const location = getUserLocation(user)
  const ageLabel = getUserAgeLabel(user)
  const displayId = getUserDisplayId(user)

  useModalBehavior({ isOpen: true, onClose })

  return (
    <div className={styles.overlay} role="presentation" onClick={onClose}>
      <aside
        className={styles.drawer}
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-details-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Закрыть"
        >
          <CloseIcon />
        </button>

        <h2 className={styles.srOnly} id="user-details-title">
          Профиль пользователя
        </h2>

        <div className={styles.header}>
          <img className={styles.avatar} src={user.image} alt={fullName} />
          <p className={styles.name}>{fullName}</p>
          <p className={styles.role}>{position}</p>
          <p className={styles.company}>{user.company.name}</p>
        </div>

        <section className={styles.section}>
          <h3>Контакты</h3>
          <dl className={styles.details}>
            <DetailRow label="Email" value={user.email} icon={<MailIcon />} />
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
              value={ageLabel}
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
              value={displayId}
              icon={<HashIcon />}
            />
          </dl>
        </section>
      </aside>
    </div>
  )
}
