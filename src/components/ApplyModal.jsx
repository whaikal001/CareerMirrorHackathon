import { CheckCircle2 } from "lucide-react";

export default function ApplyModal({ applyModal, onClose, go }) {
  return (
    <div className="ct-overlay" onClick={onClose} style={{ justifyContent: "center", alignItems: "center" }}>
      <div className="ct-modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div className="ct-avatar" style={{ animation: "none" }}><CheckCircle2 size={25} /></div>
          <div>
            <div style={{ fontFamily: "Bricolage Grotesque", fontWeight: 700, fontSize: 25 }}>{applyModal.alreadyApplied ? "Already Applied" : "Application Submitted"}</div>
            <div style={{ color: "var(--muted)", marginTop: 4 }}>Your profile has been sent successfully.</div>
          </div>
        </div>
        <div className="ct-card" style={{ marginTop: 22, padding: 18 }}>
          <div className="ct-drow"><span style={{ color: "var(--muted)" }}>Position</span><b>{applyModal.role}</b></div>
          <div className="ct-drow"><span style={{ color: "var(--muted)" }}>Company</span><b>{applyModal.company}</b></div>
          <div className="ct-drow"><span style={{ color: "var(--muted)" }}>Status</span><b style={{ color: "var(--mint)" }}>Applied</b></div>
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 22 }}>
          <button className="ct-btn ghost" style={{ flex: 1, justifyContent: "center" }} onClick={onClose}>Continue Exploring</button>
          <button className="ct-btn pri" style={{ flex: 1, justifyContent: "center" }} onClick={() => { onClose(); go("dashboard"); }}>View Applications</button>
        </div>
      </div>
    </div>
  );
}
