import { useState } from "react";
import { ArrowLeft, BadgeCheck, Briefcase, Send, Sparkles, Users } from "lucide-react";

const TALENT = [
  { name: "Aisyah R.", meta: "Computer Science · Universiti Malaya", match: 93, skills: ["Python", "Machine Learning", "SQL"], seeking: "AI internship" },
  { name: "Daniel T.", meta: "Software Engineering · USM", match: 89, skills: ["React", "Node.js", "APIs"], seeking: "Frontend internship" },
  { name: "Mei Lin C.", meta: "Data Science · UKM", match: 86, skills: ["SQL", "Power BI", "Python"], seeking: "Data analyst role" },
  { name: "Harith A.", meta: "Cybersecurity · UTM", match: 84, skills: ["Networking", "Linux", "SIEM"], seeking: "SOC internship" },
  { name: "Priya N.", meta: "Information Systems · MMU", match: 82, skills: ["Java", "SQL", "Figma"], seeking: "Graduate programme" },
  { name: "Wei Jun L.", meta: "Computer Engineering · UTP", match: 80, skills: ["C++", "IoT", "Python"], seeking: "Engineering internship" },
];

const STATS = [
  { n: "2,400+", d: "verified talent profiles" },
  { n: "92%", d: "average match accuracy" },
  { n: "9 days", d: "average time-to-hire" },
];

export default function EmployerPage({ go }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Internship");
  const [locn, setLocn] = useState("Kuala Lumpur");
  const [posts, setPosts] = useState([]);
  const [invited, setInvited] = useState([]);

  const post = () => {
    const t = title.trim();
    if (!t) return;
    setPosts((l) => [{ title: t, type, locn }, ...l]);
    setTitle("");
  };
  const invite = (name) => setInvited((l) => (l.includes(name) ? l : [...l, name]));

  return (
    <div className="ct-screen" style={{ paddingTop: 30 }}>
      <div className="ct-eyebrow">Employer Mode</div>
      <h1 className="ct-h" style={{ fontSize: 48 }}>Hire verified early-career talent</h1>
      <p className="ct-sub" style={{ marginTop: 12 }}>Post roles and discover students and fresh graduates whose Career Twin matches what you're hiring for.</p>

      <div className="ct-grid3" style={{ marginTop: 26 }}>
        {STATS.map((s) => <div className="ct-card" key={s.d} style={{ textAlign: "center" }}><div style={{ fontWeight: 700, fontSize: 34, color: "var(--mint)" }}>{s.n}</div><div style={{ color: "var(--muted)", fontSize: 14.5, marginTop: 4 }}>{s.d}</div></div>)}
      </div>

      <div className="ct-card" style={{ marginTop: 20 }}>
        <div className="ct-small-title" style={{ marginBottom: 12 }}>Post a role</div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <div className="ct-field" style={{ flex: "2 1 240px" }}><label>Job title</label><input value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={(e) => e.key === "Enter" && post()} placeholder="e.g. Data Analyst Intern" /></div>
          <div className="ct-field" style={{ flex: "1 1 160px" }}><label>Type</label><select value={type} onChange={(e) => setType(e.target.value)}><option>Internship</option><option>Full-time</option><option>Graduate Programme</option><option>Contract</option></select></div>
          <div className="ct-field" style={{ flex: "1 1 160px" }}><label>Location</label><select value={locn} onChange={(e) => setLocn(e.target.value)}><option>Kuala Lumpur</option><option>Selangor</option><option>Cyberjaya</option><option>Penang</option><option>Remote</option></select></div>
          <button className="ct-btn pri" style={{ alignSelf: "flex-end" }} disabled={!title.trim()} onClick={post}><Send size={16} /> Post job</button>
        </div>
        {posts.map((p, i) => (
          <div className="ct-alert" key={`${p.title}-${i}`} style={{ marginTop: 10, padding: 12, alignItems: "center" }}>
            <Briefcase size={16} color="var(--mint)" style={{ flex: "none" }} />
            <div style={{ fontSize: 14.5, fontWeight: 500 }}>{p.title}<span style={{ color: "var(--muted)", fontWeight: 400 }}> · {p.type} · {p.locn}</span></div>
            <span className="ct-mono" style={{ marginLeft: "auto", fontSize: 12, color: "var(--mint)" }}>LIVE</span>
          </div>
        ))}
      </div>

      <div className="ct-small-title" style={{ marginTop: 28, marginBottom: 4 }}>Matching talent</div>
      <div className="ct-paths" style={{ marginTop: 12 }}>
        {TALENT.map((t) => (
          <div className="ct-card ct-path" key={t.name}>
            <Users size={24} color="var(--sky)" />
            <div style={{ fontWeight: 700, fontSize: 19, marginTop: 12, display: "flex", alignItems: "center", gap: 7 }}>{t.name}<BadgeCheck size={17} color="var(--mint)" style={{ flex: "none" }} /></div>
            <div style={{ color: "var(--muted)", fontSize: 14, marginTop: 4 }}>{t.meta}</div>
            <div className="ct-match" style={{ color: "var(--sky)", marginTop: 12 }}>{t.match}%</div>
            <div className="ct-small-title">Role Fit</div>
            <div className="ct-chips" style={{ marginTop: 12 }}>{t.skills.map((s) => <span className="ct-chip sel" key={s} style={{ cursor: "default", fontSize: 13, padding: "6px 12px" }}>{s}</span>)}</div>
            <div style={{ color: "var(--muted)", fontSize: 14, marginTop: 12 }}>Seeking: {t.seeking}</div>
            <button className={`ct-btn ${invited.includes(t.name) ? "ghost" : "pri"}`} style={{ marginTop: 14, padding: "10px 16px", fontSize: 14.5 }} onClick={() => invite(t.name)} disabled={invited.includes(t.name)}>
              {invited.includes(t.name) ? "Invited ✓" : <><Sparkles size={15} /> Invite to apply</>}
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 26, display: "flex", gap: 12 }}>
        <button className="ct-btn ghost" onClick={() => go("landing")}><ArrowLeft size={17} /> Back</button>
        <button className="ct-btn pri" onClick={() => go("profile")}>Switch to talent mode</button>
      </div>
    </div>
  );
}
