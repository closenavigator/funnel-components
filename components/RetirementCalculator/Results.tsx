import { Button } from "@/components/ui/button"
import { RetirementInputs, RetirementResults } from "@/types/retirement"
import { formatCurrency } from "@/lib/format"

interface ResultsProps {
  results: RetirementResults
  inputs: RetirementInputs
  onBack: () => void
}

export function Results({ results, inputs, onBack }: ResultsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          Tu Plan de Retiro
        </h3>
        
        <div className="grid gap-4 p-4 bg-muted rounded-lg">
          <div>
            <p className="text-sm text-muted-foreground">Total al retirarte (65 años)</p>
            <p className="text-2xl font-bold">{formatCurrency(results.totalAtRetirement)}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Ingreso mensual estimado</p>
            <p className="text-2xl font-bold">{formatCurrency(results.monthlyRetirementIncome)}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Años de retiro cubiertos</p>
            <p className="text-2xl font-bold">{results.yearsOfRetirement} años</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Basado en una aportación mensual de {formatCurrency(inputs.monthlyContribution)}, 
          iniciando a los {inputs.age} años.
        </p>
      </div>

      <Button variant="outline" onClick={onBack} className="w-full">
        Ajustar Cálculos
      </Button>
    </div>
  )
} 