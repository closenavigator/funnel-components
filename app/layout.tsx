import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { VercelToolbar } from '@vercel/toolbar/next';

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Calculadora de Retiro",
  description: "Visualiza el impacto del tiempo en tus ahorros para el retiro",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const shouldInjectToolbar = process.env.NODE_ENV === 'development'
  
  return (
    <html lang="en" className={inter.className}>
      <body>
        {children}
        {shouldInjectToolbar && <VercelToolbar />}
      </body>
    </html>
  )
} 