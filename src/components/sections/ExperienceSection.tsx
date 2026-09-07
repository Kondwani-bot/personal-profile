import React from 'react';
import { ProfileData } from '../../types';
import { 
  Briefcase, 
  GraduationCap, 
  Trophy, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Calendar,
  Award,
  Users
} from 'lucide-react';

interface ExperienceSectionProps {
  profile: ProfileData;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ profile }) => {
  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/90 text-purple-800 text-xs font-bold mb-2 border border-purple-200/80">
          <Briefcase className="w-3.5 h-3.5" />
          Career Milestones • Experience & Leadership
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Professional Milestones & Education
        </h2>
        <p className="text-sm text-slate-600 max-w-2xl mt-1">
          Chronological journey through developer internships, full-stack systems, national robotics representation, and academic excellence at Texila American University.
        </p>
      </div>

      {/* Grid of Experience & Education */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Work Experience */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-lg pb-2 border-b border-purple-100">
            <Briefcase className="w-5 h-5 text-purple-600" />
            <h3>Work & Developer Experience</h3>
          </div>

          <div className="space-y-6 relative before:absolute before:top-3 before:bottom-3 before:left-3.5 before:w-0.5 before:bg-purple-200">
            {profile.experiences.map((exp) => (
              <div key={exp.id} className="relative pl-9 group">
                {/* Milestone Node */}
                <div className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full bg-purple-600 border-4 border-purple-100 shadow-sm group-hover:scale-125 transition-transform" />

                <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/90 hover:border-purple-300 transition-all shadow-xs bg-white/80">
                  <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                    <span className="font-extrabold text-slate-900 text-sm">
                      {exp.role}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-purple-800 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                      {exp.period}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-purple-700 flex items-center gap-1 mb-3">
                    <span>{exp.company}</span>
                    {exp.location && <span className="text-slate-400">• {exp.location}</span>}
                  </div>

                  <ul className="space-y-1.5 text-xs text-slate-600 mb-3">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-purple-500 font-bold">›</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-purple-100">
                    {exp.skillsUsed.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-purple-50 text-purple-900 text-[10px] font-mono border border-purple-100"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Academic Path & Awards */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-lg pb-2 border-b border-purple-100">
            <GraduationCap className="w-5 h-5 text-purple-600" />
            <h3>Academic Background</h3>
          </div>

          <div className="space-y-6 relative before:absolute before:top-3 before:bottom-3 before:left-3.5 before:w-0.5 before:bg-purple-200">
            {profile.education.map((edu) => (
              <div key={edu.id} className="relative pl-9 group">
                <div className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full bg-purple-600 border-4 border-purple-100 shadow-sm group-hover:scale-125 transition-transform" />

                <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/90 hover:border-purple-300 transition-all shadow-xs bg-white/80">
                  <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                    <span className="font-extrabold text-slate-900 text-sm">
                      {edu.institution}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-purple-800 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                      {edu.period}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-purple-700 mb-2">
                    {edu.degreeOrLevel}
                  </div>

                  {edu.gpa && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-100 text-purple-900 text-xs font-bold mb-2 border border-purple-200">
                      <Trophy className="w-3.5 h-3.5 text-purple-700" />
                      GPA: {edu.gpa} (Top Academic Standing)
                    </div>
                  )}

                  {edu.highlights && (
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {edu.highlights}
                    </p>
                  )}

                  {edu.coursework && (
                    <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-purple-100">
                      {edu.coursework.map((course, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-purple-50 text-slate-700 text-[10px] border border-purple-100"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Extracurricular Highlights Box */}
          <div className="glass-panel-purple p-6 rounded-3xl border border-purple-200/90 shadow-md">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-3">
              <Trophy className="w-4 h-4 text-purple-700" />
              <span>National Honors & Extracurricular Leadership</span>
            </div>

            <div className="space-y-4">
              {profile.extracurriculars.map((extra) => (
                <div key={extra.id} className="text-xs text-slate-700 p-3 rounded-2xl bg-white/60 border border-purple-100/80 hover:bg-white/90 transition-colors">
                  <div className="font-bold text-purple-950 flex flex-wrap items-center justify-between gap-1 mb-1">
                    <span className="text-xs font-extrabold text-slate-900">• {extra.title}</span>
                    {extra.year && (
                      <span className="text-[10px] text-purple-800 bg-purple-50 px-2 py-0.5 rounded-md font-mono font-bold border border-purple-200/60">
                        {extra.year}
                      </span>
                    )}
                  </div>
                  {extra.organization && (
                    <div className="text-[11px] font-semibold text-purple-700 pl-2 mb-1.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      {extra.organization}
                    </div>
                  )}
                  <p className="text-[11px] text-slate-600 pl-2 leading-relaxed whitespace-pre-line">
                    {extra.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
