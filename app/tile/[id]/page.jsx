import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Tag, Ruler, Package2, CheckCircle2, XCircle, User2, Sparkles } from 'lucide-react'

const ALL = [
  { id:'tile_001', title:'Ceramic Blue Glaze', description:'A premium hand-glazed ceramic tile with deep ocean-blue finish. Each piece is unique with subtle variations in tone, evoking the depth and mystery of the sea. Perfect for bathroom feature walls and kitchen backsplashes.', category:'ceramic', price:45.99, currency:'USD', dimensions:'60x60 cm', material:'Ceramic', image:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80', tags:['Blue','Glossy','Handmade','Mediterranean'], inStock:true, creator:'Atelier Bleu', style:'Mediterranean' },
  { id:'tile_002', title:'Marble Arabesque', description:'Inspired by Moorish architecture, this arabesque pattern is precision-cut from premium Carrara marble. The intricate geometric design creates a mesmerizing visual rhythm that transforms any space.', category:'marble', price:120.00, currency:'USD', dimensions:'30x30 cm', material:'Carrara Marble', image:'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=1200&q=80', tags:['White','Marble','Geometric','Luxury'], inStock:true, creator:'Casa Pietra', style:'Moroccan' },
  { id:'tile_003', title:'Terracotta Rustic', description:'Sun-baked terracotta tiles with an authentic rustic finish. Hand-pressed using traditional methods passed down through generations in rural Tuscany.', category:'terracotta', price:32.50, currency:'USD', dimensions:'45x45 cm', material:'Terracotta', image:'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80', tags:['Earthy','Rustic','Terracotta','Warm'], inStock:true, creator:'Fabbrica Toscana', style:'Rustic' },
  { id:'tile_004', title:'Midnight Geometric', description:'Bold contemporary geometry in deep charcoal and matte black. These tiles create dramatic, high-contrast patterns perfect for modern minimalist interiors.', category:'porcelain', price:78.00, currency:'USD', dimensions:'60x60 cm', material:'Porcelain', image:'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=1200&q=80', tags:['Black','Geometric','Minimalist','Matte'], inStock:true, creator:'Studio Nero', style:'Minimalist' },
  { id:'tile_005', title:'Sage Zellige', description:'Handcrafted Zellige tiles in muted sage green with the characteristic irregular surface of this ancient Moroccan craft. Each tile is individually cut and hand-placed by skilled artisans.', category:'zellige', price:95.00, currency:'USD', dimensions:'10x10 cm', material:'Fired Clay', image:'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=1200&q=80', tags:['Green','Zellige','Handmade','Artisan'], inStock:true, creator:'Maison Zellige', style:'Moroccan' },
  { id:'tile_006', title:'Travertine Wave', description:'Natural travertine with flowing vein patterns that mimic the gentle undulation of ocean waves. Quarried from ancient Roman deposits, each tile tells a geological story.', category:'stone', price:89.99, currency:'USD', dimensions:'60x30 cm', material:'Travertine', image:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80', tags:['Beige','Natural Stone','Veined','Classic'], inStock:true, creator:'Pietra Viva', style:'Natural' },
  { id:'tile_007', title:'Encaustic Bloom', description:'Victorian-inspired encaustic cement tiles with an intricate floral motif. Made using 19th century techniques with modern pigments for exceptional colorfastness.', category:'encaustic', price:65.00, currency:'USD', dimensions:'20x20 cm', material:'Cement', image:'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80', tags:['Floral','Colorful','Victorian','Cement'], inStock:false, creator:'Cementos Arte', style:'Victorian' },
  { id:'tile_008', title:'Onyx Luxe', description:'Rare book-matched onyx tiles with dramatic translucent properties. When backlit, these tiles reveal extraordinary internal patterns. A true luxury material.', category:'stone', price:250.00, currency:'USD', dimensions:'60x60 cm', material:'Onyx', image:'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80', tags:['Gold','Onyx','Luxury','Translucent'], inStock:true, creator:'Luxury Stone Co.', style:'Luxury' },
  { id:'tile_009', title:'Nordic Matte White', description:'Clean, calming Scandinavian-inspired matte white tiles with a subtle textured surface. The slight irregularity catches light throughout the day, creating a serene atmosphere.', category:'ceramic', price:38.00, currency:'USD', dimensions:'75x25 cm', material:'Ceramic', image:'https://images.unsplash.com/photo-1583845112239-97ef1341b271?w=1200&q=80', tags:['White','Matte','Minimalist','Nordic'], inStock:true, creator:'Norr Studio', style:'Scandinavian' },
  { id:'tile_010', title:'Azulejo Lisboa', description:'Hand-painted Portuguese azulejo tiles reinterpreted for modern spaces. The cobalt blue patterns on crisp white backgrounds draw from centuries of Iberian decorative tradition.', category:'ceramic', price:58.00, currency:'USD', dimensions:'15x15 cm', material:'Ceramic', image:'https://images.unsplash.com/photo-1597696929736-6d13bed8e6a8?w=1200&q=80', tags:['Blue','Hand-painted','Traditional','Azulejo'], inStock:true, creator:'Fabrica Lisboa', style:'Portuguese' },
  { id:'tile_011', title:'Lava Stone Basalt', description:'Volcanic basalt tiles with a raw, elemental character. Formed from cooled lava flows. Highly durable and naturally slip-resistant.', category:'stone', price:110.00, currency:'USD', dimensions:'40x40 cm', material:'Basalt', image:'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=1200&q=80', tags:['Black','Volcanic','Raw','Natural'], inStock:true, creator:'Terra Vulcania', style:'Industrial' },
  { id:'tile_012', title:'Rose Quartz Mosaic', description:'Delicate mosaic tiles in blush and rose quartz tones. Each tiny piece is individually placed to create soft, shimmering surfaces that glow with warmth.', category:'mosaic', price:145.00, currency:'USD', dimensions:'30x30 cm', material:'Glass & Stone', image:'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200&q=80', tags:['Pink','Mosaic','Luxury','Shimmer'], inStock:true, creator:'Mosaico Arte', style:'Contemporary' },
]

async function getTile(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://tiles-gallery-server-2.onrender.com'}/tiles/${id}`, { next: { revalidate: 60 } })
    if (!res.ok) throw new Error()
    return await res.json()
  } catch { return ALL.find(t => t.id === id) || null }
}

export default async function TileDetailPage({ params }) {
  const { id } = await params
  const session = await getServerSession(authOptions)
  if (!session) redirect(`/login?callbackUrl=/tile/${id}`)

  const tile = await getTile(id)
  if (!tile) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-slate-700 mb-2">Tile not found</h2>
        <Link href="/all-tiles" className="text-indigo-600 hover:underline font-semibold">← Back to gallery</Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen" style={{ background: '#f8faff' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <Link href="/all-tiles" className="inline-flex items-center gap-2 text-indigo-500 hover:text-indigo-700 text-sm font-semibold mb-8 group transition-colors">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Gallery
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Image */}
          <div className="animate__animated animate__fadeInLeft">
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-indigo-200 border-4 border-white">
              <Image src={tile.image} alt={tile.title} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
            {/* Thumbnails */}
            <div className="flex gap-3 mt-4">
              {[0, 1, 2].map(i => (
                <div key={i} className={`relative w-20 h-20 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${i === 0 ? 'border-indigo-500 shadow-md shadow-indigo-200' : 'border-slate-200 opacity-60 hover:opacity-100'}`}>
                  <Image src={tile.image} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div className="animate__animated animate__fadeInRight">
            {/* Category */}
            <span className="section-badge mb-4 inline-flex capitalize">{tile.category}</span>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-indigo-950 leading-tight mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {tile.title}
            </h1>

            {/* Creator & Style */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {tile.creator && (
                <div className="flex items-center gap-1.5 text-sm text-slate-500">
                  <User2 size={14} className="text-indigo-400" />
                  by <strong className="text-slate-700 ml-1">{tile.creator}</strong>
                </div>
              )}
              {tile.style && <span className="text-slate-400 text-sm">· {tile.style} Style</span>}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-bold text-indigo-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                ${tile.price.toFixed(2)}
              </span>
              <span className="text-slate-400 text-sm">/ m²</span>
            </div>

            {/* Description */}
            <p className="text-slate-600 leading-relaxed mb-8 text-base">{tile.description}</p>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-3 mb-8 p-5 bg-white rounded-2xl border border-indigo-100 shadow-card">
              {[
                { icon: Ruler, label: 'Dimensions', value: tile.dimensions },
                { icon: Package2, label: 'Material', value: tile.material },
                { icon: tile.inStock ? CheckCircle2 : XCircle, label: 'Availability', value: tile.inStock ? 'In Stock' : 'Out of Stock', color: tile.inStock ? 'text-emerald-600' : 'text-red-500' },
                { icon: Sparkles, label: 'Category', value: tile.category, capitalize: true },
              ].map(({ icon: Icon, label, value, color, capitalize }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={14} className={color || 'text-indigo-500'} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">{label}</p>
                    <p className={`text-sm font-semibold ${color || 'text-slate-700'} ${capitalize ? 'capitalize' : ''}`}>{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tags */}
            {tile.tags && (
              <div className="mb-8">
                <p className="text-xs text-slate-400 uppercase tracking-widest mb-3 font-semibold">Style Tags</p>
                <div className="flex flex-wrap gap-2">
                  {tile.tags.map((tag, i) => (
                    <span key={tag} className="flex items-center gap-1.5 px-3 py-2 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-xl border border-indigo-100 hover:bg-indigo-100 transition-colors cursor-default animate__animated animate__zoomIn" style={{ animationDelay: `${i * 0.08}s`, animationFillMode: 'both' }}>
                      <Tag size={11} /> {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button disabled={!tile.inStock}
                className={`flex-1 py-4 font-bold rounded-2xl text-center transition-all text-sm ${
                  tile.inStock ? 'btn-primary' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}>
                {tile.inStock ? '🛒 Request Sample' : 'Out of Stock'}
              </button>
              
              <button className="flex-1 py-4 font-bold rounded-2xl border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-400 transition-all text-sm">
                ♡ Save to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
