import api from './axiosInstance'

export const listCategories = () => api.get('/admin/categories')
export const createCategory = (payload) => api.post('/admin/category', payload)
export const updateCategory = (id, payload) => api.put(`/admin/categories/${id}`, payload)
export const deleteCategory = (id) => api.delete(`/admin/categories/${id}`)
