import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '@/components/Sidebar/Sidebar'
import Header from '@/components/Header/Header'
import { useDebounce } from '@/shared/hooks/useDebounce'
import type { LayoutOutletContext } from '@/types/common'
import styles from './AdminLayout.module.css'

export default function AdminLayout() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)
  const { pathname } = useLocation()

  // AdminLayout doesn't remount between routes, so a search typed on one page
  // (e.g. Users) would otherwise keep filtering the next page's unrelated data,
  // making it look like data stopped loading until a hard reload.
  useEffect(() => {
    setSearch('')
  }, [pathname])

  return (
    <div className={styles.page}>
      <div className={styles.headerBar}>
        <div className={styles.headerInner}>
          <Header search={search} onSearchChange={setSearch} />
        </div>
      </div>
      <div className={styles.bodyBar}>
        <div className={`flex items-stretch gap-6 ${styles.bodyInner}`}>
          <Sidebar />
          <main className={`flex flex-col ${styles.main}`}>
            <Outlet context={{ search: debouncedSearch } satisfies LayoutOutletContext} />
          </main>
        </div>
      </div>
    </div>
  )
}
