import Breadcrumbs from "../Breadcrumbs";

import { Koulen } from "next/font/google";

const koulen = Koulen({
  subsets: ["latin"],
  weight: ["400"],
});

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export default function PostLayout({ url, children, title, date, tags }: { url: { url: string, label: string }, children: any, title: string, date: string, tags?: string[] }) {
  return (
    <div className="flex flex-col items-center py-16">
      <div className="w-full max-w-6xl px-4 md:px-16">
        <Breadcrumbs crumbs={[{url: '/', label: 'Home'}, {url: '/notepad', label: 'Notepad'}, url]} />
        <div className="mt-8">
          <h1 className={"text-6xl md:text-7xl tracking-wider " + koulen.className}>{title}</h1>
          <p className="text-secondary/80 italic">Posted on {formatDate(new Date(date))}</p>

          <div className="mt-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}