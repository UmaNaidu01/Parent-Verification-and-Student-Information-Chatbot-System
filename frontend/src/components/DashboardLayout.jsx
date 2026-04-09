import { useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Chatbot from './Chatbot'
import { SemesterProvider } from '../context/SemesterContext'

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('auth')
    localStorage.removeItem('token')
    navigate('/', { replace: true })
  }

  return (
    <SemesterProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-gray-900 transition-colors duration-300">
        <Navbar
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onLogout={handleLogout}
        />
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="flex-1 p-4 md:p-6 lg:p-8 pt-20 lg:pt-24 lg:ml-64 transition-all duration-300">
            <Outlet />
          </main>
        </div>
        <Chatbot />
      </div>
    </SemesterProvider>
  )
}
