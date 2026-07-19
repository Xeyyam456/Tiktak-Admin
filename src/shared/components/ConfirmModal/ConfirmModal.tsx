import { useEffect, useRef } from 'react'
import Button from '@/shared/components/Button/Button'
import deleteImg from '@/assets/images/delete-img.svg'
import styles from './ConfirmModal.module.css'

interface ConfirmModalProps {
  open: boolean
  onCancel: () => void
  onConfirm: () => void
  message: string
  showIcon?: boolean
}

export default function ConfirmModal({
  open,
  onCancel,
  onConfirm,
  message,
  showIcon = true,
}: ConfirmModalProps) {
  const cancelBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    cancelBtnRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onCancel])

  if (!open) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.card} role="alertdialog" aria-modal="true" aria-label={message}>
        {showIcon && <img src={deleteImg} alt="" className={styles.icon} />}
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <Button variant="solid" block onClick={onConfirm}>
            Təsdiqlə
          </Button>
          <Button ref={cancelBtnRef} variant="outline" block onClick={onCancel}>
            İndi yox
          </Button>
        </div>
      </div>
    </div>
  )
}
