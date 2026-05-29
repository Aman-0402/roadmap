# Roadmap Screen Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a futuristic galaxy-map style interactive roadmap screen with animated skill bubbles, unlock progression, and a full-screen topic modal.

**Architecture:** React Flow owns the canvas with custom BubbleNode and RoadmapEdge components. State lives in a `useRoadmapStore` hook (local React state, no Redux). TopicModal is mounted as a sibling to React Flow, controlled by RoadmapPage.

**Tech Stack:** React 18 + Vite, React Router DOM, Tailwind CSS, Framer Motion, @xyflow/react (React Flow v12), @tsparticles/react + @tsparticles/slim, Lucide React, Vitest + @testing-library/react.

---

## File Map

| File | Responsibility |
|---|---|
| `src/data/roadmapData.js` | Node positions, edges, dummy topic content |
| `src/hooks/useRoadmapStore.js` | `completed` set, `getStatus`, `markComplete` |
| `src/components/ParticleBackground.jsx` | tsParticles background layer |
| `src/components/BubbleNode.jsx` | React Flow custom node — glow, lock, float, click |
| `src/components/RoadmapEdge.jsx` | Animated SVG edge between bubbles |
| `src/components/TopicModal.jsx` | Full-screen modal — notes, videos, projects, practice, CTA |
| `src/pages/RoadmapPage.jsx` | React Flow canvas + modal controller + unlock sequence |
| `src/styles/globals.css` | Tailwind base + custom glow keyframes |
| `src/App.jsx` | React Router root — single `/` route |
| `src/main.jsx` | Vite entry |
| `src/test/setup.js` | Vitest + testing-library global setup |
| `vitest.config.js` | Vitest config |

---

## Task 1: Scaffold Vite + React project and install dependencies

**Files:**
- Create: `package.json`, `vite.config.js`, all Vite defaults

- [ ] **Step 1.1: Scaffold Vite React project**

Run inside `d:/code/GITHUB/roadmap`:

```bash
npm create vite@latest . -- --template react
```

When prompted "Current directory is not empty. Please choose how to proceed" → choose **Ignore files and continue**.

Expected output: `Done. Now run: npm install`

- [ ] **Step 1.2: Install runtime dependencies**

```bash
npm install react-router-dom framer-motion @xyflow/react @tsparticles/react @tsparticles/slim lucide-react
```

Expected: packages added, no peer dep errors.

- [ ] **Step 1.3: Install Tailwind and dev dependencies**

```bash
npm install -D tailwindcss @tailwindcss/vite vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Expected: packages added.

- [ ] **Step 1.4: Verify dev server starts**

```bash
npm run dev
```

Expected: Vite dev server at `http://localhost:5173`. Stop with Ctrl+C.

- [ ] **Step 1.5: Commit**

```bash
git add package.json package-lock.json vite.config.js index.html
git commit -m "chore: scaffold vite react project with dependencies"
```

---

## Task 2: Configure Tailwind CSS and global styles

**Files:**
- Modify: `vite.config.js`
- Create: `src/styles/globals.css`
- Modify: `src/main.jsx`

- [ ] **Step 2.1: Configure Tailwind in vite.config.js**

Replace the entire content of `vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

- [ ] **Step 2.2: Create global CSS file**

Create `src/styles/globals.css`:

```css
@import "tailwindcss";

@layer base {
  * {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background-color: #020817;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    color-scheme: dark;
  }
}

@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 20px #06b6d440, 0 0 40px #06b6d420; }
  50%       { box-shadow: 0 0 30px #06b6d460, 0 0 60px #06b6d430; }
}

@keyframes glow-pulse-green {
  0%, 100% { box-shadow: 0 0 20px #22c55e40, 0 0 40px #22c55e20; }
  50%       { box-shadow: 0 0 35px #22c55e70, 0 0 70px #22c55e40; }
}

.bubble-active  { animation: glow-pulse 3s ease-in-out infinite; }
.bubble-done    { animation: glow-pulse-green 2.5s ease-in-out infinite; }

/* Override React Flow defaults */
.react-flow__renderer { background: transparent !important; }
.react-flow__background { opacity: 0.3; }
```

- [ ] **Step 2.3: Update main.jsx to import globals**

Replace `src/main.jsx`:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 2.4: Verify Tailwind works**

```bash
npm run dev
```

Open `http://localhost:5173`. Background should be `#020817` (near-black). Stop server.

- [ ] **Step 2.5: Commit**

```bash
git add vite.config.js src/styles/globals.css src/main.jsx
git commit -m "chore: configure tailwind css and global styles"
```

---

## Task 3: Configure Vitest

**Files:**
- Create: `vitest.config.js`
- Create: `src/test/setup.js`

- [ ] **Step 3.1: Create vitest config**

Create `vitest.config.js`:

```js
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    globals: true,
  },
})
```

- [ ] **Step 3.2: Create test setup file**

Create `src/test/setup.js`:

```js
import '@testing-library/jest-dom'
```

- [ ] **Step 3.3: Add test script to package.json**

Open `package.json`. Find the `"scripts"` section and add:

```json
"test": "vitest run",
"test:watch": "vitest",
"test:ui": "vitest --ui"
```

- [ ] **Step 3.4: Verify vitest runs**

```bash
npm test
```

Expected: `No test files found` — that's fine, no tests yet.

- [ ] **Step 3.5: Commit**

```bash
git add vitest.config.js src/test/setup.js package.json
git commit -m "chore: configure vitest with jsdom and testing-library"
```

---

## Task 4: Data layer — roadmapData.js

**Files:**
- Create: `src/data/roadmapData.js`
- Create: `src/data/roadmapData.test.js`

- [ ] **Step 4.1: Write the failing test first**

Create `src/data/roadmapData.test.js`:

```js
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
```

- [ ] **Step 4.2: Run test — verify it fails**

```bash
npm test
```

Expected: FAIL — `Cannot find module './roadmapData'`

- [ ] **Step 4.3: Create roadmapData.js**

Create `src/data/roadmapData.js`:

```js
export const roadmapNodes = [
  {
    id: 'html',
    type: 'bubbleNode',
    position: { x: 300, y: 80 },
    data: {
      label: 'HTML',
      icon: '🌐',
      prerequisite: null,
      topic: {
        description: 'The backbone of every webpage. HTML defines the structure and content of web pages using a system of elements and tags.',
        notes: `HTML (HyperText Markup Language) is the standard markup language for web pages.

Key concepts:
• Document structure: DOCTYPE, html, head, body
• Semantic elements: header, nav, main, section, article, footer
• Forms and inputs: text, email, password, radio, checkbox, select
• Tables for tabular data
• Media: img, video, audio
• Links and navigation with <a>
• Meta tags and SEO basics`,
        videos: [
          { title: 'HTML Full Course - Build a Website Tutorial', url: 'https://www.youtube.com/watch?v=pQN-pnXPaVg' },
          { title: 'HTML Crash Course For Absolute Beginners', url: 'https://www.youtube.com/watch?v=UB1O30fR-EE' },
        ],
        projects: [
          'Build a personal portfolio page with bio, skills, and contact sections',
          'Create a multi-page blog layout with proper semantic HTML',
          'Build a restaurant menu page with tables and images',
        ],
        practice: [
          'Create a form with every input type: text, email, password, radio, checkbox, select, textarea',
          'Build a semantic news article layout with header, article, aside, footer',
          'Recreate a Wikipedia article page structure using only HTML',
        ],
      },
    },
  },
  {
    id: 'css',
    type: 'bubbleNode',
    position: { x: 650, y: 280 },
    data: {
      label: 'CSS',
      icon: '🎨',
      prerequisite: 'html',
      topic: {
        description: 'CSS brings HTML to life. Style, layout, animations — CSS controls how your web pages look and feel across all devices.',
        notes: `CSS (Cascading Style Sheets) controls presentation.

Key concepts:
• Selectors: element, class, id, pseudo-class (:hover, :nth-child)
• Box model: margin, border, padding, content
• Flexbox: flex-direction, justify-content, align-items
• Grid: grid-template-columns, grid-area, gap
• Responsive design with media queries
• Animations and transitions
• CSS custom properties (variables)
• Pseudo-elements: ::before, ::after`,
        videos: [
          { title: 'CSS Tutorial - Zero to Hero (Complete Course)', url: 'https://www.youtube.com/watch?v=1Rs2ND1ryYc' },
          { title: 'Flexbox in 100 Seconds', url: 'https://www.youtube.com/watch?v=K74l26pE4YA' },
        ],
        projects: [
          'Style your HTML portfolio with CSS — colors, fonts, responsive layout',
          'Build a responsive navbar that collapses to hamburger on mobile',
          'Create a card grid layout using CSS Grid with hover effects',
        ],
        practice: [
          'Recreate the GitHub profile page layout using only CSS',
          'Build a pure CSS animated loading spinner',
          'Center a div 5 different ways (flexbox, grid, absolute, margin auto, transform)',
        ],
      },
    },
  },
  {
    id: 'javascript',
    type: 'bubbleNode',
    position: { x: 180, y: 500 },
    data: {
      label: 'JavaScript',
      icon: '⚡',
      prerequisite: 'css',
      topic: {
        description: 'JavaScript makes web pages interactive and dynamic. The programming language of the web — runs in every browser, and on servers with Node.js.',
        notes: `JavaScript is the programming language of the web.

Key concepts:
• Variables: let, const (avoid var)
• Functions and arrow functions
• Arrays: map, filter, reduce, find
• Objects and destructuring
• DOM manipulation: querySelector, addEventListener
• Events: click, input, submit, keydown
• Promises and async/await
• Fetch API for HTTP requests
• ES6+ features: spread, rest, modules, template literals`,
        videos: [
          { title: 'JavaScript Crash Course For Beginners', url: 'https://www.youtube.com/watch?v=hdI2bqOjy3c' },
          { title: 'Async JavaScript - Callbacks, Promises, Async/Await', url: 'https://www.youtube.com/watch?v=PoRJizFvM7s' },
        ],
        projects: [
          'Build a todo list app with add, complete, and delete — no frameworks',
          'Create a weather app that fetches data from the Open-Meteo public API',
          'Build a quiz game with score tracking and a results screen',
        ],
        practice: [
          'Implement a debounce function from scratch without using libraries',
          'Fetch and display GitHub user data by username using the GitHub API',
          'Build a countdown timer with start, stop, and reset buttons',
        ],
      },
    },
  },
  {
    id: 'react',
    type: 'bubbleNode',
    position: { x: 580, y: 650 },
    data: {
      label: 'React',
      icon: '⚛️',
      prerequisite: 'javascript',
      topic: {
        description: 'React is a JavaScript library for building user interfaces from reusable components. The industry standard for modern web apps.',
        notes: `React builds UIs from components.

Key concepts:
• JSX syntax — HTML-like in JavaScript
• Functional components
• Props: passing data down to children
• State with useState hook
• Side effects with useEffect hook
• Custom hooks for reusable logic
• Context API for global state
• React Router for client-side navigation
• Component composition patterns`,
        videos: [
          { title: 'React JS Crash Course', url: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8' },
          { title: 'React Hooks Explained', url: 'https://www.youtube.com/watch?v=TNhaISOUy6Q' },
        ],
        projects: [
          'Rebuild your JavaScript todo app in React using useState and useEffect',
          'Build a multi-page app with React Router — home, about, contact',
          'Create a shopping cart with Context API for global state management',
        ],
        practice: [
          'Build a reusable Modal component that renders via React Portal',
          'Create a custom useFetch hook that handles loading and error states',
          'Implement infinite scroll using useEffect and IntersectionObserver',
        ],
      },
    },
  },
]

export const roadmapEdges = [
  {
    id: 'e-html-css',
    source: 'html',
    target: 'css',
    type: 'roadmapEdge',
    data: { active: false },
  },
  {
    id: 'e-css-js',
    source: 'css',
    target: 'javascript',
    type: 'roadmapEdge',
    data: { active: false },
  },
  {
    id: 'e-js-react',
    source: 'javascript',
    target: 'react',
    type: 'roadmapEdge',
    data: { active: false },
  },
]
```

- [ ] **Step 4.4: Run test — verify it passes**

```bash
npm test
```

Expected: 6 tests PASS.

- [ ] **Step 4.5: Commit**

```bash
git add src/data/roadmapData.js src/data/roadmapData.test.js
git commit -m "feat: add roadmap data layer with nodes and edges"
```

---

## Task 5: useRoadmapStore hook

**Files:**
- Create: `src/hooks/useRoadmapStore.js`
- Create: `src/hooks/useRoadmapStore.test.js`

- [ ] **Step 5.1: Write the failing tests**

Create `src/hooks/useRoadmapStore.test.js`:

```js
import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useRoadmapStore } from './useRoadmapStore'

describe('useRoadmapStore', () => {
  it('html (null prerequisite) is unlocked by default', () => {
    const { result } = renderHook(() => useRoadmapStore())
    expect(result.current.getStatus('html', null)).toBe('active')
  })

  it('css (prerequisite: html) is locked by default', () => {
    const { result } = renderHook(() => useRoadmapStore())
    expect(result.current.getStatus('css', 'html')).toBe('locked')
  })

  it('after marking html complete, html status becomes completed', () => {
    const { result } = renderHook(() => useRoadmapStore())
    act(() => result.current.markComplete('html'))
    expect(result.current.getStatus('html', null)).toBe('completed')
  })

  it('after marking html complete, css becomes active', () => {
    const { result } = renderHook(() => useRoadmapStore())
    act(() => result.current.markComplete('html'))
    expect(result.current.getStatus('css', 'html')).toBe('active')
  })

  it('javascript stays locked until css is completed', () => {
    const { result } = renderHook(() => useRoadmapStore())
    act(() => result.current.markComplete('html'))
    expect(result.current.getStatus('javascript', 'css')).toBe('locked')
    act(() => result.current.markComplete('css'))
    expect(result.current.getStatus('javascript', 'css')).toBe('active')
  })

  it('completed set exposed contains marked ids', () => {
    const { result } = renderHook(() => useRoadmapStore())
    act(() => result.current.markComplete('html'))
    expect(result.current.completed.has('html')).toBe(true)
    expect(result.current.completed.has('css')).toBe(false)
  })

  it('markComplete is idempotent — calling twice does not break state', () => {
    const { result } = renderHook(() => useRoadmapStore())
    act(() => {
      result.current.markComplete('html')
      result.current.markComplete('html')
    })
    expect(result.current.getStatus('html', null)).toBe('completed')
  })
})
```

- [ ] **Step 5.2: Run test — verify it fails**

```bash
npm test
```

Expected: FAIL — `Cannot find module './useRoadmapStore'`

- [ ] **Step 5.3: Implement the hook**

Create `src/hooks/useRoadmapStore.js`:

```js
import { useState, useCallback } from 'react'

export function useRoadmapStore() {
  const [completed, setCompleted] = useState(() => new Set())

  const markComplete = useCallback((id) => {
    setCompleted(prev => {
      if (prev.has(id)) return prev
      return new Set([...prev, id])
    })
  }, [])

  const getStatus = useCallback(
    (id, prerequisite) => {
      if (completed.has(id)) return 'completed'
      if (prerequisite === null || completed.has(prerequisite)) return 'active'
      return 'locked'
    },
    [completed]
  )

  return { completed, markComplete, getStatus }
}
```

- [ ] **Step 5.4: Run test — verify it passes**

```bash
npm test
```

Expected: all 13 tests PASS (6 from Task 4 + 7 new).

- [ ] **Step 5.5: Commit**

```bash
git add src/hooks/useRoadmapStore.js src/hooks/useRoadmapStore.test.js
git commit -m "feat: add useRoadmapStore hook with completion and unlock logic"
```

---

## Task 6: ParticleBackground component

**Files:**
- Create: `src/components/ParticleBackground.jsx`

- [ ] **Step 6.1: Create the component**

Create `src/components/ParticleBackground.jsx`:

```jsx
import { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

export default function ParticleBackground() {
  const [engineReady, setEngineReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setEngineReady(true))
  }, [])

  if (!engineReady) return null

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0 z-0 pointer-events-none"
      options={{
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        particles: {
          color: { value: ['#06b6d4', '#8b5cf6', '#a855f7'] },
          move: {
            enable: true,
            speed: 0.4,
            direction: 'none',
            random: true,
            straight: false,
          },
          number: { value: 80, density: { enable: true, area: 800 } },
          opacity: { value: { min: 0.1, max: 0.4 } },
          size: { value: { min: 1, max: 2.5 } },
          links: { enable: false },
        },
        detectRetina: true,
      }}
    />
  )
}
```

- [ ] **Step 6.2: Verify no import errors by importing in App.jsx temporarily**

Temporarily replace `src/App.jsx` with:

```jsx
import ParticleBackground from './components/ParticleBackground'

export default function App() {
  return (
    <div className="w-screen h-screen bg-[#020817] relative overflow-hidden">
      <ParticleBackground />
      <p className="text-white relative z-10 p-8">Particles test</p>
    </div>
  )
}
```

Run `npm run dev` and verify floating cyan/purple dots appear. Stop server.

- [ ] **Step 6.3: Commit**

```bash
git add src/components/ParticleBackground.jsx
git commit -m "feat: add tsparticles background component"
```

---

## Task 7: BubbleNode component

**Files:**
- Create: `src/components/BubbleNode.jsx`
- Create: `src/components/BubbleNode.test.jsx`

- [ ] **Step 7.1: Write the failing test**

Create `src/components/BubbleNode.test.jsx`:

```jsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ReactFlowProvider } from '@xyflow/react'
import BubbleNode from './BubbleNode'

const wrap = (ui) => render(<ReactFlowProvider>{ui}</ReactFlowProvider>)

const baseProps = (overrides = {}) => ({
  id: 'html',
  data: {
    label: 'HTML',
    icon: '🌐',
    status: 'active',
    onClick: vi.fn(),
    completing: false,
    ...overrides,
  },
})

describe('BubbleNode', () => {
  it('renders the label', () => {
    wrap(<BubbleNode {...baseProps()} />)
    expect(screen.getByText('HTML')).toBeInTheDocument()
  })

  it('renders the icon', () => {
    wrap(<BubbleNode {...baseProps()} />)
    expect(screen.getByText('🌐')).toBeInTheDocument()
  })

  it('calls onClick with node id when active and clicked', () => {
    const onClick = vi.fn()
    wrap(<BubbleNode {...baseProps({ onClick })} />)
    fireEvent.click(screen.getByText('HTML'))
    expect(onClick).toHaveBeenCalledWith('html')
  })

  it('does not call onClick when locked', () => {
    const onClick = vi.fn()
    wrap(<BubbleNode {...baseProps({ status: 'locked', onClick })} />)
    fireEvent.click(screen.getByText('HTML'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('shows lock icon when locked', () => {
    wrap(<BubbleNode {...baseProps({ status: 'locked' })} />)
    // Lucide Lock icon has aria-hidden, check the wrapper class
    expect(document.querySelector('[data-status="locked"]')).toBeInTheDocument()
  })

  it('shows checkmark badge when completed', () => {
    wrap(<BubbleNode {...baseProps({ status: 'completed' })} />)
    expect(document.querySelector('[data-status="completed"]')).toBeInTheDocument()
  })
})
```

- [ ] **Step 7.2: Run test — verify it fails**

```bash
npm test
```

Expected: FAIL — `Cannot find module './BubbleNode'`

- [ ] **Step 7.3: Create BubbleNode.jsx**

Create `src/components/BubbleNode.jsx`:

```jsx
import { memo } from 'react'
import { Handle, Position } from '@xyflow/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, CheckCircle } from 'lucide-react'

const floatAnimation = (id) => {
  const seed = id.charCodeAt(0)
  return {
    y: [0, -(8 + (seed % 6)), 0],
    transition: {
      duration: 2.5 + (seed % 15) / 10,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: (seed % 10) / 10,
    },
  }
}

function BubbleNode({ id, data }) {
  const { label, icon, status, onClick, completing } = data
  const isLocked = status === 'locked'
  const isCompleted = status === 'completed'
  const isActive = status === 'active'

  const borderColor = isCompleted ? '#22c55e' : isActive ? '#06b6d4' : '#334155'
  const glowColor = isCompleted ? '#22c55e' : isActive ? '#06b6d4' : null

  return (
    <div data-status={status}>
      <Handle type="target" position={Position.Top} style={{ opacity: 0, pointerEvents: 'none' }} />

      <motion.div
        animate={completing
          ? { scale: [1, 1.35, 1], transition: { duration: 0.6, times: [0, 0.4, 1] } }
          : !isLocked ? floatAnimation(id) : undefined
        }
        whileHover={!isLocked ? { scale: 1.08 } : undefined}
        whileTap={!isLocked ? { scale: 0.95 } : undefined}
        onClick={!isLocked ? () => onClick(id) : undefined}
        className="relative w-28 h-28 rounded-full flex flex-col items-center justify-center select-none"
        style={{
          cursor: isLocked ? 'not-allowed' : 'pointer',
          background: isLocked
            ? '#0f172a'
            : 'radial-gradient(circle at 30% 30%, #0e2640, #020817)',
          border: `2px solid ${borderColor}`,
          boxShadow: glowColor
            ? `0 0 20px ${glowColor}40, 0 0 50px ${glowColor}20`
            : 'none',
        }}
      >
        {/* Lock overlay */}
        <AnimatePresence>
          {isLocked && (
            <motion.div
              className="absolute inset-0 rounded-full bg-slate-900/70 flex items-center justify-center z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Lock className="w-5 h-5 text-slate-500" aria-hidden />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Completed badge */}
        <AnimatePresence>
          {isCompleted && (
            <motion.div
              className="absolute -top-1.5 -right-1.5 z-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12, stiffness: 300 }}
            >
              <CheckCircle className="w-6 h-6 text-green-400 fill-green-950" aria-hidden />
            </motion.div>
          )}
        </AnimatePresence>

        <span className="text-2xl mb-1 relative z-10">{icon}</span>
        <span
          className="text-xs font-bold tracking-wide relative z-10"
          style={{ color: isLocked ? '#475569' : '#f1f5f9' }}
        >
          {label}
        </span>

        {/* Active pulse ring */}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: '2px solid #06b6d4' }}
            animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {/* Completing flash ring */}
        {completing && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: '3px solid #22c55e' }}
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </motion.div>

      <Handle type="source" position={Position.Bottom} style={{ opacity: 0, pointerEvents: 'none' }} />
    </div>
  )
}

export default memo(BubbleNode)
```

- [ ] **Step 7.4: Run test — verify it passes**

```bash
npm test
```

Expected: all tests PASS.

- [ ] **Step 7.5: Commit**

```bash
git add src/components/BubbleNode.jsx src/components/BubbleNode.test.jsx
git commit -m "feat: add BubbleNode component with glow, lock, float, and unlock animations"
```

---

## Task 8: RoadmapEdge component

**Files:**
- Create: `src/components/RoadmapEdge.jsx`

- [ ] **Step 8.1: Create RoadmapEdge.jsx**

Create `src/components/RoadmapEdge.jsx`:

```jsx
import { BaseEdge, getBezierPath } from '@xyflow/react'

export default function RoadmapEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  })

  const isActive = data?.active

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: isActive ? '#8b5cf6' : '#1e3a5f',
          strokeWidth: isActive ? 2.5 : 1.5,
          strokeDasharray: isActive ? 'none' : '6 5',
          filter: isActive ? 'drop-shadow(0 0 6px #8b5cf680)' : 'none',
          transition: 'stroke 0.6s, strokeWidth 0.6s',
        }}
      />

      {/* Animated dot that travels along active edges */}
      {isActive && (
        <circle r="4" fill="#a855f7" filter="drop-shadow(0 0 4px #a855f7)">
          <animateMotion dur="2.5s" repeatCount="indefinite" path={edgePath} />
        </circle>
      )}
    </>
  )
}
```

- [ ] **Step 8.2: Smoke test by importing in App.jsx temporarily**

Temporarily add `import RoadmapEdge from './components/RoadmapEdge'` to `App.jsx`. Run `npm run dev`. No import errors = good. Revert `App.jsx` to the particle test from Task 6.

- [ ] **Step 8.3: Commit**

```bash
git add src/components/RoadmapEdge.jsx
git commit -m "feat: add RoadmapEdge component with animated traveller dot"
```

---

## Task 9: TopicModal component

**Files:**
- Create: `src/components/TopicModal.jsx`
- Create: `src/components/TopicModal.test.jsx`

- [ ] **Step 9.1: Write the failing tests**

Create `src/components/TopicModal.test.jsx`:

```jsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TopicModal from './TopicModal'

const mockNodeData = {
  label: 'HTML',
  icon: '🌐',
  topic: {
    description: 'The backbone of every webpage.',
    notes: 'Key concepts: elements, tags, attributes.',
    videos: [{ title: 'HTML Crash Course', url: 'https://youtube.com/watch?v=abc' }],
    projects: ['Build a portfolio page'],
    practice: ['Create a form with all input types'],
  },
}

describe('TopicModal', () => {
  it('renders topic title', () => {
    render(
      <TopicModal
        nodeData={mockNodeData}
        nodeId="html"
        status="active"
        onClose={vi.fn()}
        onComplete={vi.fn()}
      />
    )
    expect(screen.getByText('HTML')).toBeInTheDocument()
  })

  it('renders description', () => {
    render(
      <TopicModal
        nodeData={mockNodeData}
        nodeId="html"
        status="active"
        onClose={vi.fn()}
        onComplete={vi.fn()}
      />
    )
    expect(screen.getByText('The backbone of every webpage.')).toBeInTheDocument()
  })

  it('renders video links', () => {
    render(
      <TopicModal
        nodeData={mockNodeData}
        nodeId="html"
        status="active"
        onClose={vi.fn()}
        onComplete={vi.fn()}
      />
    )
    expect(screen.getByText('HTML Crash Course')).toBeInTheDocument()
  })

  it('calls onComplete with nodeId when Mark as Completed clicked', () => {
    const onComplete = vi.fn()
    render(
      <TopicModal
        nodeData={mockNodeData}
        nodeId="html"
        status="active"
        onClose={vi.fn()}
        onComplete={onComplete}
      />
    )
    fireEvent.click(screen.getByText('Mark as Completed'))
    expect(onComplete).toHaveBeenCalledWith('html')
  })

  it('shows completed state and disables button when status is completed', () => {
    render(
      <TopicModal
        nodeData={mockNodeData}
        nodeId="html"
        status="completed"
        onClose={vi.fn()}
        onComplete={vi.fn()}
      />
    )
    expect(screen.getByText('✓ Already Completed')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '✓ Already Completed' })).toBeDisabled()
  })

  it('calls onClose when backdrop is clicked', () => {
    const onClose = vi.fn()
    render(
      <TopicModal
        nodeData={mockNodeData}
        nodeId="html"
        status="active"
        onClose={onClose}
        onComplete={vi.fn()}
      />
    )
    fireEvent.click(screen.getByTestId('modal-backdrop'))
    expect(onClose).toHaveBeenCalled()
  })
})
```

- [ ] **Step 9.2: Run test — verify it fails**

```bash
npm test
```

Expected: FAIL — `Cannot find module './TopicModal'`

- [ ] **Step 9.3: Create TopicModal.jsx**

Create `src/components/TopicModal.jsx`:

```jsx
import { motion } from 'framer-motion'
import { X, BookOpen, Youtube, Code, Terminal, CheckCircle } from 'lucide-react'

export default function TopicModal({ nodeData, nodeId, status, onClose, onComplete }) {
  const { label, icon, topic } = nodeData
  const isCompleted = status === 'completed'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        data-testid="modal-backdrop"
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal card */}
      <motion.div
        className="relative z-10 w-full max-w-2xl max-h-[88vh] flex flex-col rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(10, 22, 40, 0.95)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 0 60px rgba(6,182,212,0.08), 0 25px 50px rgba(0,0,0,0.6)',
        }}
        initial={{ scale: 0.88, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 22, stiffness: 300 }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-center gap-3">
            <span className="text-4xl">{icon}</span>
            <div>
              <h2 className="text-xl font-bold text-white">{label}</h2>
              {isCompleted && (
                <span className="flex items-center gap-1 text-xs text-green-400 mt-0.5">
                  <CheckCircle className="w-3 h-3" /> Completed
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-7">
          <p className="text-slate-300 leading-relaxed">{topic.description}</p>

          {/* Notes */}
          <Section icon={<BookOpen className="w-4 h-4 text-cyan-400" />} title="Notes">
            <div
              className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap rounded-xl p-4"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              {topic.notes}
            </div>
          </Section>

          {/* Video Resources */}
          <Section icon={<Youtube className="w-4 h-4 text-red-400" />} title="Video Resources">
            <div className="space-y-2">
              {topic.videos.map((v, i) => (
                <a
                  key={i}
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl transition-colors group"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                >
                  <div className="w-9 h-9 rounded-lg bg-red-950/60 flex items-center justify-center flex-shrink-0">
                    <Youtube className="w-4 h-4 text-red-400" />
                  </div>
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{v.title}</span>
                </a>
              ))}
            </div>
          </Section>

          {/* Projects */}
          <Section icon={<Code className="w-4 h-4 text-purple-400" />} title="Projects">
            <ul className="space-y-2">
              {topic.projects.map((p, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-300">
                  <span className="text-purple-400 font-bold flex-shrink-0 mt-0.5">{i + 1}.</span>
                  {p}
                </li>
              ))}
            </ul>
          </Section>

          {/* Practice Challenges */}
          <Section icon={<Terminal className="w-4 h-4 text-cyan-400" />} title="Practice Challenges">
            <ul className="space-y-2">
              {topic.practice.map((p, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-300">
                  <span className="text-cyan-400 font-mono flex-shrink-0 mt-0.5">→</span>
                  {p}
                </li>
              ))}
            </ul>
          </Section>
        </div>

        {/* Footer CTA */}
        <div
          className="px-6 py-4 flex-shrink-0"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <motion.button
            onClick={!isCompleted ? () => onComplete(nodeId) : undefined}
            disabled={isCompleted}
            className="w-full py-3 rounded-xl font-bold text-sm tracking-wide transition-all"
            style={
              isCompleted
                ? {
                    background: 'rgba(34,197,94,0.1)',
                    border: '1px solid rgba(34,197,94,0.3)',
                    color: '#4ade80',
                    cursor: 'not-allowed',
                  }
                : {
                    background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
                    color: '#fff',
                    cursor: 'pointer',
                  }
            }
            whileHover={!isCompleted ? { scale: 1.02, filter: 'brightness(1.1)' } : undefined}
            whileTap={!isCompleted ? { scale: 0.98 } : undefined}
          >
            {isCompleted ? '✓ Already Completed' : 'Mark as Completed'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

function Section({ icon, title, children }) {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
        {icon}
        {title}
      </h3>
      {children}
    </div>
  )
}
```

- [ ] **Step 9.4: Run test — verify it passes**

```bash
npm test
```

Expected: all tests PASS.

- [ ] **Step 9.5: Commit**

```bash
git add src/components/TopicModal.jsx src/components/TopicModal.test.jsx
git commit -m "feat: add TopicModal with notes, videos, projects, practice, and complete CTA"
```

---

## Task 10: RoadmapPage — wire everything together

**Files:**
- Create: `src/pages/RoadmapPage.jsx`

- [ ] **Step 10.1: Create RoadmapPage.jsx**

Create `src/pages/RoadmapPage.jsx`:

```jsx
import { useState, useMemo, useCallback } from 'react'
import { ReactFlow, Background, AnimatePresence as FlowAnimatePresence } from '@xyflow/react'
import { AnimatePresence } from 'framer-motion'
import '@xyflow/react/dist/style.css'

import { roadmapNodes, roadmapEdges } from '../data/roadmapData'
import { useRoadmapStore } from '../hooks/useRoadmapStore'
import BubbleNode from '../components/BubbleNode'
import RoadmapEdge from '../components/RoadmapEdge'
import TopicModal from '../components/TopicModal'
import ParticleBackground from '../components/ParticleBackground'

const NODE_TYPES = { bubbleNode: BubbleNode }
const EDGE_TYPES = { roadmapEdge: RoadmapEdge }

export default function RoadmapPage() {
  const { completed, getStatus, markComplete } = useRoadmapStore()
  const [selectedNodeId, setSelectedNodeId] = useState(null)
  const [completingNodeId, setCompletingNodeId] = useState(null)

  const handleNodeClick = useCallback((nodeId) => {
    setSelectedNodeId(nodeId)
  }, [])

  const handleComplete = useCallback(async (nodeId) => {
    // Close modal first, then trigger completion animation
    setSelectedNodeId(null)
    await new Promise((r) => setTimeout(r, 280))
    setCompletingNodeId(nodeId)
    markComplete(nodeId)
    setTimeout(() => setCompletingNodeId(null), 1000)
  }, [markComplete])

  const nodes = useMemo(
    () =>
      roadmapNodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          status: getStatus(node.id, node.data.prerequisite),
          onClick: handleNodeClick,
          completing: completingNodeId === node.id,
        },
      })),
    [getStatus, handleNodeClick, completingNodeId]
  )

  const edges = useMemo(
    () =>
      roadmapEdges.map((edge) => ({
        ...edge,
        data: { active: completed.has(edge.source) },
        animated: false,
      })),
    [completed]
  )

  const selectedNode = selectedNodeId
    ? roadmapNodes.find((n) => n.id === selectedNodeId)
    : null

  const completedCount = completed.size
  const totalCount = roadmapNodes.length

  return (
    <div className="w-screen h-screen bg-[#020817] relative overflow-hidden">
      <ParticleBackground />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-5">
        <div>
          <h1
            className="text-2xl font-black tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #06b6d4, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Frontend Roadmap
          </h1>
          <p className="text-slate-500 text-xs mt-0.5 tracking-wide">
            Click a bubble to explore the topic
          </p>
        </div>

        {/* Progress pill */}
        <div
          className="flex items-center gap-3 px-4 py-2 rounded-full"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <span className="text-slate-400 text-xs">Progress</span>
          <span className="text-white font-bold text-sm">
            {completedCount} / {totalCount}
          </span>
          <div className="w-20 h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${(completedCount / totalCount) * 100}%`,
                background: 'linear-gradient(90deg, #06b6d4, #8b5cf6)',
              }}
            />
          </div>
        </div>
      </div>

      {/* React Flow canvas */}
      <div className="absolute inset-0 z-10">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={NODE_TYPES}
          edgeTypes={EDGE_TYPES}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          panOnDrag
          zoomOnScroll
          minZoom={0.4}
          maxZoom={1.5}
          proOptions={{ hideAttribution: true }}
          style={{ background: 'transparent' }}
        >
          <Background color="#0f2040" gap={36} size={1} />
        </ReactFlow>
      </div>

      {/* Modal — mounted above canvas */}
      <AnimatePresence>
        {selectedNode && (
          <div className="absolute inset-0 z-30">
            <TopicModal
              nodeData={selectedNode.data}
              nodeId={selectedNodeId}
              status={getStatus(selectedNodeId, selectedNode.data.prerequisite)}
              onClose={() => setSelectedNodeId(null)}
              onComplete={handleComplete}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
```

- [ ] **Step 10.2: Commit**

```bash
git add src/pages/RoadmapPage.jsx
git commit -m "feat: add RoadmapPage wiring React Flow, modal, and unlock sequence"
```

---

## Task 11: App.jsx and final wiring

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 11.1: Replace App.jsx with router setup**

Replace `src/App.jsx`:

```jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import RoadmapPage from './pages/RoadmapPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoadmapPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
```

- [ ] **Step 11.2: Clean up Vite default files**

Delete these Vite boilerplate files:

```bash
rm src/App.css src/assets/react.svg public/vite.svg
```

- [ ] **Step 11.3: Update index.html title**

Open `index.html`. Replace:

```html
<title>Vite + React</title>
```

with:

```html
<title>Frontend Roadmap</title>
```

Also replace `<link rel="icon" type="image/svg+xml" href="/vite.svg" />` with:

```html
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🗺️</text></svg>" />
```

- [ ] **Step 11.4: Run final test suite**

```bash
npm test
```

Expected: all tests PASS. Note count in output.

- [ ] **Step 11.5: Start dev server and verify full flow**

```bash
npm run dev
```

Open `http://localhost:5173`. Verify:

1. Dark background with floating cyan/purple particles
2. Four skill bubbles on the canvas — HTML glowing cyan, others dim/locked
3. Click HTML bubble → full-screen modal opens with notes, videos, projects, practice
4. Click "Mark as Completed" → modal closes, HTML pulses green, CSS unlocks (cyan glow appears)
5. Click CSS bubble → modal opens
6. Progress pill in header increments from 0/4 → 1/4 after HTML completion

Stop server.

- [ ] **Step 11.6: Final commit**

```bash
git add src/App.jsx index.html
git commit -m "feat: wire App router and complete roadmap screen"
```

---

## Self-Review

**Spec coverage:**
- ✅ Dark futuristic background — `#020817` + tsParticles
- ✅ Floating animated particles — ParticleBackground
- ✅ Center roadmap path — React Flow canvas with fitView
- ✅ Giant glowing skill bubbles — BubbleNode with glow/pulse
- ✅ HTML unlocked by default, others locked — `prerequisite: null` on HTML
- ✅ Click bubble opens full-screen modal — TopicModal
- ✅ Notes, YouTube, Projects, Practice sections — TopicModal scrollable sections
- ✅ Mark as Completed button — TopicModal footer CTA
- ✅ Green glow + checkmark on completion — BubbleNode `completed` state
- ✅ Connection path animates on unlock — RoadmapEdge `active` prop
- ✅ Next bubble unlocks — `getStatus` derives from `completed` set
- ✅ Completing animation (scale pulse + flash ring) — `completing` prop on BubbleNode
- ✅ Progress tracker — header progress pill in RoadmapPage
- ✅ Glassmorphism — TopicModal backdrop-blur + transparent bg
- ✅ Responsive — `fitView` on React Flow, modal `max-w-2xl` with full-screen mobile
- ✅ Reusable components — BubbleNode, RoadmapEdge, TopicModal, ParticleBackground all standalone

**Placeholder scan:** No TBDs. All code is complete.

**Type consistency:**
- `getStatus(id, prerequisite)` — consistent across hook, RoadmapPage, TopicModal call
- `markComplete(id)` — consistent hook → RoadmapPage → TopicModal
- `status: 'active' | 'locked' | 'completed'` — consistent across BubbleNode, TopicModal
- `data.completing` — set in RoadmapPage, consumed in BubbleNode
- `data.active` on edges — set in RoadmapPage edges memo, consumed in RoadmapEdge
