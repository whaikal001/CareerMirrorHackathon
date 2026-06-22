import { X, FileText, Pencil } from "lucide-react";
import ResumeField from "./ResumeField";

export default function ProfileDrawer({
  profile,
  interests,
  resume,
  previewUrl,
  viewResume,
  onResume,
  onClose,
  onEditProfile,
  onReset,
}) {
  return (
    <div className="ct-overlay" onClick={onClose}>
      <div className="ct-drawer" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
          <div className="ct-small-title">Profile & Settings</div>
          <button className="ct-btn ghost" style={{ padding: 9, borderRadius: 10 }} onClick={onClose}><X size={16} /></button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
          <div className="ct-pfp" style={{ width: 54, height: 54, fontSize: 22, cursor: "default" }}>{(profile.name.trim().charAt(0) || "U").toUpperCase()}</div>
          <div>
            <div style={{ fontFamily: "Bricolage Grotesque", fontWeight: 700, fontSize: 20 }}>{profile.name || "Your name"}</div>
            <div className="ct-mono" style={{ fontSize: 12, color: "var(--mint)" }}>{profile.userType} · {profile.field}</div>
          </div>
        </div>
        <div className="ct-detail">
          {[["User type", profile.userType], ["Field", profile.field], ["CGPA", profile.cgpa], ["Country", profile.country], ["Work style", profile.workStyle], ["Personality", profile.mbti]].map(([k, v]) => (
            <div className="ct-drow" key={k}><span style={{ color: "var(--muted)" }}>{k}</span><span style={{ fontWeight: 500 }}>{v || "—"}</span></div>
          ))}
        </div>
        <div style={{ marginTop: 18 }}>
          <div className="ct-small-title" style={{ marginBottom: 8 }}>Interests</div>
          <div className="ct-chips">{interests.map((x) => <span key={x} className="ct-chip sel" style={{ cursor: "default" }}>{x}</span>)}</div>
        </div>
        <div style={{ marginTop: 18 }}>
          <div className="ct-small-title" style={{ marginBottom: 8 }}>Resume / CV</div>
          {resume && (
            <div className="ct-thumb" onClick={viewResume}>
              {previewUrl && resume.type?.startsWith("image/") ? <img src={previewUrl} alt="resume preview" /> : previewUrl && resume.type === "application/pdf" ? <iframe src={previewUrl} title="resume preview" /> : <div className="ct-thumb-doc"><FileText size={34} color="var(--mint)" /><span>{resume.url ? "No inline preview — click to open" : "Preview not saved"}</span></div>}
            </div>
          )}
          <ResumeField resume={resume} onResume={onResume} viewResume={viewResume} />
        </div>
        <button className="ct-btn pri" style={{ width: "100%", justifyContent: "center", marginTop: 22 }} onClick={onEditProfile}><Pencil size={16} /> Edit full profile</button>
        <button className="ct-btn ghost" style={{ width: "100%", justifyContent: "center", marginTop: 10, fontSize: 13 }} onClick={onReset}>Reset profile & clear saved data</button>
      </div>
    </div>
  );
}
