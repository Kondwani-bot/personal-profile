import React, { useState } from 'react';
import { ProjectItem } from '../../types';
import { 
  ExternalLink, 
  Sparkles, 
  Star,
  Search,
  Code2,
  CheckCircle2,
  Globe,
  Layers,
  Github
} from 'lucide-react';
import { sound } from '../../utils/soundEffects';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  onSelectProject?: (project: ProjectItem) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Systems' },
    { id: 'ai-ml', label: 'AI & Intelligent Systems' },
    { id: 'fullstack', label: 'Full-Stack Web' },
    { id: 'automation', label: 'Automation & Workflows' }
  ];

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'ai-ml': return 'AI & Agents';
      case 'automation': return 'Automation';
      case 'fullstack': return 'Full-Stack';
      case 'cybersecurity': return 'Cybersecurity';
      case 'robotics': return 'Robotics';
      default: return cat;
    }
  };

  const filteredProjects = projects.filter(p => {
    return selectedCategory === 'all' || p.category === selectedCategory;
  });

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/90 text-purple-800 text-xs font-bold mb-2 border border-purple-200/80">
            <Globe className="w-3.5 h-3.5 text-purple-700" />
            Live Applications & Production Deployments
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Featured Systems
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mt-1">
            Production-grade systems, automation platforms, and full-stack applications architected and deployed by Derrick Kondwani Mbewe.
          </p>
        </div>

        {/* Action Link to GitHub Profile */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            id="github-profile-link"
            href="https://github.com/Kondwani-bot"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-2xl glass-button text-purple-950 flex items-center gap-2 text-xs font-bold shadow-sm hover:text-purple-700 transition-all shrink-0 cursor-pointer"
          >
            <Github className="w-4 h-4 text-purple-700" />
            <span>@Kondwani-bot</span>
            <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
          </a>
        </div>
      </div>

      {/* Category Filter Controls */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {categories.map(cat => (
          <button
            key={cat.id}
            id={`filter-${cat.id}`}
            onClick={() => {
              setSelectedCategory(cat.id);
              sound.playClick();
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === cat.id
                ? 'bg-purple-700 text-white shadow-md border border-purple-700'
                : 'glass-button text-slate-700 hover:text-purple-900'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => {
          const isLiveSystem = project.liveUrl && !project.liveUrl.includes('github.com/Kondwani-bot/');
          return (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className="glass-panel rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-white/90 hover:border-purple-300 hover:shadow-xl transition-all duration-300 group relative overflow-hidden bg-white/80"
            >
              {/* Top Purple Gradient Accent */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-600 via-violet-500 to-fuchsia-500 opacity-80 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Category & Badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-purple-100 text-purple-900 uppercase tracking-wider border border-purple-200/80">
                    {getCategoryLabel(project.category)}
                  </span>

                  <div className="flex items-center gap-2">
                    {project.metrics && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-violet-100 text-violet-900 border border-violet-200">
                        {project.metrics}
                      </span>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-purple-800 transition-colors leading-snug">
                  {project.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                  {project.shortDescription}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-md bg-purple-50 text-purple-900 text-[10px] font-mono border border-purple-200/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions with Full-Width Launch Live System Button */}
              <div className="mt-6 pt-4 border-t border-purple-100/80">
                <a
                  id={`live-btn-${project.id}`}
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer border border-purple-600 hover:shadow-purple-500/25"
                >
                  <Globe className="w-4 h-4" />
                  <span>{isLiveSystem ? 'Launch Live System' : 'View Project'}</span>
                  <ExternalLink className="w-4 h-4 text-purple-200" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 glass-panel rounded-3xl p-8 border border-dashed border-purple-200">
          <Code2 className="w-8 h-8 text-purple-400 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-700">No systems found matching your query</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
            }}
            className="mt-3 text-xs font-bold text-purple-700 hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

