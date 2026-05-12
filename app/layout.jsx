import './globals.css'
import Providers from './providers'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast'

export const metadata = {
  title: 'TilesGallery — Discover Your Perfect Aesthetic',
  description: 'A curated collection of premium tiles from artisans around the world.',
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col" style={{ background: '#f8faff' }}>
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />

          {/* ── Green-themed Toasts ── */}
          <Toaster
            position="top-right"
            gutter={10}
            toastOptions={{
              duration: 3500,
              style: {
                background: '#fff',
                color: '#14532d',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: '500',
                borderRadius: '14px',
                border: '1.5px solid #86efac',
                boxShadow: '0 8px 30px rgba(34,197,94,0.15)',
                padding: '12px 16px',
              },
              success: {
                icon: '✅',
                style: {
                  background: '#f0fdf4',
                  color: '#14532d',
                  border: '1.5px solid #86efac',
                  boxShadow: '0 8px 30px rgba(34,197,94,0.18)',
                },
              },
              error: {
                icon: '❌',
                style: {
                  background: '#fff1f2',
                  color: '#881337',
                  border: '1.5px solid #fca5a5',
                  boxShadow: '0 8px 30px rgba(239,68,68,0.15)',
                },
              },
              loading: {
                icon: '⏳',
                style: {
                  background: '#eff6ff',
                  color: '#1e3a8a',
                  border: '1.5px solid #93c5fd',
                  boxShadow: '0 8px 30px rgba(99,102,241,0.15)',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
