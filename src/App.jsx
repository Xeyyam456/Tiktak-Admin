import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from '@/layouts/AdminLayout/AdminLayout'
import Login from '@/pages/Login/Login'
import Orders from '@/pages/Orders/Orders'
import Campaigns from '@/pages/Campaigns/Campaigns'
import Categories from '@/pages/Categories/Categories'
import Products from '@/pages/Products/Products'
import Users from '@/pages/Users/Users'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<AdminLayout />}>
          <Route path="/sifarisler" element={<Orders />} />
          <Route path="/kampaniyalar" element={<Campaigns />} />
          <Route path="/kateqoriyalar" element={<Categories />} />
          <Route path="/mehsullar" element={<Products />} />
          <Route path="/istifadeciler" element={<Users />} />
        </Route>
        <Route path="/" element={<Navigate to="/sifarisler" replace />} />
        <Route path="*" element={<Navigate to="/sifarisler" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
