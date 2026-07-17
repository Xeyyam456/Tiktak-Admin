import api from './axiosInstance'

export const listProducts = () => api.get('/admin/products')
export const createProduct = (payload) => api.post('/admin/product', payload)
export const updateProduct = (id, payload) => api.put(`/admin/products/${id}`, payload)
export const deleteProduct = (id) => api.delete(`/admin/products/${id}`)
