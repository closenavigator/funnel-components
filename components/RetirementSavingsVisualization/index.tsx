"use client"

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserInputs } from './UserInputs'
import { ProfileComparison } from './ProfileComparison'
import { SavingsChart } from './SavingsChart'
import { ImpactAnalysis } from './ImpactAnalysis'
import { calculateSavingsOverTime } from '@/lib/calculations'

// Define proper interfaces
interface RetirementData {
  age: number
  total: number
  monthlyIncome: number
  yearsSaving: number
  [key: string]: number // Allow for dynamic person-specific data
}

interface Person {
  name: string
  startAge: number
  color: string
  avatar: string
}

const RetirementSavingsVisualization = () => {
  const [monthlyContribution, setMonthlyContribution] = useState(5000)
  const [viewerAge, setViewerAge] = useState(30)
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)

  const retirementData = useMemo(() => {
    const people = [
      { name: "Tú", startAge: viewerAge, color: "#60A5FA", avatar: "👤" },
      { name: "Ana", startAge: 25, color: "#34D399", avatar: "👩" },
      { name: "Carlos", startAge: 35, color: "#F87171", avatar: "👨" }
    ]

    return people.map(person => {
      const savings = calculateSavingsOverTime(monthlyContribution, person.startAge, 40)
      return {
        ...person,
        savings
      }
    })
  }, [viewerAge, monthlyContribution])

  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader>
        <CardTitle>Calculadora de Retiro</CardTitle>
        <CardDescription>
          Visualiza el impacto del tiempo en tus ahorros para el retiro
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UserInputs
          monthlyContribution={monthlyContribution}
          setMonthlyContribution={setMonthlyContribution}
          viewerAge={viewerAge}
          setViewerAge={setViewerAge}
        />
        <ProfileComparison
          people={retirementData}
          selectedPerson={selectedPerson}
          setSelectedPerson={setSelectedPerson}
        />
        <SavingsChart
          data={retirementData}
          selectedPerson={selectedPerson}
        />
        {selectedPerson && (
          <ImpactAnalysis
            person={selectedPerson}
            monthlyContribution={monthlyContribution}
            retirementData={retirementData.map(person => ({
              age: person.savings[0].age,
              total: person.savings[0].total || 0,
              monthlyIncome: (person.savings[0].total || 0) * 0.04 / 12,
              yearsSaving: 0,
              [person.name]: person.savings[0].total || 0
            }))}
          />
        )}
      </CardContent>
    </Card>
  )
}

export default RetirementSavingsVisualization 