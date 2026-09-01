import React, { useState } from 'react';
import { SkillCategory, CyberSecurityDomain } from '../../types';
import { 
  Code, 
  Cpu, 
  Database, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  FileCheck,
  Flame
} from 'lucide-react';
import { sound } from '../../utils/soundEffects';

interface SkillsSectionProps {
  skills: SkillCategory[];
  cyberSkills: CyberSecurityDomain[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, cyberSkills }) => {
  const [activeTab, setActiveTab] = useState<'tech' | 'cyber'>('tech');

  const getIconForCategory = (iconName: string) => {
    switch (iconName) {
      case 'Code': return <Code className="w-5 h-5 text-purple-600" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-purple-600" />;
      case 'Database': return <Database className="w-5 h-5 text-purple-600" />;
      case 'Layers': return <Layers className="w-5 h-5 text-purple-600" />;
      default: return <Sparkles className="w-5 h-5 text-purple-600" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/90 text-purple-800 text-xs font-bold mb-2 border border-purple-200/80">
            <Zap className="w-3.5 h-3.5" />
            Engineering Arsenal • Competency Matrix
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Engineering & Security Capabilities
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mt-1">
            Core proficiencies spanning artificial intelligence automation, low-latency system integration, defensive cyber governance, and cross-platform frameworks.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="glass-panel p-1.5 rounded-2xl flex items-center gap-1 shrink-0 border border-purple-200/90 bg-white/80">
          <button
            id="tab-tech-skills"
            onClick={() => { setActiveTab('tech'); sound.playClick(); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'tech'
                ? 'bg-purple-700 text-white shadow-sm border border-purple-700'
                : 'text-slate-700 hover:text-purple-900 hover:bg-white/80'
            }`}
          >
            Software & AI Matrix
          </button>
          <button
            id="tab-cyber-skills"
            onClick={() => { setActiveTab('cyber'); sound.playClick(); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'cyber'
                ? 'bg-purple-700 text-white shadow-sm border border-purple-700'
                : 'text-slate-700 hover:text-purple-900 hover:bg-white/80'
            }`}
          >
            Cybersecurity Domains
          </button>
        </div>
      </div>

      {/* TECH SKILLS MATRIX */}
      {activeTab === 'tech' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((category, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/90 hover:border-purple-300 transition-all shadow-sm bg-white/80"
            >
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-purple-100">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center">
                  {getIconForCategory(category.icon)}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    {category.category}
                  </h3>
                  <span className="text-[11px] text-slate-500 font-semibold">
                    {category.skills.length} Technical Proficiencies
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {category.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="flex items-center justify-between text-xs p-2 rounded-xl bg-purple-50/50 hover:bg-purple-100/50 border border-purple-100/60 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800">{skill.name}</span>
                      {skill.highlight && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          ★ Key
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-mono text-purple-800 font-bold bg-white px-2 py-0.5 rounded-lg border border-purple-200/60">
                      {skill.experience}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CYBERSECURITY DOMAINS MATRIX */}
      {activeTab === 'cyber' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cyberSkills.map((domain, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/90 hover:border-purple-300 transition-all shadow-sm flex flex-col justify-between bg-white/80"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-purple-700" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-300">
                    {domain.level}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 text-base mb-2">
                  {domain.domain}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {domain.description}
                </p>
              </div>

              {domain.tools && (
                <div className="mt-4 pt-3 border-t border-purple-100">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Toolkit & Methodologies:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {domain.tools.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-900 text-[10px] font-mono border border-purple-100"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
