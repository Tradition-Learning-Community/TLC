import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { randomUUID } from 'crypto'

const DATA_PATH = path.join(process.cwd(), 'data', 'contributors.json')

async function readData() {
  try {
    const content = await fs.readFile(DATA_PATH, 'utf-8')
    return JSON.parse(content)
  } catch (err) {
    return []
  }
}

async function writeData(data: any) {
  await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true })
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8')
}

export async function GET() {
  const items = await readData()
  return NextResponse.json(items)
}

export async function POST(request: Request) {
  const body = await request.json()
  if (!body || !body.name || !body.github) {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const items = await readData()
  const newItem = {
    id: randomUUID(),
    name: body.name,
    github: body.github,
    avatar: body.avatar || `${body.github.replace(/\/$/, '')}.png`,
  }

  items.push(newItem)
  await writeData(items)
  return NextResponse.json(newItem, { status: 201 })
}

export async function PUT(request: Request) {
  const body = await request.json()
  if (!body || !body.id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  }

  const items = await readData()
  const idx = items.findIndex((i: any) => i.id === body.id)
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  items[idx] = { ...items[idx], ...body }
  await writeData(items)
  return NextResponse.json(items[idx])
}

export async function DELETE(request: Request) {
  const url = new URL(request.url)
  const id = url.searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

  const items = await readData()
  const filtered = items.filter((i: any) => i.id !== id)
  await writeData(filtered)
  return NextResponse.json({ success: true })
}
