'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Save, User, Link as LinkIcon, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'
import { ButtonSpinner } from '@/components/Spinner'

export default function UpdateProfilePage() {
  const { data: session, update } = useSession()
  const router = useRouter()
  const [form, setForm] = useState({ name: session?.user?.name || '', image: session?.user?.image || '' })
  const [preview, setPreview] = useState(session?.user?.image || '')
  const [loading, setLoading] = useState(false)

  const handleImg = v => { setForm(p => ({ ...p, image: v })); setPreview(v) }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name.trim()) return toast.error('Name is required')
    setLoading(true)
    const loadingToast = toast.loading('Updating your profile...')
    try {
      const res = await fetch('/api/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name.trim(), image: form.image }),
      })
      const data = await res.json()
      toast.dismiss(loadingToast)
      if (!res.ok) { toast.error(data.error || 'Update failed') }
      else {
        await update({ name: form.name.trim(), image: form.image })
        toast.success('Profile updated successfully! ✅')
        router.push('/my-profile')
        router.refresh()
      }
    } catch {
      toast.dismiss(loadingToast)
      toast.error('Something went wrong.')
    }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen" style={{ background: '#f8faff' }}>
      {/* Hero */}
      <div className="relative py-16 overflow-hidden" style={{ background: 'linear-gradient(135deg,#6366f1 0%,#7c3aed 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px,white 1px,transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/my-profile" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-semibold mb-6 group transition-colors">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Profile
          </Link>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/80 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles size={12} /> Account Settings
          </div>
          <h1 className="text-4xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Update Information</h1>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl shadow-2xl shadow-indigo-200/50 border border-indigo-100 overflow-hidden">
          {/* Preview */}
          <div className="p-8 flex items-center gap-5" style={{ background: 'linear-gradient(135deg,#e0e7ff,#ede9fe)' }}>
            <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-white shadow-xl flex-shrink-0">
              {preview ? (
                <Image src={preview} alt="preview" width={80} height={80} className="w-full h-full object-cover" onError={() => setPreview('')} />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">{form.name?.[0]?.toUpperCase() || '?'}</span>
                </div>
              )}
            </div>
            <div>
              <p className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-1">Live Preview</p>
              <h3 className="text-indigo-950 text-xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {form.name || 'Your Name'}
              </h3>
              <p className="text-slate-400 text-xs mt-0.5">{session?.user?.email}</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-5 animate__animated animate__fadeIn">
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                <User size={12} className="text-indigo-400" /> Full Name *
              </label>
              <input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                placeholder="Your full name"
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-indigo-400 transition-all"
                required />
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                <LinkIcon size={12} className="text-indigo-400" /> Profile Photo URL
              </label>
              <input type="url" value={form.image} onChange={e => handleImg(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-indigo-400 transition-all" />
              <p className="text-xs text-slate-400 mt-1.5">Paste a direct link to your photo (JPG, PNG, WebP)</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button type="submit" disabled={loading}
                className="flex-1 btn-primary flex items-center justify-center gap-2 py-4 text-sm disabled:opacity-60">
                {loading ? <><ButtonSpinner /> Updating...</> : <><Save size={15} /> Update Information</>}
              </button>
              <Link href="/my-profile"
                className="flex-1 flex items-center justify-center py-4 border-2 border-slate-200 text-slate-600 font-semibold rounded-xl hover:border-slate-300 transition-all text-sm">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
