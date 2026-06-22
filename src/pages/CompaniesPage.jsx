import { ArrowLeft, Sparkles, Award, CheckCircle2, Briefcase } from "lucide-react";
import { COMPANIES } from "../data/careerData";

export default function CompaniesPage({ applyForJob, go }) {
  return (
    <div className="ct-screen" style={{ paddingTop: 30 }}>
      <div className="ct-eyebrow">Step 6 — Company Opportunity Hub</div>
      <h1 className="ct-h" style={{ fontSize: 44 }}>Companies that fit your profile</h1>
      <p className="ct-sub" style={{ marginTop: 12 }}>View full company details, open positions, salary, benefits, work style match, and apply directly.</p>
      <div className="ct-paths" style={{ marginTop: 24 }}>{COMPANIES.map((c) => <div className="ct-card ct-path" key={c.id}><Award size={26} color="var(--sky)" /><div style={{ fontWeight: 700, fontSize: 21, marginTop: 14 }}>{c.name}</div><div style={{ color: "var(--muted)", marginTop: 4 }}>{c.industry} · {c.location}</div><div className="ct-match" style={{ color: "var(--sky)", marginTop: 16 }}>{c.compatibility}%</div><div className="ct-small-title">Company Fit</div>
        <div style={{ marginTop: 16 }}><div className="ct-small-title" style={{ marginBottom: 8 }}>Why you match</div>{c.reason.map((r) => <div key={r} style={{ display: "flex", gap: 8, color: "var(--muted)", fontSize: 14.5, marginTop: 6, lineHeight: 1.4 }}><CheckCircle2 size={15} color="var(--mint)" style={{ flex: "none", marginTop: 2 }} />{r}</div>)}</div>
        <div style={{ marginTop: 18 }}><div className="ct-small-title" style={{ marginBottom: 8 }}>Open positions</div>{c.openJobs.map((job) => <div className="ct-alert" key={job} style={{ marginTop: 8, padding: 12, alignItems: "center" }}><Briefcase size={16} color="var(--mint)" style={{ flex: "none" }} /><div style={{ fontSize: 14.5, fontWeight: 500 }}>{job}</div><button className="ct-btn pri" style={{ marginLeft: "auto", padding: "8px 12px", fontSize: 13 }} onClick={() => applyForJob(c.name, job)}>Apply</button></div>)}</div>
        <div style={{ marginTop: 18 }}><div className="ct-small-title" style={{ marginBottom: 6 }}>Salary range</div><div style={{ color: "var(--mint)", fontSize: 14.5, lineHeight: 1.5 }}>{c.salary}</div></div>
        <div style={{ marginTop: 18 }}><div className="ct-small-title" style={{ marginBottom: 8 }}>Skills needed</div><div className="ct-chips">{c.skills.map((skill) => <span className="ct-chip sel" key={skill}>{skill}</span>)}</div></div>
        <div style={{ marginTop: 18 }}><div className="ct-small-title" style={{ marginBottom: 8 }}>Benefits</div><div className="ct-chips">{c.benefits.map((b) => <span className="ct-chip" key={b}>{b}</span>)}</div></div>
        <div style={{ marginTop: 18 }}><div className="ct-small-title" style={{ marginBottom: 10 }}>Work style match</div>{c.culture.map((item) => <div className="ct-comp" key={item.label}><div style={{ width: 130, fontSize: 13.5, color: "var(--muted)" }}>{item.label}</div><div className="ct-bar"><i style={{ width: `${item.value}%` }} /></div><div className="ct-mono" style={{ fontSize: 12, width: 42, textAlign: "right", color: "var(--faint)" }}>{item.value}%</div></div>)}</div>
      </div>)}</div>
      <div style={{ marginTop: 24, display: "flex", gap: 12 }}><button className="ct-btn ghost" onClick={() => go("jobs")}><ArrowLeft size={17} /> Jobs</button><button className="ct-btn pri" onClick={() => go("coach")}><Sparkles size={17} /> Ask AI coach</button></div>
    </div>
  );
}
