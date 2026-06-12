import React, { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Shield,
  Rocket,
  AlertTriangle,
  Activity,
  Target,
  Briefcase,
  Send,
  CheckCircle2,
  Circle,
  Cpu,
  Brain,
  Award,
  Heart,
  Zap,
  ChevronRight,
  Upload,
  FileText,
  X,
  Pencil,
  Eye,
  Sun,
  Moon,
  MapPin,
  Building2,
  Bookmark,
  ClipboardCheck,
} from "lucide-react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

/* ============================ THEME / STYLES ============================ */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Outfit:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap');

.ct-root{
  --bg:#0a0e14; --bg2:#0d121b; --surf:#121925; --surf2:#171f2d;
  --line:rgba(255,255,255,.08); --line2:rgba(255,255,255,.14);
  --txt:#e9eef4; --muted:#8b98a8; --faint:#5d6877;
  --mint:#3ee9b4; --mint-dim:#1c9c77; --amber:#ffb347; --coral:#ff6b6b; --sky:#5cc8ff;
  --on-mint:#04140e;
  position:relative; min-height:100vh; width:100%;
  font-family:'Outfit',sans-serif; color:var(--txt);
  background:var(--bg); overflow-x:hidden; -webkit-font-smoothing:antialiased;
  transition:background .3s ease, color .3s ease;
}
.ct-root.light{
  --bg:#f3f6fa; --bg2:#ffffff; --surf:#ffffff; --surf2:#eef2f7;
  --line:rgba(15,30,45,.10); --line2:rgba(15,30,45,.18);
  --txt:#13202e; --muted:#51627a; --faint:#7c8aa0;
  --mint:#0aa37c; --mint-dim:#0c8767; --amber:#d98a00; --coral:#e05252; --sky:#0e87cc;
  --on-mint:#ffffff;
}
.ct-root *{box-sizing:border-box;}
.ct-bg{position:fixed; inset:0; z-index:0; pointer-events:none;
  background:
    radial-gradient(60vw 50vh at 12% -5%, rgba(62,233,180,.13), transparent 60%),
    radial-gradient(50vw 50vh at 95% 8%, rgba(92,200,255,.10), transparent 60%),
    radial-gradient(60vw 60vh at 50% 110%, rgba(255,179,71,.07), transparent 60%),
    var(--bg);}
.ct-root.light .ct-bg{
  background:
    radial-gradient(60vw 50vh at 12% -5%, rgba(10,163,124,.10), transparent 60%),
    radial-gradient(50vw 50vh at 95% 8%, rgba(14,135,204,.08), transparent 60%),
    radial-gradient(60vw 60vh at 50% 110%, rgba(217,138,0,.06), transparent 60%),
    var(--bg);}
.ct-grain{position:fixed; inset:0; z-index:1; pointer-events:none; opacity:.04;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");}
.ct-root.light .ct-grain{opacity:.025;}
.ct-wrap{position:relative; z-index:2; max-width:1320px; margin:0 auto; padding:0 28px 90px;}

.ct-top{display:flex; align-items:center; justify-content:space-between; padding:26px 0; gap:18px;}
.ct-brand{display:flex; align-items:center; gap:12px; min-width:max-content;}
.ct-logo{width:40px; height:40px; position:relative; flex:none;}
.ct-name{font-family:'Bricolage Grotesque'; font-weight:700; font-size:22px; letter-spacing:-.02em;}
.ct-name b{color:var(--mint);}
.ct-tag{font-family:'JetBrains Mono'; font-size:12px; color:var(--faint); letter-spacing:.14em; text-transform:uppercase;}
.ct-right{display:flex; align-items:center; gap:16px; min-width:0;}
.ct-steps{display:flex; align-items:center; gap:9px; flex-wrap:wrap; justify-content:flex-end;}
.ct-step{display:flex; align-items:center; gap:8px; font-family:'JetBrains Mono'; font-size:12.5px; color:var(--faint); letter-spacing:.05em; cursor:pointer;}
.ct-step:hover{color:var(--txt);}
.ct-dot{width:8px; height:8px; border-radius:50%; background:var(--line2); transition:.4s;}
.ct-step.on .ct-dot{background:var(--mint); box-shadow:0 0 12px var(--mint);}
.ct-step.on{color:var(--txt);}
.ct-step.done .ct-dot{background:var(--mint-dim);}
.ct-sep{color:var(--faint); opacity:.5;}
.ct-pfp,.ct-theme{width:44px; height:44px; border-radius:50%; flex:none; cursor:pointer; display:grid; place-items:center; transition:.2s;}
.ct-pfp{border:1px solid var(--line2); background:radial-gradient(circle at 35% 30%, var(--mint), var(--mint-dim)); color:var(--on-mint); font-family:'Bricolage Grotesque'; font-weight:700; font-size:18px;}
.ct-pfp:hover,.ct-theme:hover{transform:scale(1.06);}
.ct-theme{background:transparent; border:1px solid var(--line2); color:var(--muted);}
.ct-theme:hover{color:var(--txt); border-color:var(--mint);}

.ct-overlay{position:fixed; inset:0; z-index:50; background:rgba(4,8,12,.62); backdrop-filter:blur(5px); display:flex; justify-content:flex-end; animation:fade .25s ease;}
.ct-root.light .ct-overlay{background:rgba(30,45,60,.35);}
.ct-drawer{width:440px; max-width:92vw; height:100%; overflow-y:auto; padding:28px; background:linear-gradient(180deg,var(--surf),var(--bg2)); border-left:1px solid var(--line2); box-shadow:-30px 0 60px -20px rgba(0,0,0,.6); animation:slidein .32s cubic-bezier(.2,.7,.2,1);}
.ct-modal{width:470px; max-width:92vw; margin:auto; padding:28px; background:linear-gradient(180deg,var(--surf),var(--bg2)); border:1px solid var(--line2); border-radius:22px; box-shadow:0 30px 80px -30px rgba(0,0,0,.8); animation:pop .3s ease;}
.ct-detail{display:flex; flex-direction:column;}
.ct-drow{display:flex; align-items:center; justify-content:space-between; gap:18px; padding:12px 0; border-bottom:1px solid var(--line); font-size:15px;}

.ct-upload{display:flex; align-items:center; gap:10px; padding:14px 16px; border:1.5px dashed var(--line2); border-radius:12px; cursor:pointer; color:var(--muted); font-size:15px; font-family:'Outfit'; transition:.2s;}
.ct-upload:hover{border-color:var(--mint); color:var(--txt); background:rgba(62,233,180,.05);}
.ct-resume{display:flex; align-items:center; gap:11px; padding:13px 15px; border:1px solid var(--line2); border-radius:12px; background:rgba(62,233,180,.05); font-size:15px;}
.ct-thumb{height:200px; margin-bottom:10px; border:1px solid var(--line2); border-radius:12px; overflow:hidden; background:var(--bg); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:.2s;}
.ct-thumb:hover{border-color:var(--mint);}
.ct-thumb img{width:100%; height:100%; object-fit:cover; object-position:top;}
.ct-thumb iframe{width:100%; height:100%; border:0; background:#fff; pointer-events:none;}
.ct-thumb-doc{display:flex; flex-direction:column; align-items:center; gap:8px; color:var(--faint); font-size:12px; font-family:'JetBrains Mono'; text-align:center; padding:0 16px;}

.ct-eyebrow{font-family:'JetBrains Mono'; font-size:12.5px; letter-spacing:.22em; text-transform:uppercase; color:var(--mint); margin-bottom:16px;}
h1.ct-h{font-family:'Bricolage Grotesque'; font-weight:700; letter-spacing:-.03em; line-height:1.02; margin:0;}
.ct-sub{color:var(--muted); font-size:18px; line-height:1.6; max-width:680px;}
.ct-card{background:linear-gradient(180deg,var(--surf),var(--bg2)); border:1px solid var(--line); border-radius:20px; padding:26px;}
.ct-mono{font-family:'JetBrains Mono';}
.ct-btn{display:inline-flex; align-items:center; gap:10px; cursor:pointer; border:none; font-family:'Outfit'; font-weight:600; font-size:17px; padding:15px 26px; border-radius:13px; transition:.2s;}
.ct-btn.pri{background:var(--mint); color:var(--on-mint); box-shadow:0 8px 30px -8px rgba(62,233,180,.6);}
.ct-btn.pri:hover{transform:translateY(-2px); box-shadow:0 14px 38px -8px rgba(62,233,180,.7);}
.ct-btn.ghost{background:transparent; color:var(--muted); border:1px solid var(--line2);}
.ct-btn.ghost:hover{color:var(--txt); border-color:var(--mint);}
.ct-btn:disabled{opacity:.55; cursor:not-allowed; transform:none!important;}

.ct-grid2{display:grid; grid-template-columns:1fr 1fr; gap:16px;}
.ct-grid3{display:grid; grid-template-columns:repeat(3,1fr); gap:18px;}
.ct-field label{display:block; font-size:13px; color:var(--muted); margin-bottom:7px; font-family:'JetBrains Mono'; letter-spacing:.04em;}
.ct-field input,.ct-field select{width:100%; background:var(--bg); border:1px solid var(--line2); color:var(--txt); border-radius:11px; padding:13px 15px; font-family:'Outfit'; font-size:15.5px; outline:none; transition:.2s;}
.ct-field input:focus,.ct-field select:focus{border-color:var(--mint);}
.ct-chips{display:flex; flex-wrap:wrap; gap:9px;}
.ct-chip{font-size:15px; padding:9px 16px; border-radius:99px; border:1px solid var(--line2); color:var(--muted); cursor:pointer; transition:.2s; font-family:'Outfit';}
.ct-chip.sel{background:rgba(62,233,180,.12); border-color:var(--mint); color:var(--mint);}
.ct-small-title{font-family:'JetBrains Mono'; font-size:11px; color:var(--faint); letter-spacing:2px; text-transform:uppercase;}

.ct-paths{display:grid; grid-template-columns:repeat(3,1fr); gap:18px;}
.ct-path{position:relative; overflow:hidden; transition:.25s; border:1px solid var(--line);}
.ct-path.clickable{cursor:pointer;}
.ct-path.clickable:hover{transform:translateY(-4px); border-color:var(--line2);}
.ct-path.sel{border-color:var(--mint); box-shadow:0 0 0 1px var(--mint), 0 20px 50px -20px rgba(62,233,180,.5);}
.ct-match{font-family:'Bricolage Grotesque'; font-weight:700; font-size:36px; letter-spacing:-.03em;}
.ct-tl{display:grid; grid-template-columns:repeat(4,1fr); gap:16px;}
.ct-age{font-family:'Bricolage Grotesque'; font-weight:700; font-size:32px; color:var(--mint);}
.ct-road{display:flex; flex-direction:column; gap:0;}
.ct-yr{display:flex; gap:20px; padding:18px 0; border-bottom:1px solid var(--line);}
.ct-yrn{font-family:'Bricolage Grotesque'; font-weight:700; font-size:17px; color:var(--amber); flex:none; width:74px;}
.ct-chat{display:flex; flex-direction:column; gap:13px; max-height:420px; overflow-y:auto; padding-right:6px;}
.ct-msg{max-width:78%; padding:13px 17px; border-radius:15px; font-size:16px; line-height:1.5; animation:pop .35s ease;}
.ct-msg.bot{background:var(--surf2); border:1px solid var(--line); border-bottom-left-radius:4px; align-self:flex-start;}
.ct-msg.me{background:var(--mint); color:var(--on-mint); border-bottom-right-radius:4px; align-self:flex-end; font-weight:500;}
.ct-avatar{width:52px; height:52px; border-radius:50%; flex:none; display:grid; place-items:center; background:radial-gradient(circle at 35% 30%, var(--mint), var(--mint-dim)); color:var(--on-mint); box-shadow:0 0 24px -4px var(--mint); animation:breathe 3s ease-in-out infinite;}
.ct-comp{display:flex; align-items:center; gap:13px; margin-bottom:13px;}
.ct-bar{height:8px; border-radius:9px; background:var(--line); flex:1; overflow:hidden;}
.ct-bar i{display:block; height:100%; border-radius:9px; background:linear-gradient(90deg,var(--mint-dim),var(--mint));}
.ct-alert{display:flex; gap:14px; padding:17px; border-radius:14px; border:1px solid var(--line); background:var(--surf);}
.ct-alert.warn{border-color:rgba(255,107,107,.4); background:rgba(255,107,107,.06);}
.ct-scan{font-family:'JetBrains Mono'; font-size:14.5px; color:var(--muted); display:flex; align-items:center; gap:11px; padding:8px 0;}

@keyframes fade{from{opacity:0;} to{opacity:1;}}
@keyframes slidein{from{transform:translateX(40px); opacity:.4;} to{transform:none; opacity:1;}}
@keyframes pop{from{opacity:0; transform:translateY(8px) scale(.98);} to{opacity:1; transform:none;}}
@keyframes breathe{0%,100%{transform:scale(1);} 50%{transform:scale(1.06);}}
@keyframes rise{from{opacity:0; transform:translateY(18px);} to{opacity:1; transform:none;}}
@keyframes spin{to{transform:rotate(360deg);}}
.reveal{animation:rise .6s cubic-bezier(.2,.7,.2,1) both;}
.ct-screen{animation:rise .5s ease both;}
.spin{animation:spin 1s linear infinite;}

@media(max-width:980px){
  .tw-grid{grid-template-columns:1fr!important;}
  .ct-paths,.ct-grid3{grid-template-columns:1fr 1fr;}
  .ct-steps{display:none;}
}
@media(max-width:760px){
  .ct-grid2,.ct-paths,.ct-grid3{grid-template-columns:1fr;}
  .ct-tl{grid-template-columns:1fr 1fr;}
  .ct-tag{display:none;}
  h1.ct-h{font-size:38px!important;}
  .ct-wrap{padding:0 18px 70px;}
}
`;

/* ============================ MOCK DATA ============================ */
const DNA = [
  { trait: "Technical", v: 92 },
  { trait: "Analytical", v: 86 },
  { trait: "Creativity", v: 78 },
  { trait: "Risk", v: 84 },
  { trait: "Leadership", v: 61 },
  { trait: "Comms", v: 70 },
];

const PATHS = [
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

const JOBS = [
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

const COMPANIES = [
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

const SKILL_GAPS = [
  { skill: "Python", current: 85, required: 80, status: "Strong" },
  { skill: "Machine Learning", current: 62, required: 85, status: "Need improvement" },
  { skill: "TensorFlow", current: 30, required: 75, status: "Missing" },
  { skill: "Docker", current: 40, required: 70, status: "Missing" },
  { skill: "SQL", current: 78, required: 75, status: "Strong" },
];

const SCORE_PARTS = [
  { n: "Skills relevance", w: 25, v: 88 },
  { n: "Learning activity", w: 20, v: 80 },
  { n: "Industry demand", w: 20, v: 91 },
  { n: "Salary growth", w: 15, v: 74 },
  { n: "Portfolio strength", w: 10, v: 69 },
  { n: "Certifications", w: 10, v: 70 },
];

const COACH_QS = [
  "What job should I apply for first?",
  "What skill should I learn first?",
  "How can I improve my resume?",
];
const COACH_A = {
  "What job should I apply for first?": "Based on your Career Twin, start with AI Engineer Intern or Web App Developer roles. These match your current technical profile and are realistic for internship or entry-level applications.",
  "What skill should I learn first?": "Python is your highest-leverage skill for AI and data roles. For web roles, focus on React and API integration. Pick one direction first so your portfolio looks focused.",
  "How can I improve my resume?": "Add 2 project sections with measurable outcomes. Include tools used, your role, GitHub/demo links, and one short impact statement for each project.",
};

/* ============================ HELPERS ============================ */
const Logo = () => (
  <svg className="ct-logo" viewBox="0 0 34 34" fill="none">
    <circle cx="13" cy="17" r="9" stroke="var(--mint)" strokeWidth="2" />
    <circle cx="21" cy="17" r="9" stroke="var(--sky)" strokeWidth="2" opacity=".8" />
    <circle cx="17" cy="17" r="2.4" fill="var(--mint)" />
  </svg>
);

const STEPS = ["Profile", "Simulate", "Skill Gap", "Roadmap", "Jobs", "Companies", "Coach", "Dashboard"];
const SCREEN_STEP = {
  profile: 0,
  analyzing: 1,
  twin: 1,
  timeline: 1,
  skillgap: 2,
  roadmap: 3,
  jobs: 4,
  companies: 5,
  coach: 6,
  dashboard: 7,
};
const STEP_SCREEN = ["profile", "twin", "skillgap", "roadmap", "jobs", "companies", "coach", "dashboard"];
const SAVE_KEY = "careertwin.v2";
const DEFAULT_PROFILE = {
  name: "Haikal",
  age: "20",
  userType: "Internship Seeker",
  field: "Computer Science",
  cgpa: "3.6",
  country: "Malaysia",
  workStyle: "Remote-first",
  mbti: "INTJ",
};
const DEFAULT_APPLICATIONS = [];
const loadSaved = () => {
  try {
    return JSON.parse(localStorage.getItem(SAVE_KEY)) || {};
  } catch {
    return {};
  }
};

function ScoreRing({ value }) {
  const r = 90;
  const c = 2 * Math.PI * r;
  const [draw, setDraw] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setDraw(value), 200);
    return () => clearTimeout(t);
  }, [value]);
  return (
    <svg width="212" height="212" viewBox="0 0 212 212">
      <circle cx="106" cy="106" r={r} stroke="var(--line)" strokeWidth="13" fill="none" />
      <circle
        cx="106"
        cy="106"
        r={r}
        stroke="var(--mint)"
        strokeWidth="13"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c - (c * draw) / 100}
        transform="rotate(-90 106 106)"
        style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(.2,.7,.2,1)", filter: "drop-shadow(0 0 8px var(--mint))" }}
      />
      <text x="106" y="100" textAnchor="middle" fontFamily="Bricolage Grotesque" fontWeight="700" fontSize="54" fill="var(--txt)">{value}</text>
      <text x="106" y="128" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="12.5" fill="var(--faint)" letterSpacing="2">/ 100</text>
    </svg>
  );
}

/* ============================ APP ============================ */
export default function App() {
  const saved = loadSaved();
  const [screen, setScreen] = useState("landing");
  const [picked, setPicked] = useState(() => PATHS.find((p) => p.id === saved.pickedId) || PATHS[0]);
  const [interests, setInterests] = useState(() => saved.interests || ["AI", "Building"]);
  const [profile, setProfile] = useState(() => ({ ...DEFAULT_PROFILE, ...saved.profile }));
  const [resume, setResume] = useState(() => saved.resume || null);
  const [theme, setTheme] = useState(() => saved.theme || "dark");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [applications, setApplications] = useState(() => saved.applications || DEFAULT_APPLICATIONS);
  const [applyModal, setApplyModal] = useState(null);
  const [chat, setChat] = useState([{ from: "bot", t: "Hi Haikal 👋 I'm Twin, your AI career coach. Ask me about jobs, resumes, skills, or applications." }]);
  const chatRef = useRef(null);

  const step = SCREEN_STEP[screen];
  const go = (s) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setScreen(s);
  };

  useEffect(() => {
    if (screen !== "analyzing") return;
    setScanStep(0);
    const seq = [600, 1300, 2000, 2700];
    const timers = seq.map((d, i) => setTimeout(() => setScanStep(i + 1), d));
    const done = setTimeout(() => go("twin"), 3500);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(done);
    };
  }, [screen]);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chat]);

  useEffect(() => {
    if (!resume?.url) {
      setPreviewUrl(null);
      return;
    }
    let active = true;
    let objUrl;
    fetch(resume.url)
      .then((r) => r.blob())
      .then((b) => {
        if (!active) return;
        objUrl = URL.createObjectURL(b);
        setPreviewUrl(objUrl);
      })
      .catch(() => setPreviewUrl(null));
    return () => {
      active = false;
      if (objUrl) URL.revokeObjectURL(objUrl);
    };
  }, [resume]);

  useEffect(() => {
    const full = { profile, interests, resume, theme, pickedId: picked.id, applications };
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(full));
    } catch {
      try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(resume ? { ...full, resume: { ...resume, url: null } } : full));
      } catch {}
    }
  }, [profile, interests, resume, theme, picked, applications]);

  const setField = (key) => (e) => setProfile((p) => ({ ...p, [key]: e.target.value }));
  const toggleInterest = (x) => setInterests((p) => (p.includes(x) ? p.filter((i) => i !== x) : [...p, x]));
  const ask = (q) => {
    setChat((c) => [...c, { from: "me", t: q }]);
    setTimeout(() => setChat((c) => [...c, { from: "bot", t: COACH_A[q] || "I recommend focusing on one target role, improving the missing skills, then applying to companies with strong fit scores." }]), 550);
  };

  const onResume = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setResume({ name: file.name, size: `${(file.size / 1024).toFixed(0)} KB`, type: file.type, url: reader.result });
    reader.readAsDataURL(file);
  };

  const viewResume = () => {
    if (!resume?.url) return;
    fetch(resume.url)
      .then((r) => r.blob())
      .then((b) => {
        const url = URL.createObjectURL(b);
        window.open(url, "_blank");
        setTimeout(() => URL.revokeObjectURL(url), 30000);
      });
  };

  const resetProfile = () => {
    try {
      localStorage.removeItem(SAVE_KEY);
    } catch {}
    setProfile({ ...DEFAULT_PROFILE });
    setInterests(["AI", "Building"]);
    setResume(null);
    setPicked(PATHS[0]);
    setApplications([]);
    setShowProfile(false);
  };

  const applyForJob = (company, role) => {
    const exists = applications.some((a) => a.company === company && a.role === role);
    if (!exists) {
      setApplications((list) => [{ company, role, status: "Applied", date: new Date().toLocaleDateString() }, ...list]);
    }
    setApplyModal({ company, role, alreadyApplied: exists });
  };

  const resumeField = () =>
    resume ? (
      <div className="ct-resume">
        <FileText size={18} color="var(--mint)" style={{ flex: "none" }} />
        <div style={{ minWidth: 0 }}>
          <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{resume.name}</div>
          <div className="ct-mono" style={{ fontSize: 11, color: "var(--faint)" }}>{resume.size}</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, flex: "none" }}>
          {resume.url && (
            <button className="ct-btn ghost" style={{ padding: "7px 11px", fontSize: 13 }} onClick={viewResume}>
              <Eye size={14} /> View
            </button>
          )}
          <label className="ct-btn ghost" style={{ padding: "7px 11px", fontSize: 13, cursor: "pointer" }}>
            <input type="file" accept=".pdf,.doc,.docx,image/*" hidden onChange={onResume} />
            Replace
          </label>
        </div>
      </div>
    ) : (
      <label className="ct-upload">
        <input type="file" accept=".pdf,.doc,.docx,image/*" hidden onChange={onResume} />
        <Upload size={18} /> <span>Attach your resume (PDF, DOC, DOCX)</span>
      </label>
    );

  return (
    <div className={`ct-root ${theme === "light" ? "light" : ""}`}>
      <style>{STYLES}</style>
      <div className="ct-bg" />
      <div className="ct-grain" />
      <div className="ct-wrap">
        <div className="ct-top">
          <div className="ct-brand" onClick={() => go("landing")} style={{ cursor: "pointer" }}>
            <Logo />
            <div>
              <div className="ct-name">CareerTwin<b>OS</b></div>
              <div className="ct-tag">Resume to job offer</div>
            </div>
          </div>
          <div className="ct-right">
            {screen !== "landing" && (
              <div className="ct-steps">
                {STEPS.map((s, i) => (
                  <React.Fragment key={s}>
                    <div className={`ct-step ${i === step ? "on" : ""} ${i < step ? "done" : ""}`} onClick={() => go(STEP_SCREEN[i])}>
                      <span className="ct-dot" />{s}
                    </div>
                    {i < STEPS.length - 1 && <span className="ct-sep">›</span>}
                  </React.Fragment>
                ))}
              </div>
            )}
            <button className="ct-theme" onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}>{theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}</button>
            <button className="ct-pfp" onClick={() => setShowProfile(true)}>{(profile.name.trim().charAt(0) || "U").toUpperCase()}</button>
          </div>
        </div>

        {showProfile && (
          <div className="ct-overlay" onClick={() => setShowProfile(false)}>
            <div className="ct-drawer" onClick={(e) => e.stopPropagation()}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                <div className="ct-small-title">Profile & Settings</div>
                <button className="ct-btn ghost" style={{ padding: 9, borderRadius: 10 }} onClick={() => setShowProfile(false)}><X size={16} /></button>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
                <div className="ct-pfp" style={{ width: 54, height: 54, fontSize: 22, cursor: "default" }}>{(profile.name.trim().charAt(0) || "U").toUpperCase()}</div>
                <div>
                  <div style={{ fontFamily: "Bricolage Grotesque", fontWeight: 700, fontSize: 20 }}>{profile.name || "Your name"}</div>
                  <div className="ct-mono" style={{ fontSize: 12, color: "var(--mint)" }}>{profile.userType} · {profile.field}</div>
                </div>
              </div>
              <div className="ct-detail">
                {[["User type", profile.userType], ["Field", profile.field], ["CGPA", profile.cgpa], ["Country", profile.country], ["Work style", profile.workStyle], ["Personality", profile.mbti]].map(([k, v]) => (
                  <div className="ct-drow" key={k}><span style={{ color: "var(--muted)" }}>{k}</span><span style={{ fontWeight: 500 }}>{v || "—"}</span></div>
                ))}
              </div>
              <div style={{ marginTop: 18 }}>
                <div className="ct-small-title" style={{ marginBottom: 8 }}>Interests</div>
                <div className="ct-chips">{interests.map((x) => <span key={x} className="ct-chip sel" style={{ cursor: "default" }}>{x}</span>)}</div>
              </div>
              <div style={{ marginTop: 18 }}>
                <div className="ct-small-title" style={{ marginBottom: 8 }}>Resume / CV</div>
                {resume && (
                  <div className="ct-thumb" onClick={viewResume}>
                    {previewUrl && resume.type?.startsWith("image/") ? <img src={previewUrl} alt="resume preview" /> : previewUrl && resume.type === "application/pdf" ? <iframe src={previewUrl} title="resume preview" /> : <div className="ct-thumb-doc"><FileText size={34} color="var(--mint)" /><span>{resume.url ? "No inline preview — click to open" : "Preview not saved"}</span></div>}
                  </div>
                )}
                {resumeField()}
              </div>
              <button className="ct-btn pri" style={{ width: "100%", justifyContent: "center", marginTop: 22 }} onClick={() => { setShowProfile(false); go("profile"); }}><Pencil size={16} /> Edit full profile</button>
              <button className="ct-btn ghost" style={{ width: "100%", justifyContent: "center", marginTop: 10, fontSize: 13 }} onClick={resetProfile}>Reset profile & clear saved data</button>
            </div>
          </div>
        )}

        {applyModal && (
          <div className="ct-overlay" onClick={() => setApplyModal(null)} style={{ justifyContent: "center", alignItems: "center" }}>
            <div className="ct-modal" onClick={(e) => e.stopPropagation()}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div className="ct-avatar" style={{ animation: "none" }}><CheckCircle2 size={25} /></div>
                <div>
                  <div style={{ fontFamily: "Bricolage Grotesque", fontWeight: 700, fontSize: 25 }}>{applyModal.alreadyApplied ? "Already Applied" : "Application Submitted"}</div>
                  <div style={{ color: "var(--muted)", marginTop: 4 }}>Your profile has been sent successfully.</div>
                </div>
              </div>
              <div className="ct-card" style={{ marginTop: 22, padding: 18 }}>
                <div className="ct-drow"><span style={{ color: "var(--muted)" }}>Position</span><b>{applyModal.role}</b></div>
                <div className="ct-drow"><span style={{ color: "var(--muted)" }}>Company</span><b>{applyModal.company}</b></div>
                <div className="ct-drow"><span style={{ color: "var(--muted)" }}>Status</span><b style={{ color: "var(--mint)" }}>Applied</b></div>
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 22 }}>
                <button className="ct-btn ghost" style={{ flex: 1, justifyContent: "center" }} onClick={() => setApplyModal(null)}>Continue Exploring</button>
                <button className="ct-btn pri" style={{ flex: 1, justifyContent: "center" }} onClick={() => { setApplyModal(null); go("dashboard"); }}>View Applications</button>
              </div>
            </div>
          </div>
        )}

        {screen === "landing" && (
          <div className="ct-screen" style={{ paddingTop: 70 }}>
            <div className="ct-eyebrow reveal">AI Career & Job Matching Platform</div>
            <h1 className="ct-h reveal" style={{ fontSize: 76, animationDelay: ".05s" }}>Your AI Career Twin.<br /><span style={{ color: "var(--mint)" }}>From Resume to Job Offer.</span></h1>
            <p className="ct-sub reveal" style={{ marginTop: 22, animationDelay: ".12s" }}>Upload your resume, discover career matches, identify skill gaps, receive personalized career roadmaps, and connect with job opportunities tailored to your profile.</p>
            <div className="reveal" style={{ marginTop: 34, display: "flex", gap: 12, alignItems: "center", animationDelay: ".2s" }}>
              <button className="ct-btn pri" onClick={() => go("profile")}>Discover My Career Match <ArrowRight size={18} /></button>
              <span className="ct-mono" style={{ fontSize: 13.5, color: "var(--faint)" }}>2-min demo</span>
            </div>
            <div className="ct-grid3 reveal" style={{ marginTop: 56, animationDelay: ".28s" }}>
              {[{ i: Brain, t: "AI Career Matching", d: "Find jobs and internships that match your skills and interests." }, { i: Target, t: "Skill Gap Analysis", d: "Identify missing skills and create a personalized learning plan." }, { i: Briefcase, t: "Opportunity Hub", d: "Explore companies and apply to suitable open positions." }].map((x) => <div className="ct-card" key={x.t}><x.i size={26} color="var(--mint)" /><div style={{ fontWeight: 600, marginTop: 14, fontSize: 19 }}>{x.t}</div><div style={{ color: "var(--muted)", fontSize: 15.5, marginTop: 6 }}>{x.d}</div></div>)}
            </div>
          </div>
        )}

        {screen === "profile" && (
          <div className="ct-screen" style={{ paddingTop: 30 }}>
            <div className="ct-eyebrow">Step 1 — Career Profile Engine</div>
            <h1 className="ct-h" style={{ fontSize: 48 }}>Build your Career DNA</h1>
            <p className="ct-sub" style={{ marginTop: 12 }}>Tell us about you. CareerTwin uses this profile to recommend jobs, companies, and roadmaps.</p>
            <div className="ct-card" style={{ marginTop: 26 }}>
              <div className="ct-grid2">
                <div className="ct-field"><label>FULL NAME</label><input value={profile.name} onChange={setField("name")} /></div>
                <div className="ct-field"><label>AGE</label><input value={profile.age} onChange={setField("age")} /></div>
                <div className="ct-field"><label>USER TYPE</label><select value={profile.userType} onChange={setField("userType")}><option>Internship Seeker</option><option>Fresh Graduate</option><option>Job Seeker</option><option>Working Professional</option><option>Career Changer</option></select></div>
                <div className="ct-field"><label>FIELD OF STUDY / WORK</label><input value={profile.field} onChange={setField("field")} /></div>
                <div className="ct-field"><label>CGPA / PERFORMANCE</label><input value={profile.cgpa} onChange={setField("cgpa")} /></div>
                <div className="ct-field"><label>COUNTRY</label><input value={profile.country} onChange={setField("country")} /></div>
                <div className="ct-field"><label>WORK STYLE</label><select value={profile.workStyle} onChange={setField("workStyle")}><option>Remote-first</option><option>Hybrid</option><option>On-site</option></select></div>
                <div className="ct-field"><label>PERSONALITY</label><select value={profile.mbti} onChange={setField("mbti")}><option>INTJ</option><option>ENTP</option><option>INTP</option><option>ENTJ</option><option>ENFP</option><option>ISFJ</option></select></div>
              </div>
              <div className="ct-field" style={{ marginTop: 16 }}>
                <label>INTERESTS</label>
                <div className="ct-chips">{["AI", "Web Development", "Building", "Security", "Design", "Leadership", "Research", "Finance"].map((x) => <span key={x} className={`ct-chip ${interests.includes(x) ? "sel" : ""}`} onClick={() => toggleInterest(x)}>{x}</span>)}</div>
              </div>
              <div className="ct-field" style={{ marginTop: 16 }}><label>RESUME / CV</label>{resumeField()}</div>
            </div>
            <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
              <button className="ct-btn ghost" onClick={() => go("landing")}><ArrowLeft size={17} /> Back</button>
              <button className="ct-btn pri" onClick={() => go("analyzing")}><Sparkles size={17} /> Generate my Twin</button>
            </div>
          </div>
        )}

        {screen === "analyzing" && (
          <div className="ct-screen" style={{ paddingTop: 90, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Cpu size={90} color="var(--mint)" className="spin" style={{ opacity: .9 }} />
            <h1 className="ct-h" style={{ fontSize: 36, marginTop: 28 }}>Building your Career Twin…</h1>
            <div className="ct-card" style={{ marginTop: 30, textAlign: "left", width: "100%", maxWidth: 500 }}>
              {["Analyzing resume and career profile", "Mapping skills to job requirements", "Generating career paths", "Preparing job and company matches"].map((s, i) => <div className="ct-scan" key={s} style={{ opacity: scanStep > i ? 1 : .35 }}>{scanStep > i ? <CheckCircle2 size={16} color="var(--mint)" /> : <Circle size={16} color="var(--faint)" className={scanStep === i ? "spin" : ""} />}{s}</div>)}
            </div>
          </div>
        )}

        {screen === "twin" && (
          <div className="ct-screen" style={{ paddingTop: 30 }}>
            <div className="ct-eyebrow">Step 2 — Career Twin AI</div>
            <h1 className="ct-h" style={{ fontSize: 46 }}>Your career matches are ready</h1>
            <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: 20, marginTop: 26 }} className="tw-grid">
              <div className="ct-card">
                <div className="ct-small-title">Career DNA</div>
                <div style={{ height: 260, marginTop: 4 }}>
                  <ResponsiveContainer width="100%" height="100%"><RadarChart data={DNA} outerRadius="78%"><PolarGrid stroke="var(--line2)" /><PolarAngleAxis dataKey="trait" tick={{ fill: "var(--muted)", fontSize: 12.5, fontFamily: "JetBrains Mono" }} /><Radar dataKey="v" stroke="var(--mint)" fill="var(--mint)" fillOpacity={0.28} /></RadarChart></ResponsiveContainer>
                </div>
                <div className="ct-chips" style={{ marginTop: 6 }}>{[["Type", "Builder"], ["Goal", profile.userType], ["Style", profile.workStyle]].map(([k, v]) => <span key={k} className="ct-chip sel" style={{ cursor: "default" }}>{k}: {v}</span>)}</div>
              </div>
              <div>
                <p className="ct-sub" style={{ marginBottom: 14, fontSize: 16.5 }}>Pick a career target to see timeline, skill gap, roadmap, jobs, and companies.</p>
                <div className="ct-paths">
                  {PATHS.map((p) => <div key={p.id} className={`ct-card ct-path clickable ${picked.id === p.id ? "sel" : ""}`} onClick={() => setPicked(p)}><p.icon size={26} style={{ color: p.accent }} /><div className="ct-match" style={{ marginTop: 12, color: p.accent }}>{p.match}%</div><div className="ct-small-title">Match</div><div style={{ fontWeight: 600, marginTop: 14, fontSize: 18.5 }}>{p.title}</div><div style={{ color: "var(--muted)", fontSize: 14.5, marginTop: 7, lineHeight: 1.5 }}>{p.blurb}</div><div className="ct-mono" style={{ fontSize: 13.5, color: p.accent, marginTop: 14 }}>{p.salary}</div></div>)}
                </div>
              </div>
            </div>
            <div style={{ marginTop: 24, display: "flex", gap: 12 }}><button className="ct-btn ghost" onClick={() => go("profile")}><ArrowLeft size={17} /> Back</button><button className="ct-btn pri" onClick={() => go("timeline")}>Simulate {picked.title} <ArrowRight size={17} /></button></div>
          </div>
        )}

        {screen === "timeline" && (
          <div className="ct-screen" style={{ paddingTop: 30 }}>
            <div className="ct-eyebrow">Career Timeline · {picked.title}</div>
            <h1 className="ct-h" style={{ fontSize: 44 }}>Your possible career path</h1>
            <div className="ct-card" style={{ marginTop: 22 }}>
              <div className="ct-small-title" style={{ marginBottom: 8 }}>Projected income (RM '000 / month)</div>
              <div style={{ height: 240 }}><ResponsiveContainer width="100%" height="100%"><AreaChart data={picked.line} margin={{ left: -18, right: 8, top: 8 }}><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--mint)" stopOpacity={0.5} /><stop offset="100%" stopColor="var(--mint)" stopOpacity={0} /></linearGradient></defs><CartesianGrid stroke="var(--line)" vertical={false} /><XAxis dataKey="age" tick={{ fill: "var(--muted)", fontSize: 13.5, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} tickFormatter={(a) => "age " + a} /><YAxis tick={{ fill: "var(--muted)", fontSize: 13.5, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} /><Tooltip contentStyle={{ background: "var(--surf)", border: "1px solid var(--line2)", color: "var(--txt)", borderRadius: 10, fontFamily: "JetBrains Mono", fontSize: 13 }} /><Area type="monotone" dataKey="s" stroke="var(--mint)" strokeWidth={2.5} fill="url(#g)" /></AreaChart></ResponsiveContainer></div>
            </div>
            <div className="ct-tl" style={{ marginTop: 18 }}>{picked.timeline.map((t) => <div className="ct-card" key={t.age}><div className="ct-age">{t.age}</div><div style={{ fontWeight: 600, fontSize: 16.5, marginTop: 6 }}>{t.role}</div><div className="ct-mono" style={{ color: "var(--mint)", fontSize: 14.5, marginTop: 4 }}>{t.sal}/mo</div><div style={{ color: "var(--muted)", fontSize: 14, marginTop: 8 }}>{t.skill}</div><div style={{ marginTop: 8, fontSize: 13, color: t.risk === "High" ? "var(--coral)" : t.risk === "Medium" ? "var(--amber)" : "var(--mint)" }}>Risk: {t.risk}</div></div>)}</div>
            <div style={{ marginTop: 24, display: "flex", gap: 12 }}><button className="ct-btn ghost" onClick={() => go("twin")}><ArrowLeft size={17} /> Paths</button><button className="ct-btn pri" onClick={() => go("skillgap")}><Target size={17} /> Analyze skill gap</button></div>
          </div>
        )}

        {screen === "skillgap" && (
          <div className="ct-screen" style={{ paddingTop: 30 }}>
            <div className="ct-eyebrow">Step 3 — Skill Gap Analyzer</div>
            <h1 className="ct-h" style={{ fontSize: 44 }}>Your readiness for {picked.title}</h1>
            <p className="ct-sub" style={{ marginTop: 12 }}>CareerTwin compares your current skill level against required skills for your selected target.</p>
            <div className="ct-card" style={{ marginTop: 24 }}>{SKILL_GAPS.map((s) => <div className="ct-comp" key={s.skill}><div style={{ width: 160, fontSize: 15, color: "var(--muted)" }}>{s.skill}</div><div className="ct-bar"><i style={{ width: `${s.current}%` }} /></div><div className="ct-mono" style={{ width: 110, textAlign: "right", color: "var(--faint)" }}>{s.current}% / {s.required}%</div></div>)}</div>
            <div className="ct-alert warn" style={{ marginTop: 18 }}><AlertTriangle size={20} color="var(--coral)" /><div><div style={{ fontWeight: 600 }}>Priority Skill Gap</div><div style={{ color: "var(--muted)", marginTop: 4 }}>Improve TensorFlow, Docker, and Machine Learning before applying for higher-level AI roles.</div></div></div>
            <div style={{ marginTop: 24, display: "flex", gap: 12 }}><button className="ct-btn ghost" onClick={() => go("timeline")}><ArrowLeft size={17} /> Timeline</button><button className="ct-btn pri" onClick={() => go("roadmap")}><Target size={17} /> Generate roadmap</button></div>
          </div>
        )}

        {screen === "roadmap" && (
          <div className="ct-screen" style={{ paddingTop: 30 }}>
            <div className="ct-eyebrow">Step 4 — LifeGPS Roadmap</div>
            <h1 className="ct-h" style={{ fontSize: 44 }}>Become job-ready for {picked.title}</h1>
            <p className="ct-sub" style={{ marginTop: 12 }}>Your target career broken into an actionable plan before applying.</p>
            <div className="ct-card" style={{ marginTop: 22 }}><div className="ct-road">{picked.roadmap.map((r) => <div className="ct-yr" key={r.y}><div className="ct-yrn">{r.y}</div><div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 17 }}>{r.f}</div><div style={{ color: "var(--muted)", fontSize: 15.5, marginTop: 4 }}>{r.d}</div></div><ChevronRight size={18} color="var(--faint)" style={{ alignSelf: "center" }} /></div>)}</div></div>
            <div style={{ marginTop: 24, display: "flex", gap: 12 }}><button className="ct-btn ghost" onClick={() => go("skillgap")}><ArrowLeft size={17} /> Skill Gap</button><button className="ct-btn pri" onClick={() => go("jobs")}><Briefcase size={17} /> View job titles</button></div>
          </div>
        )}

        {screen === "jobs" && (
          <div className="ct-screen" style={{ paddingTop: 30 }}>
            <div className="ct-eyebrow">Step 5 — Job Discovery</div>
            <h1 className="ct-h" style={{ fontSize: 44 }}>Job titles that match your profile</h1>
            <p className="ct-sub" style={{ marginTop: 12 }}>This section only explains suitable job titles. Apply later from the company section.</p>
            <div className="ct-paths" style={{ marginTop: 24 }}>{JOBS.map((job) => <div className="ct-card ct-path" key={job.id}><Briefcase size={26} color="var(--mint)" /><div style={{ fontWeight: 700, fontSize: 20, marginTop: 14 }}>{job.title}</div><div style={{ color: "var(--muted)", marginTop: 6, lineHeight: 1.55 }}>{job.description}</div><div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}><span className="ct-chip sel" style={{ cursor: "default" }}>{job.match}% Match</span><span className="ct-chip" style={{ cursor: "default" }}>{job.type}</span></div><div style={{ display: "flex", gap: 8, color: "var(--muted)", marginTop: 14, alignItems: "center" }}><MapPin size={15} />{job.location}</div><div style={{ marginTop: 14 }}><div style={{ color: "var(--muted)", fontSize: 14, marginBottom: 8 }}>Basic Requirements</div><div className="ct-chips">{job.requirements.map((s) => <span className="ct-chip sel" key={s}>{s}</span>)}</div></div></div>)}</div>
            <div style={{ marginTop: 24, display: "flex", gap: 12 }}><button className="ct-btn ghost" onClick={() => go("roadmap")}><ArrowLeft size={17} /> Roadmap</button><button className="ct-btn pri" onClick={() => go("companies")}><Building2 size={17} /> Explore companies & apply</button></div>
          </div>
        )}

        {screen === "companies" && (
          <div className="ct-screen" style={{ paddingTop: 30 }}>
            <div className="ct-eyebrow">Step 6 — Company Opportunity Hub</div>
            <h1 className="ct-h" style={{ fontSize: 44 }}>Companies that fit your profile</h1>
            <p className="ct-sub" style={{ marginTop: 12 }}>View full company details, open positions, salary, benefits, work style match, and apply directly.</p>
            <div className="ct-paths" style={{ marginTop: 24 }}>{COMPANIES.map((c) => <div className="ct-card ct-path" key={c.id}><Award size={26} color="var(--sky)" /><div style={{ fontWeight: 700, fontSize: 21, marginTop: 14 }}>{c.name}</div><div style={{ color: "var(--muted)", marginTop: 4 }}>{c.industry} · {c.location}</div><div className="ct-match" style={{ color: "var(--sky)", marginTop: 16 }}>{c.compatibility}%</div><div className="ct-small-title">Company Fit</div>
              <div style={{ marginTop: 16 }}><div className="ct-small-title" style={{ marginBottom: 8 }}>Why you match</div>{c.reason.map((r) => <div key={r} style={{ display: "flex", gap: 8, color: "var(--muted)", fontSize: 14.5, marginTop: 6, lineHeight: 1.4 }}><CheckCircle2 size={15} color="var(--mint)" style={{ flex: "none", marginTop: 2 }} />{r}</div>)}</div>
              <div style={{ marginTop: 18 }}><div className="ct-small-title" style={{ marginBottom: 8 }}>Open positions</div>{c.openJobs.map((job) => <div className="ct-alert" key={job} style={{ marginTop: 8, padding: 12, alignItems: "center" }}><Briefcase size={16} color="var(--mint)" style={{ flex: "none" }} /><div style={{ fontSize: 14.5, fontWeight: 500 }}>{job}</div><button className="ct-btn pri" style={{ marginLeft: "auto", padding: "8px 12px", fontSize: 13 }} onClick={() => applyForJob(c.name, job)}>Apply</button></div>)}</div>
              <div style={{ marginTop: 18 }}><div className="ct-small-title" style={{ marginBottom: 6 }}>Salary range</div><div style={{ color: "var(--mint)", fontSize: 14.5, lineHeight: 1.5 }}>{c.salary}</div></div>
              <div style={{ marginTop: 18 }}><div className="ct-small-title" style={{ marginBottom: 8 }}>Skills needed</div><div className="ct-chips">{c.skills.map((skill) => <span className="ct-chip sel" key={skill}>{skill}</span>)}</div></div>
              <div style={{ marginTop: 18 }}><div className="ct-small-title" style={{ marginBottom: 8 }}>Benefits</div><div className="ct-chips">{c.benefits.map((b) => <span className="ct-chip" key={b}>{b}</span>)}</div></div>
              <div style={{ marginTop: 18 }}><div className="ct-small-title" style={{ marginBottom: 10 }}>Work style match</div>{c.culture.map((item) => <div className="ct-comp" key={item.label}><div style={{ width: 130, fontSize: 13.5, color: "var(--muted)" }}>{item.label}</div><div className="ct-bar"><i style={{ width: `${item.value}%` }} /></div><div className="ct-mono" style={{ fontSize: 12, width: 42, textAlign: "right", color: "var(--faint)" }}>{item.value}%</div></div>)}</div>
            </div>)}</div>
            <div style={{ marginTop: 24, display: "flex", gap: 12 }}><button className="ct-btn ghost" onClick={() => go("jobs")}><ArrowLeft size={17} /> Jobs</button><button className="ct-btn pri" onClick={() => go("coach")}><Sparkles size={17} /> Ask AI coach</button></div>
          </div>
        )}

        {screen === "coach" && (
          <div className="ct-screen" style={{ paddingTop: 30 }}>
            <div className="ct-eyebrow">Step 7 — AI Career Coach</div>
            <h1 className="ct-h" style={{ fontSize: 44 }}>Meet Twin</h1>
            <div className="ct-card" style={{ marginTop: 22 }}>
              <div style={{ display: "flex", gap: 14, alignItems: "center", paddingBottom: 16, borderBottom: "1px solid var(--line)", marginBottom: 16 }}><div className="ct-avatar"><Sparkles size={22} /></div><div><div style={{ fontWeight: 600, fontSize: 17 }}>Twin · AI Career Coach</div><div className="ct-mono" style={{ fontSize: 12.5, color: "var(--mint)" }}>● online · job seeker mode</div></div></div>
              <div className="ct-chat" ref={chatRef}>{chat.map((m, i) => <div key={i} className={`ct-msg ${m.from}`}>{m.t}</div>)}</div>
              <div className="ct-chips" style={{ marginTop: 16 }}>{COACH_QS.map((q) => <span key={q} className="ct-chip" onClick={() => ask(q)} style={{ borderColor: "var(--mint-dim)" }}><Send size={12} style={{ marginRight: 5, display: "inline" }} />{q}</span>)}</div>
            </div>
            <div style={{ marginTop: 24, display: "flex", gap: 12 }}><button className="ct-btn ghost" onClick={() => go("companies")}><ArrowLeft size={17} /> Companies</button><button className="ct-btn pri" onClick={() => go("dashboard")}><Activity size={17} /> View dashboard</button></div>
          </div>
        )}

        {screen === "dashboard" && (
          <div className="ct-screen" style={{ paddingTop: 30 }}>
            <div className="ct-eyebrow">Step 8 — Career Dashboard</div>
            <h1 className="ct-h" style={{ fontSize: 44 }}>Your career dashboard</h1>
            <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 20, marginTop: 26 }} className="tw-grid">
              <div className="ct-card" style={{ textAlign: "center" }}><ScoreRing value={picked.health} /><div style={{ display: "inline-flex", gap: 7, alignItems: "center", marginTop: 6, color: "var(--mint)", fontWeight: 600 }}><Heart size={16} /> {picked.healthLabel}</div><div style={{ color: "var(--muted)", fontSize: 14, marginTop: 4 }}>Top {picked.percentile}% for your age & field</div></div>
              <div className="ct-card"><div className="ct-small-title" style={{ marginBottom: 14 }}>Score breakdown</div>{SCORE_PARTS.map((p) => <div className="ct-comp" key={p.n}><div style={{ width: 155, fontSize: 14.5, color: "var(--muted)" }}>{p.n}</div><div className="ct-bar"><i style={{ width: `${p.v}%` }} /></div><div className="ct-mono" style={{ fontSize: 13, width: 66, textAlign: "right", color: "var(--faint)" }}>{p.v} · {p.w}%</div></div>)}</div>
            </div>
            <div className="ct-alert warn" style={{ marginTop: 18 }}><AlertTriangle size={20} color="var(--coral)" /><div><div style={{ fontWeight: 600, fontSize: 16.5 }}>Skill demand alert</div><div style={{ color: "var(--muted)", fontSize: 15, marginTop: 4 }}>{picked.risk.warn} Recommended: {picked.risk.recommend.join(", ")} and {picked.risk.cert}.</div></div></div>
            <div className="ct-alert" style={{ marginTop: 12 }}><Zap size={20} color="var(--mint)" /><div><div style={{ fontWeight: 600, fontSize: 16.5 }}>On track</div><div style={{ color: "var(--muted)", fontSize: 15, marginTop: 4 }}>You're aligned with your {picked.title} goal. Automation risk: <b style={{ color: "var(--mint)" }}>{picked.risk.automation}</b>.</div></div></div>
            <div className="ct-card" style={{ marginTop: 24 }}><div className="ct-small-title" style={{ marginBottom: 12 }}>Application Tracker</div>{applications.length ? applications.map((a) => <div className="ct-drow" key={`${a.company}-${a.role}`}><span><b>{a.role}</b><div style={{ color: "var(--muted)", fontSize: 14 }}>{a.company} · {a.date || "Today"}</div></span><span style={{ color: "var(--mint)", fontWeight: 600 }}>{a.status}</span></div>) : <div style={{ color: "var(--muted)", fontSize: 15 }}>No applications yet. Go to Companies and apply for a suitable position.</div>}</div>
            <div style={{ marginTop: 26, display: "flex", gap: 12 }}><button className="ct-btn ghost" onClick={() => go("coach")}><ArrowLeft size={17} /> Coach</button><button className="ct-btn pri" onClick={() => go("companies")}><ClipboardCheck size={17} /> Apply more jobs</button></div>
            <div className="ct-card" style={{ marginTop: 30, textAlign: "center", borderColor: "var(--mint-dim)" }}><div style={{ fontFamily: "Bricolage Grotesque", fontWeight: 700, fontSize: 24 }}>“We don't just show jobs — we guide you from profile to application.”</div><div className="ct-mono" style={{ fontSize: 12.5, color: "var(--faint)", marginTop: 8, letterSpacing: 2 }}>CareerTwin OS</div></div>
          </div>
        )}
      </div>
    </div>
  );
}
