import { FileText, Eye, Upload } from "lucide-react";

export default function ResumeField({ resume, onResume, viewResume }) {
  if (resume) {
    return (
      <div className="ct-resume">
        <FileText size={18} color="var(--mint)" style={{ flex: "none" }} />
        <div style={{ minWidth: 0 }}>
          <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{resume.name}</div>
          <div className="ct-mono" style={{ fontSize: 11, color: "var(--faint)" }}>{resume.size}</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, flex: "none" }}>
          {resume.url && (
            <button className="ct-btn ghost" style={{ padding: "7px 11px", fontSize: 13 }} onClick={viewResume}>
              <Eye size={14} /> View
            </button>
          )}
          <label className="ct-btn ghost" style={{ padding: "7px 11px", fontSize: 13, cursor: "pointer" }}>
            <input type="file" accept=".pdf,.doc,.docx,image/*" hidden onChange={onResume} />
            Replace
          </label>
        </div>
      </div>
    );
  }

  return (
    <label className="ct-upload">
      <input type="file" accept=".pdf,.doc,.docx,image/*" hidden onChange={onResume} />
      <Upload size={18} /> <span>Attach your resume (PDF, DOC, DOCX)</span>
    </label>
  );
}
