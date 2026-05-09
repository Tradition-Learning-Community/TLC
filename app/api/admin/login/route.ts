import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { password } = await request.json()
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || ''

  if (!password || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  // Set a simple httpOnly cookie for the admin session (valid 1 day)
  res.headers.set('Set-Cookie', `tlc_admin=1; Path=/; HttpOnly; SameSite=Strict; Max-Age=${60 * 60 * 24}`)
  return res
}
