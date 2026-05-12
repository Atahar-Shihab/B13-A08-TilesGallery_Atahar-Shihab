'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

export default function Error({ error, reset }) {
  useEffect(() => { console.error(error) }, [error])

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg,#e0e7ff,#fef3c7)' }}>
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-2xl bg-red-50 border-2 border-red-100 flex items-center justify-center shadow-lg">
            <AlertTriangle size={32} className="text-red-400" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Something went wrong
        </h1>
        <p className="text-slate-500 mb-8 leading-relaxed">
          An unexpected error occurred. This might be a temporary issue — please try again or return home.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={reset}
            className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm">
            <RefreshCw size={14} /> Try Again
          </button>
          <Link href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white border-2 border-indigo-200 text-indigo-700 font-semibold rounded-xl hover:border-indigo-400 transition-all text-sm">
            <Home size={14} /> Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
