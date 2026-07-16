import { formatDate } from '@/utils/formatDate'

const FALLBACK = { image: '🖼️', color: '#f3f4f6' }

export const mapCampaignFromApi = (c) => ({
  id: c.id,
  ...FALLBACK,
  imageUrl: c.img_url || '',
  title: c.title,
  description: c.description,
  date: formatDate(c.created_at),
})

export const mapCampaignToApi = (form) => ({
  title: form.title,
  description: form.description,
  img_url: form.imageUrl || '',
})
