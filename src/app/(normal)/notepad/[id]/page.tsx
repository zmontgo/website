import Image from 'next/image'
import Link from 'next/link'
import { Metadata, ResolvedMetadata } from 'next';

import matter from 'gray-matter';

import { MDXRemote } from 'next-mdx-remote/rsc'

import PostLayout from '../../components/PostLayout'
import FancyLink from '../../components/FancyLink'
import PrismCodeblock from '../../components/PrismCodeblock'

import AccessibilityPanel from '../../components/AccessibilityPanel'
import BackToTop from '../../components/BackToTop'

import { getPostContent, getPostNames } from '@/lib/posts'

import { Koulen, Fira_Code } from 'next/font/google'

import type { AccessibilityOptions } from '../../components/PostLayout';

const koulen = Koulen({
  subsets: ['latin'],
  weight: ['400'],
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400'],
})

const components = {
  a: (props: any) => <FancyLink {...props} />,
  h1: (props: any) => <h1 className={'text-6xl mt-16 mb-4 ' + koulen.className} {...props} />,
  h2: (props: any) => <h2 className={'text-4xl mt-16 mb-2 ' + koulen.className} {...props} />,
  h3: (props: any) => <h3 className={'text-2xl mt-16 mb-1 ' + koulen.className} {...props} />,
  p: (props: any) => <p className='mb-6 max-w-prose leading-8' {...props} />,
  blockquote: (props: any) => <blockquote className='mb-8 max-w-prose leading-10 pl-4 border-l-2 border-secondary font-mono' {...props} />,
  hr: (props: any) => <hr className='my-8 block w-16 h-1 bg-secondary/80 border-none' {...props} />,
  pre: (props: any) => <PrismCodeblock {...props} />,
  code: (props: any) => <code className={'font-mono text-sm bg-codeblocks text-white p-1 rounded ' + firaCode.className} {...props} />,
  ul: (props: any) => <ul className='list-disc flex flex-col gap-3 list-outside ml-6 mb-6' {...props} />,
  ol: (props: any) => <ol className='list-decimal flex flex-col gap-3 list-outside ml-6 mb-6' {...props} />,
  li: (props: any) => <li className='max-w-prose' {...props} />,
  img: (props: any) => <Image {...props} width={800} height={600} className='rounded shadow max-w-full lg:max-w-md' loading='lazy' alt={props.alt || ''} />,
}

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
    description: data.description,
  }
}

export default async function Post({ params }: { params: { id: string } }) {
  const post = await getPostContent({ id: params.id });

  if (!post) {
    return (
      <PostLayout url={{ url: `/notepad/${params.id}`, label: 'Post' }} title='Post not found' date='1970-01-01 00:00'>
        <h1 className={'text-6xl ' + koulen.className}>Post not found.</h1>
        <p className='mt-4'>Sorry about that! Either it never existed, or something mysterious happened. For now, you can <Link href='/notepad' className='text-secondary underline'>go back</Link>.</p>
      </PostLayout>
    );
  }

  const { data, content } = matter(post);
  const { title, author } = data;

  return (
    <PostLayout url={{ url: `/notepad/${params.id}`, label: title}} title={title} author={author} date={data.date} tags={data.tags}>
      <BackToTop />
      { /* This is a promise, but since it's a JSX component, we can't await it. */ }
      { /* Support for this is coming in the next version of Next, but for now, we disable typescript's error. */ }
      {/* @ts-ignore */}
      <MDXRemote source={content} components={components} />
    </PostLayout>
  )
}