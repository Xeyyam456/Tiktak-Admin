import { useMemo } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { listCampaigns, createCampaign, updateCampaign, deleteCampaign } from '@/services/campaignService'
import { mapCampaignFromApi, mapCampaignToApi } from '@/lib/adapters/campaign'
import Modal from '@/shared/Modal/Modal'
import ConfirmModal from '@/shared/ConfirmModal/ConfirmModal'
import Button from '@/shared/Button/Button'
import ActionMenu from '@/shared/ActionMenu/ActionMenu'
import { Table, TableEmptyRow } from '@/shared/Table/Table'
import Pagination from '@/utils/Pagination/Pagination'
import Loading from '@/shared/Loading/Loading'
import Thumbnail from '@/shared/Thumbnail/Thumbnail'
import { usePagination } from '@/shared/hooks/usePagination'
import { useCrudModal } from '@/shared/hooks/useCrudModal'
import { useTitle } from '@/shared/hooks/useTitle'
import styles from './Campaigns.module.css'

const emptyForm = { image: '🖼️', color: '#f3f4f6', imageUrl: '', title: '', description: '' }

const toForm = (item) => ({
  image: item.image,
  color: item.color,
  imageUrl: item.imageUrl || '',
  title: item.title,
  description: item.description,
})

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
  const queryClient = useQueryClient()

  const { data: campaigns = [], isLoading: loading } = useQuery({
    queryKey: ['campaigns'],
    queryFn: () => listCampaigns().then((data) => data.map(mapCampaignFromApi)),
  })

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['campaigns'] })
  const createMutation = useMutation({
    mutationFn: createCampaign,
    onSuccess: async () => {
      await invalidate()
      toast.success('Kampaniya yaradıldı')
    },
  })
  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => updateCampaign(id, payload),
    onSuccess: async () => {
      await invalidate()
      toast.success('Kampaniya yeniləndi')
    },
  })
  const deleteMutation = useMutation({
    mutationFn: deleteCampaign,
    onSuccess: async () => {
      await invalidate()
      toast.success('Kampaniya silindi')
    },
  })

  const filtered = useMemo(
    () =>
      campaigns.filter((c) =>
        `${c.title} ${c.description}`.toLowerCase().includes(search.toLowerCase()),
      ),
    [campaigns, search],
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
      const payload = mapCampaignToApi(form)
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
        <h2 className={styles.heading}>Kampaniyalar</h2>
        <Button icon={Plus} onClick={() => openCreate()}>
          Yeni Kampaniya
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

      <Modal open={!!viewTarget} onClose={() => setViewTarget(null)} title="Kampaniya məlumatları" wide>
        {viewTarget && (
          <div>
            <div className={styles.detailTop}>
              <Thumbnail imageUrl={viewTarget.imageUrl} image={viewTarget.image} color={viewTarget.color} size="lg" />
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
