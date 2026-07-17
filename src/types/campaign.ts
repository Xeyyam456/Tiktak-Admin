export interface CampaignApi {
  id: number
  title: string
  img_url: string
  description: string
  created_at: string
}

export interface Campaign {
  id: number
  image: string
  color: string
  imageUrl: string
  title: string
  description: string
  date: string
}

export interface CampaignForm {
  image: string
  color: string
  imageUrl: string
  title: string
  description: string
}

export type CampaignPayload = Pick<CampaignApi, 'title' | 'description' | 'img_url'>
