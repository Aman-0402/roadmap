export const nodes = [
  // Track label nodes
  {
    id: 'label-fs-frontend',
    type: 'trackLabel',
    position: { x: 80, y: -60 },
    data: { label: 'Frontend Path' },
  },
  {
    id: 'label-fs-backend',
    type: 'trackLabel',
    position: { x: 400, y: -60 },
    data: { label: 'Backend Path' },
  },

  // Frontend track — fs- prefix to avoid id collision
  {
    id: 'fs-html',
    type: 'bubbleNode',
    position: { x: 80, y: 80 },
    data: {
      label: 'HTML',
      icon: '🌐',
      step: 1,
      difficulty: 'Beginner',
      resources: [
        { title: 'MDN HTML Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML', description: 'Complete element reference' },
        { title: 'W3Schools HTML', url: 'https://www.w3schools.com/html/', description: 'Interactive tutorials & reference' },
      ],
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
    position: { x: 80, y: 320 },
    data: {
      label: 'CSS',
      icon: '🎨',
      step: 2,
      difficulty: 'Beginner',
      resources: [
        { title: 'MDN CSS Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS', description: 'Complete property reference' },
        { title: 'CSS-Tricks', url: 'https://css-tricks.com/', description: 'Guides, snippets & almanac' },
        { title: 'Flexbox Froggy', url: 'https://flexboxfroggy.com/', description: 'Learn Flexbox interactively' },
      ],
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
    position: { x: 80, y: 560 },
    data: {
      label: 'JavaScript',
      icon: '⚡',
      step: 3,
      difficulty: 'Intermediate',
      resources: [
        { title: 'javascript.info', url: 'https://javascript.info/', description: 'Modern JS tutorial — beginner to advanced' },
        { title: 'MDN JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', description: 'Complete language reference' },
      ],
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
    position: { x: 80, y: 800 },
    data: {
      label: 'React',
      icon: '⚛️',
      step: 4,
      difficulty: 'Intermediate',
      resources: [
        { title: 'React Official Docs', url: 'https://react.dev/', description: 'Tutorials, references & API docs' },
        { title: 'React Patterns', url: 'https://reactpatterns.com/', description: 'Common component patterns' },
      ],
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

  // Backend track — fs- prefix to avoid id collision
  {
    id: 'fs-nodejs',
    type: 'bubbleNode',
    position: { x: 400, y: 80 },
    data: {
      label: 'Node.js',
      icon: '🟢',
      step: 1,
      difficulty: 'Beginner',
      resources: [
        { title: 'Node.js Official Docs', url: 'https://nodejs.org/en/docs', description: 'API reference & guides' },
        { title: 'NodeSchool', url: 'https://nodeschool.io/', description: 'Interactive workshops' },
      ],
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
    position: { x: 400, y: 320 },
    data: {
      label: 'Express',
      icon: '🚂',
      step: 2,
      difficulty: 'Intermediate',
      resources: [
        { title: 'Express.js Official Docs', url: 'https://expressjs.com/', description: 'API reference & guide' },
        { title: 'Express Tutorial — MDN', url: 'https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs', description: 'Step-by-step server-side guide' },
      ],
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
    position: { x: 400, y: 560 },
    data: {
      label: 'MongoDB',
      icon: '🍃',
      step: 3,
      difficulty: 'Intermediate',
      resources: [
        { title: 'MongoDB Official Docs', url: 'https://www.mongodb.com/docs/', description: 'Full reference & tutorials' },
        { title: 'Mongoose Docs', url: 'https://mongoosejs.com/docs/', description: 'ODM schema & query reference' },
      ],
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
    position: { x: 400, y: 800 },
    data: {
      label: 'Deployment',
      icon: '🚀',
      step: 4,
      difficulty: 'Advanced',
      resources: [
        { title: 'Vercel Docs', url: 'https://vercel.com/docs', description: 'Deploy frontend in seconds' },
        { title: 'Railway Docs', url: 'https://docs.railway.com/', description: 'Deploy backend & databases' },
        { title: 'MongoDB Atlas', url: 'https://www.mongodb.com/atlas', description: 'Managed cloud database' },
      ],
      prerequisite: 'fs-mongodb',
      topic: {
        description: 'Deploy your full stack app to the cloud. Host frontend on Vercel, backend on Railway or Render, database on MongoDB Atlas.',
        notes: `Deployment key concepts:
• Environment variables (never commit secrets)
• Frontend deployment: Vercel, Netlify
• Backend deployment: Railway, Render, Fly.io
• Database hosting: MongoDB Atlas
• CI/CD with GitHub Actions
• Domain setup and SSL
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
