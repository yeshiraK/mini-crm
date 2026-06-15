'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Mic } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChatMessage } from './chat-message'
import { TypingIndicator } from './typing-indicator'


interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
}

const INITIAL_MESSAGE = {
  id: '1',
  type: 'ai' as const,
  content: 'Hello! I&apos;m your AI marketing assistant. I can help you analyze campaign performance, create segments, optimize messaging, and get actionable insights. What would you like to know?',
  timestamp: new Date(),
}



export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')

    setIsLoading(true)

    // Call AI Agent API
    const chatHistory = [...messages, userMessage].map(m => ({
      role: m.type === 'ai' ? 'assistant' : 'user',
      content: m.content
    }))

    fetch('/api/agent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: chatHistory })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.error)
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: data.content,
          timestamp: new Date(),
        }
        setMessages(prev => [...prev, aiResponse])
      })
      .catch(err => {
        console.error(err)
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: err.message.includes('overloaded') || err.message.includes('demand')
            ? 'The AI is experiencing high demand right now. Please wait 10 seconds and try again.'
            : `Sorry, something went wrong: ${err.message || 'Unknown error'}`,
          timestamp: new Date(),
        }
        setMessages(prev => [...prev, errorMessage])
      })
      .finally(() => {
        setIsLoading(false)
      })
  }



  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border px-6 py-4">
        <h2 className="text-xl font-bold text-foreground">AI Marketing Assistant</h2>
        <p className="text-xs text-muted-foreground mt-1">Get insights and recommendations powered by AI</p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isLoading && <TypingIndicator />}



        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-6">
        <div className="flex gap-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
            placeholder="Ask me anything about your campaigns..."
            className="bg-secondary border-border flex-1"
            disabled={isLoading}
          />
          <Button
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim() || isLoading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-4"
          >
            <Send className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            className="px-4"
            disabled={isLoading}
          >
            <Mic className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
