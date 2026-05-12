export default function Loading() {
  return (
    <div className="min-h-screen" style={{ background: '#f8faff' }}>
      <div className="py-20 relative" style={{ background: 'linear-gradient(135deg,#6366f1,#7c3aed)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-5 w-32 bg-white/20 rounded-full mx-auto mb-5 animate-pulse" />
          <div className="h-14 w-52 bg-white/20 rounded-2xl mx-auto animate-pulse" />
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 pb-20">
        <div className="bg-white rounded-3xl shadow-2xl shadow-indigo-200/50 border border-indigo-100 overflow-hidden">
          <div className="p-8 sm:p-10" style={{ background: 'linear-gradient(135deg,#e0e7ff,#ede9fe)' }}>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-28 h-28 rounded-full shimmer flex-shrink-0" />
              <div className="flex-1 space-y-3 text-center sm:text-left w-full">
                <div className="h-9 w-48 shimmer rounded-2xl mx-auto sm:mx-0" />
                <div className="h-4 w-40 shimmer rounded-xl mx-auto sm:mx-0" />
                <div className="h-7 w-32 shimmer rounded-full mx-auto sm:mx-0" />
              </div>
              <div className="h-12 w-32 shimmer rounded-xl" />
            </div>
          </div>
          <div className="p-8 sm:p-10">
            <div className="h-4 w-44 shimmer rounded-xl mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1,2].map(i => <div key={i} className="h-20 shimmer rounded-2xl" />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
