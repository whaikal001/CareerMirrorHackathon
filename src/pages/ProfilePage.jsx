import { useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, Plus, Sparkles } from "lucide-react";
import ResumeField from "../components/ResumeField";
import { extractSkills, makeProfileSummary } from "../compute";

const FIELD_OPTIONS = [
  "Computer Science", "Software Engineering", "Data Science", "Information Technology", "Cybersecurity",
  "Artificial Intelligence", "Information Systems", "Computer Engineering", "Electrical & Electronic Engineering",
  "Mechanical Engineering", "Civil Engineering", "Chemical Engineering", "Mechatronics",
  "Business Administration", "Accounting", "Finance", "Banking", "Economics", "Marketing",
  "Actuarial Science", "Mathematics", "Statistics", "Mass Communication", "Graphic Design / Multimedia",
  "Biotechnology", "Law", "Medicine", "Pharmacy", "Psychology", "Education",
];

const UNI_OPTIONS = [
  "Universiti Malaya", "Universiti Sains Malaysia", "Universiti Kebangsaan Malaysia", "Universiti Putra Malaysia",
  "Universiti Teknologi Malaysia", "UiTM", "Multimedia University", "Universiti Teknologi PETRONAS",
  "Taylor's University", "Sunway University", "Monash University Malaysia", "Asia Pacific University",
];

const INTEREST_OPTIONS = [
  "AI", "Web Development", "Building", "Security", "Design", "Leadership", "Research", "Finance",
  "Data Science", "Cloud Computing", "Mobile Apps", "Game Development", "Robotics", "Blockchain",
  "UI/UX", "DevOps", "Startups", "Marketing", "Sustainability", "Networking",
];

const ALL_INTERESTS = [
  ...INTEREST_OPTIONS,
  "Machine Learning", "Data Engineering", "IoT", "AR/VR", "Software Testing", "Product Management",
  "Databases", "Embedded Systems", "Open Source", "Automation", "Hardware", "Quantum Computing",
  "Data Visualisation", "Low-code Tools",
  "Investing", "Accounting", "Digital Marketing", "Sales", "E-commerce", "Entrepreneurship",
  "Consulting", "Human Resources", "Project Management", "Supply Chain", "Business Analytics",
  "Economics", "Real Estate",
  "Graphic Design", "Animation", "Video Editing", "Photography", "Music", "Writing",
  "Content Creation", "Film", "Fashion", "Architecture", "Illustration", "Social Media",
  "Biotechnology", "Healthcare", "Psychology", "Education", "Renewable Energy", "Aerospace",
  "Automotive", "Agriculture", "Law", "Journalism", "Languages", "Public Speaking",
  "Gaming", "Esports", "Sports", "Travel", "Volunteering", "Event Management",
];

const Sec = ({ n, title, right, children }) => (
  <div className="ct-card">
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
      <span className="ct-serif" style={{ width: 30, height: 30, borderRadius: 8, background: "var(--txt)", color: "var(--bg2)", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 14, flex: "none" }}>{n}</span>
      <span className="ct-serif" style={{ fontWeight: 700, fontSize: 20 }}>{title}</span>
      {right && <span className="ct-small-title" style={{ marginLeft: "auto" }}>{right}</span>}
    </div>
    {children}
  </div>
);

export default function ProfilePage({ profile, setField, interests, toggleInterest, resume, onResume, viewResume, go }) {
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const resumeSkills = useMemo(() => (resume?.text ? extractSkills(resume.text) : []), [resume]);
  const topSkills = [...interests, ...resumeSkills.map((s) => s.name).filter((n) => !interests.includes(n))].slice(0, 10);
  const summary = makeProfileSummary(profile, interests, resumeSkills);

  const addInterest = (raw) => {
    const t = raw.trim();
    if (!t) return;
    const existing = [...ALL_INTERESTS, ...interests].find((x) => x.toLowerCase() === t.toLowerCase());
    const val = existing || t;
    if (!interests.includes(val)) toggleInterest(val);
    setQuery("");
  };

  const base = showAll ? ALL_INTERESTS : INTEREST_OPTIONS;
  const chips = [...base, ...interests.filter((i) => !base.includes(i))];
  const suggestions = query.trim()
    ? ALL_INTERESTS.filter((x) => x.toLowerCase().includes(query.trim().toLowerCase()) && !interests.includes(x)).slice(0, 8)
    : [];

  return (
    <div className="ct-screen" style={{ paddingTop: 30 }}>
      <div className="ct-eyebrow">Career Profile</div>
      <h1 className="ct-h ct-serif" style={{ fontSize: 44 }}>Build your <span className="ct-accent">Career DNA.</span></h1>
      <p className="ct-sub" style={{ marginTop: 12 }}>One page, a few minutes. Fill it manually or just drop your resume — the more you share, the sharper your matches.</p>
      <div className="ct-alert" style={{ marginTop: 18, alignItems: "center" }}>
        <Sparkles size={17} color="var(--mint)" style={{ flex: "none" }} />
        <div style={{ fontSize: 14.5 }}>Twin builds your living portfolio as you go — nothing here is locked, edit anytime.</div>
      </div>

      <div className="tw-grid" style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 20, marginTop: 24, alignItems: "start" }}>
        {/* ---- Form ---- */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Sec n="1" title="About you">
            <div className="ct-grid2">
              <div className="ct-field"><label>Full name</label><input value={profile.name} onChange={setField("name")} /></div>
              <div className="ct-field"><label>Current status</label><select value={profile.userType} onChange={setField("userType")}><option>Internship Seeker</option><option>Fresh Graduate</option><option>Job Seeker</option><option>Working Professional</option><option>Career Changer</option></select></div>
            </div>
            <div className="ct-field" style={{ marginTop: 14 }}><label>Headline (one line that sums you up)</label><input value={profile.headline} onChange={setField("headline")} placeholder="e.g. Fresh CS graduate aiming for data & analytics roles" /></div>
            <div className="ct-grid2" style={{ marginTop: 14 }}>
              <div className="ct-field"><label>Age</label><input value={profile.age} onChange={setField("age")} /></div>
              <div className="ct-field"><label>Email</label><input value={profile.email} onChange={setField("email")} placeholder="you@email.com" /></div>
              <div className="ct-field"><label>Phone</label><input value={profile.phone} onChange={setField("phone")} placeholder="+60 12-345 6789" /></div>
              <div className="ct-field"><label>Country</label><input value={profile.country} onChange={setField("country")} /></div>
              <div className="ct-field"><label>Work style</label><select value={profile.workStyle} onChange={setField("workStyle")}><option>Remote-first</option><option>Hybrid</option><option>On-site</option></select></div>
              <div className="ct-field"><label>Personality</label><select value={profile.mbti} onChange={setField("mbti")}><option>INTJ</option><option>ENTP</option><option>INTP</option><option>ENTJ</option><option>ENFP</option><option>ISFJ</option></select></div>
            </div>
            <div className="ct-field" style={{ marginTop: 14 }}><label>Short bio / background</label><textarea style={{ minHeight: 90 }} value={profile.bio} onChange={setField("bio")} placeholder="Two or three sentences about you — what you've built, what you enjoy, where you're heading…" /></div>
          </Sec>

          <Sec n="2" title="Education">
            <div className="ct-grid2">
              <div className="ct-field"><label>Institution</label><input list="ct-uni-options" value={profile.institution} onChange={setField("institution")} placeholder="Type or choose your university…" /><datalist id="ct-uni-options">{UNI_OPTIONS.map((u) => <option key={u} value={u} />)}</datalist></div>
              <div className="ct-field"><label>Field of study / work</label><input list="ct-field-options" value={profile.field} onChange={setField("field")} placeholder="Type to search or enter your own…" /><datalist id="ct-field-options">{FIELD_OPTIONS.map((f) => <option key={f} value={f} />)}</datalist></div>
              <div className="ct-field"><label>Graduation year</label><input value={profile.gradYear} onChange={setField("gradYear")} placeholder="e.g. 2026" /></div>
              <div className="ct-field"><label>CGPA / performance</label><input value={profile.cgpa} onChange={setField("cgpa")} /></div>
            </div>
          </Sec>

          <Sec n="3" title="Experience" right="Optional">
            <div className="ct-grid2">
              <div className="ct-field"><label>Job title</label><input value={profile.expTitle} onChange={setField("expTitle")} placeholder="e.g. Software Engineering Intern" /></div>
              <div className="ct-field"><label>Company</label><input value={profile.expCompany} onChange={setField("expCompany")} placeholder="e.g. Maybank" /></div>
              <div className="ct-field"><label>From</label><input value={profile.expFrom} onChange={setField("expFrom")} placeholder="Jun 2025" /></div>
              <div className="ct-field"><label>To</label><input value={profile.expTo} onChange={setField("expTo")} placeholder="Aug 2025" /></div>
            </div>
            <div className="ct-field" style={{ marginTop: 14 }}><label>What you did</label><textarea style={{ minHeight: 80 }} value={profile.expDesc} onChange={setField("expDesc")} placeholder="One or two lines about what you built or improved…" /></div>
          </Sec>

          <Sec n="4" title="Skills & interests" right="Tap to select">
            <div className="ct-chips">
              {chips.map((x) => <span key={x} className={`ct-chip ${interests.includes(x) ? "sel" : ""}`} onClick={() => toggleInterest(x)}>{x}</span>)}
              <span className="ct-chip" style={{ borderStyle: "dashed", color: "var(--faint)" }} onClick={() => setShowAll((v) => !v)}>
                {showAll ? "Show less" : `+ ${ALL_INTERESTS.length - INTEREST_OPTIONS.length} more`}
              </span>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }} className="ct-field">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addInterest(suggestions[0] || query); } }}
                placeholder="Search skills or type your own, then press Enter…"
                style={{ flex: "1 1 260px" }}
              />
              <button className="ct-btn ghost" style={{ padding: "10px 18px", fontSize: 15 }} disabled={!query.trim()} onClick={() => addInterest(query)}><Plus size={16} /> Add</button>
            </div>
            {suggestions.length > 0 && (
              <div className="ct-chips" style={{ marginTop: 10 }}>
                {suggestions.map((x) => <span key={x} className="ct-chip" style={{ borderColor: "var(--mint-dim)" }} onClick={() => addInterest(x)}><Plus size={12} style={{ marginRight: 5, display: "inline" }} />{x}</span>)}
              </div>
            )}
          </Sec>

          <Sec n="5" title="Resume & links">
            <div className="ct-grid2">
              <div className="ct-field"><label>LinkedIn (optional)</label><input value={profile.linkedin} onChange={setField("linkedin")} placeholder="linkedin.com/in/you" /></div>
              <div className="ct-field"><label>Portfolio / GitHub (optional)</label><input value={profile.github} onChange={setField("github")} placeholder="github.com/you" /></div>
            </div>
            <div style={{ marginTop: 14 }}>
              <ResumeField resume={resume} onResume={onResume} viewResume={viewResume} />
            </div>
            <div style={{ fontSize: 13, color: "var(--faint)", marginTop: 10 }}>
              PDF preferred — Twin reads it to verify your skills and pre-fill your portfolio preview. No resume yet? Just fill the sections above; the preview builds itself either way.
            </div>
          </Sec>
        </div>

        {/* ---- Living portfolio preview ---- */}
        <div style={{ position: "sticky", top: 20 }}>
          <div className="ct-card" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ background: "#152238", padding: "18px 20px" }}>
              <div className="ct-small-title" style={{ color: "#d9a441" }}>Living Portfolio · Preview</div>
              <div className="ct-serif" style={{ color: "#eef2f6", fontWeight: 700, fontSize: 22, marginTop: 8 }}>{profile.name || "Your name"}</div>
              <div style={{ color: "#c6d2e0", fontSize: 13.5, marginTop: 3 }}>{profile.headline || "One line that sums you up"}</div>
              <div style={{ color: "#8fa1b8", fontSize: 12.5, marginTop: 6 }}>{[profile.email, profile.country, profile.userType].filter(Boolean).join(" · ")}</div>
            </div>
            <div style={{ padding: 20 }}>
              <div className="ct-small-title" style={{ color: "var(--amber)" }}>Professional summary</div>
              <div style={{ fontSize: 13.5, color: summary ? "var(--txt)" : "var(--faint)", marginTop: 6, lineHeight: 1.55 }}>
                {summary || "Upload your resume or fill the form — a tailored summary appears here automatically."}
              </div>
              {(profile.expTitle || profile.expCompany) && (
                <>
                  <div className="ct-small-title" style={{ color: "var(--amber)", marginTop: 16 }}>Experience</div>
                  <div style={{ fontSize: 13.5, fontWeight: 600, marginTop: 6 }}>{[profile.expTitle, profile.expCompany].filter(Boolean).join(" · ")}</div>
                  {(profile.expFrom || profile.expTo) && <div style={{ fontSize: 12.5, color: "var(--faint)", marginTop: 2 }}>{profile.expFrom}{profile.expTo ? ` — ${profile.expTo}` : ""}</div>}
                  {profile.expDesc && <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4, lineHeight: 1.5 }}>{profile.expDesc}</div>}
                </>
              )}
              <div className="ct-small-title" style={{ color: "var(--amber)", marginTop: 16 }}>Education</div>
              <div style={{ fontSize: 13.5, marginTop: 6 }}>
                {[profile.field, profile.institution].filter(Boolean).join(" · ") || <span style={{ color: "var(--faint)" }}>Add your education</span>}
              </div>
              {(profile.gradYear || profile.cgpa) && <div style={{ fontSize: 12.5, color: "var(--faint)", marginTop: 2 }}>{[profile.gradYear && `Class of ${profile.gradYear}`, profile.cgpa && `CGPA ${profile.cgpa}`].filter(Boolean).join(" · ")}</div>}
              <div className="ct-small-title" style={{ color: "var(--amber)", marginTop: 16 }}>Top skills</div>
              <div className="ct-chips" style={{ marginTop: 8 }}>
                {topSkills.length
                  ? topSkills.map((s) => <span key={s} className="ct-chip sel" style={{ cursor: "default", fontSize: 12, padding: "4px 10px" }}>{s}</span>)
                  : <span style={{ fontSize: 12.5, color: "var(--faint)" }}>Pick skills in section 4 or upload a resume</span>}
              </div>
              {resumeSkills.length > 0 && <div style={{ fontSize: 11.5, color: "var(--faint)", marginTop: 8 }}>{resumeSkills.length} skills verified from your resume</div>}
              <div style={{ borderTop: "1px solid var(--line)", marginTop: 16, paddingTop: 12, fontSize: 12.5, color: "var(--mint)", display: "flex", gap: 7, alignItems: "center" }}>
                <CheckCircle2 size={14} style={{ flex: "none" }} /> Verified by CareerTwin as you complete it
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
        <button className="ct-btn ghost" onClick={() => go("landing")}><ArrowLeft size={17} /> Back</button>
        <button className="ct-btn pri" onClick={() => go("analyzing")}><Sparkles size={17} /> Generate my Twin</button>
      </div>
    </div>
  );
}
