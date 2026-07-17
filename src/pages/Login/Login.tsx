import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Phone, Lock, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import loginImg from '@/assets/images/login-img.svg'
import { useTitle } from '@/shared/hooks/useTitle'
import { useAuthStore } from '@/store/useAuthStore'
import styles from './Login.module.css'

export default function Login() {
  useTitle('Giriş')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!phone.trim() || !password.trim()) {
      toast.error('Telefon və parolu daxil edin')
      return
    }
    setLoading(true)
    try {
      await login(phone.trim(), password)
      navigate('/sifarisler', { replace: true })
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Xəta baş verdi')
    } finally {
      setLoading(false)
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
              <div className={styles.inputWrap}>
                <Phone size={16} className={styles.leadingIcon} />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="telefon"
                  className={`${styles.input} ${styles.hasLeadingIcon}`}
                />
              </div>
            </label>

            <label className={styles.field}>
              Parol
              <div className={styles.inputWrap}>
                <Lock size={16} className={styles.leadingIcon} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="**********"
                  className={`${styles.input} ${styles.hasLeadingIcon} ${styles.hasTrailingIcon}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className={styles.trailingIconBtn}
                  aria-label={showPassword ? 'Parolu gizlət' : 'Parolu göstər'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </label>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Yoxlanılır...' : 'Daxil ol'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
