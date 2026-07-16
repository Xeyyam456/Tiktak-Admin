import { useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { ShoppingCart, DollarSign, Clock, Timer, CheckCircle2, XCircle, Eye } from 'lucide-react'
import { orders as initialOrders, orderStats } from '@/lib/mockData'
import StatCard from '@/shared/StatCard/StatCard'
import Badge from '@/shared/Badge/Badge'
import Modal from '@/shared/Modal/Modal'
import Button from '@/shared/Button/Button'
import { Table, TableEmptyRow } from '@/shared/Table/Table'
import Pagination from '@/utils/Pagination/Pagination'
import { useTitle } from '@/shared/hooks/useTitle'
import styles from './Orders.module.css'

const statusBadge = {
  Gözləyir: 'amber',
  Təsdiqləndi: 'blue',
  Çatdırıldı: 'green',
  'Ləğv edildi': 'red',
}

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
  const [orders, setOrders] = useState(initialOrders)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(
    () =>
      orders.filter((o) =>
        `${o.id} ${o.address}`.toLowerCase().includes(search.toLowerCase()),
      ),
    [orders, search],
  )

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize)

  const updateStatus = (id, status) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)))
    setSelected((prev) => (prev && prev.id === id ? { ...prev, status } : prev))
  }

  return (
    <div>
      <h2 className={styles.heading}>Sifarişlər</h2>

      <div className={styles.stats}>
        <StatCard label="Ümumi sifarişlər" value={orderStats.total} icon={ShoppingCart} color="#3b82f6" />
        <StatCard label="Ümumi satış" value={orderStats.totalSales} icon={DollarSign} color="#22c55e" />
        <StatCard label="Gözləyən" value={orderStats.pending} icon={Clock} color="#f59e0b" />
        <StatCard label="Hazırlanır" value={orderStats.preparing} icon={Timer} color="#a855f7" />
        <StatCard label="Çatdırılan" value={orderStats.delivered} icon={CheckCircle2} color="#22c55e" />
        <StatCard label="Ləğv edilən" value={orderStats.cancelled} icon={XCircle} color="#ef4444" />
      </div>

      <Table columns={columns} minWidth={760}>
        {paged.map((order) => (
          <tr key={order.id}>
            <td>{order.id.slice(0, 10)}...</td>
            <td>{order.date.slice(5).split('-').reverse().join('-')}</td>
            <td>{order.address}</td>
            <td>{order.itemCount}</td>
            <td>
              {order.subtotal} ₼ <span className={styles.subtotalNote}>· {order.freeShipping ? 'Pulsuz' : 'Ödənişli'}</span>
            </td>
            <td>
              <Badge color={statusBadge[order.status]}>{order.status}</Badge>
            </td>
            <td>
              <Button variant="ghost" icon={Eye} iconSize={15} onClick={() => setSelected(order)}>
                Göstər
              </Button>
            </td>
          </tr>
        ))}
        {paged.length === 0 && <TableEmptyRow colSpan={columns.length} />}
      </Table>

      <Pagination
        page={page}
        pageSize={pageSize}
        total={filtered.length}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size)
          setPage(1)
        }}
      />

      <Modal open={!!selected} onClose={() => setSelected(null)} wide>
        {selected && (
          <div>
            <div className={styles.detailHeader}>
              <div className={styles.detailId}>
                <span className={styles.statusDot}>{selected.status === 'Çatdırıldı' ? '✓' : '0'}</span>
                <span className={styles.orderCode}>{selected.id}</span>
              </div>
              <div className={styles.detailActions}>
                <div>
                  <div className={styles.miniLabel}>Status</div>
                  <select
                    value={selected.status}
                    onChange={(e) => updateStatus(selected.id, e.target.value)}
                    className={styles.statusSelect}
                  >
                    {Object.keys(statusBadge).map((s) => (
                      <option key={s} value={s}>
                        {s}
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
                    <span className={styles.productImg} style={{ backgroundColor: item.color }}>
                      {item.image}
                    </span>
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
