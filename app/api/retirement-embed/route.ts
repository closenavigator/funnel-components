import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function GET() {
  const headersList = headers()
  const domain = headersList.get('host') || 'funnel-components.vercel.app'
  
  const embedCode = `
<!-- Retirement Calculator Embed -->
<div id="retirement-calculator" style="min-height: 800px; position: relative;">
  <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
    Cargando calculadora...
  </div>
</div>
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
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
} 