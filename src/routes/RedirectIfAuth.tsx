import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'

export default function RedirectIfAuth({ children }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  return isAuthenticated ? <Navigate to="/sifarisler" replace /> : children
}
