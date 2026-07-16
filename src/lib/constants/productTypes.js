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
}

export const PRODUCT_TYPE_OPTIONS = Object.keys(PRODUCT_TYPE_LABELS)

const WEIGHT_BASED_TYPES = ['kg', 'gr', 'litre', 'ml']

export const productTypeBadgeColor = (type) => (WEIGHT_BASED_TYPES.includes(type) ? 'purple' : 'green')
