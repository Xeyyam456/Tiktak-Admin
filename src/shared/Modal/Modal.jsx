import { X } from 'lucide-react'
import styles from './Modal.module.css'

export default function Modal({ open, onClose, title, children, wide = false }) {
  if (!open) return null

  return (
    <div className={styles.overlay}>
      <div className={`${styles.card} ${wide ? styles.cardWide : ''}`}>
        <div className={styles.header}>
          {title ? <h3 className={styles.title}>{title}</h3> : <div />}
          <button type="button" onClick={onClose} className={styles.closeBtn} aria-label="Bağla">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
