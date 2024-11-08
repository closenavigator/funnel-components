import { Button } from "@/components/ui/button"
import { RetirementInputs, RetirementResults } from "@/types/retirement"
import { formatCurrency } from "@/lib/format"
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface ResultsProps {
  results: RetirementResults
  inputs: RetirementInputs
  onBack: () => void
}

export function Results({ results, inputs, onBack }: ResultsProps) {
  const chartData = [
    { age: inputs.age, savings: inputs.currentSavings },
    { age: 65, savings: results.totalAtRetirement }
  ]

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="grid gap-6 md:grid-cols-3">
        <motion.div 
          className="bg-primary/10 p-6 rounded-xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-sm font-medium text-primary">Total al retirarte</p>
          <p className="text-2xl font-bold mt-2">{formatCurrency(results.totalAtRetirement)}</p>
          <p className="text-sm text-muted-foreground mt-1">a los 65 años</p>
        </motion.div>

        <motion.div 
          className="bg-primary/10 p-6 rounded-xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm font-medium text-primary">Ingreso mensual estimado</p>
          <p className="text-2xl font-bold mt-2">{formatCurrency(results.monthlyRetirementIncome)}</p>
          <p className="text-sm text-muted-foreground mt-1">durante el retiro</p>
        </motion.div>

        <motion.div 
          className="bg-primary/10 p-6 rounded-xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-sm font-medium text-primary">Años de retiro cubiertos</p>
          <p className="text-2xl font-bold mt-2">{results.yearsOfRetirement}</p>
          <p className="text-sm text-muted-foreground mt-1">años de cobertura</p>
        </motion.div>
      </div>

      <motion.div 
        className="h-[300px] mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="age" 
              label={{ value: 'Edad', position: 'bottom' }} 
            />
            <YAxis 
              tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
              label={{ value: 'Ahorros (MXN)', angle: -90, position: 'insideLeft' }} 
            />
            <Tooltip 
              formatter={(value: number) => formatCurrency(value)}
              labelFormatter={(label) => `Edad: ${label} años`}
            />
            <Line 
              type="monotone" 
              dataKey="savings" 
              stroke="#2563eb" 
              strokeWidth={2}
              dot={{ fill: '#2563eb', r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="space-y-4 bg-muted p-6 rounded-lg">
        <h4 className="font-semibold text-lg">Resumen de tu plan</h4>
        <p className="text-muted-foreground">
          Con una aportación mensual de {formatCurrency(inputs.monthlyContribution)}{' '}
          iniciando a los {inputs.age} años, y ahorros actuales de {formatCurrency(inputs.currentSavings)},{' '}
          {results.requiredMonthlyContribution ? (
            <>
              necesitarías aportar {formatCurrency(results.requiredMonthlyContribution)} mensuales
              para alcanzar tu ingreso deseado de {formatCurrency(inputs.desiredMonthlyIncome || 0)}.
            </>
          ) : (
            <>
              podrás mantener un ingreso mensual de {formatCurrency(results.monthlyRetirementIncome)}{' '}
              durante {results.yearsOfRetirement} años de retiro.
            </>
          )}
        </p>
      </div>

      <Button variant="outline" onClick={onBack} className="w-full">
        Ajustar Cálculos
      </Button>
    </motion.div>
  )
} 