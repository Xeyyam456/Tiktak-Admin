import { useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { campaigns as initialCampaigns } from '@/lib/mockData'
import Modal from '@/shared/Modal/Modal'
import ConfirmModal from '@/shared/ConfirmModal/ConfirmModal'
import Button from '@/shared/Button/Button'
import ActionMenu from '@/shared/ActionMenu/ActionMenu'
import { Table, TableEmptyRow } from '@/shared/Table/Table'
import Pagination from '@/utils/Pagination/Pagination'
import { useTitle } from '@/shared/hooks/useTitle'
import styles from './Campaigns.module.css'

const emptyForm = { image: '🖼️', color: '#f3f4f6', imageUrl: '', title: '', description: '' }

const columns = [
  { key: 'no', label: 'Sıra', width: 40 },
  { key: 'image', label: 'Şəkil', width: 72 },
  { key: 'title', label: 'Başlıq', width: 160 },
  { key: 'desc', label: 'Açıqlama' },
  { key: 'date', label: 'Tarix', width: 110 },
  { key: 'action', label: 'Əməliyyatlar', width: 100 },
]

export default function Campaigns() {
  useTitle('Kampaniyalar')
  const { search } = useOutletContext()
  const [campaigns, setCampaigns] = useState(initialCampaigns)
  const [page, setPage] = useState(1)
  const pageSize = 5

  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [viewTarget, setViewTarget] = useState(null)

  const filtered = useMemo(
    () =>
      campaigns.filter((c) =>
        `${c.title} ${c.description}`.toLowerCase().includes(search.toLowerCase()),
      ),
    [campaigns, search],
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
      title: item.title,
      description: item.description,
    })
    setFormOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editing) {
      setCampaigns((prev) => prev.map((c) => (c.id === editing.id ? { ...c, ...form } : c)))
    } else {
      const today = new Date()
      const date = `${String(today.getDate()).padStart(2, '0')}.${String(today.getMonth() + 1).padStart(2, '0')}.${today.getFullYear()}`
      setCampaigns((prev) => [{ id: Date.now(), ...form, image: form.image || '🖼️', date }, ...prev])
    }
    setFormOpen(false)
  }

  const confirmDelete = () => {
    setCampaigns((prev) => prev.filter((c) => c.id !== deleteTarget.id))
    setDeleteTarget(null)
  }

  return (
    <div>
      <div className={styles.headerRow}>
        <h2 className={styles.heading}>Kampaniyalar</h2>
        <Button icon={Plus} onClick={openCreate}>
          Yeni Kampaniya
        </Button>
      </div>

      <Table columns={columns} minWidth={720}>
        {paged.map((item, idx) => (
          <tr key={item.id}>
            <td>{(page - 1) * pageSize + idx + 1}</td>
            <td>
              <span className={styles.thumb} style={{ backgroundColor: item.color }}>
                {item.imageUrl ? <img src={item.imageUrl} alt="" className={styles.thumbImg} /> : item.image}
              </span>
            </td>
            <td className={styles.titleCell}>{item.title}</td>
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
        {paged.length === 0 && <TableEmptyRow colSpan={columns.length} />}
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
            Başlıq
            <input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
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

      <Modal open={!!viewTarget} onClose={() => setViewTarget(null)} title="Kampaniya məlumatları" wide>
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
              <div className={styles.detailName}>{viewTarget.title}</div>
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
