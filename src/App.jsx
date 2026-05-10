import { useEffect, useRef, useState } from 'react'
import {
  CodeBracketIcon,
  CpuChipIcon,
  CircleStackIcon,
  ChartBarIcon,
  CubeIcon,
  Squares2X2Icon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowDownTrayIcon,
  ChevronUpIcon,
  UserIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  SunIcon,
  MoonIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'
import { CircleStackIcon as CircleStackSolid } from '@heroicons/react/24/solid'
import { Squares2X2Icon as Squares2X2Solid } from '@heroicons/react/24/solid'
import './App.css'

// ─── Skills Data ───────────────────────────────────────────────────────────────

const skillsTabs = [
  {
    key: 'languages',
    label: 'Languages',
    items: [
      { logo: 'https://cdn.simpleicons.org/python/3776AB',     name: 'Python'     },
      { logo: 'https://cdn.simpleicons.org/javascript/F7DF1E', name: 'JavaScript' },
      { logo: 'https://cdn.simpleicons.org/php/777BB4',        name: 'PHP'        },
      { logo: 'https://cdn.simpleicons.org/mysql/4479A1',      name: 'SQL'        },
      { logo: 'https://cdn.simpleicons.org/dart/0175C2',       name: 'Dart'       },
    ],
  },
  {
    key: 'frameworks',
    label: 'Frameworks & Libraries',
    items: [
      { logo: 'https://cdn.simpleicons.org/react/61DAFB',       name: 'React'        },
      { logo: 'https://cdn.simpleicons.org/tailwindcss/06B6D4', name: 'Tailwind CSS' },
      { logo: 'https://cdn.simpleicons.org/bootstrap/7952B3',   name: 'Bootstrap'    },
      { logo: 'https://cdn.simpleicons.org/html5/E34F26',       name: 'HTML5'        },
      { logo: 'https://cdn.simpleicons.org/css/1572B6',         name: 'CSS3'         },
      { logo: 'https://cdn.simpleicons.org/laravel/FF2D20',     name: 'Laravel'      },
      { logo: 'https://cdn.simpleicons.org/livewire/FB70A9',    name: 'Livewire'     },
      { logo: 'https://cdn.simpleicons.org/django/092E20',      name: 'Django'       },
      { logo: 'https://cdn.simpleicons.org/flask/000000',       name: 'Flask'        },
      { logo: 'https://cdn.simpleicons.org/fastapi/009688',     name: 'FastAPI'      },
      { logo: 'https://cdn.simpleicons.org/flutter/02569B',     name: 'Flutter'      },
    ],
  },
  {
    key: 'ml',
    label: 'ML / Data',
    items: [
      { logo: 'https://cdn.simpleicons.org/pandas/150458',      name: 'Pandas'       },
      { logo: 'https://cdn.simpleicons.org/numpy/013243',       name: 'NumPy'        },
      { logo: 'https://cdn.simpleicons.org/scikitlearn/F7931E', name: 'Scikit-learn' },
      { logo: 'https://cdn.simpleicons.org/pytorch/EE4C2C',     name: 'PyTorch'      },
      { logo: 'https://cdn.simpleicons.org/plotly/3F4F75',      name: 'Plotly'       },
      { logo: 'https://cdn.simpleicons.org/langchain/1C3C3C',   name: 'LangChain'    },
      { logo: 'https://cdn.simpleicons.org/langchain/1C3C3C',   name: 'LangGraph'    },
      { logo: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg', name: 'Matplotlib' },
    ],
  },
  {
    key: 'cloud',
    label: 'Cloud & DevOps',
    items: [
      { logo: 'https://cdn.simpleicons.org/firebase/FFCA28',   name: 'Firebase'   },
      { logo: 'https://cdn.simpleicons.org/supabase/3ECF8E',   name: 'Supabase'   },
      { logo: 'https://cdn.simpleicons.org/postgresql/4169E1', name: 'PostgreSQL'  },
      { logo: 'https://cdn.simpleicons.org/mysql/4479A1',      name: 'MySQL'       },
      { logo: 'https://cdn.simpleicons.org/git/F05032',        name: 'Git'         },
      { logo: 'https://cdn.simpleicons.org/github/181717',     name: 'GitHub'      },
      { logo: 'https://cdn.simpleicons.org/npm/CB3837',        name: 'npm'         },
      { logo: 'https://cdn.simpleicons.org/postman/FF6C37',    name: 'Postman'     },
      { logo: 'https://cdn.simpleicons.org/composer/885630',   name: 'Composer'    },
    ],
  },
]

const skillCategories = [
  { icon: <CodeBracketIcon className="w-[18px] h-[18px]"/>, title: 'Programming Languages', skills: ['Python','SQL','PHP','JavaScript'] },
  { icon: <CpuChipIcon    className="w-[18px] h-[18px]"/>, title: 'Data & ML',             skills: ['Pandas','NumPy','Scikit-learn','PyTorch','LangChain'] },
  { icon: <CircleStackIcon className="w-[18px] h-[18px]"/>, title: 'Databases',             skills: ['PostgreSQL','MySQL','SQLite'] },
  { icon: <ChartBarIcon   className="w-[18px] h-[18px]"/>, title: 'Visualization',         skills: ['Matplotlib','Seaborn','Plotly','Tableau'] },
  { icon: <CubeIcon       className="w-[18px] h-[18px]"/>, title: 'Frameworks & Tools',    skills: ['Laravel','FastAPI','Git','Jupyter'] },
  { icon: <Squares2X2Icon className="w-[18px] h-[18px]"/>, title: 'Frontend',              skills: ['HTML','CSS','React','Tailwind CSS'] },
]

const projects = [
  {
    title: 'SupportIQ',
    description: 'An AI-powered chatbot that answers customer inquiries using uploaded company documents.',
    stack: ['Python','FastAPI','React', 'Tailwind', 'LangChain'],
    status: 'Website Screenshots',
    images: [
      '/SupportIQ/chat.jpg',
      '/SupportIQ/login.jpg',
      '/SupportIQ/dashboard.jpg'
    ],
    github: 'https://github.com/miku1001/SupportIQ',
    visit: 'https://support-iq-3pli.vercel.app/',
    accent: 'from-indigo-900/80 to-blue-900/80',
  },
  {
    title: 'StudentHub',
    description: 'Small student productivity hub built on Laravel 12 and Livewire. It provides quick notes, schedule management, a simple secure vault, and a "buddy" feature.',
    stack: ['PHP','Laravel','Livewire','mySQL','Tailwind'],
    status: 'Website Screenshots',
    images: [
      '/studenthub/hero.jpg',
      '/studenthub/dashboard.jpg',
      '/studenthub/notes.jpg',
      '/studenthub/schedule.jpg',
      '/studenthub/vault.jpg',
      '/studenthub/chat.jpg',
    ],
    github: 'https://github.com/miku1001/Student-Hub',
    accent: 'from-violet-900/80 to-indigo-900/80',
  },
  {
    title: 'Banana Classify',
    description: 'An app that will help predict whether the given picture of banana is unripe, ripe, overripe, or rotten.',
    stack: ['Python','Sckit-learn', 'Streamlit'],
    status: 'Website Screenshot',
    images: [
      '/banana/banana_front.jpg',
      '/banana/banana_back.jpg'
    ],
    github: 'https://github.com/miku1001/Banana-classify-using-SVM',
    visit: 'https://classify-banana.streamlit.app/',
    accent: 'from-cyan-900/80 to-blue-900/80',
  },
]

const achievements = [
  { year: '2026', title: 'Data Analytics Hackathon Finalist', type: 'Competition',  icon: '🏆' },
  { year: '2025', title: "Dean's List Recognition",           type: 'Academic',      icon: '🎓' },
  {
    year: '2026',
    title: 'AI Engineer for Data Scientists Associate (DataCamp)',
    type: 'Certification',
    icon: '🤖',
    image: '/certifications/adsa.jpg',
  },
  {
    year: '2026',
    title: 'AWS AI Practitioner Challenge (Udacity)',
    type: 'Certification',
    icon: '☁️',
    image: '/certifications/aipc.jpg',
  },
  {
    year: '2026',
    title: 'AI Fundamentals (DataCamp)',
    type: 'Certification',
    icon: '🧠',
    image: '/certifications/af.png',
  },
  {
    year: '2026',
    title: 'Software Engineer Intern (HackerRank)',
    type: 'Certification',
    icon: '💻',
    image: '/certifications/sei.jpg',
  },
  {
    year: '2026',
    title: 'Claude Code in Action (Anthropic)',
    type: 'Certification',
    icon: '🟢',
    image: '/certifications/cai.jpg',
  },
  {
    year: '2025',
    title: 'Python Data Associate (DataCamp)',
    type: 'Certification',
    icon: '🐍',
    image: '/certifications/pda.jpg',
  },
]

const experienceData = [
  {
    role: 'Programmer/Developer Intern',
    company: 'Department of Science and Technology – PES - ITD',
    period: 'July 2025 – September 2025',
    highlights: [
      'Contributed to full-stack development of a DOST web initiative using Laravel (PHP), Bootstrap, JavaScript, and MySQL, implementing core backend features including 15+ database migrations, secure authentication, and CRUD operations.',
      'Debugged and tuned performance to ensure system stability while collaborating with senior developers.',
    ],
  },
  {
    role: 'AI Software Developer Intern',
    company: 'NTEK Systems Inc.',
    period: 'July 2024 – September 2024',
    highlights: [
      'Engineered a Retrieval-Augmented Generation (RAG) pipeline using Python, LangChain, Hugging Face Transformers, and FAISS to connect LLMs with private datasets, improving response relevance and reducing query latency.',
      'Developed scalable Flask-based backend APIs for real-time AI interactions while improving model precision and minimizing hallucinations through iterative testing and prompt engineering.',
    ],
  },
]

// ─── Floating icons data ────────────────────────────────────────────────────────

const floatingIcons = [
  { logo: 'https://cdn.simpleicons.org/python/3776AB',      top: '12%',  left: '5%',   size: 52, dur: '9s',  delay: '0s'    },
  { logo: 'https://cdn.simpleicons.org/pytorch/EE4C2C',     top: '70%',  left: '8%',   size: 40, dur: '11s', delay: '-3s'   },
  { logo: 'https://cdn.simpleicons.org/pandas/150458',      top: '25%',  left: '88%',  size: 44, dur: '10s', delay: '-2s'   },
  { logo: 'https://cdn.simpleicons.org/postgresql/4169E1',  top: '60%',  left: '92%',  size: 38, dur: '8s',  delay: '-5s'   },
  { logo: 'https://cdn.simpleicons.org/scikitlearn/F7931E', top: '80%',  left: '45%',  size: 42, dur: '12s', delay: '-1s'   },
  { logo: 'https://cdn.simpleicons.org/react/61DAFB',       top: '15%',  left: '55%',  size: 36, dur: '7s',  delay: '-4s'   },
  { logo: 'https://cdn.simpleicons.org/laravel/FF2D20',     top: '45%',  left: '2%',   size: 40, dur: '13s', delay: '-6s'   },
  { logo: 'https://cdn.simpleicons.org/plotly/3F4F75',      top: '5%',   left: '78%',  size: 34, dur: '9s',  delay: '-2.5s' },
  { logo: 'https://cdn.simpleicons.org/langchain/1C3C3C',   top: '88%',  left: '20%',  size: 38, dur: '10s', delay: '-7s'   },
  { logo: 'https://cdn.simpleicons.org/javascript/F7DF1E',  top: '50%',  left: '75%',  size: 36, dur: '8s',  delay: '-3.5s' },
  { logo: 'https://cdn.simpleicons.org/html5/E34F26',       top: '35%',  left: '20%',  size: 30, dur: '11s', delay: '-1.5s' },
  { logo: 'https://cdn.simpleicons.org/tailwindcss/06B6D4', top: '90%',  left: '65%',  size: 34, dur: '9s',  delay: '-8s'   },
  { logo: 'https://cdn.simpleicons.org/django/092E20',      top: '8%',   left: '32%',  size: 40, dur: '10s', delay: '-2s'   },
  { logo: 'https://cdn.simpleicons.org/flask/000000',       top: '55%',  left: '55%',  size: 36, dur: '8s',  delay: '-4.5s' },
  { logo: 'https://cdn.simpleicons.org/fastapi/009688',     top: '40%',  left: '85%',  size: 38, dur: '11s', delay: '-1s'   },
  { logo: 'https://cdn.simpleicons.org/bootstrap/7952B3',   top: '75%',  left: '30%',  size: 36, dur: '9s',  delay: '-6.5s' },
  { logo: 'https://cdn.simpleicons.org/firebase/FFCA28',    top: '20%',  left: '42%',  size: 38, dur: '12s', delay: '-3s'   },
  { logo: 'https://cdn.simpleicons.org/git/F05032',         top: '65%',  left: '18%',  size: 40, dur: '10s', delay: '-5.5s' },
  { logo: 'https://cdn.simpleicons.org/github/181717',      top: '30%',  left: '65%',  size: 36, dur: '8s',  delay: '-2s'   },
  { logo: 'https://cdn.simpleicons.org/postman/FF6C37',     top: '85%',  left: '78%',  size: 34, dur: '11s', delay: '-7.5s' },
  { logo: 'https://cdn.simpleicons.org/composer/885630',    top: '48%',  left: '38%',  size: 32, dur: '9s',  delay: '-4s'   },
  { logo: 'https://cdn.simpleicons.org/npm/CB3837',         top: '18%',  left: '15%',  size: 34, dur: '10s', delay: '-1.5s' },
]

// ─── Icons ─────────────────────────────────────────────────────────────────────

const GithubIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)

const LinkedinIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

// ─── Scroll-reveal hook ────────────────────────────────────────────────────────

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

// ─── Typing effect component ───────────────────────────────────────────────────

function TypingEffect({ texts = ['Software Engineer'], speed = 80, delayBetween = 1500 }) {
  const [text, setText] = useState('')
  const [idx, setIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const curr = texts[idx]
    const timer = setTimeout(() => {
      if (!isDeleting && charIdx < curr.length) {
        setText(curr.slice(0, charIdx + 1))
        setCharIdx(charIdx + 1)
      } else if (isDeleting && charIdx > 0) {
        setText(curr.slice(0, charIdx - 1))
        setCharIdx(charIdx - 1)
      } else if (!isDeleting && charIdx === curr.length) {
        setTimeout(() => setIsDeleting(true), delayBetween)
      } else {
        setIsDeleting(false)
        setIdx((idx + 1) % texts.length)
      }
    }, isDeleting ? speed / 2 : speed)
    return () => clearTimeout(timer)
  }, [text, charIdx, isDeleting, idx, texts, speed, delayBetween])

  return <span>{text}<span className="typing-cursor">|</span></span>
}

// ─── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [showTop, setShowTop] = useState(false)
  const [projectImageTick, setProjectImageTick] = useState(0)
  const [skillsTab, setSkillsTab] = useState(skillsTabs[0].key)
  const [isDark, setIsDark] = useState(() => {
    const s = localStorage.getItem('theme')
    return s ? s === 'dark' : true
  })

  useReveal()

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  useEffect(() => {
    const interval = setInterval(() => {
      setProjectImageTick(prev => prev + 1)
    }, 3200)
    return () => clearInterval(interval)
  }, [])

  // Achievements will be displayed in a scrollable container on small screens

  return (
    <div className="font-body">

      {/* ── NAVBAR ── */}
      <header className="navbar fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto w-full px-6 h-[68px] flex items-center justify-between">
          <a href="#home" className="font-title text-xl font-black gradient-text tracking-wide">TeDev</a>
          <div className="flex items-center gap-3">
            <nav className="hidden md:flex items-center gap-7 pr-7">
              {['Home','About','Projects','Skills','Achievements','Contact'].map(link => (
                <a key={link} href={`#${link.toLowerCase()}`} className="nav-link">{link}</a>
              ))}
            </nav>
            <button
              onClick={() => setIsDark(p => !p)}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--text-2)] hover:text-[var(--accent)] hover:bg-[rgba(99,102,241,0.1)] transition-all"
            >
              {isDark ? <SunIcon className="w-5 h-5"/> : <MoonIcon className="w-5 h-5"/>}
            </button>
            <a
              href="/Ted Paulo Feranil-Resume.pdf"
              download="Ted Paulo Feranil-Resume.pdf"
              className="btn-primary text-white text-sm font-bold px-5 py-2 rounded-lg"
            >
              Resume
            </a>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section id="home" className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden bg-[var(--surface-2)] hero-grid noise">
        <div className="hero-blob hero-blob-1"/>
        <div className="hero-blob hero-blob-2"/>

        <div className="floating-icons-bg">
          {floatingIcons.map((icon, i) => (
            <img
              key={i}
              src={icon.logo}
              alt=""
              aria-hidden="true"
              className="floating-icon"
              style={{
                top: icon.top,
                left: icon.left,
                width: icon.size,
                height: icon.size,
                '--duration': icon.dur,
                '--delay': icon.delay,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-14">
          {/* Left */}
          <div>
            <div className="reveal delay-1 inline-flex items-center gap-2 bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.25)] text-[var(--accent)] text-xs font-bold px-4 py-1.5 rounded-full mb-6 font-mono tracking-wide">
              <SparklesIcon className="w-3.5 h-3.5"/> Open to work
            </div>
            <h1 className="font-title reveal delay-2 text-5xl lg:text-7xl font-extrabold leading-[1.05] mb-3">
              <span className="text-[var(--text)]">Ted </span>
              <span className="gradient-text">Paulo</span>
            </h1>
            <p className="reveal delay-3 text-[var(--text-2)] text-xl font-medium mb-5">
              <TypingEffect
                texts={['Software Engineer', 'AI/ML Developer']}
                speed={80}
                delayBetween={1500}
              />
            </p>
            <p className="reveal delay-4 text-[var(--text-2)] text-base leading-relaxed max-w-lg mb-8">
              Building elegant data products and practical machine learning tools with modern web technologies.
            </p>
            <div className="reveal delay-5 flex flex-wrap gap-3 mb-8">
              <a href="#contact" className="btn-primary text-white font-bold px-6 py-3 rounded-lg text-sm">
                Contact Me
              </a>
              <a href="#projects"
                className="border-2 border-[var(--border)] hover:border-[rgba(99,102,241,0.5)] hover:text-[var(--accent)] text-[var(--text)] font-bold px-6 py-3 rounded-lg text-sm transition-all hover:-translate-y-0.5">
                View Projects
              </a>
            </div>
            <div className="reveal flex gap-5 items-center">
              {[
                { href: 'https://github.com/miku1001/',                                    label: 'GitHub',   Icon: GithubIcon   },
                { href: 'https://www.linkedin.com/in/ted-paulo-feranil-3643502ba/',        label: 'LinkedIn', Icon: LinkedinIcon },
                { href: 'mailto:tedpaulo.feranil@gmail.com',                               label: 'Email',    Icon: EnvelopeIcon },
              ].map(({ href, label, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                  className="social-btn w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-2)]">
                  <Icon className="w-5 h-5"/>
                </a>
              ))}
            </div>
          </div>

          {/* Code card */}
          <div className="reveal reveal-right code-card bg-[#0d1117] rounded-2xl overflow-hidden shadow-2xl">
            <div className={`flex items-center justify-between px-4 py-3 ${isDark ? 'bg-[#161b27]' : 'bg-gray-100'} border-b border-white/[0.06]`}>
              <div className="flex gap-[6px]">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]"/>
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"/>
                <span className="w-3 h-3 rounded-full bg-[#28ca42]"/>
              </div>
              <span className="font-mono text-xs text-[#8892a4]">developer.py</span>
            </div>
            <div className="p-5 font-mono text-sm leading-7">
              <div><span className="c-comment"># AI Software Engineer</span></div>
              <br/>
              <div><span className="c-var">information</span><span className="c-op"> = </span><span className="c-bracket">{'{'}</span></div>
              <div>&nbsp;&nbsp;<span className="c-key">'Name'</span><span className="c-op">: </span><span className="c-str">'Ted Paulo Feranil'</span><span className="c-op">,</span></div>
              <div>&nbsp;&nbsp;<span className="c-key">'skills'</span><span className="c-op">: </span><span className="c-op">[</span><span className="c-str">'Python'</span><span className="c-op">, </span><span className="c-str">'SQL'</span><span className="c-op">, </span><span className="c-str">'PHP'</span><span className="c-op">],</span></div>
              <div>&nbsp;&nbsp;<span className="c-key">'focuses'</span><span className="c-op">: </span><span className="c-op">[</span><span className="c-str">'Software Dev'</span><span className="c-op">, </span><span className="c-str">'AI/ML'</span><span className="c-op">, </span><span className="c-str">'Gen AI'</span><span className="c-op">, </span><span className="c-str">'Agentic AI'</span><span className="c-op">],</span></div>
              <div>&nbsp;&nbsp;<span className="c-key">'status'</span><span className="c-op">: </span><span className="c-str">'Open to work'</span></div>
              <div><span className="c-bracket">{'}'}</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="relative min-h-screen flex flex-col justify-center pt-24 pb-18 bg-[var(--surface-2)] hero-grid noise overflow-hidden">
        <div className="hero-blob hero-blob-3"/>
        <div className="hero-blob hero-blob-4"/>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6">
          <div className="reveal mb-12">
            <h2 className="section-title font-title text-4xl font-extrabold text-[var(--text)]">About Me</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-start">
            <div className="flex flex-col gap-6 order-last lg:order-first">
              {/* Bio */}
              <div className="reveal">
                <div className="flex items-center gap-2 text-sm font-bold mb-3 text-[var(--text)]">
                  <UserIcon className="w-4 h-4 text-[var(--accent)]"/> Bio
                </div>
                <p className="text-[var(--text-2)] leading-relaxed max-w-3xl text-base">
                  An Innovative BS Computer Engineering student with focus on Machine Learning and AI, passionate about developing
                  scalable, real-time AI systems and full-stack solutions. Aims to contribute practical solutions through hands-on experience
                  in AI/ML pipelines, backend development, and data-driven problem solving.
                </p>
              </div>

              {/* Education card */}
              <div className="about-card-education card card-glow reveal p-6">
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[rgba(99,102,241,0.12)] flex items-center justify-center">
                      <AcademicCapIcon className="w-5 h-5 text-[var(--accent)]"/>
                    </div>
                    <h3 className="font-title font-bold text-[var(--text)]">Education</h3>
                  </div>
                  <span className="font-mono text-xs text-[var(--accent-2)] bg-[rgba(6,182,212,0.1)] border border-[rgba(6,182,212,0.25)] px-3 py-1 rounded-full">Current</span>
                </div>
                <p className="font-bold text-[var(--text)] mb-1">BS in Computer Engineering, Major in AI/ML</p>
                <p className="text-[var(--text-2)] text-sm mb-3">Polytechnic University of the Philippines - Manila</p>
                <p className="text-[var(--text-2)] text-xs font-mono mb-4">2022 – Present</p>
                <div className="flex flex-wrap gap-2">
                  {['Software Engineering','Data Science','AI/ML'].map(tag => (
                    <span key={tag} className="skill-pill text-xs bg-[rgba(99,102,241,0.08)] border border-[rgba(99,102,241,0.2)] text-[var(--accent)] px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience Timeline */}
              <div className="about-card-experience card card-glow reveal p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[rgba(6,182,212,0.1)] flex items-center justify-center">
                    <BriefcaseIcon className="w-5 h-5 text-[var(--accent-2)]"/>
                  </div>
                  <h3 className="font-title font-bold text-[var(--text)]">Experience</h3>
                </div>
                <div className="space-y-5 relative">
                  <div className="absolute left-[14px] top-4 bottom-0 w-px bg-gradient-to-b from-[var(--accent)] via-[var(--accent-2)] to-transparent"/>
                  {experienceData.map((exp, idx) => (
                    <div key={idx} className={`exp-timeline-item relative pl-10 delay-${idx + 1}`}>
                      <div
                        className="timeline-dot absolute left-1 top-1.5 w-6 h-6 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] border-2 border-[var(--surface)] shadow-lg"
                        style={{ animationDelay: `${idx * 0.8}s` }}
                      />
                      <p className="font-bold text-base text-[var(--text)]">{exp.role}</p>
                      <p className="text-[var(--text-2)] text-sm mb-1">{exp.company}</p>
                      <p className="gradient-text font-mono text-xs font-semibold mb-2">{exp.period}</p>
                      <ul className="space-y-1">
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="text-sm text-[var(--text-2)] flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-[var(--accent)] mt-1.5 flex-shrink-0"/>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Profile card */}
            <div className="reveal reveal-right flex flex-col items-center gap-4 w-full lg:w-56 group lg:-mt-20 order-first lg:order-last">
              <div className="relative w-88 h-88 flex items-center justify-center">
                {/* Orbiting icons */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="rotate-[25deg]">
                    <div className="translate-y-[-152px]">
                      <div className="relative w-12 h-12 bg-white border border-cyan-500/60 rounded-full flex items-center justify-center rotate-[-25deg] overflow-hidden dark:bg-[var(--surface-2)]">
                        <span aria-hidden="true" className="absolute inset-0 bg-cyan-500/10" />
                        <CodeBracketIcon className="relative z-10 w-6 h-6 text-cyan-300"/>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-0 left-0 rotate-[40deg]">
                    <div className="translate-y-[-152px]">
                      <div className="relative w-14 h-14 bg-white border border-lime-500/50 rounded-full flex items-center justify-center rotate-[-40deg] overflow-hidden dark:bg-[var(--surface-2)]">
                        <span aria-hidden="true" className="absolute inset-0 bg-lime-500/10" />
                        <CircleStackSolid className="relative z-10 w-7 h-7 text-lime-300"/>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-0 left-0 rotate-[55deg]">
                    <div className="translate-y-[-152px]">
                      <div className="relative w-16 h-16 bg-white border border-orange-500/50 rounded-full flex items-center justify-center rotate-[-55deg] overflow-hidden dark:bg-[var(--surface-2)]">
                        <span aria-hidden="true" className="absolute inset-0 bg-orange-500/10" />
                        <CpuChipIcon className="relative z-10 w-8 h-8 text-orange-400"/>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-0 left-0 rotate-[70deg]">
                    <div className="translate-y-[-152px]">
                      <div className="relative w-[52px] h-[52px] bg-white border border-purple-500/50 rounded-full flex items-center justify-center rotate-[-70deg] overflow-hidden dark:bg-[var(--surface-2)]">
                        <span aria-hidden="true" className="absolute inset-0 bg-purple-500/10" />
                        <Squares2X2Solid className="relative z-10 w-7 h-7 text-purple-400"/>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile circle */}
                <div className="relative">
                  <div className="w-72 h-72 border-2 border-[var(--accent)] dark:border-white rounded-full flex items-center justify-center overflow-hidden p-3">
                    <img
                      src="/image.png"
                      alt="Ted Paulo"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <a
                    href="/Ted Paulo Feranil-Resume.pdf"
                    download="Ted Paulo Feranil-Resume.pdf"
                    className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 z-30 inline-flex rounded-full bg-white p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:bg-[var(--surface-2)]"
                  >
                    <div className="relative bg-[var(--accent)] hover:bg-[var(--accent-2)] text-white px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg whitespace-nowrap">
                      <ArrowDownTrayIcon className="w-3.5 h-3.5"/> Download my CV
                      <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-3 border-b-3 border-r-3 border-t-transparent border-b-transparent border-r-[var(--accent)] group-hover:border-r-[var(--accent-2)]"/>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="relative min-h-screen flex flex-col justify-center py-24 bg-[var(--surface-2)] hero-grid noise overflow-hidden">
        <div className="hero-blob hero-blob-1"/>
        <div className="hero-blob hero-blob-4"/>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6">
          <div className="reveal mb-12">
            <h2 className="section-title font-title text-4xl font-extrabold text-[var(--text)] mb-3">Projects</h2>
            <p className="text-[var(--text-2)] text-base max-w-2xl mt-4">
              Selected work demonstrating my skills in analytics, machine learning, and product-oriented development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <article key={project.title}
                className={`reveal card overflow-hidden flex flex-col delay-${i + 1}`}>
                {/* Thumbnail */}
                <div className={`relative w-full aspect-video bg-gradient-to-br ${project.accent} flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-0 z-[1] bg-gradient-to-br from-[rgba(99,102,241,0.3)] to-transparent pointer-events-none"/>
                  {project.images?.length ? (
                    <div className="absolute inset-0">
                      <img
                        src={project.images[projectImageTick % project.images.length]}
                        alt={`${project.title} preview`}
                        className="absolute inset-0 w-full h-full object-contain bg-[#0b1020]"
                      />
                    </div>
                  ) : (
                    <span className="relative text-6xl opacity-50 select-none">{project.emoji}</span>
                  )}
                  <span className="absolute z-[2] bottom-2 left-3 font-mono text-[11px] text-white/50 bg-black/30 px-2 py-0.5 rounded-full">
                    {project.status}
                  </span>
                </div>
                {/* Body */}
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <h3 className="font-title font-bold text-base text-[var(--text)]">{project.title}</h3>
                  <p className="text-[var(--text-2)] text-sm leading-relaxed flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map(s => (
                      <span key={s} className="skill-pill bg-[rgba(99,102,241,0.06)] border border-[rgba(99,102,241,0.15)] text-[var(--text-2)] font-mono text-[11px] px-3 py-1 rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="border-t border-[var(--border)] pt-3 flex items-center gap-2">
                    <a href={project.github} target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--text-2)] hover:bg-[rgba(99,102,241,0.1)] hover:border-[rgba(99,102,241,0.4)] hover:text-[var(--accent)] transition-all">
                      <GithubIcon className="w-4 h-4"/> GitHub
                    </a>
                    {project.visit ? (
                      <a href={project.visit} target="_blank" rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--text-2)] hover:bg-[rgba(6,182,212,0.1)] hover:border-[rgba(6,182,212,0.4)] hover:text-[var(--accent-2)] transition-all">
                        Visit
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="relative flex flex-col pt-24 pb-20 bg-[var(--surface-2)] hero-grid noise overflow-hidden">
        <div className="hero-blob hero-blob-3"/>
        <div className="hero-blob hero-blob-2"/>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6">
          <div className="reveal mb-12">
            <h2 className="section-title font-title text-4xl font-extrabold text-[var(--text)] mb-5">Technical Skills</h2>
            <p className="text-[var(--text-2)] text-base">My expertise across various technologies and tools</p>
          </div>

          <div className="mx-auto w-full max-w-7xl">
            {/* Tabs */}
            <div className="reveal flex justify-center mb-10">
              <div className="inline-flex items-center gap-1 p-1 rounded-full border border-[var(--border)] bg-[rgba(99,102,241,0.06)]">
                {skillsTabs.map(tab => {
                  const isActive = tab.key === skillsTab
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setSkillsTab(tab.key)}
                      className={
                        'px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ' +
                        (isActive
                          ? 'bg-[rgba(99,102,241,0.18)] text-[var(--accent)] shadow-inner'
                          : 'text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[rgba(99,102,241,0.08)]')
                      }
                    >
                      {tab.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Pill grid (fixed height) */}
            <div className="reveal card p-4 md:p-6">
              <div
                key={skillsTab}
                className="h-full overflow-y-auto pr-1"
              >
                <div className="min-h-full flex justify-center">
                  <div className="w-full md:max-w-[1020px]">
                    <div className="flex flex-wrap justify-center content-start gap-2 md:gap-3">
                      {(skillsTabs.find(t => t.key === skillsTab) ?? skillsTabs[0]).items.map((item, i) => (
                        <div
                          key={item.name}
                          className="skill-pill-animated inline-flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl
                            border border-[var(--border)] bg-[var(--surface-2)]
                            hover:border-[rgba(99,102,241,0.5)] hover:bg-[rgba(99,102,241,0.07)]
                            hover:-translate-y-1 hover:shadow-lg
                            transition-all duration-200 cursor-default"
                          style={{ animationDelay: `${i * 45}ms` }}
                        >
                          <img
                            src={item.logo}
                            alt=""
                            aria-hidden="true"
                            className="w-5 h-5 object-contain"
                            onError={e => { e.currentTarget.style.display = 'none' }}
                          />
                          <span className="font-mono text-sm font-semibold text-[var(--text)]">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section id="achievements" className="relative min-h-screen flex flex-col justify-center pt-24 pb-20 bg-[var(--surface-2)] hero-grid noise overflow-hidden">
        <div className="hero-blob hero-blob-3"/>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6">
          <div className="reveal mb-12">
            <h2 className="section-title font-title text-4xl font-extrabold text-[var(--text)] mb-3">Achievements</h2>
            <p className="text-[var(--text-2)] text-base max-w-2xl mt-4">
              Milestones from competitions, academics, and certifications.
            </p>
          </div>

          <div className="max-h-[60vh] sm:max-h-none overflow-y-auto pr-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.filter(item => item.image).map((item, i) => (
                <article key={item.title}
                  className={`reveal card p-2 hover:-translate-y-2 delay-${i + 1}`}>
                  <a
                    href={item.image}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--surface)] p-2"
                  >
                    <img
                      src={item.image}
                      alt="Certification image"
                      className="w-full h-56 object-contain"
                    />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="relative min-h-screen flex flex-col justify-center py-24 bg-[var(--surface-2)] hero-grid noise overflow-hidden">
        <div className="hero-blob hero-blob-4"/>
        <div className="hero-blob hero-blob-2"/>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6">
          <div className="reveal mb-12">
            <h2 className="section-title font-title text-4xl font-extrabold text-[var(--text)] mb-3">Get In Touch</h2>
            <p className="text-[var(--text-2)] text-base max-w-2xl mt-4">
              Have a question or want to work together? Feel free to drop me a message.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[0.75fr_1.25fr] gap-10 items-start">
            {/* Left */}
            <div className="reveal reveal-left">
              <p className="font-title font-bold text-base text-[var(--text)] mb-1">Contact Information</p>
              <p className="text-[var(--text-2)] text-sm leading-relaxed mb-6">
                Fill up the form and I'll get back to you as soon as possible.
              </p>
              <div className="flex flex-col gap-4 mb-8">
                {[
                  { Icon: EnvelopeIcon, label: 'Email',    val: 'tedpaulo.feranil@gmail.com', href: 'mailto:tedpaulo.feranil@gmail.com' },
                  { Icon: PhoneIcon,    label: 'Phone',    val: '+63 915 7996 213',            href: null },
                  { Icon: MapPinIcon,   label: 'Location', val: 'Manila, Philippines',         href: null },
                ].map(({ Icon, label, val, href }) => (
                  <div key={label} className="flex items-start gap-3">
                    <span className="w-10 h-10 bg-[rgba(99,102,241,0.1)] rounded-xl flex items-center justify-center text-[var(--accent)] flex-shrink-0">
                      <Icon className="w-5 h-5"/>
                    </span>
                    <div>
                      <p className="text-sm font-bold text-[var(--text)]">{label}</p>
                      {href
                        ? <a href={href} className="text-xs text-[var(--text-2)] hover:text-[var(--accent)] transition-colors">{val}</a>
                        : <p className="text-xs text-[var(--text-2)]">{val}</p>
                      }
                    </div>
                  </div>
                ))}
              </div>
              <p className="font-bold text-sm text-[var(--text)] mb-3">Connect with me</p>
              <div className="flex gap-3">
                {[
                  { href: 'https://github.com/miku1001/',                             Icon: GithubIcon,   label: 'GitHub'   },
                  { href: 'https://www.linkedin.com/in/ted-paulo-feranil-3643502ba/', Icon: LinkedinIcon, label: 'LinkedIn' },
                  { href: 'mailto:tedpaulo.feranil@gmail.com',                        Icon: EnvelopeIcon, label: 'Email'    },
                ].map(({ href, Icon, label }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                    className="social-btn w-11 h-11 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-2)]">
                    <Icon className="w-5 h-5"/>
                  </a>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="reveal reveal-right card p-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {[
                  { label: 'Your Name',  placeholder: 'John Doe',             type: 'text'  },
                  { label: 'Your Email', placeholder: 'john@example.com',     type: 'email' },
                ].map(f => (
                  <div key={f.label} className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[var(--text)]">{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      className="form-input rounded-lg px-4 py-2.5 text-sm font-mono"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-1.5 mb-4">
                <label className="text-sm font-semibold text-[var(--text)]">Subject</label>
                <input
                  type="text"
                  placeholder="How can I help you?"
                  className="form-input rounded-lg px-4 py-2.5 text-sm font-mono"
                />
              </div>
              <div className="flex flex-col gap-1.5 mb-6">
                <label className="text-sm font-semibold text-[var(--text)]">Message</label>
                <textarea
                  rows={5}
                  placeholder="Your message here..."
                  className="form-input rounded-lg px-4 py-2.5 text-sm font-mono resize-y"
                />
              </div>
              <button
                type="button"
                className="btn-primary w-full text-white font-bold py-3 rounded-lg text-sm"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative border-t border-[var(--border)] py-8 bg-[var(--surface-2)] hero-grid noise overflow-hidden">
        <div className="hero-blob hero-blob-footer"/>
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 flex flex-wrap justify-between items-center gap-3">
          <a href="#home" className="font-title font-extrabold gradient-text text-lg">TeDev</a>
          <p className="text-[var(--text-2)] text-sm">© 2026 Ted Paulo Feranil · Built with React + Tailwind</p>
        </div>
      </footer>

      {/* ── SCROLL TO TOP ── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        className={`back-top fixed bottom-7 right-7 z-50 w-11 h-11 rounded-full text-white flex items-center justify-center
          ${showTop ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <ChevronUpIcon className="w-5 h-5"/>
      </button>
    </div>
  )
}