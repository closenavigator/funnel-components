(function() {
  // Configuration
  const config = {
    minHeight: 500,
    maxWidth: 1200,
    defaultHeight: 800,
    mobileBreakpoint: 768,
    padding: 16
  };

  // Utility functions
  const isMobile = () => window.innerWidth < config.mobileBreakpoint;
  const getContainerWidth = () => {
    const container = document.getElementById('retirement-calculator');
    return container ? container.offsetWidth : window.innerWidth;
  };
  
  // Create container styles with better integration
  const containerStyles = `
    width: 100%;
    max-width: ${config.maxWidth}px;
    margin: 0 auto;
    min-height: ${isMobile() ? config.minHeight : config.defaultHeight}px;
    position: relative;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    background: transparent;
  `;

  // Create and style iframe with better integration
  const iframe = document.createElement('iframe');
  const currentScript = document.currentScript;
  const scriptUrl = new URL(currentScript.src);
  const domain = scriptUrl.hostname;
  
  iframe.src = `https://${domain}/retirement1`;
  iframe.style.cssText = `
    width: 100%;
    height: ${isMobile() ? config.minHeight : config.defaultHeight}px;
    border: none;
    border-radius: ${isMobile() ? '4px' : '8px'};
    box-shadow: none;
    opacity: 0;
    transition: opacity 0.3s ease;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
    background: transparent;
  `;

  // Add iframe to container with better sizing
  const container = document.getElementById('retirement-calculator');
  if (container) {
    try {
      container.style.cssText = containerStyles;
      container.appendChild(iframe);

      // Handle iframe load with dynamic sizing
      const handleIframeLoad = () => {
        iframe.style.opacity = '1';
        
        // Initial size adjustment
        const adjustSize = () => {
          const width = getContainerWidth();
          const aspectRatio = isMobile() ? 1.2 : 1.5; // Adjust these values as needed
          const calculatedHeight = Math.min(
            Math.max(width / aspectRatio, config.minHeight),
            config.defaultHeight
          );
          
          iframe.style.height = `${calculatedHeight}px`;
          container.style.height = `${calculatedHeight}px`;
        };
        
        adjustSize();
        
        // Handle resize with debounce
        let resizeTimeout;
        window.addEventListener('resize', () => {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(adjustSize, 150);
        });
      };

      iframe.addEventListener('load', handleIframeLoad);

      // Handle messages from iframe for dynamic content
      window.addEventListener('message', (event) => {
        if (event.data.type === 'resize' && event.data.height) {
          const newHeight = Math.max(
            isMobile() ? config.minHeight : config.defaultHeight,
            event.data.height + (config.padding * 2)
          );
          iframe.style.height = `${newHeight}px`;
          container.style.height = `${newHeight}px`;
        }
      });

    } catch (error) {
      console.error('Error initializing calculator:', error);
    }
  }

  // Add integrated styles
  const style = document.createElement('style');
  style.textContent = `
    #retirement-calculator {
      transition: height 0.3s ease;
    }
    #retirement-calculator iframe {
      transition: height 0.3s ease;
    }
    @media (max-width: ${config.mobileBreakpoint}px) {
      #retirement-calculator {
        padding: ${config.padding}px;
        margin: 0;
        border-radius: 0;
      }
      #retirement-calculator iframe {
        border-radius: 4px;
      }
    }
  `;
  document.head.appendChild(style);
})(); 