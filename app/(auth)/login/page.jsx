import { Suspense } from 'react'
import LoginForm from './LoginForm'
import Image from 'next/image'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export const metadata = { title: 'Login — TilesGallery' }

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex">

      {/* Left decorative panel */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#6366f1 0%,#7c3aed 60%,#4f46e5 100%)' }}>
        {/* dot grid */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px,white 1px,transparent 0)', backgroundSize: '28px 28px' }} />

        {/* Floating tile images */}
        <div className="absolute top-12 right-12 w-56 h-56 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 rotate-3">
          <Image src="https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=600&q=80" alt="tile" fill className="object-cover" />
        </div>
        <div className="absolute top-1/3 left-12 w-44 h-44 rounded-3xl overflow-hidden shadow-xl border-4 border-white/20 -rotate-2">
          <Image src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80" alt="tile" fill className="object-cover" />
        </div>
        <div className="absolute bottom-16 right-20 w-48 h-48 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 rotate-1">
          <Image src="https://images.unsplash.com/photo-1567521464027-f127ff144326?w=500&q=80" alt="tile" fill className="object-cover" />
        </div>

        {/* Text overlay */}
        <div className="relative z-10 p-16 flex flex-col justify-end">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 rounded-full mb-5 w-fit">
            <Sparkles size={12} className="text-white" />
            <span className="text-white/80 text-xs font-semibold uppercase tracking-widest">TilesGallery</span>
          </div>
          <blockquote className="text-white text-3xl font-bold leading-tight mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            "Every tile is a canvas.<br />Every space, a gallery."
          </blockquote>
          <p className="text-white/50 text-sm">Sign in to access your premium tile collection</p>

          {/* Stats row */}
          <div className="flex gap-8 mt-10 pt-8 border-t border-white/15">
            {[['500+','Collections'],['12K+','Members'],['40+','Artisans']].map(([v,l])=>(
              <div key={l}>
                <div className="text-white text-xl font-bold" style={{ fontFamily:'Poppins,sans-serif' }}>{v}</div>
                <div className="text-white/50 text-xs mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-[480px] flex items-center justify-center p-8" style={{ background: '#f8faff' }}>
        <div className="w-full max-w-sm">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 mb-10">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200">
              <Sparkles size={17} className="text-white" />
            </div>
            <span className="font-bold text-xl text-indigo-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Tiles<span className="text-indigo-500">Gallery</span>
            </span>
          </Link>

          <h1 className="text-3xl font-bold text-indigo-950 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Welcome back 👋</h1>
          <p className="text-slate-500 text-sm mb-8">Sign in to access your gallery</p>

          <Suspense fallback={
            <div className="space-y-4">
              <div className="h-12 shimmer rounded-xl" />
              <div className="h-12 shimmer rounded-xl" />
              <div className="h-12 shimmer rounded-xl" />
            </div>
          }>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
