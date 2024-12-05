"use client"

import { BrandClipperCalculator } from '@/components/BrandClipperCalculator'

export default function ClipperCalculatorPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-b from-background to-muted">
      <div className="w-full max-w-4xl py-8">
        <BrandClipperCalculator />
      </div>
    </main>
  )
} 