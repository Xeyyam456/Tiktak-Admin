import styles from './Badge.module.css'

export default function Badge({ color = 'green', children }) {
  return <span className={`${styles.badge} ${styles[color]}`}>{children}</span>
}
