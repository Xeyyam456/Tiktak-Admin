import axios from 'axios'
import { getAccessToken, getRefreshToken, saveTokens, clearSession } from '@/lib/auth/session'
import { useAuthStore } from '@/store/useAuthStore'

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/tiktak`

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Accept-Language': 'az' },
})

api.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

const handleSuccess = (response) => response.data.data ?? response.data

const STATUS_MESSAGES = {
  400: 'Məlumatlar düzgün deyil',
  403: 'Bu əməliyyat üçün icazəniz yoxdur',
  404: 'Tapılmadı',
  409: 'Bu məlumat artıq mövcuddur',
  422: 'Məlumatlar düzgün deyil',
  500: 'Server xətası baş verdi',
}

// Backend mesajları ingiliscə gəlir — onları göstərmək əvəzinə status koduna
// görə Azərbaycan dilində sabit mesajlar veririk ki, bütün toastlar eyni dildə olsun
function getErrorMessage(error, isLogin) {
  if (!error.response) return 'Serverə qoşulmaq mümkün olmadı'
  if (error.response.status === 401) {
    return isLogin ? 'Telefon və ya parol yanlışdır' : 'Sessiya bitib, yenidən daxil olun'
  }
  // Backend, sifarişlərdə istifadə olunan məhsulun silinməsini 400/422 ilə rədd edir
  // (foreign key qaydası) — bu halı ümumi "Məlumatlar düzgün deyil" mesajından ayırırıq,
  // yoxsa admin bunu bug kimi qəbul edir.
  const isProductDelete = error.config?.method === 'delete' && /\/admin\/products\//.test(error.config?.url ?? '')
  if (isProductDelete && [400, 422].includes(error.response.status)) {
    return 'Bu məhsul mövcud sifarişlərdə istifadə olunduğu üçün silinə bilməz'
  }
  return STATUS_MESSAGES[error.response.status] || 'Xəta baş verdi'
}

let refreshPromise = null

function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = axios
      .post(`${BASE_URL}/auth/refresh`, { refresh_token: getRefreshToken() }, { headers: { 'Accept-Language': 'az' } })
      .then((res) => {
        saveTokens(res.data.data)
        return res.data.data
      })
      .finally(() => {
        refreshPromise = null
      })
  }
  return refreshPromise
}

const handleError = async (error) => {
  const original = error.config
  const isUnauthorized = error.response?.status === 401
  const canRetry = isUnauthorized && !original.skipAuthRetry && !original._retry && getRefreshToken()

  if (canRetry) {
    original._retry = true
    try {
      await refreshAccessToken()
      return api(original)
    } catch {
      clearSession()
      useAuthStore.getState().logout()
    }
  } else if (isUnauthorized && !original.skipAuthRetry) {
    clearSession()
    useAuthStore.getState().logout()
  }

  return Promise.reject(new Error(getErrorMessage(error, original.skipAuthRetry)))
}

api.interceptors.response.use(handleSuccess, handleError)

export default api
