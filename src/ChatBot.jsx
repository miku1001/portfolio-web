import { useState, useRef, useEffect } from 'react'
import { PaperAirplaneIcon, XMarkIcon } from '@heroicons/react/24/outline'

const IS_DEV = import.meta.env.DEV

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hey! I\'m BotBot, Ted\'s portfolio assistant. Ask me anything about Ted!' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const listRef = useRef(null)
  const sessionId = useRef('session_' + Date.now())

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text }])
    setLoading(true)

    try {
      if (IS_DEV) {
        await new Promise(r => setTimeout(r, 800))
        const mockReply = `Great question about "${text}"! I'm BotBot — once deployed on Vercel, I'll answer with real AI power using LangChain + OpenRouter. For now, I'm in development mode! 🤖`
        setMessages(prev => [...prev, { role: 'assistant', text: mockReply }])
        setLoading(false)
        return
      }

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, sessionId: sessionId.current }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', text: data.reply || 'Sorry, I could not process that.' }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Oops! Something went wrong. Try again later.' }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-6 z-[120] w-[360px] max-w-[calc(100vw-32px)] h-[500px] max-h-[calc(100vh-160px)] flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--surface)]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent-2)] to-[var(--accent)] flex items-center justify-center text-white text-xs font-bold">B</div>
              <div>
                <p className="text-sm font-bold text-[var(--text)]">BotBot</p>
                <p className="text-[10px] text-[var(--text-2)]">Portfolio Assistant</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[rgba(161,161,170,0.1)] transition-all"
            >
              <XMarkIcon className="w-5 h-5"/>
            </button>
          </div>

          <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-[var(--accent-2)] to-[var(--accent)] text-white rounded-br-md'
                    : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] rounded-bl-md'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl rounded-bl-md px-3 py-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#a1a1aa] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#a1a1aa] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#a1a1aa] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-[var(--border)] px-4 py-3 bg-[var(--surface)]">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Ted..."
                className="flex-1 bg-[var(--surface-2)] border border-[var(--border)] rounded-xl px-4 py-2 text-sm text-[var(--text)] placeholder:text-[var(--text-2)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
              />
              <button
                type="button"
                onClick={send}
                disabled={loading || !input.trim()}
                className="w-9 h-9 rounded-xl bg-gradient-to-r from-[var(--accent-2)] to-[var(--accent)] flex items-center justify-center text-white disabled:opacity-50 transition-opacity"
              >
                <PaperAirplaneIcon className="w-4 h-4 -rotate-45" />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-[110] w-20 h-20 rounded-full bg-zinc-100/30 shadow-2xl hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 overflow-hidden border border-black"
      >
        <video
          src="/avatar.webm"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </button>
    </>
  )
}