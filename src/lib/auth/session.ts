import type { AuthTokens, LoginResponse, Profile } from '@/types/auth'

const ACCESS_KEY = 'tiktak_admin_access_token'
const REFRESH_KEY = 'tiktak_admin_refresh_token'
const PROFILE_KEY = 'tiktak_admin_profile'

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_KEY)
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_KEY)
}

export function getStoredProfile(): Profile | null {
  const raw = localStorage.getItem(PROFILE_KEY)
  return raw ? (JSON.parse(raw) as Profile) : null
}

export function saveSession({ tokens, profile }: LoginResponse): void {
  localStorage.setItem(ACCESS_KEY, tokens.access_token)
  localStorage.setItem(REFRESH_KEY, tokens.refresh_token)
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
}

export function saveTokens(tokens: AuthTokens): void {
  localStorage.setItem(ACCESS_KEY, tokens.access_token)
  localStorage.setItem(REFRESH_KEY, tokens.refresh_token)
}

export function clearSession(): void {
  localStorage.removeItem(ACCESS_KEY)
  localStorage.removeItem(REFRESH_KEY)
  localStorage.removeItem(PROFILE_KEY)
}
