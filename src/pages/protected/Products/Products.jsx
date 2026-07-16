import { useMemo } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { listProducts, createProduct, updateProduct, deleteProduct } from '@/services/productService'
import { listCategories } from '@/services/categoryService'
import { mapProductFromApi, mapProductToApi } from '@/lib/adapters/product'
import { mapCategoryFromApi } from '@/lib/adapters/category'
import { PRODUCT_TYPE_LABELS, PRODUCT_TYPE_OPTIONS, productTypeBadgeColor } from '@/lib/constants/productTypes'
import Modal from '@/shared/Modal/Modal'
import ConfirmModal from '@/shared/ConfirmModal/ConfirmModal'
import Badge from '@/shared/Badge/Badge'
import Button from '@/shared/Button/Button'
import ActionMenu from '@/shared/ActionMenu/ActionMenu'
import { Table, TableEmptyRow } from '@/shared/Table/Table'
import Pagination from '@/utils/Pagination/Pagination'
import Loading from '@/shared/Loading/Loading'
import Thumbnail from '@/shared/Thumbnail/Thumbnail'
import { usePagination } from '@/shared/hooks/usePagination'
import { useCrudModal } from '@/shared/hooks/useCrudModal'
import { useTitle } from '@/shared/hooks/useTitle'
import styles from './Products.module.css'

const emptyForm = {
  image: '📦',
  color: '#f3f4f6',
  imageUrl: '',
  name: '',
  description: '',
  price: '',
  category_id: '',
  type: 'piece',
}

const toForm = (item) => ({
  image: item.image,
  color: item.color,
  imageUrl: item.imageUrl || '',
  name: item.name,
  description: item.description,
  price: item.price,
  category_id: item.category_id,
  type: item.type,
})

const columns = [
  { key: 'no', label: 'Sıra', width: 40 },
  { key: 'image', label: 'Şəkil', width: 72 },
  { key: 'name', label: 'Ad', width: 160 },
  { key: 'desc', label: 'Açıqlama' },
  { key: 'price', label: 'Qiymət', width: 90 },
  { key: 'category', label: 'Kateqoriya', width: 140 },
  { key: 'type', label: 'Növ', width: 100 },
  { key: 'date', label: 'Tarix', width: 100 },
  { key: 'action', label: 'Əməliyyatlar', width: 100 },
]

export default function Products() {
  useTitle('Məhsullar')
  const { search } = useOutletContext()
  const queryClient = useQueryClient()

  const { data: products = [], isLoading: loading } = useQuery({
    queryKey: ['products'],
    queryFn: () => listProducts().then((data) => data.map(mapProductFromApi)),
  })
  // same queryKey AND same mapping as Categories page — must match exactly, since
  // TanStack Query dedupes by key alone; a mismatched shape here would render broken
  // thumbnails/dates on whichever page mounts second within the cache's staleTime
  const { data: categoryOptions = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => listCategories().then((data) => data.map(mapCategoryFromApi)),
  })

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['products'] })
  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: async () => {
      await invalidate()
      toast.success('Məhsul yaradıldı')
    },
  })
  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => updateProduct(id, payload),
    onSuccess: async () => {
      await invalidate()
      toast.success('Məhsul yeniləndi')
    },
  })
  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: async () => {
      await invalidate()
      toast.success('Məhsul silindi')
    },
  })

  const filtered = useMemo(
    () =>
      products.filter((p) =>
        `${p.name} ${p.description} ${p.category?.name ?? ''}`.toLowerCase().includes(search.toLowerCase()),
      ),
    [products, search],
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
  } = useCrudModal(emptyForm, toForm)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = mapProductToApi(form)
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
        <h2 className={styles.heading}>Məhsullar</h2>
        <Button icon={Plus} onClick={() => openCreate({ category_id: categoryOptions[0]?.id ?? '' })}>
          Yeni Məhsul
        </Button>
      </div>

      {loading && <Loading />}

      <Table columns={columns} minWidth={880}>
        {paged.map((item, idx) => (
          <tr key={item.id}>
            <td>{(page - 1) * pageSize + idx + 1}</td>
            <td>
              <Thumbnail imageUrl={item.imageUrl} image={item.image} color={item.color} />
            </td>
            <td className={styles.nameCell}>{item.name}</td>
            <td className={styles.descCell}>{item.description}</td>
            <td className={styles.priceCell}>{item.price} ₼</td>
            <td className={styles.categoryCell}>{item.category?.name ?? ''}</td>
            <td>
              <Badge color={productTypeBadgeColor(item.type)}>{PRODUCT_TYPE_LABELS[item.type] ?? item.type}</Badge>
            </td>
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

      <Modal open={formOpen} onClose={() => setFormOpen(false)} wide>
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
              rows={2}
              required
              className={styles.textarea}
            />
          </label>
          <div className={styles.row}>
            <label className={styles.field}>
              Qiymət
              <input
                type="number"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                required
                className={styles.input}
              />
            </label>
            <label className={styles.field}>
              Növ
              <select
                value={form.type}
                onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                className={styles.select}
              >
                {PRODUCT_TYPE_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {PRODUCT_TYPE_LABELS[t]}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className={styles.field}>
            Kateqoriya
            <select
              value={form.category_id}
              onChange={(e) => setForm((f) => ({ ...f, category_id: e.target.value }))}
              className={styles.select}
              required
            >
              {categoryOptions.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
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

      <Modal open={!!viewTarget} onClose={() => setViewTarget(null)} title="Məhsul məlumatları" wide>
        {viewTarget && (
          <div>
            <div className={styles.detailTop}>
              <Thumbnail imageUrl={viewTarget.imageUrl} image={viewTarget.image} color={viewTarget.color} size="lg" />
              <div>
                <div className={styles.detailName}>{viewTarget.name}</div>
                <Badge color={productTypeBadgeColor(viewTarget.type)}>
                  {PRODUCT_TYPE_LABELS[viewTarget.type] ?? viewTarget.type}
                </Badge>
              </div>
            </div>
            <dl className={styles.detailGrid}>
              <dt>Açıqlama:</dt>
              <dd>{viewTarget.description}</dd>
              <dt>Qiymət:</dt>
              <dd>{viewTarget.price} ₼</dd>
              <dt>Kateqoriya:</dt>
              <dd>{viewTarget.category?.name ?? ''}</dd>
              <dt>Tarix:</dt>
              <dd>{viewTarget.date}</dd>
            </dl>
          </div>
        )}
      </Modal>
    </div>
  )
}
