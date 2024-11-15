"use client"

import React, { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Alert } from '@/components/ui/alert'
import { PiggyBank, Timer, DollarSign } from 'lucide-react'
import { calculateFuture } from '@/lib/calculations'

const RetirementCalculatorV3 = () => {
  const [age, setAge] = useState(30)
  const [monthlySavings, setMonthlySavings] = useState(1000)
  
  const startNowData = calculateFuture(age, monthlySavings)
  const wait5YearsData = calculateFuture(age + 5, monthlySavings)
  
  const finalAmountNow = startNowData[startNowData.length - 1].total
  const finalAmountWait = wait5YearsData[wait5YearsData.length - 1].total
  const moneyLostByWaiting = finalAmountNow - finalAmountWait
  const extraWorkYears = Math.ceil(moneyLostByWaiting / (monthlySavings * 12 * 1.08))

  const formatMoney = (amount: number) => {
    return amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <div className="w-full mx-auto p-2 sm:p-4 space-y-4 sm:space-y-8 font-sans">
      {/* Header - Adjusted for mobile */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent px-2">
          Tu Futuro, Más Simple
        </h1>
        <p className="text-gray-600 text-base sm:text-lg px-4">
          Mira cómo pequeñas decisiones de hoy cambian tu mañana
        </p>
      </div>

      {/* Main Calculator Card - Mobile optimized */}
      <Card className="bg-white shadow-lg border-0">
        <CardContent className="p-4 sm:p-8 space-y-6 sm:space-y-8">
          {/* Controls - Adjusted spacing */}
          <div className="space-y-4 sm:space-y-6">
            {/* Age Control */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-base sm:text-lg font-medium flex items-center">
                  <Timer className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-500" />
                  Tu edad
                </label>
                <span className="text-xl sm:text-2xl font-bold text-blue-600">{age}</span>
              </div>
              <Slider
                value={[age]}
                min={20}
                max={50}
                step={1}
                onValueChange={(value) => setAge(value[0])}
                className="w-full touch-none"
              />
            </div>

            {/* Monthly Savings Control */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-base sm:text-lg font-medium flex items-center">
                  <PiggyBank className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-500" />
                  Ahorro mensual
                </label>
                <span className="text-xl sm:text-2xl font-bold text-green-600">
                  ${formatMoney(monthlySavings)}
                </span>
              </div>
              <Slider
                value={[monthlySavings]}
                min={1000}
                max={20000}
                step={500}
                onValueChange={(value) => setMonthlySavings(value[0])}
                className="w-full touch-none"
              />
            </div>
          </div>

          {/* Impact Visualization - Mobile optimized */}
          <div className="bg-gray-50 p-3 sm:p-6 rounded-xl space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl font-bold text-center">
              Si empiezas hoy vs. esperar 5 años
            </h2>
            
            {/* Comparison Cards - Stack on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <Card className="bg-blue-50 border-0">
                <CardContent className="p-3 sm:p-4 text-center">
                  <h3 className="font-medium text-blue-700 text-sm sm:text-base">Empezando Hoy</h3>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                    ${(finalAmountNow / 1000000).toFixed(1)}M
                  </p>
                  <p className="text-xs sm:text-sm text-blue-600">
                    ${formatMoney(finalAmountNow * 0.04 / 12)}/mes
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-red-50 border-0">
                <CardContent className="p-3 sm:p-4 text-center">
                  <h3 className="font-medium text-red-700 text-sm sm:text-base">Esperando 5 años</h3>
                  <p className="text-2xl sm:text-3xl font-bold text-red-600">
                    ${(finalAmountWait / 1000000).toFixed(1)}M
                  </p>
                  <p className="text-xs sm:text-sm text-red-600">
                    ${formatMoney(finalAmountWait * 0.04 / 12)}/mes
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Impact Message - Mobile optimized */}
            <Alert className="bg-yellow-50 border-yellow-100">
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-yellow-800">
                  El costo real de esperar 5 años:
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 flex-shrink-0" />
                    <p className="text-sm sm:text-base text-yellow-800">
                      ${formatMoney(moneyLostByWaiting * 0.04 / 12)} menos cada mes
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Timer className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 flex-shrink-0" />
                    <p className="text-sm sm:text-base text-yellow-800">
                      {extraWorkYears} años extra de trabajo
                    </p>
                  </div>
                </div>
              </div>
            </Alert>
          </div>

          {/* Growth Chart - Adjusted height for mobile */}
          <div className="h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart 
                data={startNowData}
                margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorNow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="age" 
                  tickFormatter={(value) => `${value}`}
                  tick={{ fontSize: 12 }}
                  tickMargin={8}
                />
                <YAxis 
                  tickFormatter={(value) => 
                    `${(value / 1000000).toFixed(1)}M`
                  }
                  tick={{ fontSize: 12 }}
                  width={45}
                />
                <Tooltip 
                  formatter={(value: number) => 
                    `$${(value / 1000000).toFixed(2)}M`
                  }
                  contentStyle={{
                    fontSize: '12px',
                    padding: '8px'
                  }}
                />
                <Area 
                  type="monotone"
                  dataKey="total"
                  stroke="#60a5fa"
                  fill="url(#colorNow)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Call to Action - Mobile optimized */}
          <div className="text-center space-y-3 sm:space-y-4">
            <button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:opacity-90 transition-opacity touch-manipulation">
              Empieza tu plan de retiro hoy
            </button>
            <p className="text-xs sm:text-sm text-gray-500">
              No dejes que el tiempo juegue en tu contra
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default RetirementCalculatorV3 