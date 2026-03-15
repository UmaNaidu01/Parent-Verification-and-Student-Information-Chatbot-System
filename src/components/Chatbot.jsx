import { useState, useRef, useEffect } from 'react'
import { MessageCircle, Send, X, Mic, MicOff, Languages, Globe, Bot } from 'lucide-react'

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Academic Assistant. Ask me about attendance, CGPA, backlogs, fees, or student details.",
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ])
  const [input, setInput] = useState('')
  const [language, setLanguage] = useState('en')
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef(null)
  const recognitionRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const speak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const langMap = { en: 'en-IN', hi: 'hi-IN', te: 'te-IN' };
    utterance.lang = langMap[language] || 'en-IN';
    window.speechSynthesis.speak(utterance);
  };

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop()
      setIsRecording(false)
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in your browser.")
      return
    }

    const recognition = new SpeechRecognition()
    recognitionRef.current = recognition
    
    const langMap = { en: 'en-IN', hi: 'hi-IN', te: 'te-IN' }
    recognition.lang = langMap[language] || 'en-IN'
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => setIsRecording(true)
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      if (transcript) {
        handleSendVoice(transcript)
      }
    }

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error)
      setIsRecording(false)
      setMessages(prev => [...prev, { id: Date.now(), text: "Sorry, I couldn't understand. Please try again.", sender: "bot", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
    }

    recognition.onend = () => setIsRecording(false)
    recognition.start()
  }

  const handleSendVoice = async (text) => {
    const userMessage = {
      id: Date.now(),
      text,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages((prev) => [...prev, userMessage])
    
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('/api/v1/chatbot/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: text, language })
      })
      
      let botText = "I couldn't process that request right now."
      if (res.ok) {
        const data = await res.json()
        botText = data.response
      }

      const botMessage = {
        id: Date.now() + 1,
        text: botText,
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, botMessage])
      speak(botMessage.text)
    } catch (err) {
      setMessages((prev) => [...prev, { id: Date.now() + 1, text: "Error communicating with the server.", sender: 'bot', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
    }
  }

  const handleSend = async () => {
    if (!input.trim()) return
    const userMessage = {
      id: Date.now(),
      text: input.trim(),
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages((prev) => [...prev, userMessage])
    const userText = input.trim()
    setInput('')

    try {
      const token = localStorage.getItem('token')
      const res = await fetch('/api/v1/chatbot/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: userText, language })
      })
      
      let botText = "I couldn't process that request right now."
      if (res.ok) {
        const data = await res.json()
        botText = data.response
      }

      const botMessage = {
        id: Date.now() + 1,
        text: botText,
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, botMessage])
      speak(botMessage.text)
    } catch (err) {
      const errorMessage = {
        id: Date.now() + 1,
        text: "Error communicating with the server.",
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, errorMessage])
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
        aria-label="Toggle chatbot"
      >
        <MessageCircle className="w-7 h-7" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[480px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-gray-700 flex flex-col overflow-hidden transition-colors duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
               <Bot className="w-5 h-5" />
               <span className="font-semibold">Academic Assistant</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="flex bg-black/20 rounded-lg p-0.5">
                  {['en', 'hi', 'te'].map(l => (
                    <button 
                       key={l}
                       onClick={() => setLanguage(l)}
                       className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter transition-all ${language === l ? 'bg-white text-indigo-600' : 'text-white/60 hover:text-white'}`}
                    >
                       {l}
                    </button>
                  ))}
               </div>
               <button
                 onClick={() => setIsOpen(false)}
                 className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                 aria-label="Close chat"
               >
                 <X className="w-5 h-5" />
               </button>
            </div>
          </div>

          {/* Scrollable Message Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 dark:bg-gray-900">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-br-md'
                      : 'bg-white dark:bg-gray-700 text-slate-800 dark:text-gray-100 border border-slate-200 dark:border-gray-600 rounded-bl-md shadow-sm'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p
                    className={`text-xs mt-1.5 ${
                      msg.sender === 'user' ? 'text-white/80' : 'text-slate-500'
                    }`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex gap-2 flex-col shrink-0 relative">
            {isRecording && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-rose-600 text-white text-[10px] font-black rounded-full shadow-lg animate-bounce flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  LISTENING...
                </div>
            )}
            <div className="flex gap-2 w-full">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={isRecording ? "Listening..." : "Ask in " + (language === 'en' ? 'English' : language === 'hi' ? 'हिंदी' : 'తెలుగు')}
                  className={`w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm placeholder-gray-500 dark:placeholder-gray-400 pr-10 ${isRecording ? 'border-rose-400 ring-2 ring-rose-500/10' : ''}`}
                />
                <button 
                   onClick={toggleRecording}
                   className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg transition-all ${isRecording ? 'bg-rose-500 text-white animate-pulse' : 'text-slate-400 hover:text-indigo-500'}`}
                >
                   {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              </div>
              <button
                type="button"
                onClick={handleSend}
                disabled={isRecording}
                className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
