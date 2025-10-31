import './globals.css'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'JSON Viewer Pro',
  description: 'Visualisez vos données JSON avec style',
}
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}