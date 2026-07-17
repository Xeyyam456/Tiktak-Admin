import { useNavigate } from 'react-router-dom'
import { Compass } from 'lucide-react'
import Button from '@/shared/components/Button/Button'
import { useTitle } from '@/shared/hooks/useTitle'
import styles from './NotFound.module.css'

export default function NotFound() {
  useTitle('Səhifə tapılmadı')
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <span className={styles.badge}>
        <Compass size={32} />
      </span>
      <div className={styles.code}>404</div>
      <h1 className={styles.title}>Səhifə tapılmadı</h1>
      <p className={styles.text}>Axtardığınız səhifə mövcud deyil və ya silinib.</p>
      <Button onClick={() => navigate('/sifarisler')}>Ana səhifəyə qayıt</Button>
    </div>
  )
}
