import { formatDate } from '@/utils/formatDate'
import type { Category, CategoryApi, CategoryForm, CategoryPayload } from '@/types/category'

const FALLBACK = { image: '🏷️', color: '#f3f4f6' }

export const mapCategoryFromApi = (c: CategoryApi): Category => ({
  id: c.id,
  ...FALLBACK,
  imageUrl: c.img_url || '',
  name: c.name,
  description: c.description,
  date: formatDate(c.created_at),
})

export const mapCategoryToApi = (form: CategoryForm): CategoryPayload => ({
  name: form.name,
  description: form.description,
  img_url: form.imageUrl || '',
})
