'use client'
import { useState, useEffect } from 'react'
import { Search, SlidersHorizontal, X, Grid3x3, List } from 'lucide-react'
import TileCard from '@/components/TileCard'
import { TilesGridSkeleton } from '@/components/LoadingSkeleton'
import { SectionSpinner } from '@/components/Spinner'

export const dynamic = 'force-dynamic'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
const CATS = ['All', 'Ceramic', 'Marble', 'Terracotta', 'Porcelain', 'Zellige', 'Stone', 'Mosaic', 'Encaustic']
const FALLBACK = [
  { id:'tile_001', title:'Ceramic Blue Glaze', category:'ceramic', price:45.99, currency:'USD', dimensions:'60x60 cm', material:'Ceramic', image:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', tags:['Blue','Glossy','Handmade'], inStock:true },
  { id:'tile_002', title:'Marble Arabesque', category:'marble', price:120.00, currency:'USD', dimensions:'30x30 cm', material:'Carrara Marble', image:'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=800&q=80', tags:['White','Marble','Geometric'], inStock:true },
  { id:'tile_003', title:'Terracotta Rustic', category:'terracotta', price:32.50, currency:'USD', dimensions:'45x45 cm', material:'Terracotta', image:'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', tags:['Earthy','Rustic','Warm'], inStock:true },
  { id:'tile_004', title:'Midnight Geometric', category:'porcelain', price:78.00, currency:'USD', dimensions:'60x60 cm', material:'Porcelain', image:'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=800&q=80', tags:['Black','Geometric','Minimalist'], inStock:true },
  { id:'tile_005', title:'Sage Zellige', category:'zellige', price:95.00, currency:'USD', dimensions:'10x10 cm', material:'Fired Clay', image:'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&q=80', tags:['Green','Zellige','Handmade'], inStock:true },
  { id:'tile_006', title:'Travertine Wave', category:'stone', price:89.99, currency:'USD', dimensions:'60x30 cm', material:'Travertine', image:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', tags:['Beige','Natural Stone','Veined'], inStock:true },
  { id:'tile_007', title:'Encaustic Bloom', category:'encaustic', price:65.00, currency:'USD', dimensions:'20x20 cm', material:'Cement', image:'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80', tags:['Floral','Colorful','Victorian'], inStock:false },
  { id:'tile_008', title:'Onyx Luxe', category:'stone', price:250.00, currency:'USD', dimensions:'60x60 cm', material:'Onyx', image:'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', tags:['Gold','Onyx','Luxury'], inStock:true },
  { id:'tile_009', title:'Nordic Matte White', category:'ceramic', price:38.00, currency:'USD', dimensions:'75x25 cm', material:'Ceramic', image:'https://images.unsplash.com/photo-1583845112239-97ef1341b271?w=800&q=80', tags:['White','Matte','Nordic'], inStock:true },
  { id:'tile_010', title:'Azulejo Lisboa', category:'ceramic', price:58.00, currency:'USD', dimensions:'15x15 cm', material:'Ceramic', image:'https://images.unsplash.com/photo-1597696929736-6d13bed8e6a8?w=800&q=80', tags:['Blue','Hand-painted','Traditional'], inStock:true },
  { id:'tile_011', title:'Lava Stone Basalt', category:'stone', price:110.00, currency:'USD', dimensions:'40x40 cm', material:'Basalt', image:'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800&q=80', tags:['Black','Volcanic','Raw'], inStock:true },
  { id:'tile_012', title:'Rose Quartz Mosaic', category:'mosaic', price:145.00, currency:'USD', dimensions:'30x30 cm', material:'Glass & Stone', image:'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80', tags:['Pink','Mosaic','Luxury'], inStock:true },
]

export default function AllTilesPage() {
  const [tiles, setTiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All')
  const [sort, setSort] = useState('default')
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const res = await fetch(`${API}/tiles`)
        if (!res.ok) throw new Error()
        setTiles(await res.json())
      } catch { setTiles(FALLBACK) }
      finally { setLoading(false) }
    }
    load()
  }, [])

  const filtered = tiles
    .filter(t => {
      const s = search.toLowerCase()
      const matchS = t.title.toLowerCase().includes(s) || t.material?.toLowerCase().includes(s) || t.tags?.some(tag => tag.toLowerCase().includes(s))
      const matchC = cat === 'All' || t.category.toLowerCase() === cat.toLowerCase()
      return matchS && matchC
    })
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      if (sort === 'name') return a.title.localeCompare(b.title)
      return 0
    })

  const hasFilters = search || cat !== 'All' || sort !== 'default'

  return (
    <div className="min-h-screen" style={{ background: '#f8faff' }}>
      {/* Header */}
      <div className="relative overflow-hidden py-16" style={{ background: 'linear-gradient(135deg,#e0e7ff 0%,#ede9fe 100%)' }}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-300/20 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="section-badge mb-4">✦ The Collection</div>
          <h1 className="text-4xl md:text-6xl font-bold text-indigo-950 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
            All <span className="gradient-text">Tiles</span>
          </h1>
          <p className="text-slate-500 text-lg">{loading ? 'Loading...' : `${filtered.length} tiles in our collection`}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search & filter bar */}
        <div className="bg-white rounded-2xl p-4 border border-indigo-100 shadow-card mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search by tile name, material, or tag..."
                className="w-full pl-11 pr-10 py-3 bg-indigo-50/60 border border-indigo-100 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:bg-white transition-all" />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X size={14} />
                </button>
              )}
            </div>
            {/* Sort */}
            <select value={sort} onChange={e => setSort(e.target.value)}
              className="px-4 py-3 bg-indigo-50/60 border border-indigo-100 rounded-xl text-sm text-slate-600 cursor-pointer focus:bg-white transition-all">
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="name">Name: A → Z</option>
            </select>
            {/* Filter toggle */}
            <button onClick={() => setFiltersOpen(!filtersOpen)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border transition-all ${
                filtersOpen ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-indigo-50 border-indigo-200 text-indigo-600 hover:bg-indigo-100'
              }`}>
              <SlidersHorizontal size={15} /> Filters
            </button>
          </div>

          {/* Category pills */}
          {filtersOpen && (
            <div className="mt-4 pt-4 border-t border-indigo-100 flex flex-wrap gap-2">
              {CATS.map(c => (
                <button key={c} onClick={() => setCat(c)}
                  className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
                    cat === c ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200' : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
                  }`}>{c}</button>
              ))}
            </div>
          )}
        </div>

        {/* Active filters */}
        {hasFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-slate-500 font-medium">Filters:</span>
            {search && (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full border border-indigo-200">
                "{search}" <button onClick={() => setSearch('')}><X size={10} /></button>
              </span>
            )}
            {cat !== 'All' && (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full border border-indigo-200">
                {cat} <button onClick={() => setCat('All')}><X size={10} /></button>
              </span>
            )}
            <button onClick={() => { setSearch(''); setCat('All'); setSort('default') }}
              className="text-xs text-slate-400 hover:text-red-500 underline ml-auto transition-colors">
              Clear all
            </button>
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <SectionSpinner text="Fetching tiles..." />
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-indigo-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-700 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>No tiles found</h3>
            <p className="text-slate-400 mb-6">Try adjusting your search or filters</p>
            <button onClick={() => { setSearch(''); setCat('All'); setSort('default') }}
              className="btn-primary px-8 py-3">Clear Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((tile, i) => (
              <div key={tile.id} className="animate__animated animate__fadeInUp" style={{ animationDelay: `${i * 0.05}s`, animationFillMode: 'both' }}>
                <TileCard tile={tile} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
