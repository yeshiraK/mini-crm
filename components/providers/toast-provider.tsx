'use client'

import { useStore } from '@/lib/store'
import { X } from 'lucide-react'

export function ToastProvider() {
  const { toasts, removeToast } = useStore()

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium shadow-lg animate-in slide-in-from-right-full duration-200 ${
            toast.type === 'success'
              ? 'bg-success text-white'
              : toast.type === 'error'
                ? 'bg-destructive text-destructive-foreground'
                : toast.type === 'warning'
                  ? 'bg-warning text-black'
                  : 'bg-card text-foreground border border-border'
          }`}
        >
          <span>{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-2 opacity-70 hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
