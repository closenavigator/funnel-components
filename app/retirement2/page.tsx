"use client"

import { RetirementCalculator } from '@/components/RetirementCalculator'

export default function RetirementCalculatorPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-b from-background to-muted">
      <div className="w-full max-w-2xl">
        <RetirementCalculator />
      </div>
    </main>
  )
} 