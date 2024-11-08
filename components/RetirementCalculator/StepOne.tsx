import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { RetirementInputs } from "@/types/retirement"

interface StepOneProps {
  age: number
  onUpdate: (inputs: Partial<RetirementInputs>) => void
  onNext: () => void
}

export function StepOne({ age, onUpdate, onNext }: StepOneProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label htmlFor="age">Tu edad actual</Label>
        <Input
          id="age"
          type="number"
          value={age}
          onChange={(e) => onUpdate({ age: Math.max(18, Math.min(80, Number(e.target.value))) })}
          className="text-center text-lg"
        />
        <Slider
          value={[age]}
          min={18}
          max={80}
          step={1}
          onValueChange={(value) => onUpdate({ age: value[0] })}
        />
        <p className="text-sm text-muted-foreground text-center">
          {age} años
        </p>
      </div>
      
      <Button 
        className="w-full" 
        onClick={onNext}
        disabled={age < 18 || age > 80}
      >
        Siguiente
      </Button>
    </div>
  )
} 