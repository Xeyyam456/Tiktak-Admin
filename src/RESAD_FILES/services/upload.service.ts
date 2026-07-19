import type { ApiResponse } from '@/types/Resad TYPESCRIPT_FILES/models'
import { mockDelay } from '@/RESAD_FILES/mock/simulate'

export interface UploadResponseData {
  url: string
}

export const uploadService = {
  upload(file: File) {
    return mockDelay<ApiResponse<UploadResponseData>>({
      message: 'OK',
      result: true,
      data: { url: URL.createObjectURL(file) },
    })
  },
}
