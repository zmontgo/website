import { Metadata } from 'next'
import Script from 'next/script'

import './globals.css'
import { Open_Sans } from 'next/font/google'

const openSans = Open_Sans({ subsets: ['latin'] })

export default function NormalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <div className="bg-primary text-secondary min-h-screen text-lg">
          {children}
        </div>
        <Script defer data-domain="zachmontgomery.com" src="https://admin.iodinedev.com/js/script.js" />
      </body>
    </html>
  )
}
