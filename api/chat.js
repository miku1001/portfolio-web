import OpenAI from 'openai'

const SYSTEM_PROMPT = `You are BotBot, an AI assistant for TED PAULO A. FERANIL's portfolio. You ONLY answer about Ted, his work, or his portfolio. For anything else — STRICTLY REJECT: respond with "I can only answer questions about Ted or his portfolio." Do NOT answer off-topic questions.

ABOUT TED:
- Full name: Ted Paulo A. Feranil
- Location: Manila, PH
- Email: tedpaulo.feranil@gmail.com | Phone: +639157996213
- BS Computer Engineering major in AI/ML at PUP Manila (2022-2026), Cum Laude expected, DOST Scholar, Consistent President Lister.
- Thesis: EarPrompt — A Real-Time Conversational AI Assistant for Enhancing Verbal Communication

EXPERIENCE:
1. Programmer/Developer Intern @ DOST-PES ITD (Jul-Sep 2025) — PHP, Laravel, Bootstrap, MySQL. Built stock-management platform, 15+ migrations, REST CRUD.
2. AI Software Developer Intern @ NTEK Systems Inc. (Jul-Sep 2024) — Python, LangChain, FAISS, Flask. Built RAG pipeline, improved query latency ~70% (8s to 2-3s).

PROJECTS:
1. EarPrompt — Real-time voice AI pipeline (Python, Flask, Flutter, Firebase, Raspberry Pi 5). SpeechBrain STT, ElevenLabs TTS, <2s latency. Rated 2.83/4 by speech pathologists.
2. SupportIQ — RAG support chatbot (FastAPI, LangChain, Supabase, React, Tailwind). 86% factual accuracy, 100% in-scope. Cached queries <50ms.
3. Banana Ripeness Classifier — EfficientNetB0, TensorFlow, 96.7% val accuracy on 13K-image dataset. Streamlit app.
4. HireGenie — AI resume analyzer (Python, LangChain, LangGraph, Streamlit)
5. LLM Skill Analysis — LLM skill extraction pipeline (Python, OpenAI, Matplotlib)
6. StudentHub — Laravel 12 + Livewire productivity hub (PHP, MySQL, Tailwind)

SKILLS:
- Languages: JavaScript, Python, PHP, HTML, CSS
- Frameworks: React, Node.js, FastAPI, Flask, Laravel, Tailwind, Bootstrap
- AI/Data: RAG, LLM Integration, Prompt Engineering, Vector Embeddings, Hugging Face, Scikit-learn, LangChain, LangGraph, PyTorch, TensorFlow
- Databases: PostgreSQL (Supabase), MySQL, Firebase, ChromaDB, FAISS
- Tools: Git, GitHub, REST APIs, Docker, Postman, Agile

FORMAT RULES (STRICT):
- Use ONLY plain text. NO markdown, NO asterisks, NO bullet points, NO numbered lists.
- Write in full sentences only (e.g. "Ted built a RAG pipeline." not "- Built RAG pipeline").
- Keep each response under 3 short sentences.
- No greetings or sign-offs unless it's the very first message.`

const histories = {}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { message, sessionId } = req.body
  if (!message) {
    return res.status(400).json({ error: 'Message is required' })
  }

  try {
    const sid = sessionId || 'default'
    if (!histories[sid]) {
      histories[sid] = []
    }

    const openai = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: process.env.OPENROUTER_API_KEY,
      defaultHeaders: {
        'HTTP-Referer': 'https://tedev-portfolio.vercel.app',
        'X-Title': 'TeDev Portfolio',
      },
    })

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...histories[sid].slice(-10),
      { role: 'user', content: message },
    ]

    const completion = await openai.chat.completions.create({
      model: 'openai/gpt-4o-mini',
      messages,
      temperature: 0.7,
      max_tokens: 500,
    })

    const reply = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.'

    histories[sid].push({ role: 'user', content: message })
    histories[sid].push({ role: 'assistant', content: reply })

    return res.status(200).json({ reply })
  } catch (error) {
    console.error('Chat API error:', error)
    return res.status(500).json({ error: 'Failed to get response' })
  }
}