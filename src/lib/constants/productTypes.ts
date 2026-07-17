import type { BadgeColor } from '@/types/common'

export const PRODUCT_TYPE_LABELS = {
  kg: 'Kiloqram',
  gr: 'Qram',
  litre: 'Litr',
  ml: 'Millilitr',
  meter: 'Metr',
  cm: 'Santimetr',
  mm: 'Millimetr',
  piece: 'Ədəd',
  packet: 'Paket',
  box: 'Qutu',
} as const

export type ProductType = keyof typeof PRODUCT_TYPE_LABELS

export const PRODUCT_TYPE_OPTIONS = Object.keys(PRODUCT_TYPE_LABELS) as ProductType[]

const WEIGHT_BASED_TYPES: ProductType[] = ['kg', 'gr', 'litre', 'ml']

export const productTypeBadgeColor = (type: ProductType): BadgeColor =>
  WEIGHT_BASED_TYPES.includes(type) ? 'purple' : 'green'
