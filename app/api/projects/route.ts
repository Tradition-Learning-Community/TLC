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

export async function GET() {
  const projects = await readData();
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const body = await request.json();
  if (!body || !body.title) {
    return NextResponse.json({ error: 'title required' }, { status: 400 });
  }

  const projects = await readData();
  const id = `proj-${Date.now()}`;
  const newProject = {
    id,
    title: body.title,
    description: body.description || '',
    members: body.members || [],
    tasks: body.tasks || [],
  };
  projects.push(newProject);
  await writeData(projects);
  // bonus: increment a demo profile points (user-alice) when creating a project
  try{
    const profilesPath = path.join(process.cwd(), 'data', 'profiles.json');
    const raw = await fs.readFile(profilesPath, 'utf-8');
    const profiles = JSON.parse(raw || '[]');
    const pidx = profiles.findIndex((pp:any)=>pp.id === 'user-alice');
    if (pidx !== -1) { profiles[pidx].points = (profiles[pidx].points||0) + 10; await fs.writeFile(profilesPath, JSON.stringify(profiles,null,2),'utf-8'); }
  }catch(e){/* ignore */}

  return NextResponse.json(newProject, { status: 201 });
}
