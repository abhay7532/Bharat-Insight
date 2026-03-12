import type { Metadata } from 'next'
import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { QueryProvider } from '@/lib/queryProvider'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Bharat Insight – AI Driven Data Platform',
  description: 'AI-Powered Public Data Intelligence for India. Analyze 100K+ government datasets with real-time AI insights.',
  keywords: ['India', 'government data', 'AI analytics', 'public data', 'Bharat'],
  openGraph: {
    title: 'Bharat Insight – AI Driven Data Platform',
    description: 'AI-Powered Public Data Intelligence for India',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${syne.variable} ${dmSans.variable} ${jetbrains.variable} font-body bg-surface-50 text-white antialiased`}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
