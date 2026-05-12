'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { Menu, X, LogOut, User, Sparkles, ChevronDown } from 'lucide-react'

export default function Navbar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [userMenu, setUserMenu] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { href: '/', label: 'Home' },
    { href: '/all-tiles', label: 'All Tiles' },
    { href: '/my-profile', label: 'My Profile' },
  ]

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-indigo-100/60 border-b border-indigo-100' : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
              <Sparkles size={17} className="text-white" />
            </div>
            <span className="font-bold text-xl text-indigo-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Tiles<span className="text-indigo-500">Gallery</span>
            </span>
          </Link>

          {/* Center Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map(({ href, label }) => (
              <Link key={href} href={href}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  pathname === href
                    ? 'bg-indigo-50 text-indigo-600 font-semibold shadow-sm shadow-indigo-100'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/70'
                }`}>
                {label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <div className="relative">
                <button onClick={() => setUserMenu(!userMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-indigo-50 transition-all">
                  <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-indigo-200">
                    {session.user.image ? (
                      <Image src={session.user.image} alt="avatar" width={32} height={32} className="object-cover w-full h-full" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{session.user.name?.[0]?.toUpperCase()}</span>
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-medium text-slate-700 max-w-[90px] truncate">{session.user.name?.split(' ')[0]}</span>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform ${userMenu ? 'rotate-180' : ''}`} />
                </button>
                {userMenu && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-2xl shadow-indigo-100 border border-indigo-100 overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-xs text-slate-400 mb-0.5">Signed in as</p>
                      <p className="text-sm font-semibold text-slate-700 truncate">{session.user.email}</p>
                    </div>
                    <Link href="/my-profile" onClick={() => setUserMenu(false)}
                      className="flex items-center gap-2.5 px-4 py-3 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                      <User size={15} /> My Profile
                    </Link>
                    <button onClick={() => { signOut({ callbackUrl: '/' }); setUserMenu(false) }}
                      className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors border-t border-slate-100">
                      <LogOut size={15} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="btn-primary px-6 py-2.5 text-sm inline-block">Login</Link>
            )}
          </div>

          <button className="md:hidden p-2 rounded-xl hover:bg-indigo-50 text-slate-600" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-indigo-100 py-4">
            <nav className="flex flex-col gap-1 mb-4">
              {links.map(({ href, label }) => (
                <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    pathname === href ? 'bg-indigo-50 text-indigo-600 font-semibold' : 'text-slate-600 hover:bg-indigo-50'
                  }`}>{label}</Link>
              ))}
            </nav>
            {session ? (
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-indigo-200">
                    {session.user.image
                      ? <Image src={session.user.image} alt="a" width={32} height={32} className="object-cover" />
                      : <div className="w-full h-full bg-indigo-500 flex items-center justify-center"><span className="text-white text-xs font-bold">{session.user.name?.[0]}</span></div>}
                  </div>
                  <span className="text-sm font-medium text-slate-700">{session.user.name}</span>
                </div>
                <button onClick={() => { signOut({ callbackUrl: '/' }); setMobileOpen(false) }}
                  className="flex items-center gap-1 text-sm text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-50">
                  <LogOut size={14} /> Logout
                </button>
              </div>
            ) : (
              <Link href="/login" onClick={() => setMobileOpen(false)}
                className="btn-primary block text-center py-3 mx-2 text-sm">Login</Link>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
