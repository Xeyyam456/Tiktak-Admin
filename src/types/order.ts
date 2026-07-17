import type { OrderStatus } from '@/lib/constants/orderStatus'
import type { ProductType } from '@/lib/constants/productTypes'

export interface OrderUserShort {
  id: number
  full_name: string
  img_url: string | null
}

export interface OrderItemProductApi {
  id: number
  title: string
  img_url: string
  description: string
  price: string
  type: ProductType
  created_at: string
  category: { id: number; name: string } | null
}

export interface OrderItemApi {
  id: number
  quantity: number
  total_price: string
  product?: OrderItemProductApi
}

export interface OrderApi {
  id: number
  orderNumber: string
  total: string
  deliveryFee: string
  paymentMethod: string
  status: OrderStatus
  note: string
  address: string
  phone: string
  createdAt: string
  updatedAt: string
  // present on the list response, absent on the status-update response — see
  // Orders.jsx's comment on why `selected` is derived from the `orders` cache
  user?: OrderUserShort | null
  items?: OrderItemApi[]
}

export interface OrderItem {
  name: string
  category: string
  weight: string
  price: string | number
  unit: string
  image: string
  color: string
}

export interface Order {
  id: number
  orderNumber: string
  date: string
  address: string
  phone: string
  paymentMethod: 'Kart' | 'Nağd'
  status: OrderStatus
  subtotal: string
  freeShipping: boolean
  itemCount: number
  user: OrderUserShort | null
  items: OrderItem[]
}

// `/orders/admin/stats` is documented as possibly omitting some counters
// (e.g. CANCELLED) — the raw fetch is typed Partial<OrderStats> at the
// service boundary (see orderService.ts) and only becomes fully non-partial
// after Orders.jsx merges it with its own client-computed status counts.
export interface OrderStats {
  TOTAL: number
  DELIVERED: number
  PENDING: number
  PREPARING: number
  CANCELLED: number
  TOTAL_REVENUE: number
}

export type { OrderStatus }
