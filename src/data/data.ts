import shopeaseImg from '../assets/shopease.jpg';
import minivercelImg from '../assets/minivercel.jpg';

export interface AdditionalProject {
  id: string;
  title: string;
  eyebrow?: string;
  timeline?: string;
  technologies: string[];
  points: string[];
  githubLink?: string;
}

export interface ProjectModalDetails {
  problemAndGoals: string;
  featuresAndFlows: string[];
  architectureDiagram?: string;
  architectureNotes: string;
  technicalDecisions: { decision: string; rationale: string }[];
  challengesAndFixes: string;
  evaluationAndTesting: string;
  learningsAndNextSteps: string;
}

export interface Project {
  id: string;
  title: string;
  eyebrow: string;
  badge?: string;
  tagline: string;
  description: string;
  techStack: string[];
  highlights: string[];
  githubLink?: string;
  liveLink?: string;
  imageUrl: string;
  imageAlt: string;
  details: ProjectModalDetails;
}

export interface ImpactMetric {
  value: string;
  label: string;
  context: string;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  location: string;
  duration: string;
  type: 'Work' | 'Research';
  summary: string;
  points: string[];
  technologies: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  duration: string;
  grade: string;
  coursework: string[];
}

export interface SkillGroup {
  category: string;
  description: string;
  items: { name: string; level?: string }[];
}

export const personalInfo = {
  name: "Karan Kumar",
  roleTitle: "Frontend Engineer · Full-Stack Developer",
  headline: "I build reliable, responsive web applications.",
  subheadline: "I turn complex requirements into clean user experiences, backed by maintainable React architecture, API integration, automated testing, and performance optimization.",
  status: "Available for frontend & full-stack roles",
  email: "karankumar21143@gmail.com",
  phone: "+91 9154994175",
  location: "Hyderabad, India",
  github: "https://github.com/karankumar211",
  linkedin: "https://www.linkedin.com/in/karan-kumar-5a36522b5",
  leetcode: "https://leetcode.com/u/karankumar2114/",
  resumeUrl: "/Karan_Kumar_Resume.pdf"
};

export const impactMetrics: ImpactMetric[] = [
  {
    value: "20+",
    label: "Reusable React Components",
    context: "Engineered modular UI components to standardize application architecture and reduce dev overhead."
  },
  {
    value: "15+",
    label: "Backend REST APIs",
    context: "Integrated and optimized server endpoints with resilient error handling and request caching."
  },
  {
    value: "50+",
    label: "Jest Unit Tests",
    context: "Wrote automated frontend test suites ensuring deterministic behavior across state workflows."
  },
  {
    value: "45% → 80%",
    label: "Test Coverage Improvement",
    context: "Raised baseline unit and integration test coverage across critical application flows."
  },
  {
    value: "100+",
    label: "SonarQube Issues Resolved",
    context: "Eliminated static analysis security vulnerabilities, code smells, and technical debt."
  }
];

export const projectsData: Project[] = [
  {
    id: "shopease",
    title: "ShopEase",
    eyebrow: "Full-Stack E-Commerce Platform",
    badge: "Featured Product",
    tagline: "E-commerce web application with Redux Toolkit and RESTful backend",
    description: "Responsive shopping flows, Redux Toolkit state management, REST APIs, authentication, protected routes, and admin workflows.",
    techStack: ["React", "TypeScript", "Redux Toolkit", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    highlights: [
      "Dynamic shopping cart, persistent local caching, and deterministic checkout state via Redux Toolkit.",
      "JWT-authenticated user sessions, role-based access control, and protected routes for buyer & admin portals.",
      "Optimized product search, category filtering, and paginated REST endpoints with sub-100ms response targets."
    ],
    githubLink: "https://github.com/karankumar211/ShopEase",
    imageUrl: shopeaseImg,
    imageAlt: "ShopEase full-stack e-commerce user interface with product catalog and cart slide-over",
    details: {
      problemAndGoals: "E-commerce applications often suffer from fragmented cart state synchronization, fragile routing between checkout steps, and sluggish catalog filtration. The goal was to build an e-commerce application with predictable state transitions, strict route guards, and reliable server interactions.",
      featuresAndFlows: [
        "Product Discovery: Multi-parameter search, faceted price/rating filters, and server-side pagination.",
        "Cart & Order Workflow: Real-time quantity adjustments, price calculations, and resilient checkout sequence.",
        "Role-Based Authentication: Granular JWT auth protecting customer profiles and privileged admin management panels.",
        "Admin Dashboard: Inventory updates, order fulfillment tracking, and catalog CRUD operations."
      ],
      architectureDiagram: "Browser (React + Redux Toolkit) <--> REST API (Express / Node.js) <--> MongoDB Atlas + JWT Auth Layer",
      architectureNotes: "Client state is partitioned into isolated Redux Toolkit slices (authSlice, cartSlice, productSlice). Side-effects and asynchronous HTTP requests are handled cleanly via Redux Thunks with standardized loading and error states.",
      technicalDecisions: [
        {
          decision: "Redux Toolkit over Context API",
          rationale: "Prevents unnecessary re-renders in deeply nested e-commerce component trees and guarantees predictable, serializable state transitions for complex shopping cart logic."
        },
        {
          decision: "Compound Component Pattern for UI",
          rationale: "Used for modals, drawers, and form controls to maximize reusability and clean separation of concerns."
        }
      ],
      challengesAndFixes: "Encountered race conditions during simultaneous cart increments and fast checkouts. Solved by implementing optimistic UI updates paired with debounced synchronization and server-side inventory verification before state confirmation.",
      evaluationAndTesting: "Tested with 30+ Jest and React Testing Library unit tests verifying cart calculations, auth guards, and snapshot integrity.",
      learningsAndNextSteps: "Gained deep experience in state architecture trade-offs. Next iteration plans to implement Redis caching for trending product queries and Stripe webhook integration."
    }
  },
  {
    id: "mini-vercel",
    title: "Mini Vercel",
    eyebrow: "Cloud Deployment Platform",
    badge: "Deployment Systems",
    tagline: "Automated frontend build pipeline with Docker workers and AWS S3 artifact hosting",
    description: "Project management, asynchronous build workflows, deployment status, Docker, and AWS S3 artifacts.",
    techStack: ["React", "TypeScript", "Node.js", "Docker", "AWS S3", "Redis", "WebSockets"],
    highlights: [
      "Asynchronous build queue orchestrating Docker containerized builds for static web repositories.",
      "Static artifact extraction and direct streaming to AWS S3 buckets for edge-ready hosting.",
      "Real-time build log streaming to the developer dashboard via WebSockets and Redis Pub/Sub."
    ],
    githubLink: "https://github.com/karankumar211",
    imageUrl: minivercelImg,
    imageAlt: "Mini Vercel developer dashboard showing deployment history, Docker build logs, and AWS S3 static distribution",
    details: {
      problemAndGoals: "Manual deployment of static frontends requires tedious server configuration, artifact packaging, and web server provisioning. Mini Vercel was engineered to emulate automated CI/CD deployment: a developer submits a Git repository URL, an isolated worker container builds the bundle, and artifacts are deployed to cloud object storage automatically.",
      featuresAndFlows: [
        "Repository Ingestion: Users submit repository URLs to initialize automated build jobs.",
        "Containerized Build Workers: Sandboxed Docker containers pull source code, run `npm install` and `npm run build` in isolation.",
        "Artifact Deployment: Built distribution bundles (`dist`/`build`) are scanned and uploaded to AWS S3 with content-type hashing.",
        "Live Telemetry: Build stdout/stderr logs streamed directly into the browser terminal in real time."
      ],
      architectureDiagram: "Web Client (Dashboard) <--> API Gateway <--> Redis Queue <--> Docker Build Worker --> AWS S3 (Static Hosting)",
      architectureNotes: "Decouples the web-facing API server from the compute-heavy build process using a Redis queue. Workers spawn lightweight ephemeral containers with strict resource limits and timeout safeguards.",
      technicalDecisions: [
        {
          decision: "Ephemeral Docker containers for builds",
          rationale: "Guarantees process isolation so untrusted repository code cannot compromise host resources or tamper with shared environments."
        },
        {
          decision: "Redis Pub/Sub for log streaming",
          rationale: "Enables zero-polling real-time terminal output in the browser with low server overhead."
        }
      ],
      challengesAndFixes: "Handling zombie build processes and memory exhaustion during large `npm install` cycles. Resolved by adding strict Docker memory caps (--memory=1g), execution timeouts, and an automated garbage collection cleanup worker.",
      evaluationAndTesting: "Validated builds against multiple frontend templates (Vite, Create React App). Verified sub-60s typical build turnaround times.",
      learningsAndNextSteps: "Deepened knowledge of container isolation, distributed queues, and cloud storage mechanics. Next step is implementing custom domain routing and SSL termination via Cloudflare API."
    }
  }
];

export const additionalProjects: AdditionalProject[] = [
  {
    id: "taskflow",
    title: "TaskFlow — Distributed Job Queue",
    eyebrow: "Distributed Systems & Queues",
    timeline: "Present",
    technologies: ["Python", "FastAPI", "Redis", "PostgreSQL", "Docker"],
    points: [
      "Built a producer-queue-worker job processing system with Redis for queuing and PostgreSQL for persistent job tracking.",
      "Implemented priority scheduling, concurrent workers, and retries, processing 5,000+ jobs across 4 workers.",
      "Engineered idempotent execution and fault isolation to prevent duplicate side effects when jobs are reprocessed."
    ],
    githubLink: "https://github.com/karankumar211"
  },
  {
    id: "speech-analytics",
    title: "Speech Data Analytics — Respin Corpus",
    eyebrow: "Speech Analytics & Evaluation",
    timeline: "Present",
    technologies: ["Python", "Pandas", "NumPy", "SQL", "Hugging Face", "Wav2Vec2"],
    points: [
      "Built Python data pipelines to clean, validate, and profile large domain-specific speech and transcription data sets, and organise them into train/dev/test splits.",
      "Applied statistical analysis (WER, CER, error distributions across domains and noise conditions) to evaluate a fine-tuned Wav2Vec2 Telugu ASR model."
    ],
    githubLink: "https://github.com/karankumar211"
  },
  {
    id: "network-server",
    title: "Multithreaded TCP/UDP Network Server",
    eyebrow: "Concurrent Network Systems",
    technologies: ["C++", "POSIX Sockets", "pthreads", "Linux"],
    points: [
      "Implemented a concurrent multi-client TCP server in C++ using POSIX sockets and a thread pool, plus a UDP datagram mode to compare reliable and connectionless transport.",
      "Used mutexes and condition variables for thread-safe request queues; handled client disconnects, message framing and resource cleanup."
    ],
    githubLink: "https://github.com/karankumar211"
  },
  {
    id: "char-driver",
    title: "Linux Character Device Driver",
    eyebrow: "Linux Kernel Module",
    technologies: ["C", "Linux Kernel Module"],
    points: [
      "Developed a loadable kernel module registering a character device with open/read/write/ioctl operations and safe user-kernel data transfer (copy_to_user / copy_from_user).",
      "Added mutex-protected kernel buffer; tested with a user-space C program and verified module load/unload behavior using dmesg."
    ],
    githubLink: "https://github.com/karankumar211"
  },
  {
    id: "dsa-engine",
    title: "DSA Engine — Algorithm Toolkit",
    eyebrow: "Algorithms & Data Structures",
    technologies: ["C++", "STL", "Templates"],
    points: [
      "Developed a reusable C++ library of graph traversal, shortest paths, trees, heaps and dynamic programming using STL and templates for modular reuse.",
      "Validated correctness with edge-case testing and analyzed time and space complexity across alternative approaches."
    ],
    githubLink: "https://github.com/karankumar211"
  },
  {
    id: "teamboard",
    title: "TeamBoard — Real-Time Task Management App",
    eyebrow: "Full-Stack Web Application",
    technologies: ["MongoDB", "Express.js", "React", "Node.js", "Redux Toolkit", "Socket.IO", "AWS"],
    points: [
      "Built a full-stack MERN application with JWT authentication, role-based access and REST APIs for projects, boards and tasks, backed by MongoDB (Mongoose) with indexed queries.",
      "Implemented real-time task updates across users with Socket.IO and managed client state and API calls with Redux Toolkit.",
      "Wrote Jest/Supertest API tests and Playwright end-to-end tests; deployed the backend and frontend on AWS (EC2 and S3)."
    ],
    githubLink: "https://github.com/karankumar211"
  }
];

export const experienceData: Experience[] = [
  {
    id: "exp-galactix",
    role: "Frontend Developer Intern",
    organization: "Galactix Solutions Pvt. Ltd.",
    location: "Remote / Hyderabad",
    duration: "March 2026 - June 2026",
    type: "Work",
    summary: "Led frontend feature development and standardization for core client-facing web applications using React and Redux Toolkit.",
    points: [
      "Developed 20+ reusable, accessible React components adhering to strict design tokens and UI consistency guidelines.",
      "Integrated 15+ backend REST APIs with resilient state management, error handling, and request lifecycle management.",
      "Engineered comprehensive Jest unit test suites with 50+ tests, boosting test coverage from 45% to 80%.",
      "Resolved 100+ SonarQube code quality issues, eliminating memory leaks, anti-patterns, and accessibility violations.",
      "Collaborated in Agile sprints, participating in code reviews, sprint planning, and rapid production bug triage."
    ],
    technologies: ["React", "TypeScript", "Redux Toolkit", "REST APIs", "Jest", "SonarQube", "Git", "Tailwind CSS"]
  },
  {
    id: "exp-iiit",
    role: "Research Intern",
    organization: "IIIT Hyderabad",
    location: "Hyderabad, India",
    duration: "Research Project",
    type: "Research",
    summary: "Investigated neural cascaded speech-to-speech translation pipelines for regional Indian languages with focus on Telugu.",
    points: [
      "Engineered an end-to-end evaluation pipeline chaining Vaani FastConformer (ASR), IndicTrans2 (MT), and Spring_F5 (TTS).",
      "Benchmarked speech recognition accuracy and translation quality using standardized Word Error Rate (WER) and BLEU metrics.",
      "Formulated reproducible evaluation scripts optimized to execute effectively under constrained GPU compute environments.",
      "Analyzed error propagation patterns across cascading boundaries to improve pipeline robustness."
    ],
    technologies: ["Python", "PyTorch", "IndicTrans2", "FastConformer", "Spring_F5", "Hugging Face", "NLP"]
  }
];

export const educationData: Education = {
  degree: "B.Tech in Computer Science and Engineering",
  institution: "Hyderabad Institute of Technology and Management (HITAM)",
  location: "Hyderabad, Telangana",
  duration: "2023 - 2027 (Expected: June 2027)",
  grade: "8.5 / 10 CGPA",
  coursework: [
    "Data Structures & Algorithms",
    "Operating Systems",
    "Computer Networks",
    "Database Management Systems",
    "Object-Oriented Programming",
    "System Design Basics"
  ]
};

export const skillsData: SkillGroup[] = [
  {
    category: "Frontend Engineering",
    description: "Component architecture, responsive layouts, state workflows, and browser performance",
    items: [
      { name: "React" },
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "JavaScript (ES6+)" },
      { name: "Redux Toolkit" },
      { name: "Tailwind CSS" },
      { name: "HTML5 & Semantic Web" },
      { name: "CSS3 & Modern Layouts" }
    ]
  },
  {
    category: "Backend & APIs",
    description: "Server-side logic, API design, event-driven communication, and authentication",
    items: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "REST APIs" },
      { name: "JWT Auth" },
      { name: "WebSockets" },
      { name: "Socket.IO" }
    ]
  },
  {
    category: "Data & Databases",
    description: "Data modeling, schema design, relational and document persistence, and caching",
    items: [
      { name: "MongoDB" },
      { name: "PostgreSQL" },
      { name: "MySQL" },
      { name: "Redis" }
    ]
  },
  {
    category: "Testing & Tooling",
    description: "Automated test suites, continuous inspection, containerization, and version control",
    items: [
      { name: "Jest" },
      { name: "SonarQube" },
      { name: "Git & GitHub" },
      { name: "Docker" },
      { name: "Linux / Bash" },
      { name: "Postman" }
    ]
  },
  {
    category: "Research & Core Programming",
    description: "Scientific workflows, neural model evaluation, and foundational computer science",
    items: [
      { name: "Python" },
      { name: "PyTorch" },
      { name: "Hugging Face" },
      { name: "C++" },
      { name: "SQL" }
    ]
  }
];