'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation, EffectCoverflow } from 'swiper/modules'
import { ArrowRight, Tag } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-coverflow'

const slides = [
  { id: 'tile_002', title: 'Marble Arabesque', category: 'Marble', style: 'Moroccan', image: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=800&q=80', price: 120.00, tags: ['White', 'Geometric', 'Luxury'] },
  { id: 'tile_005', title: 'Sage Zellige', category: 'Zellige', style: 'Moroccan', image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&q=80', price: 95.00, tags: ['Green', 'Handmade', 'Artisan'] },
  { id: 'tile_008', title: 'Onyx Luxe', category: 'Stone', style: 'Luxury', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', price: 250.00, tags: ['Gold', 'Translucent', 'Rare'] },
  { id: 'tile_010', title: 'Azulejo Lisboa', category: 'Ceramic', style: 'Portuguese', image: 'https://images.unsplash.com/photo-1597696929736-6d13bed8e6a8?w=800&q=80', price: 58.00, tags: ['Blue', 'Hand-painted', 'Heritage'] },
  { id: 'tile_004', title: 'Midnight Geometric', category: 'Porcelain', style: 'Minimalist', image: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=800&q=80', price: 78.00, tags: ['Black', 'Bold', 'Modern'] },
  { id: 'tile_001', title: 'Ceramic Blue Glaze', category: 'Ceramic', style: 'Mediterranean', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', price: 45.99, tags: ['Blue', 'Glossy', 'Artisan'] },
]

export default function TileShowcase() {
  return (
    <section className="py-24 overflow-hidden" style={{ background: 'linear-gradient(135deg,#e0e7ff 0%,#ede9fe 50%,#ddd6fe 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <div className="section-badge mb-4 mx-auto w-fit">✦ Swiper Showcase</div>
        <h2 className="text-3xl md:text-5xl font-bold text-indigo-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Explore Our <span className="gradient-text">Collections</span>
        </h2>
        <p className="text-slate-500 max-w-xl mx-auto">
          Swipe through our most celebrated tiles — from ancient Moroccan craft to cutting-edge contemporary design.
        </p>
      </div>

      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        coverflowEffect={{ rotate: 25, stretch: 0, depth: 100, modifier: 1, slideShadows: true }}
        autoplay={{ delay: 2800, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={true}
        loop={true}
        style={{ '--swiper-pagination-color': '#6366f1', '--swiper-navigation-color': '#6366f1', '--swiper-navigation-size': '20px', paddingBottom: '50px' }}
      >
        {slides.map(tile => (
          <SwiperSlide key={tile.id} style={{ width: '320px' }}>
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl shadow-indigo-200/50 border border-indigo-100 group mx-2">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={tile.image} alt={tile.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="320px" />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 text-indigo-600 text-xs font-semibold rounded-full">{tile.category}</span>
              </div>
              <div className="p-5">
                <h3 className="text-slate-900 font-semibold text-lg mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>{tile.title}</h3>
                <p className="text-slate-400 text-xs mb-3">{tile.style} Style</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tile.tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1 px-2 py-0.5 bg-indigo-50 text-indigo-500 text-xs rounded-lg">
                      <Tag size={9} />{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Poppins, sans-serif' }}>${tile.price.toFixed(2)}</span>
                  <Link href={`/tile/${tile.id}`} className="btn-primary flex items-center gap-1.5 px-4 py-2 text-xs">
                    Details <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
