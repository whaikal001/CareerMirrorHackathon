import { ArrowLeft, Target, AlertTriangle } from "lucide-react";

export default function SkillGapPage({ picked, go, skillGaps }) {
  return (
    <div className="ct-screen" style={{ paddingTop: 30 }}>
      <div className="ct-eyebrow">Skill Gap Analyzer</div>
      <h1 className="ct-h" style={{ fontSize: 44 }}>Your readiness for {picked.title}</h1>
      <p className="ct-sub" style={{ marginTop: 12 }}>CareerTwin compares your current skill level against required skills for your selected target.</p>
      <div className="ct-card" style={{ marginTop: 24 }}>{skillGaps.map((s) => <div className="ct-comp" key={s.skill}><div style={{ width: 160, fontSize: 15, color: "var(--muted)" }}>{s.skill}</div><div className="ct-bar"><i style={{ width: `${s.current}%` }} /></div><div className="ct-mono" style={{ width: 110, textAlign: "right", color: "var(--faint)" }}>{s.current}% / {s.required}%</div></div>)}</div>
      <div className="ct-alert warn" style={{ marginTop: 18 }}><AlertTriangle size={20} color="var(--coral)" /><div><div style={{ fontWeight: 600 }}>Priority Skill Gap</div><div style={{ color: "var(--muted)", marginTop: 4 }}>Improve TensorFlow, Docker, and Machine Learning before applying for higher-level AI roles.</div></div></div>
      <div style={{ marginTop: 24, display: "flex", gap: 12 }}><button className="ct-btn ghost" onClick={() => go("timeline")}><ArrowLeft size={17} /> Timeline</button><button className="ct-btn pri" onClick={() => go("roadmap")}><Target size={17} /> Generate roadmap</button></div>
    </div>
  );
}
