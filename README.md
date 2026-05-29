# SkillPath — Interactive Learning Roadmap

A futuristic, interactive learning roadmap web app for students. Pick a roadmap, explore topics by clicking glowing bubbles, and track your progress as you learn.

**Live demo:** https://aman-0402.github.io/roadmap/

---

## Features

- **4 roadmaps** — Frontend, Backend, Full Stack, Python
- **Interactive canvas** — scroll to pan, pinch to zoom, animated bubble nodes
- **Tech icons** — real SVG logos from icepanel.io on every bubble
- **Hover previews** — tooltip shows description, difficulty, and "Click to explore →"
- **Slide-in panel** — click a bubble to open a detail panel with 5 tabs: Learn / Videos / Projects / Practice / Resources
- **Burst animation** — shockwave rings + star particles on "Mark as Completed"
- **Unlock progression** — prerequisites enforce learning order; locked nodes are dimmed
- **Animated edges** — dotted marching-ants paths, cyan glow when source is completed
- **Converging V-shape layout** — parallel tracks visually converge as you progress
- **Mobile responsive** — bottom sheet panel on mobile, compact header, fluid card grid
- **Particles background** — ambient floating particle effect

## Roadmaps

| Roadmap | Layout | Topics |
|---|---|---|
| Frontend | Linear | HTML → CSS → JavaScript → React |
| Backend | V-shape | Node.js → Express → MongoDB → REST API ‖ Python → Django → PostgreSQL → REST APIs |
| Full Stack | V-shape | Frontend track ‖ Backend track (parallel) |
| Python | V-shape | NumPy → Pandas → Matplotlib → Scikit-learn ‖ Django → Flask → FastAPI → Deployment |

## Getting Started

```bash
npm install
npm run dev        # http://localhost:5173/roadmap/
```

## Commands

```bash
npm run dev        # dev server with HMR
npm test           # run test suite (51 tests)
npm run build      # production build → dist/
npm run deploy     # build + deploy to GitHub Pages
```

## Stack

- **React 19** + **Vite 8**
- **@xyflow/react v12** — flow canvas with custom nodes and edges
- **Framer Motion v12** — bubble float, slide-in panel, burst animation, hover tooltips
- **Tailwind CSS v4** — utility styling, responsive breakpoints
- **tsParticles** — background particles
- **React Router DOM v7** — HashRouter for GitHub Pages compatibility
- **lucide-react** — icons in panel UI
- **Vitest** + **@testing-library/react** — unit tests

## Project Structure

```
src/
  pages/
    HomePage.jsx        # 4-card grid roadmap picker (responsive)
    RoadmapPage.jsx     # canvas + panel page
  components/
    BubbleNode.jsx      # 160px bubble — tech icon, step badge, hover tooltip, burst animation
    RoadmapEdge.jsx     # dotted marching-ants edge
    RightPanel.jsx      # slide-in panel (desktop right / mobile bottom sheet), 5 tabs
    TrackLabelNode.jsx  # parallel track header label
    ParticleBackground.jsx
  data/
    frontend.js         # 4 bubbleNodes, 3 edges — linear layout
    backend.js          # 8 bubbleNodes + 2 trackLabels, 6 edges — V-shape
    fullstack.js        # 8 bubbleNodes + 2 trackLabels, 6 edges — V-shape (fs- prefix)
    python.js           # 8 bubbleNodes + 2 trackLabels, 6 edges — V-shape (py- prefix)
    roadmapsRegistry.js # maps id → roadmap config; exports roadmapsList
  hooks/
    useRoadmapStore.js  # completion state (in-memory Set)
```

## How It Works

1. Home screen shows 4 roadmap cards in a grid — click one to enter the canvas
2. Canvas opens zoomed in on first node(s) — scroll down to reveal the path
3. Hover a bubble → tooltip shows description, difficulty, and CTA
4. Click an **active** bubble → panel slides in (right on desktop, bottom on mobile)
5. Panel has 5 tabs: **Learn** (notes), **Videos**, **Projects**, **Practice**, **Resources**
6. Click **Mark as Completed** → burst animation plays, node turns green, next unlocks
7. **Locked** nodes (prerequisites not met) are dimmed — click does nothing
8. Progress bar in the header tracks completion
