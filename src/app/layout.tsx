import type { Metadata, Viewport } from 'next'
import Script from 'next/script'

import './globals.css'
import { Open_Sans } from 'next/font/google'

const openSans = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: { default: 'Zachary Montgomery', template: '%s | Zachary Montgomery' },
  description: `My profession is curiosity. I like to take naive passion and turn it into beautiful things.\nI am also a Christian.`,
  viewport: { width: "device-width", initialScale: 1 },
}

export const viewport: Viewport = {
  themeColor: "#cdc79b",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <div className="bg-stone-200 text-secondary min-h-screen scroll-smooth">
          {children}
        </div>
        <Script defer data-domain="zachmontgomery.com" src="https://plausible.zachmontgomery.com/js/script.js" />
      </body>
    </html>
  )
}
