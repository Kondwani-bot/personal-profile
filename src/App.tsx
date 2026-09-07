import React, { useState, useEffect } from 'react';
import { 
  ProfileData, 
  ContactMessage, 
  ViewMode, 
  ZoneId 
} from './types';
import { INITIAL_PROFILE, INITIAL_MESSAGES } from './data/initialData';
import { Navbar } from './components/layout/Navbar';
import { SmoothAnimatedBackground } from './components/common/SmoothAnimatedBackground';
import { ProfessionalPdfViewer } from './components/resume/ProfessionalPdfViewer';
import { HeroSection } from './components/sections/HeroSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { CertificatesSection } from './components/sections/CertificatesSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ContactSection } from './components/sections/ContactSection';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ArrowUp
} from 'lucide-react';

const STORAGE_KEY_MESSAGES = 'kondwani_messages_v5';

export default function App() {
  // 1. Profile Data (from src/data/initialData.ts for manual updates)
  const [profile] = useState<ProfileData>(INITIAL_PROFILE);

  // 2. Recruiter Messages State (stored locally when visitor sends message)
  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MESSAGES);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_MESSAGES;
  });

  // 3. View Mode State
  const [viewMode, setViewMode] = useState<ViewMode>('2d-dashboard');
  const [activeZone, setActiveZone] = useState<ZoneId>('overview');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  // Message submission from contact form
  const handleSendMessage = (newMsg: ContactMessage) => {
    setMessages(prev => [newMsg, ...prev]);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveZone('overview');
  };

  return (
    <div className="min-h-screen relative flex flex-col bg-slate-50/90 text-slate-800 font-sans selection:bg-purple-500/20 selection:text-purple-900">
      {/* Smooth Ambient Background Animation */}
      <SmoothAnimatedBackground particleCount={30} />

      {/* Top Floating Glass Navigation */}
      <Navbar
        currentView={viewMode}
        onSelectView={setViewMode}
        activeZone={activeZone}
        onSelectZone={setActiveZone}
      />

      {/* Main Viewport */}
      <main className="relative z-10 flex-1 pt-20 sm:pt-22 flex flex-col">
        
        {/* VIEW 1: 📋 CLEAN PORTFOLIO DASHBOARD */}
        {viewMode === '2d-dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-16 flex-1 w-full animate-in fade-in duration-300">
            {/* Hero Profile Intro */}
            <div id="overview" className="scroll-mt-24">
              <HeroSection
                profile={profile}
                onSelectView={setViewMode}
                onSelectZone={setActiveZone}
              />
            </div>

            {/* Projects Artifact Grove */}
            <section id="projects" className="scroll-mt-24">
              <ProjectsSection projects={profile.projects} />
            </section>

            {/* Certificates & Credentials */}
            <section id="certificates" className="scroll-mt-24">
              <CertificatesSection certificates={profile.certificates} />
            </section>

            {/* Skills & Cybersecurity Domains */}
            <section id="skills" className="scroll-mt-24">
              <SkillsSection skills={profile.skills} cyberSkills={profile.cybersecuritySkills} />
            </section>

            {/* Experience & Education Chronicle */}
            <section id="experience" className="scroll-mt-24">
              <ExperienceSection profile={profile} />
            </section>

            {/* Contact Portal */}
            <section id="contact" className="scroll-mt-24">
              <ContactSection profile={profile} onSendMessage={handleSendMessage} />
            </section>
          </div>
        )}

        {/* VIEW 2: 📜 DEDICATED PDF RESUME VIEWER */}
        {viewMode === 'resume-pdf' && (
          <div className="max-w-5xl mx-auto px-2 sm:px-6 py-2 sm:py-4 flex-1 w-full flex flex-col min-h-[calc(100vh-6rem)] animate-in fade-in duration-300 print:max-w-none print:p-0 print:m-0 print:w-full print:block">
            <div className="mb-3 flex items-center justify-between print:hidden print-hide">
              <button
                id="back-to-portfolio-btn"
                onClick={() => setViewMode('2d-dashboard')}
                className="px-4 py-2 rounded-xl glass-button text-xs font-bold text-slate-700 hover:text-purple-800 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>← Back to Portfolio</span>
              </button>
            </div>
            <ProfessionalPdfViewer profile={profile} />
          </div>
        )}

      </main>

      {/* Floating Scroll To Top */}
      {viewMode === '2d-dashboard' && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-30 p-3 rounded-full bg-purple-700 hover:bg-purple-800 text-white shadow-lg transition-all hover:scale-110 cursor-pointer hidden md:flex items-center justify-center border border-purple-500/50 print:hidden print-hide"
          title="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Clean Streamlined Footer */}
      <footer className="relative z-10 glass-panel-subtle border-t border-purple-100 py-6 px-4 text-center text-xs text-slate-600 mt-auto bg-white/80 print:hidden print-hide">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <span className="font-extrabold text-purple-950">Derrick Kondwani Mbewe</span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="text-slate-600">Texila American University (B.Sc AI Major • 4.0 GPA)</span>
          </div>

          <div className="flex items-center gap-4 text-slate-600 font-medium">
            <a
              href="https://github.com/Kondwani-bot"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-700 flex items-center gap-1.5 transition-colors font-semibold"
            >
              <Github className="w-4 h-4 text-purple-700" />
              <span>Kondwani-bot</span>
            </a>
            <a
              href="https://www.linkedin.com/in/kondwani-mbewe-b7829528b/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-700 flex items-center gap-1.5 transition-colors font-semibold text-[#0a66c2]"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:kondwanimbewe111@gmail.com"
              className="hover:text-purple-700 flex items-center gap-1.5 transition-colors font-semibold"
            >
              <Mail className="w-4 h-4 text-purple-700" />
              <span>kondwanimbewe111@gmail.com</span>
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
