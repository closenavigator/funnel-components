import { useState } from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { RETIREMENT_PARAMS } from "@/types/retirement"
import { formatCurrency } from "@/lib/format"
import { motion, AnimatePresence } from 'framer-motion'

interface StepTwoProps {
  monthlyContribution: number
  currentSavings: number
  desiredMonthlyIncome?: number
  onUpdate: (values: {
    monthlyContribution?: number
    currentSavings?: number
    desiredMonthlyIncome?: number
  }) => void
  onNext: () => void
  onBack: () => void
}

export function StepTwo({
  monthlyContribution,
  currentSavings,
  desiredMonthlyIncome = 20000,
  onUpdate,
  onNext,
  onBack
}: StepTwoProps) {
  const [showDesiredIncome, setShowDesiredIncome] = useState(false)

  const handleDesiredIncomeChange = (value: number) => {
    onUpdate({ 
      desiredMonthlyIncome: value,
      monthlyContribution: undefined
    })
  }

  const handleSwitchChange = (checked: boolean) => {
    setShowDesiredIncome(checked)
    if (checked) {
      onUpdate({ 
        desiredMonthlyIncome: 20000,
        monthlyContribution: undefined 
      })
    } else {
      onUpdate({ 
        desiredMonthlyIncome: undefined,
        monthlyContribution: 5000 
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
        <div className="space-y-1">
          <Label htmlFor="reverse-calc" className="text-base font-medium">
            Calcular aportación necesaria
          </Label>
          <p className="text-sm text-muted-foreground">
            {showDesiredIncome 
              ? "Define tu ingreso mensual deseado al retirarte" 
              : "Define tu aportación mensual actual"}
          </p>
        </div>
        <Switch
          id="reverse-calc"
          checked={showDesiredIncome}
          onCheckedChange={handleSwitchChange}
        />
      </div>

      <AnimatePresence mode="wait">
        {showDesiredIncome ? (
          <motion.div
            key="desired-income"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <Label htmlFor="desiredIncome">
              Ingreso mensual deseado al retirarte
              <span className="text-xs text-muted-foreground ml-2">
                (en pesos actuales)
              </span>
            </Label>
            <div className="space-y-4">
              <Input
                id="desiredIncome"
                type="number"
                value={desiredMonthlyIncome}
                onChange={(e) => handleDesiredIncomeChange(
                  Math.max(5000, Math.min(1000000, Number(e.target.value)))
                )}
                className="text-center text-lg"
              />
              <Slider
                value={[desiredMonthlyIncome]}
                min={5000}
                max={1000000}
                step={1000}
                onValueChange={(value) => handleDesiredIncomeChange(value[0])}
              />
              <p className="text-sm text-muted-foreground text-center">
                {formatCurrency(desiredMonthlyIncome)} mensuales al retirarte
                <span className="block text-xs mt-1">
                  (ajustado por inflación)
                </span>
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="monthly-contribution"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <Label htmlFor="monthlyContribution">Aportación mensual</Label>
            <Input
              id="monthlyContribution"
              type="number"
              value={monthlyContribution}
              onChange={(e) => onUpdate({ 
                monthlyContribution: Math.max(
                  RETIREMENT_PARAMS.minContribution, 
                  Math.min(RETIREMENT_PARAMS.maxContribution, Number(e.target.value))
                ) 
              })}
              className="text-center text-lg"
            />
            <Slider
              value={[monthlyContribution]}
              min={RETIREMENT_PARAMS.minContribution}
              max={RETIREMENT_PARAMS.maxContribution}
              step={500}
              onValueChange={(value) => onUpdate({ monthlyContribution: value[0] })}
            />
            <p className="text-sm text-muted-foreground text-center">
              {formatCurrency(monthlyContribution)} mensuales
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4 bg-muted/50 p-4 rounded-lg">
        <Label htmlFor="currentSavings">Ahorros actuales</Label>
        <Input
          id="currentSavings"
          type="number"
          value={currentSavings}
          onChange={(e) => onUpdate({ 
            currentSavings: Math.max(
              RETIREMENT_PARAMS.minSavings, 
              Math.min(RETIREMENT_PARAMS.maxSavings, Number(e.target.value))
            ) 
          })}
          className="text-center text-lg"
        />
        <Slider
          value={[currentSavings]}
          min={RETIREMENT_PARAMS.minSavings}
          max={RETIREMENT_PARAMS.maxSavings}
          step={10000}
          onValueChange={(value) => onUpdate({ currentSavings: value[0] })}
        />
        <p className="text-sm text-muted-foreground text-center">
          {formatCurrency(currentSavings)} ahorrados actualmente
        </p>
      </div>

      <div className="flex gap-4 pt-4">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Atrás
        </Button>
        <Button onClick={onNext} className="flex-1">
          Calcular
        </Button>
      </div>
    </div>
  )
} 