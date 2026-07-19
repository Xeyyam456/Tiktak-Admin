import type { ApiResponse, Category, CategoryPayload } from '@/types/Resad TYPESCRIPT_FILES/models'
import { categoriesMock } from '@/RESAD_FILES/mock'
import { mockDelay } from '@/RESAD_FILES/mock/simulate'

let categories = [...categoriesMock]

export const categoryService = {
  list() {
    return mockDelay<ApiResponse<Category[]>>({ message: 'OK', result: true, data: categories })
  },
  create(payload: CategoryPayload) {
    const category: Category = {
      id: Date.now(),
      created_at: new Date().toISOString(),
      ...payload,
      img_url: payload.img_url ?? null,
    }
    categories = [category, ...categories]
    return mockDelay<ApiResponse<Category>>({ message: 'OK', result: true, data: category })
  },
  update(id: number, payload: CategoryPayload) {
    categories = categories.map((category) =>
      category.id === id ? { ...category, ...payload, img_url: payload.img_url ?? category.img_url } : category,
    )
    const category = categories.find((category) => category.id === id)!
    return mockDelay<ApiResponse<Category>>({ message: 'OK', result: true, data: category })
  },
  remove(id: number) {
    categories = categories.filter((category) => category.id !== id)
    return mockDelay<ApiResponse<null>>({ message: 'OK', result: true, data: null })
  },
}
