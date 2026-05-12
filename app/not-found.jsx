import Link from 'next/link'
import { ArrowLeft, Sparkles, Search, Home } from 'lucide-react'

export default function NotFound() {
  const tiles = [
    { bg: 'from-indigo-400 to-violet-500', delay: '0s' },
    { bg: 'from-amber-400 to-orange-400', delay: '0.2s' },
    { bg: 'from-emerald-400 to-teal-500', delay: '0.4s' },
    { bg: 'from-rose-400 to-pink-500', delay: '0.6s' },
    { bg: 'from-sky-400 to-blue-500', delay: '0.8s' },
    { bg: 'from-violet-400 to-purple-500', delay: '1s' },
    { bg: 'from-indigo-300 to-indigo-500', delay: '1.2s' },
    { bg: 'from-amber-300 to-yellow-400', delay: '1.4s' },
    { bg: 'from-teal-400 to-emerald-500', delay: '1.6s' },
  ]

  return (
    <div className="min-h-[85vh] flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#e0e7ff 0%,#f0fdf4 50%,#fef3c7 100%)' }}>
      <div className="text-center px-4 max-w-lg mx-auto">

        {/* Animated tile grid */}
        <div className="flex justify-center mb-10">
          <div className="grid grid-cols-3 gap-2.5">
            {tiles.map(({ bg, delay }, i) => (
              <div key={i}
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${bg} shadow-lg`}
                style={{ animation: `float 3s ease-in-out ${delay} infinite` }}
              />
            ))}
          </div>
        </div>

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200">
            <Sparkles size={19} className="text-white" />
          </div>
          <span className="font-bold text-2xl text-indigo-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Tiles<span className="text-indigo-500">Gallery</span>
          </span>
        </div>

        {/* 404 */}
        <h1 className="font-bold text-indigo-200 leading-none mb-0" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '140px', lineHeight: 1 }}>
          404
        </h1>

        <h2 className="text-3xl font-bold text-indigo-950 mb-3 -mt-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          This tile is missing
        </h2>

        <p className="text-slate-500 text-base leading-relaxed mb-10 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist, was moved, or was never created.
          Perhaps it was a rare collection that sold out?
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/"
            className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 text-sm">
            <Home size={15} /> Go Home
          </Link>
          <Link href="/all-tiles"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-indigo-200 text-indigo-700 font-semibold rounded-xl hover:border-indigo-400 hover:bg-indigo-50 transition-all text-sm shadow-sm">
            <Search size={15} /> Browse Tiles
          </Link>
        </div>
      </div>
    </div>
  )
}
