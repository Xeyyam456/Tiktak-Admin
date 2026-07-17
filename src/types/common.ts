import type { ComponentType, ReactNode } from 'react'

export type BadgeColor = 'green' | 'blue' | 'amber' | 'purple' | 'red'

export interface Column {
  key: string
  label: ReactNode
  width?: number | string
}

export type IconComponent = ComponentType<{ size?: number; color?: string }>

export interface LayoutOutletContext {
  search: string
}
