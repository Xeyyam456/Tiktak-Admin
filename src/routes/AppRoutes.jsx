import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import RequireAuth from '@/routes/RequireAuth'
import RedirectIfAuth from '@/routes/RedirectIfAuth'
import AdminLayout from '@/layouts/AdminLayout'
import Loading from '@/shared/Loading/Loading'

const Login = lazy(() => import('@/pages/Login/Login'))
const NotFound = lazy(() => import('@/pages/NotFound/NotFound'))
const Orders = lazy(() => import('@/pages/protected/Orders/Orders'))
const Campaigns = lazy(() => import('@/pages/protected/Campaigns/Campaigns'))
const Categories = lazy(() => import('@/pages/protected/Categories/Categories'))
const Products = lazy(() => import('@/pages/protected/Products/Products'))
const Users = lazy(() => import('@/pages/protected/Users/Users'))

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loading fullScreen />}>
      <Routes>
        <Route
          path="/login"
          element={
            <RedirectIfAuth>
              <Login />
            </RedirectIfAuth>
          }
        />
        <Route element={<RequireAuth />}>
          <Route element={<AdminLayout />}>
            <Route path="/sifarisler" element={<Orders />} />
            <Route path="/kampaniyalar" element={<Campaigns />} />
            <Route path="/kateqoriyalar" element={<Categories />} />
            <Route path="/mehsullar" element={<Products />} />
            <Route path="/istifadeciler" element={<Users />} />
          </Route>
        </Route>
        <Route path="/" element={<Navigate to="/sifarisler" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}
