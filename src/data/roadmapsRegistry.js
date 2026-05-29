import { nodes as frontendNodes, edges as frontendEdges } from './frontend'
import { nodes as backendNodes, edges as backendEdges } from './backend'
import { nodes as fullstackNodes, edges as fullstackEdges } from './fullstack'

export const roadmapsRegistry = {
  frontend: {
    label: 'Frontend',
    icon: '🌐',
    color: '#06b6d4',
    description: 'HTML, CSS, JavaScript, React',
    nodes: frontendNodes,
    edges: frontendEdges,
  },
  backend: {
    label: 'Backend',
    icon: '⚡',
    color: '#8b5cf6',
    description: 'Node.js + Python paths',
    nodes: backendNodes,
    edges: backendEdges,
  },
  fullstack: {
    label: 'Full Stack',
    icon: '🚀',
    color: '#a855f7',
    description: 'Frontend + Backend combined',
    nodes: fullstackNodes,
    edges: fullstackEdges,
  },
}

export const roadmapsList = ['frontend', 'backend', 'fullstack']
