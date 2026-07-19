import { useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ShoppingCart, DollarSign, Clock, Timer, CheckCircle2, XCircle, Eye } from 'lucide-react'
import { toast } from 'sonner'
import { listOrders, getOrderStats, updateOrderStatus } from '@/services/orderService'
import { mapOrderFromApi } from '@/lib/adapters/order'
import { ORDER_STATUS_LABELS, ORDER_STATUS_BADGE_COLOR, ORDER_STATUS_OPTIONS } from '@/lib/constants/orderStatus'
import type { OrderStatus } from '@/lib/constants/orderStatus'
import StatCard from '@/shared/components/StatCard/StatCard'
import Badge from '@/shared/components/Badge/Badge'
import Modal from '@/shared/components/Modal/Modal'
import Button from '@/shared/components/Button/Button'
import { Table, TableEmptyRow } from '@/shared/components/Table/Table'
import Pagination from '@/utils/Pagination/Pagination'
import Loading from '@/shared/components/Loading/Loading'
import Thumbnail from '@/shared/components/Thumbnail/Thumbnail'
import { usePagination } from '@/shared/hooks/usePagination'
import { useTitle } from '@/shared/hooks/useTitle'
import type { BadgeColor, Column, LayoutOutletContext } from '@/types/common'
import type { Order, OrderStats } from '@/types/order'
import styles from './Orders.module.css'

const emptyStats: OrderStats = { TOTAL: 0, DELIVERED: 0, PENDING: 0, PREPARING: 0, CANCELLED: 0, TOTAL_REVENUE: 0 }

// ORDER_STATUS_BADGE_COLOR values are BadgeColor keys (e.g. 'amber'), not real CSS
// colors — 'amber' isn't a valid CSS color keyword, so it can't be passed straight
// into a `style={{ color }}`. Map each key to the same CSS var Badge.module.css uses.
const STATUS_TEXT_COLOR: Record<BadgeColor, string> = {
  amber: 'var(--color-amber-text)',
  blue: 'var(--color-blue-text)',
  green: 'var(--color-green-dark)',
  red: 'var(--color-red-text)',
  purple: 'var(--color-purple-text)',
}

// TOTAL hər zaman var, digər statuslar sifariş siyahısında rast gəlindikcə əlavə olunur —
// ona görə TOTAL adi `number`, qalanları isə "ola da bilər, olmaya da" mənasında `Partial`.
type StatusCounts = { TOTAL: number } & Partial<Record<OrderStatus, number>>

const columns: Column[] = [
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
  const { search } = useOutletContext<LayoutOutletContext>()
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
  const statusCounts = orders.reduce<StatusCounts>(
    (acc, o) => {
      acc.TOTAL += 1
      acc[o.status] = (acc[o.status] ?? 0) + 1
      return acc
    },
    { TOTAL: 0 },
  )
  const stats: OrderStats = { ...emptyStats, ...statsData, ...statusCounts }

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: OrderStatus }) => updateOrderStatus(id, status),
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ['orders'] })
      const previousOrders = queryClient.getQueryData<Order[]>(['orders'])
      queryClient.setQueryData<Order[]>(['orders'], (old) =>
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

  const [selectedId, setSelectedId] = useState<number | null>(null)
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

  const updateStatus = (id: number, status: OrderStatus) => {
    statusMutation.mutate({ id, status })
  }

  return (
    <div>
      <h2 className={`flex items-center ${styles.heading}`}>Sifarişlər</h2>

      {loading && <Loading />}

      <div className={`flex flex-wrap gap-3 ${styles.stats}`}>
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
            <div className={`flex items-center justify-between flex-wrap gap-3 ${styles.detailHeader}`}>
              <div className={`flex items-center gap-3 ${styles.detailId}`}>
                <span className={`flex items-center justify-center ${styles.statusDot}`}>{selected.status === 'DELIVERED' ? '✓' : '0'}</span>
                <span className={styles.orderCode}>{selected.orderNumber}</span>
              </div>
              <div className={`flex items-center gap-4 ${styles.detailActions}`}>
                <div>
                  <div className={styles.miniLabel}>Status</div>
                  <select
                    value={selected.status}
                    onChange={(e) => updateStatus(selected.id, e.target.value as OrderStatus)}
                    className={styles.statusSelect}
                    style={{ color: STATUS_TEXT_COLOR[ORDER_STATUS_BADGE_COLOR[selected.status]] }}
                  >
                    {ORDER_STATUS_OPTIONS.map((s) => (
                      // options don't inherit the select's dynamic status color — without
                      // this, every option in the open dropdown list would render in
                      // whatever color the currently selected status happens to be
                      <option key={s} value={s} style={{ color: 'var(--color-text)' }}>
                        {ORDER_STATUS_LABELS[s]}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <div className={styles.miniLabel}>Ümumi məbləğ</div>
                  <div className={`text-right ${styles.amountText}`}>{selected.subtotal} ₼</div>
                </div>
              </div>
            </div>

            <div className={styles.detailSection}>
              <h4 className={styles.detailSectionTitle}>Sifariş Məlumatları</h4>
              <dl className={`gap-x-4 gap-y-2 ${styles.detailGrid}`}>
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
                <div key={idx} className={`flex items-center justify-between ${styles.productRow}`}>
                  <div className={`flex items-center gap-3 ${styles.productLeft}`}>
                    <Thumbnail image={item.image} color={item.color} />
                    <div>
                      <div className={styles.productName}>{item.name}</div>
                      <div className={styles.productMeta}>
                        {item.category} · {item.weight}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className={`text-right ${styles.productPrice}`}>{item.price} ₼</div>
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
