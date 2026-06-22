import { Brain, Shield, Rocket } from "lucide-react";

/* ============================ MOCK DATA ============================ */
export const DNA = [
  { trait: "Technical", v: 92 },
  { trait: "Analytical", v: 86 },
  { trait: "Creativity", v: 78 },
  { trait: "Risk", v: 84 },
  { trait: "Leadership", v: 61 },
  { trait: "Comms", v: 70 },
];

export const PATHS = [
  {
    id: "ai",
    title: "AI Engineer",
    icon: Brain,
    match: 94,
    accent: "var(--mint)",
    blurb: "High-growth path for users with strong technical and analytical profiles.",
    salary: "RM 4k → 18k /mo",
    line: [
      { age: 23, s: 4 },
      { age: 28, s: 9 },
      { age: 35, s: 14 },
      { age: 45, s: 18 },
    ],
    timeline: [
      { age: 23, role: "AI Engineer Intern", sal: "RM 1.2k", skill: "Python, ML basics", risk: "Low" },
      { age: 28, role: "AI Engineer", sal: "RM 9k", skill: "Deep Learning, MLOps", risk: "Low" },
      { age: 35, role: "Lead AI Engineer", sal: "RM 14k", skill: "LLMs, System design", risk: "Medium" },
      { age: 45, role: "AI Architect", sal: "RM 18k", skill: "Strategy, R&D", risk: "Low" },
    ],
    roadmap: [
      { y: "Month 1", f: "Foundation", d: "Refresh Python, SQL, Git, and basic statistics." },
      { y: "Month 2", f: "Portfolio", d: "Build one machine learning project and document it on GitHub." },
      { y: "Month 3", f: "Internship Ready", d: "Prepare resume, LinkedIn, and apply for AI/data internships." },
      { y: "Month 4", f: "MLOps Basics", d: "Learn Docker, model deployment, and API integration." },
      { y: "Month 5", f: "Interview Prep", d: "Practice technical questions and explain your projects clearly." },
    ],
    health: 82,
    percentile: 18,
    healthLabel: "Healthy Career",
    risk: {
      automation: "Low",
      warn: "Some entry-level coding tasks may be automated, so project depth and deployment skills are important.",
      recommend: ["Cloud Computing", "LLMs"],
      cert: "one cloud or AI certification",
    },
  },
  {
    id: "sec",
    title: "Cybersecurity Engineer",
    icon: Shield,
    match: 81,
    accent: "var(--sky)",
    blurb: "Stable demand path for users interested in networks, risk, and system protection.",
    salary: "RM 3.5k → 15k /mo",
    line: [
      { age: 23, s: 3.5 },
      { age: 28, s: 7 },
      { age: 35, s: 12 },
      { age: 45, s: 15 },
    ],
    timeline: [
      { age: 23, role: "Security Intern", sal: "RM 1.2k", skill: "Networking, Linux", risk: "Low" },
      { age: 28, role: "Security Engineer", sal: "RM 7k", skill: "SIEM, Cloud sec", risk: "Low" },
      { age: 35, role: "Security Architect", sal: "RM 12k", skill: "Zero-trust, Governance", risk: "Low" },
      { age: 45, role: "Security Lead", sal: "RM 15k", skill: "Risk strategy", risk: "Low" },
    ],
    roadmap: [
      { y: "Month 1", f: "Networking", d: "Learn TCP/IP, Linux, and basic scripting." },
      { y: "Month 2", f: "Security Basics", d: "Study common vulnerabilities and defensive tools." },
      { y: "Month 3", f: "Hands-on Lab", d: "Build a home lab and practice monitoring attacks." },
      { y: "Month 4", f: "Cloud Security", d: "Learn identity, access, and cloud security basics." },
      { y: "Month 5", f: "Internship Prep", d: "Prepare a security portfolio and apply for SOC roles." },
    ],
    health: 79,
    percentile: 24,
    healthLabel: "Healthy Career",
    risk: {
      automation: "Low",
      warn: "Security tooling changes quickly; practical lab experience keeps your skills relevant.",
      recommend: ["Cloud Security", "Zero-trust"],
      cert: "a security foundation certification",
    },
  },
  {
    id: "dev",
    title: "Web App Developer",
    icon: Rocket,
    match: 88,
    accent: "var(--amber)",
    blurb: "Practical path for building responsive web systems, dashboards, and products.",
    salary: "RM 3k → 12k /mo",
    line: [
      { age: 23, s: 3 },
      { age: 28, s: 6 },
      { age: 35, s: 10 },
      { age: 45, s: 12 },
    ],
    timeline: [
      { age: 23, role: "Web Developer Intern", sal: "RM 1k", skill: "HTML, CSS, JS", risk: "Medium" },
      { age: 28, role: "Frontend Developer", sal: "RM 6k", skill: "React, APIs", risk: "Medium" },
      { age: 35, role: "Full Stack Developer", sal: "RM 10k", skill: "Backend, Cloud", risk: "Low" },
      { age: 45, role: "Product Engineer", sal: "RM 12k", skill: "Architecture", risk: "Low" },
    ],
    roadmap: [
      { y: "Month 1", f: "Frontend Core", d: "Master HTML, CSS, JavaScript, and responsive UI." },
      { y: "Month 2", f: "React", d: "Build reusable components and connect to APIs." },
      { y: "Month 3", f: "Backend Basics", d: "Learn Node/Spring Boot and database integration." },
      { y: "Month 4", f: "Portfolio", d: "Build 2 full-stack projects and deploy them." },
      { y: "Month 5", f: "Apply", d: "Apply for web developer internships and junior roles." },
    ],
    health: 76,
    percentile: 30,
    healthLabel: "Good Career",
    risk: {
      automation: "Medium",
      warn: "Basic UI work is easy to automate, so focus on full-stack problem solving and product thinking.",
      recommend: ["React", "Backend APIs"],
      cert: "a deployed portfolio",
    },
  },
];

export const JOBS = [
  {
    id: "job1",
    title: "AI Engineer Intern",
    type: "Internship",
    location: "Kuala Lumpur",
    match: 94,
    description: "Assist in building machine learning models, preparing datasets, and testing AI features for real-world applications.",
    requirements: ["Python", "Machine Learning", "SQL"],
  },
  {
    id: "job2",
    title: "Web App Developer",
    type: "Full-time / Internship",
    location: "Remote / Hybrid",
    match: 88,
    description: "Design and develop responsive web applications using frontend frameworks, API integration, and modern UI practices.",
    requirements: ["React", "JavaScript", "API Integration"],
  },
  {
    id: "job3",
    title: "Junior Data Analyst",
    type: "Full-time",
    location: "Remote",
    match: 86,
    description: "Analyze business data, create dashboards, and support teams with insights using SQL, Python, and visualization tools.",
    requirements: ["SQL", "Python", "Power BI"],
  },
  {
    id: "job4",
    title: "Cybersecurity Intern",
    type: "Internship",
    location: "Cyberjaya",
    match: 81,
    description: "Support security monitoring, vulnerability assessment, incident documentation, and basic network defense tasks.",
    requirements: ["Networking", "Linux", "Security Basics"],
  },
];

export const COMPANIES = [
  {
    id: "c1",
    name: "TechNova AI",
    industry: "Artificial Intelligence",
    compatibility: 95,
    location: "Kuala Lumpur",
    salary: "RM800 - RM1,500 internship / RM3,500 - RM6,000 junior",
    openJobs: ["AI Engineer Intern", "Junior Machine Learning Engineer", "Data Analyst Intern"],
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow"],
    benefits: ["Hybrid Work", "Mentorship", "Training Budget", "Flexible Hours"],
    culture: [
      { label: "Learning Culture", value: 94 },
      { label: "Innovation", value: 96 },
      { label: "Work-Life Balance", value: 82 },
    ],
    reason: [
      "Your profile shows strong interest in AI.",
      "Your technical and analytical scores are high.",
      "Your selected career path matches their AI-related roles.",
    ],
  },
  {
    id: "c2",
    name: "AirAsia Digital",
    industry: "Travel Technology",
    compatibility: 89,
    location: "Selangor / Remote",
    salary: "RM1,000 - RM1,800 internship / RM3,800 - RM5,800 junior",
    openJobs: ["Frontend Developer Intern", "Junior Software Engineer", "Product Analyst"],
    skills: ["React", "JavaScript", "Data Analytics", "API Integration"],
    benefits: ["Remote Option", "Career Growth", "Team Projects", "Digital Product Exposure"],
    culture: [
      { label: "Fast-Paced", value: 91 },
      { label: "Teamwork", value: 88 },
      { label: "Innovation", value: 90 },
    ],
    reason: [
      "Your profile fits digital product and software roles.",
      "Your interest in building systems matches their technology environment.",
      "Good opportunity for internship and graduate-level roles.",
    ],
  },
  {
    id: "c3",
    name: "PETRONAS Digital",
    industry: "Energy Technology",
    compatibility: 84,
    location: "Kuala Lumpur",
    salary: "RM1,200 - RM2,000 internship / RM4,000 - RM6,500 junior",
    openJobs: ["Data Analyst Intern", "Cloud Engineer Graduate Trainee", "Software Developer"],
    skills: ["SQL", "Cloud Computing", "Python", "Enterprise Systems"],
    benefits: ["Structured Training", "Medical Benefits", "Career Stability", "Graduate Programme"],
    culture: [
      { label: "Stability", value: 93 },
      { label: "Learning Path", value: 87 },
      { label: "Career Growth", value: 85 },
    ],
    reason: [
      "Your computer science background fits digital transformation roles.",
      "Your roadmap aligns with data, cloud, and software opportunities.",
      "Suitable for internship, graduate, and long-term career growth.",
    ],
  },
];

export const SKILL_GAPS = [
  { skill: "Python", current: 85, required: 80, status: "Strong" },
  { skill: "Machine Learning", current: 62, required: 85, status: "Need improvement" },
  { skill: "TensorFlow", current: 30, required: 75, status: "Missing" },
  { skill: "Docker", current: 40, required: 70, status: "Missing" },
  { skill: "SQL", current: 78, required: 75, status: "Strong" },
];

export const SCORE_PARTS = [
  { n: "Skills relevance", w: 25, v: 88 },
  { n: "Learning activity", w: 20, v: 80 },
  { n: "Industry demand", w: 20, v: 91 },
  { n: "Salary growth", w: 15, v: 74 },
  { n: "Portfolio strength", w: 10, v: 69 },
  { n: "Certifications", w: 10, v: 70 },
];

export const COACH_QS = [
  "What job should I apply for first?",
  "What skill should I learn first?",
  "How can I improve my resume?",
];

export const COACH_A = {
  "What job should I apply for first?": "Based on your Career Twin, start with AI Engineer Intern or Web App Developer roles. These match your current technical profile and are realistic for internship or entry-level applications.",
  "What skill should I learn first?": "Python is your highest-leverage skill for AI and data roles. For web roles, focus on React and API integration. Pick one direction first so your portfolio looks focused.",
  "How can I improve my resume?": "Add 2 project sections with measurable outcomes. Include tools used, your role, GitHub/demo links, and one short impact statement for each project.",
};
