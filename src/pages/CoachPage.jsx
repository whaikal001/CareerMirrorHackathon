import { useState } from "react";
import { ArrowLeft, Activity, Sparkles, Send } from "lucide-react";
import { COACH_QS } from "../data/careerData";

export default function CoachPage({ chat, chatRef, ask, go, typing }) {
  const [draft, setDraft] = useState("");
  const send = () => {
    const t = draft.trim();
    if (!t || typing) return;
    ask(t);
    setDraft("");
  };
  return (
    <div className="ct-screen" style={{ paddingTop: 30 }}>
      <div className="ct-eyebrow">AI Career Coach</div>
      <h1 className="ct-h" style={{ fontSize: 44 }}>Meet Twin</h1>
      <div className="ct-card" style={{ marginTop: 22 }}>
        <div style={{ display: "flex", gap: 14, alignItems: "center", paddingBottom: 16, borderBottom: "1px solid var(--line)", marginBottom: 16 }}><div className="ct-avatar"><Sparkles size={22} /></div><div><div style={{ fontWeight: 600, fontSize: 17 }}>Twin · AI Career Coach</div><div className="ct-mono" style={{ fontSize: 12.5, color: "var(--mint)" }}>● online · job seeker mode</div></div></div>
        <div className="ct-chat" ref={chatRef}>
          {chat.map((m, i) => <div key={i} className={`ct-msg ${m.from}`}>{m.t}</div>)}
          {typing && <div className="ct-msg bot" style={{ color: "var(--muted)", fontStyle: "italic" }}>Twin is typing…</div>}
        </div>
        <div className="ct-chips" style={{ marginTop: 16 }}>{COACH_QS.map((q) => <span key={q} className="ct-chip" onClick={() => !typing && ask(q)} style={{ borderColor: "var(--mint-dim)" }}><Send size={12} style={{ marginRight: 5, display: "inline" }} />{q}</span>)}</div>
        <div className="ct-field" style={{ display: "flex", gap: 10, marginTop: 14 }}>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask Twin anything about your career…"
            style={{ flex: 1 }}
          />
          <button className="ct-btn pri" style={{ padding: "12px 18px", flex: "none" }} onClick={send} disabled={!draft.trim() || typing}><Send size={16} /></button>
        </div>
      </div>
      <div style={{ marginTop: 24, display: "flex", gap: 12 }}><button className="ct-btn ghost" onClick={() => go("companies")}><ArrowLeft size={17} /> Companies</button><button className="ct-btn pri" onClick={() => go("dashboard")}><Activity size={17} /> View dashboard</button></div>
    </div>
  );
}
