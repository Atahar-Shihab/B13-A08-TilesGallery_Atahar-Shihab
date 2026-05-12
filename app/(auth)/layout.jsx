export const metadata = {
  title: 'Sign In — TilesGallery',
  description: 'Sign in or create an account to access your TilesGallery profile.',
}

export default function AuthLayout({ children }) {
  return (
    <div className="bg-[#faf7f2]">
      {children}
    </div>
  )
}
