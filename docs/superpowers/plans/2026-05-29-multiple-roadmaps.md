# Multiple Roadmaps Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a home screen with Frontend, Backend, and Full Stack roadmap cards, each opening a galaxy-map canvas with its own skill bubbles.

**Architecture:** Separate data file per roadmap. A `roadmapsRegistry` maps string IDs to data. `RoadmapPage` reads `id` from `useParams()`, looks up the registry, and renders that roadmap's nodes and edges. `useRoadmapStore` is unchanged — state resets per navigation. `RoadmapPage` is split into a shell (guard + params) and an inner `RoadmapCanvas` component to satisfy React's Rules of Hooks.

**Tech Stack:** React 18 + Vite, React Router DOM v6 (`useParams`, `useNavigate`), React Flow (@xyflow/react), Framer Motion, Tailwind CSS.

---

## File Map

| Action | File | Purpose |
|---|---|---|
| Create | `src/data/frontend.js` | Frontend nodes + edges (moved from roadmapData.js, renamed exports) |
| Create | `src/data/frontend.test.js` | Tests for frontend data (replaces roadmapData.test.js) |
| Create | `src/data/backend.js` | Backend nodes + edges — Node.js + Python parallel tracks |
| Create | `src/data/backend.test.js` | Tests for backend data |
| Create | `src/data/fullstack.js` | Full Stack nodes + edges — Frontend + Backend parallel tracks |
| Create | `src/data/fullstack.test.js` | Tests for fullstack data |
| Create | `src/data/roadmapsRegistry.js` | Maps id → `{ label, icon, color, description, nodes, edges }` |
| Create | `src/data/roadmapsRegistry.test.js` | Tests for registry |
| Create | `src/components/TrackLabelNode.jsx` | Non-interactive React Flow node for parallel track headers |
| Create | `src/pages/HomePage.jsx` | 3-card roadmap selection screen |
| Modify | `src/pages/RoadmapPage.jsx` | useParams, registry lookup, back button, split into shell+canvas |
| Modify | `src/App.jsx` | Add `/roadmap/:id` route, `/` → HomePage |
| Delete | `src/data/roadmapData.js` | Replaced by frontend.js |
| Delete | `src/data/roadmapData.test.js` | Replaced by frontend.test.js |

---

## Task 1: Create frontend.js (migrate from roadmapData.js)

**Files:**
- Create: `src/data/frontend.js`
- Create: `src/data/frontend.test.js`

- [ ] **Step 1.1: Write the failing test**

Create `src/data/frontend.test.js`:

```js
import { describe, it, expect } from 'vitest'
import { nodes, edges } from './frontend'

describe('frontend data', () => {
  it('exports 4 nodes', () => {
    expect(nodes).toHaveLength(4)
  })

  it('all nodes are bubbleNode type', () => {
    nodes.forEach(n => expect(n.type).toBe('bubbleNode'))
  })

  it('html node has null prerequisite', () => {
    const html = nodes.find(n => n.id === 'html')
    expect(html.data.prerequisite).toBeNull()
  })

  it('each non-html node has a prerequisite pointing to another node id', () => {
    const ids = nodes.map(n => n.id)
    nodes
      .filter(n => n.data.prerequisite !== null)
      .forEach(n => expect(ids).toContain(n.data.prerequisite))
  })

  it('each node has required topic fields', () => {
    nodes.forEach(n => {
      expect(n.data.topic).toHaveProperty('description')
      expect(n.data.topic).toHaveProperty('notes')
      expect(n.data.topic).toHaveProperty('videos')
      expect(n.data.topic).toHaveProperty('projects')
      expect(n.data.topic).toHaveProperty('practice')
    })
  })

  it('exports 3 edges in correct order', () => {
    expect(edges).toHaveLength(3)
    expect(edges[0]).toMatchObject({ source: 'html', target: 'css' })
    expect(edges[1]).toMatchObject({ source: 'css', target: 'javascript' })
    expect(edges[2]).toMatchObject({ source: 'javascript', target: 'react' })
  })

  it('all edges use roadmapEdge type', () => {
    edges.forEach(e => expect(e.type).toBe('roadmapEdge'))
  })
})
```

- [ ] **Step 1.2: Run test — verify it fails**

```bash
cd d:/code/GITHUB/roadmap && npm test
```

Expected: FAIL — `Cannot find module './frontend'`

- [ ] **Step 1.3: Create frontend.js**

Create `src/data/frontend.js` (exact same content as `roadmapData.js` but exports renamed from `roadmapNodes`/`roadmapEdges` to `nodes`/`edges`):

```js
export const nodes = [
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

export const edges = [
  { id: 'e-html-css', source: 'html', target: 'css', type: 'roadmapEdge', data: { active: false } },
  { id: 'e-css-js', source: 'css', target: 'javascript', type: 'roadmapEdge', data: { active: false } },
  { id: 'e-js-react', source: 'javascript', target: 'react', type: 'roadmapEdge', data: { active: false } },
]
```

- [ ] **Step 1.4: Run test — verify it passes**

```bash
npm test
```

Expected: `frontend.test.js` — 7 PASS. `roadmapData.test.js` — 6 PASS (still exists). Total ≥ 31 tests passing.

- [ ] **Step 1.5: Commit**

```bash
git add src/data/frontend.js src/data/frontend.test.js
git commit -m "feat: add frontend roadmap data file"
```

---

## Task 2: Create backend.js

**Files:**
- Create: `src/data/backend.js`
- Create: `src/data/backend.test.js`

- [ ] **Step 2.1: Write the failing test**

Create `src/data/backend.test.js`:

```js
import { describe, it, expect } from 'vitest'
import { nodes, edges } from './backend'

describe('backend data', () => {
  it('has 10 nodes total (8 bubbleNode + 2 trackLabel)', () => {
    expect(nodes).toHaveLength(10)
  })

  it('has 8 bubbleNode nodes', () => {
    expect(nodes.filter(n => n.type === 'bubbleNode')).toHaveLength(8)
  })

  it('has 2 trackLabel nodes', () => {
    expect(nodes.filter(n => n.type === 'trackLabel')).toHaveLength(2)
  })

  it('nodejs and python both have null prerequisites (independent track starts)', () => {
    const nodejs = nodes.find(n => n.id === 'nodejs')
    const python = nodes.find(n => n.id === 'python')
    expect(nodejs.data.prerequisite).toBeNull()
    expect(python.data.prerequisite).toBeNull()
  })

  it('each bubbleNode has required topic fields', () => {
    nodes.filter(n => n.type === 'bubbleNode').forEach(n => {
      expect(n.data.topic).toHaveProperty('description')
      expect(n.data.topic).toHaveProperty('notes')
      expect(n.data.topic).toHaveProperty('videos')
      expect(n.data.topic).toHaveProperty('projects')
      expect(n.data.topic).toHaveProperty('practice')
    })
  })

  it('has 6 edges (3 per track)', () => {
    expect(edges).toHaveLength(6)
  })

  it('all edges use roadmapEdge type', () => {
    edges.forEach(e => expect(e.type).toBe('roadmapEdge'))
  })

  it('Node.js track edges are correct', () => {
    expect(edges).toEqual(expect.arrayContaining([
      expect.objectContaining({ source: 'nodejs', target: 'express' }),
      expect.objectContaining({ source: 'express', target: 'mongodb' }),
      expect.objectContaining({ source: 'mongodb', target: 'restapi' }),
    ]))
  })

  it('Python track edges are correct', () => {
    expect(edges).toEqual(expect.arrayContaining([
      expect.objectContaining({ source: 'python', target: 'django' }),
      expect.objectContaining({ source: 'django', target: 'postgresql' }),
      expect.objectContaining({ source: 'postgresql', target: 'restapis' }),
    ]))
  })
})
```

- [ ] **Step 2.2: Run test — verify it fails**

```bash
npm test
```

Expected: FAIL — `Cannot find module './backend'`

- [ ] **Step 2.3: Create backend.js**

Create `src/data/backend.js`:

```js
export const nodes = [
  // Track label nodes (non-interactive headers)
  {
    id: 'label-nodejs-track',
    type: 'trackLabel',
    position: { x: 150, y: -60 },
    data: { label: 'Node.js Path' },
  },
  {
    id: 'label-python-track',
    type: 'trackLabel',
    position: { x: 520, y: -60 },
    data: { label: 'Python Path' },
  },

  // Node.js track (x ≈ 150)
  {
    id: 'nodejs',
    type: 'bubbleNode',
    position: { x: 150, y: 100 },
    data: {
      label: 'Node.js',
      icon: '🟢',
      prerequisite: null,
      topic: {
        description: 'Node.js is a JavaScript runtime built on Chrome\'s V8 engine, allowing you to run JavaScript on the server side.',
        notes: `Node.js key concepts:
• Event loop and non-blocking I/O
• npm — Node Package Manager
• Modules: require(), module.exports, ES modules
• Built-in modules: fs, path, http, os
• Environment variables with dotenv
• Process object and CLI args
• Streams and buffers`,
        videos: [
          { title: 'Node.js Crash Course', url: 'https://www.youtube.com/watch?v=fBNz5xF-Kx4' },
          { title: 'Node.js and Express Tutorial', url: 'https://www.youtube.com/watch?v=Oe421EPjeBE' },
        ],
        projects: [
          'Build a CLI todo app that reads and writes to a JSON file',
          'Create a file system utility that renames files in bulk',
        ],
        practice: [
          'Read and write files asynchronously with fs/promises',
          'Build a simple HTTP server without Express that handles GET and POST',
        ],
      },
    },
  },
  {
    id: 'express',
    type: 'bubbleNode',
    position: { x: 150, y: 300 },
    data: {
      label: 'Express',
      icon: '🚂',
      prerequisite: 'nodejs',
      topic: {
        description: 'Express is a minimal and flexible Node.js web application framework providing a robust set of features for web and mobile applications.',
        notes: `Express key concepts:
• Routing: app.get, app.post, app.put, app.delete
• Middleware: logging, auth, body parsing (express.json)
• Request and Response objects (req, res)
• Error handling middleware (4-argument function)
• Route parameters (:id) and query strings (?page=1)
• Static file serving with express.static
• Router for modular route organization`,
        videos: [
          { title: 'Express JS Crash Course', url: 'https://www.youtube.com/watch?v=L72fhGm1tfE' },
          { title: 'Express Middleware Explained', url: 'https://www.youtube.com/watch?v=lY6icfhap2o' },
        ],
        projects: [
          'Build a REST API for a blog with GET, POST, PUT, DELETE routes',
          'Create a custom auth middleware that validates API keys',
        ],
        practice: [
          'Build a CRUD API for a todo list — store data in memory (no DB yet)',
          'Add request logging middleware that logs method, path, and response time',
        ],
      },
    },
  },
  {
    id: 'mongodb',
    type: 'bubbleNode',
    position: { x: 150, y: 500 },
    data: {
      label: 'MongoDB',
      icon: '🍃',
      prerequisite: 'express',
      topic: {
        description: 'MongoDB is a document-oriented NoSQL database. Data is stored as flexible JSON-like documents — perfect for JavaScript applications.',
        notes: `MongoDB key concepts:
• Collections and documents (like tables and rows)
• CRUD: insertOne, findOne, updateOne, deleteOne
• Mongoose ODM: define schemas and models
• Schema types: String, Number, Date, ObjectId, Array
• Relationships: embedded documents vs references
• Indexes for query performance
• Aggregation pipeline for complex queries
• Population (.populate()) for joining documents`,
        videos: [
          { title: 'MongoDB Crash Course', url: 'https://www.youtube.com/watch?v=-56x56UppqQ' },
          { title: 'Mongoose Tutorial', url: 'https://www.youtube.com/watch?v=DZBGEVgL2eE' },
        ],
        projects: [
          'Add MongoDB + Mongoose to your Express blog API',
          'Build a user authentication system with hashed passwords',
        ],
        practice: [
          'Write an aggregation pipeline that counts posts per author',
          'Design a schema for a social media app — users, posts, comments, likes',
        ],
      },
    },
  },
  {
    id: 'restapi',
    type: 'bubbleNode',
    position: { x: 150, y: 700 },
    data: {
      label: 'REST API',
      icon: '🔌',
      prerequisite: 'mongodb',
      topic: {
        description: 'REST APIs are the standard for web services. Learn to design, secure, document, and deploy production-ready APIs.',
        notes: `Production REST API concepts:
• HTTP methods semantics: GET (read), POST (create), PUT/PATCH (update), DELETE
• Status codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Server Error
• JWT authentication: sign, verify, refresh tokens
• Input validation with express-validator or Joi
• Rate limiting to prevent abuse
• API versioning (/api/v1/...)
• Documentation with Swagger/OpenAPI
• CORS configuration`,
        videos: [
          { title: 'REST API Design Best Practices', url: 'https://www.youtube.com/watch?v=7nm1pYuKAhY' },
          { title: 'JWT Authentication Tutorial', url: 'https://www.youtube.com/watch?v=mbsmsi7l3r4' },
        ],
        projects: [
          'Build a full authenticated REST API with JWT, validation, and rate limiting',
          'Add Swagger documentation to your API with example requests/responses',
        ],
        practice: [
          'Handle errors consistently: create an error class and centralized error middleware',
          'Add rate limiting: max 100 requests per 15 minutes per IP',
        ],
      },
    },
  },

  // Python track (x ≈ 520)
  {
    id: 'python',
    type: 'bubbleNode',
    position: { x: 520, y: 100 },
    data: {
      label: 'Python',
      icon: '🐍',
      prerequisite: null,
      topic: {
        description: 'Python is a versatile, beginner-friendly language known for clean syntax. Widely used in web development, data science, and automation.',
        notes: `Python key concepts:
• Variables and data types: int, float, str, bool
• Lists, tuples, dictionaries, sets
• Functions and lambda expressions
• Classes and OOP: __init__, self, inheritance
• Modules and packages — pip install
• File I/O: open(), read(), write()
• List comprehensions and generators
• Error handling: try, except, finally`,
        videos: [
          { title: 'Python Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc' },
          { title: 'Python OOP Tutorial', url: 'https://www.youtube.com/watch?v=ZDa-Z5JzLYM' },
        ],
        projects: [
          'Build a web scraper with requests + BeautifulSoup',
          'Create a CLI inventory manager that saves data to a CSV file',
        ],
        practice: [
          'Implement a linked list class with add, remove, and search methods',
          'Write a function that reads a CSV file and returns a list of dicts',
        ],
      },
    },
  },
  {
    id: 'django',
    type: 'bubbleNode',
    position: { x: 520, y: 300 },
    data: {
      label: 'Django',
      icon: '🎸',
      prerequisite: 'python',
      topic: {
        description: 'Django is a high-level Python web framework for rapid development of secure and maintainable websites. "Batteries included."',
        notes: `Django key concepts:
• MVT pattern: Model, View, Template
• ORM: define models, run migrations
• Django admin panel — automatic CRUD UI
• URL routing with urls.py
• Forms and form validation
• Built-in authentication system (users, sessions)
• Django REST Framework (DRF) for APIs
• Settings: databases, static files, installed apps`,
        videos: [
          { title: 'Django Crash Course', url: 'https://www.youtube.com/watch?v=e1IyzVyrLSU' },
          { title: 'Django REST Framework Tutorial', url: 'https://www.youtube.com/watch?v=TmsD8QExZ84' },
        ],
        projects: [
          'Build a full blog app with Django: posts, comments, and admin panel',
          'Create a REST API with Django REST Framework — serializers and viewsets',
        ],
        practice: [
          'Create a custom Django management command that seeds the database',
          'Add pagination to a DRF list view using PageNumberPagination',
        ],
      },
    },
  },
  {
    id: 'postgresql',
    type: 'bubbleNode',
    position: { x: 520, y: 500 },
    data: {
      label: 'PostgreSQL',
      icon: '🐘',
      prerequisite: 'django',
      topic: {
        description: 'PostgreSQL is a powerful open-source relational database with a strong reputation for reliability, data integrity, and correctness.',
        notes: `PostgreSQL key concepts:
• Tables, schemas, and databases
• SQL: SELECT, INSERT, UPDATE, DELETE
• Joins: INNER, LEFT, RIGHT, FULL OUTER
• Indexes: B-tree, partial, composite
• Transactions and ACID properties
• Stored procedures and triggers
• psycopg2 driver for Python
• Django ORM with PostgreSQL backend
• Query optimization with EXPLAIN ANALYZE`,
        videos: [
          { title: 'PostgreSQL Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=qw--VYLpxG4' },
          { title: 'SQL Joins Explained', url: 'https://www.youtube.com/watch?v=9yeOJ0ZMUYw' },
        ],
        projects: [
          'Design and build a relational database for an e-commerce app (users, products, orders)',
          'Optimize slow queries: add indexes and measure improvement with EXPLAIN ANALYZE',
        ],
        practice: [
          'Write a query using 3 JOINs to get an order with user details and product names',
          'Create a stored procedure that calculates monthly revenue',
        ],
      },
    },
  },
  {
    id: 'restapis',
    type: 'bubbleNode',
    position: { x: 520, y: 700 },
    data: {
      label: 'REST APIs',
      icon: '🔗',
      prerequisite: 'postgresql',
      topic: {
        description: 'Build production-ready REST APIs using Django REST Framework — the most powerful toolkit for building Web APIs in Python.',
        notes: `DRF production API concepts:
• Serializers: validate input, transform output
• ViewSets and Routers for automatic URL generation
• Authentication: Token, JWT (djangorestframework-simplejwt), Session
• Permissions: IsAuthenticated, IsAdminUser, custom
• Throttling: limit requests per user/IP
• Filtering and search with django-filter
• Pagination: PageNumberPagination, CursorPagination
• Browsable API for manual testing`,
        videos: [
          { title: 'Django REST Framework Full Course', url: 'https://www.youtube.com/watch?v=c708Nf0cHrs' },
          { title: 'DRF JWT Authentication', url: 'https://www.youtube.com/watch?v=Wq6JqXqOzCE' },
        ],
        projects: [
          'Build a full CRUD API with JWT auth, custom permissions, and throttling',
          'Add filtering, full-text search, and cursor pagination to your API',
        ],
        practice: [
          'Create a custom permission that only allows object owners to edit',
          'Write API tests using DRF\'s APITestCase and APIClient',
        ],
      },
    },
  },
]

export const edges = [
  // Node.js track
  { id: 'e-nodejs-express', source: 'nodejs', target: 'express', type: 'roadmapEdge', data: { active: false } },
  { id: 'e-express-mongodb', source: 'express', target: 'mongodb', type: 'roadmapEdge', data: { active: false } },
  { id: 'e-mongodb-restapi', source: 'mongodb', target: 'restapi', type: 'roadmapEdge', data: { active: false } },
  // Python track
  { id: 'e-python-django', source: 'python', target: 'django', type: 'roadmapEdge', data: { active: false } },
  { id: 'e-django-postgresql', source: 'django', target: 'postgresql', type: 'roadmapEdge', data: { active: false } },
  { id: 'e-postgresql-restapis', source: 'postgresql', target: 'restapis', type: 'roadmapEdge', data: { active: false } },
]
```

- [ ] **Step 2.4: Run test — verify it passes**

```bash
npm test
```

Expected: backend tests — 9 PASS. Total ≥ 40 tests passing.

- [ ] **Step 2.5: Commit**

```bash
git add src/data/backend.js src/data/backend.test.js
git commit -m "feat: add backend roadmap data — Node.js and Python parallel tracks"
```

---

## Task 3: Create fullstack.js

**Files:**
- Create: `src/data/fullstack.js`
- Create: `src/data/fullstack.test.js`

- [ ] **Step 3.1: Write the failing test**

Create `src/data/fullstack.test.js`:

```js
import { describe, it, expect } from 'vitest'
import { nodes, edges } from './fullstack'

describe('fullstack data', () => {
  it('has 10 nodes total (8 bubbleNode + 2 trackLabel)', () => {
    expect(nodes).toHaveLength(10)
  })

  it('has 8 bubbleNode nodes', () => {
    expect(nodes.filter(n => n.type === 'bubbleNode')).toHaveLength(8)
  })

  it('has 2 trackLabel nodes', () => {
    expect(nodes.filter(n => n.type === 'trackLabel')).toHaveLength(2)
  })

  it('fs-html and fs-nodejs both have null prerequisites (independent track starts)', () => {
    const fsHtml = nodes.find(n => n.id === 'fs-html')
    const fsNodejs = nodes.find(n => n.id === 'fs-nodejs')
    expect(fsHtml.data.prerequisite).toBeNull()
    expect(fsNodejs.data.prerequisite).toBeNull()
  })

  it('all node ids are prefixed with fs- or label- to avoid collision', () => {
    nodes.forEach(n => {
      expect(n.id.startsWith('fs-') || n.id.startsWith('label-')).toBe(true)
    })
  })

  it('each bubbleNode has required topic fields', () => {
    nodes.filter(n => n.type === 'bubbleNode').forEach(n => {
      expect(n.data.topic).toHaveProperty('description')
      expect(n.data.topic).toHaveProperty('notes')
      expect(n.data.topic).toHaveProperty('videos')
      expect(n.data.topic).toHaveProperty('projects')
      expect(n.data.topic).toHaveProperty('practice')
    })
  })

  it('has 6 edges (3 per track)', () => {
    expect(edges).toHaveLength(6)
  })

  it('frontend track edges are correct', () => {
    expect(edges).toEqual(expect.arrayContaining([
      expect.objectContaining({ source: 'fs-html', target: 'fs-css' }),
      expect.objectContaining({ source: 'fs-css', target: 'fs-js' }),
      expect.objectContaining({ source: 'fs-js', target: 'fs-react' }),
    ]))
  })

  it('backend track edges are correct', () => {
    expect(edges).toEqual(expect.arrayContaining([
      expect.objectContaining({ source: 'fs-nodejs', target: 'fs-express' }),
      expect.objectContaining({ source: 'fs-express', target: 'fs-mongodb' }),
      expect.objectContaining({ source: 'fs-mongodb', target: 'fs-deploy' }),
    ]))
  })
})
```

- [ ] **Step 3.2: Run test — verify it fails**

```bash
npm test
```

Expected: FAIL — `Cannot find module './fullstack'`

- [ ] **Step 3.3: Create fullstack.js**

Create `src/data/fullstack.js`:

```js
export const nodes = [
  // Track label nodes
  {
    id: 'label-fs-frontend',
    type: 'trackLabel',
    position: { x: 150, y: -60 },
    data: { label: 'Frontend Path' },
  },
  {
    id: 'label-fs-backend',
    type: 'trackLabel',
    position: { x: 520, y: -60 },
    data: { label: 'Backend Path' },
  },

  // Frontend track (x ≈ 150) — fs- prefix to avoid id collision with backend.js
  {
    id: 'fs-html',
    type: 'bubbleNode',
    position: { x: 150, y: 100 },
    data: {
      label: 'HTML',
      icon: '🌐',
      prerequisite: null,
      topic: {
        description: 'The backbone of every webpage. HTML defines structure and content using elements and tags.',
        notes: `HTML key concepts:
• Document structure: DOCTYPE, html, head, body
• Semantic elements: header, nav, main, section, footer
• Forms and all input types
• Media: img, video, audio
• Links, tables, lists`,
        videos: [
          { title: 'HTML Crash Course For Absolute Beginners', url: 'https://www.youtube.com/watch?v=UB1O30fR-EE' },
        ],
        projects: ['Build a personal portfolio page with semantic HTML'],
        practice: ['Create a form with all input types', 'Build a semantic article layout'],
      },
    },
  },
  {
    id: 'fs-css',
    type: 'bubbleNode',
    position: { x: 150, y: 300 },
    data: {
      label: 'CSS',
      icon: '🎨',
      prerequisite: 'fs-html',
      topic: {
        description: 'CSS styles and layouts your HTML. Controls colors, spacing, typography, and responsiveness.',
        notes: `CSS key concepts:
• Box model, Flexbox, Grid
• Responsive design with media queries
• Animations and transitions
• CSS variables`,
        videos: [
          { title: 'CSS Tutorial - Zero to Hero', url: 'https://www.youtube.com/watch?v=1Rs2ND1ryYc' },
        ],
        projects: ['Style your portfolio — responsive, mobile-first'],
        practice: ['Build a card grid with CSS Grid', 'Center a div 5 different ways'],
      },
    },
  },
  {
    id: 'fs-js',
    type: 'bubbleNode',
    position: { x: 150, y: 500 },
    data: {
      label: 'JavaScript',
      icon: '⚡',
      prerequisite: 'fs-css',
      topic: {
        description: 'JavaScript makes pages interactive. Arrays, objects, DOM, events, async/await, and the Fetch API.',
        notes: `JavaScript key concepts:
• Variables: let, const
• Arrays: map, filter, reduce
• DOM: querySelector, addEventListener
• Async/await and Fetch API
• ES6+: destructuring, spread, modules`,
        videos: [
          { title: 'JavaScript Crash Course For Beginners', url: 'https://www.youtube.com/watch?v=hdI2bqOjy3c' },
        ],
        projects: ['Build a todo list without frameworks', 'Create a weather app with Fetch API'],
        practice: ['Implement debounce', 'Build a countdown timer'],
      },
    },
  },
  {
    id: 'fs-react',
    type: 'bubbleNode',
    position: { x: 150, y: 700 },
    data: {
      label: 'React',
      icon: '⚛️',
      prerequisite: 'fs-js',
      topic: {
        description: 'React builds UIs from reusable components. useState, useEffect, custom hooks, and React Router.',
        notes: `React key concepts:
• JSX, functional components
• Props and state (useState)
• Side effects (useEffect)
• Custom hooks
• React Router for navigation`,
        videos: [
          { title: 'React JS Crash Course', url: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8' },
        ],
        projects: ['Rebuild todo app in React', 'Build a multi-page app with React Router'],
        practice: ['Build a reusable Modal', 'Create a custom useFetch hook'],
      },
    },
  },

  // Backend track (x ≈ 520) — fs- prefix to avoid id collision
  {
    id: 'fs-nodejs',
    type: 'bubbleNode',
    position: { x: 520, y: 100 },
    data: {
      label: 'Node.js',
      icon: '🟢',
      prerequisite: null,
      topic: {
        description: 'Node.js runs JavaScript on the server. Event loop, npm, file system, and HTTP module.',
        notes: `Node.js key concepts:
• Event loop and async I/O
• npm — package manager
• Built-in modules: fs, path, http
• dotenv for environment variables`,
        videos: [
          { title: 'Node.js Crash Course', url: 'https://www.youtube.com/watch?v=fBNz5xF-Kx4' },
        ],
        projects: ['Build a CLI file utility', 'Create a simple HTTP server without Express'],
        practice: ['Read/write files with fs/promises', 'Parse CLI arguments'],
      },
    },
  },
  {
    id: 'fs-express',
    type: 'bubbleNode',
    position: { x: 520, y: 300 },
    data: {
      label: 'Express',
      icon: '🚂',
      prerequisite: 'fs-nodejs',
      topic: {
        description: 'Express is the minimal Node.js web framework. Routes, middleware, request/response handling.',
        notes: `Express key concepts:
• Routing: GET, POST, PUT, DELETE
• Middleware pipeline
• Route params and query strings
• Error handling middleware`,
        videos: [
          { title: 'Express JS Crash Course', url: 'https://www.youtube.com/watch?v=L72fhGm1tfE' },
        ],
        projects: ['Build a REST API for a blog', 'Add auth middleware'],
        practice: ['Build a CRUD API in memory', 'Add request logging middleware'],
      },
    },
  },
  {
    id: 'fs-mongodb',
    type: 'bubbleNode',
    position: { x: 520, y: 500 },
    data: {
      label: 'MongoDB',
      icon: '🍃',
      prerequisite: 'fs-express',
      topic: {
        description: 'MongoDB stores data as flexible JSON documents. Connect your Express API to a real database with Mongoose.',
        notes: `MongoDB key concepts:
• Collections and documents
• CRUD with Mongoose
• Schema definition and validation
• Relationships: embedded vs references
• Population (.populate())`,
        videos: [
          { title: 'MongoDB Crash Course', url: 'https://www.youtube.com/watch?v=-56x56UppqQ' },
        ],
        projects: ['Add MongoDB to your Express API', 'Build user authentication with bcrypt'],
        practice: ['Write an aggregation pipeline', 'Design a social media schema'],
      },
    },
  },
  {
    id: 'fs-deploy',
    type: 'bubbleNode',
    position: { x: 520, y: 700 },
    data: {
      label: 'Deployment',
      icon: '🚀',
      prerequisite: 'fs-mongodb',
      topic: {
        description: 'Deploy your full stack app to the cloud. Host frontend on Vercel, backend on Railway or Render, database on MongoDB Atlas.',
        notes: `Deployment key concepts:
• Environment variables (never commit secrets)
• Frontend deployment: Vercel, Netlify
• Backend deployment: Railway, Render, Fly.io
• Database hosting: MongoDB Atlas, PlanetScale
• CI/CD with GitHub Actions
• Domain setup and SSL
• Environment differences: dev vs staging vs prod
• Logs and basic monitoring`,
        videos: [
          { title: 'Deploy MERN Stack App', url: 'https://www.youtube.com/watch?v=l134cBAJCuc' },
          { title: 'Deploy Node.js to Railway', url: 'https://www.youtube.com/watch?v=HvmHPkwW9Os' },
        ],
        projects: [
          'Deploy your full stack app: React on Vercel, Express+MongoDB on Railway+Atlas',
          'Set up GitHub Actions to auto-deploy on push to main',
        ],
        practice: [
          'Add health check endpoint GET /health that returns 200 OK with uptime',
          'Set up error monitoring — log uncaught exceptions to a file in production',
        ],
      },
    },
  },
]

export const edges = [
  // Frontend track
  { id: 'e-fs-html-css', source: 'fs-html', target: 'fs-css', type: 'roadmapEdge', data: { active: false } },
  { id: 'e-fs-css-js', source: 'fs-css', target: 'fs-js', type: 'roadmapEdge', data: { active: false } },
  { id: 'e-fs-js-react', source: 'fs-js', target: 'fs-react', type: 'roadmapEdge', data: { active: false } },
  // Backend track
  { id: 'e-fs-nodejs-express', source: 'fs-nodejs', target: 'fs-express', type: 'roadmapEdge', data: { active: false } },
  { id: 'e-fs-express-mongodb', source: 'fs-express', target: 'fs-mongodb', type: 'roadmapEdge', data: { active: false } },
  { id: 'e-fs-mongodb-deploy', source: 'fs-mongodb', target: 'fs-deploy', type: 'roadmapEdge', data: { active: false } },
]
```

- [ ] **Step 3.4: Run test — verify it passes**

```bash
npm test
```

Expected: fullstack tests — 9 PASS. Total ≥ 49 tests passing.

- [ ] **Step 3.5: Commit**

```bash
git add src/data/fullstack.js src/data/fullstack.test.js
git commit -m "feat: add fullstack roadmap data — frontend and backend parallel tracks"
```

---

## Task 4: Create roadmapsRegistry.js

**Files:**
- Create: `src/data/roadmapsRegistry.js`
- Create: `src/data/roadmapsRegistry.test.js`

- [ ] **Step 4.1: Write the failing test**

Create `src/data/roadmapsRegistry.test.js`:

```js
import { describe, it, expect } from 'vitest'
import { roadmapsRegistry, roadmapsList } from './roadmapsRegistry'

describe('roadmapsRegistry', () => {
  it('has exactly 3 roadmaps', () => {
    expect(Object.keys(roadmapsRegistry)).toHaveLength(3)
  })

  it('roadmapsList is ["frontend", "backend", "fullstack"] in order', () => {
    expect(roadmapsList).toEqual(['frontend', 'backend', 'fullstack'])
  })

  it('each roadmap has required metadata fields', () => {
    Object.values(roadmapsRegistry).forEach(r => {
      expect(r).toHaveProperty('label')
      expect(r).toHaveProperty('icon')
      expect(r).toHaveProperty('color')
      expect(r).toHaveProperty('description')
      expect(r).toHaveProperty('nodes')
      expect(r).toHaveProperty('edges')
    })
  })

  it('frontend roadmap has 4 bubbleNode nodes and 3 edges', () => {
    const r = roadmapsRegistry.frontend
    expect(r.nodes.filter(n => n.type === 'bubbleNode')).toHaveLength(4)
    expect(r.edges).toHaveLength(3)
  })

  it('backend roadmap has 8 bubbleNode nodes and 6 edges', () => {
    const r = roadmapsRegistry.backend
    expect(r.nodes.filter(n => n.type === 'bubbleNode')).toHaveLength(8)
    expect(r.edges).toHaveLength(6)
  })

  it('fullstack roadmap has 8 bubbleNode nodes and 6 edges', () => {
    const r = roadmapsRegistry.fullstack
    expect(r.nodes.filter(n => n.type === 'bubbleNode')).toHaveLength(8)
    expect(r.edges).toHaveLength(6)
  })

  it('all roadmap colors are valid hex strings', () => {
    Object.values(roadmapsRegistry).forEach(r => {
      expect(r.color).toMatch(/^#[0-9a-f]{6}$/i)
    })
  })
})
```

- [ ] **Step 4.2: Run test — verify it fails**

```bash
npm test
```

Expected: FAIL — `Cannot find module './roadmapsRegistry'`

- [ ] **Step 4.3: Create roadmapsRegistry.js**

Create `src/data/roadmapsRegistry.js`:

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

- [ ] **Step 4.4: Run test — verify it passes**

```bash
npm test
```

Expected: registry tests — 7 PASS. Total ≥ 56 tests passing.

- [ ] **Step 4.5: Commit**

```bash
git add src/data/roadmapsRegistry.js src/data/roadmapsRegistry.test.js
git commit -m "feat: add roadmaps registry mapping ids to roadmap data"
```

---

## Task 5: Create TrackLabelNode component

**Files:**
- Create: `src/components/TrackLabelNode.jsx`

- [ ] **Step 5.1: Create TrackLabelNode.jsx**

Create `src/components/TrackLabelNode.jsx`:

```jsx
export default function TrackLabelNode({ data }) {
  return (
    <div
      className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase select-none"
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.12)',
        color: '#94a3b8',
        whiteSpace: 'nowrap',
      }}
    >
      {data.label}
    </div>
  )
}
```

No `Handle` components — track labels have no edges connecting to them directly (edges connect between `bubbleNode` nodes only). No animation, no click handler.

- [ ] **Step 5.2: Commit**

```bash
git add src/components/TrackLabelNode.jsx
git commit -m "feat: add TrackLabelNode for parallel track headers"
```

---

## Task 6: Create HomePage

**Files:**
- Create: `src/pages/HomePage.jsx`

- [ ] **Step 6.1: Create HomePage.jsx**

Create `src/pages/HomePage.jsx`:

```jsx
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ParticleBackground from '../components/ParticleBackground'
import { roadmapsRegistry, roadmapsList } from '../data/roadmapsRegistry'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="w-screen h-screen bg-[#020817] relative overflow-hidden flex flex-col items-center justify-center gap-16">
      <ParticleBackground />

      {/* Header */}
      <div className="relative z-10 text-center">
        <motion.h1
          className="text-5xl font-black tracking-tight mb-3"
          style={{
            background: 'linear-gradient(135deg, #06b6d4, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Developer Roadmap
        </motion.h1>
        <motion.p
          className="text-slate-400 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Choose your learning path
        </motion.p>
      </div>

      {/* Cards */}
      <div className="relative z-10 flex gap-6 px-8 flex-wrap justify-center">
        {roadmapsList.map((id, index) => {
          const roadmap = roadmapsRegistry[id]
          const bubbleCount = roadmap.nodes.filter(n => n.type === 'bubbleNode').length
          return (
            <RoadmapCard
              key={id}
              roadmap={roadmap}
              bubbleCount={bubbleCount}
              index={index}
              onClick={() => navigate(`/roadmap/${id}`)}
            />
          )
        })}
      </div>
    </div>
  )
}

function RoadmapCard({ roadmap, bubbleCount, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.12, duration: 0.5, ease: 'easeOut' }}
      whileHover={{
        scale: 1.04,
        boxShadow: `0 0 50px ${roadmap.color}25, 0 20px 40px rgba(0,0,0,0.4)`,
      }}
      onClick={onClick}
      className="flex flex-col items-center gap-5 p-8 rounded-2xl cursor-pointer w-64"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(12px)',
        boxShadow: `0 0 20px ${roadmap.color}10, 0 8px 24px rgba(0,0,0,0.3)`,
        transition: 'box-shadow 0.3s ease',
      }}
    >
      <span className="text-6xl">{roadmap.icon}</span>

      <div className="text-center">
        <h2 className="text-xl font-bold text-white mb-1">{roadmap.label}</h2>
        <p className="text-slate-400 text-xs leading-relaxed">{roadmap.description}</p>
      </div>

      <span
        className="text-xs px-3 py-1 rounded-full font-semibold"
        style={{
          background: `${roadmap.color}18`,
          color: roadmap.color,
          border: `1px solid ${roadmap.color}35`,
        }}
      >
        {bubbleCount} topics
      </span>

      <motion.button
        className="w-full py-2.5 rounded-xl text-sm font-bold text-white"
        style={{
          background: `linear-gradient(135deg, ${roadmap.color}, ${roadmap.color}bb)`,
        }}
        whileHover={{ filter: 'brightness(1.15)' }}
        whileTap={{ scale: 0.97 }}
        onClick={onClick}
      >
        Start →
      </motion.button>
    </motion.div>
  )
}
```

- [ ] **Step 6.2: Commit**

```bash
git add src/pages/HomePage.jsx
git commit -m "feat: add home page with 3 roadmap selection cards"
```

---

## Task 7: Update RoadmapPage to use registry and params

**Files:**
- Modify: `src/pages/RoadmapPage.jsx`

**IMPORTANT:** React's Rules of Hooks forbid calling hooks after a conditional `return`. To guard against an unknown roadmap ID, we split `RoadmapPage` into:
- Outer shell: reads params, looks up registry, redirects if unknown
- Inner `RoadmapCanvas`: receives `roadmap` as a prop, calls all hooks

- [ ] **Step 7.1: Replace RoadmapPage.jsx entirely**

Replace the entire content of `src/pages/RoadmapPage.jsx`:

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
import TopicModal from '../components/TopicModal'
import ParticleBackground from '../components/ParticleBackground'

const NODE_TYPES = { bubbleNode: BubbleNode, trackLabel: TrackLabelNode }
const EDGE_TYPES = { roadmapEdge: RoadmapEdge }

// Shell component: guards unknown IDs before any hooks are called
export default function RoadmapPage() {
  const { id } = useParams()
  const roadmap = roadmapsRegistry[id]
  if (!roadmap) return <Navigate to="/" replace />
  return <RoadmapCanvas roadmap={roadmap} />
}

// Inner component: all hooks live here, roadmap is always defined
function RoadmapCanvas({ roadmap }) {
  const navigate = useNavigate()
  const { completed, getStatus, markComplete } = useRoadmapStore()
  const [selectedNodeId, setSelectedNodeId] = useState(null)
  const [completingNodeId, setCompletingNodeId] = useState(null)

  const handleNodeClick = useCallback((nodeId) => {
    setSelectedNodeId(nodeId)
  }, [])

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

      {/* Modal */}
      <AnimatePresence>
        {selectedNode && (
          <div className="absolute inset-0 z-30" key={selectedNodeId}>
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

- [ ] **Step 7.2: Run existing tests — verify they still pass**

```bash
npm test
```

Expected: all tests still pass (BubbleNode, TopicModal, useRoadmapStore, all data files). `roadmapData.test.js` still passes too — it hasn't been deleted yet.

- [ ] **Step 7.3: Commit**

```bash
git add src/pages/RoadmapPage.jsx
git commit -m "feat: update RoadmapPage to read roadmap from registry via useParams"
```

---

## Task 8: Update App.jsx and delete legacy files

**Files:**
- Modify: `src/App.jsx`
- Delete: `src/data/roadmapData.js`
- Delete: `src/data/roadmapData.test.js`

- [ ] **Step 8.1: Update App.jsx**

Replace the entire content of `src/App.jsx`:

```jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RoadmapPage from './pages/RoadmapPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/roadmap/:id" element={<RoadmapPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
```

- [ ] **Step 8.2: Delete legacy data files**

```bash
rm src/data/roadmapData.js src/data/roadmapData.test.js
```

On Windows PowerShell:
```powershell
Remove-Item src/data/roadmapData.js, src/data/roadmapData.test.js
```

- [ ] **Step 8.3: Run all tests — verify everything passes**

```bash
npm test
```

Expected: all tests pass. `roadmapData.test.js` no longer exists — its 7 tests are replaced by `frontend.test.js`'s 7 tests. Total should be ≥ 56 tests.

- [ ] **Step 8.4: Start dev server and verify full flow**

```bash
npm run dev
```

Open `http://localhost:5173`. Verify:
1. Home screen shows "Developer Roadmap" title + 3 cards (Frontend, Backend, Full Stack)
2. Click Frontend card → navigates to `/roadmap/frontend` → 4 bubbles (HTML active, rest locked)
3. Click ← Back → returns to home screen
4. Click Backend card → 2 parallel tracks (Node.js Path, Python Path), each with 4 bubbles
5. Click Full Stack card → Frontend + Backend parallel tracks, each starts unlocked
6. Unknown URL (e.g. `/roadmap/xyz`) → redirects to `/`

Stop server.

- [ ] **Step 8.5: Final commit**

```bash
git add src/App.jsx
git add -u   # stages deleted files
git commit -m "feat: add multi-roadmap routing and home screen — frontend, backend, fullstack"
```

---

## Self-Review

**Spec coverage:**
- ✅ Home screen title "Developer Roadmap" — `HomePage.jsx` h1
- ✅ 3 cards: Frontend, Backend, Full Stack — `roadmapsList` drives the render
- ✅ Large glowing cards in a row — Framer Motion + glassmorphism
- ✅ Card shows icon, title, description, topic count, Start button — `RoadmapCard`
- ✅ Click → navigate to `/roadmap/:id` — `useNavigate`
- ✅ Backend: Node.js + Python parallel tracks — `backend.js`, 2 null-prereq roots
- ✅ Full Stack: Frontend + Backend parallel tracks — `fullstack.js`, 2 null-prereq roots
- ✅ Track label headers — `TrackLabelNode`, positioned above each column
- ✅ Back button on RoadmapPage — `← Back` button → `navigate('/')`
- ✅ Dynamic header title — `{roadmap.label} Roadmap`
- ✅ Unknown roadmap ID → redirect to `/` — `Navigate` in shell component
- ✅ `roadmapData.js` deleted — replaced by `frontend.js` + registry
- ✅ Rules of Hooks satisfied — guard in shell, hooks in `RoadmapCanvas`
- ✅ `NODE_TYPES` includes `trackLabel: TrackLabelNode`
- ✅ `trackLabel` nodes passed through without injecting status/onClick
- ✅ `totalCount` counts only `bubbleNode` nodes (not trackLabel) for progress pill

**Placeholder scan:** No TBDs. All code complete.

**Type consistency:**
- `roadmapsRegistry[id]` → `{ label, icon, color, description, nodes, edges }` — consistent across registry, HomePage, RoadmapCanvas
- `roadmap.nodes` / `roadmap.edges` — consistent
- `roadmap.color` — used in header gradient and progress bar in RoadmapCanvas, card glow in HomePage
- `n.type === 'bubbleNode'` filter — used in registry test, RoadmapCanvas totalCount, HomePage bubbleCount
- `node.type === 'trackLabel'` guard in nodes useMemo — passes trackLabel nodes through unchanged (no status/onClick injection)
