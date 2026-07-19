import type { ApiResponse, Campaign, CampaignPayload } from '@/types/Resad TYPESCRIPT_FILES/models'
import { campaignsMock } from '@/RESAD_FILES/mock'
import { mockDelay } from '@/RESAD_FILES/mock/simulate'

let campaigns = [...campaignsMock]

export const campaignService = {
  list() {
    return mockDelay<ApiResponse<Campaign[]>>({ message: 'OK', result: true, data: campaigns })
  },
  create(payload: CampaignPayload) {
    const campaign: Campaign = {
      id: Date.now(),
      created_at: new Date().toISOString(),
      ...payload,
      img_url: payload.img_url ?? null,
    }
    campaigns = [campaign, ...campaigns]
    return mockDelay<ApiResponse<Campaign>>({ message: 'OK', result: true, data: campaign })
  },
  update(id: number, payload: CampaignPayload) {
    campaigns = campaigns.map((campaign) =>
      campaign.id === id ? { ...campaign, ...payload, img_url: payload.img_url ?? campaign.img_url } : campaign,
    )
    const campaign = campaigns.find((campaign) => campaign.id === id)!
    return mockDelay<ApiResponse<Campaign>>({ message: 'OK', result: true, data: campaign })
  },
  remove(id: number) {
    campaigns = campaigns.filter((campaign) => campaign.id !== id)
    return mockDelay<ApiResponse<null>>({ message: 'OK', result: true, data: null })
  },
}
