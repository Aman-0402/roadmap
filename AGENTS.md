# AGENTS.md — Roadmap App

Agent-facing guide. Read before touching any file.

---

## Commands

```bash
npm run dev        # Vite dev server — http://localhost:5173/roadmap/
npm test           # Vitest (run once)
npm run test:watch # Vitest watch mode
npm run build      # Production build → dist/
npm run deploy     # Build + push to gh-pages branch (GitHub Pages)
```

---

## Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | React 19 + Vite 8 | |
| Routing | React Router DOM v7 | `HashRouter` — required for GitHub Pages SPA |
| Flow canvas | @xyflow/react v12 | Custom node + edge types |
| Animation | Framer Motion v12 | |
| Styling | Tailwind CSS v4 | `@import "tailwindcss"` — no `tailwind.config.js` |
| Particles | @tsparticles/react v3 + @tsparticles/slim | |
| Icons | lucide-react v1.17 | `Youtube` NOT exported — use `PlayCircle` |
| Tech icons | icepanel.io | URL pattern: `https://icon.icepanel.io/Technology/svg/{Name}.svg` |
| Tests | Vitest + @testing-library/react | jsdom environment |

---

## Project Structure

```
src/
  App.jsx                    # HashRouter root, 4 routes (/roadmap/:id)
  main.jsx                   # React DOM entry
  pages/
    HomePage.jsx             # 4-card responsive grid (1-col mobile, 2-col tablet, 4-col desktop)
    RoadmapPage.jsx          # Canvas page — split into shell + RoadmapCanvas
  components/
    BubbleNode.jsx           # React Flow custom node — 160px, tech icon, hover tooltip, burst animation
    RoadmapEdge.jsx          # React Flow custom edge — dotted, marching-ants on active
    RightPanel.jsx           # Slide-in panel — desktop: right 420px / mobile: bottom sheet 85vh
    TrackLabelNode.jsx       # Non-interactive pill label for parallel tracks
    ParticleBackground.jsx   # tsParticles background
  data/
    roadmapsRegistry.js      # Maps id → roadmap config; exports roadmapsList (4 items)
    frontend.js              # 4 bubbleNodes, 3 edges — linear layout
    backend.js               # 8 bubbleNodes + 2 trackLabels, 6 edges — V-shape converging
    fullstack.js             # 8 bubbleNodes + 2 trackLabels, 6 edges — V-shape (fs- prefix)
    python.js                # 8 bubbleNodes + 2 trackLabels, 6 edges — V-shape (py- prefix)
  hooks/
    useRoadmapStore.js       # completed Set, getStatus(), markComplete()
  styles/
    globals.css              # Tailwind import + keyframes (glow-pulse, march)
  test/
    setup.js                 # @testing-library/jest-dom import
```

---

## Critical Rules

### React Flow

- `NODE_TYPES` and `EDGE_TYPES` **must be at module scope** — defining them inside a component causes an infinite re-render loop.
- Custom edges return raw SVG `<path>` elements — they render inside React Flow's SVG context.
- `TrackLabelNode` has no `<Handle>` and no animations — non-interactive.
- `data-status` attribute on BubbleNode outer `<div>` must be preserved — tests use `querySelector('[data-status="..."]')`.
- **Node clicks use `onNodeClick` on `<ReactFlow>`, NOT `onClick` in node data.** `elementsSelectable={false}` + `nodesDraggable={false}` disables pointer events on node wrappers in @xyflow/react v12 — inner onClick handlers never fire. `onNodeClick` fires at the flow level and bypasses this.
- Initial viewport set via `onInit` → `flow.fitView({ nodes: step1Ids, ... })` — NOT via `fitView` prop.

### RoadmapPage split

Shell (`RoadmapPage`) guards unknown `id` via `Navigate`. All hooks live in `RoadmapCanvas`. Required by Rules of Hooks — cannot call hooks after a conditional `return`.

### useRoadmapStore

- `completed` is a `Set<string>` — never stored as derived status.
- `getStatus(id, prerequisite)` computed on render — not stored in state.
- `markComplete(id)` is idempotent.
- Store is in-memory — resets on route change (by design).

### Data shape — every bubbleNode

```js
{
  id: string,           // unique across ALL roadmaps
                        // fullstack: 'fs-' prefix, python: 'py-' prefix
  type: 'bubbleNode',
  position: { x, y },
  data: {
    label: string,
    icon: string,         // icepanel.io URL OR emoji — both supported
                          // BubbleNode/RightPanel/HomePage check icon.startsWith('http')
    step: number,         // 1-based, per-track (parallel tracks each restart at 1)
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced',
    resources: [{ title: string, url: string, description?: string }],
    prerequisite: string | null,
    topic: {
      description: string,
      notes: string,            // multi-line, whitespace-preserved
      videos: [{ title, url }],
      projects: string[],
      practice: string[],
    },
  },
}
```

`trackLabel` nodes have only `{ label: string }` in data.

**IMPORTANT:** `resources` is at `nodeData.resources` — NOT inside `nodeData.topic`. Do not read `topic.resources` (always undefined).

### Icon URLs

Format: `https://icon.icepanel.io/Technology/svg/{Name}.svg`

Confirmed slugs: `HTML5`, `CSS3`, `JavaScript`, `React`, `Node.js`, `Express`, `MongoDB`, `Python`, `Django`, `PostgresSQL` (double-s — their typo), `NumPy`, `Pandas`, `Matplotlib`, `scikit-learn`, `Flask`, `FastAPI`

### RoadmapPage — injected data props

`nodes` useMemo spreads `node.data` and adds:
```js
status: getStatus(node.id, node.data.prerequisite),  // 'locked' | 'active' | 'completed'
completing: completingNodeId === node.id,
```

`handleNodeClick` (called from `onNodeClick`) guards locked nodes — locked bubbles are no-ops.

### RightPanel

Props: `nodeData, nodeId, status, totalCount, onClose, onComplete`

**Desktop** (`>= 640px`): `position: fixed, right: 0, top: 0, bottom: 0, width: 420px`, slides in from right (`x: 420 → 0`).

**Mobile** (`< 640px`): `position: fixed, left: 0, right: 0, bottom: 0, height: 85vh, borderRadius: 16px 16px 0 0`, slides up from bottom (`y: 100% → 0`). Has drag handle pill at top.

Mobile detection: `useState(() => window.innerWidth < 640)` + resize listener.

Tabs: **Learn** / **Videos** / **Projects** / **Practice** / **Resources**
- Learn: `topic.description` + `topic.notes`
- Videos: `topic.videos` — PlayCircle icon
- Projects: `topic.projects` — numbered list
- Practice: `topic.practice` — arrow list
- Resources: `nodeData.resources` — ExternalLink icon (NOT `topic.resources`)
- All arrays guarded with `?? []`.
- Button: `'Mark as Completed'` (active) / `'✓ Already Completed'` (completed, disabled).

### BubbleNode

- 160px circle (`w-40 h-40`)
- `step` badge: top-left, zero-padded (`'01'`, `'02'`), colored by status
- Icon: if `icon.startsWith('http')` → `<img>`, else → `<span>` emoji
- `isHovered` state drives hover tooltip (inside motion.div, floats with bubble)
- Tooltip: `pointer-events: none`, hidden for locked nodes
- Orbit ring (`inset: '-10px'`): `pointerEvents: 'none'` — must not block clicks
- Completing animation: `scale: [1, 1.55, 0.88, 1.05, 1]` + 3 shockwave rings + 8 star particles flying outward
- `data-status` on root `<div>` — preserved for tests

### V-shape layout (Backend, Full Stack, Python)

Parallel tracks start wide at top and converge toward center as they progress:
```
Left track x:  60 → 100 → 140 → 160  (shifts right)
Right track x: 540 → 500 → 460 → 440 (shifts left)
y positions:   60, 300, 540, 780      (240px spacing)
Track labels:  y = -70
```

240px vertical spacing = 80px gap between 160px nodes.

### ID namespacing

| Roadmap | Prefix | Example |
|---|---|---|
| frontend | none | `html`, `react` |
| backend | none | `nodejs`, `python` |
| fullstack | `fs-` | `fs-html`, `fs-nodejs` |
| python | `py-` | `py-numpy`, `py-django` |

### Routing

`HashRouter` — URLs: `/#/roadmap/frontend`, `/#/roadmap/python`, etc.
`base: '/roadmap/'` in `vite.config.js`.

### Tailwind v4

`@import "tailwindcss"` — NOT `@tailwind` directives. No `tailwind.config.js`. Plugin: `@tailwindcss/vite`.

### lucide-react

`Youtube` not exported in v1.17 — use `PlayCircle`.

---

## Tests — 51 total (7 files)

```
src/hooks/useRoadmapStore.test.js
src/components/BubbleNode.test.jsx        # uses ReactFlowProvider wrapper
src/components/RightPanel.test.jsx
src/data/frontend.test.js
src/data/backend.test.js
src/data/fullstack.test.js
src/data/roadmapsRegistry.test.js         # expects 4 roadmaps, list ['frontend','backend','fullstack','python']
```

BubbleNode tests: wrap in `<ReactFlowProvider>`, pass `step: 1` in baseProps.
RightPanel tests: no provider needed.

---

## Deployment

```bash
npm run deploy   # runs predeploy (build) then gh-pages -d dist
```

Hosted at: `https://aman-0402.github.io/roadmap/`
Repo: `https://github.com/Aman-0402/roadmap`
