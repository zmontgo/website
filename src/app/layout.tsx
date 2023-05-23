import { Metadata } from 'next'

import './globals.css'
import { Open_Sans } from 'next/font/google'

const openSans = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: { default: 'Zachary Montgomery', template: '%s | Zachary Montgomery' },
  description: `My profession is curiosity. I like to take naive passion and turn it into beautiful things.\nI am also a Christian.`,
  viewport: { width: "device-width", initialScale: 1 },
  themeColor: "#cdc79b",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script defer data-domain="zachmontgomery.com" src="https://admin.iodinedev.com/js/script.js"></script>
      </head>
      <body className={openSans.className}>
        <div className="bg-primary text-secondary min-h-screen text-lg">
          {children}
        </div>
      </body>
    </html>
  )
}
