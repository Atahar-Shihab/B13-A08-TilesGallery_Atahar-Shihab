import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Tag, CheckCircle, XCircle } from 'lucide-react'

export default function TileCard({ tile }) {
  return (
    <div className="tile-card bg-white rounded-2xl overflow-hidden border border-indigo-100 shadow-card group">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-indigo-50 to-violet-50">
        <Image
          src={tile.image}
          alt={tile.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-indigo-600 text-xs font-semibold rounded-full capitalize shadow-sm">
            {tile.category}
          </span>
        </div>

        {/* Stock badge */}
        <div className="absolute top-3 right-3">
          {tile.inStock ? (
            <span className="flex items-center gap-1 px-2.5 py-1 bg-emerald-500/90 text-white text-xs font-medium rounded-full">
              <CheckCircle size={10} /> In Stock
            </span>
          ) : (
            <span className="flex items-center gap-1 px-2.5 py-1 bg-red-500/90 text-white text-xs font-medium rounded-full">
              <XCircle size={10} /> Sold Out
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-slate-900 text-lg leading-tight mb-1 group-hover:text-indigo-600 transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
          {tile.title}
        </h3>
        <p className="text-xs text-slate-400 font-medium mb-3">{tile.dimensions} · {tile.material}</p>

        {/* Tags */}
        {tile.tags && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tile.tags.slice(0, 3).map(tag => (
              <span key={tag} className="flex items-center gap-1 px-2 py-0.5 bg-indigo-50 text-indigo-500 text-xs rounded-lg font-medium">
                <Tag size={9} />{tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              ${tile.price.toFixed(2)}
            </span>
            <span className="text-xs text-slate-400 ml-1">/m²</span>
          </div>
          <Link href={`/tile/${tile.id}`}
            className="btn-primary flex items-center gap-1.5 px-4 py-2 text-xs">
            View Details <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  )
}
