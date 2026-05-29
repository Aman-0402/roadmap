# Multiple Roadmaps Design Spec

**Date:** 2026-05-29  
**Scope:** Home screen with 3 roadmap cards + multi-roadmap routing. No auth, no backend, no persistence.

---

## Overview

Replace the single-roadmap app with a home screen that lets students choose from three learning paths: Frontend, Backend, and Full Stack. Each path opens the existing galaxy-map canvas with its own nodes and edges.

---

## Approach

Option A — separate data files + URL routing. One file per roadmap. Registry maps id → data. `RoadmapPage` reads id from URL params. `useRoadmapStore` unchanged (state resets per navigation).

---

## Routes

| Path | Component | Notes |
|---|---|---|
| `/` | `HomePage` | 3-card selection screen |
| `/roadmap/:id` | `RoadmapPage` | id = `frontend` \| `backend` \| `fullstack` |
| `*` | redirect `/` | |

---

## File Map

| Action | File | Purpose |
|---|---|---|
| Create | `src/pages/HomePage.jsx` | 3-card roadmap selection screen |
| Create | `src/data/frontend.js` | Frontend nodes + edges (moved from roadmapData.js) |
| Create | `src/data/backend.js` | Backend nodes + edges (Node.js + Python parallel tracks) |
| Create | `src/data/fullstack.js` | Full Stack nodes + edges (Frontend + Backend parallel tracks) |
| Create | `src/data/roadmapsRegistry.js` | Maps id → `{ label, icon, color, nodes, edges }` |
| Create | `src/components/TrackLabelNode.jsx` | Non-interactive React Flow node for track headers |
| Modify | `src/App.jsx` | Add `/roadmap/:id` route, `/` → HomePage |
| Modify | `src/pages/RoadmapPage.jsx` | useParams, registry lookup, back button, dynamic title |
| Delete | `src/data/roadmapData.js` | Replaced by frontend.js + registry |

---

## Data Structure

### roadmapsRegistry.js

```js
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
```

### Node shape (unchanged)

```js
{
  id: string,
  type: 'bubbleNode' | 'trackLabel',
  position: { x: number, y: number },
  data: {
    label: string,
    icon: string,           // emoji — only on bubbleNode
    prerequisite: string | null,  // only on bubbleNode
    topic: { ... },         // only on bubbleNode
  }
}
```

### frontend.js

Existing 4 nodes unchanged from `roadmapData.js` (HTML → CSS → JavaScript → React), positions unchanged. Export renamed to `nodes` / `edges`.

### backend.js — 8 bubbleNodes + 2 trackLabel nodes

**Node.js Track** (x ≈ 150):

| id | label | position | prerequisite |
|---|---|---|---|
| `nodejs` | Node.js | 150, 100 | null |
| `express` | Express | 150, 300 | `nodejs` |
| `mongodb` | MongoDB | 150, 500 | `express` |
| `restapi` | REST API | 150, 700 | `mongodb` |

**Python Track** (x ≈ 520):

| id | label | position | prerequisite |
|---|---|---|---|
| `python` | Python | 520, 100 | null |
| `django` | Django | 520, 300 | `python` |
| `postgresql` | PostgreSQL | 520, 500 | `django` |
| `restapis` | REST APIs | 520, 700 | `postgresql` |

**Track label nodes** (type: `trackLabel`, not clickable):

| id | label | position |
|---|---|---|
| `label-nodejs` | Node.js Path | 150, -60 |
| `label-python` | Python Path | 520, -60 |

### fullstack.js — 8 bubbleNodes + 2 trackLabel nodes

**Frontend Track** (x ≈ 150):

| id | label | position | prerequisite |
|---|---|---|---|
| `fs-html` | HTML | 150, 100 | null |
| `fs-css` | CSS | 150, 300 | `fs-html` |
| `fs-js` | JavaScript | 150, 500 | `fs-css` |
| `fs-react` | React | 150, 700 | `fs-js` |

**Backend Track** (x ≈ 520):

| id | label | position | prerequisite |
|---|---|---|---|
| `fs-nodejs` | Node.js | 520, 100 | null |
| `fs-express` | Express | 520, 300 | `fs-nodejs` |
| `fs-mongodb` | MongoDB | 520, 500 | `fs-express` |
| `fs-deploy` | Deployment | 520, 700 | `fs-mongodb` |

**Track label nodes**:

| id | label | position |
|---|---|---|
| `label-frontend` | Frontend Path | 150, -60 |
| `label-backend` | Backend Path | 520, -60 |

---

## TrackLabelNode Component

Simple non-interactive node — no handles, no click, no animation:

```jsx
export default function TrackLabelNode({ data }) {
  return (
    <div className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: '#94a3b8' }}>
      {data.label}
    </div>
  )
}
```

Added to `NODE_TYPES` in RoadmapPage: `{ bubbleNode: BubbleNode, trackLabel: TrackLabelNode }`.

---

## HomePage Design

**Layout:** full-screen dark bg + particles. Centered content.

**Header:**
- `"Developer Roadmap"` — large gradient text (cyan → purple, same style as existing header)
- `"Choose your learning path"` — slate-400 subtitle

**Cards:** 3 horizontal glassmorphism cards in a flex row.

Each card:
- Large icon (emoji, 4xl)
- Title (white bold)
- Description (slate-400, small)
- Topic count badge
- Gradient CTA button matching roadmap color
- Framer Motion `whileHover={{ scale: 1.04 }}`
- Box-shadow glow on hover matching roadmap color

**Mount animation:** cards stagger in (`delay: index * 0.1s`) with `y: 20 → 0, opacity: 0 → 1`.

**Navigation:** `useNavigate()`, on card click → `navigate('/roadmap/frontend')` etc.

---

## RoadmapPage Changes

1. `const { id } = useParams()`
2. `const roadmap = roadmapsRegistry[id]` — if undefined, `<Navigate to="/" replace />`
3. Use `roadmap.nodes` / `roadmap.edges` instead of hardcoded imports
4. Header title: `{roadmap.label} Roadmap` instead of hardcoded `"Frontend Roadmap"`
5. Back button: `←` in header → `navigate('/')`
6. Remove direct imports of `roadmapNodes` / `roadmapEdges` from `roadmapData.js`

---

## Test Impact

`src/data/roadmapData.test.js` currently imports from `./roadmapData`. When `roadmapData.js` is deleted, that test file must be updated to import from `./frontend` instead (or deleted and replaced with `frontend.test.js`). The test assertions remain the same — 4 nodes, 3 edges, prerequisite chain.

---

## Out of Scope

- Progress persistence across sessions (separate feature)
- Cross-track dependencies within Backend or Full Stack
- More than 3 roadmaps
- Roadmap search or filtering
- Authentication or user accounts
