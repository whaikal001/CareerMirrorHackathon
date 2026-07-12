export const DEFAULT_TOGGLES = { masters: false, singapore: false, freelance: false, pivot: false };

export const expandLine = (line) => {
  const pts = [];
  for (let i = 0; i < line.length - 1; i++) {
    const a = line[i];
    const b = line[i + 1];
    for (let age = a.age; age < b.age; age++) {
      const t = (age - a.age) / (b.age - a.age);
      pts.push({ age, s: a.s + (b.s - a.s) * t });
    }
  }
  pts.push({ age: line[line.length - 1].age, s: line[line.length - 1].s });
  return pts;
};

export const applyWhatIf = (line, toggles) => {
  let pts = expandLine(line);
  if (toggles.masters) {
    // 2 study years at 40% of starting income, curve shifted 2 years, +18% premium from 28
    const src = pts;
    pts = src.map((p, i) => {
      const s = i < 2 ? src[0].s * 0.4 : src[i - 2].s;
      return { age: p.age, s: p.age >= 28 ? s * 1.18 : s };
    });
  }
  if (toggles.singapore) {
    pts = pts.map((p) => (p.age >= 26 ? { age: p.age, s: p.s * 1.45 } : p));
  }
  if (toggles.pivot) {
     const at35 = pts.find((p) => p.age === 35).s;
    pts = pts.map((p) => (p.age >= 35 ? { age: p.age, s: at35 * 0.8 * Math.pow(1.08, p.age - 35) } : p));
  }
  return pts.map((p) => {
    const s = Math.round(p.s * 10) / 10;
    const band =
      toggles.freelance && p.age >= 30
        ? [Math.round(s * 0.9 * 10) / 10, Math.round(s * 1.25 * 10) / 10]
        : [s, s];
    return { age: p.age, s, band };
  });
};

const cumulative = (pts) => pts.reduce((t, p) => t + p.s * 12, 0); // RM '000 total, 23→45

export const formatMil = (k) => (k >= 1000 ? `RM ${(k / 1000).toFixed(2)} mil` : `RM ${Math.round(k)}k`);

export const summarize = (pathA, pathB, toggles) => {
  const A = applyWhatIf(pathA.line, toggles);
  const B = applyWhatIf(pathB.line, toggles);
  const cumA = cumulative(A);
  const cumB = cumulative(B);
  const stages = [
    ["Your 20s", 23, 29],
    ["Your 30s", 30, 39],
    ["Your 40s", 40, 45],
  ];
  const stageWins = stages.map(([label, lo, hi]) => {
    const avg = (pts) => {
      const xs = pts.filter((p) => p.age >= lo && p.age <= hi);
      return xs.reduce((t, p) => t + p.s, 0) / xs.length;
    };
    return { label, winner: avg(A) >= avg(B) ? pathA.title : pathB.title };
  });
  const aWins = cumA >= cumB;
  const winner = aWins ? pathA : pathB;
  const loser = aWins ? pathB : pathA;
  const W = aWins ? A : B;
  const L = aWins ? B : A;
  let lastBehind = null;
  W.forEach((p, i) => {
    if (p.s < L[i].s) lastBehind = p.age;
  });
  const diffLabel = formatMil(Math.abs(cumA - cumB));
  const anyToggle = Object.values(toggles).some(Boolean);
  const verdict = `${winner.title} finishes about ${diffLabel} ahead in cumulative earnings by 45${
    lastBehind ? `, overtaking ${loser.title} around age ${Math.min(lastBehind + 1, 45)}` : `, leading ${loser.title} at every age`
  }${anyToggle ? " under your current what-if settings" : ""}.`;
  return { cumA, cumB, diffLabel, stageWins, winner: winner.title, verdict };
};
