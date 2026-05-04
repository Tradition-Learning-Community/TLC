import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'events.json');

async function readData(){
  const raw = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(raw || '[]');
}

export async function GET(){
  const data = await readData();
  return NextResponse.json(data);
}
