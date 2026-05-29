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
| Tests | Vitest + @testing-library/react | jsdom environment |

---

## Project Structure

```
src/
  App.jsx                    # HashRouter root, 3 routes
  main.jsx                   # React DOM entry
  pages/
    HomePage.jsx             # 3-card roadmap picker
    RoadmapPage.jsx          # Canvas page — split into shell + RoadmapCanvas
  components/
    BubbleNode.jsx           # React Flow custom node — 160px circle, hover tooltip, step badge
    RoadmapEdge.jsx          # React Flow custom edge — dotted, marching-ants on active
    RightPanel.jsx           # Slide-in panel (420px), 5 tabs, replaces old TopicModal
    TrackLabelNode.jsx       # Non-interactive pill label for parallel tracks
    ParticleBackground.jsx   # tsParticles background
  data/
    roadmapsRegistry.js      # Maps id → roadmap config; exports roadmapsList
    frontend.js              # 4 bubbleNodes, 3 edges
    backend.js               # 8 bubbleNodes + 2 trackLabels, 6 edges (Node.js + Python tracks)
    fullstack.js             # 8 bubbleNodes + 2 trackLabels, 6 edges (fs- prefix on all IDs)
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
- Custom edges return raw SVG elements (e.g. `<path>`) — they render inside React Flow's SVG context.
- `TrackLabelNode` has no `<Handle>` and no animations — it is non-interactive.
- `data-status` attribute on BubbleNode outer `<div>` must be preserved — tests use `querySelector('[data-status="..."]')`.

### RoadmapPage split

Shell (`RoadmapPage`) does ONE thing: guard unknown `id` via `Navigate`. All hooks live in `RoadmapCanvas`. This is required by Rules of Hooks — you cannot call hooks after a conditional `return`.

### useRoadmapStore

- `completed` is a `Set<string>` — **never stored as derived status**.
- `getStatus(id, prerequisite)` is computed on render — not stored in state.
- `markComplete(id)` is idempotent.
- Store is in-memory per navigation — resets on route change (by design).

### Data shape — every bubbleNode

```js
{
  id: string,           // unique across ALL roadmaps — fullstack uses 'fs-' prefix
  type: 'bubbleNode',
  position: { x, y },
  data: {
    label: string,
    icon: string,         // emoji
    step: number,         // 1-based, per-track (parallel tracks each restart at 1)
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced',
    resources: [{ title: string, url: string, description?: string }],  // Resources tab links
    prerequisite: string | null,  // id of required node, or null
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

`trackLabel` nodes have only `{ label: string }` in data — no step, difficulty, topic, prerequisite.

### RoadmapPage — injected data props

`nodes` useMemo spreads `node.data` then adds runtime props:
```js
status: getStatus(node.id, node.data.prerequisite),  // 'locked' | 'active' | 'completed'
completing: completingNodeId === node.id,
```

Node clicks are handled via `onNodeClick` prop on `<ReactFlow>` — NOT via `onClick` in node data. This is required because `elementsSelectable={false}` + `nodesDraggable={false}` blocks pointer events on node wrappers in @xyflow/react v12, preventing inner element onClick handlers from firing. `onNodeClick` fires at the flow level and bypasses this.

`handleNodeClick` guards locked nodes — clicking a locked bubble is a no-op.

### RightPanel

Props: `nodeData, nodeId, status, totalCount, onClose, onComplete`

Tabs: **Learn** / **Videos** / **Projects** / **Practice** / **Resources**

- Learn: `topic.description` + `topic.notes`
- Videos: `topic.videos` — PlayCircle icon, opens in new tab
- Projects: `topic.projects` — numbered list
- Practice: `topic.practice` — arrow list, falls back to "Challenges coming soon."
- Resources: `nodeData.resources` — ExternalLink icon, title + description, opens in new tab; falls back to "Resources coming soon."
- All array reads are guarded with `?? []`.
- `motion.button` with `disabled={isCompleted}` — renders a real `<button>`.
- Button text exactly: `'Mark as Completed'` (active) / `'✓ Already Completed'` (completed).

### BubbleNode hover tooltip

- `isHovered` state (useState) tracks mouse enter/leave on the motion.div.
- Tooltip renders inside the motion.div — floats with the bubble.
- `pointer-events: none` on tooltip — does not block canvas interactions.
- Tooltip hidden for locked nodes (`onMouseEnter` guards `!isLocked`).
- `.react-flow__node:hover { z-index: 1000 !important }` in globals.css elevates hovered node above siblings.

### Routing

`HashRouter` is required — GitHub Pages doesn't support `BrowserRouter` SPA fallback. URLs look like `/#/roadmap/frontend`.

`base: '/roadmap/'` in `vite.config.js` — all asset paths prefixed accordingly.

### Tailwind v4

- Import: `@import "tailwindcss"` — NOT the old `@tailwind base/components/utilities` directives.
- Plugin: `@tailwindcss/vite` in `vite.config.js`.
- No `tailwind.config.js` needed.

### lucide-react

`Youtube` icon does **not exist** in installed version (1.17). Use `PlayCircle` for video links.

### ID collisions

`fullstack.js` prefixes all node IDs with `fs-` (e.g. `fs-html`, `fs-nodejs`) to avoid collisions with `backend.js` which uses bare IDs (`nodejs`, `express`, etc.).

---

## Tests — 51 total (7 files)

```
src/hooks/useRoadmapStore.test.js
src/components/BubbleNode.test.jsx        # uses ReactFlowProvider wrapper
src/components/RightPanel.test.jsx
src/data/frontend.test.js
src/data/backend.test.js
src/data/fullstack.test.js
src/data/roadmapsRegistry.test.js
```

BubbleNode tests wrap renders in `<ReactFlowProvider>`. RightPanel tests do not need a provider.

---

## Deployment

```bash
npm run deploy   # runs predeploy (build) then gh-pages -d dist
```

Hosted at: `https://aman-0402.github.io/roadmap/`

Uses `gh-pages` package. Branch: `gh-pages`. Repo: `https://github.com/Aman-0402/roadmap`.
