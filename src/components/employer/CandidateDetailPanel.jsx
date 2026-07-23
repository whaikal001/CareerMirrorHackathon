import React, { useMemo } from "react";
import { MessageSquare, X, Calendar, TrendingUp, Award } from "lucide-react";

export default function CandidateDetailPanel({ candidate, role, onClose, blindMode }) {
  const comments = useMemo(() => {
    try {
      const state = JSON.parse(localStorage.getItem("careertwin.employer.v1") || "{}");
      return state.candidateComments?.[candidate.id] || [];
    } catch {
      return [];
    }
  }, [candidate.id]);

  const handleAddComment = (text) => {
    try {
      const state = JSON.parse(localStorage.getItem("careertwin.employer.v1") || "{}");
      state.candidateComments = state.candidateComments || {};
      state.candidateComments[candidate.id] = state.candidateComments[candidate.id] || [];
      state.candidateComments[candidate.id].push({
        id: `comment-${Date.now()}`,
        text,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem("careertwin.employer.v1", JSON.stringify(state));
      window.location.reload();
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };

  if (!candidate) {
    return (
      <div
        style={{
          padding: 24,
          color: "var(--muted)",
          fontSize: 14.5,
          lineHeight: 1.55,
          textAlign: "center",
        }}
      >
        Select a candidate to view full details.
      </div>
    );
  }

  const stageProgress = {
    Sourced: 20,
    Shortlisted: 40,
    Interview: 60,
    Offer: 80,
    Hired: 100,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", maxHeight: "calc(100vh - 200px)", overflow: "auto" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 12, borderBottom: "1px solid var(--line)" }}>
        <h2 className="ct-serif" style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>
          Candidate Profile
        </h2>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          <X size={20} color="var(--faint)" />
        </button>
      </div>

      {/* Profile Info */}
      <div style={{ marginTop: 16, paddingBottom: 12, borderBottom: "1px solid var(--line)" }}>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
          <div className="ct-pfp" style={{ width: 56, height: 56, fontSize: 24, flex: "none", opacity: blindMode ? 0.5 : 1 }}>
            {blindMode ? "?" : (candidate.name.trim().charAt(0) || "U").toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 18, display: "flex", alignItems: "center", gap: 8 }}>
              {blindMode ? `Candidate ${candidate.id.split("-")[1]}` : candidate.name}
              <Award size={16} color="var(--mint)" />
            </div>
            <div style={{ color: "var(--muted)", fontSize: 13.5, marginTop: 2 }}>
              {blindMode ? "Candidate Profile" : candidate.meta}
            </div>
            <div style={{ color: "var(--faint)", fontSize: 12.5, marginTop: 4 }}>
              {!blindMode && `${candidate.location} · Applied: ${new Date().toLocaleDateString()}`}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14, paddingBottom: 12, borderBottom: "1px solid var(--line)" }}>
        <div style={{ padding: 10, backgroundColor: "var(--bg2)", borderRadius: 8 }}>
          <div style={{ fontSize: 12, color: "var(--faint)", marginBottom: 4 }}>Fit Score</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "var(--mint)" }}>{candidate.score}%</div>
        </div>
        <div style={{ padding: 10, backgroundColor: "var(--bg2)", borderRadius: 8 }}>
          <div style={{ fontSize: 12, color: "var(--faint)", marginBottom: 4 }}>Interview Ready</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "var(--sky)" }}>{candidate.rehearsalScore?.overall || "N/A"}%</div>
        </div>
      </div>

      {/* Stage Progress */}
      <div style={{ marginTop: 14, paddingBottom: 12, borderBottom: "1px solid var(--line)" }}>
        <div style={{ fontSize: 12, color: "var(--faint)", marginBottom: 6, fontWeight: 600 }}>PIPELINE PROGRESS</div>
        <div style={{ width: "100%", height: 6, backgroundColor: "var(--line2)", borderRadius: 3, overflow: "hidden" }}>
          <div
            style={{
              width: `${stageProgress[candidate.stage] || 20}%`,
              height: "100%",
              backgroundColor: "var(--mint)",
              transition: "width 0.3s ease",
            }}
          />
        </div>
        <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 6 }}>
          {candidate.stage} · Ready for next step
        </div>
      </div>

      {/* Skills & Strengths */}
      <div style={{ marginTop: 14, paddingBottom: 12, borderBottom: "1px solid var(--line)" }}>
        <div style={{ fontSize: 12, color: "var(--faint)", marginBottom: 8, fontWeight: 600 }}>TOP SKILLS</div>
        <div className="ct-chips" style={{ gap: 6, marginBottom: 12 }}>
          {candidate.skills.map((skill) => (
            <span key={skill} className="ct-chip" style={{ cursor: "default", fontSize: 12 }}>
              {skill}
            </span>
          ))}
        </div>
        <div style={{ fontSize: 12, color: "var(--faint)", marginBottom: 8, fontWeight: 600 }}>STRENGTHS</div>
        <div className="ct-chips" style={{ gap: 6 }}>
          {candidate.strengths.map((strength) => (
            <span key={strength} className="ct-chip sel" style={{ cursor: "default", fontSize: 12 }}>
              {strength}
            </span>
          ))}
        </div>
      </div>

      {/* Experience & Note */}
      <div style={{ marginTop: 14, paddingBottom: 12, borderBottom: "1px solid var(--line)" }}>
        <div style={{ fontSize: 12, color: "var(--faint)", marginBottom: 6, fontWeight: 600 }}>ABOUT</div>
        <div style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.55 }}>{candidate.note}</div>
        <div style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.55, marginTop: 10 }}>
          <b>Experience:</b> {candidate.experience}
        </div>
      </div>

      {/* Interview Readiness */}
      {candidate.rehearsalScore && (
        <div style={{ marginTop: 14, paddingBottom: 12, borderBottom: "1px solid var(--line)" }}>
          <div style={{ fontSize: 12, color: "var(--faint)", marginBottom: 8, fontWeight: 600 }}>INTERVIEW READINESS</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            <div style={{ padding: 10, backgroundColor: "var(--bg2)", borderRadius: 6, textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "var(--faint)", marginBottom: 4 }}>Clarity</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "var(--sky)" }}>
                {candidate.rehearsalScore.clarity}%
              </div>
            </div>
            <div style={{ padding: 10, backgroundColor: "var(--bg2)", borderRadius: 6, textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "var(--faint)", marginBottom: 4 }}>Technical</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "var(--mint)" }}>
                {candidate.rehearsalScore.technicalDepth}%
              </div>
            </div>
            <div style={{ padding: 10, backgroundColor: "var(--bg2)", borderRadius: 6, textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "var(--faint)", marginBottom: 4 }}>Overall</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "var(--amber)" }}>
                {candidate.rehearsalScore.overall}%
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comments Section */}
      <div style={{ marginTop: 14, flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 12, color: "var(--faint)", marginBottom: 8, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
          <MessageSquare size={14} /> TEAM NOTES ({comments.length})
        </div>
        <div style={{ flex: 1, overflow: "auto", marginBottom: 10 }}>
          {comments.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {comments.map((comment) => (
                <div key={comment.id} style={{ padding: 10, backgroundColor: "var(--bg2)", borderRadius: 6, borderLeft: "3px solid var(--mint)" }}>
                  <div style={{ fontSize: 12.5, lineHeight: 1.4, color: "var(--txt)" }}>{comment.text}</div>
                  <div style={{ fontSize: 11, color: "var(--faint)", marginTop: 4 }}>
                    {new Date(comment.timestamp).toLocaleDateString()} · {new Date(comment.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ color: "var(--faint)", fontSize: 13, fontStyle: "italic" }}>No notes yet. Add one below.</div>
          )}
        </div>
        <CommentInput onSubmit={handleAddComment} />
      </div>
    </div>
  );
}

function CommentInput({ onSubmit }) {
  const [text, setText] = React.useState("");
  return (
    <div style={{ display: "flex", gap: 6 }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a note..."
        style={{
          flex: 1,
          minHeight: 60,
          padding: 8,
          fontSize: 12.5,
          fontFamily: "JetBrains Mono",
          border: "1px solid var(--line2)",
          borderRadius: 6,
          backgroundColor: "var(--bg2)",
          color: "var(--txt)",
          boxSizing: "border-box",
          resize: "none",
        }}
      />
      <button
        onClick={() => {
          if (text.trim()) {
            onSubmit(text);
            setText("");
          }
        }}
        disabled={!text.trim()}
        className="ct-btn pri"
        style={{
          padding: "8px 12px",
          fontSize: 12,
          flex: "none",
          alignSelf: "flex-end",
          opacity: text.trim() ? 1 : 0.5,
          cursor: text.trim() ? "pointer" : "not-allowed",
        }}
      >
        Note
      </button>
    </div>
  );
}
