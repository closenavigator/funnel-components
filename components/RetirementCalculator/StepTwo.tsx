import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { RetirementInputs } from "@/types/retirement"
import { formatCurrency } from "@/lib/format"

interface StepTwoProps {
  monthlyContribution: number
  currentSavings: number
  onUpdate: (inputs: Partial<RetirementInputs>) => void
  onNext: () => void
  onBack: () => void
}

export function StepTwo({
  monthlyContribution,
  currentSavings,
  onUpdate,
  onNext,
  onBack
}: StepTwoProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label htmlFor="monthlyContribution">Aportación mensual</Label>
        <Input
          id="monthlyContribution"
          type="number"
          value={monthlyContribution}
          onChange={(e) => onUpdate({ 
            monthlyContribution: Math.max(1000, Math.min(100000, Number(e.target.value))) 
          })}
          className="text-center text-lg"
        />
        <Slider
          value={[monthlyContribution]}
          min={1000}
          max={100000}
          step={500}
          onValueChange={(value) => onUpdate({ monthlyContribution: value[0] })}
        />
        <p className="text-sm text-muted-foreground text-center">
          {formatCurrency(monthlyContribution)} mensuales
        </p>
      </div>

      <div className="space-y-4">
        <Label htmlFor="currentSavings">Ahorros actuales</Label>
        <Input
          id="currentSavings"
          type="number"
          value={currentSavings}
          onChange={(e) => onUpdate({ 
            currentSavings: Math.max(0, Number(e.target.value)) 
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