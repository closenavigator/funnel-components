"use client"

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserInputs } from './UserInputs'
import { ProfileComparison } from './ProfileComparison'
import { SavingsChart } from './SavingsChart'
import { ImpactAnalysis } from './ImpactAnalysis'
import { calculateSavingsOverTime } from '@/lib/calculations'
import { Person, SavingsData } from '@/types/retirement'

export default function RetirementSavingsVisualization() {
  const [monthlyContribution, setMonthlyContribution] = useState(5000)
  const [viewerAge, setViewerAge] = useState(30)
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)

  const people: Person[] = useMemo(() => [
    { name: "Tú", startAge: viewerAge, color: "#4F46E5", avatar: "👤" },
    { name: "María", startAge: 25, color: "#EC4899", avatar: "👩" },
    { name: "Carlos", startAge: 35, color: "#10B981", avatar: "👨" },
    { name: "Ana", startAge: 45, color: "#F59E0B", avatar: "👩‍🦰" }
  ], [viewerAge])

  const retirementData = useMemo(() => {
    const maxAge = 90
    const data: SavingsData[] = []
    const uniqueAges = new Set(people.map(p => p.startAge))
    
    uniqueAges.forEach(startAge => {
      const personData = calculateSavingsOverTime(monthlyContribution, startAge, maxAge - startAge)
      personData.forEach((d, i) => {
        const age = startAge + i
        if (!data[i]) {
          data[i] = { age }
        }
        const relevantPeople = people.filter(p => p.startAge === startAge)
        relevantPeople.forEach(person => {
          data[i][person.name] = d.total
        })
      })
    })
    
    return data
  }, [people, monthlyContribution])

  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader className="space-y-2 px-4 md:px-6">
        <CardTitle className="text-2xl md:text-3xl text-center">Calculadora de Retiro</CardTitle>
        <CardDescription className="text-center">
          Visualiza el impacto del tiempo en tus ahorros para el retiro
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 px-4 md:px-6">
        <UserInputs
          monthlyContribution={monthlyContribution}
          setMonthlyContribution={setMonthlyContribution}
          viewerAge={viewerAge}
          setViewerAge={setViewerAge}
        />
        
        <ProfileComparison
          people={people}
          selectedPerson={selectedPerson}
          setSelectedPerson={setSelectedPerson}
        />
        
        <SavingsChart
          data={retirementData}
          people={people}
          selectedPerson={selectedPerson}
        />
        
        {selectedPerson && (
          <ImpactAnalysis
            person={selectedPerson}
            monthlyContribution={monthlyContribution}
            retirementData={retirementData}
          />
        )}
      </CardContent>
    </Card>
  )
} 