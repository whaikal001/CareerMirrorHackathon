import { ArrowLeft, BadgeCheck, Briefcase, CheckCircle2, MapPin, Mic, Star, Users } from "lucide-react";
import { JOBS } from "../data/careerData";

export default function CompanyDetailPage({ company, fit, jobMatches, applyForJob, startRehearsal, go }) {
  if (!company) {
    return (
      <div className="ct-screen" style={{ paddingTop: 30 }}>
        <div className="ct-card" style={{ color: "var(--muted)" }}>No company selected.</div>
        <div style={{ marginTop: 20 }}><button className="ct-btn ghost" onClick={() => go("companies")}><ArrowLeft size={17} /> All companies</button></div>
      </div>
    );
  }

  const roles = JOBS.filter((j) => j.company === company.name).map((j) => ({ ...j, match: jobMatches?.[j.id] ?? j.match }));
  const extraRoles = company.openJobs.filter((r) => !roles.some((j) => j.title === r));
  const compat = fit ?? company.compatibility;

  return (
    <div className="ct-screen" style={{ paddingTop: 30 }}>
      <button className="ct-btn ghost" style={{ padding: "9px 16px", fontSize: 14 }} onClick={() => go("companies")}><ArrowLeft size={15} /> All companies</button>

      {/* ---- Header ---- */}
      <div className="ct-card" style={{ marginTop: 18 }}>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
          <div className="ct-serif" style={{ width: 84, height: 84, borderRadius: 18, background: "var(--surf2)", border: "1px solid var(--line)", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 16, padding: 6, flex: "none", textAlign: "center" }}>{company.name.split(" ")[0]}</div>
          <div style={{ flex: "1 1 260px" }}>
            <div className="ct-serif" style={{ fontWeight: 700, fontSize: 30, display: "flex", alignItems: "center", gap: 9 }}>{company.name}{company.verified && <BadgeCheck size={22} color="var(--mint)" style={{ flex: "none" }} />}</div>
            <div style={{ color: "var(--muted)", fontSize: 15, marginTop: 3 }}>{company.industry} · {company.sector}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
              <Star size={15} fill="var(--amber)" color="var(--amber)" /><b style={{ fontSize: 15 }}>{company.rating}</b>
              <span style={{ color: "var(--faint)", fontSize: 13.5 }}>· replies ~{company.rating >= 4.3 ? 1 : 2}d</span>
              <span style={{ color: "var(--sky)", fontSize: 14, display: "flex", alignItems: "center", gap: 6, marginLeft: 10 }}><Users size={15} /> {company.peers} peers from your uni work here</span>
            </div>
            <div className="ct-chips" style={{ marginTop: 12 }}>{company.tags.map((t) => <span key={t} className="ct-chip sel" style={{ cursor: "default", fontSize: 13, padding: "6px 12px" }}>{t}</span>)}</div>
          </div>
          <div style={{ textAlign: "center", flex: "none" }}>
            <div className="ct-match" style={{ color: "var(--sky)" }}>{compat}%</div>
            <div className="ct-small-title">Your Fit</div>
          </div>
        </div>
      </div>

      {/* ---- About + HQ ---- */}
      <div className="ct-grid2" style={{ marginTop: 18 }}>
        <div className="ct-card">
          <div className="ct-small-title" style={{ marginBottom: 10 }}>Why you match</div>
          {company.reason.map((r) => <div key={r} style={{ display: "flex", gap: 8, color: "var(--muted)", fontSize: 14.5, marginTop: 7, lineHeight: 1.45 }}><CheckCircle2 size={15} color="var(--mint)" style={{ flex: "none", marginTop: 2 }} />{r}</div>)}
          <div className="ct-small-title" style={{ margin: "18px 0 10px" }}>Work style</div>
          {company.culture.map((item) => <div className="ct-comp" key={item.label}><div style={{ width: 130, fontSize: 13.5, color: "var(--muted)" }}>{item.label}</div><div className="ct-bar"><i style={{ width: `${item.value}%` }} /></div><div className="ct-mono" style={{ fontSize: 12, width: 42, textAlign: "right", color: "var(--faint)" }}>{item.value}%</div></div>)}
        </div>
        <div className="ct-card">
          <div className="ct-small-title" style={{ marginBottom: 10 }}>Headquarters</div>
          <div style={{ display: "flex", gap: 9 }}>
            <MapPin size={17} color="var(--coral)" style={{ flex: "none", marginTop: 2 }} />
            <div style={{ fontSize: 14.5, lineHeight: 1.5 }}>{company.hq}<div style={{ color: "var(--muted)", fontSize: 13.5, marginTop: 2 }}>{company.location}</div></div>
          </div>
          <div className="ct-small-title" style={{ margin: "18px 0 8px" }}>Salary range</div>
          <div style={{ color: "var(--mint)", fontSize: 14.5, lineHeight: 1.5 }}>{company.salary}</div>
          <div className="ct-small-title" style={{ margin: "18px 0 8px" }}>Skills they hire for</div>
          <div className="ct-chips">{company.skills.map((s) => <span key={s} className="ct-chip sel" style={{ cursor: "default", fontSize: 13 }}>{s}</span>)}</div>
          <div className="ct-small-title" style={{ margin: "18px 0 8px" }}>Benefits</div>
          <div className="ct-chips">{company.benefits.map((b) => <span key={b} className="ct-chip" style={{ cursor: "default", fontSize: 13 }}>{b}</span>)}</div>
        </div>
      </div>

      {/* ---- Open roles with job specs ---- */}
      <div style={{ marginTop: 28 }}>
        <div className="ct-small-title" style={{ color: "var(--amber)", marginBottom: 8 }}>Open roles</div>
        <div className="ct-serif" style={{ fontSize: 28, fontWeight: 700 }}>{roles.length + extraRoles.length} open position{roles.length + extraRoles.length !== 1 ? "s" : ""} at {company.name}</div>
        {roles.map((job) => (
          <div className="ct-card" key={job.id} style={{ marginTop: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ fontWeight: 700, fontSize: 19 }}>{job.title}</div>
              <span className="ct-chip sel" style={{ cursor: "default", fontSize: 12.5, padding: "4px 11px" }}>{job.match}% match</span>
            </div>
            <div style={{ display: "flex", gap: 8, color: "var(--muted)", fontSize: 14, marginTop: 6, alignItems: "center", flexWrap: "wrap" }}>
              <Briefcase size={14} />{job.type}<span>·</span><MapPin size={14} />{job.location}
            </div>
            <div className="ct-small-title" style={{ margin: "14px 0 6px" }}>Job spec</div>
            <div style={{ color: "var(--muted)", fontSize: 14.5, lineHeight: 1.55 }}>{job.description}</div>
            <div className="ct-chips" style={{ marginTop: 12 }}>{job.requirements.map((s) => <span key={s} className="ct-chip sel" style={{ cursor: "default", fontSize: 13 }}>{s}</span>)}</div>
            <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
              <button className="ct-btn pri" style={{ padding: "10px 18px", fontSize: 14.5 }} onClick={() => applyForJob(company.name, job.title)}>Apply</button>
              <button className="ct-btn ghost" style={{ padding: "10px 18px", fontSize: 14.5 }} onClick={() => startRehearsal(job)}><Mic size={15} /> Rehearse interview</button>
            </div>
          </div>
        ))}
        {extraRoles.length > 0 && (
          <div className="ct-card" style={{ marginTop: 16 }}>
            <div className="ct-small-title" style={{ marginBottom: 10 }}>More openings</div>
            {extraRoles.map((r) => (
              <div className="ct-alert" key={r} style={{ marginTop: 8, padding: 12, alignItems: "center" }}>
                <Briefcase size={16} color="var(--mint)" style={{ flex: "none" }} />
                <div style={{ fontSize: 14.5, fontWeight: 500 }}>{r}</div>
                <button className="ct-btn pri" style={{ marginLeft: "auto", padding: "8px 12px", fontSize: 13 }} onClick={() => applyForJob(company.name, r)}>Apply</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: 26, display: "flex", gap: 12 }}>
        <button className="ct-btn ghost" onClick={() => go("companies")}><ArrowLeft size={17} /> All companies</button>
        <button className="ct-btn pri" onClick={() => go("dashboard")}>View my applications</button>
      </div>
    </div>
  );
}
