import { Plus, Trash2, Edit2 } from "lucide-react";
import { useState } from "react";

export default function RoleManager({ posts, activeRoleIndex, onSelectRole, onAddRole, onDeleteRole }) {
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const handleAddRole = () => {
    if (newTitle.trim()) {
      onAddRole(newTitle);
      setNewTitle("");
      setShowForm(false);
    }
  };

  return (
    <div
      style={{
        padding: 14,
        backgroundColor: "var(--bg2)",
        borderRadius: 8,
        border: "1px solid var(--line2)",
        marginBottom: 14,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ fontSize: 12, color: "var(--faint)", fontWeight: 600 }}>ACTIVE ROLES</div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="ct-btn pri"
          style={{ padding: "6px 10px", fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}
        >
          <Plus size={13} /> New Role
        </button>
      </div>

      {showForm && (
        <div style={{ display: "flex", gap: 8, marginBottom: 10, padding: 10, backgroundColor: "var(--bg)", borderRadius: 6 }}>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddRole()}
            placeholder="Job title (e.g., AI Engineer)"
            style={{
              flex: 1,
              padding: "8px 10px",
              fontSize: 12.5,
              border: "1px solid var(--line2)",
              borderRadius: 6,
              backgroundColor: "var(--bg2)",
              color: "var(--txt)",
            }}
          />
          <button onClick={handleAddRole} className="ct-btn pri" style={{ padding: "8px 14px", fontSize: 12 }}>
            Create
          </button>
          <button
            onClick={() => setShowForm(false)}
            className="ct-btn ghost"
            style={{ padding: "8px 14px", fontSize: 12 }}
          >
            Cancel
          </button>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {posts.length > 0 ? (
          posts.map((role, idx) => (
            <div
              key={`${role.title}-${idx}`}
              onClick={() => onSelectRole(idx)}
              style={{
                padding: 10,
                backgroundColor: activeRoleIndex === idx ? "var(--mint)" : "var(--bg)",
                borderRadius: 6,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: activeRoleIndex === idx ? "1px solid var(--mint)" : "1px solid var(--line2)",
                transition: "all 0.2s",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: activeRoleIndex === idx ? "var(--on-mint)" : "var(--txt)",
                  }}
                >
                  {role.title}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: activeRoleIndex === idx ? "rgba(255,255,255,0.8)" : "var(--faint)",
                    marginTop: 2,
                  }}
                >
                  {role.type} · {role.locn}
                </div>
              </div>
              {posts.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteRole(idx);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 4,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Trash2 size={14} color={activeRoleIndex === idx ? "rgba(255,255,255,0.6)" : "var(--faint)"} />
                </button>
              )}
            </div>
          ))
        ) : (
          <div style={{ fontSize: 12, color: "var(--faint)", textAlign: "center", padding: 10 }}>
            No roles posted yet. Create one above.
          </div>
        )}
      </div>
    </div>
  );
}
