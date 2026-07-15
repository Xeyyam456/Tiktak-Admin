import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import loginImg from '@/assets/images/login-img.svg'
import { useTitle } from '@/shared/hooks/useTitle'
import styles from './Login.module.css'

export default function Login() {
  useTitle('Giriş')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (phone.trim() && password.trim()) {
      navigate('/sifarisler', { replace: true })
    } else {
      setError('Telefon və parolu daxil edin')
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.left}>
        <h1 className={styles.brand}>TIK TAK ADMİN</h1>
        <div className={styles.illustrationWrap}>
          <img src={loginImg} alt="" className={styles.illustration} />
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.formWrap}>
          <h2 className={styles.formTitle}>Admin Panel</h2>

          <form onSubmit={handleSubmit} className={styles.form}>
            <label className={styles.field}>
              Telefon
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="telefon"
                className={styles.input}
              />
            </label>

            <label className={styles.field}>
              Parol
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="**********"
                className={styles.input}
              />
            </label>

            {error && <p className={styles.error}>{error}</p>}

            <button type="submit" className={styles.submitBtn}>
              Daxil ol
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
