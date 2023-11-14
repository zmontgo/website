import { Koulen } from "next/font/google"
import Link from "next/link"
import Options from "./Options"

const koulen = Koulen({
  weight: '400',
  subsets: ['latin'],
})

export default async function NotFound() {
  return (
    <div className='min-h-screen relative py-32 flex flex-col items-center justify-center'>
      <h1 className={'text-6xl ' + koulen.className}>Page not found.</h1>
      <p className='mt-4'>Sorry about that! Either it never existed, or something mysterious happened.</p>

      <div className="mt-8 flex flex-row gap-8">
        <Options />
      </div>
    </div>
  )
}