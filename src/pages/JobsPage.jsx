import { useState } from "react";
import { ArrowLeft, Briefcase, Building2, MapPin, Mic } from "lucide-react";
import { JOBS, SECTORS, LOCATIONS, JOB_TYPES, jobMatchesType, matchesLocation } from "../data/careerData";

export default function JobsPage({ go, startRehearsal }) {
  const [sector, setSector] = useState("");
  const [loc, setLoc] = useState("");
  const [type, setType] = useState("");
  const filtered = JOBS.filter((j) => (!sector || j.sector === sector) && matchesLocation(j.location, loc) && jobMatchesType(j, type));
  return (
    <div className="ct-screen" style={{ paddingTop: 30 }}>
      <div className="ct-eyebrow">Job Discovery</div>
      <h1 className="ct-h" style={{ fontSize: 44 }}>Job titles that match your profile</h1>
      <p className="ct-sub" style={{ marginTop: 12 }}>This section only explains suitable job titles. Apply later from the company section.</p>
      <div className="ct-card" style={{ marginTop: 24, padding: 18, display: "flex", gap: 14, flexWrap: "wrap" }}>
        <div className="ct-field" style={{ flex: "1 1 170px" }}><label>Sector</label><select value={sector} onChange={(e) => setSector(e.target.value)}><option value="">All sectors</option>{SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>
        <div className="ct-field" style={{ flex: "1 1 170px" }}><label>Location</label><select value={loc} onChange={(e) => setLoc(e.target.value)}><option value="">All locations</option>{LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}</select></div>
        <div className="ct-field" style={{ flex: "1 1 170px" }}><label>Type</label><select value={type} onChange={(e) => setType(e.target.value)}><option value="">All types</option>{JOB_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}</select></div>
      </div>
      <div className="ct-mono" style={{ marginTop: 14, fontSize: 12.5, color: "var(--faint)", letterSpacing: 1.5 }}>{filtered.length} OF {JOBS.length} ROLES</div>
      {filtered.length ? (
        <div className="ct-paths" style={{ marginTop: 14 }}>{filtered.map((job) => <div className="ct-card ct-path" key={job.id}><Briefcase size={26} color="var(--mint)" /><div style={{ fontWeight: 700, fontSize: 20, marginTop: 14 }}>{job.title}</div><div style={{ color: "var(--muted)", fontSize: 14, marginTop: 4 }}>{job.company} · {job.sector}</div><div style={{ color: "var(--muted)", marginTop: 6, lineHeight: 1.55 }}>{job.description}</div><div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}><span className="ct-chip sel" style={{ cursor: "default" }}>{job.match}% Match</span><span className="ct-chip" style={{ cursor: "default" }}>{job.type}</span></div><div style={{ display: "flex", gap: 8, color: "var(--muted)", marginTop: 14, alignItems: "center" }}><MapPin size={15} />{job.location}</div><div className="ct-mono" style={{ fontSize: 12, color: "var(--faint)", marginTop: 8 }}>{5 + (job.match % 17)} people applied this week</div><div style={{ marginTop: 14 }}><div style={{ color: "var(--muted)", fontSize: 14, marginBottom: 8 }}>Basic Requirements</div><div className="ct-chips">{job.requirements.map((s) => <span className="ct-chip sel" key={s}>{s}</span>)}</div></div><button className="ct-btn ghost" style={{ marginTop: 16, padding: "10px 16px", fontSize: 15 }} onClick={() => startRehearsal(job)}><Mic size={15} /> Rehearse interview</button></div>)}</div>
      ) : (
        <div className="ct-card" style={{ marginTop: 14, color: "var(--muted)" }}>No roles match these filters. Try clearing one.</div>
      )}
      <div style={{ marginTop: 24, display: "flex", gap: 12 }}><button className="ct-btn ghost" onClick={() => go("roadmap")}><ArrowLeft size={17} /> Roadmap</button><button className="ct-btn pri" onClick={() => go("companies")}><Building2 size={17} /> Explore companies & apply</button></div>
    </div>
  );
}
