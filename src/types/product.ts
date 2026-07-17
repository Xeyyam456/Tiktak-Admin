import type { ProductType } from '@/lib/constants/productTypes'

export interface ProductCategoryShort {
  id: number
  name: string
}

export interface ProductApi {
  id: number
  title: string
  description: string
  price: string
  type: ProductType
  img_url: string
  category: ProductCategoryShort | null
  created_at: string
}

export interface Product {
  id: number
  image: string
  color: string
  imageUrl: string
  name: string
  description: string
  price: string
  type: ProductType
  category: ProductCategoryShort | null
  category_id: number | ''
  date: string
}

export interface ProductForm {
  image: string
  color: string
  imageUrl: string
  name: string
  description: string
  price: string
  // starts as `number | ''` (openCreate seeds it from a Product's category_id)
  // but a <select>'s onChange always hands back a plain string — widened to
  // cover both origins rather than casting at every call site.
  category_id: number | string
  type: ProductType
}

export interface ProductPayload {
  title: string
  description: string
  price: string
  type: ProductType
  img_url: string
  category_id: number
}

export type { ProductType }
