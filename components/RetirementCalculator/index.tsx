"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RetirementInputs, RetirementResults } from '@/types/retirement'
import { StepOne } from './StepOne'
import { StepTwo } from './StepTwo'
import { Results } from './Results'
import { calculateRetirement } from '@/lib/calculations'
import { motion, AnimatePresence } from 'framer-motion'

export function RetirementCalculator() {
  const [step, setStep] = useState(1)
  const [inputs, setInputs] = useState<RetirementInputs>({
    age: 30,
    monthlyContribution: 5000,
    currentSavings: 0,
  })
  const [results, setResults] = useState<RetirementResults | null>(null)

  const handleCalculate = () => {
    const calculatedResults = calculateRetirement(inputs)
    setResults(calculatedResults)
    setStep(3)
  }

  return (
    <Card className="w-full max-w-lg mx-auto bg-white/50 backdrop-blur-sm shadow-xl border-muted">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">
          Calculadora de Retiro
        </CardTitle>
        <CardDescription className="text-base">
          Planifica tu futuro financiero de manera inteligente
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <StepOne
                age={inputs.age}
                onUpdate={(values) => setInputs(prev => ({ ...prev, ...values }))}
                onNext={() => setStep(2)}
              />
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <StepTwo
                monthlyContribution={inputs.monthlyContribution}
                currentSavings={inputs.currentSavings}
                desiredMonthlyIncome={inputs.desiredMonthlyIncome}
                onUpdate={(values) => setInputs(prev => ({ ...prev, ...values }))}
                onNext={handleCalculate}
                onBack={() => setStep(1)}
              />
            </motion.div>
          )}
          {step === 3 && results && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Results
                results={results}
                inputs={inputs}
                onBack={() => setStep(2)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
} 