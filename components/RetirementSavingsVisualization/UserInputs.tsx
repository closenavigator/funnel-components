import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons"
import { formatCurrency } from '@/lib/format'

interface UserInputsProps {
  monthlyContribution: number
  setMonthlyContribution: (value: number) => void
  viewerAge: number
  setViewerAge: (value: number) => void
}

export function UserInputs({
  monthlyContribution,
  setMonthlyContribution,
  viewerAge,
  setViewerAge
}: UserInputsProps) {
  const adjustMonthlyContribution = (amount: number) => {
    setMonthlyContribution(prev => Math.max(1000, Math.min(20000, prev + amount)))
  }

  const handleMonthlyContributionChange = (value: string) => {
    const num = parseInt(value)
    if (!isNaN(num)) {
      setMonthlyContribution(Math.max(1000, Math.min(20000, num)))
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <Label htmlFor="monthly-contribution" className="text-lg font-semibold">
          Aportación Mensual
        </Label>
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => adjustMonthlyContribution(-500)}
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
            onClick={() => adjustMonthlyContribution(500)}
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>
        <Slider
          value={[monthlyContribution]}
          min={1000}
          max={20000}
          step={500}
          onValueChange={(value) => setMonthlyContribution(value[0])}
          className="mt-2"
        />
        <p className="text-sm text-muted-foreground text-center">
          {formatCurrency(monthlyContribution)} mensuales
        </p>
      </div>

      <div className="space-y-4">
        <Label htmlFor="viewer-age" className="text-lg font-semibold">
          Tu Edad Actual
        </Label>
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setViewerAge(Math.max(20, viewerAge - 1))}
          >
            <MinusIcon className="h-4 w-4" />
          </Button>
          <Input
            id="viewer-age"
            type="number"
            value={viewerAge}
            onChange={(e) => {
              const num = parseInt(e.target.value)
              if (!isNaN(num)) {
                setViewerAge(Math.max(20, Math.min(65, num)))
              }
            }}
            className="text-center text-lg font-medium"
          />
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setViewerAge(Math.min(65, viewerAge + 1))}
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
        <p className="text-sm text-muted-foreground text-center">
          {viewerAge} años
        </p>
      </div>
    </div>
  )
} 