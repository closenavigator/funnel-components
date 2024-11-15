"use client"

import RetirementCalculatorV3 from '@/components/RetirementCalculatorV3'

export default function RetirementCalculatorPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-b from-background to-muted">
      <div className="w-full max-w-2xl">
        <RetirementCalculatorV3 />
      </div>
    </main>
  )
} 