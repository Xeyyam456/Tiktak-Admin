import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import styles from './Modal.module.css'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children?: ReactNode
  wide?: boolean
}

export default function Modal({ open, onClose, title, children, wide = false }: ModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    closeBtnRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className={`flex items-center justify-center ${styles.overlay}`}>
      <div className={`${styles.card} ${wide ? styles.cardWide : ''}`} role="dialog" aria-modal="true" aria-label={title}>
        <div className={`flex items-start justify-between ${styles.header}`}>
          {title ? <h3 className={styles.title}>{title}</h3> : <div />}
          <button
            type="button"
            ref={closeBtnRef}
            onClick={onClose}
            className={`flex cursor-pointer ${styles.closeBtn}`}
            aria-label="Bağla"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
