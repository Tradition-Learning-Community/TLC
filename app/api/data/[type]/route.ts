import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { randomUUID } from 'crypto'

const DATA_DIR = path.join(process.cwd(), 'data')

async function readFile(file: string) {
  try {
    const content = await fs.readFile(file, 'utf-8')
    return JSON.parse(content)
  } catch (e) {
    return []
  }
}

async function writeFile(file: string, data: any) {
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf-8')
}

export async function GET(request: Request, { params }: { params: { type: string } }) {
  const { type } = params
  const file = path.join(DATA_DIR, `${type}.json`)
  const items = await readFile(file)
  return NextResponse.json(items)
}

export async function POST(request: Request, { params }: { params: { type: string } }) {
  const { type } = params
  const body = await request.json()
  if (!body || typeof body !== 'object') return NextResponse.json({ error: 'Invalid body' }, { status: 400 })

  const file = path.join(DATA_DIR, `${type}.json`)
  const items = await readFile(file)
  const newItem = { id: body.id || randomUUID(), ...body }
  items.push(newItem)
  await writeFile(file, items)
  return NextResponse.json(newItem, { status: 201 })
}

export async function PUT(request: Request, { params }: { params: { type: string } }) {
  const { type } = params
  const body = await request.json()
  if (!body || !body.id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

  const file = path.join(DATA_DIR, `${type}.json`)
  const items = await readFile(file)
  const idx = items.findIndex((i: any) => i.id === body.id)
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  items[idx] = { ...items[idx], ...body }
  await writeFile(file, items)
  return NextResponse.json(items[idx])
}

export async function DELETE(request: Request, { params }: { params: { type: string } }) {
  const { type } = params
  const url = new URL(request.url)
  const id = url.searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

  const file = path.join(DATA_DIR, `${type}.json`)
  const items = await readFile(file)
  const filtered = items.filter((i: any) => i.id !== id)
  await writeFile(file, filtered)
  return NextResponse.json({ success: true })
}
