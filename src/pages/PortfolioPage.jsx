import { useState } from "react";
import { ArrowLeft, Award, CheckCircle2, Circle, Printer, Share2, Sparkles, X } from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import ScoreRing from "../components/ScoreRing";
import { computePortfolioScore } from "../compute";

export default function PortfolioPage({ profile, interests, resume, dna, twinData, skillGaps, picked, pathMatch, rehearsalReport, applications, go }) {
  const [share, setShare] = useState(false);
  const score = computePortfolioScore({ profile, interests, resume, twinData, rehearsalReport, applications });
  const skills = twinData?.skills?.length
    ? twinData.skills
    : (skillGaps || []).map((g) => ({ name: g.skill, level: g.current }));
  const interviews = applications.filter((a) => ["Interview", "Offer"].includes(a.status)).length;
  const offers = applications.filter((a) => a.status === "Offer").length;
  const topTraits = [...dna].sort((a, b) => b.v - a.v).slice(0, 3);
  const summary = twinData?.summary || `${profile.field || "Early-career"} ${profile.userType?.toLowerCase() || "talent"} targeting ${picked.title}, strongest in ${topTraits.map((t) => t.trait.toLowerCase()).join(", ")}.`;

  const checklist = [
    { done: !!resume, label: resume ? `Resume uploaded (${resume.name})` : "Upload your resume", action: "profile", gain: "+15" },
    { done: (twinData?.skills?.length || 0) > 0, label: twinData?.skills?.length ? `${twinData.skills.length} skills verified from resume` : "Skills auto-verify when your PDF is analyzed", action: "profile", gain: "+14" },
    { done: !!rehearsalReport, label: rehearsalReport ? `Interview rehearsed — ${rehearsalReport.overall}/100 (${rehearsalReport.jobTitle})` : "Rehearse one interview", action: "jobs", gain: "+15" },
    { done: applications.length > 0, label: applications.length ? `${applications.length} application${applications.length > 1 ? "s" : ""} live` : "Apply to your first role", action: "companies", gain: "+8" },
  ];

  return (
    <div className="ct-screen" style={{ paddingTop: 30 }}>
      <div className="ct-eyebrow">Live Portfolio</div>
      <h1 className="ct-h" style={{ fontSize: 44 }}>{profile.name ? `${profile.name}'s` : "Your"} Career Twin card</h1>
      <p className="ct-sub" style={{ marginTop: 12 }}>This portfolio builds itself from everything you do in CareerTwin — nothing to write, nothing to update.</p>

      <div className="tw-grid" style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 20, marginTop: 26 }}>
        <div className="ct-card" style={{ textAlign: "center" }}>
          <ScoreRing value={score} />
          <div style={{ display: "inline-flex", gap: 7, alignItems: "center", marginTop: 6, color: "var(--mint)", fontWeight: 600 }}><Award size={16} /> Portfolio Strength</div>
          <div style={{ textAlign: "left", marginTop: 16 }}>
            {checklist.map((c) => (
              <div key={c.label} style={{ display: "flex", gap: 9, alignItems: "flex-start", padding: "8px 0", borderTop: "1px solid var(--line)", fontSize: 14 }}>
                {c.done ? <CheckCircle2 size={16} color="var(--mint)" style={{ flex: "none", marginTop: 2 }} /> : <Circle size={16} color="var(--faint)" style={{ flex: "none", marginTop: 2 }} />}
                <span style={{ flex: 1, color: c.done ? "var(--txt)" : "var(--muted)" }}>{c.label}</span>
                {!c.done && <button className="ct-btn ghost" style={{ padding: "4px 10px", fontSize: 12.5, flex: "none" }} onClick={() => go(c.action)}>{c.gain} →</button>}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div className="ct-card">
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <div className="ct-pfp" style={{ width: 56, height: 56, fontSize: 23, cursor: "default" }}>{(profile.name?.trim().charAt(0) || "U").toUpperCase()}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 21 }}>{profile.name || "Your name"}</div>
                <div style={{ color: "var(--muted)", fontSize: 14.5 }}>{profile.field || "Field of study"} · {profile.userType} · {profile.country}</div>
              </div>
            </div>
            <div style={{ color: "var(--muted)", fontSize: 15, marginTop: 12, lineHeight: 1.55 }}>{summary}</div>
            <div className="ct-chips" style={{ marginTop: 12 }}>{interests.slice(0, 6).map((x) => <span key={x} className="ct-chip sel" style={{ cursor: "default", fontSize: 13 }}>{x}</span>)}</div>
          </div>
          <div className="ct-grid2">
            <div className="ct-card">
              <div className="ct-small-title" style={{ marginBottom: 6 }}>Career DNA</div>
              <div style={{ height: 190 }}>
                <ResponsiveContainer width="100%" height="100%"><RadarChart data={dna} outerRadius="75%"><PolarGrid stroke="var(--line2)" /><PolarAngleAxis dataKey="trait" tick={{ fill: "var(--muted)", fontSize: 11.5 }} /><Radar dataKey="v" stroke="var(--mint)" fill="var(--mint)" fillOpacity={0.25} /></RadarChart></ResponsiveContainer>
              </div>
            </div>
            <div className="ct-card">
              <div className="ct-small-title" style={{ marginBottom: 12 }}>Verified skills{twinData?.skills?.length ? " (from resume)" : ""}</div>
              {skills.slice(0, 6).map((s) => (
                <div className="ct-comp" key={s.name} style={{ marginBottom: 10 }}>
                  <div style={{ width: 120, fontSize: 13.5, color: "var(--muted)" }}>{s.name}</div>
                  <div className="ct-bar"><i style={{ width: `${s.level}%` }} /></div>
                  <div className="ct-mono" style={{ fontSize: 12, width: 34, textAlign: "right", color: "var(--faint)" }}>{s.level}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="ct-grid3" style={{ marginTop: 18 }}>
        <div className="ct-card" style={{ textAlign: "center" }}>
          <div style={{ fontWeight: 700, fontSize: 30, color: "var(--mint)" }}>{pathMatch}%</div>
          <div style={{ color: "var(--muted)", fontSize: 14, marginTop: 4 }}>match with career target<br /><b style={{ color: "var(--txt)" }}>{picked.title}</b></div>
        </div>
        <div className="ct-card" style={{ textAlign: "center" }}>
          <div style={{ fontWeight: 700, fontSize: 30, color: "var(--sky)" }}>{rehearsalReport ? `${rehearsalReport.overall}/100` : "—"}</div>
          <div style={{ color: "var(--muted)", fontSize: 14, marginTop: 4 }}>best interview rehearsal{rehearsalReport ? <><br /><b style={{ color: "var(--txt)" }}>{rehearsalReport.jobTitle}</b></> : <><br />rehearse to unlock</>}</div>
        </div>
        <div className="ct-card" style={{ textAlign: "center" }}>
          <div style={{ fontWeight: 700, fontSize: 30, color: "var(--amber)" }}>{applications.length} · {interviews} · {offers}</div>
          <div style={{ color: "var(--muted)", fontSize: 14, marginTop: 4 }}>applications · interviews · offers</div>
        </div>
      </div>

      <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button className="ct-btn pri" onClick={() => setShare(true)}><Share2 size={17} /> Share career card</button>
        <button className="ct-btn ghost" onClick={() => go("dashboard")}><ArrowLeft size={17} /> Dashboard</button>
      </div>

      {share && (
        <div className="ct-overlay" style={{ justifyContent: "center", alignItems: "center" }} onClick={() => setShare(false)}>
          <div className="ct-modal ct-sharecard" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", fontWeight: 700, fontSize: 15 }}><Sparkles size={16} color="var(--mint)" /> CareerTwin<b style={{ color: "var(--mint)" }}>OS</b></div>
              <button className="ct-btn ghost ct-print-hide" style={{ padding: 7, borderRadius: 9 }} onClick={() => setShare(false)}><X size={14} /></button>
            </div>
            <div style={{ marginTop: 16, fontWeight: 700, fontSize: 24 }}>{profile.name || "Your name"}</div>
            <div style={{ color: "var(--muted)", fontSize: 14 }}>{profile.field} · {profile.userType} · {profile.country}</div>
            <div style={{ display: "flex", gap: 22, marginTop: 16 }}>
              <div><div style={{ fontWeight: 700, fontSize: 26, color: "var(--mint)" }}>{score}</div><div style={{ fontSize: 12, color: "var(--muted)" }}>portfolio</div></div>
              <div><div style={{ fontWeight: 700, fontSize: 26, color: "var(--sky)" }}>{pathMatch}%</div><div style={{ fontSize: 12, color: "var(--muted)" }}>{picked.title} fit</div></div>
              {rehearsalReport && <div><div style={{ fontWeight: 700, fontSize: 26, color: "var(--amber)" }}>{rehearsalReport.overall}</div><div style={{ fontSize: 12, color: "var(--muted)" }}>interview score</div></div>}
            </div>
            <div style={{ marginTop: 14, fontSize: 13, color: "var(--muted)" }}>Strongest traits: {topTraits.map((t) => `${t.trait} ${t.v}`).join(" · ")}</div>
            <div className="ct-chips" style={{ marginTop: 10 }}>{skills.slice(0, 5).map((s) => <span key={s.name} className="ct-chip sel" style={{ cursor: "default", fontSize: 12.5, padding: "5px 11px" }}>{s.name}</span>)}</div>
            <div style={{ marginTop: 14, fontSize: 12, color: "var(--faint)" }}>Generated by CareerTwin OS · {new Date().toLocaleDateString()}</div>
            <div className="ct-print-hide" style={{ display: "flex", gap: 10, marginTop: 18 }}>
              <button className="ct-btn pri" style={{ flex: 1, justifyContent: "center" }} onClick={() => window.print()}><Printer size={16} /> Print / Save PDF</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
