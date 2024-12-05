import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ClipperInputs, CLIPPER_PARAMS, FunnelMetrics as FunnelMetricsType } from "@/types/brandClipper"
import { formatPercentage } from "@/lib/format"

interface FunnelMetricsProps {
  inputs: ClipperInputs
  onFunnelChange: (field: keyof FunnelMetrics, value: number) => void
}

export function FunnelMetrics({ inputs, onFunnelChange }: FunnelMetricsProps) {
  const metrics = [
    {
      id: 'reelToProfile',
      label: 'Reel a Perfil',
      description: 'Porcentaje de viewers que visitan tu perfil',
      defaultValue: CLIPPER_PARAMS.reelToProfile,
      value: inputs.funnelMetrics.reelToProfile,
      max: 0.1
    },
    {
      id: 'profileToLink',
      label: 'Perfil a Link',
      description: 'Porcentaje de visitantes que hacen clic en tu link',
      defaultValue: CLIPPER_PARAMS.profileToLink,
      value: inputs.funnelMetrics.profileToLink,
      max: 0.1
    },
    {
      id: 'linkToLanding',
      label: 'Link a Landing',
      description: 'Porcentaje de clics que llegan a la landing',
      defaultValue: CLIPPER_PARAMS.linkToLanding,
      value: inputs.funnelMetrics.linkToLanding,
      max: 1
    },
    {
      id: 'landingToSale',
      label: 'Landing a Venta',
      description: 'Porcentaje de visitantes que realizan una compra',
      defaultValue: CLIPPER_PARAMS.landingToSale.midTicket,
      value: inputs.funnelMetrics.landingToSale,
      max: 0.05
    }
  ]

  return (
    <div className="space-y-8">
      {metrics.map((metric) => (
        <div key={metric.id} className="space-y-4">
          <div>
            <Label>{metric.label}</Label>
            <p className="text-sm text-muted-foreground">{metric.description}</p>
          </div>
          <Slider
            value={[metric.value * 100]}
            min={0}
            max={metric.max * 100}
            step={0.1}
            onValueChange={(value) => onFunnelChange(metric.id as keyof FunnelMetrics, value[0] / 100)}
          />
          <p className="text-sm text-muted-foreground text-center">
            {formatPercentage(metric.value)}
          </p>
        </div>
      ))}
    </div>
  )
} 