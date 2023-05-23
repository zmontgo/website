import Link from 'next/link'

// This is to overwrite the default a tag in MDX. Need to include the name, url, and title by getting the children.
export default function FancyLink({ href, title, children }: { href: string, title?: string, children: React.ReactNode }) {
  // External links should open in a new tab.
  if (href.startsWith('http')) {
    return (
      <Link href={href} title={title} rel="noopener noreferrer" target="_blank" className='underline'>
        {children}
      </Link>
    )
  }

  return (
    <Link href={href} title={title} className='underline'>
      {children}
    </Link>
  )
}