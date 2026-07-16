import { NavLink, useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { ClipboardList, Megaphone, Tags, Package, Users, LogOut } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
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
const PREFETCH = {
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

  return (
    <aside className={styles.aside}>
      <nav className={styles.nav}>
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onMouseEnter={() => PREFETCH[to]?.(queryClient)}
            className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`}
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
      <button
        type="button"
        onClick={() => {
          logout()
          navigate('/login')
        }}
        className={styles.logoutBtn}
      >
        <LogOut size={18} />
        Çıxış
      </button>
    </aside>
  )
}
