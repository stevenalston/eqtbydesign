import type { Metadata } from 'next'
import { Inter, Fraunces, Dancing_Script } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Equity by Design - Design for Everyone',
  description: 'Creating equity, justice, and opportunity through powerful, accessible design. We partner with nonprofits and organizations to amplify social impact.',
  keywords: ['equity design', 'social impact design', 'inclusive design', 'nonprofit web design', 'accessible design'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${dancingScript.variable}`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  )
}
