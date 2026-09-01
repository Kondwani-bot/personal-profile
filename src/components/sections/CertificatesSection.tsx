import React, { useState } from 'react';
import { CertificateItem } from '../../types';
import { 
  Award, 
  ShieldCheck, 
  Eye, 
  CheckCircle2, 
  Code, 
  Bot, 
  SunMedium
} from 'lucide-react';
import { sound } from '../../utils/soundEffects';
import { CertificateViewerModal } from '../common/CertificateViewerModal';

interface CertificatesSectionProps {
  certificates: CertificateItem[];
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({ certificates }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalCert, setActiveModalCert] = useState<CertificateItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Badges & Credentials' },
    { id: 'cybersecurity', label: 'Cyber Security & Cisco' },
    { id: 'python', label: 'Python & Programming' },
    { id: 'internship', label: 'Work Internships' },
    { id: 'academic', label: 'Academic & TAU Honors' },
    { id: 'robotics', label: 'Robotics & Hardware' }
  ];

  const filteredCerts = selectedCategory === 'all'
    ? certificates
    : certificates.filter(c => c.category === selectedCategory || (selectedCategory === 'cybersecurity' && c.category === 'networking'));

  const getIconForCategory = (cat: string) => {
    switch (cat) {
      case 'cybersecurity':
      case 'networking':
        return <ShieldCheck className="w-5 h-5 text-purple-600" />;
      case 'python':
        return <Code className="w-5 h-5 text-purple-600" />;
      case 'robotics':
        return <Bot className="w-5 h-5 text-violet-600" />;
      case 'energy':
        return <SunMedium className="w-5 h-5 text-purple-600" />;
      case 'internship':
        return <CheckCircle2 className="w-5 h-5 text-fuchsia-600" />;
      case 'academic':
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <Award className="w-5 h-5 text-purple-600" />;
    }
  };

  const handleOpenCertificate = (cert: CertificateItem) => {
    setActiveModalCert(cert);
    sound.playClick();
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/90 text-purple-800 text-xs font-bold mb-2 border border-purple-200/80">
            <Award className="w-3.5 h-3.5" />
            Hall of Badges • Verified Accreditations
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Certifications & Industry Credentials
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mt-1">
            Official certifications and verified accreditations from Cisco Networking Academy, Python Institute, Codveda Technologies, Texila American University, and FIRST Global Robotics. Click any credential to inspect the authentic certificate.
          </p>
        </div>

        <div className="glass-panel px-4 py-2 rounded-2xl flex items-center gap-2 text-xs font-bold text-purple-900 border border-purple-200 shadow-xs shrink-0">
          <ShieldCheck className="w-4 h-4 text-purple-600" />
          <span>{certificates.filter(c => c.verified).length} Verified Credentials</span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map(cat => (
          <button
            key={cat.id}
            id={`cert-filter-${cat.id}`}
            onClick={() => {
              setSelectedCategory(cat.id);
              sound.playClick();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === cat.id
                ? 'bg-purple-700 text-white shadow-md border border-purple-700'
                : 'glass-button text-slate-700 hover:text-purple-900'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCerts.map((cert) => (
          <div
            key={cert.id}
            id={`cert-card-${cert.id}`}
            onClick={() => handleOpenCertificate(cert)}
            className="glass-panel rounded-3xl p-6 flex flex-col justify-between border border-white/90 hover:border-purple-300 hover:shadow-xl transition-all duration-300 group bg-white/80 cursor-pointer"
          >
            <div>
              {/* Card Top */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="w-11 h-11 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                  {getIconForCategory(cert.category)}
                </div>

                <div className="flex items-center gap-1.5">
                  {cert.verified && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 flex items-center gap-1 border border-purple-200/60">
                      <ShieldCheck className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                  <span className="text-[11px] font-mono text-slate-500 font-semibold">
                    {cert.issueDate}
                  </span>
                </div>
              </div>

              {/* Title & Issuer */}
              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-purple-800 transition-colors leading-snug">
                {cert.title}
              </h3>
              <div className="text-xs font-bold text-purple-700 mt-1">
                {cert.issuer}
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-2">
                {cert.description}
              </p>

              {/* Credential ID / Hash */}
              {cert.credentialId && (
                <div className="mt-3 p-2 rounded-xl bg-purple-50/60 border border-purple-100 text-[10px] font-mono text-slate-600 truncate">
                  ID: {cert.credentialId}
                </div>
              )}

              {/* Skills Acquired Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {cert.skillsAcquired.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-purple-50/80 text-purple-900 text-[10px] font-medium border border-purple-100/80"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions: View Stored Authentic Certificate */}
            <div className="mt-5 pt-4 border-t border-purple-100 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenCertificate(cert);
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs border border-purple-600 hover:shadow-purple-500/25 cursor-pointer"
                title="View authentic certificate stored in code"
              >
                <Eye className="w-4 h-4" />
                <span>View Official Certificate</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Authentic Certificate Viewer Modal */}
      <CertificateViewerModal
        isOpen={!!activeModalCert}
        certificate={activeModalCert}
        allCertificates={certificates}
        onClose={() => setActiveModalCert(null)}
        onSelectCertificate={(cert) => setActiveModalCert(cert)}
      />
    </div>
  );
};
