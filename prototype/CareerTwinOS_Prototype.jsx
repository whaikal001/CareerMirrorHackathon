import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles, ArrowRight, ArrowLeft, Shield, Rocket, TrendingUp,
  AlertTriangle, Activity, Target, GraduationCap, Briefcase, Send,
  CheckCircle2, Circle, Cpu, Brain, User, Award, Heart, Zap, ChevronRight,
  Upload, FileText, X, Pencil, Eye
} from "lucide-react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip
} from "recharts";

/* ============================ THEME / STYLES ============================ */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Outfit:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap');

.ct-root{
  --bg:#0a0e14; --bg2:#0d121b; --surf:#121925; --surf2:#171f2d;
  --line:rgba(255,255,255,.08); --line2:rgba(255,255,255,.14);
  --txt:#e9eef4; --muted:#8b98a8; --faint:#5d6877;
  --mint:#3ee9b4; --mint-dim:#1c9c77; --amber:#ffb347; --coral:#ff6b6b; --sky:#5cc8ff;
  position:relative; min-height:100vh; width:100%;
  font-family:'Outfit',sans-serif; color:var(--txt);
  background:var(--bg); overflow-x:hidden; -webkit-font-smoothing:antialiased;
}
.ct-root *{box-sizing:border-box;}
.ct-bg{position:fixed; inset:0; z-index:0; pointer-events:none;
  background:
    radial-gradient(60vw 50vh at 12% -5%, rgba(62,233,180,.13), transparent 60%),
    radial-gradient(50vw 50vh at 95% 8%, rgba(92,200,255,.10), transparent 60%),
    radial-gradient(60vw 60vh at 50% 110%, rgba(255,179,71,.07), transparent 60%),
    var(--bg);}
.ct-grain{position:fixed; inset:0; z-index:1; pointer-events:none; opacity:.04;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");}
.ct-wrap{position:relative; z-index:2; max-width:1120px; margin:0 auto; padding:0 24px 80px;}

/* top bar */
.ct-top{display:flex; align-items:center; justify-content:space-between; padding:22px 0;}
.ct-brand{display:flex; align-items:center; gap:11px;}
.ct-logo{width:34px; height:34px; position:relative; flex:none;}
.ct-name{font-family:'Bricolage Grotesque'; font-weight:700; font-size:19px; letter-spacing:-.02em;}
.ct-name b{color:var(--mint);}
.ct-tag{font-family:'JetBrains Mono'; font-size:10.5px; color:var(--faint); letter-spacing:.14em; text-transform:uppercase;}

/* stepper */
.ct-steps{display:flex; align-items:center; gap:8px; flex-wrap:wrap;}
.ct-step{display:flex; align-items:center; gap:7px; font-family:'JetBrains Mono'; font-size:11px; color:var(--faint); letter-spacing:.05em;}
.ct-dot{width:7px; height:7px; border-radius:50%; background:var(--line2); transition:.4s;}
.ct-step.on .ct-dot{background:var(--mint); box-shadow:0 0 12px var(--mint);}
.ct-step.on{color:var(--txt);}
.ct-step.done .ct-dot{background:var(--mint-dim);}
.ct-sep{color:var(--faint); opacity:.5;}

/* clickable steps + top-right group */
.ct-step{cursor:pointer;}
.ct-step:hover{color:var(--txt);}
.ct-right{display:flex; align-items:center; gap:16px;}
.ct-pfp{width:38px; height:38px; border-radius:50%; flex:none; border:1px solid var(--line2);
  background:radial-gradient(circle at 35% 30%, var(--mint), var(--mint-dim)); color:#04140e;
  font-family:'Bricolage Grotesque'; font-weight:700; font-size:16px; cursor:pointer;
  display:grid; place-items:center; transition:.2s;}
.ct-pfp:hover{transform:scale(1.06); box-shadow:0 0 16px -2px var(--mint);}

/* profile drawer */
.ct-overlay{position:fixed; inset:0; z-index:50; background:rgba(4,8,12,.62); backdrop-filter:blur(5px);
  display:flex; justify-content:flex-end; animation:fade .25s ease;}
.ct-drawer{width:392px; max-width:92vw; height:100%; overflow-y:auto; padding:26px;
  background:linear-gradient(180deg,var(--surf),var(--bg2)); border-left:1px solid var(--line2);
  box-shadow:-30px 0 60px -20px rgba(0,0,0,.6); animation:slidein .32s cubic-bezier(.2,.7,.2,1);}
.ct-detail{display:flex; flex-direction:column;}
.ct-drow{display:flex; align-items:center; justify-content:space-between; padding:11px 0; border-bottom:1px solid var(--line); font-size:14px;}

/* resume upload */
.ct-upload{display:flex; align-items:center; gap:10px; padding:13px 15px; border:1.5px dashed var(--line2);
  border-radius:12px; cursor:pointer; color:var(--muted); font-size:14px; font-family:'Outfit'; transition:.2s;}
.ct-upload:hover{border-color:var(--mint); color:var(--txt); background:rgba(62,233,180,.05);}
.ct-upload .ct-mono{margin-left:auto; font-size:11px; color:var(--faint); white-space:nowrap;}
.ct-resume{display:flex; align-items:center; gap:11px; padding:12px 14px; border:1px solid var(--line2);
  border-radius:12px; background:rgba(62,233,180,.05); font-size:14px;}
.ct-thumb{height:200px; margin-bottom:10px; border:1px solid var(--line2); border-radius:12px; overflow:hidden;
  background:var(--bg); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:.2s;}
.ct-thumb:hover{border-color:var(--mint);}
.ct-thumb img{width:100%; height:100%; object-fit:cover; object-position:top;}
.ct-thumb iframe{width:100%; height:100%; border:0; background:#fff; pointer-events:none;}
.ct-thumb-doc{display:flex; flex-direction:column; align-items:center; gap:8px; color:var(--faint);
  font-size:12px; font-family:'JetBrains Mono'; text-align:center; padding:0 16px;}

@keyframes fade{from{opacity:0;} to{opacity:1;}}
@keyframes slidein{from{transform:translateX(40px); opacity:.4;} to{transform:none; opacity:1;}}

/* generic */
.ct-eyebrow{font-family:'JetBrains Mono'; font-size:11px; letter-spacing:.22em; text-transform:uppercase; color:var(--mint); margin-bottom:14px;}
h1.ct-h{font-family:'Bricolage Grotesque'; font-weight:700; letter-spacing:-.03em; line-height:1.02; margin:0;}
.ct-sub{color:var(--muted); font-size:16px; line-height:1.6; max-width:560px;}
.ct-card{background:linear-gradient(180deg,var(--surf),var(--bg2)); border:1px solid var(--line); border-radius:18px; padding:22px;}
.ct-mono{font-family:'JetBrains Mono';}

/* buttons */
.ct-btn{display:inline-flex; align-items:center; gap:9px; cursor:pointer; border:none;
  font-family:'Outfit'; font-weight:600; font-size:15px; padding:13px 22px; border-radius:12px; transition:.2s; }
.ct-btn.pri{background:var(--mint); color:#04140e; box-shadow:0 8px 30px -8px rgba(62,233,180,.6);}
.ct-btn.pri:hover{transform:translateY(-2px); box-shadow:0 14px 38px -8px rgba(62,233,180,.7);}
.ct-btn.ghost{background:transparent; color:var(--muted); border:1px solid var(--line2);}
.ct-btn.ghost:hover{color:var(--txt); border-color:var(--mint); }

/* fields */
.ct-grid2{display:grid; grid-template-columns:1fr 1fr; gap:14px;}
.ct-field label{display:block; font-size:12px; color:var(--muted); margin-bottom:6px; font-family:'JetBrains Mono'; letter-spacing:.04em;}
.ct-field input,.ct-field select{width:100%; background:var(--bg); border:1px solid var(--line2); color:var(--txt);
  border-radius:10px; padding:11px 13px; font-family:'Outfit'; font-size:14px; outline:none; transition:.2s;}
.ct-field input:focus,.ct-field select:focus{border-color:var(--mint);}
.ct-chips{display:flex; flex-wrap:wrap; gap:8px;}
.ct-chip{font-size:13px; padding:7px 13px; border-radius:99px; border:1px solid var(--line2); color:var(--muted); cursor:pointer; transition:.2s; font-family:'Outfit';}
.ct-chip.sel{background:rgba(62,233,180,.12); border-color:var(--mint); color:var(--mint);}

/* path cards */
.ct-paths{display:grid; grid-template-columns:repeat(3,1fr); gap:16px;}
.ct-path{cursor:pointer; position:relative; overflow:hidden; transition:.25s; border:1px solid var(--line);}
.ct-path:hover{transform:translateY(-4px); border-color:var(--line2);}
.ct-path.sel{border-color:var(--mint); box-shadow:0 0 0 1px var(--mint), 0 20px 50px -20px rgba(62,233,180,.5);}
.ct-match{font-family:'Bricolage Grotesque'; font-weight:700; font-size:30px; letter-spacing:-.03em;}

/* timeline */
.ct-tl{display:grid; grid-template-columns:repeat(4,1fr); gap:14px;}
.ct-stage{position:relative;}
.ct-age{font-family:'Bricolage Grotesque'; font-weight:700; font-size:26px; color:var(--mint);}

/* roadmap */
.ct-road{display:flex; flex-direction:column; gap:0;}
.ct-yr{display:flex; gap:18px; padding:16px 0; border-bottom:1px solid var(--line);}
.ct-yrn{font-family:'Bricolage Grotesque'; font-weight:700; font-size:15px; color:var(--amber); flex:none; width:64px;}

/* coach */
.ct-chat{display:flex; flex-direction:column; gap:12px; max-height:340px; overflow-y:auto; padding-right:6px;}
.ct-msg{max-width:78%; padding:12px 15px; border-radius:14px; font-size:14.5px; line-height:1.5; animation:pop .35s ease;}
.ct-msg.bot{background:var(--surf2); border:1px solid var(--line); border-bottom-left-radius:4px; align-self:flex-start;}
.ct-msg.me{background:var(--mint); color:#04140e; border-bottom-right-radius:4px; align-self:flex-end; font-weight:500;}
.ct-avatar{width:46px; height:46px; border-radius:50%; flex:none; display:grid; place-items:center;
  background:radial-gradient(circle at 35% 30%, var(--mint), var(--mint-dim)); color:#04140e;
  box-shadow:0 0 24px -4px var(--mint); animation:breathe 3s ease-in-out infinite;}

/* score ring */
.ct-ring-wrap{display:flex; align-items:center; gap:28px; flex-wrap:wrap;}
.ct-comp{display:flex; align-items:center; gap:12px; margin-bottom:11px;}
.ct-bar{height:7px; border-radius:9px; background:var(--line); flex:1; overflow:hidden;}
.ct-bar i{display:block; height:100%; border-radius:9px; background:linear-gradient(90deg,var(--mint-dim),var(--mint));}

/* alerts */
.ct-alert{display:flex; gap:13px; padding:15px; border-radius:13px; border:1px solid var(--line); background:var(--surf);}
.ct-alert.warn{border-color:rgba(255,107,107,.4); background:rgba(255,107,107,.06);}

/* analyzing */
.ct-scan{font-family:'JetBrains Mono'; font-size:13px; color:var(--muted); display:flex; align-items:center; gap:10px; padding:7px 0;}

/* animations */
@keyframes pop{from{opacity:0; transform:translateY(8px) scale(.98);} to{opacity:1; transform:none;}}
@keyframes breathe{0%,100%{transform:scale(1);} 50%{transform:scale(1.06);}}
@keyframes rise{from{opacity:0; transform:translateY(18px);} to{opacity:1; transform:none;}}
@keyframes spin{to{transform:rotate(360deg);}}
.reveal{animation:rise .6s cubic-bezier(.2,.7,.2,1) both;}
.ct-screen{animation:rise .5s ease both;}
.spin{animation:spin 1s linear infinite;}

@media(max-width:760px){
  .ct-grid2{grid-template-columns:1fr;}
  .ct-paths{grid-template-columns:1fr;}
  .ct-tl{grid-template-columns:1fr 1fr;}
  .ct-tag,.ct-steps{display:none;}
  h1.ct-h{font-size:34px!important;}
}
`;

/* ============================ MOCK DATA ============================ */
const DNA = [
  { trait: "Technical", v: 92 }, { trait: "Analytical", v: 86 },
  { trait: "Creativity", v: 78 }, { trait: "Risk", v: 84 },
  { trait: "Leadership", v: 61 }, { trait: "Comms", v: 70 },
];

const PATHS = [
  {
    id: "ai", title: "AI Engineer", icon: Brain, match: 94, accent: "var(--mint)",
    blurb: "High-growth path leveraging your strong technical + analytical DNA.",
    salary: "RM 18k → 45k /mo",
    line: [{ age: 25, s: 8 }, { age: 30, s: 18 }, { age: 40, s: 34 }, { age: 50, s: 45 }],
    timeline: [
      { age: 25, role: "Junior ML Engineer", sal: "RM 8k", skill: "Python, ML basics", risk: "Low" },
      { age: 30, role: "AI Engineer", sal: "RM 18k", skill: "Deep Learning, MLOps", risk: "Low" },
      { age: 40, role: "Lead AI Architect", sal: "RM 34k", skill: "LLMs, System design", risk: "Medium" },
      { age: 50, role: "Head of AI", sal: "RM 45k", skill: "Strategy, R&D", risk: "Low" },
    ],
    roadmap: [
      { y: "Year 1", f: "Foundations", d: "Python, SQL, Statistics, Git" },
      { y: "Year 2", f: "Machine Learning", d: "Scikit-learn, model evaluation, first portfolio project" },
      { y: "Year 3", f: "Deep Learning", d: "PyTorch, neural nets, computer vision / NLP" },
      { y: "Year 4", f: "Cloud & MLOps", d: "AWS/GCP AI, deployment, pipelines, certification" },
      { y: "Year 5", f: "AI Engineer", d: "LLMs, system design, lead a production AI feature" },
    ],
    health: 82, percentile: 18, healthLabel: "Healthy Career",
    risk: {
      automation: "Low",
      warn: "Part of your current skill set may lose ~35% market demand within 5 years.",
      recommend: ["Cloud Computing", "LLMs"], cert: "one cloud certification",
    },
  },
  {
    id: "sec", title: "Cybersecurity Engineer", icon: Shield, match: 81, accent: "var(--sky)",
    blurb: "Stable demand, strong defensive-tech alignment with your profile.",
    salary: "RM 14k → 38k /mo",
    line: [{ age: 25, s: 7 }, { age: 30, s: 14 }, { age: 40, s: 28 }, { age: 50, s: 38 }],
    timeline: [
      { age: 25, role: "Security Analyst", sal: "RM 7k", skill: "Networks, SIEM", risk: "Low" },
      { age: 30, role: "Security Engineer", sal: "RM 14k", skill: "Pentesting, Cloud sec", risk: "Low" },
      { age: 40, role: "Security Architect", sal: "RM 28k", skill: "Zero-trust, Governance", risk: "Low" },
      { age: 50, role: "CISO", sal: "RM 38k", skill: "Risk strategy, Compliance", risk: "Low" },
    ],
    roadmap: [
      { y: "Year 1", f: "Foundations", d: "Networking, Linux, Python scripting" },
      { y: "Year 2", f: "Defensive Security", d: "SIEM, threat detection, incident response" },
      { y: "Year 3", f: "Offensive Security", d: "Pentesting, ethical hacking, OSCP prep" },
      { y: "Year 4", f: "Cloud Security", d: "Zero-trust, AWS/Azure security, certifications" },
      { y: "Year 5", f: "Security Engineer", d: "Architecture, governance, lead a security program" },
    ],
    health: 79, percentile: 24, healthLabel: "Healthy Career",
    risk: {
      automation: "Low",
      warn: "Threat tooling shifts fast — legacy detection skills lose ~20% relevance in 5 years.",
      recommend: ["Cloud Security", "Zero-trust"], cert: "an OSCP or CISSP certification",
    },
  },
  {
    id: "ent", title: "Tech Entrepreneur", icon: Rocket, match: 76, accent: "var(--amber)",
    blurb: "Highest ceiling, highest variance — fits your high risk tolerance.",
    salary: "Variable → uncapped",
    line: [{ age: 25, s: 4 }, { age: 30, s: 12 }, { age: 40, s: 60 }, { age: 50, s: 90 }],
    timeline: [
      { age: 25, role: "Founder (pre-seed)", sal: "RM 3k", skill: "Building, Sales", risk: "High" },
      { age: 30, role: "Startup CEO", sal: "RM 12k", skill: "Fundraising, Team", risk: "High" },
      { age: 40, role: "Scale-up CEO", sal: "RM 60k+", skill: "Scaling, M&A", risk: "Medium" },
      { age: 50, role: "Serial Founder / Investor", sal: "Uncapped", skill: "Capital, Vision", risk: "Medium" },
    ],
    roadmap: [
      { y: "Year 1", f: "Build an MVP", d: "Customer interviews, no-code/code, ship v1" },
      { y: "Year 2", f: "Validation", d: "First paying users, sales motion, unit economics" },
      { y: "Year 3", f: "Fundraising", d: "Pitch deck, pre-seed/seed, first key hires" },
      { y: "Year 4", f: "Product-Market Fit", d: "Retention, scaling ops, repeatable growth" },
      { y: "Year 5", f: "Scale-up", d: "Series A, leadership team, market expansion" },
    ],
    health: 68, percentile: 35, healthLabel: "High Variance",
    risk: {
      automation: "Medium",
      warn: "Founder risk is execution, not automation — your edge erodes without continuous GTM learning.",
      recommend: ["Sales & GTM", "Fundraising"], cert: "a solid financial model",
    },
  },
];

const SCORE_PARTS = [
  { n: "Skills relevance", w: 25, v: 88 }, { n: "Learning activity", w: 20, v: 80 },
  { n: "Industry demand", w: 20, v: 91 }, { n: "Salary growth", w: 15, v: 74 },
  { n: "Networking", w: 10, v: 62 }, { n: "Certifications", w: 10, v: 70 },
];

const COACH_QS = [
  "Should I switch from Accounting to Data Analytics?",
  "What skill should I learn first?",
  "Is my career safe from AI automation?",
];
const COACH_A = {
  "Should I switch from Accounting to Data Analytics?":
    "Strong move. Data Analytics demand in Malaysia is up ~38% YoY and your analytical DNA scores 86/100. Your accounting background is actually an edge — domain + data is rare. Start with SQL + Power BI, target a 12-month transition.",
  "What skill should I learn first?":
    "Python. It's the highest-leverage skill on your AI Engineer path and unlocks Years 1–3 of your roadmap. 8 weeks of consistent practice puts you ahead of 70% of entry-level candidates.",
  "Is my career safe from AI automation?":
    "Your current trajectory has Low automation risk — AI Engineering builds the tools rather than being replaced by them. Keep your Career Health Score above 75 and you stay in the safe zone.",
};

/* ============================ HELPERS ============================ */
const Logo = () => (
  <svg className="ct-logo" viewBox="0 0 34 34" fill="none">
    <circle cx="13" cy="17" r="9" stroke="var(--mint)" strokeWidth="2" />
    <circle cx="21" cy="17" r="9" stroke="var(--sky)" strokeWidth="2" opacity=".8" />
    <circle cx="17" cy="17" r="2.4" fill="var(--mint)" />
  </svg>
);

const STEPS = ["Profile", "Simulate", "Roadmap", "Coach", "Dashboard"];
const SCREEN_STEP = { profile: 0, analyzing: 1, twin: 1, timeline: 1, roadmap: 2, coach: 3, dashboard: 4 };
const STEP_SCREEN = ["profile", "twin", "roadmap", "coach", "dashboard"];

const SAVE_KEY = "careertwin.v1";
const DEFAULT_PROFILE = {
  name: "Haikal", age: "20", field: "Computer Science",
  cgpa: "3.6", country: "Malaysia", workStyle: "Remote-first", mbti: "INTJ",
};
const loadSaved = () => {
  try { return JSON.parse(localStorage.getItem(SAVE_KEY)) || {}; }
  catch { return {}; }
};

function ScoreRing({ value }) {
  const r = 78, c = 2 * Math.PI * r;
  const [draw, setDraw] = useState(0);
  useEffect(() => { const t = setTimeout(() => setDraw(value), 200); return () => clearTimeout(t); }, [value]);
  return (
    <svg width="184" height="184" viewBox="0 0 184 184">
      <circle cx="92" cy="92" r={r} stroke="var(--line)" strokeWidth="12" fill="none" />
      <circle cx="92" cy="92" r={r} stroke="var(--mint)" strokeWidth="12" fill="none"
        strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c - (c * draw) / 100}
        transform="rotate(-90 92 92)" style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(.2,.7,.2,1)", filter: "drop-shadow(0 0 8px var(--mint))" }} />
      <text x="92" y="86" textAnchor="middle" fontFamily="Bricolage Grotesque" fontWeight="700" fontSize="48" fill="var(--txt)">{value}</text>
      <text x="92" y="112" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill="var(--faint)" letterSpacing="2">/ 100</text>
    </svg>
  );
}

/* ============================ APP ============================ */
export default function App() {
  const [screen, setScreen] = useState("landing");
  const [picked, setPicked] = useState(() => {
    const id = loadSaved().pickedId;
    return PATHS.find((p) => p.id === id) || PATHS[0];
  });
  const [interests, setInterests] = useState(() => loadSaved().interests || ["AI", "Building"]);
  const [profile, setProfile] = useState(() => ({ ...DEFAULT_PROFILE, ...loadSaved().profile }));
  const [resume, setResume] = useState(() => loadSaved().resume || null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [chat, setChat] = useState([
    { from: "bot", t: "Hi Haikal 👋 I'm Twin, your AI career coach. I've analyzed your simulation — ask me anything about your path." },
  ]);
  const chatRef = useRef(null);

  const go = (s) => { window.scrollTo({ top: 0, behavior: "smooth" }); setScreen(s); };

  // analyzing sequence
  useEffect(() => {
    if (screen !== "analyzing") return;
    setScanStep(0);
    const seq = [600, 1300, 2000, 2700];
    const ts = seq.map((d, i) => setTimeout(() => setScanStep(i + 1), d));
    const done = setTimeout(() => go("twin"), 3500);
    return () => { ts.forEach(clearTimeout); clearTimeout(done); };
  }, [screen]);

  useEffect(() => { if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight; }, [chat]);

  // build a short-lived Blob URL for the in-drawer resume thumbnail (data: URLs can't render reliably)
  useEffect(() => {
    if (!resume || !resume.url) { setPreviewUrl(null); return; }
    let active = true;
    let objUrl;
    fetch(resume.url).then((r) => r.blob()).then((b) => {
      if (!active) return;
      objUrl = URL.createObjectURL(b);
      setPreviewUrl(objUrl);
    });
    return () => { active = false; if (objUrl) URL.revokeObjectURL(objUrl); };
  }, [resume]);

  // persist profile, interests, resume & chosen path across reloads
  useEffect(() => {
    const full = { profile, interests, resume, pickedId: picked.id };
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(full));
    } catch (e) {
      // resume data URL likely exceeded the storage quota — save everything except the file blob
      try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(resume ? { ...full, resume: { ...resume, url: null } } : full));
      } catch (e2) { /* give up persisting this round */ }
    }
  }, [profile, interests, resume, picked]);

  const ask = (q) => {
    setChat((c) => [...c, { from: "me", t: q }]);
    setTimeout(() => setChat((c) => [...c, { from: "bot", t: COACH_A[q] }]), 550);
  };

  const toggleInterest = (x) =>
    setInterests((p) => (p.includes(x) ? p.filter((i) => i !== x) : [...p, x]));

  const setField = (k) => (e) => setProfile((p) => ({ ...p, [k]: e.target.value }));
  const onResume = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () =>
      setResume({ name: f.name, size: (f.size / 1024).toFixed(0) + " KB", type: f.type, url: reader.result });
    reader.readAsDataURL(f);
  };
  const viewResume = () => {
    if (!resume || !resume.url) return;
    // data: URLs can't open in a top-level tab on modern browsers — convert to a Blob URL first.
    fetch(resume.url).then((r) => r.blob()).then((b) => {
      const u = URL.createObjectURL(b);
      window.open(u, "_blank");
      setTimeout(() => URL.revokeObjectURL(u), 30000);
    });
  };
  const resetProfile = () => {
    try { localStorage.removeItem(SAVE_KEY); } catch (e) {}
    setProfile({ ...DEFAULT_PROFILE });
    setInterests(["AI", "Building"]);
    setResume(null);
    setPicked(PATHS[0]);
    setShowProfile(false);
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
            <input type="file" accept=".pdf,.doc,.docx" hidden onChange={onResume} />
            Replace
          </label>
        </div>
      </div>
    ) : (
      <label className="ct-upload">
        <input type="file" accept=".pdf,.doc,.docx" hidden onChange={onResume} />
        <Upload size={18} /><span>Attach your resume (PDF, DOC, DOCX)</span>
      </label>
    );

  const step = SCREEN_STEP[screen];

  return (
    <div className="ct-root">
      <style>{STYLES}</style>
      <div className="ct-bg" /><div className="ct-grain" />
      <div className="ct-wrap">

        {/* TOP BAR */}
        <div className="ct-top">
          <div className="ct-brand" onClick={() => go("landing")} style={{ cursor: "pointer" }}>
            <Logo />
            <div>
              <div className="ct-name">CareerTwin<b>OS</b></div>
              <div className="ct-tag">Simulate your future</div>
            </div>
          </div>
          <div className="ct-right">
            {screen !== "landing" && (
              <div className="ct-steps">
                {STEPS.map((s, i) => (
                  <React.Fragment key={s}>
                    <div
                      className={`ct-step ${i === step ? "on" : ""} ${i < step ? "done" : ""}`}
                      onClick={() => go(STEP_SCREEN[i])}
                      title={`Go to ${s}`}
                    >
                      <span className="ct-dot" />{s}
                    </div>
                    {i < STEPS.length - 1 && <span className="ct-sep">›</span>}
                  </React.Fragment>
                ))}
              </div>
            )}
            <button className="ct-pfp" onClick={() => setShowProfile(true)} title="Profile & settings">
              {(profile.name.trim().charAt(0) || "U").toUpperCase()}
            </button>
          </div>
        </div>

        {/* ===== PROFILE DRAWER ===== */}
        {showProfile && (
          <div className="ct-overlay" onClick={() => setShowProfile(false)}>
            <div className="ct-drawer" onClick={(e) => e.stopPropagation()}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                <div className="ct-mono" style={{ fontSize: 11, color: "var(--faint)", letterSpacing: 2 }}>PROFILE & SETTINGS</div>
                <button className="ct-btn ghost" style={{ padding: 9, borderRadius: 10 }} onClick={() => setShowProfile(false)}><X size={16} /></button>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
                <div className="ct-pfp" style={{ width: 54, height: 54, fontSize: 22, cursor: "default" }}>
                  {(profile.name.trim().charAt(0) || "U").toUpperCase()}
                </div>
                <div>
                  <div style={{ fontFamily: "Bricolage Grotesque", fontWeight: 700, fontSize: 20 }}>{profile.name || "Your name"}</div>
                  <div className="ct-mono" style={{ fontSize: 12, color: "var(--mint)" }}>{profile.field} · Age {profile.age}</div>
                </div>
              </div>

              <div className="ct-detail">
                {[
                  ["Field of study", profile.field],
                  ["CGPA", profile.cgpa],
                  ["Country", profile.country],
                  ["Work style", profile.workStyle],
                  ["Personality", profile.mbti],
                ].map(([k, v]) => (
                  <div className="ct-drow" key={k}>
                    <span style={{ color: "var(--muted)" }}>{k}</span>
                    <span style={{ fontWeight: 500 }}>{v || "—"}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 18 }}>
                <div className="ct-mono" style={{ fontSize: 11, color: "var(--faint)", letterSpacing: 2, marginBottom: 8 }}>INTERESTS</div>
                <div className="ct-chips">
                  {interests.length
                    ? interests.map((x) => (<span key={x} className="ct-chip sel" style={{ cursor: "default" }}>{x}</span>))
                    : <span style={{ color: "var(--faint)", fontSize: 13 }}>None selected</span>}
                </div>
              </div>

              <div style={{ marginTop: 18 }}>
                <div className="ct-mono" style={{ fontSize: 11, color: "var(--faint)", letterSpacing: 2, marginBottom: 8 }}>RESUME / CV</div>
                {resume && (
                  <div className="ct-thumb" onClick={viewResume} title="Open full resume">
                    {previewUrl && resume.type && resume.type.startsWith("image/") ? (
                      <img src={previewUrl} alt="resume preview" />
                    ) : previewUrl && resume.type === "application/pdf" ? (
                      <iframe src={previewUrl} title="resume preview" />
                    ) : (
                      <div className="ct-thumb-doc">
                        <FileText size={34} color="var(--mint)" />
                        <span>{resume.url ? "No inline preview — click to open" : "Preview not saved"}</span>
                      </div>
                    )}
                  </div>
                )}
                {resumeField()}
              </div>

              <button className="ct-btn pri" style={{ width: "100%", justifyContent: "center", marginTop: 22 }} onClick={() => { setShowProfile(false); go("profile"); }}>
                <Pencil size={16} /> Edit full profile
              </button>
              <button className="ct-btn ghost" style={{ width: "100%", justifyContent: "center", marginTop: 10, fontSize: 13 }} onClick={resetProfile}>
                Reset profile & clear saved data
              </button>
            </div>
          </div>
        )}

        {/* ===== LANDING ===== */}
        {screen === "landing" && (
          <div className="ct-screen" style={{ paddingTop: 70 }}>
            <div className="ct-eyebrow reveal">Asia's AI Career Operating System</div>
            <h1 className="ct-h reveal" style={{ fontSize: 64, animationDelay: ".05s" }}>
              Simulate your future.<br /><span style={{ color: "var(--mint)" }}>Navigate</span> your career.
            </h1>
            <p className="ct-sub reveal" style={{ marginTop: 22, animationDelay: ".12s" }}>
              CareerTwin OS builds a digital twin of you — then simulates the next 40 years of your career,
              predicts outcomes, and generates an adaptive roadmap with lifelong AI coaching.
            </p>
            <div className="reveal" style={{ marginTop: 34, display: "flex", gap: 12, alignItems: "center", animationDelay: ".2s" }}>
              <button className="ct-btn pri" onClick={() => go("profile")}>
                Build my Career Twin <ArrowRight size={18} />
              </button>
              <span className="ct-mono" style={{ fontSize: 12, color: "var(--faint)" }}>2-min demo</span>
            </div>
            <div className="reveal" style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, animationDelay: ".28s" }}>
              {[
                { i: Brain, t: "Career Twin AI", d: "A simulated future version of you" },
                { i: Target, t: "LifeGPS", d: "Goals turned into year-by-year plans" },
                { i: Activity, t: "Health Score", d: "Career wellness, monitored continuously" },
              ].map((x) => (
                <div className="ct-card" key={x.t}>
                  <x.i size={22} color="var(--mint)" />
                  <div style={{ fontWeight: 600, marginTop: 12, fontSize: 16 }}>{x.t}</div>
                  <div style={{ color: "var(--muted)", fontSize: 13.5, marginTop: 5 }}>{x.d}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== PROFILE ===== */}
        {screen === "profile" && (
          <div className="ct-screen" style={{ paddingTop: 30 }}>
            <div className="ct-eyebrow">Step 1 — Career Profile Engine</div>
            <h1 className="ct-h" style={{ fontSize: 40 }}>Build your Career DNA</h1>
            <p className="ct-sub" style={{ marginTop: 12 }}>Tell us about you. We've pre-filled a demo profile — just hit generate.</p>

            <div className="ct-card" style={{ marginTop: 26 }}>
              <div className="ct-grid2">
                <div className="ct-field"><label>FULL NAME</label><input value={profile.name} onChange={setField("name")} /></div>
                <div className="ct-field"><label>AGE</label><input value={profile.age} onChange={setField("age")} /></div>
                <div className="ct-field"><label>FIELD OF STUDY</label><input value={profile.field} onChange={setField("field")} /></div>
                <div className="ct-field"><label>CGPA</label><input value={profile.cgpa} onChange={setField("cgpa")} /></div>
                <div className="ct-field"><label>COUNTRY</label><input value={profile.country} onChange={setField("country")} /></div>
                <div className="ct-field"><label>WORK STYLE</label>
                  <select value={profile.workStyle} onChange={setField("workStyle")}><option>Remote-first</option><option>Hybrid</option><option>On-site</option></select>
                </div>
              </div>
              <div className="ct-field" style={{ marginTop: 16 }}>
                <label>INTERESTS</label>
                <div className="ct-chips">
                  {["AI", "Building", "Security", "Design", "Leadership", "Research", "Finance"].map((x) => (
                    <span key={x} className={`ct-chip ${interests.includes(x) ? "sel" : ""}`} onClick={() => toggleInterest(x)}>{x}</span>
                  ))}
                </div>
              </div>
              <div className="ct-field" style={{ marginTop: 16 }}>
                <label>PERSONALITY (MBTI)</label>
                <div className="ct-chips">
                  {["INTJ", "ENTP", "INTP", "ENTJ"].map((x) => (
                    <span key={x} className={`ct-chip ${profile.mbti === x ? "sel" : ""}`} onClick={() => setProfile((p) => ({ ...p, mbti: x }))}>{x}</span>
                  ))}
                </div>
              </div>
              <div className="ct-field" style={{ marginTop: 16 }}>
                <label>RESUME / CV</label>
                {resumeField()}
              </div>
            </div>

            <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
              <button className="ct-btn ghost" onClick={() => go("landing")}><ArrowLeft size={17} /> Back</button>
              <button className="ct-btn pri" onClick={() => go("analyzing")}><Sparkles size={17} /> Generate my Twin</button>
            </div>
          </div>
        )}

        {/* ===== ANALYZING ===== */}
        {screen === "analyzing" && (
          <div className="ct-screen" style={{ paddingTop: 90, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ position: "relative", width: 90, height: 90 }}>
              <Cpu size={90} color="var(--mint)" className="spin" style={{ opacity: .9 }} />
            </div>
            <h1 className="ct-h" style={{ fontSize: 30, marginTop: 28 }}>Building your Career Twin…</h1>
            <div className="ct-card" style={{ marginTop: 30, textAlign: "left", width: "100%", maxWidth: 460 }}>
              {["Analyzing Career DNA profile", "Mapping industry demand & salary data", "Simulating 4 future career paths", "Predicting outcomes to age 50"].map((s, i) => (
                <div className="ct-scan" key={s} style={{ opacity: scanStep > i ? 1 : .35 }}>
                  {scanStep > i ? <CheckCircle2 size={16} color="var(--mint)" /> : <Circle size={16} color="var(--faint)" className={scanStep === i ? "spin" : ""} />}
                  {s}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== TWIN + PATHS ===== */}
        {screen === "twin" && (
          <div className="ct-screen" style={{ paddingTop: 30 }}>
            <div className="ct-eyebrow">Step 2 — Career Twin AI</div>
            <h1 className="ct-h" style={{ fontSize: 38 }}>Your twin is ready</h1>

            <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 18, marginTop: 24 }} className="tw-grid">
              {/* DNA */}
              <div className="ct-card">
                <div className="ct-mono" style={{ fontSize: 11, color: "var(--faint)", letterSpacing: 2 }}>CAREER DNA</div>
                <div style={{ height: 220, marginTop: 4 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={DNA} outerRadius="78%">
                      <PolarGrid stroke="rgba(255,255,255,.12)" />
                      <PolarAngleAxis dataKey="trait" tick={{ fill: "#8b98a8", fontSize: 11, fontFamily: "JetBrains Mono" }} />
                      <Radar dataKey="v" stroke="var(--mint)" fill="var(--mint)" fillOpacity={0.28} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 6 }}>
                  {[["Type", "Innovator"], ["Risk", "High"], ["Lead", "Medium"]].map(([k, v]) => (
                    <span key={k} className="ct-chip sel" style={{ cursor: "default" }}>{k}: {v}</span>
                  ))}
                </div>
              </div>

              {/* paths */}
              <div>
                <p className="ct-sub" style={{ marginBottom: 14, fontSize: 15 }}>I simulated 3 paths from your DNA. Pick one to see its 40-year timeline.</p>
                <div className="ct-paths">
                  {PATHS.map((p) => (
                    <div key={p.id} className={`ct-card ct-path ${picked.id === p.id ? "sel" : ""}`} onClick={() => setPicked(p)}>
                      <p.icon size={22} style={{ color: p.accent }} />
                      <div className="ct-match" style={{ marginTop: 12, color: p.accent }}>{p.match}%</div>
                      <div className="ct-mono" style={{ fontSize: 10, color: "var(--faint)", marginTop: -2 }}>MATCH</div>
                      <div style={{ fontWeight: 600, marginTop: 12, fontSize: 16 }}>{p.title}</div>
                      <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 6, lineHeight: 1.5 }}>{p.blurb}</div>
                      <div className="ct-mono" style={{ fontSize: 12, color: p.accent, marginTop: 12 }}>{p.salary}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
              <button className="ct-btn ghost" onClick={() => go("profile")}><ArrowLeft size={17} /> Back</button>
              <button className="ct-btn pri" onClick={() => go("timeline")}>
                Simulate {picked.title} <ArrowRight size={17} />
              </button>
            </div>
          </div>
        )}

        {/* ===== TIMELINE ===== */}
        {screen === "timeline" && (
          <div className="ct-screen" style={{ paddingTop: 30 }}>
            <div className="ct-eyebrow">Career Timeline · {picked.title}</div>
            <h1 className="ct-h" style={{ fontSize: 36 }}>Your next 40 years</h1>

            <div className="ct-card" style={{ marginTop: 22 }}>
              <div className="ct-mono" style={{ fontSize: 11, color: "var(--faint)", letterSpacing: 2, marginBottom: 8 }}>
                PROJECTED INCOME (RM '000 / MONTH)
              </div>
              <div style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={picked.line} margin={{ left: -18, right: 8, top: 8 }}>
                    <defs>
                      <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--mint)" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="var(--mint)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(255,255,255,.07)" vertical={false} />
                    <XAxis dataKey="age" tick={{ fill: "#8b98a8", fontSize: 12, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} tickFormatter={(a) => "age " + a} />
                    <YAxis tick={{ fill: "#8b98a8", fontSize: 12, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: "#0d121b", border: "1px solid rgba(255,255,255,.14)", borderRadius: 10, fontFamily: "JetBrains Mono", fontSize: 12 }} />
                    <Area type="monotone" dataKey="s" stroke="var(--mint)" strokeWidth={2.5} fill="url(#g)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="ct-tl" style={{ marginTop: 18 }}>
              {picked.timeline.map((t) => (
                <div className="ct-card ct-stage" key={t.age}>
                  <div className="ct-age">{t.age}</div>
                  <div style={{ fontWeight: 600, fontSize: 14.5, marginTop: 6 }}>{t.role}</div>
                  <div className="ct-mono" style={{ color: "var(--mint)", fontSize: 13, margintop: 4 }}>{t.sal}/mo</div>
                  <div style={{ color: "var(--muted)", fontSize: 12.5, marginTop: 8 }}>{t.skill}</div>
                  <div style={{ marginTop: 8, fontSize: 11.5, color: t.risk === "High" ? "var(--coral)" : t.risk === "Medium" ? "var(--amber)" : "var(--mint)" }}>
                    Risk: {t.risk}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
              <button className="ct-btn ghost" onClick={() => go("twin")}><ArrowLeft size={17} /> Paths</button>
              <button className="ct-btn pri" onClick={() => go("roadmap")}><Target size={17} /> Generate roadmap</button>
            </div>
          </div>
        )}

        {/* ===== ROADMAP ===== */}
        {screen === "roadmap" && (
          <div className="ct-screen" style={{ paddingTop: 30 }}>
            <div className="ct-eyebrow">Step 3 — LifeGPS</div>
            <h1 className="ct-h" style={{ fontSize: 36 }}>Become {picked.title} by 2035</h1>
            <p className="ct-sub" style={{ marginTop: 12 }}>Your goal, broken into an actionable 5-year plan. Change your target and this recalculates automatically.</p>

            <div className="ct-card" style={{ marginTop: 22 }}>
              <div className="ct-road">
                {picked.roadmap.map((r) => (
                  <div className="ct-yr" key={r.y}>
                    <div className="ct-yrn">{r.y}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 15 }}>{r.f}</div>
                      <div style={{ color: "var(--muted)", fontSize: 13.5, marginTop: 3 }}>{r.d}</div>
                    </div>
                    <ChevronRight size={18} color="var(--faint)" style={{ alignSelf: "center" }} />
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
              <button className="ct-btn ghost" onClick={() => go("timeline")}><ArrowLeft size={17} /> Timeline</button>
              <button className="ct-btn pri" onClick={() => go("coach")}><Sparkles size={17} /> Ask your AI coach</button>
            </div>
          </div>
        )}

        {/* ===== COACH ===== */}
        {screen === "coach" && (
          <div className="ct-screen" style={{ paddingTop: 30 }}>
            <div className="ct-eyebrow">Step 4 — AI Avatar Coach</div>
            <h1 className="ct-h" style={{ fontSize: 36 }}>Meet Twin</h1>

            <div className="ct-card" style={{ marginTop: 22 }}>
              <div style={{ display: "flex", gap: 14, alignItems: "center", paddingBottom: 16, borderBottom: "1px solid var(--line)", marginBottom: 16 }}>
                <div className="ct-avatar"><Sparkles size={22} /></div>
                <div>
                  <div style={{ fontWeight: 600 }}>Twin · AI Career Coach</div>
                  <div className="ct-mono" style={{ fontSize: 11, color: "var(--mint)" }}>● online · voice ready</div>
                </div>
              </div>

              <div className="ct-chat" ref={chatRef}>
                {chat.map((m, i) => (<div key={i} className={`ct-msg ${m.from}`}>{m.t}</div>))}
              </div>

              <div className="ct-chips" style={{ marginTop: 16 }}>
                {COACH_QS.map((q) => (
                  <span key={q} className="ct-chip" onClick={() => ask(q)} style={{ borderColor: "var(--mint-dim)" }}>
                    <Send size={12} style={{ marginRight: 5, display: "inline" }} />{q}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
              <button className="ct-btn ghost" onClick={() => go("roadmap")}><ArrowLeft size={17} /> Roadmap</button>
              <button className="ct-btn pri" onClick={() => go("dashboard")}><Activity size={17} /> View dashboard</button>
            </div>
          </div>
        )}

        {/* ===== DASHBOARD ===== */}
        {screen === "dashboard" && (
          <div className="ct-screen" style={{ paddingTop: 30 }}>
            <div className="ct-eyebrow">Step 5 — Career Health Score</div>
            <h1 className="ct-h" style={{ fontSize: 36 }}>Your career dashboard</h1>

            <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 18, marginTop: 24 }} className="tw-grid">
              <div className="ct-card" style={{ textAlign: "center" }}>
                <ScoreRing value={picked.health} />
                <div style={{ display: "inline-flex", gap: 7, alignItems: "center", marginTop: 6, color: "var(--mint)", fontWeight: 600 }}>
                  <Heart size={16} /> {picked.healthLabel}
                </div>
                <div style={{ color: "var(--muted)", fontSize: 12.5, marginTop: 4 }}>Top {picked.percentile}% for your age &amp; field</div>
              </div>

              <div className="ct-card">
                <div className="ct-mono" style={{ fontSize: 11, color: "var(--faint)", letterSpacing: 2, marginBottom: 14 }}>SCORE BREAKDOWN</div>
                {SCORE_PARTS.map((p) => (
                  <div className="ct-comp" key={p.n}>
                    <div style={{ width: 130, fontSize: 13, color: "var(--muted)" }}>{p.n}</div>
                    <div className="ct-bar"><i style={{ width: p.v + "%" }} /></div>
                    <div className="ct-mono" style={{ fontSize: 12, width: 58, textAlign: "right", color: "var(--faint)" }}>{p.v} · {p.w}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* risk */}
            <div style={{ marginTop: 18 }}>
              <div className="ct-mono" style={{ fontSize: 11, color: "var(--faint)", letterSpacing: 2, marginBottom: 12 }}>FUTURE RISK DETECTION</div>
              <div className="ct-alert warn">
                <AlertTriangle size={20} color="var(--coral)" style={{ flex: "none", marginTop: 2 }} />
                <div>
                  <div style={{ fontWeight: 600 }}>Skill demand alert</div>
                  <div style={{ color: "var(--muted)", fontSize: 13.5, marginTop: 3 }}>
                    {picked.risk.warn}{" "}
                    Recommended: {picked.risk.recommend.map((s, i) => (
                      <React.Fragment key={s}>
                        <b style={{ color: "var(--mint)" }}>{s}</b>{i < picked.risk.recommend.length - 1 ? ", " : ", and "}
                      </React.Fragment>
                    ))}{picked.risk.cert}.
                  </div>
                </div>
              </div>
              <div className="ct-alert" style={{ marginTop: 12 }}>
                <Zap size={20} color="var(--mint)" style={{ flex: "none", marginTop: 2 }} />
                <div>
                  <div style={{ fontWeight: 600 }}>On track</div>
                  <div style={{ color: "var(--muted)", fontSize: 13.5, marginTop: 3 }}>
                    You're aligned with your {picked.title} goal. Automation risk: <b style={{ color: "var(--mint)" }}>{picked.risk.automation}</b>.
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 26, display: "flex", gap: 12 }}>
              <button className="ct-btn ghost" onClick={() => go("coach")}><ArrowLeft size={17} /> Coach</button>
              <button className="ct-btn pri" onClick={() => go("landing")}><Sparkles size={17} /> Restart demo</button>
            </div>

            <div className="ct-card" style={{ marginTop: 30, textAlign: "center", borderColor: "var(--mint-dim)" }}>
              <div style={{ fontFamily: "Bricolage Grotesque", fontWeight: 700, fontSize: 20 }}>
                "We don't help you find your next job — we help you navigate the next 40 years."
              </div>
              <div className="ct-mono" style={{ fontSize: 11, color: "var(--faint)", marginTop: 8, letterSpacing: 2 }}>CAREERTWIN OS · TALENTBANK TECH HACKATHON</div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
