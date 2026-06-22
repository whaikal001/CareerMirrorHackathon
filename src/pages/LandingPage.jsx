import { ArrowRight, Brain, Target, Briefcase } from "lucide-react";

const FEATURES = [
  { i: Brain, t: "AI Career Matching", d: "Find jobs and internships that match your skills and interests." },
  { i: Target, t: "Skill Gap Analysis", d: "Identify missing skills and create a personalized learning plan." },
  { i: Briefcase, t: "Opportunity Hub", d: "Explore companies and apply to suitable open positions." },
];

export default function LandingPage({ go }) {
  return (
    <div className="ct-screen" style={{ paddingTop: 70 }}>
      <div className="ct-eyebrow reveal">AI Career & Job Matching Platform</div>
      <h1 className="ct-h reveal" style={{ fontSize: 76, animationDelay: ".05s" }}>Your AI Career Twin.<br /><span style={{ color: "var(--mint)" }}>From Resume to Job Offer.</span></h1>
      <p className="ct-sub reveal" style={{ marginTop: 22, animationDelay: ".12s" }}>Upload your resume, discover career matches, identify skill gaps, receive personalized career roadmaps, and connect with job opportunities tailored to your profile.</p>
      <div className="reveal" style={{ marginTop: 34, display: "flex", gap: 12, alignItems: "center", animationDelay: ".2s" }}>
        <button className="ct-btn pri" onClick={() => go("profile")}>Discover My Career Match <ArrowRight size={18} /></button>
        <span className="ct-mono" style={{ fontSize: 13.5, color: "var(--faint)" }}>2-min demo</span>
      </div>
      <div className="ct-grid3 reveal" style={{ marginTop: 56, animationDelay: ".28s" }}>
        {FEATURES.map((x) => <div className="ct-card" key={x.t}><x.i size={26} color="var(--mint)" /><div style={{ fontWeight: 600, marginTop: 14, fontSize: 19 }}>{x.t}</div><div style={{ color: "var(--muted)", fontSize: 15.5, marginTop: 6 }}>{x.d}</div></div>)}
      </div>
    </div>
  );
}
