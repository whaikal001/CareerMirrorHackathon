import { ArrowRight, Brain, Target, Briefcase, GraduationCap, Building2 } from "lucide-react";

const TESTIMONIALS = [
  { name: "Nadia H.", role: "Data Analyst", company: "PETRONAS Digital", quote: "The skill gap analysis told me exactly what to learn — I got an offer within two months." },
  { name: "Jian Wei O.", role: "Frontend Developer", company: "AirAsia Digital", quote: "Rehearsing interviews with Twin made the real one feel easy. The feedback was brutally specific." },
  { name: "Aina S.", role: "AI Engineer Intern", company: "TechNova AI", quote: "Seeing my two career paths side by side made the decision obvious. I stopped second-guessing." },
];

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
      <div className="reveal ct-grid2" style={{ marginTop: 34, maxWidth: 820, animationDelay: ".2s" }}>
        <div className="ct-card ct-path clickable" onClick={() => go("profile")}>
          <GraduationCap size={26} color="var(--mint)" />
          <div style={{ fontWeight: 700, fontSize: 21, marginTop: 12 }}>I'm Talent</div>
          <div style={{ color: "var(--muted)", fontSize: 15, marginTop: 6, lineHeight: 1.5 }}>Build your Career Twin, compare paths, rehearse interviews, and apply to matching roles.</div>
          <div style={{ color: "var(--mint)", fontWeight: 600, marginTop: 14, display: "flex", alignItems: "center", gap: 7 }}>Start as talent <ArrowRight size={16} /></div>
        </div>
        <div className="ct-card ct-path clickable" onClick={() => go("employer")}>
          <Building2 size={26} color="var(--sky)" />
          <div style={{ fontWeight: 700, fontSize: 21, marginTop: 12 }}>I'm an Employer</div>
          <div style={{ color: "var(--muted)", fontSize: 15, marginTop: 6, lineHeight: 1.5 }}>Post roles and discover verified early-career talent from local universities.</div>
          <div style={{ color: "var(--sky)", fontWeight: 600, marginTop: 14, display: "flex", alignItems: "center", gap: 7 }}>Hire talent <ArrowRight size={16} /></div>
        </div>
      </div>
      <div className="reveal ct-mono" style={{ marginTop: 16, fontSize: 13.5, color: "var(--faint)", animationDelay: ".24s" }}>2-min demo</div>
      <div className="ct-grid3 reveal" style={{ marginTop: 56, animationDelay: ".28s" }}>
        {FEATURES.map((x) => <div className="ct-card" key={x.t}><x.i size={26} color="var(--mint)" /><div style={{ fontWeight: 600, marginTop: 14, fontSize: 19 }}>{x.t}</div><div style={{ color: "var(--muted)", fontSize: 15.5, marginTop: 6 }}>{x.d}</div></div>)}
      </div>
      <div className="ct-grid3 reveal" style={{ marginTop: 26, animationDelay: ".34s" }}>
        {TESTIMONIALS.map((t) => <div className="ct-card" key={t.name} style={{ padding: 20 }}><div style={{ fontSize: 15, lineHeight: 1.55 }}>“{t.quote}”</div><div style={{ marginTop: 12, fontWeight: 600, fontSize: 14.5 }}>{t.name}</div><div style={{ color: "var(--muted)", fontSize: 13.5 }}>{t.role} · {t.company}</div></div>)}
      </div>
      <div className="reveal" style={{ marginTop: 26, animationDelay: ".4s" }}>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--faint)", marginBottom: 10 }}>Trusted across 6 sectors</div>
        <div className="ct-chips">{["Banking & Finance", "Technology", "Energy", "Telco", "FMCG", "Consulting"].map((s) => <span key={s} className="ct-chip" style={{ cursor: "default", fontSize: 13 }}>{s}</span>)}</div>
      </div>
    </div>
  );
}
