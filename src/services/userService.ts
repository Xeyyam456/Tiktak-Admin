import api from './axiosInstance'

export const listUsers = () => api.get('/admin/users')
