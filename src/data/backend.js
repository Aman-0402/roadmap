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
      icon: 'https://icon.icepanel.io/Technology/svg/Node.js.svg',
      step: 1,
      difficulty: 'Beginner',
      resources: [
        { title: 'Node.js Official Docs', url: 'https://nodejs.org/en/docs', description: 'API reference & guides' },
        { title: 'NodeSchool', url: 'https://nodeschool.io/', description: 'Interactive workshops' },
        { title: 'Node.js Best Practices', url: 'https://github.com/goldbergyoni/nodebestpractices', description: 'Production best practices list' },
      ],
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
      icon: 'https://icon.icepanel.io/Technology/svg/Express.svg',
      step: 2,
      difficulty: 'Intermediate',
      resources: [
        { title: 'Express.js Official Docs', url: 'https://expressjs.com/', description: 'API reference & guide' },
        { title: 'Express Tutorial — MDN', url: 'https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs', description: 'Step-by-step server-side guide' },
      ],
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
      icon: 'https://icon.icepanel.io/Technology/svg/MongoDB.svg',
      step: 3,
      difficulty: 'Intermediate',
      resources: [
        { title: 'MongoDB Official Docs', url: 'https://www.mongodb.com/docs/', description: 'Full reference & tutorials' },
        { title: 'Mongoose Docs', url: 'https://mongoosejs.com/docs/', description: 'ODM schema & query reference' },
        { title: 'MongoDB University', url: 'https://learn.mongodb.com/', description: 'Free official courses' },
      ],
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
      step: 4,
      difficulty: 'Advanced',
      resources: [
        { title: 'REST API Tutorial', url: 'https://restfulapi.net/', description: 'REST constraints & best practices' },
        { title: 'HTTP Status Codes', url: 'https://httpstatuses.io/', description: 'Quick status code reference' },
        { title: 'Postman Learning Center', url: 'https://learning.postman.com/', description: 'API testing & documentation' },
      ],
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
      icon: 'https://icon.icepanel.io/Technology/svg/Python.svg',
      step: 1,
      difficulty: 'Beginner',
      resources: [
        { title: 'Python Official Docs', url: 'https://docs.python.org/3/', description: 'Language reference & stdlib' },
        { title: 'Real Python', url: 'https://realpython.com/', description: 'Practical tutorials & articles' },
        { title: 'Python Tutor', url: 'https://pythontutor.com/', description: 'Visualize code execution' },
      ],
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
      icon: 'https://icon.icepanel.io/Technology/svg/Django.svg',
      step: 2,
      difficulty: 'Intermediate',
      resources: [
        { title: 'Django Official Docs', url: 'https://docs.djangoproject.com/', description: 'Full framework reference' },
        { title: 'Django Girls Tutorial', url: 'https://tutorial.djangogirls.org/', description: 'Beginner project walkthrough' },
        { title: 'Django REST Framework', url: 'https://www.django-rest-framework.org/', description: 'DRF API reference' },
      ],
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
      icon: 'https://icon.icepanel.io/Technology/svg/PostgresSQL.svg',
      step: 3,
      difficulty: 'Intermediate',
      resources: [
        { title: 'PostgreSQL Official Docs', url: 'https://www.postgresql.org/docs/', description: 'Complete SQL reference' },
        { title: 'pgExercises', url: 'https://pgexercises.com/', description: 'Interactive SQL practice' },
        { title: 'Use The Index, Luke', url: 'https://use-the-index-luke.com/', description: 'SQL indexing & performance' },
      ],
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
      step: 4,
      difficulty: 'Advanced',
      resources: [
        { title: 'Django REST Framework Docs', url: 'https://www.django-rest-framework.org/', description: 'Full DRF reference' },
        { title: 'DRF Tutorial', url: 'https://www.django-rest-framework.org/tutorial/quickstart/', description: 'Quickstart to first API' },
        { title: 'Simple JWT Docs', url: 'https://django-rest-framework-simplejwt.readthedocs.io/', description: 'JWT auth for DRF' },
      ],
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
