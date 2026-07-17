import { create } from 'zustand'
import { loginAdmin } from '@/services/authService'
import { getAccessToken, getStoredProfile, saveSession, clearSession } from '@/lib/auth/session'
import type { Profile } from '@/types/auth'

interface AuthState {
  profile: Profile | null
  isAuthenticated: boolean
  login: (phone: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  profile: getStoredProfile(),
  isAuthenticated: !!getAccessToken(),

  login: async (phone, password) => {
    const data = await loginAdmin({ phone, password })
    saveSession(data)
    set({ profile: data.profile, isAuthenticated: true })
  },

  logout: () => {
    clearSession()
    set({ profile: null, isAuthenticated: false })
  },
}))

// Başqa tab-da login/logout olanda (localStorage dəyişəndə) bu tab-ı da sinxronlaşdırır —
// "storage" event yalnız DİGƏR tab-larda atılır, dəyişikliyi edən tab-ın özündə yox
window.addEventListener('storage', () => {
  useAuthStore.setState({
    isAuthenticated: !!getAccessToken(),
    profile: getStoredProfile(),
  })
})
