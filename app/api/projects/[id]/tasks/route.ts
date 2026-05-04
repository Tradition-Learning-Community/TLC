import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'projects.json');

async function readData(){
  const raw = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(raw || '[]');
}

async function writeData(data: any){
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export async function POST(request: Request, context: any){
  const params = await context.params;
  const { id } = params;
  const body = await request.json();
  if (!body || !body.title) return NextResponse.json({ error: 'title required' }, { status: 400 });
  const projects = await readData();
  const idx = projects.findIndex((p: any) => p.id === id);
  if (idx === -1) return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  const taskId = `t-${Date.now()}`;
  const task = { id: taskId, title: body.title, done: false };
  projects[idx].tasks = projects[idx].tasks || [];
  projects[idx].tasks.push(task);
  await writeData(projects);
  return NextResponse.json(task, { status: 201 });
}
