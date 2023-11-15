import Image from 'next/image'
import selfie from './selfie.png'
import ScrollDown from './ScrollDown'
import ContactForm from './ContactForm'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { Suspense } from 'react'

import { createIdentifier } from "@/app/lib/identifiers";

import { Koulen } from 'next/font/google'

const koulen = Koulen({
  subsets: ['latin'],
  weight: ['400'],
})

export default async function Home() {
  const id = await createIdentifier();

  return (
    <>
      <div className='min-h-screen relative'>
        <div className="z-10 relative p-8 py-16 flex flex-col justify-between min-h-screen h-full">
          <div className='flex flex-col justify-center h-full flex-1'>
            <h1 className={'text-6xl sm:text-[16vw] xl:text-9xl 2xl:text-[12rem] leading-[0.8] sm:leading-[0.8] xl:leading-[0.8] 2xl:leading-[0.8] ' + koulen.className}>Zachary<br /> Montgomery</h1>
            <ul className={'pt-8 text-3xl md:text-5xl tracking-wide flex flex-col lg:flex-row gap-x-4 gap-y-2 ' + koulen.className}>
              <li>Web Designer.</li>
              <li>Aimless Rambler.</li>
            </ul>
          </div>

          <ScrollDown />
        </div>

        <Image priority src={selfie.src} alt='' width={700} height={600} className='absolute lg:right-0 top-0 h-full w-full object-cover lg:object-contain object-left lg:object-right z-0 opacity-10' />
      </div>


      <div className='flex flex-col gap-8 py-32 lg:py-56 border-t-8 border-dashed border-stone-800' id="read-more">
        <h1 className={'text-6xl md:text-8xl px-8 ' + koulen.className}>I Design Websites</h1>
        <div className="flex flex-col gap-8 xl:flex-row">
          <div className='flex-1 flex flex-col gap-8 px-8'>
            <ul className='list-disc ml-8 max-w-prose flex flex-col gap-4'>
              <li className='text-stone-900/90'><span className='font-bold'>Methodical:</span> The content is thoughtfully placed. The right proportions and spacings are used. The right information must draw the gaze in the right order.</li>
              <li className='text-stone-900/90'><span className='font-bold'>Eloquent:</span> The prose is concise. Headings are clear. The content is easy to comprehend without sacrificing clarity.</li>
              <li className='text-stone-900/90'><span className='font-bold'>Functional:</span> The functionality must be intuitive and accessible, whether the systems are complex or simple.</li>
            </ul>

            <p className='text-stone-900/90 max-w-prose'>I am a software engineer, an author, and a web designer. With over a decade of experience, I have united these skills to create beautiful and functional websites. What I build is marked by an unsurpassed attention to detail.</p>
            <p className='text-stone-900/90 max-w-prose'>Let me take care of the intricacies as we bring your ideas to life.</p>
          </div>

          <div className='flex-1 flex flex-col xl:items-center px-8'>
            <Suspense fallback={null}>
              <div className="md:border-2 border-stone-400 bg-stone-300 shadow-lg p-8 flex flex-col items-center max-w-2xl md:rounded-lg w-full">
                <Suspense fallback={<></>}>
                  { id && <ContactForm id={id} /> }
                </Suspense>
              </div>
            </Suspense>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-8 py-32 lg:py-56 border-t-8 border-dashed border-stone-800' id="websitesSection">
        <h1 className={'text-6xl md:text-8xl px-8 ' + koulen.className}>I Craft Literature</h1>
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className='flex-1 flex flex-col gap-8 px-8'>
            <p className='text-stone-900/90 max-w-prose'>My blog is a library of contemplations I want to share. Thoughtful articles, artful poems, and short stories. I write for you to reflect on.</p>
            <Link href="/notepad" className="flex-1 btn normal-case btn-primary w-max">
              Explore the blog
              <ArrowRightIcon className="h-4 w-4" strokeWidth={2.5} />
            </Link>
          </div>

          <div className='flex-1 flex flex-col items-center'>
            {/* <div className="lg:border-2 border-stone-400 bg-stone-300 shadow-lg p-8 flex flex-col items-center max-w-2xl lg:rounded-lg">
              
            </div> */}
          </div>
        </div>

      </div>
    </>
  )
}

export const dynamic = 'force-dynamic'