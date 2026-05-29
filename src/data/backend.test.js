import { describe, it, expect } from 'vitest'
import { nodes, edges } from './backend'

describe('backend data', () => {
  it('has 10 nodes total (8 bubbleNode + 2 trackLabel)', () => {
    expect(nodes).toHaveLength(10)
  })

  it('has 8 bubbleNode nodes', () => {
    expect(nodes.filter(n => n.type === 'bubbleNode')).toHaveLength(8)
  })

  it('has 2 trackLabel nodes', () => {
    expect(nodes.filter(n => n.type === 'trackLabel')).toHaveLength(2)
  })

  it('nodejs and python both have null prerequisites (independent track starts)', () => {
    const nodejs = nodes.find(n => n.id === 'nodejs')
    const python = nodes.find(n => n.id === 'python')
    expect(nodejs.data.prerequisite).toBeNull()
    expect(python.data.prerequisite).toBeNull()
  })

  it('each bubbleNode has required topic fields', () => {
    nodes.filter(n => n.type === 'bubbleNode').forEach(n => {
      expect(n.data.topic).toHaveProperty('description')
      expect(n.data.topic).toHaveProperty('notes')
      expect(n.data.topic).toHaveProperty('videos')
      expect(n.data.topic).toHaveProperty('projects')
      expect(n.data.topic).toHaveProperty('practice')
    })
  })

  it('has 6 edges (3 per track)', () => {
    expect(edges).toHaveLength(6)
  })

  it('all edges use roadmapEdge type', () => {
    edges.forEach(e => expect(e.type).toBe('roadmapEdge'))
  })

  it('Node.js track edges are correct', () => {
    expect(edges).toEqual(expect.arrayContaining([
      expect.objectContaining({ source: 'nodejs', target: 'express' }),
      expect.objectContaining({ source: 'express', target: 'mongodb' }),
      expect.objectContaining({ source: 'mongodb', target: 'restapi' }),
    ]))
  })

  it('Python track edges are correct', () => {
    expect(edges).toEqual(expect.arrayContaining([
      expect.objectContaining({ source: 'python', target: 'django' }),
      expect.objectContaining({ source: 'django', target: 'postgresql' }),
      expect.objectContaining({ source: 'postgresql', target: 'restapis' }),
    ]))
  })
})
