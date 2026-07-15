import styles from './Button.module.css'

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
}) {
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
