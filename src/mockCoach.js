/* Hardcoded stand-in for the AI coach (active while USE_LIVE_AI is false in constants.js).
   Questions come from the REHEARSAL_QS bank (template fallback for unknown roles);
   scoring is a deterministic heuristic over the actual answers, so the report
   responds to what the user typed without any API call. */
import { REHEARSAL_QS } from "./data/careerData.js";

export const wait = (ms) => new Promise((res) => setTimeout(res, ms));

const templateQuestions = (job) => {
  const reqs = job.requirements?.length ? job.requirements : ["your core skills"];
  return [
    `Tell me about yourself and why you're interested in the ${job.title} role.`,
    `Describe a project where you used ${reqs[0]}. What was your role and the outcome?`,
    `Which of these — ${reqs.join(", ")} — is your strongest skill, and how have you applied it?`,
    `Tell me about a time you had to learn something new quickly. How did you approach it?`,
    `What questions would you ask us about the ${job.title} position?`,
  ];
};

export const mockQuestions = (job) => REHEARSAL_QS[job.title] || templateQuestions(job);

const clamp = (n) => Math.max(0, Math.min(100, Math.round(n)));

export const mockReport = (job, questions, answers) => {
  const reqs = job.requirements?.length ? job.requirements : [];
  const per = answers.map((ans) => {
    const t = String(ans || "").toLowerCase();
    const words = t.split(/\s+/).filter(Boolean).length;
    const example = /project|built|created|led|team|during|result|assignment|class|when i/.test(t);
    const req = reqs.some((r) => t.includes(r.toLowerCase()));
    const num = /\d/.test(t);
    if (!words) return { clarity: 10, structure: 6, depth: 6, words, example, req, num };
    const len = Math.min(words / 55, 1);
    return {
      clarity: clamp(38 + 42 * len + (num ? 6 : 0) + (words >= 12 ? 8 : 0)),
      structure: clamp(30 + 38 * len + (example ? 22 : 0) + (num ? 6 : 0)),
      depth: clamp(26 + 34 * len + (req ? 26 : 0) + (example ? 8 : 0)),
      words, example, req, num,
    };
  });
  const avg = (k) => clamp(per.reduce((s, p) => s + p[k], 0) / per.length);
  const scores = { clarity: avg("clarity"), structure: avg("structure"), technicalDepth: avg("depth") };
  const overall = clamp(scores.clarity * 0.3 + scores.structure * 0.3 + scores.technicalDepth * 0.4);

  const feedback = questions.map((q, i) => {
    const p = per[i];
    const req = reqs[i % reqs.length] || "the job's required skills";
    let improvement;
    if (!p.words) improvement = "You skipped this one — in a real interview, even a short structured answer beats silence.";
    else if (p.words < 15) improvement = "Expand this with Situation-Action-Result: the context, what you did, and what changed.";
    else if (!p.example) improvement = `Add a concrete example — name a project or class assignment where you used ${req} and what came out of it.`;
    else if (!p.req && reqs.length) improvement = `Tie the answer back to ${req} — the interviewer is listening for the job's required skills.`;
    else if (!p.num) improvement = "Quantify the result (users, %, grade, time saved) so the impact feels concrete.";
    else improvement = "Solid answer — tighten the opening sentence so your main point lands first.";
    return { question: q, improvement };
  });

  const answered = per.filter((p) => p.words > 0).length;
  const cats = [["clarity", scores.clarity], ["structure", scores.structure], ["technical depth", scores.technicalDepth]];
  const best = cats.reduce((a, b) => (b[1] > a[1] ? b : a))[0];
  const worst = cats.reduce((a, b) => (b[1] < a[1] ? b : a))[0];
  const summary = `You gave substantial answers on ${answered} of 5 questions for the ${job.title} role. Your strongest area is ${best}; focus next on ${worst} to lift your overall score.`;

  return { overall, scores, feedback, summary };
};
