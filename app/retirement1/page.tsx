import RetirementSavingsVisualization from '@/components/RetirementSavingsVisualization'

// Add static generation
export const dynamic = 'force-static'

export default function RetirementPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24 bg-gray-100">
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Calculadora de Retiro</h1>
        <RetirementSavingsVisualization />
      </div>
    </main>
  )
} 