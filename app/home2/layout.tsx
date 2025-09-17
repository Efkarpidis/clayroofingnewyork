// app/home2/layout.tsx
import type { Metadata } from 'next'
import '../globals.css' // import your global styles just like root layout
import HeaderAlt from '@/components/HeaderAlt' // if no alias, use '../../components/HeaderAlt'

export const metadata: Metadata = {
  title: 'Clay Roofing NY — Alt Landing',
  description: 'Alternative landing layout for internal review',
  robots: { index: false, follow: false },
}

export default function Home2Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <HeaderAlt />
        {/* add top padding so content clears the fixed header */}
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  )
}
