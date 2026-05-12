export default function Loading() {
  return (
    <div className="min-h-screen" style={{ background: '#f8faff' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="h-5 w-32 shimmer rounded-xl mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="aspect-square shimmer rounded-3xl mb-4" />
            <div className="flex gap-3">
              {[1,2,3].map(i => <div key={i} className="w-20 h-20 shimmer rounded-2xl" />)}
            </div>
          </div>
          <div className="space-y-5 py-2">
            <div className="h-7 w-28 shimmer rounded-full" />
            <div className="h-14 w-4/5 shimmer rounded-2xl" />
            <div className="h-5 w-52 shimmer rounded-xl" />
            <div className="h-14 w-36 shimmer rounded-2xl" />
            <div className="space-y-2">
              {[1,2,3].map(i => <div key={i} className="h-4 shimmer rounded-xl" />)}
            </div>
            <div className="h-36 shimmer rounded-2xl" />
            <div className="flex gap-2">
              {[1,2,3,4].map(i => <div key={i} className="h-8 w-20 shimmer rounded-xl" />)}
            </div>
            <div className="flex gap-3 pt-2">
              <div className="flex-1 h-14 shimmer rounded-2xl" />
              <div className="flex-1 h-14 shimmer rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
