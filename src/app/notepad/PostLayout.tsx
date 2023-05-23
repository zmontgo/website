import Breadcrumbs from "../Breadcrumbs";

export default function PostLayout({ url, children, title, description, date, tags }: { url: { url: string, label: string }, children: any, title?: string, description?: string, date?: string, tags?: string[] }) {
  
  return (
    <div className="flex flex-col items-center py-16">
      <div className="w-full max-w-6xl px-4 md:px-16">
        <Breadcrumbs crumbs={[{url: '/', label: 'Home'}, {url: '/notepad', label: 'Notepad'}, url]} />
        <div className="mt-8">
          {children}
        </div>
      </div>
    </div>
  );
}