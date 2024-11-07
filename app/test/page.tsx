import RetirementSavingsVisualization from '@/components/RetirementSavingsVisualization'

export const revalidate = 3600 // Revalidate every hour

export default function TestPage() {
  return (
    <main className="container mx-auto p-4">
      <RetirementSavingsVisualization />
    </main>
  )
} 