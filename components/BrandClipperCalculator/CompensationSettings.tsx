import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { ClipperInputs, CLIPPER_PARAMS } from "@/types/brandClipper"
import { formatCurrency, formatPercentage } from "@/lib/format"

interface CompensationSettingsProps {
  inputs: ClipperInputs
  onChange: (field: keyof ClipperInputs, value: number) => void
}

export function CompensationSettings({ inputs, onChange }: CompensationSettingsProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label htmlFor="viewBonusRate">Bonus por Vistas (por 1000 vistas)</Label>
        <Input
          id="viewBonusRate"
          type="number"
          value={inputs.viewBonusRate}
          onChange={(e) => onChange('viewBonusRate', Math.max(
            CLIPPER_PARAMS.minBonusRate,
            Math.min(CLIPPER_PARAMS.maxBonusRate, Number(e.target.value))
          ))}
          className="text-center text-lg"
        />
        <Slider
          value={[inputs.viewBonusRate]}
          min={CLIPPER_PARAMS.minBonusRate}
          max={CLIPPER_PARAMS.maxBonusRate}
          step={0.1}
          onValueChange={(value) => onChange('viewBonusRate', value[0])}
        />
        <p className="text-sm text-muted-foreground text-center">
          {formatCurrency(inputs.viewBonusRate)} por cada 1000 vistas
        </p>
      </div>

      <div className="space-y-4">
        <Label htmlFor="revenueSharePercent">Porcentaje de Revenue Share</Label>
        <Input
          id="revenueSharePercent"
          type="number"
          value={inputs.revenueSharePercent}
          onChange={(e) => onChange('revenueSharePercent', Math.max(
            CLIPPER_PARAMS.minRevenueShare * 100,
            Math.min(CLIPPER_PARAMS.maxRevenueShare * 100, Number(e.target.value))
          ))}
          className="text-center text-lg"
        />
        <Slider
          value={[inputs.revenueSharePercent]}
          min={CLIPPER_PARAMS.minRevenueShare * 100}
          max={CLIPPER_PARAMS.maxRevenueShare * 100}
          step={0.5}
          onValueChange={(value) => onChange('revenueSharePercent', value[0])}
        />
        <p className="text-sm text-muted-foreground text-center">
          {formatPercentage(inputs.revenueSharePercent / 100)} de las ventas generadas
        </p>
      </div>

      <div className="space-y-4">
        <Label htmlFor="averageProductPrice">Precio Promedio del Producto</Label>
        <Input
          id="averageProductPrice"
          type="number"
          value={inputs.averageProductPrice}
          onChange={(e) => onChange('averageProductPrice', Math.max(
            CLIPPER_PARAMS.minProductPrice,
            Math.min(CLIPPER_PARAMS.maxProductPrice, Number(e.target.value))
          ))}
          className="text-center text-lg"
        />
        <Slider
          value={[inputs.averageProductPrice]}
          min={CLIPPER_PARAMS.minProductPrice}
          max={CLIPPER_PARAMS.maxProductPrice}
          step={10}
          onValueChange={(value) => onChange('averageProductPrice', value[0])}
        />
        <p className="text-sm text-muted-foreground text-center">
          {formatCurrency(inputs.averageProductPrice)} por producto
        </p>
      </div>

      {inputs.tier === 'clipperExpert' && (
        <div className="space-y-4">
          <Label htmlFor="weeklyRecurring">Bonus Semanal Recurrente</Label>
          <Input
            id="weeklyRecurring"
            type="number"
            value={inputs.weeklyRecurring || CLIPPER_PARAMS.minWeeklyRecurring}
            onChange={(e) => onChange('weeklyRecurring', Math.max(
              CLIPPER_PARAMS.minWeeklyRecurring,
              Math.min(CLIPPER_PARAMS.maxWeeklyRecurring, Number(e.target.value))
            ))}
            className="text-center text-lg"
          />
          <Slider
            value={[inputs.weeklyRecurring || CLIPPER_PARAMS.minWeeklyRecurring]}
            min={CLIPPER_PARAMS.minWeeklyRecurring}
            max={CLIPPER_PARAMS.maxWeeklyRecurring}
            step={100}
            onValueChange={(value) => onChange('weeklyRecurring', value[0])}
          />
          <p className="text-sm text-muted-foreground text-center">
            {formatCurrency(inputs.weeklyRecurring || 0)} por semana
          </p>
        </div>
      )}
    </div>
  )
} 