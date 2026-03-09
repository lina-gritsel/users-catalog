import styles from './StatusBlock.module.css'

type StatusBlockProps = {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export function StatusBlock({ title, description, actionLabel, onAction }: StatusBlockProps) {
  return (
    <section className={styles.statusBlock}>
      <p className={styles.title}>{title}</p>
      <p className={styles.description}>{description}</p>
      {actionLabel && onAction ? (
        <button className={styles.action} type="button" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
    </section>
  )
}
