import type { ReactNode } from 'react'
import type { BadgeColor } from '@/types/common'
import styles from './Badge.module.css'

interface BadgeProps {
  color?: BadgeColor
  children: ReactNode
}

export default function Badge({ color = 'green', children }: BadgeProps) {
  return <span className={`${styles.badge} ${styles[color]}`}>{children}</span>
}
