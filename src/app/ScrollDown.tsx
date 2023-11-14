"use client";

import { useState } from "react";
import { Koulen } from 'next/font/google'

const koulen = Koulen({
  subsets: ['latin'],
  weight: ['400'],
})

export default function ScrollDown() {
  const [hover, setHover] = useState(false);

  const handleScroll = (e: any) => {
    e.preventDefault();
    
    const elem = document.getElementById("read-more");
    elem?.scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <button onClick={handleScroll} className='flex flex-row w-max items-end' onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <span className={`font-bold text-2xl transition-all vertical-rtl ${koulen.className} ${hover && 'tracking-wide'} transition-all`}>Read More</span>

      <svg
        fill="none"
        viewBox="0 0 24 130"
        className='w-8 transition-all'
        stroke="currentColor"
        strokeWidth={2.5}
        version="1.1"
        id="svg1">
        <defs
          id="defs1" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-all ease-in-out duration-150 ${hover ? 'translate-y-0' : 'translate-y-8'}`}
          d="M 12,128.75 V 2"
          id="path1" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M 15.75,125 12,128.75 m 0,0 L 8.25,125"
          id="path1" />
      </svg>
    </button>
  )
}