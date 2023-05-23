import Image from 'next/image'
import Link from 'next/link'

import selfie from './selfie.jpeg'

import { Koulen } from 'next/font/google'

const koulen = Koulen({
  subsets: ['latin'],
  weight: ['400'],
})

export default function Home() {
  return (
    <div className='h-screen relative'>
      <div className="z-10 relative p-8">
        <h1 className={'text-6xl sm:text-[16vw] xl:text-9xl 2xl:text-[12rem] leading-[0.8] sm:leading-[0.8] xl:leading-[0.8] 2xl:leading-[0.8] ' + koulen.className}>Zachary<br /> Montgomery</h1>
        <h3 className={'pt-8 text-3xl md:text-5xl tracking-wide ' + koulen.className}>
          <Link href='/design' className='underline'>Web Designer</Link>.&nbsp;
          <Link href='/notepad' className='underline'>Aimless Rambler</Link>.
        </h3>
      </div>

      <Image src={selfie.src} alt='' width={700} height={600} className='absolute right-0 top-0 h-full z-0 hidden xl:block' priority />
    </div>
  )
}
