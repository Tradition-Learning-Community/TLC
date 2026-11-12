import { NextResponse } from 'next/server'
import { adminCookieHeader } from '@/lib/admin-auth'
import { checkRateLimit, clearRateLimit, recordRateLimitFailure } from '@/lib/rate-limit'

const LOGIN_LIMIT = { limit: 5, windowMs: 15 * 60 * 1000 }

function clientKey(request: Request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown'
}

export async function POST(request: Request) {
  const key = `admin-login:${clientKey(request)}`
  const rate = checkRateLimit(key, LOGIN_LIMIT)
  if (!rate.allowed) {
    return NextResponse.json(
      { ok: false, error: 'Too many login attempts' },
      { status: 429, headers: { 'Retry-After': String(rate.retryAfterSeconds) } },
    )
  }

  const body = await request.json().catch(() => null)
  const password = typeof body?.password === 'string' ? body.password : ''
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || ''

  if (!ADMIN_PASSWORD || !password || password !== ADMIN_PASSWORD) {
    recordRateLimitFailure(key, LOGIN_LIMIT)
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  clearRateLimit(key)
  const res = NextResponse.json({ ok: true })
  res.headers.set('Set-Cookie', adminCookieHeader())
  return res
}
