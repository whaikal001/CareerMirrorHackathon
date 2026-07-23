import { useState } from "react";
import { Check, Send, Trash2 } from "lucide-react";

export default function BulkActions({ candidates, selectedCandidates, onBulkInvite, onBulkMove, onBulkDelete }) {
  const [moveStage, setMoveStage] = useState("");
  const PIPELINE_COLUMNS = ["Sourced", "Shortlisted", "Interview", "Offer", "Hired"];

  if (selectedCandidates.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        padding: 12,
        backgroundColor: "var(--mint)",
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        gap: 12,
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      <div style={{ color: "var(--on-mint)", fontWeight: 600, fontSize: 13 }}>
        {selectedCandidates.length} candidate{selectedCandidates.length !== 1 ? "s" : ""} selected
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <button
          onClick={() => onBulkInvite(selectedCandidates)}
          className="ct-btn"
          style={{
            padding: "8px 12px",
            fontSize: 12.5,
            backgroundColor: "var(--on-mint)",
            color: "var(--mint)",
            fontWeight: 600,
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Send size={14} /> Send Bulk Invite
        </button>

        <select
          value={moveStage}
          onChange={(e) => {
            if (e.target.value) {
              onBulkMove(selectedCandidates, e.target.value);
              setMoveStage("");
            }
          }}
          style={{
            padding: "8px 10px",
            fontSize: 12.5,
            backgroundColor: "var(--on-mint)",
            color: "var(--mint)",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          <option value="">Move to stage...</option>
          {PIPELINE_COLUMNS.map((stage) => (
            <option key={stage} value={stage}>
              Move to {stage}
            </option>
          ))}
        </select>

        <button
          onClick={() => onBulkDelete(selectedCandidates)}
          className="ct-btn"
          style={{
            padding: "8px 12px",
            fontSize: 12.5,
            backgroundColor: "rgba(255,255,255,0.2)",
            color: "var(--on-mint)",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Trash2 size={14} /> Remove
        </button>
      </div>
    </div>
  );
}
