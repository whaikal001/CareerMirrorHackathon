import { ArrowLeft, ClipboardCheck, Heart, AlertTriangle, Zap } from "lucide-react";
import ScoreRing from "../components/ScoreRing";
import { SCORE_PARTS } from "../data/careerData";

export default function DashboardPage({ picked, applications, go }) {
  return (
    <div className="ct-screen" style={{ paddingTop: 30 }}>
      <div className="ct-eyebrow">Step 8 — Career Dashboard</div>
      <h1 className="ct-h" style={{ fontSize: 44 }}>Your career dashboard</h1>
      <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 20, marginTop: 26 }} className="tw-grid">
        <div className="ct-card" style={{ textAlign: "center" }}><ScoreRing value={picked.health} /><div style={{ display: "inline-flex", gap: 7, alignItems: "center", marginTop: 6, color: "var(--mint)", fontWeight: 600 }}><Heart size={16} /> {picked.healthLabel}</div><div style={{ color: "var(--muted)", fontSize: 14, marginTop: 4 }}>Top {picked.percentile}% for your age & field</div></div>
        <div className="ct-card"><div className="ct-small-title" style={{ marginBottom: 14 }}>Score breakdown</div>{SCORE_PARTS.map((p) => <div className="ct-comp" key={p.n}><div style={{ width: 155, fontSize: 14.5, color: "var(--muted)" }}>{p.n}</div><div className="ct-bar"><i style={{ width: `${p.v}%` }} /></div><div className="ct-mono" style={{ fontSize: 13, width: 66, textAlign: "right", color: "var(--faint)" }}>{p.v} · {p.w}%</div></div>)}</div>
      </div>
      <div className="ct-alert warn" style={{ marginTop: 18 }}><AlertTriangle size={20} color="var(--coral)" /><div><div style={{ fontWeight: 600, fontSize: 16.5 }}>Skill demand alert</div><div style={{ color: "var(--muted)", fontSize: 15, marginTop: 4 }}>{picked.risk.warn} Recommended: {picked.risk.recommend.join(", ")} and {picked.risk.cert}.</div></div></div>
      <div className="ct-alert" style={{ marginTop: 12 }}><Zap size={20} color="var(--mint)" /><div><div style={{ fontWeight: 600, fontSize: 16.5 }}>On track</div><div style={{ color: "var(--muted)", fontSize: 15, marginTop: 4 }}>You're aligned with your {picked.title} goal. Automation risk: <b style={{ color: "var(--mint)" }}>{picked.risk.automation}</b>.</div></div></div>
      <div className="ct-card" style={{ marginTop: 24 }}><div className="ct-small-title" style={{ marginBottom: 12 }}>Application Tracker</div>{applications.length ? applications.map((a) => <div className="ct-drow" key={`${a.company}-${a.role}`}><span><b>{a.role}</b><div style={{ color: "var(--muted)", fontSize: 14 }}>{a.company} · {a.date || "Today"}</div></span><span style={{ color: "var(--mint)", fontWeight: 600 }}>{a.status}</span></div>) : <div style={{ color: "var(--muted)", fontSize: 15 }}>No applications yet. Go to Companies and apply for a suitable position.</div>}</div>
      <div style={{ marginTop: 26, display: "flex", gap: 12 }}><button className="ct-btn ghost" onClick={() => go("coach")}><ArrowLeft size={17} /> Coach</button><button className="ct-btn pri" onClick={() => go("companies")}><ClipboardCheck size={17} /> Apply more jobs</button></div>
      <div className="ct-card" style={{ marginTop: 30, textAlign: "center", borderColor: "var(--mint-dim)" }}><div style={{ fontFamily: "Bricolage Grotesque", fontWeight: 700, fontSize: 24 }}>“We don't just show jobs — we guide you from profile to application.”</div><div className="ct-mono" style={{ fontSize: 12.5, color: "var(--faint)", marginTop: 8, letterSpacing: 2 }}>CareerTwin OS</div></div>
    </div>
  );
}
