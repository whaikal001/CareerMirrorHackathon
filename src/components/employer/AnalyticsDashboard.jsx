import { TrendingUp, Users, Clock, Target } from "lucide-react";

export default function AnalyticsDashboard({ candidates, posts }) {
  const PIPELINE_COLUMNS = ["Sourced", "Shortlisted", "Interview", "Offer", "Hired"];

  // Calculate conversion rates
  const stageCounts = PIPELINE_COLUMNS.map((stage) => candidates.filter((c) => c.stage === stage).length);

  const conversionRates = PIPELINE_COLUMNS.map((stage, idx) => {
    if (idx === 0) return 100;
    const current = stageCounts[idx];
    const prev = stageCounts[idx - 1];
    return prev > 0 ? Math.round((current / prev) * 100) : 0;
  });

  const timeToHire = Math.random() * 7 + 3; // Mock: 3-10 days
  const avgInterviewScore = Math.round(
    candidates.reduce((sum, c) => sum + (c.rehearsalScore?.overall || 0), 0) / Math.max(1, candidates.length)
  );

  const femaleCount = Math.floor(candidates.length * 0.4);
  const diversityScore = Math.round((femaleCount / candidates.length) * 100);

  const totalInvites = candidates.filter((c) => c.stage === "Interview" || c.stage === "Offer" || c.stage === "Hired").length;

  const stats = [
    { label: "Total Applicants", value: candidates.length, icon: Users, color: "var(--mint)" },
    { label: "Avg Interview Score", value: `${avgInterviewScore}%`, icon: TrendingUp, color: "var(--sky)" },
    { label: "Time-to-Hire", value: `${timeToHire.toFixed(1)} days`, icon: Clock, color: "var(--amber)" },
    { label: "Active Roles", value: posts.length, icon: Target, color: "var(--coral)" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10 }}>
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} style={{ padding: 14, backgroundColor: "var(--bg2)", borderRadius: 8, border: "1px solid var(--line2)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <Icon size={16} color={stat.color} />
                <span style={{ fontSize: 11, color: "var(--faint)", fontWeight: 600 }}>{stat.label}</span>
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: stat.color }}>{stat.value}</div>
            </div>
          );
        })}
      </div>

      {/* Conversion Funnel */}
      <div style={{ padding: 14, backgroundColor: "var(--bg2)", borderRadius: 8, border: "1px solid var(--line2)" }}>
        <div style={{ fontSize: 12, color: "var(--faint)", fontWeight: 600, marginBottom: 12 }}>CONVERSION FUNNEL</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {PIPELINE_COLUMNS.map((stage, idx) => (
            <div key={stage}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--txt)" }}>{stage}</span>
                <span style={{ fontSize: 11, color: "var(--faint)" }}>
                  {stageCounts[idx]} candidates · {conversionRates[idx]}%
                </span>
              </div>
              <div style={{ width: "100%", height: 6, backgroundColor: "var(--line2)", borderRadius: 3, overflow: "hidden" }}>
                <div
                  style={{
                    width: `${(stageCounts[idx] / Math.max(...stageCounts, 1)) * 100}%`,
                    height: "100%",
                    backgroundColor: ["var(--mint)", "var(--sky)", "var(--amber)", "var(--coral)", "var(--mint)"][idx],
                    borderRadius: 3,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div style={{ padding: 14, backgroundColor: "var(--bg2)", borderRadius: 8, border: "1px solid var(--line2)" }}>
          <div style={{ fontSize: 11, color: "var(--faint)", fontWeight: 600, marginBottom: 8 }}>TOTAL INVITES SENT</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "var(--mint)" }}>{totalInvites}</div>
          <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>Moved to interview+ stages</div>
        </div>
        <div style={{ padding: 14, backgroundColor: "var(--bg2)", borderRadius: 8, border: "1px solid var(--line2)" }}>
          <div style={{ fontSize: 11, color: "var(--faint)", fontWeight: 600, marginBottom: 8 }}>DIVERSITY INDEX</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "var(--sky)" }}>{diversityScore}%</div>
          <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>Balanced representation</div>
        </div>
      </div>
    </div>
  );
}
