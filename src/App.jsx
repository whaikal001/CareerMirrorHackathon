import { useEffect, useRef, useState } from "react";

import { STYLES } from "./styles";
import { PATHS } from "./data/careerData";
import { COACH_A } from "./data/careerData";
import {
  SCREEN_STEP,
  SAVE_KEY,
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

/* ============================ APP ============================ */
export default function App() {
  const saved = loadSaved();
  const [screen, setScreen] = useState("landing");
  const [picked, setPicked] = useState(() => PATHS.find((p) => p.id === saved.pickedId) || DEFAULT_PATH);
  const [interests, setInterests] = useState(() => saved.interests || DEFAULT_INTERESTS);
  const [profile, setProfile] = useState(() => ({ ...DEFAULT_PROFILE, ...saved.profile }));
  const [resume, setResume] = useState(() => saved.resume || null);
  const [theme, setTheme] = useState(() => saved.theme || "dark");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [applications, setApplications] = useState(() => saved.applications || DEFAULT_APPLICATIONS);
  const [applyModal, setApplyModal] = useState(null);
  const [chat, setChat] = useState([{ from: "bot", t: "Hi Haikal 👋 I'm Twin, your AI career coach. Ask me about jobs, resumes, skills, or applications." }]);
  const chatRef = useRef(null);

  const step = SCREEN_STEP[screen];
  const go = (s) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setScreen(s);
  };

  useEffect(() => {
    if (screen !== "analyzing") return;
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
    const full = { profile, interests, resume, theme, pickedId: picked.id, applications };
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(full));
    } catch {
      try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(resume ? { ...full, resume: { ...resume, url: null } } : full));
      } catch {}
    }
  }, [profile, interests, resume, theme, picked, applications]);

  const setField = (key) => (e) => setProfile((p) => ({ ...p, [key]: e.target.value }));
  const toggleInterest = (x) => setInterests((p) => (p.includes(x) ? p.filter((i) => i !== x) : [...p, x]));
  const ask = (q) => {
    setChat((c) => [...c, { from: "me", t: q }]);
    setTimeout(() => setChat((c) => [...c, { from: "bot", t: COACH_A[q] || "I recommend focusing on one target role, improving the missing skills, then applying to companies with strong fit scores." }]), 550);
  };

  const onResume = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setResume({ name: file.name, size: `${(file.size / 1024).toFixed(0)} KB`, type: file.type, url: reader.result });
    reader.readAsDataURL(file);
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
    setShowProfile(false);
  };

  const applyForJob = (company, role) => {
    const exists = applications.some((a) => a.company === company && a.role === role);
    if (!exists) {
      setApplications((list) => [{ company, role, status: "Applied", date: new Date().toLocaleDateString() }, ...list]);
    }
    setApplyModal({ company, role, alreadyApplied: exists });
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

        {screen === "landing" && <LandingPage go={go} />}

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

        {screen === "analyzing" && <AnalyzingPage scanStep={scanStep} />}

        {screen === "twin" && <TwinPage profile={profile} picked={picked} setPicked={setPicked} go={go} />}

        {screen === "timeline" && <TimelinePage picked={picked} go={go} />}

        {screen === "skillgap" && <SkillGapPage picked={picked} go={go} />}

        {screen === "roadmap" && <RoadmapPage picked={picked} go={go} />}

        {screen === "jobs" && <JobsPage go={go} />}

        {screen === "companies" && <CompaniesPage applyForJob={applyForJob} go={go} />}

        {screen === "coach" && <CoachPage chat={chat} chatRef={chatRef} ask={ask} go={go} />}

        {screen === "dashboard" && <DashboardPage picked={picked} applications={applications} go={go} />}
      </div>
    </div>
  );
}
