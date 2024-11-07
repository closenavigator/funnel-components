import RetirementSavingsVisualization from '@/components/RetirementSavingsVisualization'

export default function RetirementPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gray-50">
      <div className="w-full max-w-7xl">
        <RetirementSavingsVisualization />
      </div>
      <script dangerouslySetInnerHTML={{
        __html: `
          // Send height to parent
          function updateHeight() {
            const height = document.body.scrollHeight;
            window.parent.postMessage({ type: 'resize', height }, '*');
          }
          
          // Update on load and resize
          window.addEventListener('load', updateHeight);
          window.addEventListener('resize', updateHeight);
        `
      }} />
    </main>
  )
} 