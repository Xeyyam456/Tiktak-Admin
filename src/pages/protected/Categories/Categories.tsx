import { useMemo } from 'react'
import type { FormEvent } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { listCategories, createCategory, updateCategory, deleteCategory } from '@/services/categoryService'
import { mapCategoryFromApi, mapCategoryToApi } from '@/lib/adapters/category'
import Modal from '@/shared/components/Modal/Modal'
import ConfirmModal from '@/shared/components/ConfirmModal/ConfirmModal'
import Button from '@/shared/components/Button/Button'
import ActionMenu from '@/shared/components/ActionMenu/ActionMenu'
import { Table, TableEmptyRow } from '@/shared/components/Table/Table'
import Pagination from '@/utils/Pagination/Pagination'
import Loading from '@/shared/components/Loading/Loading'
import Thumbnail from '@/shared/components/Thumbnail/Thumbnail'
import { usePagination } from '@/shared/hooks/usePagination'
import { useCrudModal } from '@/shared/hooks/useCrudModal'
import { useTitle } from '@/shared/hooks/useTitle'
import type { Column, LayoutOutletContext } from '@/types/common'
import type { Category, CategoryForm, CategoryPayload } from '@/types/category'
import styles from './Categories.module.css'

const emptyForm: CategoryForm = { image: '🏷️', color: '#f3f4f6', imageUrl: '', name: '', description: '' }

const toForm = (item: Category): CategoryForm => ({
  image: item.image,
  color: item.color,
  imageUrl: item.imageUrl || '',
  name: item.name,
  description: item.description,
})

const columns: Column[] = [
  { key: 'no', label: 'Sıra', width: 40 },
  { key: 'image', label: 'Şəkil', width: 72 },
  { key: 'name', label: 'Ad', width: 160 },
  { key: 'desc', label: 'Açıqlama' },
  { key: 'date', label: 'Tarix', width: 110 },
  { key: 'action', label: 'Əməliyyatlar', width: 100 },
]

export default function Categories() {
  useTitle('Kateqoriyalar')
  const { search } = useOutletContext<LayoutOutletContext>()
  const queryClient = useQueryClient()

  const { data: categories = [], isLoading: loading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => listCategories().then((data) => data.map(mapCategoryFromApi)),
  })

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['categories'] })
  const createMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: async () => {
      await invalidate()
      toast.success('Kateqoriya yaradıldı')
    },
  })
  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: CategoryPayload }) => updateCategory(id, payload),
    onSuccess: async () => {
      await invalidate()
      toast.success('Kateqoriya yeniləndi')
    },
  })
  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: async () => {
      await invalidate()
      toast.success('Kateqoriya silindi')
    },
  })

  const filtered = useMemo(
    () =>
      categories.filter((c) =>
        `${c.name} ${c.description}`.toLowerCase().includes(search.toLowerCase()),
      ),
    [categories, search],
  )
  const { page, setPage, pageSize, paged } = usePagination(filtered)

  const {
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
  } = useCrudModal<Category, CategoryForm>(emptyForm, toForm)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const payload = mapCategoryToApi(form)
      if (editing) {
        await updateMutation.mutateAsync({ id: editing.id, payload })
      } else {
        await createMutation.mutateAsync(payload)
      }
      setFormOpen(false)
    } catch {
      // error already toasted by the global mutation cache
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    try {
      await deleteMutation.mutateAsync(deleteTarget.id)
    } catch {
      // error already toasted by the global mutation cache
    } finally {
      setDeleteTarget(null)
    }
  }

  const submitting = createMutation.isPending || updateMutation.isPending

  return (
    <div>
      <div className={styles.headerRow}>
        <h2 className={styles.heading}>Kateqoriyalar</h2>
        <Button icon={Plus} onClick={() => openCreate()}>
          Yeni Kateqoriya
        </Button>
      </div>

      {loading && <Loading />}

      <Table columns={columns} minWidth={720}>
        {paged.map((item, idx) => (
          <tr key={item.id}>
            <td>{(page - 1) * pageSize + idx + 1}</td>
            <td>
              <Thumbnail imageUrl={item.imageUrl} image={item.image} color={item.color} />
            </td>
            <td className={styles.nameCell}>{item.name}</td>
            <td className={styles.descCell}>{item.description}</td>
            <td>{item.date}</td>
            <td>
              <ActionMenu
                onView={() => setViewTarget(item)}
                onEdit={() => openEdit(item)}
                onDelete={() => setDeleteTarget(item)}
              />
            </td>
          </tr>
        ))}
        {!loading && paged.length === 0 && <TableEmptyRow colSpan={columns.length} />}
      </Table>

      <Pagination page={page} pageSize={pageSize} total={filtered.length} onPageChange={setPage} />

      <Modal open={formOpen} onClose={() => setFormOpen(false)}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.field}>
            Şəkil ünvanı
            <input
              type="text"
              value={form.imageUrl}
              onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
              placeholder="https://..."
              className={styles.input}
            />
          </label>
          <label className={styles.field}>
            Ad
            <input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
              className={styles.input}
            />
          </label>
          <label className={styles.field}>
            Açıqlama
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={3}
              required
              className={styles.textarea}
            />
          </label>
          <Button type="submit" fullWidth className={styles.submitBtn} disabled={submitting}>
            {submitting ? 'Göndərilir...' : editing ? 'Məlumatları yenilə' : 'Məlumatları yarat'}
          </Button>
        </form>
      </Modal>

      <ConfirmModal
        open={!!deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        message="Məlumatı silməyə əminsinizmi?"
      />

      <Modal open={!!viewTarget} onClose={() => setViewTarget(null)} title="Kateqoriya məlumatları" wide>
        {viewTarget && (
          <div>
            <div className={styles.detailTop}>
              <Thumbnail imageUrl={viewTarget.imageUrl} image={viewTarget.image} color={viewTarget.color} size="lg" />
              <div className={styles.detailName}>{viewTarget.name}</div>
            </div>
            <dl className={styles.detailGrid}>
              <dt>Açıqlama:</dt>
              <dd>{viewTarget.description}</dd>
              <dt>Tarix:</dt>
              <dd>{viewTarget.date}</dd>
            </dl>
          </div>
        )}
      </Modal>
    </div>
  )
}
