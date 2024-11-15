"use client"

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserInputs } from './UserInputs'
import { ProfileComparison } from './ProfileComparison'
import { SavingsChart } from './SavingsChart'
import { ImpactAnalysis } from './ImpactAnalysis'
import { calculateSavingsOverTime } from '@/lib/calculations'
import { Person, RetirementData, SavingsDataPoint } from '@/types/retirement'

const RetirementSavingsVisualization = () => {
  const [monthlyContribution, setMonthlyContribution] = useState(5000)
  const [viewerAge, setViewerAge] = useState(30)
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)

  const people = [
    { name: "Tú", startAge: viewerAge, color: "#60A5FA", avatar: "👤" },
    { name: "Ana", startAge: 25, color: "#34D399", avatar: "👩" },
    { name: "Carlos", startAge: 35, color: "#F87171", avatar: "👨" }
  ]

  const retirementData = useMemo(() => {
    return people.map(person => {
      const savings = calculateSavingsOverTime(monthlyContribution, person.startAge, 40) as SavingsDataPoint[]
      return {
        ...person,
        savings
      }
    })
  }, [monthlyContribution, people]) as Person[]

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
            retirementData={retirementData.map(person => {
              const dataPoint = person.savings[0]
              return {
                age: dataPoint.age,
                total: dataPoint.total,
                monthlyIncome: dataPoint.total * 0.04 / 12,
                yearsSaving: 0,
                [person.name]: dataPoint.total
              } as RetirementData
            })}
          />
        )}
      </CardContent>
    </Card>
  )
}

export default RetirementSavingsVisualization 