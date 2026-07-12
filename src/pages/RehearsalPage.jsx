import { useEffect, useRef, useState } from "react";
import { AlertTriangle, ArrowLeft, ArrowRight, ClipboardCheck, Lightbulb, Loader2, Mic, RotateCcw, WifiOff } from "lucide-react";
import ScoreRing from "../components/ScoreRing";
import { USE_LIVE_AI } from "../constants";
import { mockQuestions, mockReport, wait } from "../mockCoach";

const extractJson = (text) => {
  const t = String(text ?? "").trim().replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "").trim();
  try {
    return JSON.parse(t);
  } catch {
    const starts = [t.indexOf("{"), t.indexOf("[")].filter((i) => i >= 0);
    const a = starts.length ? Math.min(...starts) : -1;
    const b = Math.max(t.lastIndexOf("}"), t.lastIndexOf("]"));
    if (a < 0 || b <= a) throw new Error("No JSON found in the coach's response");
    return JSON.parse(t.slice(a, b + 1));
  }
};

const clamp = (n) => Math.max(0, Math.min(100, Math.round(Number(n) || 0)));

const normalizeQuestions = (raw, job) => {
  const arr = (Array.isArray(raw) ? raw : []).filter((q) => typeof q === "string" && q.trim()).map((q) => q.trim());
  if (!arr.length) throw new Error("The coach returned no usable questions");
  const five = arr.slice(0, 5);
  const pad = mockQuestions(job);
  while (five.length < 5) five.push(pad[five.length]);
  return five;
};

const normalizeReport = (raw, questions) => {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw new Error("The coach returned a malformed score report");
  const fb = Array.isArray(raw.feedback) ? raw.feedback : [];
  return {
    overall: clamp(raw.overall),
    scores: {
      clarity: clamp(raw.scores?.clarity),
      structure: clamp(raw.scores?.structure),
      technicalDepth: clamp(raw.scores?.technicalDepth),
    },
    feedback: questions.map((q, i) => ({
      question: q,
      improvement: String(fb[i]?.improvement || "").trim() || "No specific feedback returned for this answer.",
    })),
    summary: String(raw.summary || "").trim(),
  };
};

const callCoach = async (payload) => {
  const r = await fetch("/.netlify/functions/coach", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  let data;
  try {
    data = await r.json();
  } catch {
    throw new Error("Coach service is unreachable (run `npx netlify dev` locally)");
  }
  if (!r.ok || !data?.content) throw new Error(data?.error || "Coach service is unreachable");
  return data.content;
};

export default function RehearsalPage({ job, profile, interests, setRehearsalReport, go }) {
  const [phase, setPhase] = useState("loading");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(["", "", "", "", ""]);
  const [idx, setIdx] = useState(0);
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");
  const [offline, setOffline] = useState(false);
  const startedRef = useRef(false);
  const busyRef = useRef(false);
  const aliveRef = useRef(true);

  const loadQuestions = async () => {
    if (busyRef.current) return;
    busyRef.current = true;
    setPhase("loading");
    setError("");
    setOffline(false);
    try {
      let five;
      if (USE_LIVE_AI) {
        const content = await callCoach({
          mode: "generate_questions",
          job: { title: job.title, requirements: job.requirements || [] },
          profile: { name: profile.name, field: profile.field, userType: profile.userType },
          interests,
        });
        five = normalizeQuestions(extractJson(content), job);
      } else {
        await wait(700);
        five = mockQuestions(job);
      }
      if (aliveRef.current) {
        setQuestions(five);
        setPhase("answering");
      }
    } catch (e) {
      if (aliveRef.current) {
        setError(e.message);
        setPhase("error_questions");
      }
    } finally {
      busyRef.current = false;
    }
  };

  const submitAll = async () => {
    if (busyRef.current) return;
    busyRef.current = true;
    setPhase("scoring");
    setError("");
    try {
      let rep;
      if (USE_LIVE_AI) {
        const content = await callCoach({
          mode: "score_interview",
          job: { title: job.title, requirements: job.requirements || [] },
          profile: { name: profile.name, field: profile.field, userType: profile.userType },
          qa: questions.map((q, i) => ({ question: q, answer: answers[i].trim() || "(no answer provided)" })),
        });
        rep = normalizeReport(extractJson(content), questions);
      } else {
        await wait(900);
        rep = mockReport(job, questions, answers);
      }
      if (aliveRef.current) {
        setReport(rep);
        setRehearsalReport({ jobTitle: job.title, date: new Date().toLocaleDateString(), ...rep });
        setPhase("report");
      }
    } catch (e) {
      if (aliveRef.current) {
        setError(e.message);
        setPhase("error_scoring");
      }
    } finally {
      busyRef.current = false;
    }
  };

  const rehearseAgain = () => {
    setAnswers(["", "", "", "", ""]);
    setIdx(0);
    setReport(null);
    loadQuestions();
  };

  const practiceOffline = () => {
    setQuestions(mockQuestions(job));
    setAnswers(["", "", "", "", ""]);
    setIdx(0);
    setOffline(true);
    setPhase("answering");
  };

  useEffect(() => {
    aliveRef.current = true;
    if (!startedRef.current && job) {
      startedRef.current = true;
      loadQuestions();
    }
    return () => {
      aliveRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!job) {
    return (
      <div className="ct-screen" style={{ paddingTop: 30 }}>
        <div className="ct-eyebrow">Interview Rehearsal</div>
        <div className="ct-card" style={{ marginTop: 24, color: "var(--muted)" }}>No job selected for rehearsal. Pick one from the Jobs screen.</div>
        <div style={{ marginTop: 24 }}><button className="ct-btn ghost" onClick={() => go("jobs")}><ArrowLeft size={17} /> Back to jobs</button></div>
      </div>
    );
  }

  return (
    <div className="ct-screen" style={{ paddingTop: 30 }}>
      <div className="ct-eyebrow">Interview Rehearsal</div>
      <h1 className="ct-h" style={{ fontSize: 44 }}>Rehearse: {job.title}</h1>
      <p className="ct-sub" style={{ marginTop: 12 }}>Twin asks you 5 tailored interview questions, then scores your answers with feedback.</p>

      {(phase === "loading" || phase === "scoring") && (
        <div className="ct-card" style={{ marginTop: 24, display: "flex", gap: 14, alignItems: "center" }}>
          <Loader2 size={22} color="var(--mint)" className="spin" />
          <div style={{ color: "var(--muted)", fontSize: 16 }}>{phase === "loading" ? "Preparing your interview questions…" : "Twin is scoring your answers…"}</div>
        </div>
      )}

      {phase === "error_questions" && (
        <>
          <div className="ct-alert warn" style={{ marginTop: 24 }}>
            <AlertTriangle size={20} color="var(--coral)" />
            <div>
              <div style={{ fontWeight: 600, fontSize: 16.5 }}>Couldn't generate questions</div>
              <div style={{ color: "var(--muted)", fontSize: 15, marginTop: 4 }}>{error}</div>
            </div>
          </div>
          <div style={{ marginTop: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="ct-btn pri" onClick={loadQuestions}><RotateCcw size={17} /> Retry</button>
            <button className="ct-btn ghost" onClick={practiceOffline}><WifiOff size={17} /> Practice offline</button>
            <button className="ct-btn ghost" onClick={() => go("jobs")}><ArrowLeft size={17} /> Back to jobs</button>
          </div>
        </>
      )}

      {phase === "error_scoring" && (
        <>
          <div className="ct-alert warn" style={{ marginTop: 24 }}>
            <AlertTriangle size={20} color="var(--coral)" />
            <div>
              <div style={{ fontWeight: 600, fontSize: 16.5 }}>Scoring failed — your answers are safe</div>
              <div style={{ color: "var(--muted)", fontSize: 15, marginTop: 4 }}>{error}</div>
            </div>
          </div>
          <div style={{ marginTop: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="ct-btn pri" onClick={submitAll}><RotateCcw size={17} /> Retry scoring</button>
            <button className="ct-btn ghost" onClick={() => go("jobs")}><ArrowLeft size={17} /> Back to jobs</button>
          </div>
        </>
      )}

      {phase === "answering" && (
        <div className="ct-card" style={{ marginTop: 24 }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div className="ct-small-title" style={{ whiteSpace: "nowrap" }}>Question {idx + 1} of 5</div>
            <div className="ct-bar"><i style={{ width: `${((idx + 1) / 5) * 100}%` }} /></div>
            <div className="ct-mono" style={{ fontSize: 13, color: "var(--faint)" }}>{idx + 1}/5</div>
          </div>
          <div style={{ fontSize: 20, fontWeight: 600, marginTop: 18, lineHeight: 1.45 }}>{questions[idx]}</div>
          {job.requirements?.length > 0 && (
            <div className="ct-chips" style={{ marginTop: 14 }}>{job.requirements.map((s) => <span className="ct-chip" key={s} style={{ cursor: "default", fontSize: 13.5, padding: "6px 12px" }}>{s}</span>)}</div>
          )}
          {offline && <div className="ct-mono" style={{ fontSize: 12.5, color: "var(--faint)", marginTop: 12 }}>offline practice set · scoring still uses AI</div>}
          <div className="ct-field" style={{ marginTop: 16 }}>
            <label>Your answer</label>
            <textarea
              value={answers[idx]}
              onChange={(e) => setAnswers((a) => a.map((x, i) => (i === idx ? e.target.value : x)))}
              placeholder="Answer out loud first, then type the key points here…"
            />
          </div>
          <div style={{ marginTop: 18, display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <button className="ct-btn ghost" disabled={idx === 0} onClick={() => setIdx((i) => i - 1)}><ArrowLeft size={17} /> Previous</button>
            {idx < 4 ? (
              <button className="ct-btn pri" disabled={!answers[idx].trim()} onClick={() => setIdx((i) => i + 1)}>Next question <ArrowRight size={17} /></button>
            ) : (
              <button className="ct-btn pri" disabled={!answers[idx].trim()} onClick={submitAll}><ClipboardCheck size={17} /> Submit for scoring</button>
            )}
          </div>
        </div>
      )}

      {phase === "report" && report && (
        <>
          <div className="tw-grid" style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 20, marginTop: 26 }}>
            <div className="ct-card" style={{ textAlign: "center" }}>
              <ScoreRing value={report.overall} />
              <div style={{ display: "inline-flex", gap: 7, alignItems: "center", marginTop: 6, color: "var(--mint)", fontWeight: 600 }}><Mic size={16} /> Interview Score</div>
              {report.summary && <div style={{ color: "var(--muted)", fontSize: 14, marginTop: 6, lineHeight: 1.5 }}>{report.summary}</div>}
            </div>
            <div className="ct-card">
              <div className="ct-small-title" style={{ marginBottom: 14 }}>Category scores</div>
              {[["Clarity", report.scores.clarity], ["Structure", report.scores.structure], ["Technical depth", report.scores.technicalDepth]].map(([n, v]) => (
                <div className="ct-comp" key={n}>
                  <div style={{ width: 155, fontSize: 14.5, color: "var(--muted)" }}>{n}</div>
                  <div className="ct-bar"><i style={{ width: `${v}%` }} /></div>
                  <div className="ct-mono" style={{ fontSize: 13, width: 66, textAlign: "right", color: "var(--faint)" }}>{v}/100</div>
                </div>
              ))}
              <div style={{ color: "var(--muted)", fontSize: 14.5, marginTop: 10, lineHeight: 1.5 }}>Rehearsed for <b style={{ color: "var(--txt)" }}>{job.title}</b>{offline ? " · offline question set" : ""}.</div>
            </div>
          </div>
          <div className="ct-card" style={{ marginTop: 20 }}>
            <div className="ct-small-title" style={{ marginBottom: 6 }}>Per-question feedback</div>
            {report.feedback.map((f, i) => (
              <div key={i} style={{ padding: "14px 0", borderBottom: i < report.feedback.length - 1 ? "1px solid var(--line)" : "none" }}>
                <div style={{ fontWeight: 600, fontSize: 15.5, lineHeight: 1.4 }}>Q{i + 1}. {f.question}</div>
                <div style={{ display: "flex", gap: 8, marginTop: 7, color: "var(--muted)", fontSize: 14.5, lineHeight: 1.5 }}><Lightbulb size={15} color="var(--amber)" style={{ flex: "none", marginTop: 3 }} />{f.improvement}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
            <button className="ct-btn pri" onClick={rehearseAgain}><RotateCcw size={17} /> Rehearse again</button>
            <button className="ct-btn ghost" onClick={() => go("jobs")}><ArrowLeft size={17} /> Back to jobs</button>
          </div>
        </>
      )}
    </div>
  );
}
