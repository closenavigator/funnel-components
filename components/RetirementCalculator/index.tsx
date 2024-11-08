"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RetirementInputs, RetirementResults } from '@/types/retirement'
import { StepOne } from './StepOne'
import { StepTwo } from './StepTwo'
import { Results } from './Results'
import { calculateRetirement } from '@/lib/calculations'

export default function RetirementCalculator() {
  const [step, setStep] = useState(1)
  const [inputs, setInputs] = useState<RetirementInputs>({
    age: 30,
    monthlyContribution: 5000,
    currentSavings: 0
  })
  const [results, setResults] = useState<RetirementResults | null>(null)

  const handleNext = () => {
    if (step === 2) {
      const calculatedResults = calculateRetirement(inputs)
      setResults(calculatedResults)
    }
    setStep(prev => Math.min(3, prev + 1))
  }

  const handleBack = () => {
    setStep(prev => Math.max(1, prev - 1))
  }

  const updateInputs = (newInputs: Partial<RetirementInputs>) => {
    setInputs(prev => ({ ...prev, ...newInputs }))
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Calculadora de Retiro
        </CardTitle>
        <CardDescription className="text-center">
          {step === 1 && "Paso 1: Información Personal"}
          {step === 2 && "Paso 2: Aportaciones"}
          {step === 3 && "Resultados"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {step === 1 && (
          <StepOne 
            age={inputs.age}
            onUpdate={updateInputs}
            onNext={handleNext}
          />
        )}
        
        {step === 2 && (
          <StepTwo
            monthlyContribution={inputs.monthlyContribution}
            currentSavings={inputs.currentSavings}
            onUpdate={updateInputs}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        
        {step === 3 && results && (
          <Results
            results={results}
            inputs={inputs}
            onBack={handleBack}
          />
        )}
      </CardContent>
    </Card>
  )
} 