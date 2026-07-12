# CareerTwin OS

AI career and job matching platform for students and early-career job seekers — Talentbank Tech Hackathon 2026.

Build a Career Twin from your profile and resume, compare career paths in a what-if simulator, close skill gaps, rehearse interviews with AI scoring, track applications through a hiring funnel, and flip to an employer view — all in one React SPA.

## Features

- **Career DNA & path matching** — 6-trait radar computed deterministically from profile, interests, CGPA, MBTI, and resume-extracted skills (`src/compute.js`); path match % re-ranks live as inputs change
- **Resume parsing** — client-side PDF text extraction (pdfjs-dist) feeding skill detection; the analyzing screen shows the actual skills it found
- **What-If Career Simulator** — compare two paths' salary curves with life-decision toggles (Master's, Singapore move, freelancing, career pivot); pure math in `src/whatif.js`
- **Interview Rehearsal** — 5 tailored questions, one at a time, then a scored report card (clarity / structure / technical depth + overall)
- **AI Coach "Twin"** — chat with typing indicator, proactive dashboard nudge computed from your weakest skill gap, Plan B career-insurance card
- **Application funnel** — kanban tracker (Applied → Screening → Interview → Offer / Rejected) with drag-and-drop and contextual next actions
- **Two-sided marketplace demo** — employer view with role posting and ranked candidate cards
- **14 companies / 16 jobs** across 6 sectors with search + sector/location/type filters

## Tech stack

React 18 · Vite 5 · Recharts · lucide-react · pdfjs-dist · Netlify Functions (Gemini API proxy) · localStorage persistence (`careertwin.v2`)

## Local development

```bash
npm install
npm run dev        # Vite only — app runs fully in hardcoded AI mode
```

### AI modes

The app ships with `USE_LIVE_AI = false` in `src/constants.js` — all AI features (coach chat, interview questions, answer scoring) run on deterministic local logic, so **the demo never depends on an API key or network**.

To switch to live AI (Google Gemini):

1. Copy `.env.example` to `.env` and paste your `GEMINI_API_KEY` (aistudio.google.com/apikey)
2. Set `USE_LIVE_AI = true` in `src/constants.js`
3. Run `npx netlify dev` (serves the Vite app *and* `netlify/functions/coach.js` on :8888)

The serverless function (`netlify/functions/coach.js`) branches on a `mode` field: `chat` (default), `generate_questions`, `score_interview`, `parse_resume`. Structured modes instruct the model to return only raw JSON; the client still parses defensively (fence stripping + shape validation + clamping).

**Fallback insurance:** even with live AI on, every feature degrades gracefully — chat falls back to canned answers, question generation offers an offline practice set, and the key never ships in the client bundle (server-side env var only).

## Deployment (Netlify)

- `netlify.toml` declares the Vite build, `netlify/functions` directory, and the SPA redirect
- Set `GEMINI_API_KEY` in Netlify UI → Site settings → Environment variables (only needed when `USE_LIVE_AI` is true)

## AI tooling declaration

Built with assistance from Claude Code (Anthropic). AI-generated code was reviewed, tested (pure helpers have Node-run unit checks), and integrated by the team.
