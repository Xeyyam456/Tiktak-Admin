import { Search } from 'lucide-react'
import styles from './Header.module.css'

interface HeaderProps {
  search: string
  onSearchChange?: (value: string) => void
}

export default function Header({ search, onSearchChange }: HeaderProps) {
  return (
    <header className={`gap-4 ${styles.header}`}>
      <h1 className={`whitespace-nowrap ${styles.title}`}>TIK TAK ADMIN</h1>
      <div className={styles.searchWrap}>
        <Search className={styles.searchIcon} size={16} />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder="Axtarış"
          className={styles.searchInput}
        />
      </div>
      <div className={styles.spacer} />
    </header>
  )
}
