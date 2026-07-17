import api from './axiosInstance'
import type { LoginPayload, LoginResponse, Profile } from '@/types/auth'

export const loginAdmin = (payload: LoginPayload) =>
  api.post<LoginResponse>('/auth/admin/login', payload, { skipAuthRetry: true })
export const getProfile = () => api.get<Profile>('/admin/profile')
