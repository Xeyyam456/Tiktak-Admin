import { useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ShoppingCart, DollarSign, Clock, Timer, CheckCircle2, XCircle, Eye } from 'lucide-react'
import { toast } from 'sonner'
import { listOrders, getOrderStats, updateOrderStatus } from '@/services/orderService'
import { mapOrderFromApi } from '@/lib/adapters/order'
import { ORDER_STATUS_LABELS, ORDER_STATUS_BADGE_COLOR, ORDER_STATUS_OPTIONS } from '@/lib/constants/orderStatus'
import StatCard from '@/shared/StatCard/StatCard'
import Badge from '@/shared/Badge/Badge'
import Modal from '@/shared/Modal/Modal'
import Button from '@/shared/Button/Button'
import { Table, TableEmptyRow } from '@/shared/Table/Table'
import Pagination from '@/utils/Pagination/Pagination'
import Loading from '@/shared/Loading/Loading'
import Thumbnail from '@/shared/Thumbnail/Thumbnail'
import { usePagination } from '@/shared/hooks/usePagination'
import { useTitle } from '@/shared/hooks/useTitle'
import styles from './Orders.module.css'

const emptyStats = { TOTAL: 0, DELIVERED: 0, PENDING: 0, PREPARING: 0, CANCELLED: 0, TOTAL_REVENUE: 0 }

const columns = [
  { key: 'no', label: 'No', width: '14%' },
  { key: 'date', label: 'Tarix', width: 90 },
  { key: 'address', label: 'Çatdırılma ünvanı' },
  { key: 'count', label: 'Məhsul sayı', width: 100 },
  { key: 'subtotal', label: 'Subtotal/Çatdırılma', width: 150 },
  { key: 'status', label: 'Status', width: 120 },
  { key: 'action', label: 'Əməliyyat', width: 100 },
]

export default function Orders() {
  useTitle('Sifarişlər')
  const { search } = useOutletContext()
  const queryClient = useQueryClient()

  const { data: orders = [], isLoading: loading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => listOrders().then((data) => data.map(mapOrderFromApi)),
  })
  const { data: statsData } = useQuery({
    queryKey: ['orderStats'],
    queryFn: getOrderStats,
  })
  // `/orders/admin/stats` doesn't reliably include every OrderStatus counter
  // (CANCELLED in particular can come back missing, see docs/API.md §8.2) —
  // `orders` is already the full unpaginated list, so count statuses from it
  // directly instead of trusting the backend summary for per-status counts.
  const statusCounts = orders.reduce(
    (acc, o) => {
      acc.TOTAL += 1
      acc[o.status] = (acc[o.status] ?? 0) + 1
      return acc
    },
    { TOTAL: 0 },
  )
  const stats = { ...emptyStats, ...statsData, ...statusCounts }

  const statusMutation = useMutation({
    mutationFn: ({ id, status }) => updateOrderStatus(id, status),
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ['orders'] })
      const previousOrders = queryClient.getQueryData(['orders'])
      queryClient.setQueryData(['orders'], (old) =>
        old?.map((o) => (o.id === id ? { ...o, status } : o)),
      )
      return { previousOrders }
    },
    onError: (_err, _variables, context) => {
      if (context?.previousOrders) {
        queryClient.setQueryData(['orders'], context.previousOrders)
      }
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['orders'] }),
        queryClient.invalidateQueries({ queryKey: ['orderStats'] }),
      ])
      toast.success('Sifariş statusu yeniləndi')
    },
  })

  const [selectedId, setSelectedId] = useState(null)
  // always derived from the live `orders` list, so it reflects the latest
  // status/user data after a mutation refetch rather than a stale snapshot
  const selected = orders.find((o) => o.id === selectedId) ?? null

  const filtered = useMemo(
    () =>
      orders.filter((o) =>
        `${o.orderNumber} ${o.address}`.toLowerCase().includes(search.toLowerCase()),
      ),
    [orders, search],
  )
  const { page, setPage, pageSize, setPageSize, paged } = usePagination(filtered)

  const updateStatus = (id, status) => {
    statusMutation.mutate({ id, status })
  }

  return (
    <div>
      <h2 className={styles.heading}>Sifarişlər</h2>

      {loading && <Loading />}

      <div className={styles.stats}>
        <StatCard label="Ümumi sifarişlər" value={stats.TOTAL} icon={ShoppingCart} color="#3b82f6" />
        <StatCard label="Ümumi satış" value={stats.TOTAL_REVENUE} icon={DollarSign} color="#22c55e" />
        <StatCard label="Gözləyən" value={stats.PENDING} icon={Clock} color="#f59e0b" />
        <StatCard label="Hazırlanır" value={stats.PREPARING} icon={Timer} color="#a855f7" />
        <StatCard label="Çatdırılan" value={stats.DELIVERED} icon={CheckCircle2} color="#22c55e" />
        <StatCard label="Ləğv edilən" value={stats.CANCELLED} icon={XCircle} color="#ef4444" />
      </div>

      <Table columns={columns} minWidth={760}>
        {paged.map((order) => (
          <tr key={order.id}>
            <td>{order.orderNumber}</td>
            <td>{order.date}</td>
            <td>{order.address}</td>
            <td>{order.itemCount}</td>
            <td>
              {order.subtotal} ₼ <span className={styles.subtotalNote}>· {order.freeShipping ? 'Pulsuz' : 'Ödənişli'}</span>
            </td>
            <td>
              <Badge color={ORDER_STATUS_BADGE_COLOR[order.status]}>{ORDER_STATUS_LABELS[order.status] ?? order.status}</Badge>
            </td>
            <td>
              <Button variant="ghost" icon={Eye} iconSize={15} onClick={() => setSelectedId(order.id)}>
                Göstər
              </Button>
            </td>
          </tr>
        ))}
        {!loading && paged.length === 0 && <TableEmptyRow colSpan={columns.length} />}
      </Table>

      <Pagination page={page} pageSize={pageSize} total={filtered.length} onPageChange={setPage} onPageSizeChange={setPageSize} />

      <Modal open={!!selected} onClose={() => setSelectedId(null)} wide>
        {selected && (
          <div>
            <div className={styles.detailHeader}>
              <div className={styles.detailId}>
                <span className={styles.statusDot}>{selected.status === 'DELIVERED' ? '✓' : '0'}</span>
                <span className={styles.orderCode}>{selected.orderNumber}</span>
              </div>
              <div className={styles.detailActions}>
                <div>
                  <div className={styles.miniLabel}>Status</div>
                  <select
                    value={selected.status}
                    onChange={(e) => updateStatus(selected.id, e.target.value)}
                    className={styles.statusSelect}
                  >
                    {ORDER_STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {ORDER_STATUS_LABELS[s]}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <div className={styles.miniLabel}>Ümumi məbləğ</div>
                  <div className={styles.amountText}>{selected.subtotal} ₼</div>
                </div>
              </div>
            </div>

            <div className={styles.detailSection}>
              <h4 className={styles.detailSectionTitle}>Sifariş Məlumatları</h4>
              <dl className={styles.detailGrid}>
                <dt>Tarix:</dt>
                <dd>{selected.date}</dd>
                <dt>Çatdırılma Ünvanı:</dt>
                <dd>{selected.address}</dd>
                <dt>Telefon:</dt>
                <dd>{selected.phone}</dd>
                <dt>Ödəmə Metodu:</dt>
                <dd>{selected.paymentMethod}</dd>
              </dl>
            </div>

            <div className={styles.detailSection}>
              <h4 className={styles.detailSectionTitle}>Məhsullar ({selected.items.length})</h4>
              {selected.items.map((item, idx) => (
                <div key={idx} className={styles.productRow}>
                  <div className={styles.productLeft}>
                    <Thumbnail image={item.image} color={item.color} />
                    <div>
                      <div className={styles.productName}>{item.name}</div>
                      <div className={styles.productMeta}>
                        {item.category} · {item.weight}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className={styles.productPrice}>{item.price} ₼</div>
                    <div className={styles.productUnit}>{item.unit}</div>
                  </div>
                </div>
              ))}
              <div className={styles.shippingNote}>
                Çatdırılma: {selected.freeShipping ? 'Pulsuz' : 'Ödənişli'}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
