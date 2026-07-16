import { useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Eye, Phone } from 'lucide-react'
import { users as initialUsers } from '@/lib/mockData'
import Modal from '@/shared/Modal/Modal'
import Button from '@/shared/Button/Button'
import { Table, TableEmptyRow } from '@/shared/Table/Table'
import Pagination from '@/utils/Pagination/Pagination'
import { useTitle } from '@/shared/hooks/useTitle'
import styles from './Users.module.css'

const columns = [
  { key: 'no', label: 'Sıra', width: 40 },
  { key: 'avatar', label: 'Avatar', width: 80 },
  { key: 'name', label: 'Ad Soyad', width: 170 },
  { key: 'phone', label: 'Telefon', width: 170 },
  { key: 'address', label: 'Ünvan' },
  { key: 'role', label: 'Rol', width: 120 },
  { key: 'action', label: 'Əməliyyat', width: 100 },
]

export default function Users() {
  useTitle('İstifadəçilər')
  const { search } = useOutletContext()
  const [users] = useState(initialUsers)
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState(null)
  const pageSize = 5

  const filtered = useMemo(
    () => users.filter((u) => `${u.name} ${u.phone}`.toLowerCase().includes(search.toLowerCase())),
    [users, search],
  )
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div>
      <h2 className={styles.heading}>İstifadəçilər</h2>

      <Table columns={columns} minWidth={760}>
        {paged.map((user, idx) => (
          <tr key={user.id}>
            <td>{(page - 1) * pageSize + idx + 1}</td>
            <td>
              <span className={styles.avatar} style={{ backgroundColor: user.color }}>
                {user.initial}
              </span>
            </td>
            <td className={styles.nameCell}>{user.name}</td>
            <td>
              <span className={styles.phoneCell}>
                <Phone size={13} /> {user.phone}
              </span>
            </td>
            <td className={styles.addressCell}>{user.address}</td>
            <td>
              <span className={styles.roleBadge}>{user.role}</span>
            </td>
            <td>
              <Button variant="ghost" icon={Eye} iconSize={15} onClick={() => setSelected(user)}>
                Göstər
              </Button>
            </td>
          </tr>
        ))}
        {paged.length === 0 && <TableEmptyRow colSpan={columns.length} />}
      </Table>

      <Pagination page={page} pageSize={pageSize} total={filtered.length} onPageChange={setPage} />

      <Modal open={!!selected} onClose={() => setSelected(null)} title="İstifadəçi məlumatları">
        {selected && (
          <div>
            <div className={styles.detailTop}>
              <span className={styles.detailAvatar} style={{ backgroundColor: selected.color }}>
                {selected.initial}
              </span>
              <div>
                <div className={styles.detailName}>{selected.name}</div>
                <span className={styles.roleBadge}>{selected.role}</span>
              </div>
            </div>
            <dl className={styles.detailGrid}>
              <dt>Telefon:</dt>
              <dd>{selected.phone}</dd>
              <dt>Ünvan:</dt>
              <dd>{selected.address}</dd>
            </dl>
          </div>
        )}
      </Modal>
    </div>
  )
}
