import { useState } from "react";
import { ArrowLeft, Sparkles, Plus } from "lucide-react";
import ResumeField from "../components/ResumeField";

const FIELD_OPTIONS = [
  "Computer Science", "Software Engineering", "Data Science", "Information Technology", "Cybersecurity",
  "Artificial Intelligence", "Information Systems", "Computer Engineering", "Electrical & Electronic Engineering",
  "Mechanical Engineering", "Civil Engineering", "Chemical Engineering", "Mechatronics",
  "Business Administration", "Accounting", "Finance", "Banking", "Economics", "Marketing",
  "Actuarial Science", "Mathematics", "Statistics", "Mass Communication", "Graphic Design / Multimedia",
  "Biotechnology", "Law", "Medicine", "Pharmacy", "Psychology", "Education",
];

const INTEREST_OPTIONS = [
  "AI", "Web Development", "Building", "Security", "Design", "Leadership", "Research", "Finance",
  "Data Science", "Cloud Computing", "Mobile Apps", "Game Development", "Robotics", "Blockchain",
  "UI/UX", "DevOps", "Startups", "Marketing", "Sustainability", "Networking",
];

const ALL_INTERESTS = [
  ...INTEREST_OPTIONS,
  // Tech
  "Machine Learning", "Data Engineering", "IoT", "AR/VR", "Software Testing", "Product Management",
  "Databases", "Embedded Systems", "Open Source", "Automation", "Hardware", "Quantum Computing",
  "Data Visualisation", "Low-code Tools",
  // Business
  "Investing", "Accounting", "Digital Marketing", "Sales", "E-commerce", "Entrepreneurship",
  "Consulting", "Human Resources", "Project Management", "Supply Chain", "Business Analytics",
  "Economics", "Real Estate",
  // Creative
  "Graphic Design", "Animation", "Video Editing", "Photography", "Music", "Writing",
  "Content Creation", "Film", "Fashion", "Architecture", "Illustration", "Social Media",
  // Science & society
  "Biotechnology", "Healthcare", "Psychology", "Education", "Renewable Energy", "Aerospace",
  "Automotive", "Agriculture", "Law", "Journalism", "Languages", "Public Speaking",
  // Lifestyle
  "Gaming", "Esports", "Sports", "Travel", "Volunteering", "Event Management",
];

export default function ProfilePage({ profile, setField, interests, toggleInterest, resume, onResume, viewResume, go }) {
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

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
      <h1 className="ct-h" style={{ fontSize: 48 }}>Build your Career DNA</h1>
      <p className="ct-sub" style={{ marginTop: 12 }}>Tell us about you. CareerTwin uses this profile to recommend jobs, companies, and roadmaps.</p>
      <div className="ct-card" style={{ marginTop: 26 }}>
        <div className="ct-grid2">
          <div className="ct-field"><label>FULL NAME</label><input value={profile.name} onChange={setField("name")} /></div>
          <div className="ct-field"><label>AGE</label><input value={profile.age} onChange={setField("age")} /></div>
          <div className="ct-field"><label>USER TYPE</label><select value={profile.userType} onChange={setField("userType")}><option>Internship Seeker</option><option>Fresh Graduate</option><option>Job Seeker</option><option>Working Professional</option><option>Career Changer</option></select></div>
          <div className="ct-field"><label>FIELD OF STUDY / WORK</label><input list="ct-field-options" value={profile.field} onChange={setField("field")} placeholder="Type to search or enter your own…" /><datalist id="ct-field-options">{FIELD_OPTIONS.map((f) => <option key={f} value={f} />)}</datalist></div>
          <div className="ct-field"><label>CGPA / PERFORMANCE</label><input value={profile.cgpa} onChange={setField("cgpa")} /></div>
          <div className="ct-field"><label>COUNTRY</label><input value={profile.country} onChange={setField("country")} /></div>
          <div className="ct-field"><label>WORK STYLE</label><select value={profile.workStyle} onChange={setField("workStyle")}><option>Remote-first</option><option>Hybrid</option><option>On-site</option></select></div>
          <div className="ct-field"><label>PERSONALITY</label><select value={profile.mbti} onChange={setField("mbti")}><option>INTJ</option><option>ENTP</option><option>INTP</option><option>ENTJ</option><option>ENFP</option><option>ISFJ</option></select></div>
        </div>
        <div className="ct-field" style={{ marginTop: 16 }}>
          <label>INTERESTS</label>
          <div className="ct-chips">
            {chips.map((x) => <span key={x} className={`ct-chip ${interests.includes(x) ? "sel" : ""}`} onClick={() => toggleInterest(x)}>{x}</span>)}
            <span className="ct-chip" style={{ borderStyle: "dashed", color: "var(--faint)" }} onClick={() => setShowAll((v) => !v)}>
              {showAll ? "Show less" : `+ ${ALL_INTERESTS.length - INTEREST_OPTIONS.length} more`}
            </span>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addInterest(suggestions[0] || query); } }}
              placeholder="Search interests or type your own, then press Enter…"
              style={{ flex: "1 1 260px" }}
            />
            <button className="ct-btn ghost" style={{ padding: "10px 18px", fontSize: 15 }} disabled={!query.trim()} onClick={() => addInterest(query)}><Plus size={16} /> Add</button>
          </div>
          {suggestions.length > 0 && (
            <div className="ct-chips" style={{ marginTop: 10 }}>
              {suggestions.map((x) => <span key={x} className="ct-chip" style={{ borderColor: "var(--mint-dim)" }} onClick={() => addInterest(x)}><Plus size={12} style={{ marginRight: 5, display: "inline" }} />{x}</span>)}
            </div>
          )}
        </div>
        <div className="ct-field" style={{ marginTop: 16 }}><label>RESUME / CV</label><ResumeField resume={resume} onResume={onResume} viewResume={viewResume} /></div>
      </div>
      <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
        <button className="ct-btn ghost" onClick={() => go("landing")}><ArrowLeft size={17} /> Back</button>
        <button className="ct-btn pri" onClick={() => go("analyzing")}><Sparkles size={17} /> Generate my Twin</button>
      </div>
    </div>
  );
}
