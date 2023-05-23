import Breadcrumbs from "../Breadcrumbs";
import PostTime from "./PostTime";

import { Koulen } from "next/font/google";

const koulen = Koulen({
  subsets: ["latin"],
  weight: ["400"],
});

export interface AccessibilityOptions {
  dyslexiaFriendly?: boolean;
  highContrast?: boolean;
  largeText?: boolean;
  noAnimations?: boolean;
  noImages?: boolean;
  noJavascript?: boolean;
  noStyles?: boolean;
}

export default function PostLayout({ url, children, title, author, date, tags, accessibilityOptions }: { url: { url: string, label: string }, children: any, title: string, author: string, date: string, tags?: string[], accessibilityOptions?: AccessibilityOptions }) {
  return (
    <div className={"flex flex-col items-center py-16 " + (accessibilityOptions?.highContrast ? "bg-white text-black" : "")}>
      <div className="w-full max-w-6xl px-4 md:px-16">
        <Breadcrumbs crumbs={[{url: '/', label: 'Home'}, {url: '/notepad', label: 'Notepad'}, url]} />
        <div className="mt-8">
          <h1 className={"text-5xl md:text-6xl lg:text-7xl tracking-wider " + koulen.className}>{title}</h1>
          <h2 className={"text-xl md:text-2xl tracking-widest text-secondary/90 fauxbold " + koulen.className}>A post by {author}</h2>
          <h3 className="text-sm uppercase font-mono font-bold text-secondary/60"><PostTime date={new Date(date)} /></h3>

          <div className="mt-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}