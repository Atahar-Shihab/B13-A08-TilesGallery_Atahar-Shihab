import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import { MongoClient } from 'mongodb'
import bcrypt from 'bcryptjs'

let _clientPromise = null

export function getClientPromise() {
  if (!_clientPromise && process.env.MONGODB_URI) {
    const client = new MongoClient(process.env.MONGODB_URI)
    _clientPromise = client.connect()
  }
  return _clientPromise
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'placeholder',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'placeholder',
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required')
        }
        try {
          const cp = getClientPromise()
          if (!cp) throw new Error('Database not configured')
          const client = await cp
          const db = client.db()
          const user = await db.collection('users').findOne({ email: credentials.email })
          if (!user) throw new Error('No user found with this email')
          if (!user.password) throw new Error('Please use Google to sign in')
          const isValid = await bcrypt.compare(credentials.password, user.password)
          if (!isValid) throw new Error('Invalid password')
          return { id: user._id.toString(), email: user.email, name: user.name, image: user.image }
        } catch (err) {
          throw new Error(err.message || 'Authentication failed')
        }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) token.id = user.id
      if (trigger === 'update' && session) {
        token.name = session.name
        token.picture = session.image
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.image = token.picture
      }
      return session
    },
  },
  pages: { signIn: '/login', error: '/login' },
}

// Attach adapter only when MONGODB_URI is present
if (process.env.MONGODB_URI) {
  authOptions.adapter = MongoDBAdapter(getClientPromise())
}
