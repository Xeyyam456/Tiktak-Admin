import type { AdminUser, ApiResponse } from '@/types/Resad TYPESCRIPT_FILES/models'
import { usersMock } from '@/RESAD_FILES/mock'
import { mockDelay } from '@/RESAD_FILES/mock/simulate'

export const userService = {
  list() {
    return mockDelay<ApiResponse<AdminUser[]>>({ message: 'OK', result: true, data: usersMock })
  },
}
