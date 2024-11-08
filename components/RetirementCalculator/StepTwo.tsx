import { useState } from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { RETIREMENT_PARAMS } from "@/types/retirement"
import { formatCurrency } from "@/lib/format"

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
  desiredMonthlyIncome,
  onUpdate,
  onNext,
  onBack
}: StepTwoProps) {
  const [showDesiredIncome, setShowDesiredIncome] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Label htmlFor="reverse-calc">Calcular aportación necesaria</Label>
        <Switch
          id="reverse-calc"
          checked={showDesiredIncome}
          onCheckedChange={setShowDesiredIncome}
        />
      </div>

      {showDesiredIncome ? (
        <div className="space-y-4">
          <Label htmlFor="desiredIncome">Ingreso mensual deseado al retirarte</Label>
          <Input
            id="desiredIncome"
            type="number"
            value={desiredMonthlyIncome}
            onChange={(e) => onUpdate({ 
              desiredMonthlyIncome: Math.max(5000, Math.min(1000000, Number(e.target.value))) 
            })}
            className="text-center text-lg"
          />
          <p className="text-sm text-muted-foreground text-center">
            {formatCurrency(desiredMonthlyIncome || 0)} mensuales al retirarte
          </p>
        </div>
      ) : (
        <div className="space-y-4">
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
        </div>
      )}

      <div className="space-y-4">
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
        <p className="text-sm text-muted-foreground text-center">
          {formatCurrency(currentSavings)}
        </p>
      </div>

      <div className="flex gap-4">
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