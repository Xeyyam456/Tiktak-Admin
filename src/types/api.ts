import 'axios'
import type { AxiosRequestConfig } from 'axios'

// `original.skipAuthRetry`/`original._retry` in axiosInstance.ts's handleError
// aren't real Axios fields — augment once here, reused by every service call.
declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAuthRetry?: boolean
    _retry?: boolean
  }
}

export interface ApiEnvelope<T> {
  message: string
  data: T
  result: boolean
}

// axiosInstance's response interceptor (`handleSuccess`) unwraps the `{data}`
// envelope for every call, so the exported `api` is retyped to this shape
// instead of the real AxiosInstance — see axiosInstance.ts for the single
// `as unknown as UnwrappedApi` cast that bridges the two.
export interface UnwrappedApi {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>
  post<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T>
  put<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T>
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>
}
