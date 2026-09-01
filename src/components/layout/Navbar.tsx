import React, { useState, useEffect, useRef } from 'react';
import { ViewMode, ZoneId } from '../../types';
import { 
  FileText, 
  Github, 
  Linkedin
} from 'lucide-react';
import { sound } from '../../utils/soundEffects';

interface NavbarProps {
  currentView: ViewMode;
  onSelectView: (mode: ViewMode) => void;
  activeZone: ZoneId;
  onSelectZone: (zone: ZoneId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onSelectView,
  activeZone,
  onSelectZone,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show navbar near top of the page
      if (currentScrollY < 60) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current + 8) {
        // Scrolling DOWN -> fade out / slide up
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current - 8) {
        // Scrolling UP -> fade in / slide down
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: ZoneId; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'projects', label: 'Featured Systems' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'skills', label: 'Skills & Security' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (zoneId: ZoneId) => {
    if (currentView !== '2d-dashboard') {
      onSelectView('2d-dashboard');
    }
    onSelectZone(zoneId);
    sound.playClick();
    const el = document.getElementById(zoneId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 py-3 transition-all duration-300 transform ${
        isVisible 
          ? 'opacity-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 -translate-y-full pointer-events-none'
      }`}
    >
      <nav className="max-w-7xl mx-auto glass-panel-subtle rounded-2xl px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 border border-white/90 shadow-md bg-white/85 backdrop-blur-md">
        
        {/* Left: Identity */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('overview')}
            className="flex items-center gap-2 text-left cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-700 via-violet-600 to-fuchsia-500 text-white flex items-center justify-center font-black text-sm shadow-sm group-hover:scale-105 transition-transform">
              DK
            </div>
            <div>
              <div className="font-extrabold text-slate-900 text-sm tracking-tight group-hover:text-purple-700 transition-colors">
                Derrick Kondwani Mbewe
              </div>
              <div className="text-[10px] font-semibold text-purple-700 hidden sm:block">
                AI Engineer • Full-Stack Systems
              </div>
            </div>
          </button>
        </div>

        {/* Center: In-Page Navigation Section Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-1 bg-purple-50/60 p-1 rounded-xl border border-purple-100/80">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentView === '2d-dashboard' && activeZone === link.id
                  ? 'bg-white text-purple-800 shadow-xs border border-purple-200/70'
                  : 'text-slate-600 hover:text-purple-900 hover:bg-white/70'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right: Resume PDF Toggle, GitHub, LinkedIn */}
        <div className="flex items-center gap-2">
          {/* Resume PDF Toggle */}
          <button
            id="view-mode-resume"
            onClick={() => {
              if (currentView === 'resume-pdf') {
                onSelectView('2d-dashboard');
              } else {
                onSelectView('resume-pdf');
              }
              sound.playClick();
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer glass-button ${
              currentView === 'resume-pdf'
                ? 'bg-purple-700 text-white shadow-xs hover:bg-purple-800 border-purple-700'
                : 'text-slate-700 hover:text-purple-800'
            }`}
            title="Toggle Official 4-Page Resume PDF Viewer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Resume PDF</span>
          </button>

          {/* GitHub Profile */}
          <a
            id="nav-github-link"
            href="https://github.com/Kondwani-bot"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl glass-button text-slate-700 hover:text-purple-700 transition-colors cursor-pointer hidden sm:flex"
            title="GitHub: Kondwani-bot"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* LinkedIn Profile */}
          <a
            id="nav-linkedin-link"
            href="https://www.linkedin.com/in/kondwani-mbewe-b7829528b/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl glass-button text-[#0a66c2] transition-colors cursor-pointer hidden sm:flex"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </nav>
    </header>
  );
};
