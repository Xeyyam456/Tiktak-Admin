import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '@/components/Sidebar/Sidebar'
import Header from '@/components/Header/Header'
import { useDebounce } from '@/shared/hooks/useDebounce'
import styles from './AdminLayout.module.css'

export default function AdminLayout() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)

  return (
    <div className={styles.page}>
      <div className={styles.headerBar}>
        <div className={styles.headerInner}>
          <Header search={search} onSearchChange={setSearch} />
        </div>
      </div>
      <div className={styles.bodyBar}>
        <div className={styles.bodyInner}>
          <Sidebar />
          <main className={styles.main}>
            <Outlet context={{ search: debouncedSearch }} />
          </main>
        </div>
      </div>
    </div>
  )
}
