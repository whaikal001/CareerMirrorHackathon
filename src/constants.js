import { PATHS } from "./data/careerData";

/* ============================ NAVIGATION / STORAGE ============================ */
export const STEPS = ["Profile", "Simulate", "Skill Gap", "Roadmap", "Jobs", "Companies", "Coach", "Dashboard", "Portfolio"];

export const SCREEN_STEP = {
  profile: 0,
  analyzing: 1,
  twin: 1,
  timeline: 1,
  whatif: 1,
  skillgap: 2,
  roadmap: 3,
  jobs: 4,
  rehearsal: 4,
  companies: 5,
  company: 5,
  coach: 6,
  dashboard: 7,
  portfolio: 8,
};

export const STEP_SCREEN = ["profile", "twin", "skillgap", "roadmap", "jobs", "companies", "coach", "dashboard", "portfolio"];

export const SAVE_KEY = "careertwin.v2";

/* Interview rehearsal + coach chat run on hardcoded local logic while false.
   Flip to true once GEMINI_API_KEY is configured (Netlify env var / .env with `npx netlify dev`). */
export const USE_LIVE_AI = false;

export const DEFAULT_PROFILE = {
  name: "Haikal",
  age: "20",
  userType: "Internship Seeker",
  field: "Computer Science",
  cgpa: "3.6",
  country: "Malaysia",
  workStyle: "Remote-first",
  mbti: "INTJ",
  headline: "",
  email: "",
  phone: "",
  bio: "",
  institution: "",
  gradYear: "",
  expTitle: "",
  expCompany: "",
  expFrom: "",
  expTo: "",
  expDesc: "",
  linkedin: "",
  github: "",
};

export const DEFAULT_APPLICATIONS = [];

export const APP_STATUSES = ["Applied", "Screening", "Interview", "Offer", "Rejected"];

export const STATUS_COLORS = {
  Applied: "var(--muted)",
  Screening: "var(--sky)",
  Interview: "var(--amber)",
  Offer: "var(--mint)",
  Rejected: "var(--coral)",
};

export const DEFAULT_INTERESTS = ["AI", "Building"];

export const DEFAULT_PATH = PATHS[0];

export const loadSaved = () => {
  try {
    return JSON.parse(localStorage.getItem(SAVE_KEY)) || {};
  } catch {
    return {};
  }
};
