'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useStore } from '@/lib/store'
import { createCampaign } from '@/lib/api'
import { Campaign } from '@/lib/types'

interface NewCampaignDrawerProps {
  onClose: () => void
  onCampaignCreated: (campaign: Campaign) => void
}

export function NewCampaignDrawer({ onClose, onCampaignCreated }: NewCampaignDrawerProps) {
  const { addToast } = useStore()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    channel: 'email',
    audience: 'all',
    message: '',
    schedule: 'immediate',
    scheduledTime: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNextStep = () => {
    if (step < 5) setStep(step + 1)
  }

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleCreateCampaign = async () => {
    if (!formData.name || !formData.description || !formData.message) {
      addToast({
        message: 'Please fill in all required fields',
        type: 'error',
        duration: 3000,
      })
      return
    }

    try {
      const newCampaign = await createCampaign({
        name: formData.name,
        description: formData.description,
        status: formData.schedule === 'immediate' ? 'active' : 'scheduled',
        channel: formData.channel as 'email' | 'whatsapp' | 'sms' | 'rcs',
        sentAt: formData.schedule === 'immediate' ? new Date().toISOString().split('T')[0] : formData.scheduledTime,
      })

      addToast({
        message: `Campaign "${formData.name}" created successfully!`,
        type: 'success',
        duration: 3000,
      })

      onCampaignCreated(newCampaign)
      onClose()
    } catch (error) {
      addToast({
        message: 'Failed to create campaign',
        type: 'error',
        duration: 3000,
      })
    }
  }

  const CHANNEL_OPTIONS = [
    { id: 'email', label: 'Email', icon: '📧' },
    { id: 'whatsapp', label: 'WhatsApp', icon: '💬' },
    { id: 'sms', label: 'SMS', icon: '📱' },
    { id: 'rcs', label: 'RCS', icon: '📲' },
  ]

  const STEPS = [
    { number: 1, label: 'Details' },
    { number: 2, label: 'Audience' },
    { number: 3, label: 'Message' },
    { number: 4, label: 'Schedule' },
    { number: 5, label: 'Review' },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 z-50 animate-in fade-in">
      <div className="animate-in slide-in-from-right fixed right-0 top-0 h-full w-full md:w-2/5 bg-card border-l border-border flex flex-col">
        {/* Header */}
        <div className="border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">New Campaign</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-secondary rounded transition-colors"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Stepper */}
        <div className="border-b border-border px-6 py-4">
          <div className="flex justify-between items-center gap-2">
            {STEPS.map((s, idx) => (
              <div key={s.number} className="flex items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    step >= s.number
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  {s.number}
                </div>
                {idx < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-1 rounded transition-colors ${
                      step > s.number ? 'bg-primary' : 'bg-secondary'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Step {step}: {STEPS[step - 1].label}
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 space-y-4">
          {/* Step 1: Details */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Campaign Name</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Summer Flash Sale"
                  className="bg-secondary border-border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Campaign details and objectives"
                  className="bg-secondary border-border min-h-24"
                />
              </div>
            </div>
          )}

          {/* Step 2: Channel */}
          {step === 2 && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-foreground mb-4">Select Channel</label>
              <div className="space-y-3">
                {CHANNEL_OPTIONS.map((ch) => (
                  <div
                    key={ch.id}
                    onClick={() => setFormData(prev => ({ ...prev, channel: ch.id }))}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.channel === ch.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-secondary hover:border-accent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{ch.icon}</span>
                      <span className="text-foreground font-medium">{ch.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Audience */}
          {step === 3 && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-foreground mb-4">Select Audience</label>
              <div className="space-y-3">
                {[
                  { id: 'all', label: 'All Customers', count: '15,240' },
                  { id: 'active', label: 'Active Users', count: '8,320' },
                  { id: 'vip', label: 'VIP Members', count: '1,450' },
                  { id: 'segment', label: 'Custom Segment', count: '3,800' },
                ].map((aud) => (
                  <div
                    key={aud.id}
                    onClick={() => setFormData(prev => ({ ...prev, audience: aud.id }))}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all flex justify-between items-center ${
                      formData.audience === aud.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-secondary hover:border-accent'
                    }`}
                  >
                    <span className="text-foreground font-medium">{aud.label}</span>
                    <span className="text-xs text-muted-foreground">{aud.count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Message */}
          {step === 4 && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-foreground mb-2">Message Content</label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder={`Write your ${formData.channel} message here...`}
                className="bg-secondary border-border min-h-32"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Character count: {formData.message.length}</span>
                <span>Remaining: {formData.channel === 'sms' ? Math.max(0, 160 - formData.message.length) : 'Unlimited'}</span>
              </div>
            </div>
          )}

          {/* Step 5: Schedule */}
          {step === 5 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">When to send?</label>
                <div className="space-y-2">
                  {[
                    { id: 'immediate', label: 'Send immediately' },
                    { id: 'scheduled', label: 'Schedule for later' },
                  ].map((opt) => (
                    <label key={opt.id} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="schedule"
                        value={opt.id}
                        checked={formData.schedule === opt.id}
                        onChange={handleInputChange}
                        className="w-4 h-4"
                      />
                      <span className="text-foreground">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              {formData.schedule === 'scheduled' && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Scheduled Time</label>
                  <Input
                    type="datetime-local"
                    name="scheduledTime"
                    value={formData.scheduledTime}
                    onChange={handleInputChange}
                    className="bg-secondary border-border"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border p-6 flex gap-3">
          <Button
            variant="outline"
            onClick={handlePrevStep}
            disabled={step === 1}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            onClick={step === 5 ? handleCreateCampaign : handleNextStep}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {step === 5 ? 'Create Campaign' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  )
}
