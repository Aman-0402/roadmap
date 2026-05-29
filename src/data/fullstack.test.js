import { describe, it, expect } from 'vitest'
import { nodes, edges } from './fullstack'

describe('fullstack data', () => {
  it('has 10 nodes total (8 bubbleNode + 2 trackLabel)', () => {
    expect(nodes).toHaveLength(10)
  })

  it('has 8 bubbleNode nodes', () => {
    expect(nodes.filter(n => n.type === 'bubbleNode')).toHaveLength(8)
  })

  it('has 2 trackLabel nodes', () => {
    expect(nodes.filter(n => n.type === 'trackLabel')).toHaveLength(2)
  })

  it('fs-html and fs-nodejs both have null prerequisites (independent track starts)', () => {
    const fsHtml = nodes.find(n => n.id === 'fs-html')
    const fsNodejs = nodes.find(n => n.id === 'fs-nodejs')
    expect(fsHtml.data.prerequisite).toBeNull()
    expect(fsNodejs.data.prerequisite).toBeNull()
  })

  it('all node ids are prefixed with fs- or label- to avoid collision', () => {
    nodes.forEach(n => {
      expect(n.id.startsWith('fs-') || n.id.startsWith('label-')).toBe(true)
    })
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

  it('frontend track edges are correct', () => {
    expect(edges).toEqual(expect.arrayContaining([
      expect.objectContaining({ source: 'fs-html', target: 'fs-css' }),
      expect.objectContaining({ source: 'fs-css', target: 'fs-js' }),
      expect.objectContaining({ source: 'fs-js', target: 'fs-react' }),
    ]))
  })

  it('backend track edges are correct', () => {
    expect(edges).toEqual(expect.arrayContaining([
      expect.objectContaining({ source: 'fs-nodejs', target: 'fs-express' }),
      expect.objectContaining({ source: 'fs-express', target: 'fs-mongodb' }),
      expect.objectContaining({ source: 'fs-mongodb', target: 'fs-deploy' }),
    ]))
  })
})
