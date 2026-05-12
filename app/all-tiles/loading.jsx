export default function Loading() {
  return (
    <div className="min-h-screen" style={{ background: '#f8faff' }}>
      <div className="py-16" style={{ background: 'linear-gradient(135deg,#e0e7ff,#ede9fe)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-5 w-32 shimmer rounded-full mb-4" />
          <div className="h-14 w-48 shimmer rounded-2xl mb-3" />
          <div className="h-5 w-44 shimmer rounded-xl" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="h-16 w-full shimmer rounded-2xl mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-indigo-100 shadow-sm">
              <div className="aspect-[4/3] shimmer" />
              <div className="p-5 space-y-3">
                <div className="h-5 shimmer rounded-lg w-3/4" />
                <div className="h-3 shimmer rounded-lg w-1/2" />
                <div className="flex gap-2">
                  {[1,2,3].map(j => <div key={j} className="h-5 shimmer rounded-lg w-14" />)}
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-7 shimmer rounded-lg w-20" />
                  <div className="h-9 shimmer rounded-xl w-28" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
