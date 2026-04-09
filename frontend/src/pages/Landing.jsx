import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  GraduationCap,
  ArrowRight,
  CalendarCheck,
  Award,
  CreditCard,
  MessageCircle,
  LogIn,
  Shield,
  LayoutDashboard,
  CheckCircle2,
} from 'lucide-react'
import ThemeToggle from '../components/ThemeToggle'

export default function Landing() {
  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How it works', href: '#how-it-works' },
    { name: 'About', href: '#about' },
  ]

  const features = [
    {
      icon: Award,
      title: 'Global Accreditations',
      description: 'ABET and NBA accredited programs ensuring your degree is valued internationally with unmatched quality.',
    },
    {
      icon: CheckCircle2,
      title: 'Quality Placements',
      description: 'Consistently maintaining an 80-85% placement rate, nurturing entrepreneurs and generating thousands of jobs.',
    },
    {
      icon: LayoutDashboard,
      title: 'Stimulating Ambience',
      description: 'Lush green lawns, smart air-conditioned classrooms, and a 1:2 student-to-computer ratio for tech-driven learning.',
    },
    {
      icon: Shield,
      title: 'Holistic Training',
      description: 'Project-based methodology bridging theory and practice, instilling leadership and real-world problem-solving skills.',
    },
  ]



  return (
    <div className="min-h-screen bg-white dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      
      {/* Header / Navbar section */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-[#0b0f19]/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Official Vignan Logo */}
            <div className="flex items-center h-full">
              <img 
                src="https://vignan.ac.in/vignanmall/img/core-img/Logo%20with%20Deemed.svg" 
                alt="Vignan University Logo" 
                className="h-16 w-auto object-contain"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right side buttons */}
            <div className="flex items-center gap-4">
              <ThemeToggle className="hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-full transition-colors" />
              <div className="hidden sm:block h-6 w-px bg-slate-200 dark:bg-slate-800"></div>
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center justify-center font-semibold text-slate-700 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Log in
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2.5 text-sm font-bold text-white transition-all hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden py-20">
          {/* Background Video */}
          <div className="absolute inset-0 z-0 bg-black">
            {/* Dark gradient overlay for text readability - reduced opacity to make video brighter */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none"></div>
            <video 
              autoPlay 
              loop  
              muted 
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Side: Features Grid & Title */}
              <div className="lg:col-span-7 text-white">
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl md:text-5xl font-serif font-bold mb-12 drop-shadow-lg"
                >
                  Smart Academic Monitoring for Better Student Success
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-6">
                  {[
                    { icon: MessageCircle, title: "LEARNING & COUNSELING", desc: "Virtual Lectures, E-Learning Internet Access, Student Mentor & Counseling system" },
                    { icon: Award, title: "PROFESSIONAL EMPOWERMENT", desc: "Personality Development, Psychology, English Language Skills" },
                    { icon: Shield, title: "RESEARCH", desc: "2 CoE's and 18 Advanced Research centers, Labs for Innovation, Incubation & Entrepreneurs" },
                    { icon: LayoutDashboard, title: "OPTIONAL CLUB & SPORTS", desc: "20+ Optional Clubs, 12+ Recreational & Performing Arts" },
                    { icon: GraduationCap, title: "LIBRARIES", desc: "Books, Volumes, E-Journals, Explore 1 Cr+ collection" },
                    { icon: CheckCircle2, title: "WORKFORCE PRACTICUM", desc: "International Internship, Placements & Training" }
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx, duration: 0.5 }}
                      className="flex gap-4 group"
                    >
                      <div className="flex-shrink-0 w-14 h-14 bg-white rounded-xl flex items-center justify-center text-slate-900 shadow-xl group-hover:scale-110 transition-transform">
                        <item.icon className="w-7 h-7" />
                      </div>
                      <div>
                        <h4 className="text-yellow-400 font-bold text-xs uppercase tracking-wider mb-1 drop-shadow-sm">{item.title}</h4>
                        <p className="text-sm text-gray-100 font-medium leading-relaxed drop-shadow-md">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="mt-12 text-center md:text-left"
                >
                  <p className="text-lg font-bold italic text-white/90 bg-black/20 backdrop-blur-sm inline-block px-4 py-2 rounded-lg border border-white/10">
                    Have You Always Been Tagged As Below Average? Do Not Worry... You Are At The Right Place!
                  </p>
                </motion.div>
              </div>

              {/* Right Side: Choose Vignan Card */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] max-w-md border-t-8 border-indigo-600"
                >
                  <h2 className="text-4xl font-serif font-bold text-red-900 mb-6 text-center">Choose Vignan</h2>
                  <p className="text-slate-600 leading-relaxed text-center mb-10 font-medium">
                    With four decades of excellence, Vignan's University (est. 2008) is recognized by UGC, AICTE and the Pharmacy Council, empowering first-generation learners, over 60% from farming families.
                  </p>
                  <div className="flex justify-center">
                    <Link
                      to="/login"
                      className="bg-red-800 hover:bg-red-900 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-all hover:scale-105 flex items-center gap-2 group"
                    >
                      Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="relative border-t border-slate-200/20 dark:border-slate-800/20 py-24 sm:py-32 overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('https://vignan.ac.in/newvignan/assets/images/home/image-12.webp')` }}
            ></div>
            <div className="absolute inset-0 bg-indigo-950/80 dark:bg-[#0b0f19]/90 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-transparent to-slate-900/80"></div>
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black to-transparent pointer-events-none"></div>
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-20"
            >
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6 drop-shadow-md">
                Excellence in Education & Research
              </h2>
              <p className="text-lg text-indigo-100/90 font-medium drop-shadow-sm">
                Join one of India's most trusted institutions, recognized for shaping responsible leaders through a project-based experiential learning approach.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1, duration: 0.6, type: "spring", stiffness: 100 }}
                  className="group relative bg-white/10 dark:bg-[#1a2035]/50 backdrop-blur-xl rounded-[2rem] p-8 border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.15)] transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6 text-white group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm border border-white/30">
                      <feature.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-200 transition-colors drop-shadow-sm">{feature.title}</h3>
                    <p className="text-indigo-50/80 leading-relaxed font-medium">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Steps section */}
        <section id="how-it-works" className="relative py-24 sm:py-32 overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('https://vignan.ac.in/newvignan/assets/images/home/image-13.webp')` }}
            ></div>
            <div className="absolute inset-0 bg-slate-900/90 dark:bg-[#0b0f19]/90 mix-blend-multiply"></div>
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-slate-900/80 dark:from-[#0b0f19]/80 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-slate-900 dark:from-[#0b0f19] to-transparent pointer-events-none w-full"></div>
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-5 lg:order-last"
              >
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 drop-shadow-md">
                  Access University Insights Effortlessly
                </h2>
                <p className="text-lg text-indigo-100 mb-10 font-medium drop-shadow-sm">
                  Vignan's parent portal bridges the gap between home and institution. Securely connect to your child's academic journey in just a few steps.
                </p>
                <div className="space-y-8">
                  {[
                    { step: 1, icon: LogIn, title: "Secure Login", text: "Verify using Student Registration Number and verify contact." },
                    { step: 2, icon: Shield, title: "Real-time Access", text: "Gain real-time access to verified academic records and fee status." },
                    { step: 3, icon: LayoutDashboard, title: "Empower Success", text: "Empower your child's success with data-driven progress monitoring." }
                  ].map((s, idx) => (
                    <motion.div 
                      key={s.step} 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15, duration: 0.5 }}
                      className="flex items-start gap-5 group"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white font-bold group-hover:scale-110 group-hover:bg-indigo-500 transition-all shadow-[0_4px_20px_rgba(255,255,255,0.1)] border border-white/20">
                        {s.step}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-white flex items-center gap-2 mb-1 group-hover:text-indigo-300 transition-colors drop-shadow-sm">
                          <s.icon className="w-5 h-5" /> {s.title}
                        </h4>
                        <p className="text-indigo-50/80 text-sm leading-relaxed">{s.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7 bg-white/10 backdrop-blur-2xl rounded-[2.5rem] p-8 sm:p-12 shadow-2xl border border-white/20 relative overflow-hidden group"
              >
                {/* Decorative blob in container */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/30 rounded-full blur-3xl group-hover:bg-purple-500/40 transition-colors duration-500"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/30 rounded-full blur-3xl group-hover:bg-indigo-500/40 transition-colors duration-500"></div>

                <div className="relative bg-white/90 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/50 dark:border-slate-700/50 hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.1)] transition-shadow duration-500">
                  {/* Dummy UI header */}
                  <div className="border-b border-slate-200/50 dark:border-slate-800/50 p-4 font-bold text-slate-900 dark:text-white flex items-center gap-3 bg-white/50 dark:bg-slate-900/50">
                    <div className="flex gap-2 mr-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <LayoutDashboard className="w-5 h-5 text-indigo-600 dark:text-indigo-400 ml-2" />
                    Parent Dashboard
                  </div>
                  <div className="p-8 grid gap-6 grid-cols-2">
                    <div className="bg-slate-50/80 dark:bg-slate-800/80 rounded-2xl p-6 border border-slate-100/50 dark:border-slate-700/50 shadow-sm hover:scale-105 transition-transform">
                      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold mb-2 tracking-wider">Attendance</p>
                      <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">92.5%</p>
                    </div>
                    <div className="bg-slate-50/80 dark:bg-slate-800/80 rounded-2xl p-6 border border-slate-100/50 dark:border-slate-700/50 shadow-sm hover:scale-105 transition-transform">
                      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold mb-2 tracking-wider">Current CGPA</p>
                      <p className="text-3xl font-extrabold text-purple-600 dark:text-purple-400">8.40</p>
                    </div>
                    <div className="col-span-2 bg-slate-50/80 dark:bg-slate-800/80 rounded-2xl p-6 border border-slate-100/50 dark:border-slate-700/50 flex justify-between items-center shadow-sm hover:scale-[1.02] transition-transform">
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold mb-2 tracking-wider">Upcoming Exam</p>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">Data Structures Midterm</p>
                      </div>
                      <div className="bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300 text-sm font-bold px-4 py-2 rounded-full shadow-inner">
                        In 3 days
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900 dark:bg-[#080b13] z-0"></div>
          
          {/* Animated background blobs for premium feel */}
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[100px] z-0 pointer-events-none"></div>
          <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] rounded-full bg-red-600/15 blur-[100px] z-0 pointer-events-none"></div>
          
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-8 drop-shadow-lg">
                Empower Your Child's Academic Journey
              </h2>
              <p className="text-xl sm:text-2xl text-indigo-100 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
                Join thousands of Vignan parents in monitoring academic excellence and staying connected with the institution.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                <Link
                  to="/login"
                  className="inline-flex h-16 items-center justify-center rounded-full bg-white px-10 text-lg font-bold text-indigo-700 shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)] transition-all hover:bg-slate-50 hover:scale-105 hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.7)]"
                >
                  Get Started Now
                </Link>
                <Link
                  to="/login"
                  className="inline-flex h-16 items-center justify-center rounded-full border-2 border-white/20 bg-white/5 text-lg font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/40 group px-10"
                >
                  Log in to Portal <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* Comprehensive Footer based on Vignan University */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-[#f8f9fa] dark:bg-[#0b0f19] py-16 text-sm text-slate-800 dark:text-slate-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
            
            {/* Contact Info and Accreditation - Spans 2 columns on large screens */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-4">Contact Us</h3>
                <p className="mb-4">
                  Vignan's Foundation for Science, Technology and Research<br />
                  (Deemed to be University), Vadlamudi, Guntur-522213
                </p>
                <div className="flex gap-8 mb-4">
                  <a href="mailto:info@vignan.ac.in" className="hover:text-indigo-600 dark:hover:text-indigo-400">info@vignan.ac.in</a>
                  <span>0863-2344700 / 701</span>
                </div>
                {/* Social Icons */}
                <div className="flex gap-4">
                  <a href="#" className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-indigo-100 hover:text-indigo-600 dark:hover:bg-indigo-900/50 dark:hover:text-indigo-400 transition-all">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-indigo-100 hover:text-indigo-600 dark:hover:bg-indigo-900/50 dark:hover:text-indigo-400 transition-all">
                    <span className="sr-only">Facebook</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-indigo-100 hover:text-indigo-600 dark:hover:bg-indigo-900/50 dark:hover:text-indigo-400 transition-all">
                    <span className="sr-only">Instagram</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-indigo-100 hover:text-indigo-600 dark:hover:bg-indigo-900/50 dark:hover:text-indigo-400 transition-all">
                    <span className="sr-only">YouTube</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 pr-4">
                <div className="w-16 h-16 rounded-full border-4 border-[#1c1c93] flex items-center justify-center flex-shrink-0 text-[#1c1c93] font-bold text-center leading-none bg-transparent">
                  <span className="text-[10px] uppercase">International<br/><span className="text-xl">IAO</span></span>
                </div>
                <div className="text-sm">
                  <p className="mb-2 text-slate-700 dark:text-slate-400">
                    Vignan's Foundation for Science, Technology, and Research (Vignan) met the accreditation requirements of the International Accreditation Organization (IAO) and was granted full accreditation.
                  </p>
                  <a href="#" className="text-[#a44221] hover:underline font-semibold flex items-center gap-1">
                    Learn More <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <div className="mb-8">
                <h3 className="font-bold text-black dark:text-white uppercase tracking-wider mb-4">ADMISSION</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Apply Online</a></li>
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">International Students</a></li>
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Refund Policy</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-black dark:text-white uppercase tracking-wider mb-4">INTERNAL PORTALS</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">DEO</a></li>
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Faculty</a></li>
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Student Portal</a></li>
                </ul>
              </div>
            </div>

            <div>
               <h3 className="font-bold text-black dark:text-white uppercase tracking-wider mb-4">STUDENT</h3>
               <ul className="space-y-3">
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Pay Tuition Fee</a></li>
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Examinations</a></li>
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Internship Portal</a></li>
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Slam Book</a></li>
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Student-ExitFeedback</a></li>
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Outlook ( Access Mails)</a></li>
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">NCC</a></li>
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Anti-Ragging</a></li>
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Grievance Redressal</a></li>
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">HEIs</a></li>
                </ul>
            </div>

            <div>
              <div className="mb-8">
                <h3 className="font-bold text-black dark:text-white uppercase tracking-wider mb-4">ACCREDITATION</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">IQAC</a></li>
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">NAAC</a></li>
                  <li><a href="#" className="text-blue-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">NBA</a></li>
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">NIRF</a></li>
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">DSIR Certified</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-black dark:text-white uppercase tracking-wider mb-4">OTHERS</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">SEDG</a></li>
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">SDG (Sustainable Development Goals)</a></li>
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">IKS (Indian Knowledge System)</a></li>
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Equal opportunity cell</a></li>
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Facilities for differently-abled</a></li>
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">UGC e-Samadhan portal</a></li>
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Blogs</a></li>
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">RTI</a></li>
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">NCTE</a></li>
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">ITEP</a></li>
                </ul>
              </div>
            </div>

            <div>
               <h3 className="font-bold text-black dark:text-white uppercase tracking-wider mb-4">RESOURCES</h3>
               <ul className="space-y-3">
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Pay Tuition Fee</a></li>
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Examinations</a></li>
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Student Portal</a></li>
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Academic Collaborations</a></li>
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms & Conditions</a></li>
                </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
