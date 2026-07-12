/* Pure personalization + planning helpers. No imports; all data arrives as arguments,
   and every output is deterministic so results are explainable in the demo. */

const clamp = (n, lo = 40, hi = 98) => Math.max(lo, Math.min(hi, Math.round(n)));

/* ---- Resume skill extraction (keyword scan over extracted PDF text) ---- */
export const SKILL_KEYWORDS = [
  // Tech
  "Python", "Java", "JavaScript", "TypeScript", "React", "Node.js", "SQL", "HTML", "CSS", "C++", "C#",
  "Golang", "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "Data Analysis", "Power BI",
  "Tableau", "Excel", "Docker", "Kubernetes", "AWS", "Azure", "Git", "Linux", "Networking",
  "Cybersecurity", "Figma", "UI/UX", "API Integration", "REST APIs", "Firebase", "MongoDB", "Flutter",
  "Airflow", "Statistics",
  // Business & marketing
  "Google Analytics", "SEO", "Content", "Social Media", "Digital Marketing", "Marketing", "Copywriting",
  "Sales", "Accounting", "Financial Analysis", "Business Analysis", "Project Management", "Supply Chain",
  // Creative & soft
  "Canva", "Photoshop", "Illustrator", "Video Editing", "Public Speaking", "Communication", "Leadership",
];

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const extractSkills = (text) => {
  const t = String(text || "").toLowerCase();
  if (!t.trim()) return [];
  const found = [];
  for (const name of SKILL_KEYWORDS) {
    const re = new RegExp(`(?<![a-z0-9])${esc(name.toLowerCase())}(?![a-z0-9])`, "g");
    const count = (t.match(re) || []).length;
    if (count) found.push({ name, level: Math.min(95, 55 + Math.min(count, 4) * 10) });
  }
  return found.sort((a, b) => b.level - a.level).slice(0, 10);
};

/* ---- Career DNA (6 radar traits) derived from profile + interests + resume ---- */
const FIELD_BASE = [
  [/computer|software|informat|cyber|\bit\b/i, { Technical: 76, Analytical: 72, Creativity: 56, Risk: 58, Leadership: 52, Comms: 54 }],
  [/data|math|stat|actuar/i, { Technical: 68, Analytical: 82, Creativity: 50, Risk: 54, Leadership: 50, Comms: 55 }],
  [/engineer|mechatronic/i, { Technical: 74, Analytical: 70, Creativity: 54, Risk: 56, Leadership: 54, Comms: 52 }],
  [/business|financ|account|econom|bank|market/i, { Technical: 46, Analytical: 68, Creativity: 56, Risk: 60, Leadership: 68, Comms: 72 }],
  [/design|multimedia|art|media|communica/i, { Technical: 48, Analytical: 52, Creativity: 84, Risk: 56, Leadership: 54, Comms: 70 }],
];
const DEFAULT_BASE = { Technical: 60, Analytical: 60, Creativity: 60, Risk: 58, Leadership: 56, Comms: 58 };

const INTEREST_BOOSTS = {
  Technical: ["AI", "Machine Learning", "Web Development", "Cloud Computing", "DevOps", "Security", "Data Science", "Robotics", "Blockchain", "Networking", "Mobile Apps", "Game Development", "IoT", "Embedded Systems", "Hardware", "Automation", "Data Engineering"],
  Analytical: ["AI", "Data Science", "Finance", "Research", "Investing", "Business Analytics", "Machine Learning", "Economics", "Data Visualisation"],
  Creativity: ["Design", "UI/UX", "Building", "Game Development", "Content Creation", "Animation", "Photography", "Music", "Writing", "Illustration", "Graphic Design", "Film", "Fashion", "Architecture"],
  Risk: ["Startups", "Entrepreneurship", "Investing", "Security", "Blockchain", "Esports"],
  Leadership: ["Leadership", "Startups", "Entrepreneurship", "Event Management", "Project Management", "Volunteering", "Public Speaking"],
  Comms: ["Marketing", "Public Speaking", "Content Creation", "Social Media", "Journalism", "Languages", "Sales", "Digital Marketing", "Education"],
};

const MBTI_ADJ = {
  E: { Comms: 6, Leadership: 4 }, I: { Analytical: 3 },
  N: { Creativity: 5 }, S: { Technical: 3 },
  T: { Analytical: 5 }, F: { Comms: 5 },
  J: { Leadership: 3 }, P: { Creativity: 3 },
};

export const computeDNA = (profile = {}, interests = [], twinData = null) => {
  const base = (FIELD_BASE.find(([re]) => re.test(profile.field || "")) || [null, DEFAULT_BASE])[1];
  const v = { ...base };
  for (const [trait, list] of Object.entries(INTEREST_BOOSTS)) {
    const hits = (interests || []).filter((i) => list.includes(i)).length;
    v[trait] += Math.min(12, hits * 4);
  }
  const cgpa = parseFloat(profile.cgpa);
  if (!Number.isNaN(cgpa)) {
    if (cgpa >= 3.7) { v.Analytical += 6; v.Technical += 3; }
    else if (cgpa >= 3.3) { v.Analytical += 3; v.Technical += 2; }
  }
  for (const ch of String(profile.mbti || "")) {
    const adj = MBTI_ADJ[ch];
    if (adj) for (const [k, d] of Object.entries(adj)) v[k] += d;
  }
  const skills = twinData?.skills || [];
  if (skills.length) {
    const soft = ["Communication", "Leadership", "Excel"];
    const techy = skills.filter((s) => !soft.includes(s.name));
    if (techy.length) v.Technical += Math.min(8, Math.round(techy.reduce((t, s) => t + s.level, 0) / techy.length / 12));
    if (skills.some((s) => ["Machine Learning", "Data Analysis", "Statistics", "Power BI", "Tableau", "SQL", "Google Analytics", "Financial Analysis"].includes(s.name))) v.Analytical += 5;
    if (skills.some((s) => ["Figma", "UI/UX", "CSS", "Canva", "Photoshop", "Illustrator", "Video Editing", "Content"].includes(s.name))) v.Creativity += 5;
    if (skills.some((s) => ["Leadership", "Project Management"].includes(s.name))) v.Leadership += 5;
    if (skills.some((s) => ["Communication", "Public Speaking", "Social Media", "Marketing", "Digital Marketing", "Copywriting", "Sales"].includes(s.name))) v.Comms += 5;
  }
  return ["Technical", "Analytical", "Creativity", "Risk", "Leadership", "Comms"].map((trait) => ({ trait, v: clamp(v[trait]) }));
};

/* ---- Path match % from DNA (weighted per path) ---- */
const PATH_WEIGHTS = {
  ai: { Technical: 0.45, Analytical: 0.4, Risk: 0.15 },
  sec: { Risk: 0.4, Technical: 0.35, Analytical: 0.15, Comms: 0.1 },
  dev: { Technical: 0.45, Creativity: 0.4, Comms: 0.15 },
};

export const computeMatch = (path, dna) => {
  const d = Object.fromEntries(dna.map((x) => [x.trait, x.v]));
  const W = PATH_WEIGHTS[path.id] || { Technical: 0.25, Analytical: 0.25, Creativity: 0.25, Comms: 0.25 };
  const score = Object.entries(W).reduce((t, [k, w]) => t + (d[k] || 60) * w, 0);
  return Math.max(55, Math.min(98, Math.round(score * 1.13)));
};

export const rankPaths = (paths, dna) =>
  paths.map((p) => ({ ...p, match: computeMatch(p, dna) })).sort((a, b) => b.match - a.match);

/* ---- Job & company fit from DNA + resume skills + interests ---- */
const SECTOR_TRAITS = {
  Technology: ["Technical", "Creativity"],
  "Banking & Finance": ["Analytical", "Comms"],
  Energy: ["Technical", "Analytical"],
  Telco: ["Technical", "Comms"],
  FMCG: ["Comms", "Leadership"],
  Consulting: ["Analytical", "Comms"],
};

const fitScore = ({ sector, title = "", wanted = [] }, dna, twinData, interests) => {
  const d = Object.fromEntries(dna.map((x) => [x.trait, x.v]));
  const traits = SECTOR_TRAITS[sector] || ["Technical", "Analytical"];
  const traitScore = traits.reduce((t, k) => t + (d[k] || 60), 0) / traits.length;
  const skills = (twinData?.skills || []).map((s) => s.name.toLowerCase());
  const hits = wanted.filter((r) => skills.some((s) => s.includes(r.toLowerCase()) || r.toLowerCase().includes(s))).length;
  const text = `${title} ${sector} ${wanted.join(" ")}`.toLowerCase();
  const interestHit = (interests || []).some((i) => text.includes(i.toLowerCase())) ? 4 : 0;
  const base = skills.length
    ? 0.55 * (wanted.length ? (hits / wanted.length) * 100 : 60) + 0.45 * traitScore
    : traitScore;
  return Math.max(48, Math.min(98, Math.round(base * 1.06 + interestHit)));
};

export const computeJobMatch = (job, dna, twinData, interests = []) =>
  fitScore({ sector: job.sector, title: job.title, wanted: job.requirements || [] }, dna, twinData, interests);

export const computeCompanyFit = (company, dna, twinData, interests = []) =>
  fitScore({ sector: company.sector, title: `${company.name} ${company.industry}`, wanted: company.skills || [] }, dna, twinData, interests);

/* ---- Skill gaps: overlay resume-extracted levels onto the baseline ---- */
export const computeSkillGaps = (baseGaps, twinData) =>
  (baseGaps || []).map((g) => {
    const hit = twinData?.skills?.find((s) => s.name.toLowerCase() === g.skill.toLowerCase());
    const current = hit ? hit.level : g.current;
    const status = current >= g.required ? "Strong" : current >= g.required - 20 ? "Need improvement" : "Missing";
    return { ...g, current, status };
  });

/* ---- Plan B: pivot path with the highest skill-word overlap ---- */
const skillPhrases = (path) => {
  const out = [];
  (path.timeline || []).forEach((t) => String(t.skill || "").split(",").forEach((s) => { const x = s.trim(); if (x) out.push(x); }));
  return out;
};
const skillWords = (path) => {
  const set = new Set();
  skillPhrases(path).forEach((p) => p.toLowerCase().split(/[\s/+-]+/).forEach((w) => { if (w.length >= 3) set.add(w); }));
  return set;
};
const cap = (w) => w.charAt(0).toUpperCase() + w.slice(1);

export const computePlanB = (picked, allPaths) => {
  const mine = skillWords(picked);
  let best = null;
  for (const p of allPaths) {
    if (p.id === picked.id) continue;
    const overlap = [...skillWords(p)].filter((w) => mine.has(w));
    if (!best || overlap.length > best.overlap.length) best = { path: p, overlap };
  }
  if (!best) return null;
  const transferable = (best.overlap.length ? best.overlap : [...mine]).slice(0, 3).map(cap);
  const toLearn = skillPhrases(best.path)
    .filter((ph) => !best.overlap.some((w) => ph.toLowerCase().includes(w)))
    .slice(0, 3);
  return {
    pivotPath: best.path,
    transferable,
    toLearn,
    months: [
      { m: "Month 1-2", action: `Learn ${toLearn[0] || "the pivot fundamentals"} through one hands-on project.` },
      { m: "Month 3-4", action: `Add ${toLearn[1] || "a second core skill"} and apply ${transferable[0] || "your strongest skill"} in the new context.` },
      { m: "Month 5-6", action: `Build one portfolio piece aimed at ${best.path.title} roles and start applying.` },
    ],
  };
};

/* ---- Portfolio strength (0-100) from everything the app knows ---- */
export const computePortfolioScore = ({ profile, interests, resume, twinData, rehearsalReport, applications } = {}) => {
  let s = 20;
  const filled = ["name", "age", "field", "cgpa", "country"].filter((k) => String(profile?.[k] || "").trim()).length;
  s += filled * 3; // profile completeness, up to +15
  s += Math.min(8, (interests?.length || 0) * 2);
  if (resume) s += 10;
  if (resume?.text) s += 5; // parseable PDF
  s += Math.min(14, (twinData?.skills?.length || 0) * 2);
  if (rehearsalReport) s += Math.round((rehearsalReport.overall || 0) * 0.15); // up to +15
  s += Math.min(8, (applications?.length || 0) * 2);
  return Math.max(5, Math.min(98, Math.round(s)));
};

/* ---- Proactive coach nudge (deterministic, computed from real state) ---- */
export const makeNudge = (skillGaps, applications = [], jobs = []) => {
  if (!skillGaps?.length) return null;
  const worst = [...skillGaps].sort((a, b) => (b.required - b.current) - (a.required - a.current))[0];
  if (!worst || worst.current >= worst.required) return null;
  const w = worst.skill.toLowerCase();
  const blocked = jobs.filter((j) => (j.requirements || []).some((r) => r.toLowerCase().includes(w) || w.includes(r.toLowerCase()))).length;
  const apps = applications.length;
  return {
    text: `Your ${worst.skill} gap (${worst.current}% now vs ${worst.required}% required) is your biggest blocker${blocked ? ` — it appears in ${blocked} of your matched roles` : ""}${apps ? `, and you have ${apps} live application${apps > 1 ? "s" : ""} that would benefit` : ""}. Want a focused 2-week plan?`,
    question: `Give me a 2-week plan to close my ${worst.skill} gap`,
  };
};
