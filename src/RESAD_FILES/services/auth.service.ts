import type { AdminLoginPayload, ApiResponse, AuthResponseData } from '@/types/Resad TYPESCRIPT_FILES/models'
import { UserRole } from '@/types/Resad TYPESCRIPT_FILES/enums'
import { mockDelay } from '@/RESAD_FILES/mock/simulate'

export const authService = {
  login(payload: AdminLoginPayload) {
    return mockDelay<ApiResponse<AuthResponseData>>({
      message: 'OK',
      result: true,
      data: {
        tokens: { access_token: 'mock-access-token', refresh_token: 'mock-refresh-token' },
        profile: {
          id: 2,
          full_name: 'Tiktak Admin',
          phone: payload.phone,
          address: null,
          img_url: null,
          role: UserRole.ADMIN,
          created_at: new Date().toISOString(),
        },
      },
    })
  },
}
