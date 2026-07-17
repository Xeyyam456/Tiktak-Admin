import type { BadgeColor } from '@/types/common'

export const ORDER_STATUS_LABELS = {
  PENDING: 'Gözləyir',
  CONFIRMED: 'Təsdiqləndi',
  PREPARING: 'Hazırlanır',
  READY: 'Hazırdır',
  DELIVERED: 'Çatdırıldı',
  CANCELLED: 'Ləğv edildi',
} as const

export type OrderStatus = keyof typeof ORDER_STATUS_LABELS

export const ORDER_STATUS_BADGE_COLOR: Record<OrderStatus, BadgeColor> = {
  PENDING: 'amber',
  CONFIRMED: 'blue',
  PREPARING: 'purple',
  READY: 'blue',
  DELIVERED: 'green',
  CANCELLED: 'red',
}

export const ORDER_STATUS_OPTIONS = Object.keys(ORDER_STATUS_LABELS) as OrderStatus[]
