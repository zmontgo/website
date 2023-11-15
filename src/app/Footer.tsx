import { Koulen } from "next/font/google"
import Link from "next/link"
import Subscribe from "./Subscribe";
import { Suspense } from "react";

const koulen = Koulen({ subsets: ["latin"], weight: "400" })

export default async function Footer() {
  return (
    <footer className='bg-stone-300 gap-8 px-8 py-32 flex flex-col lg:flex-row flex-wrap text-primary-content/70'>
      <div className='grow lg:basis-96'>
        <h4 className={`text-4xl mb-2 text-primary-content ${koulen.className}`}>Quick Links</h4>
        <p>This site is still a work in progress. More to come!</p>
        <ul className='list-disc ml-8'>
          <li><Link className='underline' href='/'>Home</Link></li>
          <li><Link className='underline' href='/notepad'>Notepad</Link></li>
        </ul>
      </div>
      <div className='grow lg:basis-96'>
        <h4 className={`text-4xl mb-2 text-primary-content ${koulen.className}`}>Copyright</h4>
        <p>Copyright &copy; 2022 Zachary Montgomery.</p>
        <p>All rights reserved.</p>
      </div>
      <div className='grow lg:basis-96'>
        <h4 className={`text-4xl mb-2 text-primary-content ${koulen.className}`}>Newsletter</h4>
        <p className='max-w-md'>Get a dose of poetry and words to make you think straight to your inbox. I promise it&apos;s interesting*.</p>
        <Suspense fallback={<></>}>
          <Subscribe />
        </Suspense>
        <p className='text-primary-content/60 text-xs'>*Assuming you find the topics interesting, of course.</p>
      </div>
    </footer>
  )
}