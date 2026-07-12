import React from "react";
import { Sun, Moon } from "lucide-react";
import Logo from "./Logo";
import { STEPS, STEP_SCREEN } from "../constants";

export default function Header({ screen, step, go, theme, setTheme, profile, onOpenProfile }) {
  return (
    <div className="ct-top">
      <div className="ct-brand" onClick={() => go("landing")} style={{ cursor: "pointer" }}>
        <Logo />
        <div>
          <div className="ct-name">CareerTwin<b>OS</b></div>
          <div className="ct-tag">Resume to job offer</div>
        </div>
      </div>
      <div className="ct-right">
        {screen !== "landing" && screen !== "employer" && (
          <div className="ct-steps">
            {STEPS.map((s, i) => (
              <div key={s} className={`ct-step ${i === step ? "on" : ""}`} onClick={() => go(STEP_SCREEN[i])}>{s}</div>
            ))}
          </div>
        )}
        <button className="ct-theme" onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}>{theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}</button>
        <button className="ct-pfp" onClick={onOpenProfile}>{(profile.name.trim().charAt(0) || "U").toUpperCase()}</button>
      </div>
    </div>
  );
}
