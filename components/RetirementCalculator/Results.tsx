import { Button } from "@/components/ui/button"
import { RetirementInputs, RetirementResults } from "@/types/retirement"
import { formatCurrency } from "@/lib/format"
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ArrowLeft, TrendingUp, Wallet, Clock } from 'lucide-react'
import { useMemo } from 'react'

interface ResultsProps {
  results: RetirementResults
  inputs: RetirementInputs
  onBack: () => void
}

interface ChartDataPoint {
  age: number
  savings: number
}

interface TooltipPayload {
  value: number
  payload: ChartDataPoint
  dataKey: string
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayload[]
  label?: string
}

export function Results({ results, inputs, onBack }: ResultsProps) {
  const chartData = useMemo(() => {
    const years = 65 - inputs.age
    const data: ChartDataPoint[] = []
    let currentSavings = inputs.currentSavings
    const monthlyAmount = results.requiredMonthlyContribution || inputs.monthlyContribution
    
    for (let i = 0; i <= years; i++) {
      const age = inputs.age + i
      currentSavings = i === 0 ? inputs.currentSavings : 
        currentSavings * 1.08 + (monthlyAmount * 12)
      
      data.push({
        age,
        savings: Math.round(currentSavings)
      })
    }
    return data
  }, [inputs, results])

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length > 0 && payload[0].value !== undefined) {
      return (
        <div className="bg-background/95 backdrop-blur-sm p-3 rounded-lg shadow-lg border">
          <p className="font-medium">Edad: {label} años</p>
          <p className="text-primary">{formatCurrency(payload[0].value)}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <p className="text-sm font-medium text-primary">Total al retirarte</p>
          </div>
          <p className="text-2xl font-bold">{formatCurrency(results.totalAtRetirement)}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <Wallet className="w-5 h-5 text-primary" />
            <p className="text-sm font-medium text-primary">Ingreso mensual</p>
          </div>
          <p className="text-2xl font-bold">{formatCurrency(results.monthlyRetirementIncome)}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-primary" />
            <p className="text-sm font-medium text-primary">Años cubiertos</p>
          </div>
          <p className="text-2xl font-bold">{results.yearsOfRetirement}</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="aspect-[16/9] w-full bg-gradient-to-br from-background to-muted rounded-xl p-4"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="age"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${value}y`}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
            />
            <Tooltip content={CustomTooltip} />
            <Line
              type="monotone"
              dataKey="savings"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-lg bg-muted/50 p-4 text-sm"
      >
        <h4 className="font-medium mb-2">Resumen de tu plan</h4>
        <p className="text-muted-foreground">
          {results.requiredMonthlyContribution ? (
            <>
              Para alcanzar un ingreso mensual de {formatCurrency(inputs.desiredMonthlyIncome || 0)} al retirarte,
              necesitas ahorrar {formatCurrency(results.requiredMonthlyContribution)} mensuales
              desde los {inputs.age} años.
            </>
          ) : (
            <>
              Ahorrando {formatCurrency(inputs.monthlyContribution)} mensuales desde los {inputs.age} años,
              podrás mantener un ingreso mensual de {formatCurrency(results.monthlyRetirementIncome)} durante
              {' '}{results.yearsOfRetirement} años después de tu retiro.
            </>
          )}
        </p>
      </motion.div>

      <Button
        variant="outline"
        onClick={onBack}
        className="w-full"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Ajustar cálculos
      </Button>
    </div>
  )
} 