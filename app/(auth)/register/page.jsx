'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Eye, EyeOff, UserPlus, Mail, Lock, User, Link as LinkIcon, Sparkles, CheckCircle, XCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { ButtonSpinner } from '@/components/Spinner'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', image: '', password: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const passMatch = form.confirm && form.password === form.confirm
  const passNoMatch = form.confirm && form.password !== form.confirm

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) return toast.error('Please fill in all required fields')
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters')
    if (form.password !== form.confirm) return toast.error('Passwords do not match')
    setLoading(true)
    const loadingToast = toast.loading('Creating your account...')
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password, image: form.image }),
      })
      const data = await res.json()
      toast.dismiss(loadingToast)
      if (!res.ok) { toast.error(data.error || 'Registration failed') }
      else {
        toast.success('Account created! Please sign in 🎉')
        router.push('/login')
      }
    } catch {
      toast.dismiss(loadingToast)
      toast.error('Something went wrong. Please try again.')
    }
    finally { setLoading(false) }
  }

  const handleGoogle = async () => {
    setGoogleLoading(true)
    toast.loading('Connecting to Google...')
    try { await signIn('google', { callbackUrl: '/' }) }
    catch {
      toast.dismiss()
      toast.error('Google sign-in failed')
      setGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex">

      {/* Left decorative panel */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#4f46e5 0%,#7c3aed 50%,#6366f1 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px,white 1px,transparent 0)', backgroundSize: '28px 28px' }} />

        {/* Floating tile images */}
        <div className="absolute top-10 right-8 w-52 h-52 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 -rotate-2">
          <Image src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80" alt="tile" fill className="object-cover" />
        </div>
        <div className="absolute top-2/5 left-10 w-40 h-40 rounded-3xl overflow-hidden shadow-xl border-4 border-white/20 rotate-3">
          <Image src="https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=500&q=80" alt="tile" fill className="object-cover" />
        </div>
        <div className="absolute bottom-12 right-16 w-48 h-48 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 rotate-1">
          <Image src="https://images.unsplash.com/photo-1597696929736-6d13bed8e6a8?w=500&q=80" alt="tile" fill className="object-cover" />
        </div>
        <div className="absolute bottom-48 left-6 w-32 h-32 rounded-2xl overflow-hidden shadow-lg border-4 border-white/20 -rotate-3">
          <Image src="https://images.unsplash.com/photo-1567521464027-f127ff144326?w=400&q=80" alt="tile" fill className="object-cover" />
        </div>

        <div className="relative z-10 p-16 flex flex-col justify-end">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 rounded-full mb-5 w-fit">
            <Sparkles size={12} className="text-white" />
            <span className="text-white/80 text-xs font-semibold uppercase tracking-widest">Join the Community</span>
          </div>
          <h2 className="text-white text-3xl font-bold leading-tight mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Join thousands of<br />design enthusiasts
          </h2>
          <p className="text-white/55 text-sm max-w-xs leading-relaxed">
            Get access to exclusive collections, save your favorites, and connect with artisans from around the world.
          </p>
          {/* Perks */}
          <div className="flex flex-col gap-3 mt-8">
            {['Access 500+ premium tile collections', 'Save favorites & create wishlists', 'Connect with global artisans'].map(perk => (
              <div key={perk} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={12} className="text-white" />
                </div>
                <span className="text-white/70 text-sm">{perk}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-[500px] flex items-center justify-center p-8 overflow-y-auto" style={{ background: '#f8faff' }}>
        <div className="w-full max-w-sm py-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200">
              <Sparkles size={17} className="text-white" />
            </div>
            <span className="font-bold text-xl text-indigo-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Tiles<span className="text-indigo-500">Gallery</span>
            </span>
          </Link>

          <h1 className="text-3xl font-bold text-indigo-950 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Create account ✨</h1>
          <p className="text-slate-500 text-sm mb-8">Join the gallery community today</p>

          {/* Google */}
          <button onClick={handleGoogle} disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 py-3.5 bg-white border-2 border-slate-200 rounded-xl text-slate-700 text-sm font-semibold hover:border-indigo-300 hover:bg-indigo-50/50 transition-all mb-6 disabled:opacity-60 shadow-sm">
            {googleLoading ? <ButtonSpinner /> : (
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 002.38-5.88c0-.57-.05-.66-.15-1.18z"/>
                <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 01-7.18-2.54H1.83v2.07A8 8 0 008.98 17z"/>
                <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 010-3.04V5.41H1.83a8 8 0 000 7.18l2.67-2.07z"/>
                <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 001.83 5.4L4.5 7.49a4.77 4.77 0 014.48-3.31z"/>
              </svg>
            )}
            Sign up with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400 font-medium">or register with email</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 animate__animated animate__fadeInUp animate__faster">

            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                Full Name <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300" />
                <input type="text" value={form.name} onChange={e => set('name', e.target.value)}
                  placeholder="Jane Doe" required
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-indigo-400 transition-all" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                Email Address <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300" />
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                  placeholder="you@example.com" required
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-indigo-400 transition-all" />
              </div>
            </div>

            {/* Photo URL */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                Photo URL <span className="text-slate-300 font-normal normal-case tracking-normal">(optional)</span>
              </label>
              <div className="relative">
                <LinkIcon size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300" />
                <input type="url" value={form.image} onChange={e => set('image', e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-indigo-400 transition-all" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300" />
                <input type={showPass ? 'text' : 'password'} value={form.password} onChange={e => set('password', e.target.value)}
                  placeholder="Min. 6 characters" required
                  className="w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-indigo-400 transition-all" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500 transition-colors">
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {form.password && form.password.length < 6 && (
                <p className="text-xs text-amber-500 mt-1 flex items-center gap-1">
                  <XCircle size={11} /> At least 6 characters required
                </p>
              )}
            </div>

            {/* Confirm password */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                Confirm Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300" />
                <input type="password" value={form.confirm} onChange={e => set('confirm', e.target.value)}
                  placeholder="••••••••" required
                  className={`w-full pl-11 pr-12 py-3.5 bg-slate-50 border rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:bg-white transition-all ${
                    passNoMatch ? 'border-red-300 focus:border-red-400' : passMatch ? 'border-emerald-300 focus:border-emerald-400' : 'border-slate-200 focus:border-indigo-400'
                  }`} />
                {form.confirm && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {passMatch ? <CheckCircle size={15} className="text-emerald-500" /> : <XCircle size={15} className="text-red-400" />}
                  </div>
                )}
              </div>
              {passNoMatch && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <XCircle size={11} /> Passwords do not match
                </p>
              )}
              {passMatch && (
                <p className="text-xs text-emerald-500 mt-1 flex items-center gap-1">
                  <CheckCircle size={11} /> Passwords match
                </p>
              )}
            </div>

            <button type="submit" disabled={loading || passNoMatch}
              className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-sm mt-2 disabled:opacity-60">
              {loading ? <><ButtonSpinner /> Creating account...</> : <><UserPlus size={15} /> Create Account</>}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-indigo-600 font-bold hover:text-indigo-800 hover:underline transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
