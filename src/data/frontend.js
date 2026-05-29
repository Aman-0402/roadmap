export const nodes = [
  {
    id: 'html',
    type: 'bubbleNode',
    position: { x: 300, y: 80 },
    data: {
      label: 'HTML',
      icon: '🌐',
      step: 1,
      difficulty: 'Beginner',
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
      step: 2,
      difficulty: 'Beginner',
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
      step: 3,
      difficulty: 'Intermediate',
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
      step: 4,
      difficulty: 'Intermediate',
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
