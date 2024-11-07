(function() {
  // Create iframe
  const iframe = document.createElement('iframe');
  iframe.src = 'https://your-vercel-domain.vercel.app/retirement1';
  iframe.style.width = '100%';
  iframe.style.height = '800px';
  iframe.style.border = 'none';
  iframe.style.borderRadius = '8px';
  iframe.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
  
  // Add iframe to container
  const container = document.getElementById('retirement-calculator');
  if (container) {
    container.appendChild(iframe);
  }
  
  // Handle resize messages from iframe
  window.addEventListener('message', (event) => {
    if (event.data.type === 'resize' && event.data.height) {
      iframe.style.height = `${event.data.height}px`;
    }
  });
})(); 