import { ArrowLeft, Target, ShieldAlert, Zap } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { PATHS, SALARY_SOURCE } from "../data/careerData";
import { DEFAULT_TOGGLES, applyWhatIf, summarize, formatMil } from "../whatif";

const TOGGLE_DEFS = [
  { key: "masters", label: "Master's degree (2 yrs)", note: "Two study years at reduced income, then a +18% qualification premium from age 28." },
  { key: "singapore", label: "Move to Singapore", note: "SG package shown as RM equivalent: +45% from age 26 (cost of living not included)." },
  { key: "freelance", label: "Freelance at 30", note: "Shaded band after 30: -10% floor to +25% upside, showing income volatility." },
  { key: "pivot", label: "Career pivot at 35", note: "-20% dip at 35 while switching, then steeper +8%/yr growth after." },
];

const riskColor = (r) => (r === "High" ? "var(--coral)" : r === "Medium" ? "var(--amber)" : "var(--mint)");
const tick = { fill: "var(--muted)", fontSize: 13, fontFamily: "JetBrains Mono" };

export default function WhatIfPage({ picked, whatIf, setWhatIf, go }) {
  const stored = whatIf || {};
  const aId = PATHS.some((p) => p.id === stored.aId) ? stored.aId : picked.id;
  const nextBest = PATHS.filter((p) => p.id !== aId).sort((x, y) => y.match - x.match)[0];
  const bId = stored.bId && stored.bId !== aId && PATHS.some((p) => p.id === stored.bId) ? stored.bId : nextBest.id;
  const toggles = { ...DEFAULT_TOGGLES, ...(stored.toggles || {}) };
  const pathA = PATHS.find((p) => p.id === aId);
  const pathB = PATHS.find((p) => p.id === bId);

  const save = (patch) => setWhatIf({ aId, bId, toggles, ...patch });
  const pick = (side) => (e) => {
    const id = e.target.value;
    if (side === "a") save(id === bId ? { aId: id, bId: aId } : { aId: id });
    else save(id === aId ? { bId: id, aId: bId } : { bId: id });
  };
  const flip = (key) => save({ toggles: { ...toggles, [key]: !toggles[key] } });

  const A = applyWhatIf(pathA.line, toggles);
  const B = applyWhatIf(pathB.line, toggles);
  const data = A.map((p, i) => ({ age: p.age, a: p.s, b: B[i].s, aBand: p.band, bBand: B[i].band }));
  const sum = summarize(pathA, pathB, toggles);
  const activeNotes = TOGGLE_DEFS.filter((t) => toggles[t.key]);

  return (
    <div className="ct-screen" style={{ paddingTop: 30 }}>
      <div className="ct-eyebrow">What-If Simulator</div>
      <h1 className="ct-h" style={{ fontSize: 44 }}>What-if career simulator</h1>
      <p className="ct-sub" style={{ marginTop: 12 }}>Compare two paths side by side, then flip life decisions on and off to watch both income curves react.</p>

      <div className="ct-card" style={{ marginTop: 24, padding: 18, display: "flex", gap: 14, flexWrap: "wrap" }}>
        <div className="ct-field" style={{ flex: "1 1 220px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: 7 }}><span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--mint)", flex: "none" }} />PATH A</label>
          <select value={aId} onChange={pick("a")}>{PATHS.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}</select>
        </div>
        <div className="ct-field" style={{ flex: "1 1 220px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: 7 }}><span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--sky)", flex: "none" }} />PATH B</label>
          <select value={bId} onChange={pick("b")}>{PATHS.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}</select>
        </div>
      </div>

      <div className="ct-card" style={{ marginTop: 18 }}>
        <div className="ct-small-title" style={{ marginBottom: 8 }}>Projected income (RM '000 / month)</div>
        <div style={{ height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ left: -12, right: 10, top: 8 }}>
              <CartesianGrid stroke="var(--line)" vertical={false} />
              <XAxis dataKey="age" type="number" domain={[23, 45]} ticks={[23, 26, 29, 32, 35, 38, 41, 45]} tick={tick} axisLine={false} tickLine={false} tickFormatter={(a) => `age ${a}`} />
              <YAxis tick={tick} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}k`} />
              <Tooltip
                contentStyle={{ background: "var(--surf)", border: "1px solid var(--line2)", color: "var(--txt)", borderRadius: 10, fontFamily: "JetBrains Mono", fontSize: 13 }}
                formatter={(v, name) => [`RM ${Number(v).toFixed(1)}k /mo`, name]}
                labelFormatter={(a) => `Age ${a}`}
              />
              <Legend formatter={(v) => <span style={{ color: "var(--muted)", fontFamily: "Outfit", fontSize: 14 }}>{v}</span>} />
              {toggles.freelance && <Area dataKey="aBand" stroke="none" fill="var(--mint)" fillOpacity={0.13} legendType="none" tooltipType="none" isAnimationActive={false} />}
              {toggles.freelance && <Area dataKey="bBand" stroke="none" fill="var(--sky)" fillOpacity={0.13} legendType="none" tooltipType="none" isAnimationActive={false} />}
              <Area type="monotone" dataKey="a" name={pathA.title} stroke="var(--mint)" strokeWidth={2.5} fill="var(--mint)" fillOpacity={0.08} />
              <Area type="monotone" dataKey="b" name={pathB.title} stroke="var(--sky)" strokeWidth={2.5} fill="var(--sky)" fillOpacity={0.08} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div style={{ fontSize: 11.5, color: "var(--faint)", marginTop: 6 }}>{SALARY_SOURCE}</div>
        <div className="ct-chips" style={{ marginTop: 14 }}>
          {TOGGLE_DEFS.map((t) => <span key={t.key} className={`ct-chip ${toggles[t.key] ? "sel" : ""}`} onClick={() => flip(t.key)}>{t.label}</span>)}
        </div>
        {activeNotes.length > 0 && (
          <div className="ct-chips" style={{ marginTop: 10 }}>
            {activeNotes.map((t) => <span key={t.key} className="ct-chip" style={{ cursor: "default", fontSize: 12.5, color: "var(--faint)", borderStyle: "dashed" }}>{t.note}</span>)}
          </div>
        )}
      </div>

      <div className="ct-grid2" style={{ marginTop: 18 }}>
        <div className="ct-card">
          <div className="ct-small-title" style={{ marginBottom: 10 }}>Cumulative earnings by 45</div>
          {[[pathA.title, sum.cumA, "var(--mint)"], [pathB.title, sum.cumB, "var(--sky)"]].map(([t, c, col]) => (
            <div key={t} className="ct-drow">
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 9, height: 9, borderRadius: "50%", background: col, flex: "none" }} />{t}</span>
              <b className="ct-mono" style={{ fontSize: 15 }}>{formatMil(c)}</b>
            </div>
          ))}
          <div style={{ marginTop: 14, color: "var(--muted)", fontSize: 14.5 }}>Difference: <b style={{ color: "var(--txt)" }}>{sum.diffLabel}</b> in favour of <b style={{ color: "var(--txt)" }}>{sum.winner}</b></div>
          <div style={{ marginTop: 12 }}>
            {sum.stageWins.map((w) => (
              <div key={w.label} style={{ display: "flex", justifyContent: "space-between", fontSize: 14.5, padding: "8px 0", borderTop: "1px solid var(--line)" }}>
                <span style={{ color: "var(--muted)" }}>{w.label}</span><span>{w.winner} leads</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ct-card">
          <div className="ct-small-title" style={{ marginBottom: 10 }}>Automation risk</div>
          {[pathA, pathB].map((p) => (
            <div key={p.id} className="ct-drow">
              <span>{p.title}</span>
              <span style={{ color: riskColor(p.risk.automation), fontWeight: 600, display: "flex", gap: 6, alignItems: "center" }}><ShieldAlert size={15} />{p.risk.automation}</span>
            </div>
          ))}
          <div className="ct-alert" style={{ marginTop: 16 }}>
            <Zap size={18} color="var(--mint)" style={{ flex: "none", marginTop: 2 }} />
            <div style={{ fontSize: 15, lineHeight: 1.55 }}>{sum.verdict}</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
        <button className="ct-btn ghost" onClick={() => go("timeline")}><ArrowLeft size={17} /> Timeline</button>
        <button className="ct-btn pri" onClick={() => go("skillgap")}><Target size={17} /> Analyze skill gap</button>
      </div>
    </div>
  );
}
