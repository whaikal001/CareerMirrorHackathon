import { ArrowRight, Sparkles, Building2 } from "lucide-react";
import { JOBS, COMPANIES, SECTORS } from "../data/careerData";

const TESTIMONIALS = [
  { name: "Nadia H.", role: "Data Analyst", company: "PETRONAS Digital", quote: "The skill gap analysis told me exactly what to learn — I got an offer within two months." },
  { name: "Jian Wei O.", role: "Frontend Developer", company: "AirAsia Digital", quote: "Rehearsing interviews with Twin made the real one feel easy. The feedback was brutally specific." },
  { name: "Aina S.", role: "AI Engineer Intern", company: "TechNova AI", quote: "Seeing my two career paths side by side made the decision obvious. I stopped second-guessing." },
];

const STRIP_EXTRA = [
  "Intel Malaysia", "Dell Technologies", "Samsung", "Siemens Malaysia", "HSBC", "Standard Chartered",
  "PwC Malaysia", "BMW Group", "DHL Express", "Unilever", "Sunway Group", "Touch 'n Go",
];

const HOW_IT_WORKS = [
  { n: "1", t: "We set you up in minutes", d: "Fill a short profile, drop your resume — your Career DNA and twin build themselves. No long forms." },
  { n: "2", t: "AI finds your matches", d: "Every role and company is scored against your DNA, with the reasons why — not keyword spam." },
  { n: "3", t: "Apply, rehearse, track", d: "One funnel for applications, AI interview rehearsal, and nudges at exactly the right moment." },
];

const SectionLabel = ({ children }) => (
  <div className="ct-small-title" style={{ color: "var(--amber)", marginBottom: 10 }}>{children}</div>
);

export default function LandingPage({ go, jobMatches, companyFits }) {
  const featured = COMPANIES.map((c) => ({ ...c, fit: companyFits?.[c.id] ?? c.compatibility })).sort((a, b) => b.fit - a.fit).slice(0, 4);
  const matched = JOBS.map((j) => ({ ...j, fit: jobMatches?.[j.id] ?? j.match })).sort((a, b) => b.fit - a.fit).slice(0, 3);

  return (
    <div className="ct-screen" style={{ paddingTop: 56 }}>
      {/* ---- Hero ---- */}
      <div className="ct-eyebrow reveal">— Malaysia's AI Career Platform</div>
      <div className="ct-pills reveal" style={{ animationDelay: ".04s" }}>
        <span className="ct-pill on">I'm looking for a job</span>
        <span className="ct-pill" onClick={() => go("employer")}>I'm hiring</span>
      </div>
      <h1 className="ct-h ct-serif reveal" style={{ fontSize: 62, marginTop: 22, animationDelay: ".08s" }}>
        Your AI Career Twin.<br /><span className="ct-accent">From resume to job offer.</span>
      </h1>
      <p className="ct-sub reveal" style={{ marginTop: 18, animationDelay: ".14s" }}>
        From <b className="ct-serif" style={{ fontStyle: "italic" }}>TechNova</b> to <b className="ct-serif" style={{ fontStyle: "italic" }}>PETRONAS</b> to <b className="ct-serif" style={{ fontStyle: "italic" }}>Maybank</b> — your next move starts across {COMPANIES.length} Malaysian employers, guided by AI.
      </p>
      <div className="ct-search reveal" style={{ marginTop: 26, animationDelay: ".2s" }}>
        <Sparkles size={17} color="var(--mint)" style={{ flex: "none" }} />
        <input placeholder='Try "graduate tech jobs above RM 4k"' onKeyDown={(e) => e.key === "Enter" && go("jobs")} />
        <button className="ct-btn pri" style={{ padding: "11px 22px", fontSize: 15, flex: "none" }} onClick={() => go("jobs")}>Search</button>
      </div>
      <div className="reveal" style={{ marginTop: 22, fontSize: 13.5, color: "var(--faint)", animationDelay: ".24s" }}>Trusted by candidates across Malaysia</div>
      <div className="reveal" style={{ marginTop: 14, borderTop: "1px solid var(--line)", paddingTop: 20, display: "flex", gap: 46, flexWrap: "wrap", animationDelay: ".26s" }}>
        {[[`${COMPANIES.length}`, "Leading companies"], [`${JOBS.length}+`, "Live roles"], [`${SECTORS.length}`, "Sectors"]].map(([n, d]) => (
          <div key={d}><div className="ct-serif" style={{ fontWeight: 700, fontSize: 32 }}>{n}</div><div style={{ color: "var(--muted)", fontSize: 13.5 }}>{d}</div></div>
        ))}
      </div>

      {/* ---- Trusted logo strip (marquee) ---- */}
      <div className="reveal" style={{ marginTop: 54, animationDelay: ".3s" }}>
        <div className="ct-small-title" style={{ textAlign: "center", marginBottom: 14 }}>Trusted by Malaysia's leading employers</div>
        <div className="ct-marquee">
          <div className="ct-marquee-track">
            {[0, 1].map((set) => (
              <div className="ct-marquee-set" key={set} aria-hidden={set === 1}>
                {[...COMPANIES.map((c) => c.name), ...STRIP_EXTRA].map((name) => (
                  <span key={name} className="ct-chip ct-serif" style={{ cursor: "default", fontSize: 13.5, fontWeight: 600 }}>{name}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---- How it works ---- */}
      <div className="reveal" style={{ marginTop: 64 }}>
        <SectionLabel>How it works</SectionLabel>
        <div className="ct-serif" style={{ fontSize: 34, fontWeight: 700 }}>We hold your hand, <span className="ct-accent">every step.</span></div>
        <div className="ct-card" style={{ marginTop: 22, padding: "30px 26px" }}>
          <div className="ct-grid3">
            {HOW_IT_WORKS.map((s) => (
              <div key={s.n} style={{ textAlign: "center", padding: "0 8px" }}>
                <div className="ct-serif" style={{ width: 46, height: 46, borderRadius: "50%", background: "var(--mint)", color: "var(--on-mint)", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 19, margin: "0 auto" }}>{s.n}</div>
                <div className="ct-serif" style={{ fontWeight: 700, fontSize: 18.5, marginTop: 14 }}>{s.t}</div>
                <div style={{ color: "var(--muted)", fontSize: 14.5, marginTop: 8, lineHeight: 1.55 }}>{s.d}</div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid var(--line)", marginTop: 26, paddingTop: 18, textAlign: "center", fontSize: 14.5, color: "var(--mint)", fontWeight: 600 }}>
            <Sparkles size={14} style={{ display: "inline", marginRight: 7 }} />Twin, your AI coach, stays with you at every step — ask anything, anytime.
          </div>
        </div>
      </div>

      {/* ---- Featured companies ---- */}
      <div className="reveal" style={{ marginTop: 64 }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 14, flexWrap: "wrap" }}>
          <div>
            <SectionLabel>Featured companies</SectionLabel>
            <div className="ct-serif" style={{ fontSize: 34, fontWeight: 700 }}>The most admired companies, <span className="ct-accent">all in one place.</span></div>
          </div>
          <button className="ct-btn ghost" style={{ padding: "11px 20px", fontSize: 14.5 }} onClick={() => go("companies")}>Browse all {COMPANIES.length} <ArrowRight size={15} /></button>
        </div>
        <div className="ct-grid4" style={{ marginTop: 22 }}>
          {featured.map((c, i) => (
            <div key={c.id} className="ct-card ct-path clickable" style={{ textAlign: "center", position: "relative", paddingTop: 34 }} onClick={() => go("companies")}>
              {i < 2 && <span className="ct-chip sel" style={{ position: "absolute", top: 12, left: 12, fontSize: 11.5, padding: "4px 10px" }}>✦ Picked for you</span>}
              <div className="ct-serif" style={{ width: 76, height: 76, margin: "0 auto", borderRadius: 16, background: "var(--surf2)", border: "1px solid var(--line)", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 14.5, padding: 6 }}>{c.name.split(" ")[0]}</div>
              <div className="ct-serif" style={{ fontWeight: 700, fontSize: 18, marginTop: 12 }}>{c.name}</div>
              <div style={{ color: "var(--muted)", fontSize: 13.5, marginTop: 3 }}>{c.industry}</div>
              <div style={{ color: "var(--faint)", fontSize: 13, marginTop: 3 }}>{c.location}</div>
              <div style={{ borderTop: "1px solid var(--line)", marginTop: 14, paddingTop: 11, fontWeight: 600, fontSize: 14 }}>{c.openJobs.length} roles open</div>
            </div>
          ))}
        </div>
      </div>

      {/* ---- Matched to you ---- */}
      <div className="reveal" style={{ marginTop: 64 }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 14, flexWrap: "wrap" }}>
          <div>
            <SectionLabel>Matched to you</SectionLabel>
            <div className="ct-serif" style={{ fontSize: 34, fontWeight: 700 }}>Roles Twin thinks <span className="ct-accent">you'll fit.</span></div>
          </div>
          <button className="ct-btn ghost" style={{ padding: "11px 20px", fontSize: 14.5 }} onClick={() => go("jobs")}>See all matches <ArrowRight size={15} /></button>
        </div>
        <div className="ct-grid3" style={{ marginTop: 22 }}>
          {matched.map((j) => (
            <div key={j.id} className="ct-card ct-path clickable" onClick={() => go("jobs")}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className="ct-pfp" style={{ width: 40, height: 40, fontSize: 16, borderRadius: 10 }}>{j.company.charAt(0)}</div>
                <span className="ct-chip sel" style={{ cursor: "default", fontSize: 12.5, padding: "4px 11px" }}>{j.fit}% fit</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: 17.5, marginTop: 12 }}>{j.title}</div>
              <div style={{ color: "var(--muted)", fontSize: 14 }}>{j.company}</div>
              <div className="ct-chips" style={{ marginTop: 12 }}>
                {[...j.requirements.slice(0, 2), j.location.split(" /")[0]].map((x) => <span key={x} className="ct-chip" style={{ cursor: "default", fontSize: 12.5, padding: "5px 11px" }}>{x}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---- Twin companion panel ---- */}
      <div className="reveal tw-grid" style={{ marginTop: 64, background: "#152238", borderRadius: 18, padding: "38px 34px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30, alignItems: "center" }}>
        <div>
          <div className="ct-small-title" style={{ color: "#d9a441" }}>✦ Twin · Your AI Career Companion</div>
          <div className="ct-serif" style={{ fontSize: 32, fontWeight: 700, color: "#eef2f6", marginTop: 12, lineHeight: 1.15 }}>
            Not a chatbot. A coach that <span className="ct-serif" style={{ fontStyle: "italic", color: "#d9a441" }}>knows your whole story.</span>
          </div>
          <p style={{ color: "#9fb0c5", fontSize: 15.5, lineHeight: 1.6, marginTop: 14 }}>
            Twin reads your profile, resume, skill gaps and applications, then guides every move — interview rehearsal, honest gap analysis, and the next role worth chasing.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap" }}>
            <button className="ct-btn" style={{ background: "#d9a441", color: "#152238" }} onClick={() => go("profile")}>Meet Twin</button>
            <button className="ct-btn" style={{ background: "transparent", color: "#eef2f6", border: "1px solid rgba(255,255,255,.25)" }} onClick={() => go("profile")}>Start free</button>
          </div>
        </div>
        <div style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 14, padding: 18 }}>
          <div className="ct-small-title" style={{ color: "#d9a441", marginBottom: 12 }}>Twin · Live</div>
          <div style={{ background: "rgba(255,255,255,.1)", borderRadius: "12px 12px 12px 4px", padding: "11px 14px", color: "#eef2f6", fontSize: 14, lineHeight: 1.5, maxWidth: "88%" }}>
            I've only done one project — am I even ready to apply for AI roles?
          </div>
          <div style={{ background: "rgba(217,164,65,.14)", border: "1px solid rgba(217,164,65,.3)", borderRadius: "12px 12px 4px 12px", padding: "11px 14px", color: "#eef2f6", fontSize: 14, lineHeight: 1.5, marginTop: 10, marginLeft: "12%" }}>
            Yes. Your Python + ML project already meets most internship requirements. One real gap — <b style={{ color: "#d9a441" }}>TensorFlow</b> — and a 2-week plan closes it. I'll add it to your roadmap.
          </div>
        </div>
      </div>

      {/* ---- Employer stories ---- */}
      <div className="reveal" style={{ marginTop: 64 }}>
        <SectionLabel>Graduate stories</SectionLabel>
        <div className="ct-serif" style={{ fontSize: 34, fontWeight: 700 }}>Hear it from <span className="ct-accent">the people inside.</span></div>
        <div className="ct-grid3" style={{ marginTop: 22 }}>
          {TESTIMONIALS.map((t) => (
            <div className="ct-card" key={t.name} style={{ padding: 22 }}>
              <span className="ct-chip ct-serif" style={{ cursor: "default", fontSize: 13, fontWeight: 600 }}>{t.company}</span>
              <div className="ct-serif" style={{ fontStyle: "italic", fontSize: 16.5, lineHeight: 1.55, marginTop: 14 }}>"{t.quote}"</div>
              <div style={{ marginTop: 14, fontWeight: 600, fontSize: 14.5 }}>{t.name}</div>
              <div style={{ color: "var(--muted)", fontSize: 13.5 }}>{t.role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ---- Final CTA ---- */}
      <div className="reveal" style={{ marginTop: 64, textAlign: "center", padding: "10px 0 20px" }}>
        <div className="ct-serif" style={{ fontSize: 36, fontWeight: 700 }}>Ready to meet <span className="ct-accent">your twin?</span></div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 22, flexWrap: "wrap" }}>
          <button className="ct-btn pri" onClick={() => go("profile")}>Create my Career Twin <ArrowRight size={17} /></button>
          <button className="ct-btn ghost" onClick={() => go("employer")}><Building2 size={17} /> I'm hiring talent</button>
        </div>
        <div className="ct-mono" style={{ marginTop: 16, fontSize: 12.5, color: "var(--faint)" }}>2-min demo · no sign-up</div>
      </div>
    </div>
  );
}
