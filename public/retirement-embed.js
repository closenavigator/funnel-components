(function() {
  // Configuration
  const config = {
    minHeight: 500,
    maxWidth: 1200,
    defaultHeight: 800,
    mobileBreakpoint: 768
  };

  // Utility functions
  const isMobile = () => window.innerWidth < config.mobileBreakpoint;
  
  // Create container styles with mobile-first approach
  const containerStyles = `
    width: 100%;
    max-width: ${config.maxWidth}px;
    margin: 0 auto;
    min-height: ${isMobile() ? config.minHeight : config.defaultHeight}px;
    position: relative;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
  `;

  // Create loading indicator with better mobile support
  const loadingStyles = `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-family: system-ui, -apple-system, sans-serif;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    z-index: 1000;
  `;

  // Create and style iframe with mobile optimizations
  const iframe = document.createElement('iframe');
  const currentScript = document.currentScript;
  const scriptUrl = new URL(currentScript.src);
  const domain = scriptUrl.hostname;
  
  iframe.src = `https://${domain}/retirement1`;
  iframe.style.cssText = `
    width: 100%;
    height: ${isMobile() ? config.minHeight : config.defaultHeight}px;
    border: none;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    opacity: 0;
    transition: opacity 0.3s ease;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  `;
  
  // Create loading indicator with better UX
  const loading = document.createElement('div');
  loading.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="animation: spin 1s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke-width="4" stroke-dasharray="31.4 31.4" transform="rotate(0 12 12)"/>
      </svg>
      <span>Cargando calculadora...</span>
    </div>
  `;
  loading.style.cssText = loadingStyles;
  
  // Add iframe to container with error handling
  const container = document.getElementById('retirement-calculator');
  if (container) {
    try {
      container.style.cssText = containerStyles;
      container.appendChild(loading);
      container.appendChild(iframe);

      // Add error handling
      iframe.onerror = () => {
        loading.innerHTML = 'Error al cargar la calculadora. Por favor, intente nuevamente.';
      };

      // Handle iframe load with retry mechanism
      let retryCount = 0;
      const maxRetries = 3;
      
      const tryLoad = () => {
        iframe.onload = () => {
          iframe.style.opacity = '1';
          loading.style.display = 'none';
        };

        iframe.onerror = () => {
          if (retryCount < maxRetries) {
            retryCount++;
            setTimeout(tryLoad, 1000 * retryCount);
          } else {
            loading.innerHTML = 'Error al cargar la calculadora. Por favor, intente nuevamente.';
          }
        };
      };

      tryLoad();

      // Handle resize with debounce
      let resizeTimeout;
      const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          const newHeight = isMobile() ? config.minHeight : config.defaultHeight;
          iframe.style.height = `${newHeight}px`;
        }, 150);
      };

      window.addEventListener('resize', handleResize);
      
      // Handle messages from iframe
      window.addEventListener('message', (event) => {
        if (event.data.type === 'resize' && event.data.height) {
          const newHeight = Math.max(
            isMobile() ? config.minHeight : config.defaultHeight,
            event.data.height
          );
          iframe.style.height = `${newHeight}px`;
        }
      });

    } catch (error) {
      console.error('Error initializing calculator:', error);
      loading.innerHTML = 'Error al inicializar la calculadora. Por favor, intente nuevamente.';
    }
  }

  // Add mobile-specific styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @media (max-width: ${config.mobileBreakpoint}px) {
      #retirement-calculator {
        padding: 0.5rem;
      }
      #retirement-calculator iframe {
        border-radius: 4px;
      }
    }
  `;
  document.head.appendChild(style);
})(); 