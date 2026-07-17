export interface CategoryApi {
  id: number
  name: string
  img_url: string
  description: string
  created_at: string
}

export interface Category {
  id: number
  image: string
  color: string
  imageUrl: string
  name: string
  description: string
  date: string
}

export interface CategoryForm {
  image: string
  color: string
  imageUrl: string
  name: string
  description: string
}

export type CategoryPayload = Pick<CategoryApi, 'name' | 'description' | 'img_url'>
