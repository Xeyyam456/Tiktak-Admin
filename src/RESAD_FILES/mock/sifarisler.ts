import { OrderStatus, PaymentMethod } from '@/types/Resad TYPESCRIPT_FILES/enums'
import type { Order, OrderStats } from '@/types/Resad TYPESCRIPT_FILES/models'
import products from '@/RESAD_FILES/mock/mehsullar'

const orders: Order[] = [
  {
    id: 1,
    orderNumber: 'ORD-20250613-630',
    total: '18.89',
    deliveryFee: '0.00',
    paymentMethod: PaymentMethod.CARD,
    status: OrderStatus.PENDING,
    note: 'Zeng vurmadan qapiya qoyun',
    address: 'Baki, Nesimi rayonu, Aga Neymatulla',
    phone: '+994103193897',
    createdAt: '2025-06-13T07:35:41.867Z',
    updatedAt: '2025-06-13T07:35:41.867Z',
    user: { id: 3, full_name: 'Elvin Hesenov', img_url: null },
    items: [{ id: 1, quantity: 1, total_price: products[0].price, product: products[0] }],
  },
  {
    id: 2,
    orderNumber: 'ORD-20250614-118',
    total: '113.80',
    deliveryFee: '3.00',
    paymentMethod: PaymentMethod.CASH,
    status: OrderStatus.PREPARING,
    note: null,
    address: 'Baki, Yasamal rayonu',
    phone: '+994557891234',
    createdAt: '2025-06-14T10:12:03.101Z',
    updatedAt: '2025-06-14T10:40:00.000Z',
    user: { id: 4, full_name: 'Nigar Aliyeva', img_url: null },
    items: [
      { id: 2, quantity: 2, total_price: '318.98', product: products[1] },
      { id: 3, quantity: 1, total_price: '159.90', product: products[2] },
    ],
  },
  {
    id: 3,
    orderNumber: 'ORD-20250615-402',
    total: '52.00',
    deliveryFee: '0.00',
    paymentMethod: PaymentMethod.CARD,
    status: OrderStatus.DELIVERED,
    note: null,
    address: 'Sumqayit, 15-ci mikrorayon',
    phone: '+994503334455',
    createdAt: '2025-06-15T14:02:20.000Z',
    updatedAt: '2025-06-15T18:45:00.000Z',
    user: { id: 5, full_name: 'Kamran Guliyev', img_url: null },
    items: [{ id: 4, quantity: 1, total_price: '52.00', product: products[11] }],
  },
  {
    id: 4,
    orderNumber: 'ORD-20250616-771',
    total: '68.00',
    deliveryFee: '0.00',
    paymentMethod: PaymentMethod.CARD,
    status: OrderStatus.CANCELLED,
    note: 'Musteri legv etdi',
    address: 'Baki, Xetai rayonu',
    phone: '+994516667766',
    createdAt: '2025-06-16T09:00:00.000Z',
    updatedAt: '2025-06-16T09:20:00.000Z',
    user: { id: 3, full_name: 'Elvin Hesenov', img_url: null },
    items: [{ id: 5, quantity: 1, total_price: '68.00', product: products[13] }],
  },
]

export const orderStats: OrderStats = {
  TOTAL: orders.length,
  DELIVERED: orders.filter((o) => o.status === OrderStatus.DELIVERED).length,
  PENDING: orders.filter((o) => o.status === OrderStatus.PENDING).length,
  PREPARING: orders.filter((o) => o.status === OrderStatus.PREPARING).length,
  CANCELLED: orders.filter((o) => o.status === OrderStatus.CANCELLED).length,
  TOTAL_REVENUE: orders
    .filter((o) => o.status === OrderStatus.DELIVERED)
    .reduce((sum, o) => sum + Number(o.total), 0),
}

export default orders
