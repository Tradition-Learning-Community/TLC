import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'projects.json');

async function readData() {
  const raw = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(raw || '[]');
}

async function writeData(data: any) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET(request: Request, context: any) {
  const params = await context.params;
  const { id } = params;
  const projects = await readData();
  const project = projects.find((p: any) => p.id === id);
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(project);
}

export async function PUT(request: Request, context: any) {
  const params = await context.params;
  const { id } = params;
  const body = await request.json();
  const projects = await readData();
  const idx = projects.findIndex((p: any) => p.id === id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  projects[idx] = { ...projects[idx], ...body };
  await writeData(projects);
  return NextResponse.json(projects[idx]);
}

export async function DELETE(request: Request, context: any) {
  const params = await context.params;
  const { id } = params;
  let projects = await readData();
  const idx = projects.findIndex((p: any) => p.id === id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const removed = projects.splice(idx, 1)[0];
  await writeData(projects);
  return NextResponse.json({ removed });
}
