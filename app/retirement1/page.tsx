import RetirementSavingsVisualization from '@/components/RetirementSavingsVisualization'

export default function RetirementPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-transparent">
      <div className="w-full">
        <RetirementSavingsVisualization />
      </div>
      <script dangerouslySetInnerHTML={{
        __html: `
          function updateHeight() {
            const content = document.querySelector('main');
            if (content) {
              const height = content.offsetHeight;
              window.parent.postMessage({ 
                type: 'resize', 
                height: height
              }, '*');
            }
          }
          
          // Update on content changes
          const observer = new MutationObserver(updateHeight);
          observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true
          });
          
          // Initial update and resize handling
          window.addEventListener('load', updateHeight);
          window.addEventListener('resize', updateHeight);
        `
      }} />
    </main>
  )
} 