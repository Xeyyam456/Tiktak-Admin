import { formatDate } from '@/utils/formatDate'
import { PRODUCT_TYPE_LABELS } from '@/lib/constants/productTypes'
import type { Order, OrderApi, OrderItem } from '@/types/order'

const FALLBACK = { image: '📦', color: '#f3f4f6' }

export const mapOrderFromApi = (o: OrderApi): Order => ({
  id: o.id,
  orderNumber: o.orderNumber,
  date: formatDate(o.createdAt),
  address: o.address,
  phone: o.phone,
  paymentMethod: o.paymentMethod === 'CARD' ? 'Kart' : 'Nağd',
  status: o.status,
  subtotal: o.total,
  freeShipping: Number(o.deliveryFee) === 0,
  itemCount: o.items?.length ?? 0,
  user: o.user ?? null,
  items: (o.items ?? []).map((it): OrderItem => {
    const productType = it.product?.type
    return {
      name: it.product?.title ?? '',
      category: it.product?.category?.name ?? '',
      weight: `${it.quantity} ${productType ? PRODUCT_TYPE_LABELS[productType] : ''}`.trim(),
      price: it.product?.price ?? it.total_price,
      unit: productType ? PRODUCT_TYPE_LABELS[productType] : '',
      ...FALLBACK,
    }
  }),
})
