import api from './axiosInstance'
import type { CampaignApi, CampaignPayload } from '@/types/campaign'

export const listCampaigns = () => api.get<CampaignApi[]>('/admin/campaigns')
export const createCampaign = (payload: CampaignPayload) => api.post<CampaignApi>('/admin/campaign', payload)
export const updateCampaign = (id: number, payload: CampaignPayload) =>
  api.put<CampaignApi>(`/admin/campaigns/${id}`, payload)
export const deleteCampaign = (id: number) => api.delete<null>(`/admin/campaigns/${id}`)
