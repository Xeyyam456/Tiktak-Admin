import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { MoreVertical, Eye, Pencil, Trash2 } from 'lucide-react'
import styles from './ActionMenu.module.css'

interface ActionMenuProps {
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

export default function ActionMenu({ onView, onEdit, onDelete }: ActionMenuProps) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const openMenu = () => {
    const rect = triggerRef.current!.getBoundingClientRect()
    const menuWidth = 150
    setPos({
      top: rect.bottom + 4,
      left: Math.max(8, rect.right - menuWidth),
    })
    setOpen(true)
  }

  useEffect(() => {
    if (!open) return undefined

    const handlePointerDown = (e: MouseEvent) => {
      const target = e.target as Node
      if (triggerRef.current?.contains(target) || menuRef.current?.contains(target)) return
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

  const handleSelect = (fn?: () => void) => {
    setOpen(false)
    fn?.()
  }

  return (
    <>
      <button
        type="button"
        ref={triggerRef}
        className={`flex items-center justify-center cursor-pointer ${styles.trigger} ${open ? styles.triggerActive : ''}`}
        onClick={() => (open ? setOpen(false) : openMenu())}
        aria-label="Əməliyyatlar"
      >
        <MoreVertical size={18} />
      </button>
      {open &&
        createPortal(
          <div ref={menuRef} className={`flex flex-col gap-0.5 ${styles.menu}`} style={{ top: pos.top, left: pos.left }}>
            <button
              type="button"
              className={`flex items-center gap-2 cursor-pointer text-left ${styles.item}`}
              onClick={() => handleSelect(onView)}
            >
              <Eye size={14} /> Bax
            </button>
            <button
              type="button"
              className={`flex items-center gap-2 cursor-pointer text-left ${styles.item}`}
              onClick={() => handleSelect(onEdit)}
            >
              <Pencil size={14} /> Düzəlt
            </button>
            <button
              type="button"
              className={`flex items-center gap-2 cursor-pointer text-left ${styles.item} ${styles.danger}`}
              onClick={() => handleSelect(onDelete)}
            >
              <Trash2 size={14} /> Sil
            </button>
          </div>,
          document.body,
        )}
    </>
  )
}
