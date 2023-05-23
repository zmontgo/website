import Breadcrumbs from "../Breadcrumbs";

import { getPostNames, getPostContent } from "@/lib/posts";
import matter from "gray-matter";

import { Metadata } from "next";
import Link from "next/link";

import { Koulen } from "next/font/google";

const koulen = Koulen({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Notepad",
  description: "All my random thoughts and ideas, as they come to me.",
}

function Post({ id, title, description }: { id: string, title: string, description: string }) {
  return (
    <div className="w-full max-w-2xl">
      <div className="mt-8">
        <Link className={"text-2xl mt-16 mb-1 underline " + koulen.className} href={"/notepad/" + id}>{title}</Link>
        <p className='mb-6 max-w-prose leading-8'>{description}</p>
      </div>
    </div>
  )
}

export default async function Notepad() {
  const posts = (await getPostNames()).map(async (post) => {
    const content = await getPostContent({ id: post.id });

    if (!content) return (<></>);

    const { data } = matter(content);

    return (
      <Post key={post.id} id={post.id} title={data.title} description={data.description} />
    )
  });


  return (
    <div className="flex flex-col items-center py-16">
      <div className="w-full max-w-6xl px-4 md:px-16">
        <Breadcrumbs crumbs={[{url: '/', label: 'Home'}, {url: '/notepad', label: 'Notepad'}]} />

        <div className="mt-8">
          <h1 className={"text-6xl md:text-8xl tracking-wider " + koulen.className}>Notepad</h1>
          <p>Random thoughts and ideas.</p>

          {posts}
        </div>
      </div>
    </div>
  );
}