import api from './axiosInstance'
import type { CategoryApi, CategoryPayload } from '@/types/category'

export const listCategories = () => api.get<CategoryApi[]>('/admin/categories')
export const createCategory = (payload: CategoryPayload) => api.post<CategoryApi>('/admin/category', payload)
export const updateCategory = (id: number, payload: CategoryPayload) =>
  api.put<CategoryApi>(`/admin/categories/${id}`, payload)
export const deleteCategory = (id: number) => api.delete<null>(`/admin/categories/${id}`)
