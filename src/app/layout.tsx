import { Metadata } from 'next'

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
      <body>
        {children}
      </body>
    </html>
  )
}
