import { PortfolioData } from "@/types/portfolio";

export const portfolioData: PortfolioData = {
  personal: {
    name: "Sharvari Hupare",
    role: "Software Development Engineer",
    tagline: "Architecting scalable full-stack platforms, mission-critical fintech rails, and intelligent AI workflows.",
    subTagline:
      "Full-stack engineer with deep expertise in Next.js, TypeScript, Node.js, and Python. Proven track record in building government digital health stacks (ABDM), payment integrations (Razorpay, Cashfree), and enterprise AI systems.",
    location: "Pune, India",
    avatarUrl: "/sharvari.jpg",
    phone: "+91-8007015254",
    email: "sharvarihupare15@gmail.com",
    linkedin: "sharvarihupare",
    linkedinUrl: "https://www.linkedin.com/in/sharvari-hupare15/",
    github: "sharvarihupare-369",
    githubUrl: "https://github.com/sharvarihupare-369",
    resumeUrl:
      "https://drive.google.com/file/d/17Jv9iKYVOez6MPqBFYxZTkCcr279rYzd/view?usp=sharing",
    resumePdfUrl: "/Sharvari_Hupare_Resume.pdf",
    summary:
      "Full-Stack Engineer delivering scalable web applications with React.js, Next.js, TypeScript, Node.js, and Python. Specializes in architecting robust RESTful APIs, secure payment systems, and dynamic geolocation features. Leverages fintech and health-tech expertise to build comprehensive insurance and digital health platforms.",
    story: {
      intro:
        "Holding a Bachelor of Pharmacy degree, my background is rooted in pharmaceutical sciences, medicine, and healthcare. This medical foundation inspired my transition into full-stack engineering with Masai School, giving me unique domain insights and high-concurrency software systems.",
      journey:
        "At ImpactGuru, I spearhead critical fintech and healthtech modules: from engineering real-time insurance engines to integrating India's ABDM digital health stack (ABHA card issuance) and multi-channel payment gateways like Razorpay and Cashfree. Prior to this at Metta Social Solutions, I scaled geolocation architectures and microservices with Google Maps API and SQLAlchemy.",
      vision:
        "Today, I blend robust backend foundations with modern frontend craft and cutting-edge Generative AI-building high-throughput RAG systems and conversational workflows that solve tangible, real-world problems.",
    },
  },

  stats: [
    { value: "40%", label: "Manual Onboarding Reduced via ABDM" },
    { value: "35%", label: "Identity Match Success Boost" },
    { value: "10+", label: "Languages Supported in AI Code Translator" },
    { value: "100%", label: "Production Reliability on Payment Rails" },
  ],

  experiences: [
    {
      id: "impactguru",
      role: "Software Development Engineer",
      company: "ImpactGuru",
      location: "Mumbai, Maharashtra",
      period: "Feb 2025 - July 2026",
      isCurrent: true,
      achievements: [
        "Migrated the payment flow from UPI Collect to UPI Intent within a tight one-month timeline to comply with NPCI changes. Implemented mobile UPI app redirection and desktop QR-code payments, along with the required backend payment configurations and integration updates. Focused on maintaining a seamless cross-platform payment experience and minimizing disruption to existing users.",
        "Built a real-time health insurance comparison engine and independently delivered a full-scale term insurance module featuring scalable APIs, SEO-optimized frontend, and responsive cross-device UI enabling users to evaluate plans from multiple providers and make faster decisions.",
        "Built a secure end-to-end ABHA card generation and download flow with government (ABDM) digital health stack integration, featuring OTP-based Aadhaar verification and multi-mode verification (mobile number, ABHA number, Aadhaar, address), reducing manual onboarding time by 40% and improving identity match success rate by 35%.",
        "Integrated Razorpay payment gateway to enable secure real-time transactions within the CarePal Money platform, supporting future health plan purchase workflows.",
        "Implemented Cashfree NetBanking payment integration for HDFC and ICICI banks, expanding payment options, improving transaction success rates, and enhancing checkout flexibility.",
      ],
      metrics: [
        { value: "40%", label: "Onboarding Time Cut" },
        { value: "35%", label: "Match Rate Boost" },
        { value: "Zero Loss", label: "Secure Payment Pipelines" },
      ],
      techStack: [
        "React.js",
        "Next.js",
        "Python",
        "Node.js",
        "Express.js",
        "TypeScript",
        "Razorpay",
        "REST APIs",
        "React Native"
      ],
    },
    {
      id: "mettasocial",
      role: "Junior Software Development Engineer",
      company: "Metta Social Solutions Pvt Ltd",
      location: "Pune, India",
      period: "Jan 2024 – Jan 2025",
      isCurrent: false,
      achievements: [
        "Led the full implementation of the Google Maps API from proof of concept to production, enabling geolocation-based features.",
        "Built a high-performance, dynamic autocomplete search experience using Next.js, TypeScript, and React Query with real-time, highlighted suggestions.",
        "Optimized API response times by refactoring queries and integrating efficient data retrieval techniques, including improved SQLAlchemy joins with custom sorting and pagination.",
        "Created RESTful APIs using Node.js and Python, supporting scalable microservices consumed by other backend systems.",
      ],
      metrics: [
        { value: "Sub-100ms", label: "Autocomplete Search Latency" },
        { value: "100%", label: "Production Geolocation Delivery" },
      ],
      techStack: [
        "Next.js",
        "TypeScript",
        "Python",
        "FastAPI",
        "Node.js",
        "SQLAlchemy",
        "PostgreSQL",
        "React Query",
        "Google Maps API",
      ],
    },
  ],

  projects: [
    {
      id: "clinicpilot",
      title: "ClinicPilot",
      subtitle: "Full-Stack AI Appointment Scheduling Application",
      description:
        "An end-to-end production medical appointment scheduling application. Features real-time doctor availability checks, slot booking, rescheduling, and cancellations, paired with an AI-assisted conversational workflow powered by Google Gemini.",
      highlights: [
        "Full-stack architecture featuring Next.js frontend and FastAPI + SQLAlchemy + SQLite asynchronous backend.",
        "Doctor availability checks, automated conflict resolution, and dynamic rescheduling/cancellations.",
        "Integrated conversational agent using Google Gemini API for intuitive natural language appointment bookings.",
        "Demonstrates end-to-end full-stack design, resilient backend business rules, and practical generative AI workflows.",
      ],
      techStack: [
        "Next.js",
        "FastAPI",
        "Python",
        "SQLAlchemy",
        "SQLite",
        "Google Gemini API",
        "TypeScript",
        "Tailwind CSS",
      ],
      liveUrl: "https://clinicpilot-frontend.vercel.app/",
      githubUrl: "https://github.com/sharvarihupare-369/ClinicPilot",
      featured: true,
      category: "Full-Stack & AI",
      badge: "Deployed Live Application",
    },
    {
      id: "knowledgeflow",
      title: "KnowledgeFlow AI",
      subtitle: "Enterprise Retrieval-Augmented Generation (RAG) Platform",
      description:
        "Architected an enterprise-grade RAG platform featuring an end-to-end document processing pipeline (extraction, chunking, embeddings, and vector storage) for grounded semantic search and AI-powered knowledge discovery.",
      highlights: [
        "End-to-end ingestion pipeline: automated document parsing, semantic chunking, and embedding generation.",
        "High-performance vector search engine using Qdrant VectorDB with PostgreSQL metadata indexing.",
        "Multi-model integration leveraging OpenAI API and NVIDIA API for grounded, hallucination-resistant syntheses.",
      ],
      techStack: [
        "Next.js",
        "Express.js",
        "TypeScript",
        "PostgreSQL",
        "Qdrant VectorDB",
        "OpenAI API",
        "NVIDIA API",
      ],
      liveUrl: "https://knowledge-flow-ai-c1.vercel.app/",
      githubUrl: "https://github.com/sharvarihupare-369/knowledgeflow",
      featured: true,
      category: "Enterprise Systems",
      badge: "Deployed Live Application",
    },
    {
      id: "ai-code-converter",
      title: "AI Code Converter App",
      subtitle: "Multi-Language Idiomatic Code Translation Platform",
      description:
        "Developed a full-stack AI Code Translator enabling instant, highly accurate, and idiomatic code conversion across 10+ programming languages while preserving original logic and idioms.",
      highlights: [
        "Instant code translation preserving algorithmic complexity, variable semantics, and idiomatic styles across 10+ languages.",
        "Powered by Google Gemini API with smart tokenization and AST-aligned prompt engineering.",
        "Responsive developer UI with side-by-side syntax comparison, syntax highlighting, and copy-ready exports.",
      ],
      techStack: [
        "Next.js",
        "React",
        "Google Gemini API",
        "TypeScript",
        "Tailwind CSS",
      ],
      liveUrl: "https://code-converter-app-opal.vercel.app/",
      githubUrl: "https://github.com/sharvarihupare-369/code-converter-app",
      featured: true,
      category: "Generative AI",
      badge: "Deployed Live Application",
    },
  ],

  skillCategories: [
    {
      category: "Languages",
      icon: "Code2",
      description: "Core programming and query languages",
      skills: ["JavaScript", "TypeScript", "Python", "SQL"],
    },
    {
      category: "Frontend",
      icon: "Layout",
      description: "Modern, high-performance web and mobile interfaces",
      skills: [
        "Next.js",
        "React.js",
        "Redux",
        "React Native",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
      ],
    },
    {
      category: "Backend & Cloud",
      icon: "Server",
      description: "Scalable microservices, REST APIs, and infrastructure",
      skills: [
        "Node.js",
        "Express.js",
        "FastAPI",
        "AWS",
        "RESTful APIs",
        "Microservices",
      ],
    },
    {
      category: "Databases & Vector Search",
      icon: "Database",
      description: "Relational, document, and vector storage engines",
      skills: [
        "PostgreSQL",
        "MongoDB",
        "Qdrant (VectorDB)",
        "SQLAlchemy",
        "SQLite",
      ],
    },
    {
      category: "AI & LLM Tools",
      icon: "Sparkles",
      description: "Generative AI APIs, embeddings, and modern agent tooling",
      skills: [
        "Google Gemini API",
        "OpenAI API",
        "HuggingFace Models",
        "Claude Code",
        "Windsurf",
        "Antigravity",
      ],
    },
    {
      category: "Tools & Testing",
      icon: "Terminal",
      description: "Development workflow, testing frameworks, and issue tracking",
      skills: [
        "Git & GitHub",
        "Postman",
        "Jest",
        "Cypress",
        "PgAdmin",
        "Android Studio",
        "VS Code",
        "Jira",
        "ClickUp",
      ],
    },
  ],

  education: [
    {
      institution: "Masai School",
      degree: "Full Stack Web Development (Certificate)",
      location: "Bengaluru, India",
      period: "Oct 2022 – Dec 2023",
      description:
        "Intensive, military-style full stack engineering program. Trained in JavaScript, Node.js, React, MongoDB, Data Structures, and Agile methodology. Built Resume Builder Platform and led collaborative group engineering sprints.",
      skillsLearned: [
        "Full-Stack Architecture",
        "Data Structures & Algorithms",
        "System Design",
        "Agile Methodology",
      ],
    },
    {
      institution: "Government College of Pharmacy Karad",
      degree: "Bachelor of Pharmacy (B.Pharm)",
      location: "Karad, India",
      period: "July 2018 – Aug 2022",
      description:
        "Four-year undergraduate degree in pharmaceutical sciences, pharmacology, medicinal chemistry, clinical healthcare workflows, and drug regulation-providing deep domain expertise that powers my work.",
      skillsLearned: [
        "Pharmaceutical Sciences",
        "Pharmacology & Medicine",
        "Clinical Healthcare Systems",
        "Healthcare Regulatory Compliance",
      ],
    },
  ],

  navItems: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ],
};
