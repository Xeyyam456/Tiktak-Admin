export interface UserApi {
  id: number
  full_name: string
  phone: string
  address: string | null
  img_url: string | null
  role: string
  created_at: string
}

export interface User {
  id: number
  initial: string
  color: string
  name: string
  phone: string
  address: string
  role: string
}
