import Link from 'next/link'
import Image from 'next/image'
import Marquee from 'react-fast-marquee'
import { ArrowRight, Sparkles, Star, Shield, Globe, Zap } from 'lucide-react'
import TileCard from '@/components/TileCard'
import TileShowcase from '@/components/TileShowcase'

const FALLBACK = [
  { id:'tile_001', title:'Ceramic Blue Glaze', category:'ceramic', price:45.99, currency:'USD', dimensions:'60x60 cm', material:'Ceramic', image:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', tags:['Blue','Glossy','Handmade'], inStock:true },
  { id:'tile_002', title:'Marble Arabesque', category:'marble', price:120.00, currency:'USD', dimensions:'30x30 cm', material:'Carrara Marble', image:'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=800&q=80', tags:['White','Marble','Geometric'], inStock:true },
  { id:'tile_003', title:'Terracotta Rustic', category:'terracotta', price:32.50, currency:'USD', dimensions:'45x45 cm', material:'Terracotta', image:'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', tags:['Earthy','Rustic','Warm'], inStock:true },
  { id:'tile_004', title:'Midnight Geometric', category:'porcelain', price:78.00, currency:'USD', dimensions:'60x60 cm', material:'Porcelain', image:'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=800&q=80', tags:['Black','Geometric','Minimalist'], inStock:true },
]

async function getFeatured() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://tiles-gallery-server-2.onrender.com/tiles'}/tiles?featured=true&_limit=4`, { next: { revalidate: 60 } })
    if (!res.ok) throw new Error()
    return await res.json()
  } catch { return FALLBACK }
}

const marqueeItems = [
  '✦ New Arrivals: Sage Zellige Collection',
  '✦ Weekly Feature: Modern Geometric Patterns',
  '✦ Join the Community of Interior Enthusiasts',
  '✦ Handcrafted Terracotta from Tuscany',
  '✦ Exclusive Moroccan Zellige Now In Stock',
  '✦ Free Samples on Orders Over $200',
  '✦ New: Portuguese Azulejo Collection',
]

const stats = [
  { value: '500+', label: 'Tile Collections' },
  { value: '40+', label: 'Master Artisans' },
  { value: '18', label: 'Countries' },
  { value: '12K+', label: 'Happy Clients' },
]

const features = [
  { icon: Star, title: 'Artisan Craftsmanship', desc: 'Every tile is sourced directly from master artisans who have perfected their craft over generations.', color: 'from-amber-400 to-orange-400' },
  { icon: Globe, title: 'Global Sourcing', desc: 'From Moroccan zellige to Italian marble — we travel the world to bring you authentic materials.', color: 'from-emerald-400 to-teal-500' },
  { icon: Shield, title: 'Curated Quality', desc: 'Our design experts personally vet each collection for beauty, durability, and architectural integrity.', color: 'from-indigo-400 to-violet-500' },
  { icon: Zap, title: 'Fast Delivery', desc: 'Premium tiles shipped safely to your door within 3-5 business days, fully insured.', color: 'from-rose-400 to-pink-500' },
]

export default async function HomePage() {
  const featured = await getFeatured()
  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden hero-gradient">
        {/* Decorative blobs */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-300/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left text */}
          <div className="animate-[fadeUp_0.7s_ease_forwards]">
            <div className="section-badge mb-6 animate__animated animate__fadeInDown">✦ Curated Collection 2025</div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 text-indigo-950 animate__animated animate__fadeInUp" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Discover Your<br />
              <span className="gradient-text">Perfect</span><br />
              Aesthetic
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed mb-10 max-w-md animate__animated animate__fadeInUp animate__delay-1s">
              Premium tiles from the world's finest artisans. Every surface, a masterpiece. Find your style from over 500 curated collections.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/all-tiles" className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-base">
                Browse Now <ArrowRight size={18} />
              </Link>
              <a href="#featured" className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-indigo-200 text-indigo-700 font-semibold rounded-xl hover:border-indigo-400 hover:bg-indigo-50 transition-all text-base">
                View Featured
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mt-14 pt-10 border-t border-indigo-200/60">
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <div className="text-2xl font-bold text-indigo-700" style={{ fontFamily: 'Poppins, sans-serif' }}>{value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: floating tile images */}
          <div className="hidden lg:block relative h-[560px]">
            {/* Main large image */}
            <div className="absolute top-0 right-0 w-72 h-72 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-200 animate-[float_6s_ease-in-out_infinite] border-4 border-white">
              <Image src="https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=600&q=80" alt="marble tile" fill className="object-cover" />
            </div>
            <div className="absolute top-36 left-0 w-52 h-52 rounded-3xl overflow-hidden shadow-xl shadow-violet-200 animate-[float_6s_ease-in-out_1.5s_infinite] border-4 border-white">
              <Image src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80" alt="blue tile" fill className="object-cover" />
            </div>
            <div className="absolute bottom-0 right-16 w-60 h-60 rounded-3xl overflow-hidden shadow-2xl shadow-amber-200 animate-[float_6s_ease-in-out_3s_infinite] border-4 border-white">
              <Image src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&q=80" alt="terracotta tile" fill className="object-cover" />
            </div>
            <div className="absolute bottom-20 left-10 w-36 h-36 rounded-2xl overflow-hidden shadow-lg shadow-emerald-200 animate-[float_5s_ease-in-out_0.8s_infinite] border-3 border-white">
              <Image src="https://images.unsplash.com/photo-1567521464027-f127ff144326?w=400&q=80" alt="zellige tile" fill className="object-cover" />
            </div>

            {/* Floating badge */}
            <div className="absolute top-64 right-4 bg-white rounded-2xl shadow-xl shadow-indigo-100 p-4 border border-indigo-100 animate-[float_4s_ease-in-out_2s_infinite]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center">⭐</div>
                <div>
                  <p className="text-xs font-bold text-slate-800">4.9 Rating</p>
                  <p className="text-xs text-slate-400">12K+ Reviews</p>
                </div>
              </div>
            </div>
            <div className="absolute top-10 left-28 bg-white rounded-2xl shadow-xl shadow-indigo-100 p-3 border border-indigo-100 animate-[float_5s_ease-in-out_1s_infinite]">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-indigo-500" />
                <span className="text-xs font-bold text-slate-700">New Arrivals</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="py-4 overflow-hidden" style={{ background: 'linear-gradient(90deg, #6366f1, #7c3aed)' }}>
        <Marquee speed={45} gradient={false}>
          {marqueeItems.map((item, i) => (
            <span key={i} className="text-white text-sm font-semibold mx-10">{item}</span>
          ))}
        </Marquee>
      </div>

      {/* ── FEATURED TILES ── */}
      <section id="featured" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="section-badge mb-4 animate__animated animate__fadeIn">✦ Editor's Pick</div>
            <h2 className="text-4xl md:text-5xl font-bold text-indigo-950" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Featured <span className="gradient-text">Tiles</span>
            </h2>
            <p className="text-slate-500 mt-3 max-w-lg">Hand-selected by our curators — tiles that define spaces and tell stories.</p>
          </div>
          <Link href="/all-tiles" className="flex items-center gap-2 text-indigo-600 font-semibold hover:gap-3 transition-all whitespace-nowrap hover:text-indigo-800">
            View all tiles <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(tile => <TileCard key={tile.id} tile={tile} />)}
        </div>
      </section>

      {/* ── SWIPER SHOWCASE ── */}
      <TileShowcase />

      {/* ── FEATURES ── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="section-badge mb-4 mx-auto w-fit">✦ Our Promise</div>
          <h2 className="text-4xl md:text-5xl font-bold text-indigo-950" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Why Choose <span className="gradient-text">TilesGallery?</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="bg-white rounded-2xl p-6 border border-indigo-100 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1 group">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                <Icon size={22} className="text-white" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 mx-4 sm:mx-8 lg:mx-16 mb-16 rounded-3xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg,#6366f1 0%,#7c3aed 50%,#6366f1 100%)' }}>
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="relative text-center px-4 py-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Ready to transform your space?
          </h2>
          <p className="text-indigo-200 text-lg mb-10 max-w-xl mx-auto">
            Browse our full collection of over 500 premium tiles from artisans worldwide.
          </p>
          <Link href="/all-tiles" className="inline-flex items-center gap-2 px-10 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-all hover:-translate-y-1 shadow-2xl text-base">
            Explore All Tiles <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
