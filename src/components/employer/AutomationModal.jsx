import { useState } from "react";
import { X, Send, CheckCircle } from "lucide-react";

export default function AutomationModal({ candidate, stage, onConfirm, onCancel }) {
  const [message, setMessage] = useState(
    `Hi ${candidate.name}, your profile looks great. Please pick an interview time here: https://calendly.com/careertwin/interview`
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendAndMove = async () => {
    setIsSubmitting(true);
    try {
      const existingState = JSON.parse(localStorage.getItem("careertwin.v2") || "{}");
      const automationNotification = {
        id: `automation-${Date.now()}`,
        text: message,
        type: "interview_invite",
        candidate: candidate.name,
        stage: stage,
        timestamp: new Date().toISOString(),
      };
      existingState.automations = existingState.automations || [];
      existingState.automations.push(automationNotification);
      localStorage.setItem("careertwin.v2", JSON.stringify(existingState));
      onConfirm();
    } catch (err) {
      console.error("Failed to send automation", err);
      onCancel();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: 16,
      }}
      onClick={onCancel}
    >
      <div
        className="ct-card"
        style={{
          maxWidth: 480,
          width: "100%",
          maxHeight: "90vh",
          overflow: "auto",
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <CheckCircle size={22} color="var(--mint)" style={{ flex: "none" }} />
            <h2 className="ct-serif" style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Automated Action</h2>
          </div>
          <button
            onClick={onCancel}
            disabled={isSubmitting}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: isSubmitting ? "not-allowed" : "pointer",
              opacity: isSubmitting ? 0.5 : 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={20} color="var(--faint)" />
          </button>
        </div>

        <div style={{ color: "var(--muted)", fontSize: 14.5, lineHeight: 1.55 }}>
          {`Moving ${candidate.name} to Interview stage will trigger an automated invite email.`}
        </div>

        <div style={{ borderTop: "1px solid var(--line)", paddingTop: 12 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--txt)", marginBottom: 8 }}>
            Interview Invite Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isSubmitting}
            style={{
              width: "100%",
              minHeight: 120,
              padding: 12,
              fontSize: 14,
              fontFamily: "JetBrains Mono",
              lineHeight: 1.5,
              border: "1px solid var(--line2)",
              borderRadius: 8,
              backgroundColor: "var(--bg2)",
              color: "var(--txt)",
              boxSizing: "border-box",
              resize: "vertical",
              opacity: isSubmitting ? 0.6 : 1,
              cursor: isSubmitting ? "not-allowed" : "auto",
            }}
            placeholder="Enter interview invite message..."
          />
          <div style={{ fontSize: 12, color: "var(--faint)", marginTop: 6 }}>
            This message will be sent to the candidate's notifications.
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, borderTop: "1px solid var(--line)", paddingTop: 16 }}>
          <button
            onClick={onCancel}
            disabled={isSubmitting}
            className="ct-btn ghost"
            style={{
              flex: 1,
              padding: "12px 16px",
              fontSize: 14.5,
              fontWeight: 600,
              opacity: isSubmitting ? 0.5 : 1,
              cursor: isSubmitting ? "not-allowed" : "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSendAndMove}
            disabled={isSubmitting || !message.trim()}
            className="ct-btn pri"
            style={{
              flex: 1,
              padding: "12px 16px",
              fontSize: 14.5,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              opacity: isSubmitting || !message.trim() ? 0.5 : 1,
              cursor: isSubmitting || !message.trim() ? "not-allowed" : "pointer",
            }}
          >
            {isSubmitting ? (
              <>
                <div
                  style={{
                    width: 14,
                    height: 14,
                    border: "2px solid var(--on-pri)",
                    borderTopColor: "transparent",
                    borderRadius: "50%",
                    animation: "spin 0.6s linear infinite",
                  }}
                />
                Sending...
              </>
            ) : (
              <>
                <Send size={16} /> Send & Move
              </>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
