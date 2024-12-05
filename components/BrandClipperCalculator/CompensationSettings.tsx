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
        <Label htmlFor="viewBonusRate">Bonus por vista</Label>
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
          {formatCurrency(inputs.viewBonusRate / 1000)} por cada 1,000 vistas
        </p>
      </div>

      <div className="space-y-4">
        <Label htmlFor="revenueSharePercent">Porcentaje de revenue share</Label>
        <Input
          id="revenueSharePercent"
          type="number"
          value={inputs.revenueSharePercent * 100}
          onChange={(e) => onChange('revenueSharePercent', Math.max(
            CLIPPER_PARAMS.minRevenueShare,
            Math.min(CLIPPER_PARAMS.maxRevenueShare, Number(e.target.value) / 100)
          ))}
          className="text-center text-lg"
        />
        <Slider
          value={[inputs.revenueSharePercent * 100]}
          min={CLIPPER_PARAMS.minRevenueShare * 100}
          max={CLIPPER_PARAMS.maxRevenueShare * 100}
          step={1}
          onValueChange={(value) => onChange('revenueSharePercent', value[0] / 100)}
        />
        <p className="text-sm text-muted-foreground text-center">
          {formatPercentage(inputs.revenueSharePercent)}
        </p>
      </div>

      {inputs.tier === 'clipperExpert' && (
        <div className="space-y-4">
          <Label htmlFor="weeklyRecurring">Bonus semanal recurrente</Label>
          <Input
            id="weeklyRecurring"
            type="number"
            value={inputs.weeklyRecurring}
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