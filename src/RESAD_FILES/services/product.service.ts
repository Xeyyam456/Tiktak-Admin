import type {
  ListQueryParams,
  PaginatedResponse,
  Product,
  ProductPayload,
} from '@/types/Resad TYPESCRIPT_FILES/models'
import { categoriesMock, productsMock } from '@/RESAD_FILES/mock'
import { mockDelay } from '@/RESAD_FILES/mock/simulate'

let products = [...productsMock]

export const productService = {
  list(params?: ListQueryParams) {
    const search = params?.search?.toLowerCase()
    const filtered = search
      ? products.filter((product) => product.title.toLowerCase().includes(search))
      : products

    return mockDelay<PaginatedResponse<Product>>({
      message: 'OK',
      result: true,
      data: filtered,
      pagination: {
        next: null,
        prev: null,
        current: 1,
        total: filtered.length,
        totalPages: 1,
      },
    })
  },
  create(payload: ProductPayload) {
    const category = categoriesMock.find((category) => category.id === payload.category_id)!
    const product: Product = {
      id: Date.now(),
      img_url: payload.img_url ?? null,
      created_at: new Date().toISOString(),
      title: payload.title,
      description: payload.description,
      price: payload.price,
      type: payload.type,
      category: { id: category.id, name: category.name },
    }
    products = [product, ...products]
    return mockDelay({ message: 'OK', result: true, data: product })
  },
  update(id: number, payload: ProductPayload) {
    const category = categoriesMock.find((category) => category.id === payload.category_id)!
    products = products.map((product) =>
      product.id === id
        ? {
            ...product,
            title: payload.title,
            description: payload.description,
            price: payload.price,
            type: payload.type,
            img_url: payload.img_url ?? product.img_url,
            category: { id: category.id, name: category.name },
          }
        : product,
    )
    const product = products.find((product) => product.id === id)!
    return mockDelay({ message: 'OK', result: true, data: product })
  },
  remove(id: number) {
    products = products.filter((product) => product.id !== id)
    return mockDelay({ message: 'OK', result: true, data: null })
  },
}
