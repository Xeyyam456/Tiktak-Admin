import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import { getAccessToken, getRefreshToken, saveTokens, clearSession } from '@/lib/auth/session'
import { useAuthStore } from '@/store/useAuthStore'
import type { AuthTokens } from '@/types/auth'
import type { UnwrappedApi } from '@/types/api'

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

// Declared to return AxiosResponse only to satisfy axios's interceptor typing —
// at runtime this unwraps the `{data}` envelope to the raw payload. The real
// public contract callers see is `UnwrappedApi` (the `as unknown as UnwrappedApi`
// cast on the default export below), not this function's nominal return type.
const handleSuccess = (response: AxiosResponse) => (response.data.data ?? response.data) as AxiosResponse

const STATUS_MESSAGES: Record<number, string> = {
  400: 'Məlumatlar düzgün deyil',
  403: 'Bu əməliyyat üçün icazəniz yoxdur',
  404: 'Tapılmadı',
  409: 'Bu məlumat artıq mövcuddur',
  422: 'Məlumatlar düzgün deyil',
  500: 'Server xətası baş verdi',
}

// Backend mesajları ingiliscə gəlir — onları göstərmək əvəzinə status koduna
// görə Azərbaycan dilində sabit mesajlar veririk ki, bütün toastlar eyni dildə olsun
function getErrorMessage(error: AxiosError, isLogin?: boolean): string {
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

let refreshPromise: Promise<AuthTokens> | null = null

function refreshAccessToken(): Promise<AuthTokens> {
  if (!refreshPromise) {
    refreshPromise = axios
      .post(`${BASE_URL}/auth/refresh`, { refresh_token: getRefreshToken() }, { headers: { 'Accept-Language': 'az' } })
      .then((res) => {
        const tokens = res.data.data as AuthTokens
        saveTokens(tokens)
        return tokens
      })
      .finally(() => {
        refreshPromise = null
      })
  }
  return refreshPromise
}

const handleError = async (error: AxiosError) => {
  const original = error.config as InternalAxiosRequestConfig
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

export default api as unknown as UnwrappedApi
