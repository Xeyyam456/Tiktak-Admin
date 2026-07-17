import styles from './Thumbnail.module.css'

export default function Thumbnail({ imageUrl, image, color, size = 'sm' }) {
  return (
    <span className={`${styles.thumb} ${styles[size]}`} style={{ backgroundColor: color }}>
      {imageUrl ? <img src={imageUrl} alt="" className={styles.img} /> : image}
    </span>
  )
}
