import Breadcrumbs from "../Breadcrumbs";

import { getPostNames, getPostContent } from "@/app/lib/posts";
import PostTime from "../components/PostTime";
import matter from "gray-matter";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

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

function Post({ id, title, description, date, author }: { id: string, title: string, description: string, date: string, author: string }) {
  return (
    <div className="w-full max-w-2xl border-2 border-secondary/5 rounded-lg shadow p-8 ">
      <div className="flex flex-col">
        <h3 className={"text-3xl " + koulen.className}>{title}</h3>
        <div className="flex flex-row flex-wrap gap-2 items-center">
          <p className="text-xs uppercase font-mono font-bold text-secondary/60">{author}</p>
          <span className="text-sm uppercase font-mono font-bold text-secondary/80">&bull;</span>
          <p className="text-xs uppercase font-mono font-bold text-secondary/60"><PostTime date={new Date(date)} /></p>
        </div>
        <p className='max-w-prose leading-8'>{description}</p>

        <Link href={`/notepad/${id}`} className="btn btn-sm normal-case btn-primary w-max flex flex-row gap-2 items-center shadow-sm mt-4">
          Read
          <ArrowRightIcon className="h-4 w-4" strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  )
}

function Posts({ posts }: { posts: any[] }) {

  return (
    <div className="flex flex-col gap-8">
      {posts}
    </div>
  )
}

export default async function Notepad() {
  const posts = (await getPostNames()).map(async (post) => {
    const content = await getPostContent({ id: post.id });

    if (!content) return (<></>);

    const { data } = matter(content);

    return (
      <Post key={post.id} id={post.id} title={data.title} description={data.description} date={data.date} author={data.author} />
    )
  });


  return (
    <div className="flex flex-col items-center py-16">
      <div className="w-full max-w-6xl px-4 md:px-16">
        <Breadcrumbs crumbs={[{url: '/', label: 'Home'}, {url: '/notepad', label: 'Notepad'}]} />

        <div className="mt-8">
          <h1 className={"text-6xl md:text-8xl " + koulen.className}>Notepad</h1>

          <div className="mt-8">
            <Posts posts={await Promise.all(posts)} />
          </div>

          <p className="flex flex-row gap-2 justify-center lg:justify-start items-center text-secondary/40 text-sm font-bold mt-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 fill-secondary/40" viewBox="0 0 640 512"><path d="M352 124.5l-51.9-13c-6.5-1.6-11.3-7.1-12-13.8s2.8-13.1 8.7-16.1l40.8-20.4L294.4 28.8c-5.5-4.1-7.8-11.3-5.6-17.9S297.1 0 304 0H416h32 16c30.2 0 58.7 14.2 76.8 38.4l57.6 76.8c6.2 8.3 9.6 18.4 9.6 28.8c0 26.5-21.5 48-48 48H538.5c-17 0-33.3-6.7-45.3-18.7L480 160H448v21.5c0 24.8 12.8 47.9 33.8 61.1l106.6 66.6c32.1 20.1 51.6 55.2 51.6 93.1C640 462.9 590.9 512 530.2 512H496 432 32.3c-3.3 0-6.6-.4-9.6-1.4C13.5 507.8 6 501 2.4 492.1C1 488.7 .2 485.2 0 481.4c-.2-3.7 .3-7.3 1.3-10.7c2.8-9.2 9.6-16.7 18.6-20.4c3-1.2 6.2-2 9.5-2.2L433.3 412c8.3-.7 14.7-7.7 14.7-16.1c0-4.3-1.7-8.4-4.7-11.4l-44.4-44.4c-30-30-46.9-70.7-46.9-113.1V181.5v-57zM512 72.3c0-.1 0-.2 0-.3s0-.2 0-.3v.6zm-1.3 7.4L464.3 68.1c-.2 1.3-.3 2.6-.3 3.9c0 13.3 10.7 24 24 24c10.6 0 19.5-6.8 22.7-16.3zM130.9 116.5c16.3-14.5 40.4-16.2 58.5-4.1l130.6 87V227c0 32.8 8.4 64.8 24 93H112c-6.7 0-12.7-4.2-15-10.4s-.5-13.3 4.6-17.7L171 232.3 18.4 255.8c-7 1.1-13.9-2.6-16.9-9s-1.5-14.1 3.8-18.8L130.9 116.5z"/></svg>
            Here be dragons.
          </p>
        </div>
      </div>
    </div>
  );
}