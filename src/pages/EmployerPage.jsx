import { useState } from "react";
import { ArrowLeft, ArrowRight, BadgeCheck, Briefcase, Send, Sparkles, Users } from "lucide-react";
import { COMPANIES } from "../data/careerData";

const TALENT = [
  { name: "Aisyah R.", meta: "Computer Science · Universiti Malaya", match: 93, skills: ["Python", "Machine Learning", "SQL"], seeking: "AI internship" },
  { name: "Daniel T.", meta: "Software Engineering · USM", match: 89, skills: ["React", "Node.js", "APIs"], seeking: "Frontend internship" },
  { name: "Mei Lin C.", meta: "Data Science · UKM", match: 86, skills: ["SQL", "Power BI", "Python"], seeking: "Data analyst role" },
  { name: "Harith A.", meta: "Cybersecurity · UTM", match: 84, skills: ["Networking", "Linux", "SIEM"], seeking: "SOC internship" },
  { name: "Priya N.", meta: "Information Systems · MMU", match: 82, skills: ["Java", "SQL", "Figma"], seeking: "Graduate programme" },
  { name: "Wei Jun L.", meta: "Computer Engineering · UTP", match: 80, skills: ["C++", "IoT", "Python"], seeking: "Engineering internship" },
];

const STRIP_EXTRA = [
  "Intel Malaysia", "Dell Technologies", "Samsung", "Siemens Malaysia", "HSBC", "Standard Chartered",
  "PwC Malaysia", "BMW Group", "DHL Express", "Unilever", "Sunway Group", "Touch 'n Go",
];

const STATS = [
  ["2,400+", "Candidates reached"],
  ["6", "Sectors"],
  ["9 days", "Avg time-to-hire"],
];

const HOW_IT_WORKS = [
  { n: "1", t: "Post a role in minutes", d: "Title, skills, location — done. No lengthy employer onboarding, no listing fees during the pilot." },
  { n: "2", t: "AI ranks the candidates", d: "Twin scores every candidate's Career DNA and verified skills against your requirements, with reasons why." },
  { n: "3", t: "Invite and hire", d: "Shortlist the top fits, invite them to apply in one tap, and track responses in your pipeline." },
];

const STORIES = [
  { name: "Farah M.", role: "Head of Talent", company: "TechNova AI", quote: "The fit ranking did our first screening round for us. We interviewed four, hired two." },
  { name: "Kevin L.", role: "HR Business Partner", company: "Grab Malaysia", quote: "Candidates arrive already knowing their gaps and strengths — the interviews are twice as productive." },
  { name: "Suraya K.", role: "Early Careers Lead", company: "Maybank", quote: "We filled a data internship in nine days. Our usual cycle is six weeks." },
];

const SectionLabel = ({ children }) => (
  <div className="ct-small-title" style={{ color: "var(--amber)", marginBottom: 10 }}>{children}</div>
);

export default function EmployerPage({ go }) {
  const [q, setQ] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Internship");
  const [locn, setLocn] = useState("Kuala Lumpur");
  const [posts, setPosts] = useState([]);
  const [invited, setInvited] = useState([]);

  const ql = q.trim().toLowerCase();
  const talent = TALENT.filter((t) => !ql || [t.name, t.meta, t.seeking, ...t.skills].join(" ").toLowerCase().includes(ql));

  const post = () => {
    const t = title.trim();
    if (!t) return;
    setPosts((l) => [{ title: t, type, locn }, ...l]);
    setTitle("");
  };
  const invite = (name) => setInvited((l) => (l.includes(name) ? l : [...l, name]));

  return (
    <div className="ct-screen" style={{ paddingTop: 56 }}>
      {/* ---- Hero ---- */}
      <div className="ct-eyebrow reveal" style={{ color: "var(--amber)" }}>— The Hiring Platform for Leading Employers</div>
      <div className="ct-pills reveal" style={{ animationDelay: ".04s" }}>
        <span className="ct-pill" onClick={() => go("landing")}>I'm looking for a job</span>
        <span className="ct-pill on">I'm hiring</span>
      </div>
      <h1 className="ct-h ct-serif reveal" style={{ fontSize: 58, marginTop: 22, animationDelay: ".08s" }}>
        Hire from the <span className="ct-accent">strongest talent pool</span><br />in Malaysia.
      </h1>
      <p className="ct-sub reveal" style={{ marginTop: 18, animationDelay: ".14s" }}>
        Reach top graduates and early-career professionals, with AI-ranked candidates whose Career Twins match what you're hiring for.
      </p>
      <div className="ct-search reveal" style={{ marginTop: 26, animationDelay: ".2s" }}>
        <Sparkles size={17} color="var(--amber)" style={{ flex: "none" }} />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search candidates by skill or course" />
        <button className="ct-btn pri" style={{ padding: "11px 22px", fontSize: 15, flex: "none" }}>Find talent</button>
      </div>
      <div className="reveal" style={{ marginTop: 22, fontSize: 13.5, color: "var(--faint)", animationDelay: ".24s" }}>Hiring partners across 6 sectors in Malaysia</div>
      <div className="reveal" style={{ marginTop: 14, borderTop: "1px solid var(--line)", paddingTop: 20, display: "flex", gap: 46, flexWrap: "wrap", animationDelay: ".26s" }}>
        {STATS.map(([n, d]) => (
          <div key={d}><div className="ct-serif" style={{ fontWeight: 700, fontSize: 32 }}>{n}</div><div style={{ color: "var(--muted)", fontSize: 13.5 }}>{d}</div></div>
        ))}
      </div>

      {/* ---- Hiring partners marquee ---- */}
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

      {/* ---- How it works ---- */}
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

      {/* ---- Post a role ---- */}
      <div className="reveal" style={{ marginTop: 64 }}>
        <SectionLabel>Start hiring</SectionLabel>
        <div className="ct-serif" style={{ fontSize: 34, fontWeight: 700 }}>Post a role, <span className="ct-accent">watch it go live.</span></div>
        <div className="ct-card" style={{ marginTop: 22 }}>
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
      </div>

      {/* ---- Matched candidates ---- */}
      <div className="reveal" style={{ marginTop: 64 }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 14, flexWrap: "wrap" }}>
          <div>
            <SectionLabel>Matched to your roles</SectionLabel>
            <div className="ct-serif" style={{ fontSize: 34, fontWeight: 700 }}>Candidates ranked <span className="ct-accent">by fit.</span></div>
          </div>
          <div className="ct-mono" style={{ fontSize: 12.5, color: "var(--faint)", letterSpacing: 1.5 }}>{talent.length} OF {TALENT.length} CANDIDATES</div>
        </div>
        {talent.length ? (
          <div className="ct-paths" style={{ marginTop: 22 }}>
            {talent.map((t) => (
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
        ) : (
          <div className="ct-card" style={{ marginTop: 22, color: "var(--muted)" }}>No candidates match "{q}". Try a broader skill.</div>
        )}
      </div>

      {/* ---- Employer stories ---- */}
      <div className="reveal" style={{ marginTop: 64 }}>
        <SectionLabel>Employer stories</SectionLabel>
        <div className="ct-serif" style={{ fontSize: 34, fontWeight: 700 }}>Hear it from <span className="ct-accent">the hiring teams.</span></div>
        <div className="ct-grid3" style={{ marginTop: 22 }}>
          {STORIES.map((t) => (
            <div className="ct-card" key={t.name} style={{ padding: 22 }}>
              <span className="ct-chip ct-serif" style={{ cursor: "default", fontSize: 13, fontWeight: 600 }}>{t.company}</span>
              <div className="ct-serif" style={{ fontStyle: "italic", fontSize: 16.5, lineHeight: 1.55, marginTop: 14 }}>"{t.quote}"</div>
              <div style={{ marginTop: 14, fontWeight: 600, fontSize: 14.5 }}>{t.name}</div>
              <div style={{ color: "var(--muted)", fontSize: 13.5 }}>{t.role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ---- Final CTA ---- */}
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
