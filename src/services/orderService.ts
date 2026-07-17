import api from './axiosInstance'

export const listOrders = () => api.get('/orders/admin')
export const getOrderStats = () => api.get('/orders/admin/stats')
export const updateOrderStatus = (id, status) => api.put(`/orders/admin/${id}/status`, { status })
