import { PATHS } from "./data/careerData";

/* ============================ NAVIGATION / STORAGE ============================ */
export const STEPS = ["Profile", "Simulate", "Skill Gap", "Roadmap", "Jobs", "Companies", "Coach", "Dashboard"];

export const SCREEN_STEP = {
  profile: 0,
  analyzing: 1,
  twin: 1,
  timeline: 1,
  skillgap: 2,
  roadmap: 3,
  jobs: 4,
  companies: 5,
  coach: 6,
  dashboard: 7,
};

export const STEP_SCREEN = ["profile", "twin", "skillgap", "roadmap", "jobs", "companies", "coach", "dashboard"];

export const SAVE_KEY = "careertwin.v2";

export const DEFAULT_PROFILE = {
  name: "Haikal",
  age: "20",
  userType: "Internship Seeker",
  field: "Computer Science",
  cgpa: "3.6",
  country: "Malaysia",
  workStyle: "Remote-first",
  mbti: "INTJ",
};

export const DEFAULT_APPLICATIONS = [];

export const DEFAULT_INTERESTS = ["AI", "Building"];

export const DEFAULT_PATH = PATHS[0];

export const loadSaved = () => {
  try {
    return JSON.parse(localStorage.getItem(SAVE_KEY)) || {};
  } catch {
    return {};
  }
};
