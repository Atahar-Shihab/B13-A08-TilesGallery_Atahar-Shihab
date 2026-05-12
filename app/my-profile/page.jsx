import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Edit3, Mail, User, Sparkles, Layers, ArrowRight } from 'lucide-react'

export default async function MyProfilePage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login?callbackUrl=/my-profile')
  const { user } = session

  return (
    <div className="min-h-screen" style={{ background: '#f8faff' }}>
      {/* Hero */}
      <div className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg,#6366f1 0%,#7c3aed 60%,#6366f1 100%)' }}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/80 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles size={12} /> My Account
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            My Profile
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 pb-20">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-indigo-200/50 border border-indigo-100 overflow-hidden animate__animated animate__fadeInUp animate__faster">
          {/* Card Header */}
          <div className="p-8 sm:p-10" style={{ background: 'linear-gradient(135deg,#e0e7ff 0%,#ede9fe 100%)' }}>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-white shadow-xl flex-shrink-0">
                {user.image ? (
                  <Image src={user.image} alt={user.name || 'User'} width={112} height={112} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                    <span className="text-white text-4xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {user.name?.[0]?.toUpperCase() || '?'}
                    </span>
                  </div>
                )}
              </div>

              <div className="text-center sm:text-left flex-1">
                <h2 className="text-3xl font-bold text-indigo-950 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {user.name || 'Gallery Member'}
                </h2>
                <p className="text-slate-500 text-sm flex items-center gap-2 justify-center sm:justify-start mb-3">
                  <Mail size={13} /> {user.email}
                </p>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                  <Layers size={11} /> Gallery Member
                </span>
              </div>

              <Link href="/my-profile/update"
                className="btn-primary flex items-center gap-2 px-6 py-3 text-sm flex-shrink-0">
                <Edit3 size={14} /> Edit Profile
              </Link>
            </div>
          </div>

          {/* Details */}
          <div className="p-8 sm:p-10">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: User, label: 'Full Name', value: user.name || '—', color: 'from-indigo-400 to-violet-500' },
                { icon: Mail, label: 'Email Address', value: user.email || '—', color: 'from-amber-400 to-orange-400' },
              ].map(({ icon: Icon, label, value, color }, i) => (
                <div key={label} className="flex items-start gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-colors animate__animated animate__fadeInLeft" style={{ animationDelay: `${i * 0.15}s`, animationFillMode: 'both' }}>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                    <Icon size={16} className="text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-400 mb-0.5 font-medium">{label}</p>
                    <p className="text-slate-800 font-semibold truncate">{value}</p>
                  </div>
                </div>
              ))}

              {user.image && (
                <div className="flex items-start gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 md:col-span-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Sparkles size={16} className="text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-slate-400 mb-0.5 font-medium">Profile Photo URL</p>
                    <p className="text-slate-800 font-semibold text-sm truncate">{user.image}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div className="mt-8 pt-8 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                <Link href="/all-tiles"
                  className="flex items-center gap-2 px-5 py-3 bg-indigo-50 border border-indigo-200 text-indigo-700 text-sm font-semibold rounded-xl hover:bg-indigo-100 transition-all">
                  <Layers size={14} /> Browse Tiles <ArrowRight size={13} />
                </Link>
                <Link href="/my-profile/update"
                  className="flex items-center gap-2 px-5 py-3 bg-indigo-50 border border-indigo-200 text-indigo-700 text-sm font-semibold rounded-xl hover:bg-indigo-100 transition-all">
                  <Edit3 size={14} /> Update Info <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
