# UI Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the full-screen TopicModal with a slide-in RightPanel, upgrade BubbleNode to 160px with step badges and orbit rings, and convert edges to animated dotted paths.

**Architecture:** RightPanel is `position: fixed` on the right — canvas stays full-width behind it. BubbleNode and RoadmapEdge are visual-only changes. Data files get two new flat fields (`step`, `difficulty`) per bubbleNode.

**Tech Stack:** React 18, Framer Motion, @xyflow/react v12, Tailwind CSS v4, Vitest + @testing-library/react

---

### Task 1: Add `step` and `difficulty` to all three data files

**Files:**
- Modify: `src/data/frontend.js`
- Modify: `src/data/backend.js`
- Modify: `src/data/fullstack.js`

- [ ] **Step 1: Update frontend.js — add step + difficulty to each bubbleNode's data**

Replace the `data:` block of each node:

```js
// html node
data: {
  label: 'HTML',
  icon: '🌐',
  step: 1,
  difficulty: 'Beginner',
  prerequisite: null,
  topic: { /* keep exactly as-is */ },
},

// css node
data: {
  label: 'CSS',
  icon: '🎨',
  step: 2,
  difficulty: 'Beginner',
  prerequisite: 'html',
  topic: { /* keep exactly as-is */ },
},

// javascript node
data: {
  label: 'JavaScript',
  icon: '⚡',
  step: 3,
  difficulty: 'Intermediate',
  prerequisite: 'css',
  topic: { /* keep exactly as-is */ },
},

// react node
data: {
  label: 'React',
  icon: '⚛️',
  step: 4,
  difficulty: 'Intermediate',
  prerequisite: 'javascript',
  topic: { /* keep exactly as-is */ },
},
```

- [ ] **Step 2: Update backend.js — Node.js track (steps 1–4) and Python track (steps 1–4)**

```js
// nodejs
data: { label: 'Node.js', icon: '🟢', step: 1, difficulty: 'Beginner', prerequisite: null, topic: { /* keep */ } },

// express
data: { label: 'Express', icon: '🚂', step: 2, difficulty: 'Intermediate', prerequisite: 'nodejs', topic: { /* keep */ } },

// mongodb
data: { label: 'MongoDB', icon: '🍃', step: 3, difficulty: 'Intermediate', prerequisite: 'express', topic: { /* keep */ } },

// restapi
data: { label: 'REST API', icon: '🔌', step: 4, difficulty: 'Advanced', prerequisite: 'mongodb', topic: { /* keep */ } },

// python
data: { label: 'Python', icon: '🐍', step: 1, difficulty: 'Beginner', prerequisite: null, topic: { /* keep */ } },

// django
data: { label: 'Django', icon: '🎸', step: 2, difficulty: 'Intermediate', prerequisite: 'python', topic: { /* keep */ } },

// postgresql
data: { label: 'PostgreSQL', icon: '🐘', step: 3, difficulty: 'Intermediate', prerequisite: 'django', topic: { /* keep */ } },

// restapis
data: { label: 'REST APIs', icon: '🔗', step: 4, difficulty: 'Advanced', prerequisite: 'postgresql', topic: { /* keep */ } },
```

- [ ] **Step 3: Update fullstack.js — Frontend track (steps 1–4) and Backend track (steps 1–4)**

```js
// fs-html
data: { label: 'HTML', icon: '🌐', step: 1, difficulty: 'Beginner', prerequisite: null, topic: { /* keep */ } },

// fs-css
data: { label: 'CSS', icon: '🎨', step: 2, difficulty: 'Beginner', prerequisite: 'fs-html', topic: { /* keep */ } },

// fs-js
data: { label: 'JavaScript', icon: '⚡', step: 3, difficulty: 'Intermediate', prerequisite: 'fs-css', topic: { /* keep */ } },

// fs-react
data: { label: 'React', icon: '⚛️', step: 4, difficulty: 'Intermediate', prerequisite: 'fs-js', topic: { /* keep */ } },

// fs-nodejs
data: { label: 'Node.js', icon: '🟢', step: 1, difficulty: 'Beginner', prerequisite: null, topic: { /* keep */ } },

// fs-express
data: { label: 'Express', icon: '🚂', step: 2, difficulty: 'Intermediate', prerequisite: 'fs-nodejs', topic: { /* keep */ } },

// fs-mongodb
data: { label: 'MongoDB', icon: '🍃', step: 3, difficulty: 'Intermediate', prerequisite: 'fs-express', topic: { /* keep */ } },

// fs-deploy
data: { label: 'Deployment', icon: '🚀', step: 4, difficulty: 'Advanced', prerequisite: 'fs-mongodb', topic: { /* keep */ } },
```

- [ ] **Step 4: Run tests to confirm no regressions**

```
npm test
```

Expected: all existing tests pass (data fields are additive — no existing tests break).

- [ ] **Step 5: Commit**

```bash
git add src/data/frontend.js src/data/backend.js src/data/fullstack.js
git commit -m "feat: add step and difficulty fields to all bubbleNode data"
```

---

### Task 2: Add march keyframe + redesign RoadmapEdge

**Files:**
- Modify: `src/styles/globals.css`
- Modify: `src/components/RoadmapEdge.jsx`

- [ ] **Step 1: Add march keyframe to globals.css**

Open `src/styles/globals.css`. After the existing `glow-pulse-green` keyframe block, add:

```css
@keyframes march {
  to { stroke-dashoffset: -40; }
}
```

Full file after change:

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

@keyframes march {
  to { stroke-dashoffset: -40; }
}

.bubble-active  { animation: glow-pulse 3s ease-in-out infinite; }
.bubble-done    { animation: glow-pulse-green 2.5s ease-in-out infinite; }

/* Override React Flow defaults */
.react-flow__renderer { background: transparent !important; }
.react-flow__background { opacity: 0.3; }
```

- [ ] **Step 2: Replace RoadmapEdge.jsx with dotted animated edge**

Overwrite `src/components/RoadmapEdge.jsx` completely:

```jsx
import { getBezierPath } from '@xyflow/react'

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
    <path
      id={id}
      d={edgePath}
      fill="none"
      stroke={isActive ? '#06b6d4' : '#1e3a5f'}
      strokeWidth={isActive ? 2 : 1.5}
      strokeDasharray="4 6"
      style={isActive ? { animation: 'march 1s linear infinite' } : undefined}
    />
  )
}
```

- [ ] **Step 3: Run tests**

```
npm test
```

Expected: all tests pass (RoadmapEdge has no dedicated tests).

- [ ] **Step 4: Commit**

```bash
git add src/styles/globals.css src/components/RoadmapEdge.jsx
git commit -m "feat: dotted marching-ants edge animation, replace BaseEdge with raw path"
```

---

### Task 3: Write RightPanel tests (failing)

**Files:**
- Create: `src/components/RightPanel.test.jsx`

- [ ] **Step 1: Create RightPanel.test.jsx**

```jsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import RightPanel from './RightPanel'

const mockNodeData = {
  label: 'HTML',
  icon: '🌐',
  step: 1,
  difficulty: 'Beginner',
  topic: {
    description: 'The backbone of every webpage.',
    notes: 'Key concepts: elements, tags, attributes.',
    videos: [{ title: 'HTML Crash Course', url: 'https://youtube.com/watch?v=abc' }],
    projects: ['Build a portfolio page'],
    practice: ['Create a form with all input types'],
  },
}

describe('RightPanel', () => {
  it('renders panel with node title', () => {
    render(
      <RightPanel
        nodeData={mockNodeData}
        nodeId="html"
        status="active"
        totalCount={4}
        onClose={vi.fn()}
        onComplete={vi.fn()}
      />
    )
    expect(screen.getByText('HTML')).toBeInTheDocument()
  })

  it('shows Step N of M in header', () => {
    render(
      <RightPanel
        nodeData={mockNodeData}
        nodeId="html"
        status="active"
        totalCount={4}
        onClose={vi.fn()}
        onComplete={vi.fn()}
      />
    )
    expect(screen.getByText('Step 1 of 4')).toBeInTheDocument()
  })

  it('defaults to Learn tab and shows description', () => {
    render(
      <RightPanel
        nodeData={mockNodeData}
        nodeId="html"
        status="active"
        totalCount={4}
        onClose={vi.fn()}
        onComplete={vi.fn()}
      />
    )
    expect(screen.getByText('The backbone of every webpage.')).toBeInTheDocument()
  })

  it('switches to Videos tab and shows video links', () => {
    render(
      <RightPanel
        nodeData={mockNodeData}
        nodeId="html"
        status="active"
        totalCount={4}
        onClose={vi.fn()}
        onComplete={vi.fn()}
      />
    )
    fireEvent.click(screen.getByText('Videos'))
    expect(screen.getByText('HTML Crash Course')).toBeInTheDocument()
  })

  it('calls onComplete with nodeId when Mark as Completed clicked', () => {
    const onComplete = vi.fn()
    render(
      <RightPanel
        nodeData={mockNodeData}
        nodeId="html"
        status="active"
        totalCount={4}
        onClose={vi.fn()}
        onComplete={onComplete}
      />
    )
    fireEvent.click(screen.getByText('Mark as Completed'))
    expect(onComplete).toHaveBeenCalledWith('html')
  })

  it('shows completed state and disables button when status is completed', () => {
    render(
      <RightPanel
        nodeData={mockNodeData}
        nodeId="html"
        status="completed"
        totalCount={4}
        onClose={vi.fn()}
        onComplete={vi.fn()}
      />
    )
    expect(screen.getByText('✓ Already Completed')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '✓ Already Completed' })).toBeDisabled()
  })
})
```

- [ ] **Step 2: Run tests to confirm they fail (RightPanel does not exist yet)**

```
npm test
```

Expected: 6 tests fail with "Cannot find module './RightPanel'".

---

### Task 4: Create RightPanel.jsx

**Files:**
- Create: `src/components/RightPanel.jsx`

- [ ] **Step 1: Create RightPanel.jsx**

```jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, PlayCircle } from 'lucide-react'

const TABS = ['Learn', 'Videos', 'Projects', 'Practice']

const DIFFICULTY_COLORS = {
  Beginner:     { bg: 'rgba(34,197,94,0.12)',  text: '#4ade80', border: 'rgba(34,197,94,0.3)' },
  Intermediate: { bg: 'rgba(251,146,60,0.12)', text: '#fb923c', border: 'rgba(251,146,60,0.3)' },
  Advanced:     { bg: 'rgba(239,68,68,0.12)',  text: '#f87171', border: 'rgba(239,68,68,0.3)' },
}

export default function RightPanel({ nodeData, nodeId, status, totalCount, onClose, onComplete }) {
  const [activeTab, setActiveTab] = useState('Learn')
  const { label, icon, step, difficulty, topic } = nodeData
  const isCompleted = status === 'completed'
  const diffStyle = DIFFICULTY_COLORS[difficulty] || DIFFICULTY_COLORS.Beginner

  return (
    <motion.div
      className="fixed top-0 right-0 bottom-0 z-30 flex flex-col"
      style={{
        width: '420px',
        background: 'rgba(8, 18, 35, 0.97)',
        borderLeft: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(20px)',
        boxShadow: '-20px 0 60px rgba(0,0,0,0.5)',
      }}
      initial={{ x: 420, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 420, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Header */}
      <div
        className="flex items-start justify-between px-6 py-5 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="flex items-center gap-3">
          <span className="text-4xl">{icon}</span>
          <div>
            {step && totalCount && (
              <p className="text-xs text-slate-500 mb-0.5">Step {step} of {totalCount}</p>
            )}
            <h2 className="text-xl font-bold text-white leading-tight">{label}</h2>
            {difficulty && (
              <span
                className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mt-1"
                style={{
                  background: diffStyle.bg,
                  color: diffStyle.text,
                  border: `1px solid ${diffStyle.border}`,
                }}
              >
                {difficulty}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="text-slate-500 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5 flex-shrink-0"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div
        className="flex flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="flex-1 py-3 text-xs font-semibold tracking-wide transition-colors relative"
            style={{ color: activeTab === tab ? '#06b6d4' : '#64748b' }}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ background: '#06b6d4' }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
        {activeTab === 'Learn' && (
          <div className="space-y-4">
            <p className="text-slate-300 leading-relaxed text-sm">{topic.description}</p>
            {topic.notes && (
              <div
                className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap rounded-xl p-4"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                {topic.notes}
              </div>
            )}
          </div>
        )}

        {activeTab === 'Videos' && (
          <div className="space-y-2">
            {topic.videos.map((v, i) => (
              <a
                key={i}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl group transition-colors"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div className="w-9 h-9 rounded-lg bg-red-950/60 flex items-center justify-center flex-shrink-0">
                  <PlayCircle className="w-4 h-4 text-red-400" />
                </div>
                <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                  {v.title}
                </span>
              </a>
            ))}
          </div>
        )}

        {activeTab === 'Projects' && (
          <ul className="space-y-2">
            {topic.projects.map((p, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-300">
                <span className="text-purple-400 font-bold flex-shrink-0 mt-0.5">{i + 1}.</span>
                {p}
              </li>
            ))}
          </ul>
        )}

        {activeTab === 'Practice' && (
          <ul className="space-y-2">
            {topic.practice && topic.practice.length > 0 ? (
              topic.practice.map((p, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-300">
                  <span className="text-cyan-400 font-mono flex-shrink-0 mt-0.5">→</span>
                  {p}
                </li>
              ))
            ) : (
              <p className="text-slate-500 text-sm">Challenges coming soon.</p>
            )}
          </ul>
        )}
      </div>

      {/* CTA footer */}
      <div
        className="px-6 py-4 flex-shrink-0"
        style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
      >
        <motion.button
          onClick={!isCompleted ? () => onComplete(nodeId) : undefined}
          disabled={isCompleted}
          className="w-full py-3 rounded-xl font-bold text-sm tracking-wide"
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
  )
}
```

- [ ] **Step 2: Run tests**

```
npm test
```

Expected: all 6 RightPanel tests pass.

- [ ] **Step 3: Commit**

```bash
git add src/components/RightPanel.jsx src/components/RightPanel.test.jsx
git commit -m "feat: add RightPanel slide-in panel with tabs replacing TopicModal"
```

---

### Task 5: Update BubbleNode tests + redesign BubbleNode

**Files:**
- Modify: `src/components/BubbleNode.test.jsx`
- Modify: `src/components/BubbleNode.jsx`

- [ ] **Step 1: Add step to baseProps in BubbleNode.test.jsx**

In `src/components/BubbleNode.test.jsx`, update `baseProps` to include `step`:

```jsx
const baseProps = (overrides = {}) => ({
  id: 'html',
  data: {
    label: 'HTML',
    icon: '🌐',
    step: 1,
    status: 'active',
    onClick: vi.fn(),
    completing: false,
    ...overrides,
  },
})
```

No other test changes needed — existing tests check label, icon, onClick, locked state, and `data-status`. All still valid.

- [ ] **Step 2: Run tests to confirm they still pass before redesign**

```
npm test
```

Expected: all BubbleNode tests pass (baseProps change is backward-compatible).

- [ ] **Step 3: Redesign BubbleNode.jsx**

Overwrite `src/components/BubbleNode.jsx` completely:

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
  const { label, icon, step, status, onClick, completing } = data
  const isLocked = status === 'locked'
  const isCompleted = status === 'completed'
  const isActive = status === 'active'

  const stepLabel = step ? String(step).padStart(2, '0') : null

  return (
    <div data-status={status}>
      <Handle type="target" position={Position.Top} style={{ opacity: 0, pointerEvents: 'none' }} />

      <motion.div
        animate={
          completing
            ? { scale: [1, 1.4, 1], transition: { duration: 0.6, times: [0, 0.4, 1] } }
            : !isLocked
            ? floatAnimation(id)
            : undefined
        }
        whileHover={!isLocked ? { scale: 1.05 } : undefined}
        whileTap={!isLocked ? { scale: 0.95 } : undefined}
        onClick={!isLocked ? () => onClick(id) : undefined}
        className="relative w-40 h-40 rounded-full flex flex-col items-center justify-center select-none"
        style={{
          cursor: isLocked ? 'not-allowed' : 'pointer',
          background: isLocked
            ? '#0f172a'
            : 'radial-gradient(circle at 30% 30%, #0e2640, #020817)',
          border: isCompleted
            ? '2px solid #22c55e'
            : isActive
            ? '2px solid #06b6d4'
            : '2px solid #1e3a5f',
          boxShadow: isCompleted
            ? '0 0 20px #22c55e40, 0 0 50px #22c55e20'
            : isActive
            ? '0 0 20px #06b6d440, 0 0 50px #06b6d420'
            : 'none',
          opacity: isLocked ? 0.5 : 1,
        }}
      >
        {/* Step badge — top left */}
        {stepLabel && (
          <div
            className="absolute -top-2 -left-2 w-7 h-7 rounded-full flex items-center justify-center font-black z-10"
            style={{
              background: isCompleted ? '#22c55e' : isActive ? '#06b6d4' : '#334155',
              color: '#fff',
              fontSize: '0.6rem',
            }}
          >
            {stepLabel}
          </div>
        )}

        {/* Lock overlay */}
        <AnimatePresence>
          {isLocked && (
            <motion.div
              className="absolute inset-0 rounded-full bg-slate-900/70 flex items-center justify-center z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Lock className="w-6 h-6 text-slate-500" aria-hidden />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Completed badge — top right */}
        <AnimatePresence>
          {isCompleted && (
            <motion.div
              className="absolute -top-2 -right-2 z-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12, stiffness: 300 }}
            >
              <CheckCircle className="w-7 h-7 text-green-400 fill-green-950" aria-hidden />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Icon */}
        <span className="text-4xl mb-1.5 relative z-10">{icon}</span>

        {/* Label */}
        <span
          className="text-xs font-bold tracking-wide relative z-10 text-center px-2 leading-tight"
          style={{
            color: isLocked ? '#475569' : '#f1f5f9',
            maxWidth: '120px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </span>

        {/* Active: pulsing inner ring */}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: '2px solid #06b6d4' }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {/* Active: rotating outer dashed orbit ring */}
        {isActive && (
          <motion.div
            className="absolute rounded-full"
            style={{
              inset: '-10px',
              border: '2px dashed #06b6d480',
              borderRadius: '50%',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
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

- [ ] **Step 4: Run tests**

```
npm test
```

Expected: all BubbleNode tests pass. The redesign preserves `data-status`, label, icon, and click behavior.

- [ ] **Step 5: Commit**

```bash
git add src/components/BubbleNode.jsx src/components/BubbleNode.test.jsx
git commit -m "feat: redesign BubbleNode — 160px, step badge, orbit ring, updated glow states"
```

---

### Task 6: Update RoadmapPage — swap TopicModal for RightPanel, add locked guard

**Files:**
- Modify: `src/pages/RoadmapPage.jsx`

- [ ] **Step 1: Overwrite RoadmapPage.jsx**

```jsx
import { useState, useMemo, useCallback } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { ReactFlow, Background } from '@xyflow/react'
import { AnimatePresence } from 'framer-motion'
import '@xyflow/react/dist/style.css'

import { roadmapsRegistry } from '../data/roadmapsRegistry'
import { useRoadmapStore } from '../hooks/useRoadmapStore'
import BubbleNode from '../components/BubbleNode'
import RoadmapEdge from '../components/RoadmapEdge'
import TrackLabelNode from '../components/TrackLabelNode'
import RightPanel from '../components/RightPanel'
import ParticleBackground from '../components/ParticleBackground'

const NODE_TYPES = { bubbleNode: BubbleNode, trackLabel: TrackLabelNode }
const EDGE_TYPES = { roadmapEdge: RoadmapEdge }

export default function RoadmapPage() {
  const { id } = useParams()
  const roadmap = roadmapsRegistry[id]
  if (!roadmap) return <Navigate to="/" replace />
  return <RoadmapCanvas roadmap={roadmap} />
}

function RoadmapCanvas({ roadmap }) {
  const navigate = useNavigate()
  const { completed, getStatus, markComplete } = useRoadmapStore()
  const [selectedNodeId, setSelectedNodeId] = useState(null)
  const [completingNodeId, setCompletingNodeId] = useState(null)

  const handleNodeClick = useCallback((nodeId) => {
    const node = roadmap.nodes.find((n) => n.id === nodeId)
    if (!node) return
    if (getStatus(nodeId, node.data.prerequisite) === 'locked') return
    setSelectedNodeId(nodeId)
  }, [roadmap.nodes, getStatus])

  const handleComplete = useCallback(async (nodeId) => {
    setSelectedNodeId(null)
    await new Promise((r) => setTimeout(r, 280))
    setCompletingNodeId(nodeId)
    markComplete(nodeId)
    setTimeout(() => setCompletingNodeId(null), 1000)
  }, [markComplete])

  const nodes = useMemo(
    () =>
      roadmap.nodes.map((node) => {
        if (node.type === 'trackLabel') return node
        return {
          ...node,
          data: {
            ...node.data,
            status: getStatus(node.id, node.data.prerequisite),
            onClick: handleNodeClick,
            completing: completingNodeId === node.id,
          },
        }
      }),
    [roadmap.nodes, getStatus, handleNodeClick, completingNodeId]
  )

  const edges = useMemo(
    () =>
      roadmap.edges.map((edge) => ({
        ...edge,
        data: { active: completed.has(edge.source) },
        animated: false,
      })),
    [roadmap.edges, completed]
  )

  const selectedNode = selectedNodeId
    ? roadmap.nodes.find((n) => n.id === selectedNodeId)
    : null

  const completedCount = completed.size
  const totalCount = roadmap.nodes.filter((n) => n.type === 'bubbleNode').length

  return (
    <div className="w-screen h-screen bg-[#020817] relative overflow-hidden">
      <ParticleBackground />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/5"
          >
            ← Back
          </button>
          <div>
            <h1
              className="text-2xl font-black tracking-tight"
              style={{
                background: `linear-gradient(135deg, ${roadmap.color}, #a855f7)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {roadmap.label} Roadmap
            </h1>
            <p className="text-slate-500 text-xs mt-0.5 tracking-wide">
              Click a bubble to explore the topic
            </p>
          </div>
        </div>

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
                width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%`,
                background: `linear-gradient(90deg, ${roadmap.color}, #8b5cf6)`,
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

      {/* Right panel */}
      <AnimatePresence>
        {selectedNode && (
          <RightPanel
            key={selectedNodeId}
            nodeData={selectedNode.data}
            nodeId={selectedNodeId}
            status={getStatus(selectedNodeId, selectedNode.data.prerequisite)}
            totalCount={totalCount}
            onClose={() => setSelectedNodeId(null)}
            onComplete={handleComplete}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
```

- [ ] **Step 2: Run tests**

```
npm test
```

Expected: all tests pass.

- [ ] **Step 3: Commit**

```bash
git add src/pages/RoadmapPage.jsx
git commit -m "feat: wire RightPanel into RoadmapPage, guard locked node clicks"
```

---

### Task 7: Delete TopicModal and run final test suite

**Files:**
- Delete: `src/components/TopicModal.jsx`
- Delete: `src/components/TopicModal.test.jsx`

- [ ] **Step 1: Delete TopicModal.jsx**

```bash
git rm src/components/TopicModal.jsx
```

- [ ] **Step 2: Delete TopicModal.test.jsx**

```bash
git rm src/components/TopicModal.test.jsx
```

- [ ] **Step 3: Run full test suite**

```
npm test
```

Expected: all tests pass, TopicModal tests no longer exist, count reduces by 6. No other test should reference TopicModal (RoadmapPage no longer imports it).

- [ ] **Step 4: Commit**

```bash
git commit -m "chore: delete TopicModal — replaced by RightPanel"
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Task |
|---|---|
| Add step + difficulty to data | Task 1 |
| march keyframe in globals.css | Task 2 |
| Dotted RoadmapEdge with marching-ants | Task 2 |
| RightPanel slide-in animation | Task 4 |
| RightPanel header: Step N of M, difficulty badge | Task 4 |
| RightPanel tabs: Learn/Videos/Projects/Practice | Task 4 |
| RightPanel CTA: Mark as Completed / ✓ Already Completed | Task 4 |
| RightPanel.test.jsx 6 tests | Task 3 + 4 |
| BubbleNode 160px, step badge, orbit ring | Task 5 |
| BubbleNode float/completing animations preserved | Task 5 |
| BubbleNode data-status preserved | Task 5 |
| RoadmapPage: swap TopicModal → RightPanel | Task 6 |
| RoadmapPage: locked node click guard | Task 6 |
| Delete TopicModal.jsx + test | Task 7 |

**Type consistency check:**
- `RightPanel` props: `nodeData`, `nodeId`, `status`, `totalCount`, `onClose`, `onComplete` — used consistently in Task 4 (implementation) and Task 6 (caller)
- `nodeData.topic.description` / `topic.notes` / `topic.videos` / `topic.projects` / `topic.practice` — matches existing data file structure (no rename)
- `step` field: added in Task 1, consumed in Task 5 (BubbleNode) and Task 4 (RightPanel header)
- `difficulty` field: added in Task 1, consumed in Task 4 (RightPanel difficulty badge)
- `handleComplete` signature: `(nodeId: string) => void` — unchanged, matches RightPanel's `onComplete(nodeId)` call

**Placeholder scan:** No TBDs, no "implement later", no "similar to Task N" references. All code blocks are complete.
