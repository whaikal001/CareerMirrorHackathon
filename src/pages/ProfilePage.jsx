import { ArrowLeft, Sparkles } from "lucide-react";
import ResumeField from "../components/ResumeField";

const INTEREST_OPTIONS = ["AI", "Web Development", "Building", "Security", "Design", "Leadership", "Research", "Finance"];

export default function ProfilePage({ profile, setField, interests, toggleInterest, resume, onResume, viewResume, go }) {
  return (
    <div className="ct-screen" style={{ paddingTop: 30 }}>
      <div className="ct-eyebrow">Step 1 — Career Profile Engine</div>
      <h1 className="ct-h" style={{ fontSize: 48 }}>Build your Career DNA</h1>
      <p className="ct-sub" style={{ marginTop: 12 }}>Tell us about you. CareerTwin uses this profile to recommend jobs, companies, and roadmaps.</p>
      <div className="ct-card" style={{ marginTop: 26 }}>
        <div className="ct-grid2">
          <div className="ct-field"><label>FULL NAME</label><input value={profile.name} onChange={setField("name")} /></div>
          <div className="ct-field"><label>AGE</label><input value={profile.age} onChange={setField("age")} /></div>
          <div className="ct-field"><label>USER TYPE</label><select value={profile.userType} onChange={setField("userType")}><option>Internship Seeker</option><option>Fresh Graduate</option><option>Job Seeker</option><option>Working Professional</option><option>Career Changer</option></select></div>
          <div className="ct-field"><label>FIELD OF STUDY / WORK</label><input value={profile.field} onChange={setField("field")} /></div>
          <div className="ct-field"><label>CGPA / PERFORMANCE</label><input value={profile.cgpa} onChange={setField("cgpa")} /></div>
          <div className="ct-field"><label>COUNTRY</label><input value={profile.country} onChange={setField("country")} /></div>
          <div className="ct-field"><label>WORK STYLE</label><select value={profile.workStyle} onChange={setField("workStyle")}><option>Remote-first</option><option>Hybrid</option><option>On-site</option></select></div>
          <div className="ct-field"><label>PERSONALITY</label><select value={profile.mbti} onChange={setField("mbti")}><option>INTJ</option><option>ENTP</option><option>INTP</option><option>ENTJ</option><option>ENFP</option><option>ISFJ</option></select></div>
        </div>
        <div className="ct-field" style={{ marginTop: 16 }}>
          <label>INTERESTS</label>
          <div className="ct-chips">{INTEREST_OPTIONS.map((x) => <span key={x} className={`ct-chip ${interests.includes(x) ? "sel" : ""}`} onClick={() => toggleInterest(x)}>{x}</span>)}</div>
        </div>
        <div className="ct-field" style={{ marginTop: 16 }}><label>RESUME / CV</label><ResumeField resume={resume} onResume={onResume} viewResume={viewResume} /></div>
      </div>
      <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
        <button className="ct-btn ghost" onClick={() => go("landing")}><ArrowLeft size={17} /> Back</button>
        <button className="ct-btn pri" onClick={() => go("analyzing")}><Sparkles size={17} /> Generate my Twin</button>
      </div>
    </div>
  );
}
