import type { ComponentPropsWithRef } from 'react'
import type { IconComponent } from '@/types/common'
import styles from './Button.module.css'

interface ButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: 'solid' | 'outline' | 'ghost' | 'ghostDanger'
  icon?: IconComponent
  iconSize?: number
  fullWidth?: boolean
  block?: boolean
}

export default function Button({
  variant = 'solid',
  icon: Icon,
  iconSize = 16,
  fullWidth = false,
  block = false,
  className = '',
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  const classes = [
    styles.btn,
    styles[variant],
    fullWidth ? styles.fullWidth : '',
    block ? styles.block : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classes} {...rest}>
      {Icon && <Icon size={iconSize} />}
      {children}
    </button>
  )
}
