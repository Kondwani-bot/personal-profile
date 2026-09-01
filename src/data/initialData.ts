import { ProfileData, ContactMessage } from '../types';

export const INITIAL_PROFILE: ProfileData = {
  name: "Derrick Kondwani Mbewe",
  preferredName: "Kondwani",
  title: "AI & Software Engineer | Cyber Security & Full Stack Developer",
  tagline: "Building intelligent automated systems, secure infrastructures, and interactive digital experiences.",
  bio: "Passionate AI Engineering student at Texila American University Zambia with real-world experience in full-stack development, cyber threat mitigation, robotics, and intelligent automation workflows. Winning team of the 2025 ZRA Hackathon and former Zambia National Robotics team representative.",
  objective: [
    "Eager to immerse myself in cutting-edge technologies and innovative problem-solving within the fields of computer science, Cyber Security, AI and engineering.",
    "Aspire to contribute to the future of technology, fostering creativity, expanding my knowledge, and gaining invaluable skills.",
    "Committed to utilizing the experience and knowledge gained to empower and build a high-impact tech company in Zambia."
  ],
  contact: {
    email: "kondwanimbewe111@gmail.com",
    phone: "+260772262028",
    location: "Ndola / Lusaka, Zambia",
    github: "https://github.com/Kondwani-bot",
    linkedin: "https://www.linkedin.com/in/kondwani-mbewe-b7829528b/",
    portfolioUrl: "https://kondwani-profile.dev"
  },
  education: [
    {
      id: "edu-tau",
      institution: "Texila American University Zambia",
      degreeOrLevel: "B.Sc in Artificial Intelligence",
      field: "Artificial Intelligence & Intelligent Systems",
      period: "2024 – Present (2nd Year)",
      gpa: "4.0",
      coursework: [
        "Machine Learning Foundations",
        "Neural Networks & Deep Learning",
        "Data Structures & Algorithms",
        "Intelligent Agent Architectures",
        "Computer Vision & NLP",
        "Autonomous Robotics"
      ],
      highlights: "Maintaining 4.0 GPA while leading student innovation initiatives and won the prestigious 2025 ZRA Hackathon competition.",
      status: "current"
    },
    {
      id: "edu-kanini",
      institution: "Kanini Secondary School, Ndola, Zambia",
      degreeOrLevel: "Secondary School Completion (Grade 10–12)",
      period: "Graduated: 28th October 2022",
      gpa: "4.0",
      coursework: [
        "Advanced Mathematics (Additional Mathematics)",
        "Physics",
        "Chemistry",
        "Computer Science",
        "Technical Drawing"
      ],
      highlights: "Graduated top of class with 4.0 GPA; selected for National JETS Fair and Inter-School Mathematics Olympiads.",
      status: "completed"
    },
    {
      id: "edu-chiwala",
      institution: "Chiwala Provincial STEM Secondary School",
      degreeOrLevel: "Provincial STEM Honor Program",
      period: "2020 – 2022",
      highlights: "Awarded full competitive scholarship by KCM Mining Company to pursue advanced STEM secondary education.",
      status: "completed"
    },
    {
      id: "edu-donbosco",
      institution: "Don Bosco Technical Secondary School",
      degreeOrLevel: "Junior Secondary (Grade 8–9)",
      period: "2018 – 2019",
      highlights: "Best Overall Student Certificate (Grade 8) with academic excellence across all technical subjects.",
      status: "completed"
    }
  ],
  experiences: [
    {
      id: "exp-codveda",
      role: "Frontend Development Intern",
      company: "Codveda Technologies (Intern ID: CV/A1/50656)",
      period: "December 2025 – January 2026",
      type: "internship",
      location: "Remote",
      description: [
        "Developed and optimized responsive web applications and modular frontend architectures using React, TypeScript, and modern engineering standards.",
        "Collaborated closely with cross-functional engineering teams, enhancing UI components, state management workflows, and REST API integrations.",
        "Authored clean, maintainable modular code and actively contributed in agile sprint reviews, design implementations, and unit testing."
      ],
      skillsUsed: ["React", "TypeScript", "Frontend Engineering", "REST APIs", "Git", "Tailwind CSS", "UI/UX"]
    },
    {
      id: "exp-godfirst",
      role: "Data Analyst",
      company: "God First Bakery",
      period: "February 2024 – October 2024",
      type: "data-analysis",
      location: "Ndola, Zambia",
      description: [
        "Analyzed operational and sales transaction data across retail branches to help optimize business performance and inventory tracking.",
        "Compiled and interpreted periodic data reports, dashboards, and forecasts to support critical management decision-making processes.",
        "Identified supply chain bottlenecks and reduced inventory wastage through algorithmic trend analysis."
      ],
      skillsUsed: ["Python", "Pandas", "Data Visualization", "Excel Automation", "Statistical Modeling", "MySQL"]
    },
    {
      id: "exp-zisd",
      role: "SAT Math & English Tutor",
      company: "Zambia Institute for Sustainable Development (ZISD)",
      period: "November 2023 – September 2024",
      type: "tutoring",
      location: "Lusaka, Zambia",
      description: [
        "Tutored aspiring scholars in SAT Mathematics and English, focusing on rigorous critical thinking and quantitative problem-solving strategies.",
        "Prepared tailored pedagogical learning materials, evaluated student progress diagnostic tests, and measurably improved student scores for international college admissions.",
        "Mentored students on STEM career trajectories and scholarship applications."
      ],
      skillsUsed: ["Advanced Calculus", "Pedagogy", "Critical Analysis", "Public Speaking", "Mentorship"]
    }
  ],
  extracurriculars: [
    {
      id: "extra-hackathon",
      title: "Winning Team - 2025 ZRA Hackathon",
      organization: "Texila ZRA Hackathon Team",
      description: "Participated and team won 1st place in the prestigious 2025 Zambia Revenue Authority (ZRA) national Hackathon competition, building an innovative digital tax automation and verification prototype.",
      year: "2025"
    },
    {
      id: "extra-robotics",
      title: "National Representative & Team Member",
      organization: "Zambia Robotics Team (FIRST Global Challenge)",
      description: "Represented Zambia at the international FIRST Global Robotics Challenge, designing, programming, and operating competition robots tackling international environmental engineering challenges.",
      year: "2023"
    },
    {
      id: "extra-jets",
      title: "Junior Secondary Vice President",
      organization: "JETS Club (Junior Engineers, Technicians and Scientists)",
      description: "Led school-wide science-related innovation projects, organized STEM fairs, and mentored junior members in mathematics and computing.",
      year: "2021 – 2022"
    },
    {
      id: "extra-olympiads",
      title: "National Mathematics Olympiads Finalist",
      organization: "Inter-School Olympiads & National JETS Fair",
      description: "Represented school in inter-provincial and national mathematics competitions, gaining deep problem-solving insights.",
      year: "2021 – 2022"
    },
    {
      id: "extra-debate",
      title: "Member & Speaker",
      organization: "School Debate Team",
      description: "Developed advanced public speaking, impromptu argumentation, and analytical critical thinking skills.",
      year: "2020 – 2022"
    }
  ],
  awards: [
    {
      id: "aw-zra",
      title: "1st Place Winner - 2025 ZRA Hackathon Competition",
      issuer: "Zambia Revenue Authority & Texila American University",
      year: "2025",
      description: "Won first prize for designing high-performance tax automation and fraud prevention system."
    },
    {
      id: "aw-kcm",
      title: "KCM Mining Full Secondary Education Scholarship",
      issuer: "Konkola Copper Mines (KCM) Mining Company",
      year: "2020",
      description: "Prestigious full scholarship granted for admission to Chiwala Provincial STEM Secondary School based on stellar academic merit."
    },
    {
      id: "aw-best-student",
      title: "Best Overall Student Certificate (Grade 8)",
      issuer: "Don Bosco Technical Secondary School",
      year: "2019",
      description: "Awarded top overall academic performance across all academic and technical subjects."
    },
    {
      id: "aw-first-global",
      title: "FIRST Global Robotics Certificate of International Participation",
      issuer: "FIRST Global Robotics International",
      year: "2023",
      description: "Recognized for representing the Republic of Zambia on the global robotics stage."
    }
  ],
  skills: [
    {
      category: "Programming Languages",
      icon: "Code",
      skills: [
        { name: "Python", level: 95, experience: "3+ years", highlight: true },
        { name: "Java", level: 85, experience: "2+ years", highlight: true },
        { name: "C / C++", level: 80, experience: "2 years" },
        { name: "HTML5 & Modern CSS3", level: 95, experience: "3+ years" },
        { name: "JavaScript / TypeScript", level: 90, experience: "2+ years", highlight: true },
        { name: "Blockly / Visual Scripting", level: 90, experience: "3 years" }
      ]
    },
    {
      category: "AI & Intelligent Automation",
      icon: "Cpu",
      skills: [
        { name: "OpenAI API & GPT Integrations", level: 92, experience: "2 years", highlight: true },
        { name: "Google AI Studio & Gemini SDK", level: 95, experience: "2 years", highlight: true },
        { name: "Make.com (Integromat) Workflows", level: 94, experience: "2 years", highlight: true },
        { name: "n8n Self-Hosted Automation", level: 88, experience: "2 years" },
        { name: "VAPI (Voice AI Agents)", level: 85, experience: "1+ year", highlight: true },
        { name: "Google Apps Script Automation", level: 90, experience: "2+ years" }
      ]
    },
    {
      category: "Databases & Cloud Backends",
      icon: "Database",
      skills: [
        { name: "Supabase (PostgreSQL & Auth)", level: 90, experience: "2 years", highlight: true },
        { name: "Firebase (Firestore & Auth)", level: 88, experience: "2 years" },
        { name: "MySQL Relational Databases", level: 85, experience: "2 years" },
        { name: "Git & Version Control Systems", level: 92, experience: "3 years", highlight: true },
        { name: "System Deployment & Docker", level: 80, experience: "1+ year" }
      ]
    },
    {
      category: "No-Code / Low-Code & CAD",
      icon: "Layers",
      skills: [
        { name: "FlutterFlow (Cross-Platform Mobile)", level: 88, experience: "2 years", highlight: true },
        { name: "Adalo Mobile Framework", level: 84, experience: "2 years" },
        { name: "AutoCAD & Fusion 360 (CAD)", level: 82, experience: "2 years" },
        { name: "Autodesk Inventor", level: 80, experience: "2 years" },
        { name: "Clip Studio & Photoshop", level: 85, experience: "3 years" },
        { name: "Canva & CapCut Production", level: 92, experience: "3 years" }
      ]
    }
  ],
  cybersecuritySkills: [
    {
      domain: "Ethical Hacking & Penetration Testing",
      description: "Hands-on exposure to vulnerability scanning, reconnaissance, exploit mitigation, and attack surface assessment using Kali Linux, Nmap, and network dissection tools.",
      tools: ["Kali Linux", "Nmap", "Wireshark", "Metasploit Basics", "Vulnerability Scanning"],
      level: "Proficient"
    },
    {
      domain: "Cyber Threat Management & Incident Response",
      description: "Rapidly identifying, analyzing, containing, eradicating, and recovering from security incidents with automated alerting and forensics logging.",
      tools: ["SIEM Concepts", "Threat Feeds", "Log Analysis", "Containment Protocols"],
      level: "Certified"
    },
    {
      domain: "Security Controls & Network Defense",
      description: "Implementing and evaluating technical access controls, packet filtering, Next-Gen firewalls, segmentation, and zero-trust policies.",
      tools: ["Firewall Configuration", "Access Control (RBAC)", "Network Segmentation", "Cisco Packet Tracer"],
      level: "Certified"
    },
    {
      domain: "Governance, Risk Assessment & Disaster Recovery",
      description: "Aligning cybersecurity posture with ISO/NIST benchmarks, business continuity planning, automated backup failovers, and threat modeling.",
      tools: ["Risk Matrices", "Disaster Recovery Runbooks", "Backup Verification", "Compliance Checklists"],
      level: "Advanced"
    }
  ],
  certificates: [
    {
      id: "cert-cisco-threat-mgmt",
      title: "Cyber Threat Management",
      issuer: "Cisco Networking Academy",
      issueDate: "17 Apr 2026",
      credentialId: "7b1feef9-e7d6-4c82-8a7e-1352a7287902",
      credentialUrl: "https://www.credly.com/org/cisco",
      category: "cybersecurity",
      description: "Successfully completed Cyber Threat Management offered by Networking Academy through the Cisco Networking Academy program, signed by Lynn Bloomer, Director.",
      skillsAcquired: ["Threat Management", "Incident Response", "SIEM Monitoring", "Threat Intelligence", "Forensic Containment"],
      verified: true,
      badgeColor: "teal"
    },
    {
      id: "cert-cisco-eth-hack",
      title: "Ethical Hacker",
      issuer: "Cisco Networking Academy",
      issueDate: "06 May 2026",
      credentialId: "23dca9ab-6bc8-4596-885f-79c413cbbb96",
      credentialUrl: "https://www.credly.com/org/cisco",
      category: "cybersecurity",
      description: "Successfully completed Ethical Hacker offered by Networking Academy through the Cisco Networking Academy program, signed by Lynn Bloomer, Director.",
      skillsAcquired: ["Ethical Hacking", "Penetration Testing", "Nmap & Kali Linux", "Vulnerability Assessment", "Offensive Security"],
      verified: true,
      badgeColor: "purple"
    },
    {
      id: "cert-cisco-net-sec",
      title: "Network Support and Security",
      issuer: "Cisco Networking Academy",
      issueDate: "19 Apr 2026",
      credentialId: "92a311f7-efda-4311-9e69-ba191f7969e2",
      credentialUrl: "https://www.credly.com/org/cisco",
      category: "networking",
      description: "Successfully completed Network Support and Security offered by Networking Academy through the Cisco Networking Academy program, signed by Lynn Bloomer, Director.",
      skillsAcquired: ["Network Security", "Cisco Routing & Protocols", "Access Control Lists", "VPN & Cryptography", "Packet Analysis"],
      verified: true,
      badgeColor: "indigo"
    },
    {
      id: "cert-cisco-py1",
      title: "Python Essentials 1",
      issuer: "Cisco Networking Academy & Python Institute",
      issueDate: "04 Dec 2025",
      credentialId: "Python_Essentials_1_Cisco_OpenEDG",
      credentialUrl: "https://pythoninstitute.org/",
      category: "python",
      description: "Successfully completed Python Essentials 1 offered by Networking Academy and Python Institute (OpenEDG) through the Cisco Networking Academy program.",
      skillsAcquired: ["Python Core", "Data Structures", "Algorithmic Logic", "Control Flow", "Modular Functions"],
      verified: true,
      badgeColor: "blue"
    },
    {
      id: "cert-cisco-py2",
      title: "Python Essentials 2",
      issuer: "Cisco Networking Academy & Python Institute",
      issueDate: "05 Dec 2025",
      credentialId: "Python_Essentials_2_Cisco_OpenEDG",
      credentialUrl: "https://pythoninstitute.org/",
      category: "python",
      description: "Successfully completed Python Essentials 2 (Advanced) offered by Networking Academy and Python Institute (OpenEDG) through the Cisco Networking Academy program.",
      skillsAcquired: ["OOP in Python", "Exception Handling", "Generators & Closures", "File I/O Streams", "Python Package Management"],
      verified: true,
      badgeColor: "violet"
    },
    {
      id: "cert-codveda-intern",
      title: "Frontend Development Internship Completion Certificate",
      issuer: "Codveda Technologies (ISO 9001:2015 & MSME)",
      issueDate: "01-02-2026 (Dec 2025 – Jan 2026)",
      credentialId: "Intern ID: CV/A1/50656",
      credentialUrl: "https://www.codveda.com",
      category: "internship",
      description: "Awarded to Derrick Kondwani Mbewe for remarkable dedication, exceptional Frontend Development skills, and inspiring attention to detail during the software engineering internship.",
      skillsAcquired: ["Frontend Development", "React", "TypeScript", "UI/UX Architecture", "State Management", "Sprint Delivery"],
      verified: true,
      badgeColor: "fuchsia"
    },
    {
      id: "cert-tau-sme",
      title: "Certificate of Appreciation: Seminar for Small and Medium Enterprises (SMEs)",
      issuer: "Texila American University Zambia",
      issueDate: "31st July 2025",
      credentialId: "S.No. :TAU:0037",
      credentialUrl: "http://tau.edu.zm",
      category: "academic",
      description: "Proudly presented to DERRICK KONDWANI MBEWE for attendance and active participation in the SME Seminar held in Lusaka.",
      skillsAcquired: ["SME Business Strategy", "Financial Technology", "Enterprise Growth", "Industry Collaboration"],
      verified: true,
      badgeColor: "amber"
    },
    {
      id: "cert-tau-mental-health",
      title: "Certificate of Appreciation: Mental Health Headteacher Workshop",
      issuer: "Texila American University Zambia",
      issueDate: "6th February 2026",
      credentialId: "TAU_Headteacher_MentalHealth_Workshop",
      credentialUrl: "http://tau.edu.zm",
      category: "academic",
      description: "Proudly presented to Kondwani Mbewe for active participation in the workshop themed: 'Mental Health - critical area impacting educators wellbeing and effective school leadership'.",
      skillsAcquired: ["Educational Leadership", "Mental Health Advocacy", "Institutional Wellness", "Workshop Facilitation"],
      verified: true,
      badgeColor: "rose"
    },
    {
      id: "cert-first-global-video",
      title: "FIRST Global Video Training Course Certificate of Completion",
      issuer: "FIRST Global Robotics (Team Zambia)",
      issueDate: "07/19/2023",
      credentialId: "FIRST_Global_Video_Training_Team_Zambia",
      credentialUrl: "https://first.global",
      category: "robotics",
      description: "Awarded to Derrick Kondwani Mbewe (Team Zambia) for successfully completing the FIRST Global Video Training Course for international robotics competition.",
      skillsAcquired: ["Robotics Mechanics", "Autonomous Control", "Sensor Calibration", "Team Zambia Global Competition"],
      verified: true,
      badgeColor: "amber"
    },
    {
      id: "cert-photovoltaic",
      title: "Photo-Voltaic Solar Energy Engineering Course",
      issuer: "Renewable Energy Technology Institute",
      issueDate: "2022",
      credentialId: "Photovoltaic_Solar_Course_Completion_DKM",
      credentialUrl: "https://github.com/Kondwani-bot",
      category: "energy",
      description: "Certification covering solar PV cell physics, inverter calculations, battery storage sizing, and off-grid electrical schematics.",
      skillsAcquired: ["Solar PV Sizing", "Clean Energy", "Electrical Circuits", "Inverter Systems"],
      verified: true,
      badgeColor: "emerald"
    }
  ],
  projects: [
    {
      id: "proj-as-make",
      title: "AS-Make: Cloud AI Workflow & Task Automation Platform",
      shortDescription: "Interactive visual workflow automation suite and API orchestrator enabling multi-step event triggers, webhook integrations, and automated digital logic execution.",
      fullDescription: "Architected and deployed AS-Make, a modern cloud automation platform inspired by visual node pipelines. Built to bridge multi-service APIs, conditional routing, asynchronous execution queues, and custom webhook dispatchers to eliminate manual data processing and accelerate business workflows.",
      category: "automation",
      tags: ["React", "Automation Engine", "Webhook Orchestrator", "API Integration", "Tailwind CSS", "Netlify"],
      githubUrl: "https://github.com/Kondwani-bot",
      liveUrl: "https://as-make.netlify.app/",
      featured: true,
      metrics: "Live Automation Suite",
      role: "Lead Systems Architect",
      date: "2025 - 2026",
      stars: 48,
      interactiveDemoType: "workflow"
    },
    {
      id: "proj-luxe-estate",
      title: "Luxe Estate: High-End Architectural Real Estate Portal",
      shortDescription: "Premier luxury real estate discovery and property showcase platform featuring advanced multi-parameter filtering, interactive property blueprints, and high-fidelity media showcases.",
      fullDescription: "Engineered an ultra-modern luxury real estate ecosystem engineered for seamless discovery of premium estates and architectural listings. Features responsive multi-criteria search, virtual walkthrough integration, responsive property specification cards, and interactive inquiry flows deployed on Vercel.",
      category: "fullstack",
      tags: ["Next.js", "React", "Tailwind CSS", "Vercel", "Property Discovery", "TypeScript", "Full-Stack"],
      githubUrl: "https://github.com/Kondwani-bot",
      liveUrl: "https://luxe-estate-henna-seven.vercel.app/",
      featured: true,
      metrics: "Live Vercel Deployment",
      role: "Full-Stack Web Architect",
      date: "2025 - 2026",
      stars: 54,
      interactiveDemoType: "code"
    },
    {
      id: "proj-school-admission",
      title: "School Admission Eligibility & Qualification Verification System",
      shortDescription: "Intelligent academic qualification evaluation engine providing instant transcript assessment, subject requirement scoring, and program admission match analytics.",
      fullDescription: "Developed an automated admission screening engine that ingests student academic credentials, computes weighted score thresholds, validates subject prerequisites across diverse secondary grading curricula, and outputs instant qualification determinations with comprehensive eligibility breakdowns.",
      category: "automation",
      tags: ["React", "Qualification Engine", "Scoring Logic", "Admission Evaluation", "Netlify", "UI/UX"],
      githubUrl: "https://github.com/Kondwani-bot",
      liveUrl: "https://school-admission-eligibility-checker.netlify.app/",
      featured: true,
      metrics: "Live Screening Engine",
      role: "Lead Logic & Frontend Engineer",
      date: "2025 - 2026",
      stars: 42,
      interactiveDemoType: "workflow"
    },
    {
      id: "proj-payroll-system",
      title: "Smart Payroll & Statutory Compensation Management System",
      shortDescription: "Comprehensive enterprise payroll processing application featuring automated gross-to-net salary engines, statutory tax/deduction calculations, and employee ledger logs.",
      fullDescription: "Architected a reliable corporate payroll and compensation application designed to streamline multi-tier salary calculations, PAYE tax brackets, social security deductions, overtime multipliers, and automated financial payslip ledger exports for enterprise organizations.",
      category: "fullstack",
      tags: ["React", "Financial Algorithms", "Payroll Accounting", "Statutory Tax Engine", "TypeScript", "Netlify"],
      githubUrl: "https://github.com/Kondwani-bot",
      liveUrl: "https://payroll-syste.netlify.app/",
      featured: true,
      metrics: "Financial Operations Platform",
      role: "Full-Stack Systems Engineer",
      date: "2025 - 2026",
      stars: 46,
      interactiveDemoType: "code"
    }
  ],
  references: [
    {
      id: "ref-peter",
      name: "Mr Peter Lungu",
      role: "Robotics Mentor & Technical Director",
      phone: "+260970169123",
      email: "peterthepundit@gmail.com"
    },
    {
      id: "ref-joseph",
      name: "Mr Joseph Iliamupu",
      role: "High School Counselor & Academic Advisor",
      phone: "+260966311217",
      email: "iliamupujoseph@yahoo.com"
    },
    {
      id: "ref-towani",
      name: "Mr Towani Kawonga",
      role: "Texila American University Lecturer & Academic Mentor",
      phone: "+260979177208",
      email: "towani.kawonga@tau.edu.zm"
    }
  ]
};

export const INITIAL_MESSAGES: ContactMessage[] = [
  {
    id: "msg-sample-1",
    name: "Alex Vance",
    email: "a.vance@techfrontier.org",
    company: "TechFrontier Global",
    role: "Recruiter",
    subject: "Full-Stack AI Engineering Opportunity",
    message: "Hi Derrick, I saw your 2025 ZRA Hackathon award and your Cisco Cyber certifications. We have an exciting remote AI & Automation role that matches your profile perfectly!",
    timestamp: "2026-08-28T14:20:00.000Z",
    read: false,
    status: "new"
  }
];
