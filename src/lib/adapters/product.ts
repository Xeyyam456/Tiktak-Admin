import { formatDate } from '@/utils/formatDate'
import type { Product, ProductApi, ProductForm, ProductPayload } from '@/types/product'

const FALLBACK = { image: '📦', color: '#f3f4f6' }

export const mapProductFromApi = (p: ProductApi): Product => ({
  id: p.id,
  ...FALLBACK,
  imageUrl: p.img_url || '',
  name: p.title,
  description: p.description,
  price: p.price,
  type: p.type,
  category: p.category ?? null,
  category_id: p.category?.id ?? '',
  date: formatDate(p.created_at),
})

export const mapProductToApi = (form: ProductForm): ProductPayload => ({
  title: form.name,
  description: form.description,
  price: String(form.price),
  type: form.type,
  img_url: form.imageUrl || '',
  category_id: Number(form.category_id),
})
