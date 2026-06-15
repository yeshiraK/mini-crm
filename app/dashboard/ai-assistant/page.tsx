'use client'

import { ChatPanel } from '@/components/ai-assistant/chat-panel'
import { ContextPanel } from '@/components/ai-assistant/context-panel'

export default function AIAssistantPage() {
  return (
    <div className="flex h-[calc(100vh-140px)] gap-6">
      {/* Chat Panel - 60% */}
      <div className="flex-1 min-w-0">
        <ChatPanel />
      </div>

      {/* Context Panel - 40% */}
      <div className="w-[40%] hidden lg:block">
        <ContextPanel />
      </div>
    </div>
  )
}
