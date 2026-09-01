import React, { useState } from 'react';
import { ProfileData, CertificateItem } from '../../types';
import { 
  Download, 
  Printer, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  CheckCircle2, 
  FileText,
  Mail,
  Phone,
  Linkedin,
  Github,
  Award,
  BookOpen
} from 'lucide-react';
import { sound } from '../../utils/soundEffects';
import { CertificateViewerModal } from '../common/CertificateViewerModal';

interface ProfessionalPdfViewerProps {
  profile: ProfileData;
  onOpenCertificate?: (certId: string) => void;
}

export const ProfessionalPdfViewer: React.FC<ProfessionalPdfViewerProps> = ({
  profile,
  onOpenCertificate
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [viewMode, setViewMode] = useState<'single' | 'continuous'>('continuous');
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  const totalPages = 4;

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  const handleOpenCertById = (certId: string) => {
    const found = profile.certificates.find(c => c.id === certId);
    if (found) {
      setSelectedCert(found);
      sound.playClick();
    } else if (onOpenCertificate) {
      onOpenCertificate(certId);
    }
  };

  const handleZoom = (delta: number) => {
    sound.playClick();
    setZoomLevel(prev => Math.min(150, Math.max(70, prev + delta)));
  };

  const resetZoom = () => {
    sound.playClick();
    setZoomLevel(100);
  };

  return (
    <div className="flex flex-col h-full bg-slate-100/90 rounded-3xl overflow-hidden border border-purple-200/90 shadow-2xl">
      {/* PDF Viewer Top Action Toolbar */}
      <div className="glass-panel px-4 sm:px-6 py-3 border-b border-purple-100 flex flex-wrap items-center justify-between gap-3 shrink-0 z-10 bg-white/90">
        {/* Left: Document Info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-600/90 text-white flex items-center justify-center font-bold text-xs shadow-sm">
            PDF
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <span>Derrick_K_Mbewe_Resume.pdf</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-purple-100 text-purple-800 font-semibold hidden sm:inline-block border border-purple-200">
                Verified Authentic
              </span>
            </div>
            <div className="text-[11px] text-slate-500">
              4 Pages • Updated 2026 • Certified STEM & AI Specialist
            </div>
          </div>
        </div>

        {/* Center: Page Controls (for single page mode) */}
        <div className="flex items-center gap-2 bg-white/80 rounded-xl px-2 py-1 border border-purple-200 shadow-xs">
          <button
            id="pdf-prev-page"
            disabled={currentPage <= 1}
            onClick={() => {
              setCurrentPage(p => Math.max(1, p - 1));
              sound.playClick();
            }}
            className="p-1 rounded hover:bg-purple-50 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer text-slate-700"
            title="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <span className="text-xs font-semibold text-slate-700 px-1">
            Page {currentPage} of {totalPages}
          </span>

          <button
            id="pdf-next-page"
            disabled={currentPage >= totalPages}
            onClick={() => {
              setCurrentPage(p => Math.min(totalPages, p + 1));
              sound.playClick();
            }}
            className="p-1 rounded hover:bg-purple-50 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer text-slate-700"
            title="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Zoom & Utilities */}
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="hidden sm:flex items-center gap-1 bg-white/80 rounded-xl px-2 py-1 border border-purple-200">
            <button
              id="pdf-zoom-out"
              onClick={() => handleZoom(-15)}
              className="p-1 rounded hover:bg-purple-50 text-slate-700 cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-mono text-slate-600 w-10 text-center">{zoomLevel}%</span>
            <button
              id="pdf-zoom-in"
              onClick={() => handleZoom(15)}
              className="p-1 rounded hover:bg-purple-50 text-slate-700 cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              id="pdf-zoom-reset"
              onClick={resetZoom}
              className="p-1 rounded hover:bg-purple-50 text-slate-400 hover:text-slate-700 cursor-pointer text-[10px]"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Continuous vs Single View Toggle */}
          <button
            id="pdf-view-mode-toggle"
            onClick={() => {
              setViewMode(m => m === 'continuous' ? 'single' : 'continuous');
              sound.playClick();
            }}
            className="px-2.5 py-1.5 rounded-xl text-xs font-semibold glass-button text-slate-700 border border-purple-200 transition-colors cursor-pointer hover:text-purple-800"
          >
            {viewMode === 'continuous' ? 'Single Page' : 'All 4 Pages'}
          </button>

          {/* Print Button */}
          <button
            id="pdf-print-button"
            onClick={handlePrint}
            className="p-2 rounded-xl text-slate-700 glass-button border border-purple-200 transition-colors cursor-pointer hover:text-purple-800"
            title="Print Document"
          >
            <Printer className="w-4 h-4 text-purple-800" />
          </button>

          {/* Download Button */}
          <a
            id="pdf-download-button"
            href="#download"
            onClick={(e) => {
              e.preventDefault();
              sound.playLevelUp();
              window.print();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer border border-purple-600"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Save PDF</span>
          </a>
        </div>
      </div>

      {/* Main Document Content Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center gap-8 bg-slate-200/70">
        {/* Render pages depending on continuous or single mode */}
        {(viewMode === 'continuous' ? [1, 2, 3, 4] : [currentPage]).map(pageNumber => (
          <div
            key={`page-${pageNumber}`}
            id={`resume-page-${pageNumber}`}
            style={{ width: `${Math.round(8.27 * 96 * (zoomLevel / 100))}px` }}
            className="bg-white text-slate-900 shadow-2xl rounded-sm p-8 sm:p-12 relative border border-slate-300 font-sans transition-all print:w-full print:shadow-none print:border-none print:p-6"
          >
            {/* Top Page Watermark & Page Number */}
            <div className="absolute top-4 right-6 text-[10px] font-mono text-slate-400 uppercase tracking-widest print:hidden">
              Page {pageNumber} of 4
            </div>

            {/* PAGE 1 CONTENT */}
            {pageNumber === 1 && (
              <div className="space-y-6 text-sm leading-relaxed">
                {/* Header Name & Contact */}
                <div className="text-center pb-4 border-b border-slate-300">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Derrick K. Mbewe
                  </h1>
                  <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-slate-700 mt-2 font-mono">
                    <a href="tel:+260772262028" className="hover:text-purple-700 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-purple-600" />
                      +260772262028
                    </a>
                    <span>|</span>
                    <a href="mailto:kondwanimbewe111@gmail.com" className="hover:text-purple-700 underline text-purple-800 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-purple-600" />
                      kondwanimbewe111@gmail.com
                    </a>
                  </div>
                </div>

                {/* Personal Information */}
                <div>
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Personal Information:
                  </h2>
                  <ul className="list-disc list-inside text-xs sm:text-sm text-slate-800 space-y-1 pl-1">
                    <li><span className="font-semibold">Name:</span> Derrick Kondwani Mbewe</li>
                    <li><span className="font-semibold">Contact number:</span> +260772262028</li>
                    <li>
                      <span className="font-semibold">Email address:</span>{' '}
                      <a href="mailto:kondwanimbewe111@gmail.com" className="text-purple-700 underline">
                        kondwanimbewe111@gmail.com
                      </a>
                    </li>
                    <li className="font-semibold text-purple-900">
                      Second Year Student at Texila American University Zambia
                    </li>
                  </ul>
                </div>

                <hr className="border-slate-300" />

                {/* Objective */}
                <div>
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Objective:
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-800 mb-2 italic">
                    I classify myself to be a driven and passionate person.
                  </p>
                  <ul className="list-disc list-inside text-xs sm:text-sm text-slate-800 space-y-2 pl-1">
                    <li>
                      I am eager to immerse myself in cutting-edge technologies and innovative problem-solving within the fields of computer science, Cyber Security, AI and engineering.
                    </li>
                    <li>
                      I aspire to contribute to the future of technology, fostering creativity, expanding my knowledge and gaining invaluable skills.
                    </li>
                    <li>
                      Am committed to utilizing the experience and knowledge gained to empower and build a tech company in my home country.
                    </li>
                  </ul>
                </div>

                <hr className="border-slate-300" />

                {/* Education */}
                <div>
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                    Education:
                  </h2>
                  <div className="space-y-3 text-xs sm:text-sm text-slate-800">
                    <div className="flex items-start gap-2">
                      <span className="text-purple-700 font-bold">•</span>
                      <div>
                        <div className="font-bold text-slate-900">Sentinal Kabitaka School (K–4)</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="text-purple-700 font-bold">•</span>
                      <div>
                        <div className="font-bold text-slate-900">Faith Christian Trust Academy (5–7)</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="text-purple-700 font-bold">•</span>
                      <div>
                        <div className="font-bold text-slate-900">Don Bosco Technical Secondary School (Grade 8–9)</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="text-purple-700 font-bold">•</span>
                      <div>
                        <div className="font-bold text-slate-900">Kanini Secondary School, Ndola, Zambia (Grade 10–12)</div>
                        <div className="text-xs text-slate-600 mt-0.5 space-y-0.5 pl-3">
                          <div>○ <strong>Graduated:</strong> 28th October 2022</div>
                          <div>○ <strong>Relevant Coursework:</strong> Advanced Mathematics (Additional Mathematics), Physics, Chemistry</div>
                          <div>○ <strong>GPA:</strong> 4.0</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 pt-1">
                      <span className="text-purple-700 font-bold">•</span>
                      <div className="font-bold text-purple-950 bg-purple-50 px-2.5 py-1.5 rounded-lg border border-purple-200">
                        Currently at Texila American University Zambia Studying BS.c in Artificial Intelligence.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PAGE 2 CONTENT */}
            {pageNumber === 2 && (
              <div className="space-y-6 text-sm leading-relaxed">
                {/* Professional Experience */}
                <div>
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                    Professional Experience:
                  </h2>
                  <div className="space-y-4 text-xs sm:text-sm text-slate-800">
                    <div>
                      <div className="flex items-baseline justify-between font-bold text-slate-900">
                        <span>● Full Stack Developer Intern | Codveda Technologies</span>
                        <span className="text-xs text-slate-500 font-normal">December 2025</span>
                      </div>
                      <ul className="list-circle list-inside text-xs text-slate-700 pl-4 mt-1 space-y-1">
                        <li>○ Developed and optimized web applications using modern full-stack development tools and best practices.</li>
                        <li>○ Collaborated on software development tasks, enhancing application functionality and performance.</li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex items-baseline justify-between font-bold text-slate-900">
                        <span>● Data Analyst | God First Bakery</span>
                        <span className="text-xs text-slate-500 font-normal">February 2024 – October 2024</span>
                      </div>
                      <ul className="list-circle list-inside text-xs text-slate-700 pl-4 mt-1 space-y-1">
                        <li>○ Analyzed operational and sales data to help optimize business performance and inventory tracking.</li>
                        <li>○ Compiled and interpreted data reports to support decision-making processes.</li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex items-baseline justify-between font-bold text-slate-900">
                        <span>● SAT Math & English Tutor | Zambia Institute for Sustainable Development (ZISD)</span>
                        <span className="text-xs text-slate-500 font-normal">November 2023 – September 2024</span>
                      </div>
                      <ul className="list-circle list-inside text-xs text-slate-700 pl-4 mt-1 space-y-1">
                        <li>○ Tutored students in SAT Mathematics and English, focusing on critical thinking and problem-solving strategies.</li>
                        <li>○ Prepared learning materials, evaluated student progress, and helped improve test scores.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <hr className="border-slate-300" />

                {/* Extracurricular Activities */}
                <div>
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                    Extracurricular Activities:
                  </h2>
                  <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-800 pl-1">
                    <li>
                      <strong>Junior Secondary Vice President, JETS Club</strong>
                      <div className="pl-4 text-xs text-slate-600">
                        ○ Led science-related projects, organized STEM events, and mentored junior members.
                      </div>
                    </li>
                    <li>
                      <strong>Participant, Inter-School Olympiads (Mathematics)</strong>
                      <div className="pl-4 text-xs text-slate-600">
                        ○ Represented the school in mathematics competitions.
                      </div>
                    </li>
                    <li>
                      <strong>Participant, National Jets Fair</strong>
                      <div className="pl-4 text-xs text-slate-600">
                        ○ Gained knowledge and experience.
                      </div>
                    </li>
                    <li>
                      <strong>Participant, School Debate Team</strong>
                      <div className="pl-4 text-xs text-slate-600">
                        ○ Developed public speaking and critical thinking skills.
                      </div>
                    </li>
                    <li>
                      <strong className="text-purple-900">Member, Zambia Robotics</strong>
                      <div className="pl-4 text-xs text-slate-700">
                        ○ Represented the country at the international First Global Robotics Challenge.
                      </div>
                    </li>
                    <li>
                      <strong className="text-purple-900">Winning Team, Texila ZRA Hackathon Team</strong>
                      <div className="pl-4 text-xs text-slate-700 font-medium">
                        ○ Participated and team won 1st place in the 2025 ZRA Hackathon Competition.
                      </div>
                    </li>
                  </ol>
                </div>

                <hr className="border-slate-300" />

                {/* Skills */}
                <div>
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Skills:
                  </h2>
                  <div className="text-xs sm:text-sm text-slate-800 space-y-1">
                    <div className="font-bold text-slate-900">● Programming Skills:</div>
                    <ul className="text-xs text-slate-700 pl-4 space-y-1">
                      <li>○ Proficient in blocky, python, java, C, HTML, and CSS.</li>
                      <li>○ Database knowledge (MySQL, Superbase and Firebase integration)</li>
                      <li>○ Version control (Git)</li>
                      <li>○ System deployment knowledge</li>
                      <li>○ Proficient in AI workflow automation using Make.com and n8n.</li>
                      <li>○ Experience integrating AI models and developing AI-powered automation solutions using OpenAI API, Google AI Studio, VAPI, and Google Apps Script.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* PAGE 3 CONTENT */}
            {pageNumber === 3 && (
              <div className="space-y-6 text-sm leading-relaxed">
                {/* Non-Programming & CAD & Media Skills */}
                <div>
                  <div className="space-y-3 text-xs sm:text-sm text-slate-800">
                    <div>
                      <div className="font-bold text-slate-900">● Non-Programming Skills:</div>
                      <div className="pl-4 text-xs text-slate-700 mt-0.5">
                        ○ Competent in Adalo and Flutterflow for app development. Familiar with typeflow and flodest for email marketing and bolt, strikingly for no code web development.
                      </div>
                    </div>

                    <div>
                      <div className="font-bold text-slate-900">● CAD (Computer-Aided Design):</div>
                      <div className="pl-4 text-xs text-slate-700 mt-0.5">
                        ○ Knowledge and experience in AutoCAD, Inventor, and Fusion 360.
                      </div>
                    </div>

                    <div>
                      <div className="font-bold text-slate-900">● Digital Art and Animation:</div>
                      <div className="pl-4 text-xs text-slate-700 mt-0.5">
                        ○ Proficient in Clip Studio and Photoshop as well as Canva and Capcut.
                      </div>
                    </div>

                    <div>
                      <div className="font-bold text-slate-900">● Video and Photography</div>
                    </div>

                    <div>
                      <div className="font-bold text-slate-900">● SAT math and English tutor with 2 years of experience.</div>
                    </div>
                  </div>
                </div>

                <hr className="border-slate-300" />

                {/* Cyber Security Skills Section */}
                <div>
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                    ● Cyber Security Skills:
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-800">
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      <div className="font-bold text-purple-950">Disaster Recovery</div>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Understanding of backup strategies, system restoration processes, and business continuity planning to ensure minimal downtime after security incidents or system failures.
                      </p>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      <div className="font-bold text-purple-950">Governance</div>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Knowledge of cybersecurity policies, standards, and best practices, including how organizations align security with business objectives and regulatory requirements.
                      </p>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      <div className="font-bold text-purple-950">Incident Response</div>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Familiarity with identifying, analyzing, and responding to security incidents, including basic steps such as detection, containment, eradication, and recovery.
                      </p>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      <div className="font-bold text-purple-950">Penetration Testing</div>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Basic exposure to ethical hacking techniques, including reconnaissance, vulnerability scanning, and identifying security weaknesses using tools like Nmap and Kali Linux.
                      </p>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      <div className="font-bold text-purple-950">Risk Assessment & Management</div>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Ability to identify potential security threats, evaluate vulnerabilities, assess likelihood within a system or network, and prioritize mitigation controls.
                      </p>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      <div className="font-bold text-purple-950">Security Controls</div>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Knowledge of implementing and evaluating technical and administrative controls such as firewalls, access control mechanisms, and security policies to protect systems and data.
                      </p>
                    </div>
                  </div>
                </div>

                <hr className="border-slate-300" />

                {/* Awards and Honors */}
                <div>
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Awards and Honors:
                  </h2>
                  <ul className="text-xs sm:text-sm text-slate-800 space-y-1.5 pl-1">
                    <li>● Best Overall Student Certificate (Grade 8)</li>
                    <li>● Certificate for Completing a Photo-voltaic Course</li>
                    <li>
                      ● <strong>Scholarship from KCM Mining Company</strong>
                      <div className="pl-4 text-xs text-slate-600">
                        ○ Opportunity to study at Chiwala Provincial STEM Secondary School On full Scholarship by KCM.
                      </div>
                    </li>
                    <li>● Certificate of Secondary School Completion</li>
                    <li>● Certificate for Completing the First Global Video Training Course</li>
                    <li>● Certificate for Competing in the First Global Robotics Challenge</li>
                  </ul>
                </div>
              </div>
            )}

            {/* PAGE 4 CONTENT */}
            {pageNumber === 4 && (
              <div className="space-y-6 text-sm leading-relaxed">
                {/* Certificates Links */}
                <div>
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                    Certifications & Verifiable Credentials:
                  </h2>
                  <div className="space-y-4 text-xs sm:text-sm text-slate-800">
                    {/* Python 1 and 2 */}
                    <div className="bg-purple-50/70 p-3 rounded-xl border border-purple-200">
                      <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-purple-700" />
                        Certificate for completing the Cisco Networking Academy’s Python 1 and 2 essentials courses:
                      </div>
                      <div className="space-y-1.5 pl-4 text-xs">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[11px] text-slate-600 truncate">
                            📄 Python_Essentials_1_certificate_Kondwani_Mbewe
                          </span>
                          <button
                            type="button"
                            onClick={() => handleOpenCertById('cert-cisco-py1')}
                            className="text-purple-700 hover:text-purple-900 font-bold underline flex items-center gap-1 shrink-0 text-[11px] cursor-pointer"
                          >
                            <Eye className="w-3 h-3" /> View Certificate
                          </button>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[11px] text-slate-600 truncate">
                            📄 Python_Essentials_2_certificate_Kondwani_Mbewe
                          </span>
                          <button
                            type="button"
                            onClick={() => handleOpenCertById('cert-cisco-py2')}
                            className="text-purple-700 hover:text-purple-900 font-bold underline flex items-center gap-1 shrink-0 text-[11px] cursor-pointer"
                          >
                            <Eye className="w-3 h-3" /> View Certificate
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Cyber Threat Management */}
                    <div className="bg-purple-50/70 p-3 rounded-xl border border-purple-200">
                      <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-purple-700" />
                        Certificate for completing the Cisco Networking Academy’s Cyber Threat Management course:
                      </div>
                      <div className="pl-4 text-xs flex items-center justify-between gap-2">
                        <span className="font-mono text-[11px] text-slate-600 truncate">
                          📄 Cyber_Threat_Management_certificate_Kondwani_Mbewe
                        </span>
                        <button
                          type="button"
                          onClick={() => handleOpenCertById('cert-cisco-threat-mgmt')}
                          className="text-purple-700 hover:text-purple-900 font-bold underline flex items-center gap-1 shrink-0 text-[11px] cursor-pointer"
                        >
                          <Eye className="w-3 h-3" /> View Certificate
                        </button>
                      </div>
                    </div>

                    {/* Network Support and Security */}
                    <div className="bg-purple-50/70 p-3 rounded-xl border border-purple-200">
                      <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-purple-700" />
                        Certificate for completing the Cisco Networking Academy’s Network Support and Security course:
                      </div>
                      <div className="pl-4 text-xs flex items-center justify-between gap-2">
                        <span className="font-mono text-[11px] text-slate-600 truncate">
                          📄 Network_Support_and_Security_certificate_Kondwani_Mbewe
                        </span>
                        <button
                          type="button"
                          onClick={() => handleOpenCertById('cert-cisco-net-sec')}
                          className="text-purple-700 hover:text-purple-900 font-bold underline flex items-center gap-1 shrink-0 text-[11px] cursor-pointer"
                        >
                          <Eye className="w-3 h-3" /> View Certificate
                        </button>
                      </div>
                    </div>

                    {/* Ethical Hacking */}
                    <div className="bg-purple-50/70 p-3 rounded-xl border border-purple-200">
                      <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-purple-700" />
                        Certificate for completing the Cisco Networking Academy’s Ethical Hacking course:
                      </div>
                      <div className="pl-4 text-xs flex items-center justify-between gap-2">
                        <span className="font-mono text-[11px] text-slate-600 truncate">
                          📄 Ethical_Hacker_certificate_Kondwani_Mbewe
                        </span>
                        <button
                          type="button"
                          onClick={() => handleOpenCertById('cert-cisco-eth-hack')}
                          className="text-purple-700 hover:text-purple-900 font-bold underline flex items-center gap-1 shrink-0 text-[11px] cursor-pointer"
                        >
                          <Eye className="w-3 h-3" /> View Certificate
                        </button>
                      </div>
                    </div>

                    {/* Codveda Internship Certificate */}
                    <div className="bg-purple-50/70 p-3 rounded-xl border border-purple-200">
                      <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-purple-700" />
                        Certificate Of Completion for Internship at Codveda Technologies – Derrick Kondwani Mbewe
                      </div>
                      <div className="pl-4 text-xs flex items-center justify-between gap-2">
                        <span className="font-mono text-[11px] text-slate-600 truncate">
                          📄 Codveda_Technologies_Internship_Certificate.pdf
                        </span>
                        <button
                          type="button"
                          onClick={() => handleOpenCertById('cert-codveda-intern')}
                          className="text-purple-700 hover:text-purple-900 font-bold underline flex items-center gap-1 shrink-0 text-[11px] cursor-pointer"
                        >
                          <Eye className="w-3 h-3" /> View Certificate
                        </button>
                      </div>
                    </div>

                    {/* Texila American University (TAU) Honors */}
                    <div className="bg-purple-50/70 p-3 rounded-xl border border-purple-200">
                      <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-purple-700" />
                        Texila American University (TAU) Certificates & Honors:
                      </div>
                      <div className="space-y-1.5 pl-4 text-xs">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[11px] text-slate-600 truncate">
                            📄 TAU_SME_Seminar_Certificate_of_Appreciation.pdf
                          </span>
                          <button
                            type="button"
                            onClick={() => handleOpenCertById('cert-tau-sme')}
                            className="text-purple-700 hover:text-purple-900 font-bold underline flex items-center gap-1 shrink-0 text-[11px] cursor-pointer"
                          >
                            <Eye className="w-3 h-3" /> View Certificate
                          </button>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[11px] text-slate-600 truncate">
                            📄 TAU_Mental_Health_Workshop_Certificate.pdf
                          </span>
                          <button
                            type="button"
                            onClick={() => handleOpenCertById('cert-tau-mental-health')}
                            className="text-purple-700 hover:text-purple-900 font-bold underline flex items-center gap-1 shrink-0 text-[11px] cursor-pointer"
                          >
                            <Eye className="w-3 h-3" /> View Certificate
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-slate-300" />

                {/* References */}
                <div>
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                    References:
                  </h2>
                  <div className="space-y-2 text-xs sm:text-sm text-slate-800">
                    <div className="p-2 rounded bg-slate-50 border border-slate-200">
                      <div className="font-bold text-slate-900">Mr Peter Lungu (Robotics Mentor)</div>
                      <div className="text-xs text-slate-600 flex flex-wrap gap-3 mt-0.5">
                        <span>📞 +260970169123</span>
                        <span>✉️ <a href="mailto:peterthepundit@gmail.com" className="text-purple-700 underline">peterthepundit@gmail.com</a></span>
                      </div>
                    </div>

                    <div className="p-2 rounded bg-slate-50 border border-slate-200">
                      <div className="font-bold text-slate-900">Mr Joseph Iliamupu (High school counselor)</div>
                      <div className="text-xs text-slate-600 flex flex-wrap gap-3 mt-0.5">
                        <span>📞 +260966311217</span>
                        <span>✉️ <a href="mailto:iliamupujoseph@yahoo.com" className="text-purple-700 underline">iliamupujoseph@yahoo.com</a></span>
                      </div>
                    </div>

                    <div className="p-2 rounded bg-slate-50 border border-slate-200">
                      <div className="font-bold text-slate-900">Mr Towani Kawonga (Texila American University Lecturer and Mentor)</div>
                      <div className="text-xs text-slate-600 flex flex-wrap gap-3 mt-0.5">
                        <span>📞 +260979177208</span>
                        <span>✉️ <a href="mailto:towani.kawonga@tau.edu.zm" className="text-purple-700 underline">towani.kawonga@tau.edu.zm</a></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* In-Code Certificate Viewer Modal */}
      <CertificateViewerModal
        isOpen={!!selectedCert}
        certificate={selectedCert}
        allCertificates={profile.certificates}
        onClose={() => setSelectedCert(null)}
        onSelectCertificate={(cert) => setSelectedCert(cert)}
      />
    </div>
  );
};
