export function TileCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-indigo-100 shadow-card">
      <div className="aspect-[4/3] shimmer" />
      <div className="p-5 space-y-3">
        <div className="h-5 shimmer rounded-lg w-3/4" />
        <div className="h-3 shimmer rounded-lg w-1/2" />
        <div className="flex gap-2">
          <div className="h-5 shimmer rounded-lg w-14" />
          <div className="h-5 shimmer rounded-lg w-14" />
          <div className="h-5 shimmer rounded-lg w-14" />
        </div>
        <div className="flex justify-between items-center pt-1">
          <div className="h-7 shimmer rounded-lg w-20" />
          <div className="h-8 shimmer rounded-xl w-28" />
        </div>
      </div>
    </div>
  )
}

export function TilesGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => <TileCardSkeleton key={i} />)}
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 relative">
          <div className="absolute inset-0 rounded-full border-2 border-indigo-100" />
          <div className="absolute inset-0 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
        </div>
        <p className="text-sm text-indigo-400 font-medium">Loading tiles...</p>
      </div>
    </div>
  )
}
