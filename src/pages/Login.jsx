import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Send, GraduationCap, User, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! Please enter the Student Registration Number to start verification.",
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ])
  
  const [input, setInput] = useState('')
  const [step, setStep] = useState('reg') // 'reg' | 'phone' | 'otp'
  const [authData, setAuthData] = useState({ regNumber: '', parentPhone: '' })
  const [isLoading, setIsLoading] = useState(false)
  
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const pushMessage = (text, sender) => {
    setMessages(prev => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        text,
        sender,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ])
  }

  const handleSend = async () => {
    const userText = input.trim()
    if (!userText || isLoading) return

    pushMessage(userText, 'user')
    setInput('')
    setIsLoading(true)

    try {
      if (step === 'reg') {
        const res = await fetch('/api/v1/auth/verify-reg', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ regNumber: userText })
        })
        const data = await res.json()
        
        if (res.ok) {
          setAuthData(prev => ({ ...prev, regNumber: userText }))
          setStep('phone')
          setTimeout(() => pushMessage("Enter your Registered Mobile Number.", 'bot'), 400)
        } else {
          setTimeout(() => pushMessage(data.error || "Student not found. Please check and try again.", 'bot'), 400)
        }
      } 
      else if (step === 'phone') {
        const res = await fetch('/api/v1/auth/verify-phone', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ regNumber: authData.regNumber, parentPhone: userText })
        })
        const data = await res.json()

        if (res.ok) {
          setAuthData(prev => ({ ...prev, parentPhone: userText }))
          setStep('otp')
          setTimeout(() => pushMessage(data.message || "OTP sent. Please enter the code sent to your mobile.", 'bot'), 400)
        } else {
          setTimeout(() => pushMessage(data.error || "Phone number mismatch. Please try again.", 'bot'), 400)
        }
      }
      else if (step === 'otp') {
        const res = await fetch('/api/v1/auth/verify-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            regNumber: authData.regNumber,
            parentPhone: authData.parentPhone,
            otp: userText
          })
        })
        const data = await res.json()

        if (res.ok) {
          setTimeout(() => {
            pushMessage("Verified! Redirecting to Dashboard...", 'bot')
            localStorage.setItem('token', data.token)
            localStorage.setItem('auth', JSON.stringify(data.student))
            setTimeout(() => navigate('/dashboard', { replace: true }), 1000)
          }, 400)
        } else {
          setTimeout(() => pushMessage(data.error || "Incorrect OTP. Try again.", 'bot'), 400)
        }
      }
    } catch (err) {
      setTimeout(() => pushMessage("System error. Please retry.", 'bot'), 400)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend()
  }

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#0F172A] flex items-center justify-center p-4">
      {/* Soft Decorative Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px]" />

      <div className="w-full max-w-md relative z-10 flex flex-col h-[580px] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Compact Header */}
        <div className="bg-white dark:bg-slate-900 px-8 pt-8 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-slate-800 dark:text-white leading-tight">Parent Verification</h1>
              <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Secure Login</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400">ONLINE</span>
          </div>
        </div>

        {/* Messaging Area */}
        <div className="flex-1 overflow-y-auto px-8 py-4 space-y-4 scrollbar-hide">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-1 duration-300`}
            >
              <div
                className={`max-w-[85%] px-4 py-3 rounded-2xl shadow-sm text-sm ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-tl-none border border-slate-200 dark:border-slate-700'
                }`}
              >
                <p className="leading-relaxed">{msg.text}</p>
                <span className={`text-[9px] mt-1.5 block text-right opacity-50`}>{msg.time}</span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-tl-none px-4 py-3 flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 animate-bounce" />
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Compact Input Field */}
        <div className="px-8 pb-8 pt-2">
          <div className="relative">
            <input
              type={step === 'phone' ? 'tel' : 'text'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                step === 'reg' ? "Registration Number..." :
                step === 'phone' ? "Registered Phone..." :
                "6-digit OTP..."
              }
              disabled={isLoading}
              className="w-full bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-white text-sm font-medium px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all placeholder-slate-400 pr-14"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-2 bottom-2 w-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-all disabled:opacity-50 active:scale-95"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-center text-[9px] font-bold text-slate-400 mt-4 uppercase tracking-[0.2em]">Secure Authentication Gateway</p>
        </div>
      </div>
    </div>
  )
}
