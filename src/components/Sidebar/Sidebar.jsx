import { NavLink, useNavigate } from 'react-router-dom'
import { ClipboardList, Megaphone, Tags, Package, Users, LogOut } from 'lucide-react'
import styles from './Sidebar.module.css'

const navItems = [
  { to: '/sifarisler', label: 'Sifarişlər', icon: ClipboardList },
  { to: '/kampaniyalar', label: 'Kampaniyalar', icon: Megaphone },
  { to: '/kateqoriyalar', label: 'Kateqoriyalar', icon: Tags },
  { to: '/mehsullar', label: 'Məhsullar', icon: Package },
  { to: '/istifadeciler', label: 'İstifadəçilər', icon: Users },
]

export default function Sidebar() {
  const navigate = useNavigate()

  return (
    <aside className={styles.aside}>
      <nav className={styles.nav}>
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`}
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
      <button type="button" onClick={() => navigate('/login')} className={styles.logoutBtn}>
        <LogOut size={18} />
        Çıxış
      </button>
    </aside>
  )
}
