"use client"

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label as UILabel } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons"

interface Person {
  name: string
  startAge: number
  color: string
  avatar: string
}

interface SavingsData {
  age: number
  [key: string]: number
}

const calculateSavingsOverTime = (monthlyContribution: number, startAge: number, years: number): SavingsData[] => {
  let total = 0
  let annualContribution = monthlyContribution * 12
  const data: SavingsData[] = []
  for (let i = 0; i <= years; i++) {
    data.push({
      age: startAge + i,
      total: Math.round(total)
    })
    if (startAge + i < 65) { // Retirement at 65
      total = (total + annualContribution) * 1.12 // 12% annual growth
      annualContribution *= 1.04 // 4% annual increase
    } else {
      total *= 1.05 // 5% growth during retirement
    }
  }
  return data
}

const formatCurrency = (value: number): string => 
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(value)

const AnimatedAvatar: React.FC<{ person: Person; isSelected: boolean; onClick: () => void }> = ({ person, isSelected, onClick }) => (
  <motion.div
    className={`rounded-full w-16 h-16 flex items-center justify-center text-3xl cursor-pointer ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
    style={{ background: person.color }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    {person.avatar}
  </motion.div>
)

interface TooltipPayload {
  color: string;
  name: string;
  value: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold text-gray-800 mb-2">Edad: {label}</p>
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center mb-1">
            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></div>
            <p className="text-sm text-gray-600">
              <span className="font-medium">{entry.name}:</span>{' '}
              <span className="text-gray-900">{formatCurrency(entry.value)}</span>
            </p>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function RetirementSavingsVisualization() {
  const [monthlyContribution, setMonthlyContribution] = useState(5000)
  const [viewerAge, setViewerAge] = useState(30)
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)

  const people = useMemo(() => [
    { name: 'María', startAge: 25, color: '#3b82f6', avatar: '👩' },
    { name: 'Juan', startAge: 35, color: '#ef4444', avatar: '👨' },
    { name: 'Ana', startAge: 45, color: '#10b981', avatar: '👩‍🦰' }
  ], [])

  const retirementData = useMemo(() => {
    const maxYears = Math.max(...people.map(p => 65 - p.startAge))
    const data: SavingsData[] = []
    
    for (let year = 0; year <= maxYears; year++) {
      const dataPoint: SavingsData = { age: viewerAge + year }
      
      people.forEach(person => {
        if (viewerAge + year >= person.startAge) {
          const personYears = viewerAge + year - person.startAge
          const personData = calculateSavingsOverTime(monthlyContribution, person.startAge, personYears)
          dataPoint[person.name] = personData[personData.length - 1]?.total || 0
        } else {
          dataPoint[person.name] = 0
        }
      })
      
      data.push(dataPoint)
    }
    
    return data
  }, [monthlyContribution, viewerAge, people])

  const adjustMonthlyContribution = (amount: number) => {
    setMonthlyContribution(prev => Math.max(1000, Math.min(20000, prev + amount)))
  }

  const handleMonthlyContributionChange = (value: string) => {
    const num = parseInt(value)
    if (!isNaN(num)) {
      setMonthlyContribution(Math.max(1000, Math.min(20000, num)))
    }
  }

  const adjustViewerAge = (amount: number) => {
    setViewerAge(prev => Math.max(20, Math.min(65, prev + amount)))
  }

  const handleViewerAgeChange = (value: string) => {
    const num = parseInt(value)
    if (!isNaN(num)) {
      setViewerAge(Math.max(20, Math.min(65, num)))
    }
  }

  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader>
        <CardTitle>Calculadora de Retiro</CardTitle>
        <CardDescription>
          Visualiza el impacto del tiempo en tus ahorros para el retiro
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-8 h-[400px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200 shadow-inner">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart 
              data={retirementData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="age" 
                type="number" 
                domain={[20, 'dataMax']} 
                tickCount={10}
                stroke="#6b7280"
              >
                <Label value="Edad" offset={-10} position="insideBottom" fill="#4b5563" />
              </XAxis>
              <YAxis 
                tickFormatter={(value) => `${value / 1000000}M`}
                stroke="#6b7280"
              >
                <Label value="Ahorros Totales (MXN)" angle={-90} position="insideLeft" offset={0} fill="#4b5563" />
              </YAxis>
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} />
              {people.map((person, index) => (
                <Area
                  key={person.name}
                  type="monotone"
                  dataKey={person.name}
                  name={`${person.name} (inicio: ${person.startAge} años)`}
                  stroke={person.color}
                  fill={person.color}
                  fillOpacity={0.6}
                  strokeWidth={2}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-around mb-8">
          {people.map((person) => (
            <div key={person.name} className="flex flex-col items-center">
              <AnimatedAvatar 
                person={person} 
                isSelected={selectedPerson === person}
                onClick={() => setSelectedPerson(person)}
              />
              <p className="mt-2 font-medium text-gray-900">{person.name}</p>
              <p className="text-sm text-gray-500">Inicio: {person.startAge} años</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <UILabel htmlFor="monthly-contribution" className="text-lg font-semibold text-gray-700">
              Tu Aportación Mensual
            </UILabel>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => adjustMonthlyContribution(-100)}
              >
                <MinusIcon className="h-4 w-4" />
              </Button>
              <Input
                id="monthly-contribution"
                type="number"
                value={monthlyContribution}
                onChange={(e) => handleMonthlyContributionChange(e.target.value)}
                className="text-center text-lg font-medium"
              />
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => adjustMonthlyContribution(100)}
              >
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>
            <Slider
              value={[monthlyContribution]}
              min={1000}
              max={20000}
              step={100}
              onValueChange={(value) => setMonthlyContribution(value[0])}
              className="mt-2"
            />
            <p className="text-sm text-gray-500 text-center">
              Ajusta tu aportación mensual entre $1,000 y $20,000
            </p>
          </div>
          <div className="space-y-4">
            <UILabel htmlFor="viewer-age" className="text-lg font-semibold text-gray-700">
              Tu Edad Actual
            </UILabel>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => adjustViewerAge(-1)}
              >
                <MinusIcon className="h-4 w-4" />
              </Button>
              <Input
                id="viewer-age"
                type="number"
                value={viewerAge}
                onChange={(e) => handleViewerAgeChange(e.target.value)}
                className="text-center text-lg font-medium"
              />
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => adjustViewerAge(1)}
              >
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>
            <Slider
              value={[viewerAge]}
              min={20}
              max={65}
              onValueChange={(value) => setViewerAge(value[0])}
              className="mt-2"
            />
            <p className="text-sm text-gray-500 text-center">
              Selecciona tu edad actual entre 20 y 65 años
            </p>
          </div>
        </div>
        <AnimatePresence mode="wait">
          {selectedPerson && (
            <motion.div 
              key={selectedPerson.name}
              className="bg-gray-50 rounded-lg p-6 border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-bold text-xl mb-4 text-gray-900">
                Impacto del Tiempo:
              </h3>
              <p className="text-gray-700">
                Si {selectedPerson.name} empieza a ahorrar a los {selectedPerson.startAge} años con una aportación mensual de {formatCurrency(monthlyContribution)}, 
                a los 65 años podría acumular{' '}
                <span className="font-semibold text-gray-900">
                  {formatCurrency(retirementData[retirementData.length - 1]?.[selectedPerson.name] || 0)}
                </span>.
              </p>
              <p className="mt-4 text-gray-700">
                Observa cómo María, que empezó a los 25 años, acumula significativamente más. La lección es clara: 
                <span className="font-semibold text-gray-900"> cuanto antes empieces y más consistente seas, más fácil será alcanzar tus metas financieras</span>.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}