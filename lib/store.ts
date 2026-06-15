import { create } from 'zustand'
import { Toast, User } from './types'

interface StoreState {
  // User session
  currentUser: User | null
  setCurrentUser: (user: User | null) => void

  // Date range
  dateRange: '7d' | '30d' | '1y' | 'today' | 'custom'
  customStart: Date | null
  customEnd: Date | null
  setDateRange: (range: '7d' | '30d' | '1y' | 'today' | 'custom', customStart?: Date, customEnd?: Date) => void

  // Toasts
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void

  // UI state
  selectedCampaignId: string | null
  setSelectedCampaignId: (id: string | null) => void
}

export const useStore = create<StoreState>((set) => ({
  currentUser: {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
  },
  setCurrentUser: (user) => set({ currentUser: user }),

  dateRange: '7d',
  customStart: null,
  customEnd: null,
  setDateRange: (range, customStart, customEnd) => set({ dateRange: range, customStart: customStart || null, customEnd: customEnd || null }),

  toasts: [],
  addToast: (toast) => {
    const id = Math.random().toString(36).substr(2, 9)
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }))
    
    // Auto-remove after duration
    if (toast.duration !== 0) {
      setTimeout(() => {
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
      }, toast.duration || 3000)
    }
  },
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),

  selectedCampaignId: null,
  setSelectedCampaignId: (id) => set({ selectedCampaignId: id }),
}))
