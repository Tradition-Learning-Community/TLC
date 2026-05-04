import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('seed data exists', () => {
  it('projects.json exists and is parseable', () => {
    const p = path.join(process.cwd(),'data','projects.json')
    const raw = fs.readFileSync(p,'utf-8')
    const data = JSON.parse(raw)
    expect(Array.isArray(data)).toBe(true)
  })

  it('profiles.json exists and contains user-alice', () => {
    const p = path.join(process.cwd(),'data','profiles.json')
    const raw = fs.readFileSync(p,'utf-8')
    const data = JSON.parse(raw)
    const found = data.find((d:any)=>d.id==='user-alice')
    expect(found).toBeDefined()
  })
})
