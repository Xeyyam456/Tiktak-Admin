export interface Profile {
  id: number
  full_name: string
  phone: string
  address: string | null
  img_url: string | null
  role: string
  created_at: string
}

export interface AuthTokens {
  access_token: string
  refresh_token: string
}

export interface LoginPayload {
  phone: string
  password: string
}

export interface LoginResponse {
  tokens: AuthTokens
  profile: Profile
}
