import React from 'react';
import { ProfileData, ViewMode, ZoneId } from '../../types';
import { 
  Sparkles, 
  ShieldCheck, 
  GraduationCap, 
  MapPin,
  Bot,
  Cpu
} from 'lucide-react';

interface HeroSectionProps {
  profile: ProfileData;
  onSelectView: (view: ViewMode) => void;
  onSelectZone: (zone: ZoneId) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onSelectView,
  onSelectZone
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl glass-panel-purple p-6 sm:p-12 border border-purple-200/90 shadow-xl space-y-8">
      {/* Background ambient light orbs */}
      <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-purple-400/20 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-violet-400/20 blur-3xl pointer-events-none" />

      {/* Top Location Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-end gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-purple-200/70">
            <MapPin className="w-3.5 h-3.5 text-purple-700" />
            <span>{profile.contact.location}</span>
          </span>
        </div>
      </div>

      {/* Hero Title & Identity Statement */}
      <div className="relative z-10 space-y-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 text-[11px] font-extrabold tracking-widest text-purple-800 uppercase">
          <Cpu className="w-3.5 h-3.5 text-purple-700" />
          <span>AI Engineer • Cybersecurity Specialist • Full-Stack Systems</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.1]">
          Hi, I’m{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-800 via-violet-700 to-fuchsia-700 inline-block font-black">
            {profile.name}
          </span>
        </h1>

        <p className="text-base sm:text-xl font-semibold text-slate-800 leading-relaxed max-w-3xl">
          {profile.tagline}
        </p>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-3xl">
          {profile.bio}
        </p>
      </div>

      {/* Key Specialization Pills */}
      <div className="relative z-10 flex flex-wrap items-center gap-2 pt-1">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-800 text-white text-xs font-bold shadow-xs border border-purple-700">
          <Sparkles className="w-3.5 h-3.5 text-purple-300" />
          2025 ZRA Hackathon Champion (1st Place)
        </span>

        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 text-purple-950 text-xs font-bold border border-purple-200/90 shadow-2xs">
          <GraduationCap className="w-3.5 h-3.5 text-purple-700" />
          Texila American University • B.Sc in AI (GPA 4.0)
        </span>

        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 text-purple-950 text-xs font-bold border border-purple-200/90 shadow-2xs">
          <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
          Cisco Certified Ethical Hacker
        </span>

        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 text-purple-950 text-xs font-bold border border-purple-200/90 shadow-2xs">
          <Bot className="w-3.5 h-3.5 text-purple-700" />
          FIRST Global Robotics (Team Zambia)
        </span>
      </div>
    </div>
  );
};

