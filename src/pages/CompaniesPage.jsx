import { useState } from "react";
import { ArrowLeft, Sparkles, Award, CheckCircle2, Briefcase, BadgeCheck, Star, Users } from "lucide-react";
import { COMPANIES, JOBS, SECTORS, LOCATIONS, JOB_TYPES, jobMatchesType, matchesLocation } from "../data/careerData";

export default function CompaniesPage({ applyForJob, go, companyFits }) {
  const [q, setQ] = useState("");
  const [sector, setSector] = useState("");
  const [loc, setLoc] = useState("");
  const [type, setType] = useState("");
  const companies = COMPANIES.map((c) => ({ ...c, compatibility: companyFits?.[c.id] ?? c.compatibility })).sort((a, b) => b.compatibility - a.compatibility);
  const filtered = companies.filter((c) =>
    (!q || `${c.name} ${c.industry}`.toLowerCase().includes(q.toLowerCase())) &&
    (!sector || c.sector === sector) &&
    matchesLocation(c.location, loc) &&
    (!type || JOBS.some((j) => j.company === c.name && jobMatchesType(j, type)))
  );
  return (
    <div className="ct-screen" style={{ paddingTop: 30 }}>
      <div className="ct-eyebrow">Company Opportunity Hub</div>
      <h1 className="ct-h" style={{ fontSize: 44 }}>Companies that fit your profile</h1>
      <p className="ct-sub" style={{ marginTop: 12 }}>View full company details, open positions, salary, benefits, work style match, and apply directly.</p>
      <div className="ct-card" style={{ marginTop: 24, padding: 18, display: "flex", gap: 14, flexWrap: "wrap" }}>
        <div className="ct-field" style={{ flex: "2 1 220px" }}><label>Search</label><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Company name or industry…" /></div>
        <div className="ct-field" style={{ flex: "1 1 160px" }}><label>Sector</label><select value={sector} onChange={(e) => setSector(e.target.value)}><option value="">All sectors</option>{SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>
        <div className="ct-field" style={{ flex: "1 1 160px" }}><label>Location</label><select value={loc} onChange={(e) => setLoc(e.target.value)}><option value="">All locations</option>{LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}</select></div>
        <div className="ct-field" style={{ flex: "1 1 160px" }}><label>Hiring type</label><select value={type} onChange={(e) => setType(e.target.value)}><option value="">All types</option>{JOB_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}</select></div>
      </div>
      <div className="ct-mono" style={{ marginTop: 14, fontSize: 12.5, color: "var(--faint)", letterSpacing: 1.5 }}>{filtered.length} OF {COMPANIES.length} COMPANIES · SORTED BY YOUR FIT</div>
      {filtered.length ? (
        <div className="ct-paths" style={{ marginTop: 14 }}>{filtered.map((c) => <div className="ct-card ct-path" key={c.id}><Award size={26} color="var(--sky)" /><div style={{ fontWeight: 700, fontSize: 21, marginTop: 14, display: "flex", alignItems: "center", gap: 8 }}>{c.name}{c.verified && <BadgeCheck size={19} color="var(--mint)" style={{ flex: "none" }} />}</div><div style={{ color: "var(--muted)", marginTop: 4 }}>{c.industry} · {c.location}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}><Star size={15} fill="var(--amber)" color="var(--amber)" /><b style={{ fontSize: 15 }}>{c.rating}</b><span style={{ color: "var(--faint)", fontSize: 13.5 }}>company rating · replies ~{c.rating >= 4.3 ? 1 : 2}d</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: 7, color: "var(--sky)", fontSize: 14, marginTop: 8 }}><Users size={15} style={{ flex: "none" }} /> {c.peers} peers from your uni work here</div>
          <div className="ct-match" style={{ color: "var(--sky)", marginTop: 16 }}>{c.compatibility}%</div><div className="ct-small-title">Company Fit</div>
          <div className="ct-chips" style={{ marginTop: 12 }}>{c.tags.map((t) => <span className="ct-chip sel" key={t} style={{ cursor: "default", fontSize: 13, padding: "6px 12px" }}>{t}</span>)}</div>
        <div style={{ marginTop: 16 }}><div className="ct-small-title" style={{ marginBottom: 8 }}>Why you match</div>{c.reason.map((r) => <div key={r} style={{ display: "flex", gap: 8, color: "var(--muted)", fontSize: 14.5, marginTop: 6, lineHeight: 1.4 }}><CheckCircle2 size={15} color="var(--mint)" style={{ flex: "none", marginTop: 2 }} />{r}</div>)}</div>
        <div style={{ marginTop: 18 }}><div className="ct-small-title" style={{ marginBottom: 8 }}>Open positions</div>{c.openJobs.map((job) => <div className="ct-alert" key={job} style={{ marginTop: 8, padding: 12, alignItems: "center" }}><Briefcase size={16} color="var(--mint)" style={{ flex: "none" }} /><div style={{ fontSize: 14.5, fontWeight: 500 }}>{job}</div><button className="ct-btn pri" style={{ marginLeft: "auto", padding: "8px 12px", fontSize: 13 }} onClick={() => applyForJob(c.name, job)}>Apply</button></div>)}</div>
        <div style={{ marginTop: 18 }}><div className="ct-small-title" style={{ marginBottom: 6 }}>Salary range</div><div style={{ color: "var(--mint)", fontSize: 14.5, lineHeight: 1.5 }}>{c.salary}</div></div>
        <div style={{ marginTop: 18 }}><div className="ct-small-title" style={{ marginBottom: 8 }}>Skills needed</div><div className="ct-chips">{c.skills.map((skill) => <span className="ct-chip sel" key={skill}>{skill}</span>)}</div></div>
        <div style={{ marginTop: 18 }}><div className="ct-small-title" style={{ marginBottom: 8 }}>Benefits</div><div className="ct-chips">{c.benefits.map((b) => <span className="ct-chip" key={b}>{b}</span>)}</div></div>
        <div style={{ marginTop: 18 }}><div className="ct-small-title" style={{ marginBottom: 10 }}>Work style match</div>{c.culture.map((item) => <div className="ct-comp" key={item.label}><div style={{ width: 130, fontSize: 13.5, color: "var(--muted)" }}>{item.label}</div><div className="ct-bar"><i style={{ width: `${item.value}%` }} /></div><div className="ct-mono" style={{ fontSize: 12, width: 42, textAlign: "right", color: "var(--faint)" }}>{item.value}%</div></div>)}</div>
      </div>)}</div>
      ) : (
        <div className="ct-card" style={{ marginTop: 14, color: "var(--muted)" }}>No companies match these filters. Try clearing one.</div>
      )}
      <div style={{ marginTop: 24, display: "flex", gap: 12 }}><button className="ct-btn ghost" onClick={() => go("jobs")}><ArrowLeft size={17} /> Jobs</button><button className="ct-btn pri" onClick={() => go("coach")}><Sparkles size={17} /> Ask AI coach</button></div>
    </div>
  );
}
