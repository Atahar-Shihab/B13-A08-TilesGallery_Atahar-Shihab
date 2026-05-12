export default function Loading() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg,#e0e7ff 0%,#f0fdf4 40%,#fef3c7 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <div className="h-7 w-44 shimmer rounded-full" />
          <div className="space-y-3">
            <div className="h-16 w-4/5 shimmer rounded-2xl" />
            <div className="h-16 w-3/5 shimmer rounded-2xl" />
            <div className="h-16 w-2/4 shimmer rounded-2xl" />
          </div>
          <div className="h-5 w-full shimmer rounded-xl" />
          <div className="h-5 w-3/4 shimmer rounded-xl" />
          <div className="flex gap-4">
            <div className="h-14 w-40 shimmer rounded-xl" />
            <div className="h-14 w-40 shimmer rounded-xl" />
          </div>
        </div>
        <div className="hidden lg:grid grid-cols-2 gap-4">
          {[1,2,3,4].map(i => <div key={i} className="aspect-square shimmer rounded-3xl" />)}
        </div>
      </div>
    </div>
  )
}
