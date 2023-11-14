import Link from "next/link";
import { createIdentifier } from "@/lib/identifiers";

import { Koulen } from 'next/font/google'
// import ContactForm from "./ContactForm";
import Breadcrumbs from "../Breadcrumbs";

const koulen = Koulen({
  subsets: ['latin'],
  weight: ['400'],
})

export default async function Design() {
  let id = null;
  
  // try {
  //   id = await createIdentifier();
  // } catch {}
    

  return (
    <div className="flex flex-col items-center py-16">
      <div className="w-full max-w-6xl px-4 md:px-16">
        <Breadcrumbs crumbs={[{url: '/', label: 'Home'}, {url: '/design', label: 'Design'}]} />

        <div className="mt-8">
          <h1 className={'text-6xl md:text-8xl tracking-wider ' + koulen.className}>Web Design</h1>
          <p>Carefully-wrought websites built from the ground up.</p>
          {/* { id
            ? <ContactForm id={id} />
            : <p className="mt-4 text-red-700 font-bold max-w-prose">Looks like we couldn&apos;t load the form. Feel free to get in touch with me via email instead.</p>
          } */}

          <p className="mt-4">Prefer email? Don&apos;t worry, I&apos;ll respond just as quick there.</p>
          <Link href="mailto:zachmontgo@iodinedev.com" rel="noopener noreferrer" target="_blank" className="underline">zachmontgo@iodinedev.com</Link>
        </div>
      </div>
    </div>
  );
}