import { OrderStatus } from '@/types/Resad TYPESCRIPT_FILES/enums'
import type { ApiResponse, Order, OrderStats, UpdateOrderStatusPayload } from '@/types/Resad TYPESCRIPT_FILES/models'
import { ordersMock } from '@/RESAD_FILES/mock'
import { mockDelay } from '@/RESAD_FILES/mock/simulate'

let orders = [...ordersMock]

function computeStats(): OrderStats {
  return {
    TOTAL: orders.length,
    DELIVERED: orders.filter((order) => order.status === OrderStatus.DELIVERED).length,
    PENDING: orders.filter((order) => order.status === OrderStatus.PENDING).length,
    PREPARING: orders.filter((order) => order.status === OrderStatus.PREPARING).length,
    CANCELLED: orders.filter((order) => order.status === OrderStatus.CANCELLED).length,
    TOTAL_REVENUE: orders
      .filter((order) => order.status === OrderStatus.DELIVERED)
      .reduce((sum, order) => sum + Number(order.total), 0),
  }
}

export const orderService = {
  list() {
    return mockDelay<ApiResponse<Order[]>>({ message: 'OK', result: true, data: orders })
  },
  stats() {
    return mockDelay<OrderStats>(computeStats())
  },
  updateStatus(id: number, payload: UpdateOrderStatusPayload) {
    orders = orders.map((order) => (order.id === id ? { ...order, status: payload.status } : order))
    const order = orders.find((order) => order.id === id)!
    return mockDelay<ApiResponse<Order>>({ message: 'OK', result: true, data: order })
  },
}
