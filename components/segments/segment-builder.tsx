'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { ManualSegmentBuilder } from './manual-segment-builder'
import { AISegmentBuilder } from './ai-segment-builder'

export function SegmentBuilder() {
  const [activeTab, setActiveTab] = useState('manual')

  return (
    <Card className="bg-card border-border p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6">Build New Segment</h2>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-secondary grid w-full grid-cols-2">
          <TabsTrigger value="manual">Manual Builder</TabsTrigger>
          <TabsTrigger value="ai">AI Builder</TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="mt-6">
          <ManualSegmentBuilder />
        </TabsContent>

        <TabsContent value="ai" className="mt-6">
          <AISegmentBuilder />
        </TabsContent>
      </Tabs>
    </Card>
  )
}
