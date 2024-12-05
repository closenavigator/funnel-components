import { Check } from "lucide-react"
import { Card } from "@/components/ui/card"
import { ClipperInputs, ClipperTier } from "@/types/brandClipper"

interface TierSelectionProps {
  inputs: ClipperInputs
  onChange: (field: keyof ClipperInputs, value: ClipperTier) => void
}

const tiers = [
  {
    id: 'brandClipper',
    title: 'Brand Clipper',
    description: 'Perfect for those starting their content creation journey',
    features: [
      'Base salary + view bonus',
      'Revenue share opportunities',
      'Training and support'
    ]
  },
  {
    id: 'clipperExpert',
    title: 'Clipper Expert',
    description: 'For experienced content creators ready to scale',
    features: [
      'Higher base salary',
      'Enhanced revenue share',
      'Weekly recurring bonus',
      'Advanced analytics'
    ]
  }
]

export function TierSelection({ inputs, onChange }: TierSelectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tiers.map((tier) => (
        <Card
          key={tier.id}
          className={`relative p-6 cursor-pointer transition-all hover:shadow-lg ${
            inputs.tier === tier.id ? 'border-primary shadow-md' : ''
          }`}
          onClick={() => onChange('tier', tier.id as ClipperTier)}
        >
          {inputs.tier === tier.id && (
            <div className="absolute top-4 right-4 h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              <Check className="h-4 w-4" />
            </div>
          )}
          <h3 className="text-lg font-semibold">{tier.title}</h3>
          <p className="text-sm text-muted-foreground mt-2">{tier.description}</p>
          <ul className="mt-4 space-y-2">
            {tier.features.map((feature) => (
              <li key={feature} className="text-sm flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  )
} 