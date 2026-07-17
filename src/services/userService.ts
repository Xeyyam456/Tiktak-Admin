import api from './axiosInstance'
import type { UserApi } from '@/types/user'

export const listUsers = () => api.get<UserApi[]>('/admin/users')
