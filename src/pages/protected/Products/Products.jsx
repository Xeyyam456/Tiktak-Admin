import { useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { products as initialProducts, categories } from '@/lib/mockData'
import Modal from '@/shared/Modal/Modal'
import ConfirmModal from '@/shared/ConfirmModal/ConfirmModal'
import Badge from '@/shared/Badge/Badge'
import Button from '@/shared/Button/Button'
import ActionMenu from '@/shared/ActionMenu/ActionMenu'
import { Table, TableEmptyRow } from '@/shared/Table/Table'
import Pagination from '@/utils/Pagination/Pagination'
import { useTitle } from '@/shared/hooks/useTitle'
import styles from './Products.module.css'

const emptyForm = {
  image: '📦',
  color: '#f3f4f6',
  imageUrl: '',
  name: '',
  description: '',
  price: '',
  category: categories[0]?.name ?? '',
  type: 'Ədəd',
}

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
  const [products, setProducts] = useState(initialProducts)
  const [page, setPage] = useState(1)
  const pageSize = 5

  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [viewTarget, setViewTarget] = useState(null)

  const filtered = useMemo(
    () =>
      products.filter((p) =>
        `${p.name} ${p.description} ${p.category}`.toLowerCase().includes(search.toLowerCase()),
      ),
    [products, search],
  )
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize)

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setFormOpen(true)
  }

  const openEdit = (item) => {
    setEditing(item)
    setForm({
      image: item.image,
      color: item.color,
      imageUrl: item.imageUrl || '',
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      type: item.type,
    })
    setFormOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editing) {
      setProducts((prev) => prev.map((p) => (p.id === editing.id ? { ...p, ...form } : p)))
    } else {
      const today = new Date()
      const date = `${String(today.getDate()).padStart(2, '0')}.${String(today.getMonth() + 1).padStart(2, '0')}.${today.getFullYear()}`
      setProducts((prev) => [{ id: Date.now(), ...form, image: form.image || '📦', date }, ...prev])
    }
    setFormOpen(false)
  }

  const confirmDelete = () => {
    setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id))
    setDeleteTarget(null)
  }

  return (
    <div>
      <div className={styles.headerRow}>
        <h2 className={styles.heading}>Məhsullar</h2>
        <Button icon={Plus} onClick={openCreate}>
          Yeni Məhsul
        </Button>
      </div>

      <Table columns={columns} minWidth={880}>
        {paged.map((item, idx) => (
          <tr key={item.id}>
            <td>{(page - 1) * pageSize + idx + 1}</td>
            <td>
              <span className={styles.thumb} style={{ backgroundColor: item.color }}>
                {item.imageUrl ? <img src={item.imageUrl} alt="" className={styles.thumbImg} /> : item.image}
              </span>
            </td>
            <td className={styles.nameCell}>{item.name}</td>
            <td className={styles.descCell}>{item.description}</td>
            <td className={styles.priceCell}>{item.price} ₼</td>
            <td className={styles.categoryCell}>{item.category}</td>
            <td>
              <Badge color={item.type === 'Kiloqram' ? 'purple' : 'green'}>{item.type}</Badge>
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
        {paged.length === 0 && <TableEmptyRow colSpan={columns.length} />}
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
                <option value="Ədəd">Ədəd</option>
                <option value="Kiloqram">Kiloqram</option>
              </select>
            </label>
          </div>
          <label className={styles.field}>
            Kateqoriya
            <select
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className={styles.select}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <Button type="submit" fullWidth className={styles.submitBtn}>
            {editing ? 'Məlumatları yenilə' : 'Məlumatları yarat'}
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
              <span className={styles.detailThumb} style={{ backgroundColor: viewTarget.color }}>
                {viewTarget.imageUrl ? (
                  <img src={viewTarget.imageUrl} alt="" className={styles.detailThumbImg} />
                ) : (
                  viewTarget.image
                )}
              </span>
              <div>
                <div className={styles.detailName}>{viewTarget.name}</div>
                <Badge color={viewTarget.type === 'Kiloqram' ? 'purple' : 'green'}>{viewTarget.type}</Badge>
              </div>
            </div>
            <dl className={styles.detailGrid}>
              <dt>Açıqlama:</dt>
              <dd>{viewTarget.description}</dd>
              <dt>Qiymət:</dt>
              <dd>{viewTarget.price} ₼</dd>
              <dt>Kateqoriya:</dt>
              <dd>{viewTarget.category}</dd>
              <dt>Tarix:</dt>
              <dd>{viewTarget.date}</dd>
            </dl>
          </div>
        )}
      </Modal>
    </div>
  )
}
