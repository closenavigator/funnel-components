import { Card } from "@/components/ui/card"
import { ClipperInputs, ClipperTier } from "@/types/brandClipper"

interface TierSelectionProps {
  inputs: ClipperInputs
  onChange: (field: keyof ClipperInputs, value: ClipperTier) => void
}

export function TierSelection({ inputs, onChange }: TierSelectionProps) {
  const tiers = [
    {
      id: 'brandClipper',
      title: 'Brand Clipper',
      description: 'CPM + % of Sales',
      features: [
        'Base CPM rate for views',
        'Revenue share from sales',
        'Performance bonuses',
        'Basic analytics access'
      ]
    },
    {
      id: 'clipperExpert',
      title: 'Clipper Expert',
      description: 'Brand Clipper + Weekly Recurring',
      features: [
        'Everything in Brand Clipper',
        'Weekly recurring revenue',
        'Advanced analytics',
        'Priority support',
        'Training resources'
      ]
    }
  ]

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {tiers.map((tier) => (
        <Card
          key={tier.id}
          className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
            inputs.tier === tier.id ? 'ring-2 ring-primary' : ''
          }`}
          onClick={() => onChange('tier', tier.id as ClipperTier)}
        >
          <h3 className="text-xl font-bold mb-2">{tier.title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
          <ul className="space-y-2">
            {tier.features.map((feature) => (
              <li key={feature} className="text-sm flex items-center">
                <CheckIcon className="w-4 h-4 mr-2 text-green-500" />
                {feature}
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  )
} 