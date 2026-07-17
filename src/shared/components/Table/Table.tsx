import type { ReactNode } from 'react'
import type { Column } from '@/types/common'
import styles from './Table.module.css'

interface TableProps {
  columns: Column[]
  minWidth?: number
  children?: ReactNode
}

export function Table({ columns, minWidth = 720, children }: TableProps) {
  return (
    <div className={styles.scroll}>
      <table className={styles.table} style={{ minWidth }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={{ width: col.width }}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

interface TableEmptyRowProps {
  colSpan: number
  children?: ReactNode
}

export function TableEmptyRow({ colSpan, children = 'Nəticə tapılmadı' }: TableEmptyRowProps) {
  return (
    <tr className={styles.emptyRow}>
      <td colSpan={colSpan}>{children}</td>
    </tr>
  )
}

export default Table
