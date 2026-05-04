import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'profiles.json');

async function readData(){
  const raw = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(raw || '[]');
}

export async function GET(){
  const data = await readData();
  return NextResponse.json(data);
}

export async function PATCH(request: Request){
  const body = await request.json();
  const profilesPath = path.join(process.cwd(), 'data', 'profiles.json');
  const raw = await fs.readFile(profilesPath, 'utf-8');
  const profiles = JSON.parse(raw || '[]');
  const idx = profiles.findIndex((p:any)=>p.id===body.id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  profiles[idx] = { ...profiles[idx], ...body };
  await fs.writeFile(profilesPath, JSON.stringify(profiles,null,2),'utf-8');
  return NextResponse.json(profiles[idx]);
}
