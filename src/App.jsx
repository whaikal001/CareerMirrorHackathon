import { useEffect, useMemo, useRef, useState } from "react";

import { STYLES } from "./styles";
import { PATHS, COACH_A, SKILL_GAPS, JOBS } from "./data/careerData";
import { computeDNA, rankPaths, computeSkillGaps, computePlanB, makeNudge, extractSkills, computeJobMatch, computeCompanyFit } from "./compute";
import { COMPANIES } from "./data/careerData";
import { extractPdfText } from "./pdfText";
import {
  SCREEN_STEP,
  SAVE_KEY,
  USE_LIVE_AI,
  APP_STATUSES,
  DEFAULT_PROFILE,
  DEFAULT_APPLICATIONS,
  DEFAULT_INTERESTS,
  DEFAULT_PATH,
  loadSaved,
} from "./constants";

import Header from "./components/Header";
import ProfileDrawer from "./components/ProfileDrawer";
import ApplyModal from "./components/ApplyModal";

import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import AnalyzingPage from "./pages/AnalyzingPage";
import TwinPage from "./pages/TwinPage";
import TimelinePage from "./pages/TimelinePage";
import SkillGapPage from "./pages/SkillGapPage";
import RoadmapPage from "./pages/RoadmapPage";
import JobsPage from "./pages/JobsPage";
import CompaniesPage from "./pages/CompaniesPage";
import CoachPage from "./pages/CoachPage";
import DashboardPage from "./pages/DashboardPage";
import RehearsalPage from "./pages/RehearsalPage";
import WhatIfPage from "./pages/WhatIfPage";
import EmployerPage from "./pages/EmployerPage";
import PortfolioPage from "./pages/PortfolioPage";

/* ============================ APP ============================ */
export default function App() {
  const saved = loadSaved();
  const [screen, setScreen] = useState("landing");
  const [picked, setPicked] = useState(() => PATHS.find((p) => p.id === saved.pickedId) || DEFAULT_PATH);
  const [interests, setInterests] = useState(() => saved.interests || DEFAULT_INTERESTS);
  const [profile, setProfile] = useState(() => ({ ...DEFAULT_PROFILE, ...saved.profile }));
  const [resume, setResume] = useState(() => saved.resume || null);
  const [theme, setTheme] = useState(() => saved.theme || "light");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [applications, setApplications] = useState(() =>
    (saved.applications || DEFAULT_APPLICATIONS).map((a) => ({
      ...a,
      status: APP_STATUSES.includes(a.status) ? a.status : "Applied",
      appliedAt: a.appliedAt || Date.parse(a.date) || Date.now(),
    }))
  );
  const [applyModal, setApplyModal] = useState(null);
  const [rehearsalJob, setRehearsalJob] = useState(null);
  const [rehearsalReport, setRehearsalReport] = useState(() => saved.rehearsalReport || null);
  const [whatIf, setWhatIf] = useState(() => saved.whatIf || null);
  const [twinData, setTwinData] = useState(() => saved.twinData || null);
  const [coachTyping, setCoachTyping] = useState(false);

  const dna = useMemo(() => computeDNA(profile, interests, twinData), [profile, interests, twinData]);
  const rankedPaths = useMemo(() => rankPaths(PATHS, dna), [dna]);
  const skillGaps = useMemo(() => computeSkillGaps(SKILL_GAPS, twinData), [twinData]);
  const planB = useMemo(() => computePlanB(picked, PATHS), [picked]);
  const nudge = useMemo(() => makeNudge(skillGaps, applications, JOBS), [skillGaps, applications]);
  const jobMatches = useMemo(
    () => Object.fromEntries(JOBS.map((j) => [j.id, computeJobMatch(j, dna, twinData, interests)])),
    [dna, twinData, interests]
  );
  const companyFits = useMemo(
    () => Object.fromEntries(COMPANIES.map((c) => [c.id, computeCompanyFit(c, dna, twinData, interests)])),
    [dna, twinData, interests]
  );
  const [chat, setChat] = useState([{ from: "bot", t: "Hi Haikal 👋 I'm Twin, your AI career coach. Ask me about jobs, resumes, skills, or applications." }]);
  const chatRef = useRef(null);

  const step = SCREEN_STEP[screen];
  const go = (s) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setScreen(s);
  };

  useEffect(() => {
    if (screen !== "analyzing") return;
    if (resume?.text) {
      const skills = extractSkills(resume.text);
      if (skills.length) setTwinData({ skills, source: "resume" });
    }
    setScanStep(0);
    const seq = [600, 1300, 2000, 2700];
    const timers = seq.map((d, i) => setTimeout(() => setScanStep(i + 1), d));
    const done = setTimeout(() => go("twin"), 3500);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(done);
    };
  }, [screen]);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chat]);

  useEffect(() => {
    if (!resume?.url) {
      setPreviewUrl(null);
      return;
    }
    let active = true;
    let objUrl;
    fetch(resume.url)
      .then((r) => r.blob())
      .then((b) => {
        if (!active) return;
        objUrl = URL.createObjectURL(b);
        setPreviewUrl(objUrl);
      })
      .catch(() => setPreviewUrl(null));
    return () => {
      active = false;
      if (objUrl) URL.revokeObjectURL(objUrl);
    };
  }, [resume]);

  useEffect(() => {
    const full = { profile, interests, resume, theme, pickedId: picked.id, applications, rehearsalReport, whatIf, twinData };
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(full));
    } catch {
      try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(resume ? { ...full, resume: { ...resume, url: null } } : full));
      } catch {}
    }
  }, [profile, interests, resume, theme, picked, applications, rehearsalReport, whatIf, twinData]);

  const setField = (key) => (e) => setProfile((p) => ({ ...p, [key]: e.target.value }));
  const toggleInterest = (x) => setInterests((p) => (p.includes(x) ? p.filter((i) => i !== x) : [...p, x]));
  const ask = async (q) => {
    setChat((c) => [...c, { from: "me", t: q }]);
    setCoachTyping(true);
    if (USE_LIVE_AI) {
      try {
        const r = await fetch("/.netlify/functions/coach", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mode: "chat",
            question: q,
            profile: { name: profile.name, field: profile.field, userType: profile.userType },
            interests,
            pathTitle: picked.title,
          }),
        });
        if (!r.ok) throw new Error();
        const { content } = await r.json();
        if (!content) throw new Error();
        setChat((c) => [...c, { from: "bot", t: content }]);
        setCoachTyping(false);
        return;
      } catch {}
    }
    setTimeout(() => {
      setChat((c) => [...c, { from: "bot", t: COACH_A[q] || "I recommend focusing on one target role, improving the missing skills, then applying to companies with strong fit scores." }]);
      setCoachTyping(false);
    }, 700);
  };

  const coachAsk = (q) => {
    go("coach");
    ask(q);
  };

  const onResume = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await new Promise((res) => {
      const reader = new FileReader();
      reader.onload = () => res(reader.result);
      reader.readAsDataURL(file);
    });
    let text = null;
    if (file.type === "application/pdf") {
      try {
        text = await extractPdfText(file);
      } catch {}
    }
    setResume({ name: file.name, size: `${(file.size / 1024).toFixed(0)} KB`, type: file.type, url, text });
  };

  const viewResume = () => {
    if (!resume?.url) return;
    fetch(resume.url)
      .then((r) => r.blob())
      .then((b) => {
        const url = URL.createObjectURL(b);
        window.open(url, "_blank");
        setTimeout(() => URL.revokeObjectURL(url), 30000);
      });
  };

  const resetProfile = () => {
    try {
      localStorage.removeItem(SAVE_KEY);
    } catch {}
    setProfile({ ...DEFAULT_PROFILE });
    setInterests(DEFAULT_INTERESTS);
    setResume(null);
    setPicked(DEFAULT_PATH);
    setApplications([]);
    setRehearsalReport(null);
    setRehearsalJob(null);
    setWhatIf(null);
    setTwinData(null);
    setShowProfile(false);
  };

  const applyForJob = (company, role) => {
    const exists = applications.some((a) => a.company === company && a.role === role);
    if (!exists) {
      setApplications((list) => [{ company, role, status: "Applied", date: new Date().toLocaleDateString(), appliedAt: Date.now() }, ...list]);
    }
    setApplyModal({ company, role, alreadyApplied: exists });
  };

  const updateAppStatus = (company, role, status) => {
    setApplications((list) => list.map((a) => (a.company === company && a.role === role ? { ...a, status } : a)));
  };

  const startRehearsal = (job) => {
    setRehearsalJob({ title: job.title, requirements: job.requirements || [] });
    go("rehearsal");
  };

  return (
    <div className={`ct-root ${theme === "light" ? "light" : ""}`}>
      <style>{STYLES}</style>
      <div className="ct-bg" />
      <div className="ct-grain" />
      <div className="ct-wrap">
        <Header
          screen={screen}
          step={step}
          go={go}
          theme={theme}
          setTheme={setTheme}
          profile={profile}
          onOpenProfile={() => setShowProfile(true)}
        />

        {showProfile && (
          <ProfileDrawer
            profile={profile}
            interests={interests}
            resume={resume}
            previewUrl={previewUrl}
            viewResume={viewResume}
            onResume={onResume}
            onClose={() => setShowProfile(false)}
            onEditProfile={() => { setShowProfile(false); go("profile"); }}
            onReset={resetProfile}
          />
        )}

        {applyModal && (
          <ApplyModal applyModal={applyModal} onClose={() => setApplyModal(null)} go={go} />
        )}

        {screen === "landing" && <LandingPage go={go} jobMatches={jobMatches} companyFits={companyFits} />}

        {screen === "profile" && (
          <ProfilePage
            profile={profile}
            setField={setField}
            interests={interests}
            toggleInterest={toggleInterest}
            resume={resume}
            onResume={onResume}
            viewResume={viewResume}
            go={go}
          />
        )}

        {screen === "analyzing" && <AnalyzingPage scanStep={scanStep} extracted={twinData?.skills} />}

        {screen === "twin" && <TwinPage profile={profile} picked={picked} setPicked={setPicked} go={go} dna={dna} paths={rankedPaths} />}

        {screen === "timeline" && <TimelinePage picked={picked} go={go} planB={planB} />}

        {screen === "whatif" && <WhatIfPage picked={picked} whatIf={whatIf} setWhatIf={setWhatIf} go={go} />}

        {screen === "employer" && <EmployerPage go={go} />}

        {screen === "skillgap" && <SkillGapPage picked={picked} go={go} skillGaps={skillGaps} />}

        {screen === "roadmap" && <RoadmapPage picked={picked} go={go} />}

        {screen === "jobs" && <JobsPage go={go} startRehearsal={startRehearsal} jobMatches={jobMatches} />}

        {screen === "rehearsal" && (
          <RehearsalPage job={rehearsalJob} profile={profile} interests={interests} setRehearsalReport={setRehearsalReport} go={go} />
        )}

        {screen === "companies" && <CompaniesPage applyForJob={applyForJob} go={go} companyFits={companyFits} />}

        {screen === "coach" && <CoachPage chat={chat} chatRef={chatRef} ask={ask} go={go} typing={coachTyping} />}

        {screen === "dashboard" && <DashboardPage picked={picked} applications={applications} go={go} startRehearsal={startRehearsal} rehearsalReport={rehearsalReport} updateStatus={updateAppStatus} nudge={nudge} planB={planB} profile={profile} coachAsk={coachAsk} />}

        {screen === "portfolio" && (
          <PortfolioPage
            profile={profile}
            interests={interests}
            resume={resume}
            dna={dna}
            twinData={twinData}
            skillGaps={skillGaps}
            picked={picked}
            pathMatch={rankedPaths.find((p) => p.id === picked.id)?.match ?? picked.match}
            rehearsalReport={rehearsalReport}
            applications={applications}
            go={go}
          />
        )}
      </div>
    </div>
  );
}
