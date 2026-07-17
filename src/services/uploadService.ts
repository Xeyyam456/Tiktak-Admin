import api from './axiosInstance'

interface UploadResponse {
  url: string
}

export const uploadImage = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  return api.post<UploadResponse>('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}
