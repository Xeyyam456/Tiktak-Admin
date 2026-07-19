export const UserRole = {
  ADMIN: 'ADMIN',
  COMMERCE: 'COMMERCE',
} as const

export type UserRole = (typeof UserRole)[keyof typeof UserRole]
