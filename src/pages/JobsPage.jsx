import { ArrowLeft, Briefcase, Building2, MapPin } from "lucide-react";
import { JOBS } from "../data/careerData";

export default function JobsPage({ go }) {
  return (
    <div className="ct-screen" style={{ paddingTop: 30 }}>
      <div className="ct-eyebrow">Step 5 — Job Discovery</div>
      <h1 className="ct-h" style={{ fontSize: 44 }}>Job titles that match your profile</h1>
      <p className="ct-sub" style={{ marginTop: 12 }}>This section only explains suitable job titles. Apply later from the company section.</p>
      <div className="ct-paths" style={{ marginTop: 24 }}>{JOBS.map((job) => <div className="ct-card ct-path" key={job.id}><Briefcase size={26} color="var(--mint)" /><div style={{ fontWeight: 700, fontSize: 20, marginTop: 14 }}>{job.title}</div><div style={{ color: "var(--muted)", marginTop: 6, lineHeight: 1.55 }}>{job.description}</div><div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}><span className="ct-chip sel" style={{ cursor: "default" }}>{job.match}% Match</span><span className="ct-chip" style={{ cursor: "default" }}>{job.type}</span></div><div style={{ display: "flex", gap: 8, color: "var(--muted)", marginTop: 14, alignItems: "center" }}><MapPin size={15} />{job.location}</div><div style={{ marginTop: 14 }}><div style={{ color: "var(--muted)", fontSize: 14, marginBottom: 8 }}>Basic Requirements</div><div className="ct-chips">{job.requirements.map((s) => <span className="ct-chip sel" key={s}>{s}</span>)}</div></div></div>)}</div>
      <div style={{ marginTop: 24, display: "flex", gap: 12 }}><button className="ct-btn ghost" onClick={() => go("roadmap")}><ArrowLeft size={17} /> Roadmap</button><button className="ct-btn pri" onClick={() => go("companies")}><Building2 size={17} /> Explore companies & apply</button></div>
    </div>
  );
}
