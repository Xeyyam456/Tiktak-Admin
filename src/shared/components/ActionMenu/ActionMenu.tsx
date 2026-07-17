import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { MoreVertical, Eye, Pencil, Trash2 } from 'lucide-react'
import styles from './ActionMenu.module.css'

export default function ActionMenu({ onView, onEdit, onDelete }) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const triggerRef = useRef(null)
  const menuRef = useRef(null)

  const openMenu = () => {
    const rect = triggerRef.current.getBoundingClientRect()
    const menuWidth = 150
    setPos({
      top: rect.bottom + 4,
      left: Math.max(8, rect.right - menuWidth),
    })
    setOpen(true)
  }

  useEffect(() => {
    if (!open) return undefined

    const handlePointerDown = (e) => {
      if (triggerRef.current?.contains(e.target) || menuRef.current?.contains(e.target)) return
      setOpen(false)
    }
    const handleScroll = () => setOpen(false)

    document.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('scroll', handleScroll, true)
    window.addEventListener('resize', handleScroll)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('scroll', handleScroll, true)
      window.removeEventListener('resize', handleScroll)
    }
  }, [open])

  const handleSelect = (fn) => {
    setOpen(false)
    fn?.()
  }

  return (
    <>
      <button
        type="button"
        ref={triggerRef}
        className={`${styles.trigger} ${open ? styles.triggerActive : ''}`}
        onClick={() => (open ? setOpen(false) : openMenu())}
        aria-label="Əməliyyatlar"
      >
        <MoreVertical size={18} />
      </button>
      {open &&
        createPortal(
          <div ref={menuRef} className={styles.menu} style={{ top: pos.top, left: pos.left }}>
            <button type="button" className={styles.item} onClick={() => handleSelect(onView)}>
              <Eye size={14} /> Bax
            </button>
            <button type="button" className={styles.item} onClick={() => handleSelect(onEdit)}>
              <Pencil size={14} /> Düzəlt
            </button>
            <button type="button" className={`${styles.item} ${styles.danger}`} onClick={() => handleSelect(onDelete)}>
              <Trash2 size={14} /> Sil
            </button>
          </div>,
          document.body,
        )}
    </>
  )
}
