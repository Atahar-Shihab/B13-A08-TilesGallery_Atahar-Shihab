import Link from 'next/link'
import { Sparkles, Instagram, Twitter, Facebook, Youtube, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #1e1b4b 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
              <span className="font-bold text-xl text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Tiles<span className="text-indigo-300">Gallery</span>
              </span>
            </Link>
            <p className="text-indigo-200/70 text-sm leading-relaxed mb-6">
              Curating the world's finest tiles — from hand-glazed ceramics to rare natural stones. Every surface tells a story.
            </p>
            <div className="flex gap-2">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-9 h-9 rounded-xl border border-indigo-700 flex items-center justify-center text-indigo-300 hover:bg-indigo-500 hover:border-indigo-500 hover:text-white transition-all duration-200">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Explore</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'All Tiles', href: '/all-tiles' },
                { label: 'My Profile', href: '/my-profile' },
                { label: 'Login', href: '/login' },
                { label: 'Register', href: '/register' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-indigo-200/70 text-sm hover:text-indigo-300 transition-colors flex items-center gap-1.5 group">
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0 transition-all" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Categories</h4>
            <ul className="space-y-3">
              {['Ceramic', 'Marble', 'Terracotta', 'Porcelain', 'Zellige', 'Mosaic', 'Natural Stone'].map(cat => (
                <li key={cat}>
                  <Link href={`/all-tiles?category=${cat.toLowerCase()}`}
                    className="text-indigo-200/70 text-sm hover:text-indigo-300 transition-colors flex items-center gap-1.5 group">
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0 transition-all" />
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Contact Us</h4>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-indigo-400 mt-0.5 flex-shrink-0" />
                <span className="text-indigo-200/70 text-sm">123 Design District, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-indigo-400 flex-shrink-0" />
                <a href="tel:+12125551234" className="text-indigo-200/70 text-sm hover:text-indigo-300 transition-colors">+1 (212) 555-1234</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-indigo-400 flex-shrink-0" />
                <a href="mailto:hello@tilesgallery.com" className="text-indigo-200/70 text-sm hover:text-indigo-300 transition-colors">hello@tilesgallery.com</a>
              </li>
            </ul>
            {/* Newsletter */}
            <div className="bg-white/5 rounded-2xl p-4 border border-indigo-700/40">
              <p className="text-xs text-indigo-200/70 mb-3 font-medium">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <input type="email" placeholder="your@email.com"
                  className="flex-1 bg-white/10 border border-indigo-600/40 rounded-xl px-3 py-2 text-xs text-white placeholder-indigo-300/50 focus:outline-none focus:border-indigo-400" />
                <button className="px-3 py-2 bg-indigo-500 hover:bg-indigo-400 text-white text-xs rounded-xl transition-colors font-medium">Go</button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-indigo-800/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-indigo-300/50 text-xs">© {new Date().getFullYear()} TilesGallery. All rights reserved.</p>
          <div className="flex gap-5">
            {['Privacy Policy', 'Terms', 'Cookies'].map(i => (
              <a key={i} href="#" className="text-indigo-300/50 text-xs hover:text-indigo-300 transition-colors">{i}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
