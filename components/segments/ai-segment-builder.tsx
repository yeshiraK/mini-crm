'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Sparkles } from 'lucide-react'

const examplePrompts = [
  'Customers from Chennai who spent over ₹15,000',
  'VIP customers who haven\'t purchased in 45 days',
  'New customers with more than 3 orders this month',
  'High spenders from Bengaluru or Hyderabad',
  'At-risk customers who opened last email but didn\'t buy',
]

export function AISegmentBuilder() {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedRules, setGeneratedRules] = useState<
    { attribute: string; operator: string; value: string }[]
  >([])

  const handleGenerateFilters = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    // Simulate AI processing
    setTimeout(() => {
      // Mock generated rules based on prompt
      setGeneratedRules([
        { attribute: 'City', operator: 'is equal to', value: 'Chennai' },
        { attribute: 'Total Spend', operator: 'is greater than', value: '15000' },
      ])
      setIsGenerating(false)
    }, 1500)
  }

  const handleExampleClick = (example: string) => {
    setPrompt(example)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-foreground">AI Segment Builder</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Describe your target audience in plain English and the AI will create the filter rules
          for you.
        </p>
      </div>

      {/* Examples */}
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-3">Example prompts:</p>
        <div className="flex flex-wrap gap-2">
          {examplePrompts.map((example, idx) => (
            <Badge
              key={idx}
              variant="outline"
              className="cursor-pointer hover:bg-secondary/50 transition-colors border-accent text-accent hover:text-accent"
              onClick={() => handleExampleClick(example)}
            >
              {example}
            </Badge>
          ))}
        </div>
      </div>

      {/* Prompt Input */}
      <div>
        <label className="text-sm font-medium text-foreground block mb-2">
          Describe your segment
        </label>
        <Textarea
          placeholder="E.g., Show me customers from Mumbai who spent more than 50,000 rupees and made at least 5 purchases..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="bg-input border-border text-foreground placeholder:text-muted-foreground"
          rows={4}
        />
      </div>

      {/* Generate Button */}
      <Button
        onClick={handleGenerateFilters}
        disabled={!prompt.trim() || isGenerating}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        <Sparkles className={`h-4 w-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
        {isGenerating ? 'Generating...' : 'Generate Filters'}
      </Button>

      {/* Generated Rules */}
      {generatedRules.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-border">
          <div>
            <h4 className="font-semibold text-foreground mb-3">Generated Rules</h4>
            <div className="space-y-3 bg-secondary/30 rounded-md p-4">
              {generatedRules.map((rule, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-secondary/50 rounded-md"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">{rule.attribute}</p>
                    <p className="text-xs text-muted-foreground">
                      {rule.operator} {rule.value}
                    </p>
                  </div>
                  <Badge className="bg-primary/20 text-primary border-0">Match</Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              Edit Rules
            </Button>
            <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
              Save Segment
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
