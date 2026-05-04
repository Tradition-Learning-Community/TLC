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

export async function PUT(request: Request, context: any){
  const params = await context.params;
  const { id, taskId } = params;
  const projects = await readData();
  const p = projects.find((x: any) => x.id === id);
  if (!p) return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  const t = (p.tasks || []).find((tt: any) => tt.id === taskId);
  if (!t) return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  const body = await request.json();
  if (typeof body.done === 'boolean') t.done = body.done;
  if (body.title) t.title = body.title;
  await writeData(projects);
  // bonus gamification: when a task is marked done, add points to demo profile
  try{
    if (body.done === true) {
      const profilesPath = path.join(process.cwd(), 'data', 'profiles.json');
      const raw = await fs.readFile(profilesPath, 'utf-8');
      const profiles = JSON.parse(raw || '[]');
      const pidx = profiles.findIndex((pp:any)=>pp.id === 'user-alice');
      if (pidx !== -1) { profiles[pidx].points = (profiles[pidx].points||0) + 5; await fs.writeFile(profilesPath, JSON.stringify(profiles,null,2),'utf-8'); }
    }
  }catch(e){ }
  return NextResponse.json(t);
}

export async function DELETE(request: Request, context: any){
  const params = await context.params;
  const { id, taskId } = params;
  const projects = await readData();
  const p = projects.find((x: any) => x.id === id);
  if (!p) return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  const idx = (p.tasks || []).findIndex((tt: any) => tt.id === taskId);
  if (idx === -1) return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  const removed = p.tasks.splice(idx, 1)[0];
  await writeData(projects);
  return NextResponse.json({ removed });
}
