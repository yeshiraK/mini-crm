'use client'

import { useState } from 'react'
import { SavedSegments } from '@/components/segments/saved-segments'
import { SegmentBuilder } from '@/components/segments/segment-builder'

export default function SegmentsPage() {
  return (
    <div className="p-6 space-y-6 overflow-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Audience Segments</h1>
        <p className="text-muted-foreground">Create targeted audience segments for your campaigns</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Saved Segments */}
        <div>
          <SavedSegments />
        </div>

        {/* Right: Builder */}
        <div className="lg:col-span-2">
          <SegmentBuilder />
        </div>
      </div>
    </div>
  )
}
