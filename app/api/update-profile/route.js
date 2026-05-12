import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { MongoClient } from 'mongodb'

export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { name, image } = await request.json()
    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ message: 'Profile updated (demo mode)', name, image })
    }
    const client = new MongoClient(process.env.MONGODB_URI)
    await client.connect()
    const db = client.db()
    await db.collection('users').updateOne(
      { email: session.user.email },
      { $set: { name, image: image || session.user.image, updatedAt: new Date() } }
    )
    await client.close()
    return NextResponse.json({ message: 'Profile updated', name, image })
  } catch (error) {
    console.error('Update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
