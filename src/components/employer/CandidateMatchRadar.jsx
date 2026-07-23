import { useMemo } from "react";
import { BadgeCheck, Briefcase, MapPin } from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";

const defaultData = [
  { trait: "Skills", v: 0 },
  { trait: "Experience", v: 0 },
  { trait: "Communication", v: 0 },
  { trait: "Culture", v: 0 },
  { trait: "Potential", v: 0 },
  { trait: "Readiness", v: 0 },
];

export default function CandidateMatchRadar({ candidate, role }) {
  const data = candidate?.radar?.length ? candidate.radar : defaultData;

  const roleSkills = useMemo(() => {
    const title = String(role?.title || "").toLowerCase();
    if (title.includes("ai") || title.includes("machine learning")) return ["Python", "Machine Learning", "SQL"];
    if (title.includes("data") || title.includes("analyst")) return ["SQL", "Python", "Power BI"];
    if (title.includes("web") || title.includes("frontend") || title.includes("ui")) return ["React", "JavaScript", "API Integration"];
    if (title.includes("security") || title.includes("cyber")) return ["Networking", "Linux", "Security Basics"];
    if (title.includes("cloud")) return ["AWS", "Docker", "Linux"];
    if (title.includes("product") || title.includes("business")) return ["Communication", "Figma", "Data Analysis"];
    if (title.includes("software") || title.includes("engineer") || title.includes("developer")) return ["Java", "SQL", "Problem Solving"];
    return ["Problem Solving", "Communication", "SQL"];
  }, [role?.title]);

  if (!candidate) {
    return (
      <div style={{ color: "var(--muted)", fontSize: 14.5, lineHeight: 1.55 }}>
        Select a candidate to see the explainable AI fit view.
      </div>
    );
  }

  return (
    <div>
      <div style={{ height: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="76%">
            <PolarGrid stroke="var(--line2)" />
            <PolarAngleAxis dataKey="trait" tick={{ fill: "var(--muted)", fontSize: 12.5, fontFamily: "JetBrains Mono" }} />
            <Radar dataKey="v" stroke="var(--mint)" fill="var(--mint)" fillOpacity={0.28} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="ct-chips" style={{ marginTop: 10 }}>
        <span className="ct-chip sel" style={{ cursor: "default" }}>
          <BadgeCheck size={12} style={{ marginRight: 5, display: "inline" }} /> {candidate.score}% fit
        </span>
        <span className="ct-chip" style={{ cursor: "default" }}>
          <Briefcase size={12} style={{ marginRight: 5, display: "inline" }} /> {role?.title || "Target role"}
        </span>
        <span className="ct-chip" style={{ cursor: "default" }}>
          <MapPin size={12} style={{ marginRight: 5, display: "inline" }} /> {role?.locn || "Malaysia"}
        </span>
      </div>

      <div style={{ marginTop: 14 }}>
        <div className="ct-small-title" style={{ marginBottom: 8 }}>Why the model likes this candidate</div>
        {candidate?.reasons?.length ? (
          <div className="ct-chips">
            {candidate.reasons.map((reason) => (
              <span key={reason} className="ct-chip" style={{ cursor: "default", fontSize: 13 }}>{reason}</span>
            ))}
          </div>
        ) : (
          <div style={{ color: "var(--muted)", fontSize: 14.5 }}>No explanation available.</div>
        )}
      </div>

      <div style={{ marginTop: 14 }}>
        <div className="ct-small-title" style={{ marginBottom: 8 }}>Role keywords matched</div>
        <div className="ct-chips">
          {roleSkills.map((skill) => (
            <span key={skill} className="ct-chip sel" style={{ cursor: "default", fontSize: 13 }}>{skill}</span>
          ))}
        </div>
      </div>
    </div>
  );
}