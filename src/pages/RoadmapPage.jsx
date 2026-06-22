import { ArrowLeft, Briefcase, ChevronRight } from "lucide-react";

export default function RoadmapPage({ picked, go }) {
  return (
    <div className="ct-screen" style={{ paddingTop: 30 }}>
      <div className="ct-eyebrow">Step 4 — LifeGPS Roadmap</div>
      <h1 className="ct-h" style={{ fontSize: 44 }}>Become job-ready for {picked.title}</h1>
      <p className="ct-sub" style={{ marginTop: 12 }}>Your target career broken into an actionable plan before applying.</p>
      <div className="ct-card" style={{ marginTop: 22 }}><div className="ct-road">{picked.roadmap.map((r) => <div className="ct-yr" key={r.y}><div className="ct-yrn">{r.y}</div><div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 17 }}>{r.f}</div><div style={{ color: "var(--muted)", fontSize: 15.5, marginTop: 4 }}>{r.d}</div></div><ChevronRight size={18} color="var(--faint)" style={{ alignSelf: "center" }} /></div>)}</div></div>
      <div style={{ marginTop: 24, display: "flex", gap: 12 }}><button className="ct-btn ghost" onClick={() => go("skillgap")}><ArrowLeft size={17} /> Skill Gap</button><button className="ct-btn pri" onClick={() => go("jobs")}><Briefcase size={17} /> View job titles</button></div>
    </div>
  );
}
