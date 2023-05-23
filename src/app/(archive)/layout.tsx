import { Metadata } from 'next'

export const metadata: Metadata = {
  title: { default: 'Archive | Zachary Montgomery', template: '%s | Archive | Zachary Montgomery' },
  description: `Semi-permanent archive of the blog. Deleted posts will be replaced with a 410 Gone error.`,
  viewport: { width: "device-width", initialScale: 1 },
  themeColor: "#cdc79b",
}

export default function ArchiveLayout({
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
