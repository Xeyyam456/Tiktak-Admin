import type { ReactNode } from 'react'
import styles from './Thumbnail.module.css'

interface ThumbnailProps {
  imageUrl?: string
  image?: ReactNode
  color?: string
  size?: 'sm' | 'lg'
}

export default function Thumbnail({ imageUrl, image, color, size = 'sm' }: ThumbnailProps) {
  return (
    <span className={`flex items-center justify-center overflow-hidden ${styles.thumb} ${styles[size]}`} style={{ backgroundColor: color }}>
      {imageUrl ? <img src={imageUrl} alt="" className={styles.img} /> : image}
    </span>
  )
}
