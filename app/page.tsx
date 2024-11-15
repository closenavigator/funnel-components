import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Calculadora de Retiro</h1>
      <div className="space-y-4">
        <Link 
          href="/retirement1" 
          className="block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
        >
          Calculadora V1
        </Link>
        <Link 
          href="/retirement2" 
          className="block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
        >
          Calculadora V2
        </Link>
        <Link 
          href="/retirement3" 
          className="block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
        >
          Calculadora V3
        </Link>
      </div>
    </main>
  )
}