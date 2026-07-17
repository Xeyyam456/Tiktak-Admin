import api from './axiosInstance'

export const loginAdmin = (payload) => api.post('/auth/admin/login', payload, { skipAuthRetry: true })
export const getProfile = () => api.get('/admin/profile')
