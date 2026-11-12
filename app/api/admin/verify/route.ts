import { NextResponse } from 'next/server'
import { isAdminRequest } from '@/lib/admin-auth'

export async function GET(request: Request) {
  if (isAdminRequest(request)) return NextResponse.json({ ok: true })
  return NextResponse.json({ ok: false }, { status: 401 })
}
