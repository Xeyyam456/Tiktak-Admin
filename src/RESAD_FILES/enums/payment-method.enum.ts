export const PaymentMethod = {
  CASH: 'CASH',
  CARD: 'CARD',
} as const

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod]
