import Button from '@/shared/Button/Button'
import deleteImg from '@/assets/images/delete-img.svg'
import styles from './ConfirmModal.module.css'

export default function ConfirmModal({ open, onCancel, onConfirm, message }) {
  if (!open) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <img src={deleteImg} alt="" className={styles.icon} />
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <Button variant="solid" block onClick={onConfirm}>
            Təsdiqlə
          </Button>
          <Button variant="outline" block onClick={onCancel}>
            İndi yox
          </Button>
        </div>
      </div>
    </div>
  )
}
