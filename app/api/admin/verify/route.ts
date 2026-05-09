import { NextResponse } from 'next/server'

function cookieValue(cookieHeader: string | null, name: string) {
  if (!cookieHeader) return null
  const parts = cookieHeader.split(';').map(p => p.trim())
  for (const part of parts) {
    if (part.startsWith(name + '=')) return part.split('=')[1]
  }
  return null
}

export async function GET(request: Request) {
  const cookieHeader = request.headers.get('cookie')
  const val = cookieValue(cookieHeader, 'tlc_admin')
  if (val === '1') return NextResponse.json({ ok: true })
  return NextResponse.json({ ok: false }, { status: 401 })
}
