import { describe, it, expect } from 'vitest'
import { roadmapsRegistry, roadmapsList } from './roadmapsRegistry'

describe('roadmapsRegistry', () => {
  it('has exactly 4 roadmaps', () => {
    expect(Object.keys(roadmapsRegistry)).toHaveLength(4)
  })

  it('roadmapsList is ["frontend", "backend", "fullstack", "python"] in order', () => {
    expect(roadmapsList).toEqual(['frontend', 'backend', 'fullstack', 'python'])
  })

  it('each roadmap has required metadata fields', () => {
    Object.values(roadmapsRegistry).forEach(r => {
      expect(r).toHaveProperty('label')
      expect(r).toHaveProperty('icon')
      expect(r).toHaveProperty('color')
      expect(r).toHaveProperty('description')
      expect(r).toHaveProperty('nodes')
      expect(r).toHaveProperty('edges')
    })
  })

  it('frontend roadmap has 4 bubbleNode nodes and 3 edges', () => {
    const r = roadmapsRegistry.frontend
    expect(r.nodes.filter(n => n.type === 'bubbleNode')).toHaveLength(4)
    expect(r.edges).toHaveLength(3)
  })

  it('backend roadmap has 8 bubbleNode nodes and 6 edges', () => {
    const r = roadmapsRegistry.backend
    expect(r.nodes.filter(n => n.type === 'bubbleNode')).toHaveLength(8)
    expect(r.edges).toHaveLength(6)
  })

  it('fullstack roadmap has 8 bubbleNode nodes and 6 edges', () => {
    const r = roadmapsRegistry.fullstack
    expect(r.nodes.filter(n => n.type === 'bubbleNode')).toHaveLength(8)
    expect(r.edges).toHaveLength(6)
  })

  it('all roadmap colors are valid hex strings', () => {
    Object.values(roadmapsRegistry).forEach(r => {
      expect(r.color).toMatch(/^#[0-9a-f]{6}$/i)
    })
  })
})
