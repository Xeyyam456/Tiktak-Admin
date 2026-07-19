import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export interface ApiResponse<T> {
  message: string
  data: T
  result: boolean
}

const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function setTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'az',
  },
})

axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

let refreshPromise: Promise<string> | null = null

async function refreshAccessToken() {
  const refreshToken = getRefreshToken()
  if (!refreshToken) {
    throw new Error('No refresh token available')
  }

  const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
    refresh_token: refreshToken,
  })

  setTokens(data.data.access_token, data.data.refresh_token)
  return data.data.access_token as string
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        refreshPromise ??= refreshAccessToken()
        const newAccessToken = await refreshPromise
        refreshPromise = null

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        refreshPromise = null
        clearTokens()
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

const httpClient = {
  get<T>(url: string, config?: AxiosRequestConfig) {
    return axiosInstance.get<T>(url, config).then((res) => res.data)
  },
  post<T, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig) {
    return axiosInstance.post<T>(url, body, config).then((res) => res.data)
  },
  put<T, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig) {
    return axiosInstance.put<T>(url, body, config).then((res) => res.data)
  },
  patch<T, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig) {
    return axiosInstance.patch<T>(url, body, config).then((res) => res.data)
  },
  delete<T>(url: string, config?: AxiosRequestConfig) {
    return axiosInstance.delete<T>(url, config).then((res) => res.data)
  },
}

export default httpClient
