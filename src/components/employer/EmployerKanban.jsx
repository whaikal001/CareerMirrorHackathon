import { useState } from "react";
import { BadgeCheck, Briefcase, GripVertical, Mail, Send, Award, Check } from "lucide-react";
import AutomationModal from "./AutomationModal";

const stageOrder = (columns, stage) => Math.max(0, columns.indexOf(stage));

export default function EmployerKanban({ candidates, columns, selectedId, onSelect, onMove, currentRole, onInvite, onNudge, invited, counts, blindMode, selectedIds, onBulkSelect }) {
  const [automationPending, setAutomationPending] = useState(null);

  const handleDragStart = (event, candidateId) => {
    // Only allow single card drag, even if bulk selected
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", candidateId);
    // Prevent drag ghost image showing multiple cards
    const img = new Image();
    event.dataTransfer.setDragImage(img, 0, 0);
  };

  const handleDrop = (event, stage) => {
    event.preventDefault();
    event.stopPropagation();
    const candidateId = event.dataTransfer.getData("text/plain");
    if (!candidateId) return;

    const candidate = candidates.find((c) => c.id === candidateId);
    if (!candidate) return;

    // Only move the single dragged card, not bulk selected
    if (stage === "Interview") {
      setAutomationPending({ candidateId, candidate, stage });
    } else {
      onMove(candidateId, stage);
    }
  };

  const handleAutomationConfirm = () => {
    if (automationPending) {
      onMove(automationPending.candidateId, automationPending.stage);
      setAutomationPending(null);
    }
  };

  const handleAutomationCancel = () => {
    setAutomationPending(null);
  };

  return (
    <>
      <div className="ct-kanban" style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}>
        {columns.map((stage) => {
          const cards = candidates.filter((candidate) => candidate.stage === stage);
          return (
            <div
              key={stage}
              className="ct-kcol"
              onDragOver={(event) => {
                event.preventDefault();
                event.stopPropagation();
                event.dataTransfer.dropEffect = "move";
              }}
              onDrop={(event) => {
                event.stopPropagation();
                handleDrop(event, stage);
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--mint)", flex: "none" }} />
                <span className="ct-small-title">{stage}</span>
                <span className="ct-mono" style={{ marginLeft: "auto", fontSize: 11, color: "var(--faint)" }}>{counts?.[stage] ?? cards.length}</span>
              </div>

              {cards.map((candidate) => {
                const isSelected = selectedIds?.includes(candidate.id);
                return (
                  <div
                    key={candidate.id}
                    className={`ct-kcard ${selectedId === candidate.id ? "sel" : ""}`}
                    draggable
                    onClick={(e) => {
                      if (e.ctrlKey || e.metaKey) {
                        e.stopPropagation();
                        onBulkSelect((prev) => 
                          prev.includes(candidate.id) 
                            ? prev.filter((id) => id !== candidate.id)
                            : [...prev, candidate.id]
                        );
                      } else {
                        onSelect(candidate.id);
                      }
                    }}
                    onDragStart={(event) => {
                      event.stopPropagation();
                      handleDragStart(event, candidate.id);
                    }}
                    style={{
                      borderColor: selectedId === candidate.id || isSelected ? "var(--mint)" : undefined,
                      boxShadow: selectedId === candidate.id || isSelected ? "0 0 0 1px var(--mint)" : undefined,
                      backgroundColor: isSelected ? "rgba(59, 210, 171, 0.05)" : undefined,
                    }}
                  >
                    {/* Bulk Select Checkbox */}
                    <div
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        width: 18,
                        height: 18,
                        borderRadius: 3,
                        border: `2px solid ${isSelected ? "var(--mint)" : "var(--line2)"}`,
                        backgroundColor: isSelected ? "var(--mint)" : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        zIndex: 10,
                      }}
                    >
                      {isSelected && <Check size={12} color="var(--on-mint)" />}
                    </div>

                    <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <GripVertical size={16} color="var(--faint)" style={{ flex: "none", marginTop: 2 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 14.5, lineHeight: 1.35 }}>
                          {blindMode ? `Candidate ${candidate.id.split("-")[1]}` : candidate.name}
                        </div>
                        <div style={{ color: "var(--muted)", fontSize: 12.8, marginTop: 3 }}>
                          {blindMode ? "Candidate Profile" : candidate.meta}
                        </div>
                      </div>
                      <span className="ct-chip sel" style={{ cursor: "default", fontSize: 11.8, padding: "4px 9px" }}>{candidate.score}%</span>
                    </div>

                    <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 6, lineHeight: 1.45 }}>{candidate.seeking}</div>

                    {candidate.rehearsalScore && (
                      <div style={{ marginTop: 8, padding: 8, backgroundColor: "var(--bg2)", borderRadius: 6, fontSize: 11 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                          <Award size={12} color="var(--sky)" />
                          <span style={{ fontWeight: 600 }}>Interview: {candidate.rehearsalScore.overall}%</span>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <div style={{ flex: 1, height: 4, backgroundColor: "var(--line2)", borderRadius: 2, overflow: "hidden" }}>
                              <div style={{ width: `${candidate.rehearsalScore.clarity}%`, height: "100%", backgroundColor: "var(--sky)", borderRadius: 2 }} />
                            </div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <div style={{ flex: 1, height: 4, backgroundColor: "var(--line2)", borderRadius: 2, overflow: "hidden" }}>
                              <div style={{ width: `${candidate.rehearsalScore.technicalDepth}%`, height: "100%", backgroundColor: "var(--mint)", borderRadius: 2 }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="ct-chips" style={{ marginTop: 9 }}>
                      {candidate.skills.slice(0, 3).map((skill) => (
                        <span className="ct-chip" key={skill} style={{ cursor: "default", fontSize: 12, padding: "4px 9px" }}>{skill}</span>
                      ))}
                    </div>

                    <select
                      className="ct-kstatus"
                      style={{ marginTop: 10 }}
                      value={candidate.stage}
                      onChange={(event) => onMove(candidate.id, event.target.value)}
                    >
                      {columns.map((stage) => (
                        <option key={stage} value={stage}>
                          {stage}
                        </option>
                      ))}
                    </select>

                    <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                      {!blindMode && <span className="ct-mono" style={{ fontSize: 12, color: "var(--faint)" }}>{candidate.location}</span>}
                      {candidate.stage === "Interview" && <span className="ct-mono" style={{ fontSize: 12, color: "var(--amber)" }}>Ready to rehearse</span>}
                    </div>

                    <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                      <button
                        className="ct-btn ghost"
                        style={{ padding: "7px 10px", fontSize: 12.5 }}
                        onClick={(event) => {
                          event.stopPropagation();
                          onSelect(candidate.id);
                        }}
                      >
                        <Briefcase size={13} /> Review
                      </button>
                      <button
                        className={`ct-btn ${invited?.includes(candidate.name) ? "ghost" : "pri"}`}
                        style={{ padding: "7px 10px", fontSize: 12.5 }}
                        onClick={(event) => {
                          event.stopPropagation();
                          onInvite(candidate);
                        }}
                        disabled={invited?.includes(candidate.name)}
                      >
                        {invited?.includes(candidate.name) ? (
                          <>
                            <Mail size={13} /> Invited
                          </>
                        ) : (
                          <>
                            <Send size={13} /> Invite
                          </>
                        )}
                      </button>
                      {onNudge && (
                        <button
                          className="ct-btn ghost"
                          style={{ padding: "7px 10px", fontSize: 12.5 }}
                          onClick={(event) => {
                            event.stopPropagation();
                            onNudge(candidate);
                          }}
                        >
                          <Send size={13} /> Nudge
                        </button>
                      )}
                    </div>

                    <div className="ct-knote">
                      Stage rank: {stageOrder(columns, candidate.stage) + 1}/{columns.length} · Optimized for {currentRole.title}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {automationPending && (
        <AutomationModal
          candidate={automationPending.candidate}
          stage={automationPending.stage}
          onConfirm={handleAutomationConfirm}
          onCancel={handleAutomationCancel}
        />
      )}
    </>
  );
}