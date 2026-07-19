import type { ApiResponse, User } from '@/types/Resad TYPESCRIPT_FILES/models'
import { UserRole } from '@/types/Resad TYPESCRIPT_FILES/enums'
import { mockDelay } from '@/RESAD_FILES/mock/simulate'

export const profileService = {
  get() {
    return mockDelay<ApiResponse<User>>({
      message: 'OK',
      result: true,
      data: {
        id: 2,
        full_name: 'Tiktak Admin',
        phone: '+994105554422',
        address: null,
        img_url: null,
        role: UserRole.ADMIN,
        created_at: '2025-06-12T05:44:27.813Z',
      },
    })
  },
}
