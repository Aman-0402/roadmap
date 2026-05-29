import { describe, it, expect } from 'vitest'
import { roadmapNodes, roadmapEdges } from './roadmapData'

describe('roadmapData', () => {
  it('exports 4 nodes', () => {
    expect(roadmapNodes).toHaveLength(4)
  })

  it('first node has null prerequisite (html is default unlocked)', () => {
    const html = roadmapNodes.find(n => n.id === 'html')
    expect(html.data.prerequisite).toBeNull()
  })

  it('each non-html node has a prerequisite pointing to another node id', () => {
    const ids = roadmapNodes.map(n => n.id)
    roadmapNodes
      .filter(n => n.data.prerequisite !== null)
      .forEach(n => expect(ids).toContain(n.data.prerequisite))
  })

  it('each node has required topic fields', () => {
    roadmapNodes.forEach(n => {
      expect(n.data.topic).toHaveProperty('description')
      expect(n.data.topic).toHaveProperty('notes')
      expect(n.data.topic).toHaveProperty('videos')
      expect(n.data.topic).toHaveProperty('projects')
      expect(n.data.topic).toHaveProperty('practice')
    })
  })

  it('exports 3 edges connecting nodes in order', () => {
    expect(roadmapEdges).toHaveLength(3)
    expect(roadmapEdges[0]).toMatchObject({ source: 'html', target: 'css' })
    expect(roadmapEdges[1]).toMatchObject({ source: 'css', target: 'javascript' })
    expect(roadmapEdges[2]).toMatchObject({ source: 'javascript', target: 'react' })
  })

  it('all edges use roadmapEdge type', () => {
    roadmapEdges.forEach(e => expect(e.type).toBe('roadmapEdge'))
  })
})
