import styles from './Table.module.css'

export function Table({ columns, minWidth = 720, children }) {
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

export function TableEmptyRow({ colSpan, children = 'Nəticə tapılmadı' }) {
  return (
    <tr className={styles.emptyRow}>
      <td colSpan={colSpan}>{children}</td>
    </tr>
  )
}

export default Table
