import { ArrowLeft, ArrowRight } from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";

export default function TwinPage({ profile, picked, setPicked, go, dna, paths }) {
  return (
    <div className="ct-screen" style={{ paddingTop: 30 }}>
      <div className="ct-eyebrow">Career Twin AI</div>
      <h1 className="ct-h" style={{ fontSize: 46 }}>Your career matches are ready</h1>
      <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: 20, marginTop: 26 }} className="tw-grid">
        <div className="ct-card">
          <div className="ct-small-title">Career DNA</div>
          <div style={{ height: 260, marginTop: 4 }}>
            <ResponsiveContainer width="100%" height="100%"><RadarChart data={dna} outerRadius="78%"><PolarGrid stroke="var(--line2)" /><PolarAngleAxis dataKey="trait" tick={{ fill: "var(--muted)", fontSize: 12.5, fontFamily: "JetBrains Mono" }} /><Radar dataKey="v" stroke="var(--mint)" fill="var(--mint)" fillOpacity={0.28} /></RadarChart></ResponsiveContainer>
          </div>
          <div className="ct-chips" style={{ marginTop: 6 }}>{[["Type", "Builder"], ["Goal", profile.userType], ["Style", profile.workStyle]].map(([k, v]) => <span key={k} className="ct-chip sel" style={{ cursor: "default" }}>{k}: {v}</span>)}</div>
        </div>
        <div>
          <p className="ct-sub" style={{ marginBottom: 14, fontSize: 16.5 }}>Pick a career target to see timeline, skill gap, roadmap, jobs, and companies.</p>
          <div className="ct-paths">
            {paths.map((p) => <div key={p.id} className={`ct-card ct-path clickable ${picked.id === p.id ? "sel" : ""}`} onClick={() => setPicked(p)}><p.icon size={26} style={{ color: p.accent }} /><div className="ct-match" style={{ marginTop: 12, color: p.accent }}>{p.match}%</div><div className="ct-small-title">Match</div><div style={{ fontWeight: 600, marginTop: 14, fontSize: 18.5 }}>{p.title}</div><div style={{ color: "var(--muted)", fontSize: 14.5, marginTop: 7, lineHeight: 1.5 }}>{p.blurb}</div><div className="ct-mono" style={{ fontSize: 13.5, color: p.accent, marginTop: 14 }}>{p.salary}</div></div>)}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 24, display: "flex", gap: 12 }}><button className="ct-btn ghost" onClick={() => go("profile")}><ArrowLeft size={17} /> Back</button><button className="ct-btn pri" onClick={() => go("timeline")}>Simulate {picked.title} <ArrowRight size={17} /></button></div>
    </div>
  );
}
