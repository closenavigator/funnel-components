import { cn } from "@/lib/utils"

interface Step {
  title: string
  description: string
}

interface StepsProps {
  steps: Step[]
  currentStep: number
}

export function Steps({ steps, currentStep }: StepsProps) {
  return (
    <div className="relative">
      <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200">
        <div
          className="absolute h-full bg-primary transition-all duration-500"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />
      </div>
      <div className="relative flex justify-between">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className={cn(
              "flex flex-col items-center",
              index <= currentStep ? "text-primary" : "text-gray-400"
            )}
          >
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-colors duration-200",
                index <= currentStep
                  ? "bg-primary text-primary-foreground"
                  : "bg-gray-200 text-gray-400"
              )}
            >
              {index + 1}
            </div>
            <div className="text-center">
              <div className="text-sm font-medium">{step.title}</div>
              <div className="text-xs mt-1 hidden sm:block">{step.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 