import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function GET(request: Request) {
  const headersList = headers()
  const domain = headersList.get('host') || 'localhost:3000'
  
  const embedCode = `
<!-- Retirement Calculator Embed -->
<div id="retirement-calculator"></div>
<script>
  (function() {
    const script = document.createElement('script');
    script.src = 'https://${domain}/retirement-embed.js';
    script.async = true;
    document.head.appendChild(script);
    
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'https://${domain}/retirement-embed.css';
    document.head.appendChild(style);
  })();
</script>
`

  return new NextResponse(embedCode, {
    headers: {
      'Content-Type': 'text/html',
    },
  })
} 