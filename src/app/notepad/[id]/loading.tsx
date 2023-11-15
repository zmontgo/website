import Breadcrumbs from "@/app/Breadcrumbs"

function LoadingBlock({ lines }: { lines: number }) {
  
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: lines - 1 }).map((_, i) => (
        <div key={i} className="bg-secondary/10 w-full max-w-prose h-6 rounded animate-pulse"></div>
      ))}
      <div className="bg-secondary/10 w-96 h-6 rounded animate-pulse"></div>
    </div>
  )
}

export default async function Loading() {
  return (
    <div className="flex flex-col items-center py-16 overflow-y-hidden h-screen">
      <div className="w-full max-w-6xl px-4 md:px-16">
        <div className="bg-secondary/10 w-1/3 h-6 rounded animate-pulse"></div>
        <div className="mt-24">
          <div className="flex flex-col gap-2">
            {/* <h1 className={"text-5xl md:text-6xl lg:text-7xl tracking-wider max-w-lg " + koulen.className}>{title}</h1> */}
            <div className="bg-secondary/10 w-96 h-12 rounded-lg animate-pulse"></div>
            <div className="bg-secondary/10 w-44 h-12 rounded-lg animate-pulse"></div>
            <div className="flex flex-row flex-wrap gap-2 items-center mt-2">
              <div className="bg-secondary/10 w-20 h-4 rounded animate-pulse"></div>
              <div className="bg-secondary/10 w-20 h-4 rounded animate-pulse"></div>
            </div>
          </div>

          <div className="mt-8 relative flex flex-col gap-8">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-stone-200 z-20"></div>
            <LoadingBlock lines={10} />
            <LoadingBlock lines={10} />
          </div>
        </div>
      </div>
    </div>
  )
}