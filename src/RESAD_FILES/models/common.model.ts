export interface ApiResponse<T> {
  message: string
  data: T
  result: boolean
}

export interface Pagination {
  next: number | null
  prev: number | null
  current: number
  total: number
  totalPages: number
}

export interface PaginatedResponse<T> {
  message: string
  data: T[]
  pagination: Pagination
  result: boolean
}

export interface ListQueryParams {
  limit?: number
  page?: number
  search?: string
  category_id?: number
}
