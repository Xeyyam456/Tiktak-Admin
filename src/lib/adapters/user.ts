import type { User, UserApi } from '@/types/user'

export const mapUserFromApi = (u: UserApi): User => ({
  id: u.id,
  initial: (u.full_name || '?').charAt(0).toUpperCase(),
  color: '#22c55e',
  name: u.full_name,
  phone: u.phone,
  address: u.address || 'Qeyd olunmayıb',
  role: u.role,
})
