import Link from 'next/link'

interface Link {
  url: string
  label: string
}

export default function Breadcrumbs({ crumbs }: { crumbs: Link[] }) {
  return (
    <ul className="flex items-center text-secondary/80 text-md overflow-x-auto">
      {crumbs.map((link, i) => (
        <li key={i} className='w-max relative flex font-mono items-center gap-2 mr-2 first:before:hidden before:block before:relative before:left-0 before:border-r-2 before:border-b-2 before:border-secondary/40 before:-rotate-45 before:w-2 before:h-2'>
          <Link href={link.url} className="hover:underline whitespace-nowrap text-sm">{link.label}</Link>
        </li>
      ))}
    </ul>
  )
}