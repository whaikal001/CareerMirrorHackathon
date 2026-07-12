/* AI coach proxy — branches on payload `mode`:
   - "chat" (default): free-form career question, plain-text answer
   - "generate_questions": 5 interview questions as a raw JSON array of strings
   - "score_interview": scores 5 Q&A pairs, returns a raw JSON report
   All modes respond with { content: "<raw model text>" }; the client parses structured modes. */

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

const join = (a) => (Array.isArray(a) && a.length ? a.join(", ") : "not specified");

const buildRequest = (body) => {
  const mode = body.mode || "chat";
  const profile = body.profile || {};
  const interests = Array.isArray(body.interests) ? body.interests : [];

  if (mode === "chat") {
    if (typeof body.question !== "string" || !body.question.trim()) {
      return { error: "Missing fields for mode chat" };
    }
    return {
      system:
        "You are Twin, the friendly AI career coach inside CareerTwin OS, a career-guidance app for students and early-career job seekers in Malaysia. Answer the user's career question in 2-4 short sentences. Be concrete, encouraging, and specific to the profile provided. Plain text only - no markdown, no bullet lists.",
      user: [
        `Profile: ${profile.name || "the user"}, ${profile.userType || ""}, field: ${profile.field || ""}, interests: ${join(interests)}, target career path: ${body.pathTitle || "undecided"}.`,
        `Question: ${body.question}`,
      ].join("\n"),
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 300,
        thinkingConfig: { thinkingBudget: 0 },
      },
    };
  }

  if (mode === "generate_questions") {
    if (!body.job || !body.job.title) {
      return { error: "Missing fields for mode generate_questions" };
    }
    return {
      system:
        "You are an interview coach creating a mock interview. Return ONLY a raw JSON array of exactly 5 strings - no markdown, no code fences, no object wrapper, no commentary before or after. Each string is one interview question under 30 words, in plain professional English. Composition: 1 introduction/motivation question, 3 technical questions targeting the job's required skills, 1 behavioural question. Match difficulty to the candidate's level (a student or internship seeker gets entry-level questions).",
      user: [
        `Job title: ${body.job.title}`,
        `Required skills: ${join(body.job.requirements)}`,
        `Candidate: ${profile.name || "unknown"}, ${profile.userType || ""}, studying ${profile.field || ""}, interests: ${join(interests)}`,
        "Generate the 5 questions now.",
      ].join("\n"),
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 600,
        responseMimeType: "application/json",
        thinkingConfig: { thinkingBudget: 0 },
      },
    };
  }

  if (mode === "score_interview") {
    if (!body.job || !body.job.title || !Array.isArray(body.qa) || !body.qa.length) {
      return { error: "Missing fields for mode score_interview" };
    }
    return {
      system:
        'You are a strict but supportive interview assessor reviewing a mock interview for a specific job. Return ONLY raw JSON - no markdown, no code fences, no text outside the JSON - in exactly this shape: {"overall": <integer 0-100>, "scores": {"clarity": <integer 0-100>, "structure": <integer 0-100>, "technicalDepth": <integer 0-100>}, "feedback": [{"question": "<the question>", "improvement": "<one concrete improvement>"}], "summary": "<1-2 sentence overall verdict>"} where "feedback" has exactly 5 items in the same order the questions were asked. Scoring: clarity = concise and easy to follow; structure = uses concrete examples and situation-action-result; technicalDepth = specific, correct technical content for the required skills. Answers marked "(no answer provided)" or one-liners must score low. Each improvement must be ONE specific, actionable sentence about that particular answer - never generic advice like "practice more".',
      user: [
        `Job: ${body.job.title} (required skills: ${join(body.job.requirements)})`,
        `Candidate: ${profile.name || "unknown"}, ${profile.userType || ""}, field: ${profile.field || ""}`,
        "",
        ...body.qa.flatMap((x, i) => [`Q${i + 1}: ${x.question}`, `A${i + 1}: ${x.answer}`]),
        "",
        "Score the interview now.",
      ].join("\n"),
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 1500,
        responseMimeType: "application/json",
        thinkingConfig: { thinkingBudget: 0 },
      },
    };
  }

  if (mode === "parse_resume") {
    if (typeof body.resumeText !== "string" || !body.resumeText.trim()) {
      return { error: "Missing fields for mode parse_resume" };
    }
    return {
      system:
        'You extract structured data from resumes. Return ONLY raw JSON - no markdown, no code fences, no text outside the JSON - in exactly this shape: {"skills": [{"name": "<skill>", "level": <integer 0-100 proficiency estimate>}], "education": "<highest education, one line>", "projects": [{"name": "<project>", "tech": "<main technologies>"}], "summary": "<2-sentence professional summary>"}. Include at most 10 skills and 4 projects. Only list skills with real evidence in the text.',
      user: `Resume text:\n${body.resumeText.slice(0, 8000)}\n\nExtract the JSON now.`,
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 1000,
        responseMimeType: "application/json",
        thinkingConfig: { thinkingBudget: 0 },
      },
    };
  }

  return null;
};

export default async (req) => {
  if (req.method !== "POST") {
    return Response.json({ error: "POST only" }, { status: 405 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return Response.json(
      { error: "GEMINI_API_KEY is not configured on the server" },
      { status: 500 },
    );
  }

  try {
    const spec = buildRequest(body || {});
    if (spec === null) return Response.json({ error: "Unknown mode" }, { status: 400 });
    if (spec.error) return Response.json({ error: spec.error }, { status: 400 });

    const r = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: spec.system }] },
        contents: [{ role: "user", parts: [{ text: spec.user }] }],
        generationConfig: spec.generationConfig,
      }),
    });
    if (!r.ok) {
      return Response.json({ error: `Gemini request failed (${r.status})` }, { status: 502 });
    }

    const data = await r.json();
    const content = (data?.candidates?.[0]?.content?.parts || [])
      .map((part) => part.text || "")
      .join("");
    if (!content.trim()) {
      return Response.json({ error: "Empty model response" }, { status: 502 });
    }

    return Response.json({ content });
  } catch (e) {
    return Response.json({ error: `Coach function error: ${e.message}` }, { status: 500 });
  }
};
