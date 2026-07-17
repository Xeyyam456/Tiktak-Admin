import api from './axiosInstance'
import type { ProductApi, ProductPayload } from '@/types/product'

export const listProducts = () => api.get<ProductApi[]>('/admin/products')
export const createProduct = (payload: ProductPayload) => api.post<ProductApi>('/admin/product', payload)
export const updateProduct = (id: number, payload: ProductPayload) =>
  api.put<ProductApi>(`/admin/products/${id}`, payload)
export const deleteProduct = (id: number) => api.delete<null>(`/admin/products/${id}`)
