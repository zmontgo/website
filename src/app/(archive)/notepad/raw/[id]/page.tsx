// Like /notepad/[id], but without styling. Just a text document with one anchor link at the top.

import Link from "next/link";

import { Metadata } from "next";

import matter from "gray-matter";
import { getPostContent, getPostNames } from "@/lib/posts";

import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams(): Promise<{ id: string }[]> {
  return getPostNames();
}

export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  const post = await getPostContent({ id: params.id });

  if (!post) {
    return {
      title: 'Post not found',
      description: 'Sorry about that! Either it never existed, or something mysterious happened.',
    };
  }

  const { data } = matter(post);

  return {
    title: data.title,
    description: `Raw text of ${data.title} by ${data.author}, for accessibility or archival purposes.`,
  }
}

export default async function Post({ params }: { params: { id: string } }) {
  const post = await getPostContent({ id: params.id });

  if (!post) {
    return (
      <>
        <h1>Post not found.</h1>
        <p>Sorry about that! Either it never existed, or something mysterious happened. For now, you can <Link href='/notepad' className='text-secondary underline'>go back</Link>.</p>
      </>
    );
  }

  const { data, content } = matter(post);
  const { title, author, date } = data;

  return (
    <>
      <Link href='/notepad' className='text-secondary underline'>Go back</Link>
    
      <h1>{title}</h1>
      <h2>A post by {author}</h2>
      <h3>Posted <span className="font-mono">{new Date(date).toISOString()}</span></h3>

      { /* This is a promise, but since it's a JSX component, we can't await it. */ }
      { /* Support for this is coming in the next version of Next, but for now, we disable typescript's error. */ }
      {/* @ts-ignore */}
      <MDXRemote source={content} />
    </>
  )
}