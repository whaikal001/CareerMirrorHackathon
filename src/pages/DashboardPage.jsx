import { useState } from "react";
import { ArrowLeft, ClipboardCheck, Heart, AlertTriangle, Zap, Sparkles, LifeBuoy, Award } from "lucide-react";
import ScoreRing from "../components/ScoreRing";
import { SCORE_PARTS, JOBS, COMPANIES } from "../data/careerData";
import { APP_STATUSES, STATUS_COLORS } from "../constants";

const jobForApp = (a) => {
  const j = JOBS.find((j) => j.title === a.role);
  if (j) return { title: j.title, requirements: j.requirements };
  const c = COMPANIES.find((c) => c.name === a.company);
  return { title: a.role, requirements: c?.skills || [] };
};

const FOLLOW_UP_DAYS = 7;
const followUpText = (a) => {
  const days = Math.floor((Date.now() - (a.appliedAt || Date.now())) / 86400000);
  const left = FOLLOW_UP_DAYS - days;
  return left > 0 ? `Follow up in ${left} day${left === 1 ? "" : "s"}` : "Follow up now";
};

export default function DashboardPage({ picked, applications, go, startRehearsal, rehearsalReport, updateStatus, nudge, planB, profile, coachAsk }) {
  const [overCol, setOverCol] = useState(null);
  return (
    <div className="ct-screen" style={{ paddingTop: 30 }}>
      <div className="ct-eyebrow">Career Dashboard</div>
      <h1 className="ct-h" style={{ fontSize: 44 }}>Your career dashboard</h1>
      {nudge && (
        <div className="ct-alert" style={{ marginTop: 20, alignItems: "center", flexWrap: "wrap" }}>
          <Sparkles size={20} color="var(--mint)" style={{ flex: "none" }} />
          <div style={{ fontSize: 15, lineHeight: 1.5, flex: "1 1 300px" }}><b>Twin:</b> {nudge.text}</div>
          <button className="ct-btn pri" style={{ padding: "10px 16px", fontSize: 14, flex: "none" }} onClick={() => coachAsk(nudge.question)}>Yes, coach me</button>
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 20, marginTop: 26 }} className="tw-grid">
        <div className="ct-card" style={{ textAlign: "center" }}><ScoreRing value={picked.health} /><div style={{ display: "inline-flex", gap: 7, alignItems: "center", marginTop: 6, color: "var(--mint)", fontWeight: 600 }}><Heart size={16} /> {picked.healthLabel}</div><div style={{ color: "var(--muted)", fontSize: 14, marginTop: 4 }}>Top {picked.percentile}% for your age & field</div><div style={{ color: "var(--faint)", fontSize: 13.5, marginTop: 6 }}>Portfolio stronger than {Math.min(99, picked.health + 12)}% of {profile?.field || "your field"} students</div></div>
        <div className="ct-card"><div className="ct-small-title" style={{ marginBottom: 14 }}>Score breakdown</div>{SCORE_PARTS.map((p) => <div className="ct-comp" key={p.n}><div style={{ width: 155, fontSize: 14.5, color: "var(--muted)" }}>{p.n}</div><div className="ct-bar"><i style={{ width: `${p.v}%` }} /></div><div className="ct-mono" style={{ fontSize: 13, width: 66, textAlign: "right", color: "var(--faint)" }}>{p.v} · {p.w}%</div></div>)}</div>
      </div>
      <div className="ct-alert warn" style={{ marginTop: 18 }}><AlertTriangle size={20} color="var(--coral)" /><div><div style={{ fontWeight: 600, fontSize: 16.5 }}>Skill demand alert</div><div style={{ color: "var(--muted)", fontSize: 15, marginTop: 4 }}>{picked.risk.warn} Recommended: {picked.risk.recommend.join(", ")} and {picked.risk.cert}.</div></div></div>
      <div className="ct-alert" style={{ marginTop: 12 }}><Zap size={20} color="var(--mint)" /><div><div style={{ fontWeight: 600, fontSize: 16.5 }}>On track</div><div style={{ color: "var(--muted)", fontSize: 15, marginTop: 4 }}>You're aligned with your {picked.title} goal. Automation risk: <b style={{ color: "var(--mint)" }}>{picked.risk.automation}</b>.</div></div></div>
      {planB && (
        <div className="ct-card" style={{ marginTop: 18 }}>
          <div className="ct-small-title" style={{ marginBottom: 12 }}>Plan B — Career Insurance</div>
          <div style={{ display: "flex", gap: 12 }}>
            <LifeBuoy size={20} color="var(--sky)" style={{ flex: "none", marginTop: 2 }} />
            <div style={{ fontSize: 15, lineHeight: 1.55 }}>If <b>{picked.title}</b> gets disrupted ({picked.risk.automation.toLowerCase()} automation risk today — {picked.risk.warn.toLowerCase()}), your fastest pivot is <b>{planB.pivotPath.title}</b>: it shares the most skills with your current path.</div>
          </div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginTop: 16 }}>
            <div style={{ flex: "1 1 220px" }}>
              <div className="ct-small-title" style={{ marginBottom: 8 }}>Transferable now</div>
              <div className="ct-chips">{planB.transferable.map((s) => <span key={s} className="ct-chip sel" style={{ cursor: "default", fontSize: 13 }}>{s}</span>)}</div>
            </div>
            <div style={{ flex: "1 1 220px" }}>
              <div className="ct-small-title" style={{ marginBottom: 8 }}>Skills to add</div>
              <div className="ct-chips">{planB.toLearn.map((s) => <span key={s} className="ct-chip" style={{ cursor: "default", fontSize: 13 }}>{s}</span>)}</div>
            </div>
          </div>
          <div style={{ marginTop: 14 }}>
            {planB.months.map((x) => <div key={x.m} style={{ display: "flex", gap: 14, padding: "9px 0", borderTop: "1px solid var(--line)", fontSize: 14.5 }}><b style={{ width: 92, flex: "none", color: "var(--amber)" }}>{x.m}</b><span style={{ color: "var(--muted)" }}>{x.action}</span></div>)}
          </div>
          <button className="ct-btn ghost" style={{ marginTop: 14, padding: "9px 16px", fontSize: 14 }} onClick={() => coachAsk("Stress-test my Plan B")}>Stress-test my Plan B</button>
        </div>
      )}
      <div className="ct-card" style={{ marginTop: 24 }}>
        <div className="ct-small-title" style={{ marginBottom: 12 }}>Application Tracker</div>
        {rehearsalReport && <div style={{ color: "var(--muted)", fontSize: 14, marginBottom: 10 }}>Last rehearsal: <b style={{ color: "var(--mint)" }}>{rehearsalReport.overall}/100</b> · {rehearsalReport.jobTitle}</div>}
        {applications.length ? (
          <div className="ct-kanban">
            {APP_STATUSES.map((s) => {
              const cards = applications.filter((a) => a.status === s);
              return (
                <div
                  key={s}
                  className={`ct-kcol ${overCol === s ? "over" : ""}`}
                  onDragOver={(e) => { e.preventDefault(); setOverCol(s); }}
                  onDrop={(e) => {
                    e.preventDefault();
                    const [company, role] = e.dataTransfer.getData("text/plain").split("||");
                    if (company && role) updateStatus(company, role, s);
                    setOverCol(null);
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: STATUS_COLORS[s], flex: "none" }} />
                    <span className="ct-small-title">{s}</span>
                    <span className="ct-mono" style={{ marginLeft: "auto", fontSize: 11, color: "var(--faint)" }}>{cards.length}</span>
                  </div>
                  {cards.map((a) => (
                    <div
                      key={`${a.company}-${a.role}`}
                      className="ct-kcard"
                      draggable
                      onDragStart={(e) => e.dataTransfer.setData("text/plain", `${a.company}||${a.role}`)}
                      onDragEnd={() => setOverCol(null)}
                    >
                      <div style={{ fontWeight: 600, fontSize: 14.5, lineHeight: 1.35 }}>{a.role}</div>
                      <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 3 }}>{a.company} · {a.date || "Today"}</div>
                      <select
                        className="ct-kstatus"
                        style={{ color: STATUS_COLORS[a.status], borderColor: STATUS_COLORS[a.status] }}
                        value={a.status}
                        onChange={(e) => updateStatus(a.company, a.role, e.target.value)}
                      >
                        {APP_STATUSES.map((st) => <option key={st} value={st}>{st}</option>)}
                      </select>
                      {a.status === "Interview" && <div className="ct-kaction" onClick={() => startRehearsal(jobForApp(a))}>Rehearse →</div>}
                      {a.status === "Applied" && <div className="ct-knote">{followUpText(a)}</div>}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ color: "var(--muted)", fontSize: 15 }}>No applications yet. Go to Companies and apply for a suitable position.</div>
        )}
      </div>
      <div style={{ marginTop: 26, display: "flex", gap: 12, flexWrap: "wrap" }}><button className="ct-btn ghost" onClick={() => go("coach")}><ArrowLeft size={17} /> Coach</button><button className="ct-btn ghost" onClick={() => go("portfolio")}><Award size={17} /> My portfolio</button><button className="ct-btn pri" onClick={() => go("companies")}><ClipboardCheck size={17} /> Apply more jobs</button></div>
      <div className="ct-card" style={{ marginTop: 30, textAlign: "center", borderColor: "var(--mint-dim)" }}><div style={{ fontWeight: 700, fontSize: 24 }}>“We don't just show jobs — we guide you from profile to application.”</div><div className="ct-mono" style={{ fontSize: 12.5, color: "var(--faint)", marginTop: 8, letterSpacing: 2 }}>CareerTwin OS</div></div>
    </div>
  );
}
