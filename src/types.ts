export interface ProfileData {
  name: string;
  preferredName: string;
  title: string;
  tagline: string;
  bio: string;
  objective: string[];
  contact: {
    email: string;
    phone: string;
    location: string;
    github: string;
    linkedin: string;
    portfolioUrl?: string;
  };
  education: EducationItem[];
  experiences: ExperienceItem[];
  extracurriculars: ExtracurricularItem[];
  awards: AwardItem[];
  skills: SkillCategory[];
  cybersecuritySkills: CyberSecurityDomain[];
  certificates: CertificateItem[];
  projects: ProjectItem[];
  references: ReferenceItem[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degreeOrLevel: string;
  field?: string;
  period: string;
  gpa?: string;
  coursework?: string[];
  highlights?: string;
  status: 'current' | 'completed';
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  type: 'internship' | 'data-analysis' | 'tutoring' | 'full-time' | 'contract';
  description: string[];
  skillsUsed: string[];
  location?: string;
}

export interface ExtracurricularItem {
  id: string;
  title: string;
  organization: string;
  description: string;
  year?: string;
  icon?: string;
}

export interface AwardItem {
  id: string;
  title: string;
  issuer: string;
  year?: string;
  description?: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: {
    name: string;
    level: number; // 1-100
    experience: string;
    highlight?: boolean;
  }[];
}

export interface CyberSecurityDomain {
  domain: string;
  description: string;
  tools?: string[];
  level: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl: string;
  category: 'networking' | 'python' | 'cybersecurity' | 'robotics' | 'internship' | 'energy' | 'academic';
  description: string;
  skillsAcquired: string[];
  verified: boolean;
  badgeColor?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: 'ai-ml' | 'fullstack' | 'cybersecurity' | 'robotics' | 'automation' | 'cad-design';
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  metrics?: string;
  role?: string;
  date: string;
  stars?: number;
  interactiveDemoType?: 'chatbot' | 'cipher' | 'workflow' | 'model-viewer' | 'code';
}

export interface ReferenceItem {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company?: string;
  role?: 'Recruiter' | 'Hiring Manager' | 'Collaborator' | 'Other';
  subject: string;
  message: string;
  timestamp: string;
  read: boolean;
  status: 'new' | 'replied' | 'archived';
}

export type ViewMode = '2d-dashboard' | 'resume-pdf' | '3d-world';

export type ZoneId = 'overview' | 'hub' | 'projects' | 'skills' | 'certificates' | 'experience' | 'resume' | 'contact';

export interface GameState {
  playerXp: number;
  playerLevel: number;
  discoveredZones: ZoneId[];
  visitedProjectIds: string[];
  visitedCertIds: string[];
  unlockedBadges: string[];
  audioEnabled: boolean;
  activeZone: ZoneId;
}
