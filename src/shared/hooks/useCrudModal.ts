import { useState } from 'react'

export function useCrudModal(emptyForm, toForm) {
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [viewTarget, setViewTarget] = useState(null)

  const openCreate = (overrides = {}) => {
    setEditing(null)
    setForm({ ...emptyForm, ...overrides })
    setFormOpen(true)
  }

  const openEdit = (item) => {
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
