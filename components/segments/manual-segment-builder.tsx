'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { X, Plus } from 'lucide-react'

interface Rule {
  id: string
  attribute: string
  operator: string
  value: string
}

const attributes = [
  'Total Spend',
  'Last Purchase Date',
  'City',
  'Tag',
  'Number of Orders',
  'Channel Preference',
]

const operators = [
  'is greater than',
  'is less than',
  'is equal to',
  'contains',
  'is before',
  'is after',
]

export function ManualSegmentBuilder() {
  const [segmentName, setSegmentName] = useState('')
  const [description, setDescription] = useState('')
  const [matchType, setMatchType] = useState('all')
  const [rules, setRules] = useState<Rule[]>([
    { id: '1', attribute: 'Total Spend', operator: 'is greater than', value: '' },
  ])

  const addRule = () => {
    const newId = Math.random().toString()
    setRules([
      ...rules,
      { id: newId, attribute: attributes[0], operator: operators[0], value: '' },
    ])
  }

  const removeRule = (id: string) => {
    setRules(rules.filter((r) => r.id !== id))
  }

  const updateRule = (id: string, field: keyof Rule, value: string) => {
    setRules(
      rules.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    )
  }

  return (
    <div className="space-y-6">
      {/* Name & Description */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="segment-name" className="text-foreground">
            Segment Name
          </Label>
          <Input
            id="segment-name"
            placeholder="e.g., High-Value Customers"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
            className="mt-2 bg-input border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div>
          <Label htmlFor="segment-desc" className="text-foreground">
            Description
          </Label>
          <Textarea
            id="segment-desc"
            placeholder="Describe your segment..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 bg-input border-border text-foreground placeholder:text-muted-foreground"
            rows={3}
          />
        </div>
      </div>

      {/* Rules */}
      <div className="space-y-4">
        <div>
          <Label className="text-foreground">Match Rules</Label>
          <div className="mt-3 flex items-center gap-2 mb-4">
            <span className="text-sm text-muted-foreground">Match</span>
            <Select value={matchType} onValueChange={setMatchType}>
              <SelectTrigger className="w-32 bg-input border-border text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="all">ALL</SelectItem>
                <SelectItem value="any">ANY</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">of the following rules</span>
          </div>
        </div>

        {/* Rule Rows */}
        <div className="space-y-3">
          {rules.map((rule, idx) => (
            <div key={rule.id} className="flex gap-2 items-end">
              <div className="flex-1">
                <Label className="text-xs text-muted-foreground block mb-1">Attribute</Label>
                <Select value={rule.attribute} onValueChange={(v) => updateRule(rule.id, 'attribute', v)}>
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {attributes.map((attr) => (
                      <SelectItem key={attr} value={attr}>
                        {attr}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <Label className="text-xs text-muted-foreground block mb-1">Operator</Label>
                <Select value={rule.operator} onValueChange={(v) => updateRule(rule.id, 'operator', v)}>
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {operators.map((op) => (
                      <SelectItem key={op} value={op}>
                        {op}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <Label className="text-xs text-muted-foreground block mb-1">Value</Label>
                <Input
                  placeholder="Value..."
                  value={rule.value}
                  onChange={(e) => updateRule(rule.id, 'value', e.target.value)}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {rules.length > 1 && (
                <button
                  onClick={() => removeRule(rule.id)}
                  className="text-muted-foreground hover:text-destructive p-2"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={addRule}
          className="text-accent border-accent hover:bg-accent/10"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Rule
        </Button>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4 border-t border-border">
        <Button variant="outline" className="flex-1">
          Preview Count
        </Button>
        <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
          Save Segment
        </Button>
      </div>
    </div>
  )
}
