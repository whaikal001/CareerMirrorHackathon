import { Cpu, CheckCircle2, Circle } from "lucide-react";

export default function AnalyzingPage({ scanStep, extracted }) {
  const SCAN_STEPS = [
    "Analyzing resume and career profile",
    extracted?.length
      ? `Detected skills: ${extracted.slice(0, 4).map((s) => s.name).join(", ")}`
      : "Mapping skills to job requirements",
    "Generating career paths",
    "Preparing job and company matches",
  ];
  return (
    <div className="ct-screen" style={{ paddingTop: 90, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Cpu size={90} color="var(--mint)" className="spin" style={{ opacity: .9 }} />
      <h1 className="ct-h" style={{ fontSize: 36, marginTop: 28 }}>Building your Career Twin…</h1>
      <div className="ct-card" style={{ marginTop: 30, textAlign: "left", width: "100%", maxWidth: 500 }}>
        {SCAN_STEPS.map((s, i) => <div className="ct-scan" key={s} style={{ opacity: scanStep > i ? 1 : .35 }}>{scanStep > i ? <CheckCircle2 size={16} color="var(--mint)" /> : <Circle size={16} color="var(--faint)" className={scanStep === i ? "spin" : ""} />}{s}</div>)}
      </div>
    </div>
  );
}
