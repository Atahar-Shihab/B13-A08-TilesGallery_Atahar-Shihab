import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  }
  try {
    const { name, email, password, image } = await request.json()
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 })
    }
    const client = new MongoClient(process.env.MONGODB_URI)
    await client.connect()
    const db = client.db()
    const existing = await db.collection('users').findOne({ email })
    if (existing) {
      await client.close()
      return NextResponse.json({ error: 'User already exists with this email' }, { status: 409 })
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    await db.collection('users').insertOne({
      name, email, password: hashedPassword,
      image: image || null, emailVerified: null, createdAt: new Date(),
    })
    await client.close()
    return NextResponse.json({ message: 'User created successfully' }, { status: 201 })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
