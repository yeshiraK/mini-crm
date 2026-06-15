'use client'

import { Sparkles } from 'lucide-react'

interface QuickActionChipProps {
  text: string
  onClick: () => void
}

export function QuickActionChip({ text, onClick }: QuickActionChipProps) {
  return (
    <button
      onClick={onClick}
      className="w-full p-3 bg-secondary border border-border rounded-lg hover:border-accent hover:bg-secondary/80 transition-all text-left group"
    >
      <div className="flex items-start gap-2">
        <Sparkles className="w-4 h-4 text-accent flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
        <p className="text-sm text-foreground group-hover:text-accent transition-colors">{text}</p>
      </div>
    </button>
  )
}
