import OpenAI from 'openai'

const SYSTEM_PROMPT = `You are BotBot, a friendly and playful AI assistant for Ted Paulo Feranil's portfolio website.
Keep answers short, conversational, and helpful.
You can talk about Ted's skills (Python, SQL, PHP, JavaScript, React, Laravel, AI/ML, etc.),
his projects (Earprompt, SupportIQ, HireGenie, LLM Skill Analysis, Banana Classify, StudentHub),
his experience (DOST intern, NTEK Systems intern), and his background (BS CompEng student at PUP).
If asked about something outside this scope, politely say you're just a portfolio assistant.`

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