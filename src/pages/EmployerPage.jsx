import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, BadgeCheck, Briefcase, Eye, EyeOff, Filter, Plus, Send, Sparkles, Users, Zap } from "lucide-react";
import { COMPANIES } from "../data/careerData";
import Logo from "../components/Logo";
import ScoreRing from "../components/ScoreRing";
import EmployerKanban from "../components/employer/EmployerKanban";
import CandidateMatchRadar from "../components/employer/CandidateMatchRadar";
import CandidateDetailPanel from "../components/employer/CandidateDetailPanel";
import SearchFilterBar from "../components/employer/SearchFilterBar";
import AnalyticsDashboard from "../components/employer/AnalyticsDashboard";
import RoleManager from "../components/employer/RoleManager";
import BulkActions from "../components/employer/BulkActions";

const STORAGE_KEY = "careertwin.employer.v1";
const PIPELINE_COLUMNS = ["Sourced", "Shortlisted", "Interview", "Offer", "Hired"];

const ROLE_PRESETS = {
  ai: ["Python", "Machine Learning", "SQL"],
  data: ["SQL", "Python", "Power BI"],
  web: ["React", "JavaScript", "API Integration"],
  security: ["Networking", "Linux", "Security Basics"],
  software: ["Java", "SQL", "Problem Solving"],
  product: ["Communication", "Figma", "Data Analysis"],
  cloud: ["AWS", "Docker", "Linux"],
};

const DEFAULT_POST = { title: "Data Analyst Intern", type: "Internship", locn: "Kuala Lumpur" };

const INITIAL_CANDIDATES = [
  {
    id: "cand-1",
    name: "Aisyah R.",
    meta: "Computer Science · Universiti Malaya",
    location: "Kuala Lumpur",
    seeking: "AI internship",
    experience: "Hackathons, ML projects, student research",
    skills: ["Python", "Machine Learning", "SQL"],
    strengths: ["Fast learner", "Portfolio-driven", "Strong fundamentals"],
    stage: "Shortlisted",
    note: "Built an image classifier and a dashboard to explain model outputs.",
    rehearsalScore: { overall: 82, clarity: 85, technicalDepth: 79 },
    pivotSkillOverlap: ["Data Science", "Cloud", "Python"],
  },
  {
    id: "cand-2",
    name: "Daniel T.",
    meta: "Software Engineering · USM",
    location: "Selangor",
    seeking: "Frontend internship",
    experience: "Internship project, campus hackathon finalist",
    skills: ["React", "Node.js", "APIs"],
    strengths: ["UI polish", "Team projects", "Debugging"],
    stage: "Interview",
    note: "Comfortable shipping responsive interfaces and integrating APIs.",
    rehearsalScore: { overall: 78, clarity: 81, technicalDepth: 74 },
    pivotSkillOverlap: ["Backend", "Full-stack", "APIs"],
  },
  {
    id: "cand-3",
    name: "Mei Lin C.",
    meta: "Data Science · UKM",
    location: "Remote",
    seeking: "Data analyst role",
    experience: "Analytics coursework, volunteering data reports",
    skills: ["SQL", "Power BI", "Python"],
    strengths: ["Storytelling", "Dashboards", "Business sense"],
    stage: "Offer",
    note: "Can turn messy data into decision-ready dashboards quickly.",
    rehearsalScore: { overall: 88, clarity: 90, technicalDepth: 85 },
    pivotSkillOverlap: ["AI", "SQL", "Python"],
  },
  {
    id: "cand-4",
    name: "Harith A.",
    meta: "Cybersecurity · UTM",
    location: "Cyberjaya",
    seeking: "SOC internship",
    experience: "Capture-the-flag competitions, Linux labs",
    skills: ["Networking", "Linux", "SIEM"],
    strengths: ["Risk awareness", "Analytical", "Calm under pressure"],
    stage: "Sourced",
    note: "Shows strong lab practice and good security instincts.",
    rehearsalScore: { overall: 75, clarity: 77, technicalDepth: 88 },
    pivotSkillOverlap: ["Cloud", "Linux", "Networking"],
  },
  {
    id: "cand-5",
    name: "Priya N.",
    meta: "Information Systems · MMU",
    location: "Kuala Lumpur",
    seeking: "Graduate programme",
    experience: "Student leadership, app prototype work",
    skills: ["Java", "SQL", "Figma"],
    strengths: ["Communication", "Ownership", "Cross-functional thinking"],
    stage: "Shortlisted",
    note: "Moves comfortably between product, design, and technical tasks.",
    rehearsalScore: { overall: 80, clarity: 86, technicalDepth: 72 },
    pivotSkillOverlap: ["Product", "Data", "SQL"],
  },
  {
    id: "cand-6",
    name: "Wei Jun L.",
    meta: "Computer Engineering · UTP",
    location: "Penang",
    seeking: "Engineering internship",
    experience: "Embedded systems club, IoT prototypes",
    skills: ["C++", "IoT", "Python"],
    strengths: ["Systems thinking", "Persistence", "Hands-on builder"],
    stage: "Sourced",
    note: "Good fit for product teams that need strong generalists.",
    rehearsalScore: { overall: 79, clarity: 76, technicalDepth: 91 },
    pivotSkillOverlap: ["Cloud", "Python", "Backend"],
  },
];

const STRIP_EXTRA = [
  "Intel Malaysia", "Dell Technologies", "Samsung", "Siemens Malaysia", "HSBC", "Standard Chartered",
  "PwC Malaysia", "BMW Group", "DHL Express", "Unilever", "Sunway Group", "Touch 'n Go",
];

const STATS = [
  ["2,400+", "Candidates reached"],
  ["6", "Sectors covered"],
  ["9 days", "Avg time-to-hire"],
];

const HOW_IT_WORKS = [
  { n: "1", t: "Post a role in minutes", d: "Title, skills, and location are enough to start ranking talent." },
  { n: "2", t: "Review explainable matches", d: "Each candidate comes with a score, radar chart, and clear reasons." },
  { n: "3", t: "Move them through pipeline", d: "Drag candidates across stages and keep your shortlist organized." },
];

const STORIES = [
  { name: "Farah M.", role: "Head of Talent", company: "TechNova AI", quote: "The fit ranking did our first screening round for us. We interviewed four, hired two." },
  { name: "Kevin L.", role: "HR Business Partner", company: "Grab Malaysia", quote: "Candidates arrive already knowing their gaps and strengths — the interviews are twice as productive." },
  { name: "Suraya K.", role: "Early Careers Lead", company: "Maybank", quote: "We filled a data internship in nine days. Our usual cycle is six weeks." },
];

const SectionLabel = ({ children }) => (
  <div className="ct-small-title" style={{ color: "var(--amber)", marginBottom: 10 }}>{children}</div>
);

const loadEmployerState = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
};

const normalizeStage = (stage) => (PIPELINE_COLUMNS.includes(stage) ? stage : "Sourced");

const getRoleSkills = (title) => {
  const text = String(title || "").toLowerCase();
  if (text.includes("ai") || text.includes("machine learning")) return ROLE_PRESETS.ai;
  if (text.includes("data") || text.includes("analyst")) return ROLE_PRESETS.data;
  if (text.includes("web") || text.includes("frontend") || text.includes("ui")) return ROLE_PRESETS.web;
  if (text.includes("security") || text.includes("cyber")) return ROLE_PRESETS.security;
  if (text.includes("cloud")) return ROLE_PRESETS.cloud;
  if (text.includes("product") || text.includes("business")) return ROLE_PRESETS.product;
  if (text.includes("software") || text.includes("engineer") || text.includes("developer")) return ROLE_PRESETS.software;
  return ["Problem Solving", "Communication", "SQL"];
};

const scoreCandidate = (candidate, role) => {
  const requirements = getRoleSkills(role?.title);
  const owned = candidate.skills.map((s) => s.toLowerCase());
  const hits = requirements.filter((req) => owned.some((skill) => skill.includes(req.toLowerCase()) || req.toLowerCase().includes(skill))).length;
  const skillScore = requirements.length ? (hits / requirements.length) * 100 : 65;
  const studyBoost = /computer|engineering|science|systems/i.test(candidate.meta) ? 8 : 0;
  const locationBoost = role?.locn && String(candidate.location).toLowerCase().includes(String(role.locn).toLowerCase()) ? 6 : 0;
  const typeBoost = role?.type === "Internship" && /intern/i.test(candidate.seeking) ? 8 : 0;
  const stageBoost = candidate.stage === "Interview" ? 8 : candidate.stage === "Offer" ? 10 : candidate.stage === "Shortlisted" ? 6 : 0;
  const score = Math.max(48, Math.min(98, Math.round(skillScore * 0.58 + 22 + studyBoost + locationBoost + typeBoost + stageBoost)));

  const reasons = [
    hits ? `${hits}/${requirements.length} role skills matched` : "Strong generalist profile",
    locationBoost ? `Location aligns with ${role.locn}` : `${candidate.location} keeps the process flexible`,
    typeBoost ? `Clear interest in ${role.type.toLowerCase()} work` : `Open to ${candidate.seeking.toLowerCase()}`,
  ].slice(0, 3);

  const radar = [
    { trait: "Skills", v: Math.min(98, Math.round(skillScore)) },
    { trait: "Experience", v: Math.min(98, 58 + candidate.strengths.length * 8 + (candidate.stage === "Interview" ? 10 : 0)) },
    { trait: "Communication", v: Math.min(98, 62 + (candidate.skills.includes("Figma") || candidate.skills.includes("Power BI") ? 8 : 0)) },
    { trait: "Culture", v: Math.min(98, 60 + (candidate.location === role?.locn ? 10 : 0) + candidate.strengths.length * 3) },
    { trait: "Potential", v: Math.min(98, 66 + stageBoost + (candidate.note ? 4 : 0)) },
    { trait: "Readiness", v: score },
  ];

  return { score, reasons, radar };
};

export default function EmployerPage({ go }) {
  const saved = loadEmployerState();
  const [q, setQ] = useState(saved.q || "");
  const [title, setTitle] = useState(saved.title || "");
  const [type, setType] = useState(saved.type || "Internship");
  const [locn, setLocn] = useState(saved.locn || "Kuala Lumpur");
  const [posts, setPosts] = useState(() => (saved.posts || [DEFAULT_POST]));
  const [activeRoleIndex, setActiveRoleIndex] = useState(() => saved.activeRoleIndex || 0);
  const [invited, setInvited] = useState(() => saved.invited || []);
  const [candidates, setCandidates] = useState(() => (saved.candidates || INITIAL_CANDIDATES).map((c) => ({ ...c, stage: normalizeStage(c.stage) })));
  const [selectedId, setSelectedId] = useState(saved.selectedId || INITIAL_CANDIDATES[0].id);
  const [blindMode, setBlindMode] = useState(saved.blindMode || false);
  const [showPivotOnly, setShowPivotOnly] = useState(saved.showPivotOnly || false);
  const [bulkSelectedIds, setBulkSelectedIds] = useState([]);
  const [filterState, setFilterState] = useState({ searchText: "", selectedSkills: [], scoreThreshold: 0, selectedLocation: "all" });

  const currentRole = posts[activeRoleIndex] || posts[0] || DEFAULT_POST;
  const roleSkills = useMemo(() => getRoleSkills(currentRole.title), [currentRole.title]);
  const ql = q.trim().toLowerCase();

  useEffect(() => {
    const payload = { q, title, type, locn, posts, activeRoleIndex, invited, candidates, selectedId, blindMode, showPivotOnly };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // best-effort only
    }
  }, [q, title, type, locn, posts, activeRoleIndex, invited, candidates, selectedId, blindMode, showPivotOnly]);

  useEffect(() => {
    setActiveRoleIndex((i) => Math.min(i, Math.max(posts.length - 1, 0)));
  }, [posts.length]);

  const rankedCandidates = useMemo(() => {
    return candidates
      .map((candidate) => ({ ...candidate, ...scoreCandidate(candidate, currentRole), stage: normalizeStage(candidate.stage) }))
      .sort((a, b) => b.score - a.score);
  }, [candidates, currentRole]);

  const filteredCandidates = useMemo(() => {
    let result = rankedCandidates;

    // Apply search text
    if (filterState.searchText) {
      const search = filterState.searchText.toLowerCase();
      result = result.filter((c) => {
        const searchableText = [c.name, c.id, c.meta, c.seeking, c.location, ...c.skills, ...c.strengths].join(" ").toLowerCase();
        return searchableText.includes(search);
      });
    }

    // Apply skill filter
    if (filterState.selectedSkills.length > 0) {
      result = result.filter((c) => filterState.selectedSkills.some((skill) => c.skills.includes(skill)));
    }

    // Apply score threshold
    if (filterState.scoreThreshold > 0) {
      result = result.filter((c) => c.score >= filterState.scoreThreshold);
    }

    // Apply location filter (if not blind mode)
    if (!blindMode && filterState.selectedLocation !== "all") {
      result = result.filter((c) => c.location === filterState.selectedLocation);
    }

    // Apply pivot potential filter
    if (showPivotOnly) {
      result = result.filter((c) => c.pivotSkillOverlap && c.pivotSkillOverlap.length > 0);
    }

    return result;
  }, [rankedCandidates, filterState, blindMode, showPivotOnly]);

  const selectedCandidate = filteredCandidates.find((candidate) => candidate.id === selectedId) || filteredCandidates[0] || rankedCandidates[0];

  const counts = PIPELINE_COLUMNS.reduce((acc, stage) => {
    acc[stage] = rankedCandidates.filter((candidate) => candidate.stage === stage).length;
    return acc;
  }, {});

  const post = () => {
    const nextTitle = title.trim();
    if (!nextTitle) return;
    setPosts((list) => [{ title: nextTitle, type, locn }, ...list]);
    setTitle("");
    setActiveRoleIndex(0);
  };

  const moveCandidate = (candidateId, nextStage) => {
    setCandidates((list) => list.map((candidate) => (candidate.id === candidateId ? { ...candidate, stage: normalizeStage(nextStage) } : candidate)));
  };

  const inviteCandidate = (candidate) => {
    setInvited((list) => (list.includes(candidate.name) ? list : [...list, candidate.name]));
    moveCandidate(candidate.id, "Interview");
    setSelectedId(candidate.id);
  };

  const sendNudge = (candidate) => {
    try {
      const existingState = JSON.parse(localStorage.getItem("careertwin.v2") || "{}");
      const nudgeMessage = `Company ${COMPANIES[0]?.name || "CareerTwin"} is interested in your profile for ${currentRole.title}!`;
      existingState.nudges = existingState.nudges || [];
      existingState.nudges.push({
        id: `nudge-${Date.now()}`,
        text: nudgeMessage,
        company: COMPANIES[0]?.name || "CareerTwin",
        role: currentRole.title,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem("careertwin.v2", JSON.stringify(existingState));
    } catch {
      // best-effort nudge persistence
    }
  };

  const handleBulkInvite = (selectedCandidates) => {
    selectedCandidates.forEach((id) => {
      const candidate = candidates.find((c) => c.id === id);
      if (candidate) {
        inviteCandidate(candidate);
      }
    });
    setBulkSelectedIds([]);
  };

  const handleBulkMove = (selectedCandidates, stage) => {
    selectedCandidates.forEach((id) => {
      moveCandidate(id, stage);
    });
    setBulkSelectedIds([]);
  };

  const handleBulkDelete = (selectedCandidates) => {
    setCandidates((list) => list.filter((c) => !selectedCandidates.includes(c.id)));
    setBulkSelectedIds([]);
  };

  const handleAddRole = (roleTitle) => {
    const newRole = { title: roleTitle, type: "Internship", locn: "Kuala Lumpur" };
    setPosts((list) => [newRole, ...list]);
    setActiveRoleIndex(0);
  };

  const handleDeleteRole = (idx) => {
    setPosts((list) => list.filter((_, i) => i !== idx));
    setActiveRoleIndex(Math.max(0, activeRoleIndex - 1));
  };

  return (
    <div className="ct-screen" style={{ paddingTop: 56 }}>
      <div className="ct-eyebrow reveal" style={{ color: "var(--amber)" }}>— The Hiring Platform for Leading Employers</div>
      <div className="ct-pills reveal" style={{ animationDelay: ".04s" }}>
        <span className="ct-pill" onClick={() => go("landing")}>I'm looking for a job</span>
        <span className="ct-pill on">I'm hiring</span>
      </div>

      <div className="reveal" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 18, alignItems: "center", marginTop: 18 }}>
        <div className="ct-card" style={{ width: 86, height: 86, display: "grid", placeItems: "center", borderRadius: 18 }}>
          <Logo />
        </div>
        <div>
          <h1 className="ct-h ct-serif" style={{ fontSize: 58, margin: 0 }}>
            Hire from the <span className="ct-accent">strongest talent pool</span><br />in Malaysia.
          </h1>
          <p className="ct-sub" style={{ marginTop: 18 }}>
            Reach top graduates and early-career professionals with explainable candidate ranking, a live kanban, and one-tap invitations.
          </p>
        </div>
      </div>

      <div className="ct-search reveal" style={{ marginTop: 26, animationDelay: ".2s" }}>
        <Sparkles size={17} color="var(--amber)" style={{ flex: "none" }} />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search candidates by skill, course, or location" />
        <button className="ct-btn pri" style={{ padding: "11px 22px", fontSize: 15, flex: "none" }} onClick={() => setSelectedId(selectedCandidate?.id || rankedCandidates[0]?.id)}>
          Find talent
        </button>
      </div>

      <div className="reveal" style={{ marginTop: 22, fontSize: 13.5, color: "var(--faint)", animationDelay: ".24s" }}>Hiring partners across 6 sectors in Malaysia</div>
      <div className="reveal" style={{ marginTop: 14, borderTop: "1px solid var(--line)", paddingTop: 20, display: "flex", gap: 46, flexWrap: "wrap", animationDelay: ".26s" }}>
        {STATS.map(([n, d]) => (
          <div key={d}><div className="ct-serif" style={{ fontWeight: 700, fontSize: 32 }}>{n}</div><div style={{ color: "var(--muted)", fontSize: 13.5 }}>{d}</div></div>
        ))}
      </div>

      <div className="reveal" style={{ marginTop: 54, animationDelay: ".3s" }}>
        <div className="ct-small-title" style={{ textAlign: "center", marginBottom: 14 }}>Join Malaysia's leading employers already hiring here</div>
        <div className="ct-marquee">
          <div className="ct-marquee-track">
            {[0, 1].map((set) => (
              <div className="ct-marquee-set" key={set} aria-hidden={set === 1}>
                {[...COMPANIES.map((c) => c.name), ...STRIP_EXTRA].map((name) => (
                  <span key={name} className="ct-chip ct-serif" style={{ cursor: "default", fontSize: 13.5, fontWeight: 600 }}>{name}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="reveal" style={{ marginTop: 64 }}>
        <SectionLabel>How it works</SectionLabel>
        <div className="ct-serif" style={{ fontSize: 34, fontWeight: 700 }}>From role to shortlist, <span className="ct-accent">in days.</span></div>
        <div className="ct-card" style={{ marginTop: 22, padding: "30px 26px" }}>
          <div className="ct-grid3">
            {HOW_IT_WORKS.map((s) => (
              <div key={s.n} style={{ textAlign: "center", padding: "0 8px" }}>
                <div className="ct-serif" style={{ width: 46, height: 46, borderRadius: "50%", background: "var(--mint)", color: "var(--on-mint)", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 19, margin: "0 auto" }}>{s.n}</div>
                <div className="ct-serif" style={{ fontWeight: 700, fontSize: 18.5, marginTop: 14 }}>{s.t}</div>
                <div style={{ color: "var(--muted)", fontSize: 14.5, marginTop: 8, lineHeight: 1.55 }}>{s.d}</div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid var(--line)", marginTop: 26, paddingTop: 18, textAlign: "center", fontSize: 14.5, color: "var(--mint)", fontWeight: 600 }}>
            <Sparkles size={14} style={{ display: "inline", marginRight: 7 }} />Every candidate arrives with a verified Career Twin — skills, DNA, and interview readiness included.
          </div>
        </div>
      </div>

      <div className="reveal" style={{ marginTop: 64 }}>
        <SectionLabel>Start hiring</SectionLabel>
        <div className="ct-serif" style={{ fontSize: 34, fontWeight: 700 }}>Post a role, <span className="ct-accent">watch it go live.</span></div>
        <div className="ct-card" style={{ marginTop: 22 }}>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <div className="ct-field" style={{ flex: "2 1 240px" }}>
              <label>Job title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={(e) => e.key === "Enter" && post()} placeholder="e.g. Data Analyst Intern" />
            </div>
            <div className="ct-field" style={{ flex: "1 1 160px" }}>
              <label>Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option>Internship</option>
                <option>Full-time</option>
                <option>Graduate Programme</option>
                <option>Contract</option>
              </select>
            </div>
            <div className="ct-field" style={{ flex: "1 1 160px" }}>
              <label>Location</label>
              <select value={locn} onChange={(e) => setLocn(e.target.value)}>
                <option>Kuala Lumpur</option>
                <option>Selangor</option>
                <option>Cyberjaya</option>
                <option>Penang</option>
                <option>Remote</option>
              </select>
            </div>
            <button className="ct-btn pri" style={{ alignSelf: "flex-end" }} disabled={!title.trim()} onClick={post}>
              <Send size={16} /> Post job
            </button>
          </div>

          <div className="ct-chips" style={{ marginTop: 14 }}>
            {posts.length ? posts.map((p, i) => (
              <span key={`${p.title}-${i}`} className={`ct-chip ${activeRoleIndex === i ? "sel" : ""}`} onClick={() => setActiveRoleIndex(i)}>
                {p.title}
              </span>
            )) : (
              <span className="ct-chip sel" style={{ cursor: "default" }}>{DEFAULT_POST.title}</span>
            )}
          </div>

          {posts.map((p, i) => (
            <div className="ct-alert" key={`${p.title}-${i}`} style={{ marginTop: 10, padding: 12, alignItems: "center" }}>
              <Briefcase size={16} color="var(--mint)" style={{ flex: "none" }} />
              <div style={{ fontSize: 14.5, fontWeight: 500 }}>{p.title}<span style={{ color: "var(--muted)", fontWeight: 400 }}> · {p.type} · {p.locn}</span></div>
              <button className="ct-btn ghost" style={{ marginLeft: "auto", padding: "7px 11px", fontSize: 13 }} onClick={() => setActiveRoleIndex(i)}>
                View matches
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="reveal" style={{ marginTop: 64 }}>
        <SectionLabel>Dashboard</SectionLabel>
        <div className="ct-serif" style={{ fontSize: 34, fontWeight: 700 }}>Hiring analytics <span className="ct-accent">at a glance.</span></div>
        <div className="ct-card" style={{ marginTop: 22, padding: 24 }}>
          <AnalyticsDashboard candidates={filteredCandidates} posts={posts} />
        </div>
      </div>

      <div className="reveal" style={{ marginTop: 64 }}>
        <SectionLabel>Role Management</SectionLabel>
        <div className="ct-serif" style={{ fontSize: 34, fontWeight: 700 }}>Manage your <span className="ct-accent">open positions.</span></div>
        <div className="ct-card" style={{ marginTop: 22, padding: 24 }}>
          <RoleManager posts={posts} activeRoleIndex={activeRoleIndex} onSelectRole={setActiveRoleIndex} onAddRole={handleAddRole} onDeleteRole={handleDeleteRole} />
        </div>
      </div>

      <div className="reveal" style={{ marginTop: 64 }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 14, flexWrap: "wrap" }}>
          <div>
            <SectionLabel>Applicant Kanban</SectionLabel>
            <div className="ct-serif" style={{ fontSize: 34, fontWeight: 700 }}>Candidates ranked <span className="ct-accent">by fit.</span></div>
          </div>
          <div className="ct-mono" style={{ fontSize: 12.5, color: "var(--faint)", letterSpacing: 1.5 }}>{filteredCandidates.length} OF {rankedCandidates.length} CANDIDATES</div>
        </div>

        <div className="ct-card" style={{ marginTop: 22, padding: 24 }}>
          {/* Toggles */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
            <Filter size={15} color="var(--mint)" />
            <div className="ct-small-title">Optimized for {currentRole.title}</div>
            <span className="ct-chip sel" style={{ cursor: "default" }}>{currentRole.type}</span>
            <span className="ct-chip" style={{ cursor: "default" }}>{currentRole.locn}</span>
            <span className="ct-chip" style={{ cursor: "default" }}>{roleSkills.join(" · ")}</span>
            <div style={{ marginLeft: "auto", display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
              <button
                className={`ct-btn ${blindMode ? "pri" : "ghost"}`}
                style={{ padding: "8px 12px", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}
                onClick={() => setBlindMode(!blindMode)}
                title="Hide names and photos to reduce bias"
              >
                {blindMode ? <Eye size={14} /> : <EyeOff size={14} />}
                {blindMode ? "Blind" : "Biased"}
              </button>
              <button
                className={`ct-btn ${showPivotOnly ? "pri" : "ghost"}`}
                style={{ padding: "8px 12px", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}
                onClick={() => setShowPivotOnly(!showPivotOnly)}
                title="Show trainable candidates with skill overlap"
              >
                <Zap size={14} />
                {showPivotOnly ? "Pivot On" : "Pivot Off"}
              </button>
            </div>
          </div>

          {/* Search & Filter */}
          <SearchFilterBar allCandidates={rankedCandidates} onFilterChange={setFilterState} blindMode={blindMode} />

          {/* Bulk Actions */}
          {bulkSelectedIds.length > 0 && (
            <BulkActions
              candidates={filteredCandidates}
              selectedCandidates={bulkSelectedIds}
              onBulkInvite={handleBulkInvite}
              onBulkMove={handleBulkMove}
              onBulkDelete={handleBulkDelete}
            />
          )}

          {/* Kanban */}
          <EmployerKanban
            candidates={filteredCandidates}
            columns={PIPELINE_COLUMNS}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onMove={moveCandidate}
            currentRole={currentRole}
            onInvite={inviteCandidate}
            onNudge={sendNudge}
            invited={invited}
            counts={counts}
            blindMode={blindMode}
            selectedIds={bulkSelectedIds}
            onBulkSelect={setBulkSelectedIds}
          />
        </div>
      </div>

      <div className="reveal" style={{ marginTop: 22 }}>
        <div className="ct-grid2" style={{ alignItems: "start" }}>
          {/* Detail Panel */}
          <div className="ct-card">
            <CandidateDetailPanel candidate={selectedCandidate} role={currentRole} onClose={() => setSelectedId(null)} blindMode={blindMode} />
          </div>

          {/* Radar */}
          <div className="ct-card">
            <div className="ct-small-title" style={{ marginBottom: 10 }}>Candidate Insights</div>
            <CandidateMatchRadar candidate={selectedCandidate} role={currentRole} />
          </div>
        </div>
      </div>

      <div className="reveal" style={{ marginTop: 64 }}>
        <SectionLabel>Employer stories</SectionLabel>
        <div className="ct-serif" style={{ fontSize: 34, fontWeight: 700 }}>Hear it from <span className="ct-accent">the hiring teams.</span></div>
        <div className="ct-grid3" style={{ marginTop: 22 }}>
          {STORIES.map((t) => (
            <div className="ct-card" key={t.name} style={{ padding: 22 }}>
              <span className="ct-chip ct-serif" style={{ cursor: "default", fontSize: 13, fontWeight: 600 }}>{t.company}</span>
              <div className="ct-serif" style={{ fontStyle: "italic", fontSize: 16.5, lineHeight: 1.55, marginTop: 14 }}>&quot;{t.quote}&quot;</div>
              <div style={{ marginTop: 14, fontWeight: 600, fontSize: 14.5 }}>{t.name}</div>
              <div style={{ color: "var(--muted)", fontSize: 13.5 }}>{t.role}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="reveal" style={{ marginTop: 64, textAlign: "center", padding: "10px 0 20px" }}>
        <div className="ct-serif" style={{ fontSize: 36, fontWeight: 700 }}>Ready to meet <span className="ct-accent">your next hire?</span></div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 22, flexWrap: "wrap" }}>
          <button className="ct-btn pri" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Post a role <ArrowRight size={17} /></button>
          <button className="ct-btn ghost" onClick={() => go("landing")}><ArrowLeft size={17} /> Back to talent side</button>
        </div>
        <div className="ct-mono" style={{ marginTop: 16, fontSize: 12.5, color: "var(--faint)" }}>free during the pilot · no listing fees</div>
      </div>
    </div>
  );
}
