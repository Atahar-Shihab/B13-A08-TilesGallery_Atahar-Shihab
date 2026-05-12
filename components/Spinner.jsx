'use client'
import { Sparkles } from 'lucide-react'

// Full-page overlay spinner
export function PageSpinner({ text = 'Loading...' }) {
  return (
    <div className="spinner-overlay animate__animated animate__fadeIn animate__faster">
      <div className="flex flex-col items-center gap-5">
        <div className="relative">
          {/* Outer ring */}
          <div className="w-16 h-16 rounded-full border-4 border-indigo-100" />
          <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-indigo-500 border-r-indigo-500 animate-spin" />
          {/* Inner ring */}
          <div className="absolute inset-2 w-12 h-12 rounded-full border-4 border-transparent border-b-violet-400 border-l-violet-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.6s' }} />
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles size={14} className="text-indigo-400 animate-pulse" />
          </div>
        </div>
        <div className="text-center">
          <p className="text-indigo-600 font-semibold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>{text}</p>
          <div className="flex gap-1 justify-center mt-2">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Inline button spinner
export function ButtonSpinner() {
  return (
    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
  )
}

// Small inline spinner
export function InlineSpinner({ className = '' }) {
  return (
    <div className={`w-5 h-5 border-2 border-indigo-200 border-t-indigo-500 rounded-full animate-spin ${className}`} />
  )
}

// Section loader (replaces content area while loading)
export function SectionSpinner({ text = 'Fetching tiles...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-5">
      <div className="relative">
        <div className="w-14 h-14 rounded-full border-4 border-indigo-100" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 border-r-indigo-500 animate-spin" />
        <div className="absolute inset-2 rounded-full border-3 border-transparent border-b-violet-400 border-l-violet-400 animate-spin"
          style={{ animationDirection: 'reverse', animationDuration: '0.7s' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles size={12} className="text-indigo-300 animate-pulse" />
        </div>
      </div>
      <p className="text-indigo-500 font-medium text-sm animate__animated animate__pulse animate__infinite"
        style={{ fontFamily: 'Poppins, sans-serif' }}>
        {text}
      </p>
    </div>
  )
}
