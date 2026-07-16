import { formatDate } from '@/utils/formatDate'
import { PRODUCT_TYPE_LABELS } from '@/lib/constants/productTypes'

const FALLBACK = { image: '📦', color: '#f3f4f6' }

export const mapOrderFromApi = (o) => ({
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
  items: (o.items ?? []).map((it) => ({
    name: it.product?.title ?? '',
    category: it.product?.category?.name ?? '',
    weight: `${it.quantity} ${PRODUCT_TYPE_LABELS[it.product?.type] ?? ''}`.trim(),
    price: it.product?.price ?? it.total_price,
    unit: PRODUCT_TYPE_LABELS[it.product?.type] ?? '',
    ...FALLBACK,
  })),
})
