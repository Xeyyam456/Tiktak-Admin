import type { UserRole } from '@/types/Resad TYPESCRIPT_FILES/enums'

export interface User {
  id: number
  full_name: string
  phone: string
  address: string | null
  img_url: string | null
  role: UserRole
  created_at: string
}

export interface AdminUser extends User {
  password: string
}

export interface AuthTokens {
  access_token: string
  refresh_token: string
}

export interface AdminLoginPayload {
  phone: string
  password: string
}

export interface AuthResponseData {
  tokens: AuthTokens
  profile: User
}
