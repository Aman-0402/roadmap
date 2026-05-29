# Roadmap Screen Design Spec

**Date:** 2026-05-28  
**Scope:** Initial roadmap screen only — no auth, no backend, no database.

---

## Overview

Futuristic interactive student learning roadmap. Students follow skill paths, click animated galaxy-map bubbles, view topic content, mark topics complete, and unlock next bubbles. Feels game-like and immersive, not like a traditional LMS.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React.js + Vite |
| Routing | React Router DOM (single route for now) |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Canvas/graph | React Flow |
| Background | tsParticles |
| Icons | Lucide React |

---

## Folder Structure

```
src/
├── data/
│   └── roadmapData.js          # node positions, edges, topic content
├── hooks/
│   └── useRoadmapStore.js      # completed state, unlock logic
├── components/
│   ├── BubbleNode.jsx          # React Flow custom node
│   ├── RoadmapEdge.jsx         # animated SVG edge
│   ├── TopicModal.jsx          # full-screen modal
│   └── ParticleBackground.jsx  # tsParticles bg
├── pages/
│   └── RoadmapPage.jsx         # canvas + modal controller
├── styles/
│   └── globals.css             # Tailwind base + glow keyframes
└── App.jsx                     # React Router root
```

---

## Architecture & Data Flow

```
roadmapData.js
    → RoadmapPage (initializes React Flow nodes/edges)
        → BubbleNode (per-node: status, glow, float, click)
        → RoadmapEdge (per-edge: animated sweep when unlocked)
        → TopicModal (topic content when node clicked)

useRoadmapStore
    → completed: Set<nodeId>
    → isUnlocked(id, prerequisite): boolean
    → markComplete(id): void
    → passed down to BubbleNode + TopicModal via props/context
```

State is local React state — no Redux. Status (`locked` | `active` | `completed`) is always derived on render from the `completed` set; never stored.

---

## Data Structure

### Node shape (`roadmapData.js`)

```js
{
  id: 'html',
  type: 'bubbleNode',
  position: { x: 300, y: 100 },
  data: {
    label: 'HTML',
    icon: '🌐',
    prerequisite: null,       // null = unlocked by default
    topic: {
      description: string,
      notes: string,
      videos: [{ title: string, url: string }],
      projects: string[],
      practice: string[],
    }
  }
}
```

### Edge shape

```js
{ id: 'e-html-css', source: 'html', target: 'css', type: 'roadmapEdge' }
```

### Initial nodes & positions (galaxy-map scatter)

| ID | Label | Position | Prerequisite |
|---|---|---|---|
| `html` | HTML | 300, 100 | none |
| `css` | CSS | 650, 280 | `html` |
| `javascript` | JavaScript | 200, 480 | `css` |
| `react` | React | 600, 620 | `javascript` |

### useRoadmapStore logic

```js
const [completed, setCompleted] = useState(new Set())
const isUnlocked = (id, prerequisite) =>
  prerequisite === null || completed.has(prerequisite)
const markComplete = (id) =>
  setCompleted(prev => new Set([...prev, id]))
```

---

## Visual Design

### Color Tokens

| Token | Value | Usage |
|---|---|---|
| Background | `#020817` | Page bg |
| Active node | `#06b6d4` | Cyan glow border |
| Locked node | `#1e293b` | Dark slate, dim |
| Completed node | `#22c55e` | Green glow |
| Edge | `#8b5cf6` | Neon purple |
| Accent | `#a855f7` | Buttons, highlights |
| Glass | `rgba(255,255,255,0.05)` + blur | Panels |

### BubbleNode States

| State | Visual |
|---|---|
| `locked` | Dark slate bg, grey label, lock icon, no glow, not clickable |
| `active` | Cyan border glow, floating y animation, clickable, pulse ring |
| `completed` | Green glow, checkmark badge, subtle idle pulse |

### Floating Animation

Framer Motion `animate` with `repeat: Infinity`, `repeatType: "reverse"`. Each bubble uses a random y-offset phase (`-6px` to `-12px`) and duration (`2.5s`–`4s`) so they don't move in sync.

### Particle Background

tsParticles: small dots (~80), cyan + purple colors, slow random drift, opacity `0.3`–`0.6`, `z-index: 0`. Canvas sits behind React Flow via `z-index`.

---

## Unlock Animation Sequence

Triggered when user clicks "Mark as Completed" inside TopicModal:

1. Modal closes — scale-out + fade (Framer Motion `exit`)
2. Completed bubble — scale `1 → 1.3 → 1` + green glow flash
3. Edge to next node — SVG `strokeDashoffset` animates from full to 0 (sweep effect)
4. Next bubble transitions from `locked` → `active` — scale in + cyan glow appears

---

## TopicModal

Full-screen overlay, glassmorphism card centered. Scrollable sections (no tabs — simpler, mobile-friendly):

1. **Header** — topic name, icon, status badge
2. **Notes** — text content block
3. **Resources** — YouTube link cards (thumbnail placeholder + title)
4. **Projects** — project card list
5. **Practice** — challenge prompt list
6. **Footer CTA** — "Mark as Completed" button (disabled if already completed)

Modal open/close uses Framer Motion `AnimatePresence` with scale + opacity.

---

## Responsiveness

- React Flow canvas fills `100vw × 100vh`
- `fitView` prop enabled — nodes auto-center on load
- TopicModal: full-screen on mobile, centered card on desktop (`max-w-3xl`)
- Bubbles: fixed pixel size (`120px`) — no font scaling issues

---

## Out of Scope (this screen)

- Authentication
- Backend / database
- Progress persistence (localStorage or API)
- Multiple roadmap paths
- Search or filtering
- User profiles
