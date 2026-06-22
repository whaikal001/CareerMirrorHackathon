import { ArrowLeft, Target } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function TimelinePage({ picked, go }) {
  return (
    <div className="ct-screen" style={{ paddingTop: 30 }}>
      <div className="ct-eyebrow">Career Timeline · {picked.title}</div>
      <h1 className="ct-h" style={{ fontSize: 44 }}>Your possible career path</h1>
      <div className="ct-card" style={{ marginTop: 22 }}>
        <div className="ct-small-title" style={{ marginBottom: 8 }}>Projected income (RM '000 / month)</div>
        <div style={{ height: 240 }}><ResponsiveContainer width="100%" height="100%"><AreaChart data={picked.line} margin={{ left: -18, right: 8, top: 8 }}><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--mint)" stopOpacity={0.5} /><stop offset="100%" stopColor="var(--mint)" stopOpacity={0} /></linearGradient></defs><CartesianGrid stroke="var(--line)" vertical={false} /><XAxis dataKey="age" tick={{ fill: "var(--muted)", fontSize: 13.5, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} tickFormatter={(a) => "age " + a} /><YAxis tick={{ fill: "var(--muted)", fontSize: 13.5, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} /><Tooltip contentStyle={{ background: "var(--surf)", border: "1px solid var(--line2)", color: "var(--txt)", borderRadius: 10, fontFamily: "JetBrains Mono", fontSize: 13 }} /><Area type="monotone" dataKey="s" stroke="var(--mint)" strokeWidth={2.5} fill="url(#g)" /></AreaChart></ResponsiveContainer></div>
      </div>
      <div className="ct-tl" style={{ marginTop: 18 }}>{picked.timeline.map((t) => <div className="ct-card" key={t.age}><div className="ct-age">{t.age}</div><div style={{ fontWeight: 600, fontSize: 16.5, marginTop: 6 }}>{t.role}</div><div className="ct-mono" style={{ color: "var(--mint)", fontSize: 14.5, marginTop: 4 }}>{t.sal}/mo</div><div style={{ color: "var(--muted)", fontSize: 14, marginTop: 8 }}>{t.skill}</div><div style={{ marginTop: 8, fontSize: 13, color: t.risk === "High" ? "var(--coral)" : t.risk === "Medium" ? "var(--amber)" : "var(--mint)" }}>Risk: {t.risk}</div></div>)}</div>
      <div style={{ marginTop: 24, display: "flex", gap: 12 }}><button className="ct-btn ghost" onClick={() => go("twin")}><ArrowLeft size={17} /> Paths</button><button className="ct-btn pri" onClick={() => go("skillgap")}><Target size={17} /> Analyze skill gap</button></div>
    </div>
  );
}
