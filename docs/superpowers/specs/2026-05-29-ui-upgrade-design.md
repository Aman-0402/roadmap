# UI Upgrade Design — Better Bubbles, Dotted Paths, Right Panel

Date: 2026-05-29
Status: Approved

## Overview

Full visual redesign of the roadmap canvas. Replaces full-screen TopicModal with a slide-in RightPanel. Upgrades BubbleNode to 160px with step badges and orbit rings. Converts edges to animated dotted paths.

## Scope

- Modify: `BubbleNode.jsx`, `RoadmapEdge.jsx`, `RoadmapPage.jsx`
- Create: `RightPanel.jsx`, `RightPanel.test.jsx`
- Delete: `TopicModal.jsx`, `TopicModal.test.jsx`
- Modify data: `frontend.js`, `backend.js`, `fullstack.js` (add `step`, `difficulty`, `description`, `concepts`, `videos`, `projects` fields)

## Architecture

### Layout

RoadmapPage uses a flex row container when panel is open:

```
Panel closed: [  full-width canvas (100vw)  ]
Panel open:   [  canvas (calc(100vw - 420px))  ] [ RightPanel (420px) ]
```

Canvas `<div>` gets `width` CSS transition (300ms ease). RightPanel is `position: fixed, right: 0, top: 0, bottom: 0, width: 420px`. Panel slides over canvas — canvas does NOT resize (avoids React Flow jarring re-layout). React Flow `fitView` NOT called on panel toggle.

`selectedNodeId` state in `RoadmapCanvas` drives panel open/close (unchanged pattern from TopicModal).

### Component Hierarchy

```
RoadmapPage (shell, guard only)
  └─ RoadmapCanvas
       ├─ ParticleBackground
       ├─ Header (back button, title, progress pill)
       ├─ ReactFlow
       │    ├─ BubbleNode (×N)
       │    ├─ RoadmapEdge (×N)
       │    └─ TrackLabelNode (×N)
       └─ RightPanel (AnimatePresence, slide-in)
```

## BubbleNode Redesign

### Size & Structure

- Outer div: 160×160px circle
- Center: emoji icon (2.5rem / 40px)
- Below icon: label text (0.7rem, truncated 1 line, max-width 120px)
- Top-left badge: step number (`"01"`, `"02"`, ... zero-padded)
- Top-right badge: lock icon (locked) or CheckCircle (completed)

### State Styles

| State | Ring | Glow | Badge |
|---|---|---|---|
| locked | single dim ring, opacity 30%, color #1e3a5f | none | Lock icon top-right |
| active | inner cyan solid ring + outer cyan dashed ring (rotating) | cyan drop-shadow | none |
| completed | double green solid rings | green drop-shadow | CheckCircle top-right, green |

### Animations

- **Float**: translateY ±6px, 3–5s duration, seeded by `id.charCodeAt(0)` (preserved from current)
- **Active orbit**: outer dashed ring rotates 360° via CSS keyframe, 3s linear infinite
- **Completing**: scale `1 → 1.4 → 1` + white flash ring, triggered by `completing` prop (preserved)
- **Hover**: subtle scale 1.05, 150ms

### Data Props

`node.data` must include:
```js
{
  label: string,
  icon: string,        // emoji
  step: number,        // 1-based, for badge display
  prerequisite: string | null,
  difficulty: string,  // 'Beginner' | 'Intermediate' | 'Advanced'
  description: string,
  concepts: string[],
  videos: [{ title: string, url: string }],
  projects: string[],
}
```

Runtime-injected by RoadmapPage (unchanged):
```js
status: 'locked' | 'active' | 'completed'
onClick: (nodeId) => void
completing: boolean
```

## RoadmapEdge Redesign

### Path Style

```
inactive: stroke '#1e3a5f', strokeDasharray '4 6', no animation
active:   stroke '#06b6d4', strokeDasharray '4 6', marching-ants animation
```

### Marching-ants Animation

Defined in `globals.css`:
```css
@keyframes march {
  to { stroke-dashoffset: -40; }
}
```

Active edge `<path>` gets `animation: march 1s linear infinite`.

### Implementation

Drop `BaseEdge`. Use raw `<path>` inside custom SVG:
```jsx
const [path] = getBezierPath({ sourceX, sourceY, ... })
return (
  <path
    d={path}
    stroke={active ? '#06b6d4' : '#1e3a5f'}
    strokeWidth={2}
    strokeDasharray="4 6"
    strokeDashoffset={0}
    fill="none"
    style={active ? { animation: 'march 1s linear infinite' } : {}}
  />
)
```

No traveling dot. No edge labels.

## RightPanel

### Slide Animation (Framer Motion)

```js
initial:    { x: 420, opacity: 0 }
animate:    { x: 0,   opacity: 1 }
exit:       { x: 420, opacity: 0 }
transition: { type: 'spring', stiffness: 300, damping: 30 }
```

Wrapped in `<AnimatePresence>` in RoadmapCanvas.

### Panel Structure

```
┌─────────────────────────────────────┐
│ Step 2 of 4   [Beginner]         ✕ │  ← header
│ CSS                                 │
├─────────────────────────────────────┤
│ [ Learn ] [ Videos ] [ Projects ]  │  ← tabs
│           [ Practice ]             │
├─────────────────────────────────────┤
│                                     │
│  tab content (scrollable)           │
│                                     │
├─────────────────────────────────────┤
│  [ Mark as Completed ]              │  ← CTA footer
└─────────────────────────────────────┘
```

### Header

- Left: "Step N of M" (small gray text above title), node label (large white), difficulty badge
- Right: X close button (`aria-label="Close"`)
- `totalCount` passed as prop from RoadmapCanvas

### Tabs

| Tab | Content |
|---|---|
| Learn | `description` paragraph + `concepts` as bullet list |
| Videos | `videos` array as `<a>` links with PlayCircle icon |
| Projects | `projects` array as numbered list |
| Practice | Static placeholder: "Challenges coming soon" |

Active tab: cyan underline border. Default open tab: Learn.

### CTA Footer

- Button text: `'Mark as Completed'` (active) / `'✓ Already Completed'` (completed)
- `disabled` when status === `'completed'`
- Full-width, bottom of panel, sticky
- Calls `onComplete(nodeId)` → triggers completing animation on BubbleNode (same flow as TopicModal)

### Props Interface

```js
RightPanel({
  nodeData,      // full node.data object
  nodeId,        // string
  status,        // 'active' | 'completed'
  totalCount,    // number (for "Step N of M")
  onClose,       // () => void
  onComplete,    // (nodeId) => void
})
```

## Data File Changes

Each bubbleNode in `frontend.js`, `backend.js`, `fullstack.js` gets expanded `data`:

```js
// Example — frontend.js html node
{
  id: 'html',
  type: 'bubbleNode',
  position: { x: 260, y: 80 },
  data: {
    label: 'HTML',
    icon: '🌐',
    step: 1,
    prerequisite: null,
    difficulty: 'Beginner',
    description: 'HTML is the skeleton of every web page. Learn tags, attributes, and semantic structure.',
    concepts: ['Document structure', 'Semantic tags', 'Forms & inputs', 'Accessibility basics'],
    videos: [
      { title: 'HTML Full Course – freeCodeCamp', url: 'https://www.youtube.com/watch?v=pQN-pnXPaVg' },
    ],
    projects: [
      'Build a personal portfolio page',
      'Create a product landing page',
    ],
  },
}
```

All 20 bubbleNodes across 3 files get this treatment (4 frontend + 8 backend + 8 fullstack).

## Testing

### TopicModal tests — DELETE

`TopicModal.test.jsx` deleted (component deleted).

### RightPanel.test.jsx — CREATE (6 tests)

1. Renders panel with node title
2. Shows "Step N of M" in header
3. Defaults to Learn tab, shows description
4. Switches to Videos tab, shows video links
5. "Mark as Completed" calls onComplete
6. Button disabled and shows "✓ Already Completed" when status=completed

Tests use `@testing-library/react`, mock `onClose`/`onComplete` as `vi.fn()`.

## Locked Node Click Guard

`handleNodeClick` in RoadmapCanvas must guard locked nodes — panel must not open for locked bubbles:

```js
const handleNodeClick = useCallback((nodeId) => {
  const node = roadmap.nodes.find(n => n.id === nodeId)
  const status = getStatus(nodeId, node?.data.prerequisite)
  if (status === 'locked') return
  setSelectedNodeId(nodeId)
}, [roadmap.nodes, getStatus])
```

## Preserved Behaviors

- `useRoadmapStore` unchanged — `completed` Set, `getStatus`, `markComplete`
- `handleComplete` async flow unchanged — close panel → 280ms delay → completing animation → markComplete → clear after 1s
- `TrackLabelNode` unchanged
- `ParticleBackground` unchanged
- Float animation seeding by `id.charCodeAt(0)` preserved in BubbleNode
- `data-status` attribute on BubbleNode outer div preserved (for tests)
- `NODE_TYPES` / `EDGE_TYPES` at module scope (not inside component) preserved
