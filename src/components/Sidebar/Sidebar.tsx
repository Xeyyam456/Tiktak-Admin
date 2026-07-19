import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useQueryClient, type QueryClient } from '@tanstack/react-query'
import { ClipboardList, Megaphone, Tags, Package, Users, LogOut } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import ConfirmModal from '@/shared/components/ConfirmModal/ConfirmModal'
import { listOrders, getOrderStats } from '@/services/orderService'
import { listCampaigns } from '@/services/campaignService'
import { listCategories } from '@/services/categoryService'
import { listProducts } from '@/services/productService'
import { listUsers } from '@/services/userService'
import { mapOrderFromApi } from '@/lib/adapters/order'
import { mapCampaignFromApi } from '@/lib/adapters/campaign'
import { mapCategoryFromApi } from '@/lib/adapters/category'
import { mapProductFromApi } from '@/lib/adapters/product'
import { mapUserFromApi } from '@/lib/adapters/user'
import styles from './Sidebar.module.css'

const navItems = [
  { to: '/sifarisler', label: 'Sifarişlər', icon: ClipboardList },
  { to: '/kampaniyalar', label: 'Kampaniyalar', icon: Megaphone },
  { to: '/kateqoriyalar', label: 'Kateqoriyalar', icon: Tags },
  { to: '/mehsullar', label: 'Məhsullar', icon: Package },
  { to: '/istifadeciler', label: 'İstifadəçilər', icon: Users },
]

// Nav linkinin üzərinə mouse gələndə həmin səhifənin datasını əvvəlcədən çəkir —
// klik olunanda səhifə artıq cache-dən açılır, Loading demək olar görünmür.
// queryKey/queryFn cütləri həmin səhifənin öz useQuery çağırışı ilə eynilə üst-üstə
// düşməlidir, yoxsa TanStack Query key-i "dolu" sayıb səhifənin öz sorğusunu buraxar.
const PREFETCH: Record<string, (queryClient: QueryClient) => void> = {
  '/sifarisler': (queryClient) => {
    queryClient.prefetchQuery({ queryKey: ['orders'], queryFn: () => listOrders().then((data) => data.map(mapOrderFromApi)) })
    queryClient.prefetchQuery({ queryKey: ['orderStats'], queryFn: getOrderStats })
  },
  '/kampaniyalar': (queryClient) =>
    queryClient.prefetchQuery({
      queryKey: ['campaigns'],
      queryFn: () => listCampaigns().then((data) => data.map(mapCampaignFromApi)),
    }),
  '/kateqoriyalar': (queryClient) =>
    queryClient.prefetchQuery({
      queryKey: ['categories'],
      queryFn: () => listCategories().then((data) => data.map(mapCategoryFromApi)),
    }),
  '/mehsullar': (queryClient) => {
    queryClient.prefetchQuery({ queryKey: ['products'], queryFn: () => listProducts().then((data) => data.map(mapProductFromApi)) })
    queryClient.prefetchQuery({
      queryKey: ['categories'],
      queryFn: () => listCategories().then((data) => data.map(mapCategoryFromApi)),
    })
  },
  '/istifadeciler': (queryClient) =>
    queryClient.prefetchQuery({ queryKey: ['users'], queryFn: () => listUsers().then((data) => data.map(mapUserFromApi)) }),
}

export default function Sidebar() {
  const navigate = useNavigate()
  const logout = useAuthStore((s) => s.logout)
  const queryClient = useQueryClient()
  const [confirmOpen, setConfirmOpen] = useState(false)

  return (
    <aside className={`flex flex-col ${styles.aside}`}>
      <nav className={`flex flex-col gap-1 ${styles.nav}`}>
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onMouseEnter={() => PREFETCH[to]?.(queryClient)}
            className={({ isActive }) => `flex items-center gap-3 ${styles.link} ${isActive ? styles.linkActive : ''}`}
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
      <button
        type="button"
        onClick={() => setConfirmOpen(true)}
        className={`flex items-center gap-3 cursor-pointer text-left ${styles.logoutBtn}`}
      >
        <LogOut size={18} />
        Çıxış
      </button>

      <ConfirmModal
        open={confirmOpen}
        message="Hesabdan çıxmaq istədiyinizə əminsiniz?"
        showIcon={false}
        onConfirm={() => {
          setConfirmOpen(false)
          logout()
          navigate('/login')
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </aside>
  )
}
