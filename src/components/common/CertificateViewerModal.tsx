import React, { useState, useEffect, useRef } from 'react';
import { CertificateItem } from '../../types';
import { 
  X, 
  Printer, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight, 
  Award, 
  Copy, 
  Check, 
  ZoomIn, 
  ZoomOut,
  RotateCcw,
  Maximize2
} from 'lucide-react';
import { sound } from '../../utils/soundEffects';

interface CertificateViewerModalProps {
  certificate: CertificateItem | null;
  allCertificates: CertificateItem[];
  isOpen: boolean;
  onClose: () => void;
  onSelectCertificate: (cert: CertificateItem) => void;
}

export const CertificateViewerModal: React.FC<CertificateViewerModalProps> = ({
  certificate,
  allCertificates,
  isOpen,
  onClose,
  onSelectCertificate
}) => {
  const [copied, setCopied] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const modalBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !certificate) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, certificate, allCertificates]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset zoom and scroll to top on open or certificate change
      if (modalBodyRef.current) {
        modalBodyRef.current.scrollTop = 0;
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, certificate]);

  if (!isOpen || !certificate) return null;

  const currentIndex = allCertificates.findIndex(c => c.id === certificate.id);

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % allCertificates.length;
    onSelectCertificate(allCertificates[nextIdx]);
    sound.playClick();
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + allCertificates.length) % allCertificates.length;
    onSelectCertificate(allCertificates[prevIdx]);
    sound.playClick();
  };

  const handleCopyId = () => {
    if (certificate.credentialId) {
      navigator.clipboard.writeText(certificate.credentialId);
      setCopied(true);
      sound.playChime();
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  const handleZoom = (delta: number) => {
    sound.playClick();
    setZoomLevel(prev => Math.min(150, Math.max(70, prev + delta)));
  };

  const resetZoom = () => {
    sound.playClick();
    setZoomLevel(100);
  };

  // Render the specific authentic certificate design based on the certificate ID and issuer
  const renderCertificateContent = () => {
    const id = certificate.id;

    // 1. Cisco Networking Academy (Cyber Threat Management, Ethical Hacker, Network Support and Security)
    if (id === 'cert-cisco-threat-mgmt' || id === 'cert-cisco-eth-hack' || id === 'cert-cisco-net-sec') {
      const courseTitle = id === 'cert-cisco-threat-mgmt'
        ? 'Cyber Threat Management'
        : id === 'cert-cisco-eth-hack'
        ? 'Ethical Hacker'
        : 'Network Support and Security';
      
      const completionDate = certificate.issueDate || '17 Apr 2026';
      const certId = certificate.credentialId || '7b1feef9-e7d6-4c82-8a7e-1352a7287902';

      return (
        <div className="bg-white p-8 sm:p-12 md:p-16 rounded-xl border border-slate-300 shadow-2xl relative overflow-hidden select-none font-sans min-h-[580px] w-full flex flex-col justify-between print:border-none print:shadow-none">
          {/* Background Decorative Cisco Wave Pattern */}
          <div className="absolute top-0 right-0 w-80 h-80 opacity-20 pointer-events-none">
            <svg viewBox="0 0 200 200" className="w-full h-full text-slate-400" fill="none" stroke="currentColor">
              <path d="M0,20 Q60,10 120,60 T200,80" strokeWidth="1" />
              <path d="M0,40 Q60,30 120,80 T200,100" strokeWidth="1" />
              <path d="M0,60 Q60,50 120,100 T200,120" strokeWidth="1" />
              <path d="M0,80 Q60,70 120,120 T200,140" strokeWidth="1" />
              <path d="M0,100 Q60,90 120,140 T200,160" strokeWidth="1" />
              <path d="M0,120 Q60,110 120,160 T200,180" strokeWidth="1" />
              <path d="M0,140 Q60,130 120,180 T200,200" strokeWidth="1" />
            </svg>
          </div>

          {/* Top Header: Cisco Networking Academy Logo */}
          <div className="flex items-start justify-between relative z-10">
            <div className="flex flex-col">
              <div className="text-[11px] font-bold tracking-widest text-slate-700 uppercase">Cisco</div>
              <div className="text-sm font-black tracking-tight text-slate-900 leading-tight">Networking</div>
              <div className="text-sm font-black tracking-tight text-slate-900">Academy</div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Official Cisco Credential
              </span>
            </div>
          </div>

          {/* Certificate Body */}
          <div className="text-center my-8 md:my-12 relative z-10">
            <p className="text-xs md:text-sm text-slate-600 font-medium tracking-wide">
              This certificate is awarded to
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#005073] mt-2 mb-4 font-sans tracking-tight">
              Kondwani Mbewe
            </h1>
            <p className="text-xs md:text-sm text-slate-600 font-medium tracking-wide">
              for successfully completing
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#005073] mt-2 mb-4 font-sans tracking-tight">
              {courseTitle}
            </h2>
            <p className="text-xs md:text-sm text-slate-700 font-medium">
              offered by Networking Academy
            </p>
            <p className="text-xs md:text-sm text-slate-700 font-medium">
              through the Cisco Networking Academy program.
            </p>
          </div>

          {/* Signatures & Footer */}
          <div className="pt-6 border-t border-slate-200 relative z-10">
            <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6">
              {/* Lynn Bloomer Signature */}
              <div className="text-left">
                <div className="font-serif italic text-xl md:text-2xl text-slate-800 tracking-wider font-semibold">
                  Lynn Bloomer
                </div>
                <div className="text-xs font-bold text-slate-900 mt-1">Lynn Bloomer</div>
                <div className="text-[11px] text-slate-600 font-medium">Director</div>
                <div className="text-[11px] text-slate-600 font-medium">Cisco Networking Academy</div>
              </div>

              {/* Completion Date */}
              <div className="text-center sm:text-right">
                <div className="text-sm md:text-base font-bold text-slate-900 font-sans">
                  {completionDate}
                </div>
                <div className="text-xs text-slate-500 font-medium">Completion Date</div>
              </div>
            </div>

            {/* Cert ID bar */}
            <div className="mt-8 text-center text-[10px] font-mono text-slate-400">
              Cert ID: {certId}
            </div>
          </div>
        </div>
      );
    }

    // 2. Cisco Networking Academy & Python Institute (Python Essentials 1 & 2)
    if (id === 'cert-cisco-py1' || id === 'cert-cisco-py2') {
      const courseTitle = id === 'cert-cisco-py1' ? 'Python Essentials 1' : 'Python Essentials 2';
      const completionDate = id === 'cert-cisco-py1' ? '04 Dec 2025' : '05 Dec 2025';

      return (
        <div className="bg-white p-8 sm:p-12 md:p-16 rounded-xl border border-slate-300 shadow-2xl relative overflow-hidden select-none font-sans min-h-[580px] w-full flex flex-col justify-between print:border-none print:shadow-none">
          {/* Header Logos: Cisco + Python Institute */}
          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <div className="text-[11px] font-bold tracking-widest text-slate-700 uppercase">Cisco</div>
                <div className="text-sm font-black tracking-tight text-slate-900 leading-tight">Networking</div>
                <div className="text-sm font-black tracking-tight text-slate-900">Academy</div>
              </div>
              <div className="h-8 w-px bg-slate-300"></div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tighter text-slate-900 font-sans">Python</span>
                <span className="px-1 py-0.5 bg-[#005073] text-white text-[10px] font-bold rounded">PI</span>
                <div className="flex flex-col text-[8px] font-bold text-slate-600 uppercase tracking-tighter leading-none">
                  <span>INSTITUTE</span>
                  <span className="text-[6px] text-slate-400 font-normal">Open Education & Dev</span>
                </div>
              </div>
            </div>

            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                Cisco & Python Institute
              </span>
            </div>
          </div>

          {/* Certificate Body */}
          <div className="text-center my-8 md:my-12 relative z-10">
            <p className="text-xs md:text-sm text-slate-600 font-medium tracking-wide">
              This certificate is awarded to
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#005073] mt-2 mb-4 font-sans tracking-tight">
              Kondwani Mbewe
            </h1>
            <p className="text-xs md:text-sm text-slate-600 font-medium tracking-wide">
              for successfully completing
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#005073] mt-2 mb-4 font-sans tracking-tight">
              {courseTitle}
            </h2>
            <p className="text-xs md:text-sm text-slate-700 font-medium">
              offered by Networking Academy
            </p>
            <p className="text-xs md:text-sm text-slate-700 font-medium">
              through the Cisco Networking Academy program.
            </p>
          </div>

          {/* Signatures & Footer */}
          <div className="pt-6 border-t border-slate-200 relative z-10">
            <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6">
              <div className="text-left">
                <div className="font-serif italic text-xl md:text-2xl text-slate-800 tracking-wider font-semibold">
                  Lynn Bloomer
                </div>
                <div className="text-xs font-bold text-slate-900 mt-1">Lynn Bloomer</div>
                <div className="text-[11px] text-slate-600 font-medium">Director</div>
                <div className="text-[11px] text-slate-600 font-medium">Cisco Networking Academy</div>
              </div>

              <div className="text-center sm:text-right">
                <div className="text-sm md:text-base font-bold text-slate-900 font-sans">
                  {completionDate}
                </div>
                <div className="text-xs text-slate-500 font-medium">Completion Date</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 3. Texila American University Zambia (TAU) - SME Seminar Certificate of Appreciation
    if (id === 'cert-tau-sme') {
      return (
        <div className="bg-[#fcfdfd] p-6 sm:p-10 md:p-14 rounded-xl border-[6px] border-[#0c4a60] shadow-2xl relative overflow-hidden select-none font-serif min-h-[600px] w-full flex flex-col justify-between print:border-none print:shadow-none">
          {/* Gold & Navy Inset Border */}
          <div className="absolute inset-2 border-2 border-[#d4af37] pointer-events-none rounded-sm"></div>

          {/* TAU Crest Header */}
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border-2 border-[#d4af37] bg-white flex items-center justify-center shadow-xs">
                <Award className="w-7 h-7 text-[#d4af37]" />
              </div>
              <div>
                <div className="text-[10px] font-bold tracking-widest text-[#0c4a60] uppercase">Texila American University</div>
                <div className="text-xs font-black tracking-wider text-[#d4af37] uppercase">Zambia Campus</div>
              </div>
            </div>

            <span className="text-xs font-bold text-[#0c4a60] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              S.No. :TAU:0037
            </span>
          </div>

          {/* Certificate Main Title */}
          <div className="text-center my-6 relative z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0c4a60] tracking-widest font-serif uppercase">
              CERTIFICATE
            </h1>
            <div className="text-lg sm:text-xl font-normal italic text-[#d4af37] font-serif mt-1">
              of Appreciation
            </div>

            <p className="text-xs sm:text-sm text-slate-700 font-medium mt-4">
              This Certificate is Proudly Presented to
            </p>

            <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0c4a60] italic font-serif my-3 tracking-wide border-b-2 border-[#d4af37]/40 pb-2 inline-block px-8">
              DERRICK KONDWANI MBEWE
            </div>

            <p className="text-xs sm:text-sm text-slate-700 italic mt-2">
              for your attendance and active participation in
            </p>
            <p className="text-xs sm:text-sm font-bold text-slate-900 italic mt-0.5">
              A seminar for Small and Medium Entreprises (SMEs)
            </p>
            <p className="text-xs sm:text-sm font-semibold text-slate-800 italic mt-0.5">
              On 31st July 2025 In Lusaka.
            </p>
            <p className="text-xs text-[#0c4a60] italic font-semibold mt-1">
              Best wishes for your business!
            </p>
          </div>

          {/* Signatures & Campus Info */}
          <div className="pt-4 border-t border-[#d4af37]/30 relative z-10">
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <div className="font-serif italic text-sm text-slate-800 font-semibold">Event Coordinator</div>
                <div className="h-6 flex items-center justify-center font-serif italic text-slate-600">Al.</div>
                <div className="border-t border-slate-300 pt-0.5 text-slate-500 font-sans text-[10px]">Event Coordinator</div>
              </div>
              <div>
                <div className="font-serif italic text-sm text-slate-800 font-semibold">DVC/Dean</div>
                <div className="h-6 flex items-center justify-center font-serif italic text-slate-600">Sormy P.</div>
                <div className="border-t border-slate-300 pt-0.5 text-slate-500 font-sans text-[10px]">DVC / Dean</div>
              </div>
              <div>
                <div className="font-serif italic text-sm text-slate-800 font-semibold">Vice Chancellor</div>
                <div className="h-6 flex items-center justify-center font-serif italic text-slate-600">Prof. Z.</div>
                <div className="border-t border-slate-300 pt-0.5 text-slate-500 font-sans text-[10px]">Vice Chancellor</div>
              </div>
            </div>

            <div className="mt-4 pt-2 border-t border-slate-200 text-center text-[10px] text-slate-500 font-sans">
              <span className="font-bold text-[#0c4a60]">http://tau.edu.zm</span> • Zambia Campus: 405/A, Given Lubinda Road, Lilayi, Lusaka
            </div>
          </div>
        </div>
      );
    }

    // 4. Texila American University Zambia (TAU) - Mental Health Headteacher Workshop
    if (id === 'cert-tau-mental-health') {
      return (
        <div className="bg-[#fcfdfd] p-6 sm:p-10 md:p-14 rounded-xl border-[6px] border-[#0c4a60] shadow-2xl relative overflow-hidden select-none font-serif min-h-[600px] w-full flex flex-col justify-between print:border-none print:shadow-none">
          <div className="absolute inset-2 border-2 border-[#d4af37] pointer-events-none rounded-sm"></div>

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border-2 border-[#d4af37] bg-white flex items-center justify-center shadow-xs">
                <Award className="w-7 h-7 text-[#d4af37]" />
              </div>
              <div>
                <div className="text-[10px] font-bold tracking-widest text-[#0c4a60] uppercase">Texila American University</div>
                <div className="text-xs font-black tracking-wider text-[#d4af37] uppercase">Zambia Campus</div>
              </div>
            </div>

            <span className="text-xs font-bold text-[#0c4a60] bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              06 February 2026
            </span>
          </div>

          <div className="text-center my-6 relative z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0c4a60] tracking-widest font-serif uppercase">
              CERTIFICATE
            </h1>
            <div className="text-lg sm:text-xl font-normal italic text-[#d4af37] font-serif mt-1">
              of Appreciation
            </div>

            <p className="text-xs sm:text-sm text-slate-700 font-medium mt-4">
              This Certificate is Proudly Presented to
            </p>

            <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0c4a60] italic font-serif my-2 tracking-wide border-b-2 border-[#d4af37]/40 pb-2 inline-block px-8">
              Kondwani Mbewe
            </div>

            <div className="text-xs sm:text-sm font-semibold text-slate-700 italic">
              Texila American University
            </div>

            <p className="text-xs sm:text-sm text-slate-600 italic mt-3 font-semibold">
              For Active Participation In.
            </p>
            <p className="text-xs sm:text-sm font-bold text-slate-900 italic mt-1 max-w-xl mx-auto">
              Theme: Mental Health &quot;critical area impacting educators wellbeing and effective school leadership&quot;
            </p>
            <p className="text-xs sm:text-sm font-semibold text-slate-800 italic mt-1">
              Headteacher Workshop on 6th February 2026 at Texila American University.
            </p>
            <p className="text-xs text-[#0c4a60] italic font-semibold mt-2">
              Best wishes for your career!
            </p>
          </div>

          <div className="pt-4 border-t border-[#d4af37]/30 relative z-10">
            <div className="grid grid-cols-2 gap-4 text-center text-xs max-w-md mx-auto">
              <div>
                <div className="h-6 flex items-center justify-center font-serif italic text-slate-700 font-bold">Al.</div>
                <div className="border-t border-slate-300 pt-0.5 text-slate-600 font-sans text-xs font-bold">Event Coordinator</div>
              </div>
              <div>
                <div className="h-6 flex items-center justify-center font-serif italic text-slate-700 font-bold">Sormy P.</div>
                <div className="border-t border-slate-300 pt-0.5 text-slate-600 font-sans text-xs font-bold">DVC / Dean</div>
              </div>
            </div>

            <div className="mt-4 pt-2 border-t border-slate-200 text-center text-[10px] text-slate-500 font-sans">
              <span className="font-bold text-[#0c4a60]">http://tau.edu.zm</span> • Zambia Campus: 405/A, Given Lubinda Road, Lilayi, Lusaka
            </div>
          </div>
        </div>
      );
    }

    // 5. Codveda Technologies Internship Completion Certificate
    if (id === 'cert-codveda-intern') {
      return (
        <div className="bg-white p-6 sm:p-10 md:p-12 rounded-xl border border-slate-300 shadow-2xl relative select-none font-sans min-h-[640px] w-full flex flex-col justify-between print:border-none print:shadow-none">
          {/* Top Logo & Company Info */}
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2">
                <div className="grid grid-cols-2 gap-0.5 w-6 h-6">
                  <span className="bg-slate-900 rounded-xs"></span>
                  <span className="bg-blue-500 rounded-xs"></span>
                  <span className="bg-amber-500 rounded-xs"></span>
                  <span className="bg-red-500 rounded-xs"></span>
                </div>
                <div>
                  <div className="text-xl font-extrabold tracking-tight text-slate-900">Codveda</div>
                  <div className="text-[9px] font-semibold text-slate-500 -mt-1">Empowering Growth with IT Innovation.</div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-slate-900">Date: 01-02-2026</span>
              </div>
            </div>

            <div className="text-center my-5">
              <h1 className="text-lg sm:text-xl font-black uppercase tracking-wider text-slate-900">
                INTERNSHIP COMPLETION CERTIFICATE
              </h1>
            </div>

            {/* Certificate Body Paragraphs */}
            <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                This is to certify that <strong className="text-slate-900 font-bold">Derrick Kondwani Mbewe</strong>, Intern ID :- <strong className="text-slate-900 font-bold">CV/A1/50656</strong>, currently pursuing a <strong className="text-slate-900 font-bold">BSC</strong> from <strong className="text-slate-900 font-bold">Texila American University Zambia</strong>, has completed an internship program as a <strong className="text-slate-900 font-bold">Frontend Development Intern</strong> with Codveda Technologies from <strong className="text-slate-900 font-bold">December 2025 to Januaury 2026</strong>.
              </p>
              <p>
                During this period, Derrick Kondwani Mbewe displayed remarkable dedication, sincerity, and a strong desire to learn. His Frontend Development skills and effective communication abilities were exceptional, and his attention to detail was awe-inspiring.
              </p>
              <p>
                They consistently approached new assignments and challenges with enthusiasm, showcasing a passion for Frontend Development. His commitment to acquiring new knowledge and skills was evident throughout the internship.
              </p>
              <p className="font-medium text-slate-800">
                We extend our best wishes for a successful future, confident that he will continue to excel in the field of Frontend Development.
              </p>
            </div>
          </div>

          {/* Official Seals & Signatures */}
          <div className="pt-6 border-t border-slate-200">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Signature */}
              <div className="text-left">
                <div className="font-serif italic text-lg text-slate-800 font-bold">Kaustubh</div>
                <div className="text-xs font-bold text-slate-900">Codveda Technologies</div>
              </div>

              {/* Codveda Stamp */}
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-blue-600 flex flex-col items-center justify-center text-[7px] font-bold text-blue-800 text-center leading-none p-1">
                <span>CODVEDA</span>
                <span>TECHNOLOGIES</span>
                <span className="text-[6px] text-slate-500">Chandrapur, India</span>
              </div>

              {/* ISO Badge & MSME */}
              <div className="flex items-center gap-3">
                <div className="px-2.5 py-1 bg-blue-700 text-white rounded text-[10px] font-bold text-center">
                  <div>ISO</div>
                  <div>9001:2015</div>
                  <div className="text-[7px] font-normal">CERTIFIED</div>
                </div>
                <div className="text-[8px] font-bold text-slate-700 border border-slate-200 p-1 rounded text-center">
                  <div>MSME</div>
                  <div className="text-[6px] text-slate-500">BUSINESS FORUM</div>
                </div>
              </div>
            </div>

            {/* Footer URLs */}
            <div className="mt-4 pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
              <span className="font-medium">www.codveda.com</span>
              <span className="font-medium">codvedatechnologies@gmail.com</span>
            </div>
          </div>
        </div>
      );
    }

    // 6. FIRST Global Video Training Course
    if (id === 'cert-first-global-video') {
      return (
        <div className="bg-white p-8 sm:p-12 md:p-16 rounded-xl border-[4px] border-[#0a3871] shadow-2xl relative select-none font-serif min-h-[560px] w-full flex flex-col justify-between print:border-none print:shadow-none">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 font-sans">07/19/2023</span>
            <div className="text-right">
              <span className="text-xs font-black text-[#0a3871] font-sans tracking-wider uppercase">Team Zambia</span>
            </div>
          </div>

          <div className="text-center my-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0a3871] italic font-serif tracking-tight">
              Certificate of Completion
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-3 font-sans font-medium">awarded to</p>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 italic font-serif my-3">
              Derrick Kondwani Mbewe
            </h2>

            <div className="text-sm font-bold text-[#0a3871] font-sans uppercase tracking-wider">
              Team Zambia
            </div>

            <p className="text-xs sm:text-sm text-slate-700 font-sans mt-4 max-w-md mx-auto">
              for successfully completing the <strong className="text-slate-900 font-bold">FIRST Global Video Training Course</strong>.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-amber-400 text-white flex items-center justify-center shadow-md">
                <Award className="w-6 h-6 text-amber-900" />
              </div>
              <div className="text-xs font-sans text-slate-600 font-bold">
                FIRST Global Certified
              </div>
            </div>

            <div className="text-right font-sans">
              <div className="text-sm font-black tracking-widest text-[#0a3871]">FIRST</div>
              <div className="text-xs font-bold tracking-widest text-slate-800">GLOBAL</div>
            </div>
          </div>
        </div>
      );
    }

    // Default Fallback Template
    return (
      <div className="bg-white p-8 sm:p-12 md:p-14 rounded-xl border-2 border-purple-300 shadow-2xl relative select-none min-h-[520px] w-full flex flex-col justify-between print:border-none print:shadow-none">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold text-purple-900">{certificate.issuer}</div>
          <div className="text-xs font-bold text-slate-600">{certificate.issueDate}</div>
        </div>

        <div className="text-center my-6">
          <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Official Credential</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-purple-950 mt-2 mb-3">
            {certificate.title}
          </h1>
          <p className="text-sm text-slate-700 font-medium max-w-lg mx-auto">
            Awarded to <strong>Derrick Kondwani Mbewe</strong>
          </p>
          <p className="text-xs text-slate-600 mt-3 max-w-md mx-auto leading-relaxed">
            {certificate.description}
          </p>
        </div>

        <div className="pt-4 border-t border-purple-100 flex items-center justify-between text-xs text-slate-600">
          <div>Verified Credential</div>
          {certificate.credentialId && (
            <div className="font-mono text-[10px]">ID: {certificate.credentialId}</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl h-[92vh] max-h-[92vh] bg-slate-900/95 rounded-2xl sm:rounded-3xl shadow-2xl border border-purple-300/40 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar (Fixed Header) */}
        <div className="px-4 sm:px-6 py-3 bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 text-white flex items-center justify-between gap-3 shadow-lg shrink-0 border-b border-purple-700/50 z-20">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-xl bg-white/10 text-purple-200 shrink-0">
              <Award className="w-4 h-4 text-purple-300" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold truncate text-white">
                {certificate.title}
              </h3>
              <p className="text-[11px] text-purple-200 truncate">
                {certificate.issuer} • {certificate.issueDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Zoom Controls (like PDF viewer) */}
            <div className="hidden sm:flex items-center gap-1 bg-white/10 rounded-xl px-2 py-1 border border-purple-400/30 text-white/90">
              <button
                onClick={() => handleZoom(-15)}
                className="p-1 rounded hover:bg-white/10 text-xs font-bold transition-all cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-mono px-1.5 font-bold w-10 text-center">{zoomLevel}%</span>
              <button
                onClick={() => handleZoom(15)}
                className="p-1 rounded hover:bg-white/10 text-xs font-bold transition-all cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={resetZoom}
                className="p-1 rounded hover:bg-white/10 text-white/60 hover:text-white cursor-pointer"
                title="Reset Zoom"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>

            {/* Print / Save PDF Button */}
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-purple-700 hover:bg-purple-600 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs border border-purple-500"
              title="Print or Save Certificate"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Save PDF / Print</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-red-600 text-white transition-all cursor-pointer border border-white/10 ml-1"
              title="Close Viewer (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Certificate Viewer Canvas (Directly matching PDF viewer layout) */}
        <div 
          ref={modalBodyRef}
          className="flex-1 overflow-y-auto overflow-x-auto p-4 sm:p-8 md:p-12 flex justify-center items-start bg-slate-950/90"
        >
          <div 
            style={{ 
              width: `${Math.round(8.27 * 96 * (zoomLevel / 100))}px`,
              maxWidth: zoomLevel <= 100 ? '100%' : 'none'
            }}
            className="transition-all duration-150 my-auto shrink-0"
          >
            {renderCertificateContent()}
          </div>
        </div>

        {/* Bottom Navigation & Metadata Bar (Fixed Footer) */}
        <div className="px-4 sm:px-6 py-3 bg-slate-900 border-t border-purple-900/80 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 z-20 text-white">
          <div className="flex items-center gap-2 text-xs text-slate-300 w-full sm:w-auto justify-between sm:justify-start">
            <span className="font-semibold text-purple-200">Credential ID:</span>
            {certificate.credentialId ? (
              <button
                onClick={handleCopyId}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-purple-950 text-purple-200 text-[11px] font-mono font-bold transition-colors cursor-pointer border border-slate-700 hover:border-purple-500"
                title="Click to copy credential ID"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-purple-400" />}
                <span className="max-w-[180px] sm:max-w-[280px] truncate">{certificate.credentialId}</span>
              </button>
            ) : (
              <span className="text-slate-400 font-mono text-[11px]">Official Verified Document</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1 cursor-pointer border border-slate-700 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <span className="text-xs font-mono font-bold text-purple-300 px-2">
              {currentIndex + 1} of {allCertificates.length}
            </span>

            <button
              onClick={handleNext}
              className="px-3 py-1.5 rounded-xl bg-purple-700 hover:bg-purple-600 text-white text-xs font-bold flex items-center gap-1 cursor-pointer border border-purple-500 shadow-xs transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
