'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, LogIn, Mail, Lock } from 'lucide-react'
import toast from 'react-hot-toast'
import { ButtonSpinner } from '@/components/Spinner'

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) return toast.error('Please fill in all fields')

    setLoading(true)
    const loadingToast = toast.loading('Signing you in...')

    try {
      const res = await signIn('credentials', { email: form.email, password: form.password, redirect: false })
      toast.dismiss(loadingToast)
      if (res.error) {
        toast.error(res.error === 'CredentialsSignin' ? 'Invalid email or password' : res.error)
      } else {
        toast.success('Welcome back! 🎉')
        router.push(callbackUrl)
        router.refresh()
      }
    } catch {
      toast.dismiss(loadingToast)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setGoogleLoading(true)
    toast.loading('Connecting to Google...')
    try { await signIn('google', { callbackUrl }) }
    catch {
      toast.dismiss()
      toast.error('Google sign-in failed')
      setGoogleLoading(false)
    }
  }

  return (
    <div className="animate__animated animate__fadeInUp animate__faster">
      {/* Google */}
      <button onClick={handleGoogle} disabled={googleLoading}
        className="w-full flex items-center justify-center gap-3 py-3.5 bg-white border-2 border-slate-200 rounded-xl text-slate-700 text-sm font-semibold hover:border-indigo-300 hover:bg-indigo-50/50 transition-all mb-6 disabled:opacity-60 shadow-sm animate__animated animate__fadeInDown">
        {googleLoading ? <ButtonSpinner /> : (
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 002.38-5.88c0-.57-.05-.66-.15-1.18z"/>
            <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 01-7.18-2.54H1.83v2.07A8 8 0 008.98 17z"/>
            <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 010-3.04V5.41H1.83a8 8 0 000 7.18l2.67-2.07z"/>
            <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 001.83 5.4L4.5 7.49a4.77 4.77 0 014.48-3.31z"/>
          </svg>
        )}
        Continue with Google
      </button>
      

      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-slate-200" />
        <span className="text-xs text-slate-400 font-medium">or sign in with email</span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="animate__animated animate__fadeInLeft animate__delay-100">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Email Address</label>
          <div className="relative">
            <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300" />
            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com" required
              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-indigo-400 transition-all" />
          </div>
        </div>

        <div className="animate__animated animate__fadeInLeft animate__delay-200">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Password</label>
          <div className="relative">
            <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300" />
            <input type={showPass ? 'text' : 'password'} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••" required
              className="w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-indigo-400 transition-all" />
            <button type="button" onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500 transition-colors">
              {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        <div className="animate__animated animate__fadeInUp animate__delay-300">
          <button type="submit" disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-sm disabled:opacity-60">
            {loading ? <><ButtonSpinner /> Signing in...</> : <><LogIn size={15} /> Sign In</>}
          </button>
        </div>
      </form>

      <p className="text-center text-sm text-slate-500 mt-6 animate__animated animate__fadeIn animate__delay-400">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-indigo-600 font-bold hover:text-indigo-800 hover:underline transition-colors">
          Register here
        </Link>
      </p>
    </div>
  )
}
