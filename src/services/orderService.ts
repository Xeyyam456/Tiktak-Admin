import api from './axiosInstance'
import type { OrderApi, OrderStats, OrderStatus } from '@/types/order'

export const listOrders = () => api.get<OrderApi[]>('/orders/admin')
// Backend may omit some status counters (e.g. CANCELLED) — see docs/API.md §8.2 —
// so the raw fetch is honestly Partial here; Orders.tsx merges it with its own
// client-computed status counts before treating it as a full OrderStats.
export const getOrderStats = () => api.get<Partial<OrderStats>>('/orders/admin/stats')
export const updateOrderStatus = (id: number, status: OrderStatus) =>
  api.put<OrderApi>(`/orders/admin/${id}/status`, { status })
