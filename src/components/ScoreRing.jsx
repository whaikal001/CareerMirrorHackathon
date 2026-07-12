import { useEffect, useState } from "react";

export default function ScoreRing({ value }) {
  const r = 90;
  const c = 2 * Math.PI * r;
  const [draw, setDraw] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setDraw(value), 200);
    return () => clearTimeout(t);
  }, [value]);
  return (
    <svg width="212" height="212" viewBox="0 0 212 212">
      <circle cx="106" cy="106" r={r} stroke="var(--line)" strokeWidth="13" fill="none" />
      <circle
        cx="106"
        cy="106"
        r={r}
        stroke="var(--mint)"
        strokeWidth="13"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c - (c * draw) / 100}
        transform="rotate(-90 106 106)"
        style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(.2,.7,.2,1)" }}
      />
      <text x="106" y="100" textAnchor="middle" fontFamily="Outfit" fontWeight="700" fontSize="54" fill="var(--txt)">{value}</text>
      <text x="106" y="128" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="12.5" fill="var(--faint)" letterSpacing="2">/ 100</text>
    </svg>
  );
}
