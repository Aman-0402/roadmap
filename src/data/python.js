export const nodes = [
  // Track label nodes
  {
    id: 'label-py-datascience',
    type: 'trackLabel',
    position: { x: 60, y: -70 },
    data: { label: 'Data Science' },
  },
  {
    id: 'label-py-webdev',
    type: 'trackLabel',
    position: { x: 540, y: -70 },
    data: { label: 'Web Development' },
  },

  // Data Science track (left, converging inward)
  {
    id: 'py-numpy',
    type: 'bubbleNode',
    position: { x: 60, y: 60 },
    data: {
      label: 'NumPy',
      icon: 'https://icon.icepanel.io/Technology/svg/NumPy.svg',
      step: 1,
      difficulty: 'Beginner',
      resources: [
        { title: 'NumPy Official Docs', url: 'https://numpy.org/doc/stable/', description: 'Complete API reference' },
        { title: 'NumPy Quickstart', url: 'https://numpy.org/doc/stable/user/quickstart.html', description: 'Get started in 30 minutes' },
        { title: 'NumPy for Beginners', url: 'https://numpy.org/doc/stable/user/absolute_beginners.html', description: 'Absolute beginner guide' },
      ],
      prerequisite: null,
      topic: {
        description: 'NumPy is the foundation of data science in Python. It provides fast n-dimensional array operations, linear algebra, and random number generation.',
        notes: `NumPy key concepts:
• ndarray — the core N-dimensional array
• Array creation: np.array, np.zeros, np.ones, np.arange, np.linspace
• Indexing and slicing: basic, boolean, fancy indexing
• Broadcasting: operations on arrays of different shapes
• Universal functions (ufuncs): np.sqrt, np.exp, np.sin
• Linear algebra: np.dot, np.linalg.inv, np.linalg.eig
• Random: np.random.rand, np.random.randn, np.random.seed
• Shape manipulation: reshape, flatten, transpose`,
        videos: [
          { title: 'NumPy Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=QUT1VHiLmmI' },
          { title: 'NumPy Full Course', url: 'https://www.youtube.com/watch?v=9JUAPgtkKpI' },
        ],
        projects: [
          'Build a matrix calculator that handles dot product, inverse, and eigenvalues',
          'Implement image manipulation (rotate, blur) using only NumPy arrays',
          'Create a Monte Carlo simulation for estimating π',
        ],
        practice: [
          'Implement matrix multiplication from scratch without np.dot',
          'Use broadcasting to normalize a 2D dataset to [0, 1] range',
          'Generate a 1000-sample standard normal distribution and compute statistics',
        ],
      },
    },
  },
  {
    id: 'py-pandas',
    type: 'bubbleNode',
    position: { x: 100, y: 300 },
    data: {
      label: 'Pandas',
      icon: 'https://icon.icepanel.io/Technology/svg/Pandas.svg',
      step: 2,
      difficulty: 'Beginner',
      resources: [
        { title: 'Pandas Official Docs', url: 'https://pandas.pydata.org/docs/', description: 'Complete reference & user guide' },
        { title: 'Pandas Getting Started', url: 'https://pandas.pydata.org/docs/getting_started/index.html', description: '10 minutes to pandas' },
        { title: 'Kaggle Pandas Course', url: 'https://www.kaggle.com/learn/pandas', description: 'Free interactive course' },
      ],
      prerequisite: 'py-numpy',
      topic: {
        description: 'Pandas is the go-to library for data manipulation and analysis. It provides DataFrame and Series objects for working with structured data.',
        notes: `Pandas key concepts:
• Series: 1D labeled array
• DataFrame: 2D labeled data structure (rows + columns)
• Reading data: pd.read_csv, pd.read_excel, pd.read_json
• Selection: df['col'], df.loc[], df.iloc[]
• Filtering: boolean indexing, df.query()
• Aggregation: groupby, agg, apply
• Merging: pd.merge, df.join, pd.concat
• Handling missing data: dropna, fillna, isna
• String operations: str.contains, str.replace, str.split
• Time series: DatetimeIndex, resample, rolling`,
        videos: [
          { title: 'Pandas Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=vmEHCJofslg' },
          { title: 'Data Analysis with Pandas', url: 'https://www.youtube.com/watch?v=e60ItwlZTKM' },
        ],
        projects: [
          'Analyze a real dataset (Titanic, Iris) — clean, explore, and summarize',
          'Build a sales dashboard: group by region/month, compute KPIs',
          'Merge two datasets (customers + orders) and find top customers',
        ],
        practice: [
          'Load a CSV with missing values, impute them, and output a clean version',
          'Group a sales dataset by category and month, compute total revenue per group',
          'Parse date strings, set as DatetimeIndex, and resample to weekly averages',
        ],
      },
    },
  },
  {
    id: 'py-matplotlib',
    type: 'bubbleNode',
    position: { x: 140, y: 540 },
    data: {
      label: 'Matplotlib',
      icon: 'https://icon.icepanel.io/Technology/svg/Matplotlib.svg',
      step: 3,
      difficulty: 'Intermediate',
      resources: [
        { title: 'Matplotlib Official Docs', url: 'https://matplotlib.org/stable/contents.html', description: 'Complete plotting reference' },
        { title: 'Matplotlib Tutorials', url: 'https://matplotlib.org/stable/tutorials/index.html', description: 'Official step-by-step tutorials' },
        { title: 'Seaborn Docs', url: 'https://seaborn.pydata.org/', description: 'Statistical data viz built on Matplotlib' },
      ],
      prerequisite: 'py-pandas',
      topic: {
        description: 'Matplotlib is the standard Python plotting library. Paired with Seaborn for statistical plots, it covers everything from simple line charts to complex publication-quality figures.',
        notes: `Matplotlib + Seaborn key concepts:
• pyplot interface: plt.plot, plt.scatter, plt.bar, plt.hist
• Figure and Axes: fig, ax = plt.subplots()
• Subplots: plt.subplots(2, 2) for multi-panel figures
• Styling: color, linestyle, marker, label, alpha
• Annotations: ax.annotate, ax.axhline, ax.axvline
• Saving: plt.savefig('output.png', dpi=150, bbox_inches='tight')
• Seaborn: sns.heatmap, sns.pairplot, sns.boxplot, sns.violinplot
• Plotly: interactive charts for dashboards`,
        videos: [
          { title: 'Matplotlib Tutorial', url: 'https://www.youtube.com/watch?v=OZOOLe2imFo' },
          { title: 'Seaborn Tutorial', url: 'https://www.youtube.com/watch?v=6GUZXDef2U0' },
        ],
        projects: [
          'Build an EDA (Exploratory Data Analysis) report with 10+ charts for any dataset',
          'Create a COVID-19 time series dashboard with multiple subplots',
          'Build an interactive stock price chart using Plotly',
        ],
        practice: [
          'Plot a confusion matrix as a heatmap with class labels and percentage annotations',
          'Create a 2x2 subplot grid: histogram, scatter, box plot, and bar chart from one dataset',
          'Animate a scatter plot showing data evolution over time with FuncAnimation',
        ],
      },
    },
  },
  {
    id: 'py-sklearn',
    type: 'bubbleNode',
    position: { x: 160, y: 780 },
    data: {
      label: 'Scikit-learn',
      icon: 'https://icon.icepanel.io/Technology/svg/scikit-learn.svg',
      step: 4,
      difficulty: 'Advanced',
      resources: [
        { title: 'Scikit-learn Docs', url: 'https://scikit-learn.org/stable/', description: 'Complete ML reference + user guide' },
        { title: 'ML Course by Andrew Ng', url: 'https://www.coursera.org/learn/machine-learning', description: 'Foundational ML course (Coursera)' },
        { title: 'Hands-On ML Book', url: 'https://github.com/ageron/handson-ml3', description: 'Free notebooks for the O\'Reilly book' },
      ],
      prerequisite: 'py-matplotlib',
      topic: {
        description: 'Scikit-learn is the standard Python machine learning library. It provides consistent APIs for classification, regression, clustering, and model evaluation.',
        notes: `Scikit-learn key concepts:
• Estimator API: fit(), predict(), transform()
• Preprocessing: StandardScaler, MinMaxScaler, LabelEncoder, OneHotEncoder
• Model selection: train_test_split, cross_val_score, GridSearchCV
• Classification: LogisticRegression, RandomForestClassifier, SVC, KNeighborsClassifier
• Regression: LinearRegression, Ridge, Lasso, RandomForestRegressor
• Clustering: KMeans, DBSCAN, AgglomerativeClustering
• Dimensionality reduction: PCA, TSNE
• Pipelines: Pipeline to chain preprocessing + model
• Metrics: accuracy_score, f1_score, roc_auc_score, mean_squared_error`,
        videos: [
          { title: 'Scikit-learn Crash Course', url: 'https://www.youtube.com/watch?v=0B5eIE_1vpU' },
          { title: 'Machine Learning with Python', url: 'https://www.youtube.com/watch?v=7eh4d6sabA0' },
        ],
        projects: [
          'Train a classification model on the Titanic dataset — achieve > 80% accuracy',
          'Build a house price predictor with feature engineering and cross-validation',
          'Implement a customer segmentation pipeline using KMeans clustering',
        ],
        practice: [
          'Build a full Pipeline: impute → scale → encode → classify, with GridSearchCV tuning',
          'Compare 5 classifiers on the same dataset using cross_val_score and plot results',
          'Use PCA to reduce features, then compare model performance before and after',
        ],
      },
    },
  },

  // Web Development track (right, converging inward)
  {
    id: 'py-django',
    type: 'bubbleNode',
    position: { x: 540, y: 60 },
    data: {
      label: 'Django',
      icon: 'https://icon.icepanel.io/Technology/svg/Django.svg',
      step: 1,
      difficulty: 'Intermediate',
      resources: [
        { title: 'Django Official Docs', url: 'https://docs.djangoproject.com/', description: 'Complete framework reference' },
        { title: 'Django Girls Tutorial', url: 'https://tutorial.djangogirls.org/', description: 'Beginner project walkthrough' },
        { title: 'Django REST Framework', url: 'https://www.django-rest-framework.org/', description: 'DRF API reference' },
      ],
      prerequisite: null,
      topic: {
        description: 'Django is a high-level Python web framework for building secure, maintainable websites rapidly. "Batteries included" — ORM, admin, auth, forms all built in.',
        notes: `Django key concepts:
• MVT pattern: Model, View, Template
• Models: define schema, run migrations (makemigrations, migrate)
• ORM: Model.objects.filter(), .create(), .update(), .annotate()
• Views: function-based (FBV) and class-based (CBV)
• URL routing: urls.py with path() and include()
• Templates: Jinja2-like syntax, template tags and filters
• Django Admin: automatic CRUD interface from models
• Forms and model forms: validation, rendering
• Built-in authentication: User model, login/logout, permissions
• Static files and media files`,
        videos: [
          { title: 'Django Crash Course', url: 'https://www.youtube.com/watch?v=e1IyzVyrLSU' },
          { title: 'Django REST Framework Tutorial', url: 'https://www.youtube.com/watch?v=TmsD8QExZ84' },
        ],
        projects: [
          'Build a full blog app with posts, comments, tags, and admin panel',
          'Create a REST API with Django REST Framework — serializers and viewsets',
          'Build a task manager with user authentication and per-user data',
        ],
        practice: [
          'Write a custom management command that seeds the database with 50 fake records',
          'Add pagination to a DRF list view using PageNumberPagination',
          'Implement JWT auth using djangorestframework-simplejwt',
        ],
      },
    },
  },
  {
    id: 'py-flask',
    type: 'bubbleNode',
    position: { x: 500, y: 300 },
    data: {
      label: 'Flask',
      icon: 'https://icon.icepanel.io/Technology/svg/Flask.svg',
      step: 2,
      difficulty: 'Intermediate',
      resources: [
        { title: 'Flask Official Docs', url: 'https://flask.palletsprojects.com/', description: 'Complete framework reference' },
        { title: 'Flask Mega-Tutorial', url: 'https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world', description: 'The definitive Flask guide' },
        { title: 'Flask-SQLAlchemy', url: 'https://flask-sqlalchemy.palletsprojects.com/', description: 'ORM integration for Flask' },
      ],
      prerequisite: 'py-django',
      topic: {
        description: 'Flask is a lightweight WSGI web framework. Minimal by design — you choose your tools. Perfect for microservices, APIs, and learning how web frameworks work under the hood.',
        notes: `Flask key concepts:
• App factory pattern: create_app()
• Routes: @app.route('/path', methods=['GET', 'POST'])
• Request object: request.json, request.form, request.args
• Response: jsonify(), make_response(), redirect()
• Blueprints: modular route organization
• Flask-SQLAlchemy: db.Model, db.session
• Flask-Migrate: database migrations
• Flask-Login: user session management
• Flask-WTF: form handling and CSRF protection
• Jinja2 templates: render_template(), template inheritance`,
        videos: [
          { title: 'Flask Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=Z1RJmh_OqeA' },
          { title: 'Flask REST API Tutorial', url: 'https://www.youtube.com/watch?v=GMppyAPbLYk' },
        ],
        projects: [
          'Build a URL shortener with Flask + SQLite — track click counts',
          'Create a REST API for a notes app with CRUD and JWT authentication',
          'Build a real-time chat room using Flask-SocketIO',
        ],
        practice: [
          'Refactor a single-file Flask app into blueprints + app factory pattern',
          'Add rate limiting to API endpoints using Flask-Limiter',
          'Write integration tests using Flask test client and pytest',
        ],
      },
    },
  },
  {
    id: 'py-fastapi',
    type: 'bubbleNode',
    position: { x: 460, y: 540 },
    data: {
      label: 'FastAPI',
      icon: 'https://icon.icepanel.io/Technology/svg/FastAPI.svg',
      step: 3,
      difficulty: 'Advanced',
      resources: [
        { title: 'FastAPI Official Docs', url: 'https://fastapi.tiangolo.com/', description: 'Excellent docs with interactive examples' },
        { title: 'FastAPI Tutorial', url: 'https://fastapi.tiangolo.com/tutorial/', description: 'Full official tutorial' },
        { title: 'Pydantic Docs', url: 'https://docs.pydantic.dev/', description: 'Data validation library used by FastAPI' },
      ],
      prerequisite: 'py-flask',
      topic: {
        description: 'FastAPI is a modern, high-performance web framework for building APIs with Python 3.7+. Uses type hints for automatic validation and generates OpenAPI docs automatically.',
        notes: `FastAPI key concepts:
• Path operations: @app.get(), @app.post(), @app.put(), @app.delete()
• Pydantic models: BaseModel for request/response validation
• Type hints everywhere — FastAPI reads them for validation
• Dependency injection: Depends() for shared logic (auth, DB sessions)
• Async support: async def for I/O-bound operations
• Path/query/body parameters: automatically parsed and validated
• OAuth2 + JWT: built-in security utilities
• Background tasks: BackgroundTasks for async jobs
• SQLAlchemy async integration
• Automatic Swagger UI at /docs and ReDoc at /redoc`,
        videos: [
          { title: 'FastAPI Crash Course', url: 'https://www.youtube.com/watch?v=7t2alSnE2-I' },
          { title: 'FastAPI Full Course', url: 'https://www.youtube.com/watch?v=0sOvCWFmrtA' },
        ],
        projects: [
          'Build a full CRUD API with async SQLAlchemy, Pydantic models, and JWT auth',
          'Create a file upload service with background processing and progress tracking',
          'Build a WebSocket-based real-time notification system',
        ],
        practice: [
          'Add OAuth2 password flow with JWT tokens to an existing FastAPI app',
          'Write async background task that sends email after POST /register',
          'Set up dependency injection for database sessions using yield dependencies',
        ],
      },
    },
  },
  {
    id: 'py-deployment',
    type: 'bubbleNode',
    position: { x: 440, y: 780 },
    data: {
      label: 'Deployment',
      icon: '🚀',
      step: 4,
      difficulty: 'Advanced',
      resources: [
        { title: 'Docker Docs', url: 'https://docs.docker.com/', description: 'Containerize your Python app' },
        { title: 'Railway Docs', url: 'https://docs.railway.com/', description: 'Deploy Python apps in minutes' },
        { title: 'Render Deploy Guide', url: 'https://render.com/docs/deploy-fastapi', description: 'FastAPI on Render' },
      ],
      prerequisite: 'py-fastapi',
      topic: {
        description: 'Deploy Python web apps to production. Containerize with Docker, host on Railway/Render/Fly.io, add CI/CD, configure environment variables, and monitor logs.',
        notes: `Python deployment key concepts:
• Dockerfile: FROM python:3.11-slim, COPY, RUN pip install, CMD
• docker-compose: run app + database + redis together
• WSGI/ASGI servers: Gunicorn (Flask/Django), Uvicorn (FastAPI)
• Environment variables: .env files, never commit secrets
• Database hosting: PostgreSQL on Railway, Supabase, or Neon
• CI/CD: GitHub Actions — test + build + deploy on push
• Reverse proxy: Nginx or Caddy in front of Python app
• Health checks: GET /health endpoint returning 200 + uptime
• Logging: structured JSON logs, log to stdout (container-friendly)
• Monitoring: Sentry for error tracking`,
        videos: [
          { title: 'Docker for Python Developers', url: 'https://www.youtube.com/watch?v=bi0cKgmRuiA' },
          { title: 'Deploy FastAPI on Railway', url: 'https://www.youtube.com/watch?v=HvmHPkwW9Os' },
        ],
        projects: [
          'Dockerize a FastAPI app with PostgreSQL using docker-compose',
          'Set up GitHub Actions to run tests and deploy to Railway on push to main',
          'Add structured logging, health check endpoint, and Sentry error tracking',
        ],
        practice: [
          'Write a Dockerfile for a FastAPI app — multi-stage build for smaller image',
          'Configure Gunicorn with 4 workers behind Nginx using docker-compose',
          'Create a GitHub Actions workflow: install deps → run pytest → deploy if green',
        ],
      },
    },
  },
]

export const edges = [
  // Data Science track
  { id: 'e-py-numpy-pandas', source: 'py-numpy', target: 'py-pandas', type: 'roadmapEdge', data: { active: false } },
  { id: 'e-py-pandas-matplotlib', source: 'py-pandas', target: 'py-matplotlib', type: 'roadmapEdge', data: { active: false } },
  { id: 'e-py-matplotlib-sklearn', source: 'py-matplotlib', target: 'py-sklearn', type: 'roadmapEdge', data: { active: false } },
  // Web Dev track
  { id: 'e-py-django-flask', source: 'py-django', target: 'py-flask', type: 'roadmapEdge', data: { active: false } },
  { id: 'e-py-flask-fastapi', source: 'py-flask', target: 'py-fastapi', type: 'roadmapEdge', data: { active: false } },
  { id: 'e-py-fastapi-deployment', source: 'py-fastapi', target: 'py-deployment', type: 'roadmapEdge', data: { active: false } },
]
