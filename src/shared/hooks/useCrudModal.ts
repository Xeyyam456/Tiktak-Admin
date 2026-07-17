import { useState } from 'react'

export function useCrudModal<TItem, TForm>(emptyForm: TForm, toForm: (item: TItem) => TForm) {
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<TItem | null>(null)
  const [form, setForm] = useState<TForm>(emptyForm)
  const [deleteTarget, setDeleteTarget] = useState<TItem | null>(null)
  const [viewTarget, setViewTarget] = useState<TItem | null>(null)

  const openCreate = (overrides: Partial<TForm> = {}) => {
    setEditing(null)
    setForm({ ...emptyForm, ...overrides })
    setFormOpen(true)
  }

  const openEdit = (item: TItem) => {
    setEditing(item)
    setForm(toForm(item))
    setFormOpen(true)
  }

  return {
    formOpen,
    setFormOpen,
    editing,
    form,
    setForm,
    deleteTarget,
    setDeleteTarget,
    viewTarget,
    setViewTarget,
    openCreate,
    openEdit,
  }
}
