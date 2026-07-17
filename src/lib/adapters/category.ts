import { formatDate } from '@/utils/formatDate'

const FALLBACK = { image: '🏷️', color: '#f3f4f6' }

export const mapCategoryFromApi = (c) => ({
  id: c.id,
  ...FALLBACK,
  imageUrl: c.img_url || '',
  name: c.name,
  description: c.description,
  date: formatDate(c.created_at),
})

export const mapCategoryToApi = (form) => ({
  name: form.name,
  description: form.description,
  img_url: form.imageUrl || '',
})
