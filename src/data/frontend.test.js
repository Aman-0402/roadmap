import { describe, it, expect } from 'vitest'
import { nodes, edges } from './frontend'

describe('frontend data', () => {
  it('exports 4 nodes', () => {
    expect(nodes).toHaveLength(4)
  })

  it('all nodes are bubbleNode type', () => {
    nodes.forEach(n => expect(n.type).toBe('bubbleNode'))
  })

  it('html node has null prerequisite', () => {
    const html = nodes.find(n => n.id === 'html')
    expect(html.data.prerequisite).toBeNull()
  })

  it('each non-html node has a prerequisite pointing to another node id', () => {
    const ids = nodes.map(n => n.id)
    nodes
      .filter(n => n.data.prerequisite !== null)
      .forEach(n => expect(ids).toContain(n.data.prerequisite))
  })

  it('each node has required topic fields', () => {
    nodes.forEach(n => {
      expect(n.data.topic).toHaveProperty('description')
      expect(n.data.topic).toHaveProperty('notes')
      expect(n.data.topic).toHaveProperty('videos')
      expect(n.data.topic).toHaveProperty('projects')
      expect(n.data.topic).toHaveProperty('practice')
    })
  })

  it('exports 3 edges in correct order', () => {
    expect(edges).toHaveLength(3)
    expect(edges[0]).toMatchObject({ source: 'html', target: 'css' })
    expect(edges[1]).toMatchObject({ source: 'css', target: 'javascript' })
    expect(edges[2]).toMatchObject({ source: 'javascript', target: 'react' })
  })

  it('all edges use roadmapEdge type', () => {
    edges.forEach(e => expect(e.type).toBe('roadmapEdge'))
  })
})
