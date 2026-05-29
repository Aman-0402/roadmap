# SkillPath — Interactive Learning Roadmap

A futuristic, interactive learning roadmap web app for students. Pick a roadmap, explore topics by clicking glowing bubbles, and track your progress as you learn.

**Live demo:** https://aman-0402.github.io/roadmap/

---

## Features

- **3 roadmaps** — Frontend, Backend, Full Stack
- **Interactive canvas** — pan, zoom, animated bubble nodes
- **Hover previews** — hover a bubble to see topic description and difficulty
- **Slide-in panel** — click a bubble to open a detail panel with Learn / Videos / Projects / Practice tabs
- **Progress tracking** — unlock nodes sequentially as you complete prerequisites
- **Animated edges** — dotted marching-ants paths between topics
- **Particles background** — ambient floating particle effect

## Roadmaps

| Roadmap | Topics |
|---|---|
| Frontend | HTML → CSS → JavaScript → React |
| Backend | Node.js → Express → MongoDB → REST API (parallel: Python → Django → PostgreSQL → REST APIs) |
| Full Stack | Frontend track + Backend track in parallel |

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
- **Framer Motion** — bubble float, slide-in panel, hover tooltips
- **Tailwind CSS v4** — utility styling
- **tsParticles** — background particles
- **React Router DOM v7** — HashRouter for GitHub Pages compatibility
- **Vitest** + **@testing-library/react** — unit tests

## Project Structure

```
src/
  pages/
    HomePage.jsx        # roadmap selection screen
    RoadmapPage.jsx     # canvas + panel page
  components/
    BubbleNode.jsx      # topic bubble with hover tooltip
    RoadmapEdge.jsx     # animated dotted edge
    RightPanel.jsx      # slide-in detail panel
    TrackLabelNode.jsx  # parallel track header label
    ParticleBackground.jsx
  data/
    frontend.js         # node + edge definitions
    backend.js
    fullstack.js
    roadmapsRegistry.js
  hooks/
    useRoadmapStore.js  # completion state
```

## How It Works

1. Home screen shows 3 roadmap cards — click one to enter the canvas
2. Hover over a bubble → tooltip shows topic description and difficulty
3. Click an **active** bubble → right panel slides in with study materials
4. Click **Mark as Completed** → node turns green, next node unlocks
5. **Locked** nodes (prerequisites not met) are dimmed and non-interactive
6. Progress bar in the header tracks completion per roadmap
