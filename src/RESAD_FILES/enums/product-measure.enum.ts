export const ProductMeasure = {
  KG: 'kg',
  GR: 'gr',
  LITRE: 'litre',
  ML: 'ml',
  METER: 'meter',
  CM: 'cm',
  MM: 'mm',
  PIECE: 'piece',
  PACKET: 'packet',
  BOX: 'box',
} as const

export type ProductMeasure = (typeof ProductMeasure)[keyof typeof ProductMeasure]
