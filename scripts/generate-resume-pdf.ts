import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generateResumePdf() {
  const pdfDoc = await PDFDocument.create();
  
  pdfDoc.setTitle('Derrick K. Mbewe - Official Resume');
  pdfDoc.setAuthor('Derrick Kondwani Mbewe');
  pdfDoc.setSubject('Official Professional Resume & Credentials');
  pdfDoc.setKeywords(['AI Engineer', 'Cybersecurity Specialist', 'Full-Stack Developer', 'Robotics']);

  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const helveticaOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // A4 size: 595.28 x 841.89 points
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const marginX = 64;
  const contentWidth = pageWidth - marginX * 2; // 467.28

  const textColor = rgb(0.1, 0.12, 0.15); // near-black #1a1f26
  const mutedColor = rgb(0.3, 0.35, 0.4);
  const lineColor = rgb(0.65, 0.68, 0.72);
  const linkColor = rgb(0.12, 0.38, 0.72);

  function wrapText(text: string, font: any, size: number, maxWidth: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const testWidth = font.widthOfTextAtSize(testLine, size);
      if (testWidth <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  }

  // ==========================================
  // PAGE 1
  // ==========================================
  {
    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    let y = pageHeight - 70;

    // Header Title
    const title = 'Derrick K. Mbewe';
    const titleWidth = helveticaBold.widthOfTextAtSize(title, 18);
    page.drawText(title, {
      x: (pageWidth - titleWidth) / 2,
      y,
      size: 18,
      font: helveticaBold,
      color: textColor,
    });
    y -= 22;

    // Contact subtitle
    const subtitle = '+260772262028| kondwanimbewe111@gmail.com';
    const subWidth = helvetica.widthOfTextAtSize(subtitle, 10.5);
    page.drawText(subtitle, {
      x: (pageWidth - subWidth) / 2,
      y,
      size: 10.5,
      font: helvetica,
      color: textColor,
    });
    y -= 28;

    // Section 1: Personal Information
    page.drawLine({
      start: { x: marginX, y },
      end: { x: pageWidth - marginX, y },
      thickness: 0.8,
      color: lineColor,
    });
    y -= 18;

    page.drawText('Personal Information:', {
      x: marginX,
      y,
      size: 11,
      font: helveticaBold,
      color: textColor,
    });
    y -= 18;

    const personalItems = [
      { bullet: '•', label: 'Name: ', value: 'Derrick Kondwani Mbewe' },
      { bullet: '•', label: 'Contact number: ', value: '+260772262028.' },
      { bullet: '•', label: 'Email address: ', value: 'kondwanimbewe111@gmail.com', isLink: true },
      { bullet: '•', label: 'Portfolio: ', value: 'digital-profile-delta.vercel.app', isLink: true },
      { bullet: '•', label: '', value: 'Second Year Student at Texila American University Zambia' },
    ];

    for (const item of personalItems) {
      page.drawText(item.bullet, { x: marginX + 4, y, size: 10, font: helveticaBold, color: textColor });
      let curX = marginX + 18;
      if (item.label) {
        page.drawText(item.label, { x: curX, y, size: 10, font: helveticaBold, color: textColor });
        curX += helveticaBold.widthOfTextAtSize(item.label, 10);
      }
      page.drawText(item.value, {
        x: curX,
        y,
        size: 10,
        font: helvetica,
        color: item.isLink ? linkColor : textColor,
      });
      y -= 16;
    }
    y -= 12;

    // Section 2: Objective
    page.drawLine({
      start: { x: marginX, y },
      end: { x: pageWidth - marginX, y },
      thickness: 0.8,
      color: lineColor,
    });
    y -= 18;

    page.drawText('Objective-', {
      x: marginX,
      y,
      size: 11,
      font: helveticaBold,
      color: textColor,
    });
    y -= 18;

    page.drawText('I classify myself to be a driven and passionate person.', {
      x: marginX,
      y,
      size: 10,
      font: helvetica,
      color: textColor,
    });
    y -= 16;

    const objectiveBullets = [
      '- I am eager to immerse myself in cutting-edge technologies and innovative problem-solving within the fields of computer science, Cyber Security, AI and engineering.',
      '- I aspire to contribute to the future of technology, fostering creativity, expanding my knowledge and gaining invaluable skills.',
      '- Am committed to utilizing the experience and knowledge gained to empower and build a tech company in my home country.',
    ];

    for (const bullet of objectiveBullets) {
      const wrapped = wrapText(bullet, helvetica, 9.5, contentWidth - 4);
      for (const line of wrapped) {
        page.drawText(line, { x: marginX, y, size: 9.5, font: helvetica, color: textColor });
        y -= 13.5;
      }
      y -= 4;
    }
    y -= 12;

    // Section 3: Education
    page.drawLine({
      start: { x: marginX, y },
      end: { x: pageWidth - marginX, y },
      thickness: 0.8,
      color: lineColor,
    });
    y -= 18;

    page.drawText('Education:', {
      x: marginX,
      y,
      size: 11,
      font: helveticaBold,
      color: textColor,
    });
    y -= 18;

    const eduSchools = [
      '• Sentinal Kabitaka School(K-4)',
      '• Faith Christian Trust Academy (5-7)',
      '• Don Bosco Technical Secondary School (Grade 8-9)',
      '• Kanini Secondary School, Ndola, Zambia (Grade 10-12)',
    ];

    for (const s of eduSchools) {
      page.drawText(s, { x: marginX, y, size: 9.5, font: helvetica, color: textColor });
      y -= 15;
    }

    const kaniniBullets = [
      'o Graduated: 28th October 2022',
      'o Relevant Coursework: Advanced Mathematics (Additional Mathematics), Physics, Chemistry,',
      'o GPA: 4.0',
    ];

    for (const kb of kaniniBullets) {
      page.drawText(kb, { x: marginX + 16, y, size: 9.5, font: helvetica, color: textColor });
      y -= 14.5;
    }
    y -= 6;

    page.drawText('o Currently at Texila American University Zambia Studying BS.c in Artificial Intelligence.', {
      x: marginX + 16,
      y,
      size: 9.5,
      font: helvetica,
      color: textColor,
    });
  }

  // ==========================================
  // PAGE 2
  // ==========================================
  {
    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    let y = pageHeight - 65;

    // Section 1: Professional Experience
    page.drawText('Professional Experience:', {
      x: marginX,
      y,
      size: 11,
      font: helveticaBold,
      color: textColor,
    });
    y -= 18;

    // Role 1
    page.drawText('•', { x: marginX + 6, y, size: 10, font: helveticaBold, color: textColor });
    page.drawText('Full Stack Developer Intern', { x: marginX + 18, y, size: 10, font: helveticaBold, color: textColor });
    const r1w = helveticaBold.widthOfTextAtSize('Full Stack Developer Intern ', 10);
    page.drawText('| Codveda Technologies (December 2025)', {
      x: marginX + 18 + r1w,
      y,
      size: 10,
      font: helvetica,
      color: textColor,
    });
    y -= 15;

    const r1bullets = [
      'o Developed and optimized web applications using modern full-stack development tools and best practices.',
      'o Collaborated on software development tasks, enhancing application functionality and performance.',
    ];
    for (const b of r1bullets) {
      const wrapped = wrapText(b, helvetica, 9, contentWidth - 36);
      for (const line of wrapped) {
        page.drawText(line, { x: marginX + 32, y, size: 9, font: helvetica, color: textColor });
        y -= 13;
      }
    }
    y -= 5;

    // Role 2
    page.drawText('•', { x: marginX + 6, y, size: 10, font: helveticaBold, color: textColor });
    page.drawText('Data Analyst', { x: marginX + 18, y, size: 10, font: helveticaBold, color: textColor });
    const r2w = helveticaBold.widthOfTextAtSize('Data Analyst ', 10);
    page.drawText('| God First Bakery (February 2024 – October 2024)', {
      x: marginX + 18 + r2w,
      y,
      size: 10,
      font: helvetica,
      color: textColor,
    });
    y -= 15;

    const r2bullets = [
      'o Analyzed operational and sales data to help optimize business performance and inventory tracking.',
      'o Compiled and interpreted data reports to support decision-making processes.',
    ];
    for (const b of r2bullets) {
      const wrapped = wrapText(b, helvetica, 9, contentWidth - 36);
      for (const line of wrapped) {
        page.drawText(line, { x: marginX + 32, y, size: 9, font: helvetica, color: textColor });
        y -= 13;
      }
    }
    y -= 5;

    // Role 3
    page.drawText('•', { x: marginX + 6, y, size: 10, font: helveticaBold, color: textColor });
    page.drawText('SAT Math & English Tutor', { x: marginX + 18, y, size: 10, font: helveticaBold, color: textColor });
    const r3w = helveticaBold.widthOfTextAtSize('SAT Math & English Tutor ', 10);
    page.drawText('| Zambia Institute for Sustainable Development (ZISD)', {
      x: marginX + 18 + r3w,
      y,
      size: 10,
      font: helvetica,
      color: textColor,
    });
    y -= 14;
    page.drawText('(November 2023 – September 2024)', {
      x: marginX + 18,
      y,
      size: 9.5,
      font: helvetica,
      color: textColor,
    });
    y -= 15;

    const r3bullets = [
      'o Tutored students in SAT Mathematics and English, focusing on critical thinking and problem-solving strategies.',
      'o Prepared learning materials, evaluated student progress, and helped improve test scores.',
    ];
    for (const b of r3bullets) {
      const wrapped = wrapText(b, helvetica, 9, contentWidth - 36);
      for (const line of wrapped) {
        page.drawText(line, { x: marginX + 32, y, size: 9, font: helvetica, color: textColor });
        y -= 13;
      }
    }
    y -= 14;

    // Section 2: Extracurricular Activities
    page.drawLine({
      start: { x: marginX, y },
      end: { x: pageWidth - marginX, y },
      thickness: 0.8,
      color: lineColor,
    });
    y -= 18;

    page.drawText('Extracurricular Activities:', {
      x: marginX,
      y,
      size: 11,
      font: helveticaBold,
      color: textColor,
    });
    y -= 16;

    const extras = [
      {
        num: '1. Junior Secondary Vice President, JETS Club',
        sub: ['o Led science-related projects, organized STEM events, and mentored junior members.'],
      },
      {
        num: '2. Participant, Inter-School Olympiads (Mathematics)',
        sub: ['o Represented the school in mathematics competitions.'],
      },
      {
        num: '3. Participant, National Jets Fair',
        sub: ['Gained knowledge and experience.'],
      },
      {
        num: '4. Participant, School Debate Team',
        sub: ['Developed public speaking and critical thinking skills.'],
      },
      {
        num: '5. Member, Zambia Robotics',
        sub: ['Represented the country at the international First Global Robotics Challenge (Singapore 2023).'],
      },
      {
        num: '6. Member of the Texila ZRA hackathon Team. Participated and won the 2025 ZRA hackathon',
        sub: ['Competition.'],
      },
    ];

    for (const ex of extras) {
      page.drawText(ex.num, { x: marginX, y, size: 9.5, font: helvetica, color: textColor });
      y -= 13.5;
      for (const s of ex.sub) {
        page.drawText(s, { x: marginX + 16, y, size: 9, font: helvetica, color: textColor });
        y -= 13;
      }
      y -= 2;
    }
    y -= 12;

    // Section 3: Skills
    page.drawLine({
      start: { x: marginX, y },
      end: { x: pageWidth - marginX, y },
      thickness: 0.8,
      color: lineColor,
    });
    y -= 18;

    page.drawText('Skills:', {
      x: marginX,
      y,
      size: 11,
      font: helveticaBold,
      color: textColor,
    });
    y -= 16;

    page.drawText('•', { x: marginX + 4, y, size: 10, font: helveticaBold, color: textColor });
    page.drawText('Programming Skills:', { x: marginX + 16, y, size: 10, font: helveticaBold, color: textColor });
    y -= 15;

    const progSkills = [
      'o Proficient in blocky, python, java, C, HTML, and CSS.',
      'o Database knowledge (MySQL, Superbase and Firebase integration)',
      'o Version control (Git)',
      'o System deployment knowledge',
      'o Proficient in AI workflow automation using Make.com and n8n.',
      'o Experience integrating AI models and developing AI-powered automation solutions using OpenAI API, Google AI Studio, VAPI, and Google Apps Script.',
    ];

    for (const ps of progSkills) {
      const wrapped = wrapText(ps, helvetica, 9, contentWidth - 20);
      for (const line of wrapped) {
        page.drawText(line, { x: marginX + 16, y, size: 9, font: helvetica, color: textColor });
        y -= 13;
      }
    }
  }

  // ==========================================
  // PAGE 3
  // ==========================================
  {
    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    let y = pageHeight - 65;

    // Non-Programming Skills
    page.drawText('•', { x: marginX + 4, y, size: 10, font: helveticaBold, color: textColor });
    page.drawText('Non-Programming Skills:', { x: marginX + 16, y, size: 10, font: helveticaBold, color: textColor });
    y -= 14;

    const nonProg = 'o Competent in Adalo and Flutterflow for app development. Familiar with typeflow and flodest for email marketing and bolt, strikingly for no code web development.';
    for (const line of wrapText(nonProg, helvetica, 9, contentWidth - 20)) {
      page.drawText(line, { x: marginX + 16, y, size: 9, font: helvetica, color: textColor });
      y -= 13;
    }
    y -= 3;

    // CAD
    page.drawText('•', { x: marginX + 4, y, size: 10, font: helveticaBold, color: textColor });
    page.drawText('CAD (Computer-Aided Design):', { x: marginX + 16, y, size: 10, font: helveticaBold, color: textColor });
    y -= 14;
    page.drawText('o Knowledge and experience in AutoCAD, Inventor, and Fusion 360.', {
      x: marginX + 16,
      y,
      size: 9,
      font: helvetica,
      color: textColor,
    });
    y -= 16;

    // Digital Art
    page.drawText('•', { x: marginX + 4, y, size: 10, font: helveticaBold, color: textColor });
    page.drawText('Digital Art and Animation:', { x: marginX + 16, y, size: 10, font: helveticaBold, color: textColor });
    y -= 14;
    page.drawText('o Proficient in Clip Studio and Photoshop as well as Canva and Capcut .', {
      x: marginX + 16,
      y,
      size: 9,
      font: helvetica,
      color: textColor,
    });
    y -= 16;

    // Video & Photography
    page.drawText('•', { x: marginX + 4, y, size: 10, font: helveticaBold, color: textColor });
    page.drawText('Video and Photography', { x: marginX + 16, y, size: 10, font: helveticaBold, color: textColor });
    y -= 16;

    // SAT tutor
    page.drawText('•', { x: marginX + 4, y, size: 10, font: helveticaBold, color: textColor });
    page.drawText('SAT math and English tutor with 2 years of experience.', { x: marginX + 16, y, size: 10, font: helveticaBold, color: textColor });
    y -= 18;

    // Cyber Security Skills
    page.drawText('•', { x: marginX + 4, y, size: 10, font: helveticaBold, color: textColor });
    page.drawText('Cyber Security Skills:', { x: marginX + 16, y, size: 10, font: helveticaBold, color: textColor });
    y -= 18;

    const cyberTopics = [
      {
        title: 'Disaster Recovery',
        desc: 'Understanding of backup strategies, system restoration processes, and business continuity planning to ensure minimal downtime after security incidents or system failures.',
      },
      {
        title: 'Governance',
        desc: 'Knowledge of cybersecurity policies, standards, and best practices, including how organizations align security with business objectives and regulatory requirements.',
      },
      {
        title: 'Incident Response',
        desc: 'Familiarity with identifying, analyzing, and responding to security incidents, including basic steps such as detection, containment, eradication, and recovery.',
      },
      {
        title: 'Penetration Testing',
        desc: 'Basic exposure to ethical hacking techniques, including reconnaissance, vulnerability scanning, and identifying security weaknesses using tools like Nmap and Kali Linux.',
      },
      {
        title: 'Risk Assessment',
        desc: 'Ability to identify potential security threats, evaluate vulnerabilities, and assess their impact and likelihood within a system or network.',
      },
      {
        title: 'Risk Management',
        desc: 'Understanding of how to prioritize, mitigate, and manage cybersecurity risks through appropriate controls and strategies.',
      },
      {
        title: 'Security Controls',
        desc: 'Knowledge of implementing and evaluating technical and administrative controls such as firewalls, access control mechanisms, and security policies to protect systems and data.',
      },
    ];

    for (const ct of cyberTopics) {
      page.drawText(ct.title, { x: marginX + 16, y, size: 9.5, font: helveticaBold, color: textColor });
      y -= 12;
      for (const line of wrapText(ct.desc, helvetica, 8.5, contentWidth - 24)) {
        page.drawText(line, { x: marginX + 16, y, size: 8.5, font: helvetica, color: textColor });
        y -= 11.5;
      }
      y -= 4;
    }
    y -= 8;

    // Awards and Honors
    page.drawLine({
      start: { x: marginX, y },
      end: { x: pageWidth - marginX, y },
      thickness: 0.8,
      color: lineColor,
    });
    y -= 18;

    page.drawText('Awards and Honors:', {
      x: marginX,
      y,
      size: 11,
      font: helveticaBold,
      color: textColor,
    });
    y -= 16;

    const awards = [
      '• Best Overall Student Certificate (Grade 8)',
      '• Certificate for Completing a Photo-voltaic Course',
      '• Scholarship from KCM Mining Company',
      'o Opportunity to study at Chiwala Provincial STEM Secondary School On full Scholarship by KCM.',
      '• Certificate of Secondary School Completion',
      '• Certificate for Completing the First Global Video Training Course',
    ];

    for (const a of awards) {
      const isSub = a.startsWith('o');
      page.drawText(a, { x: isSub ? marginX + 18 : marginX, y, size: 9, font: helvetica, color: textColor });
      y -= 13.5;
    }
  }

  // ==========================================
  // PAGE 4
  // ==========================================
  {
    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    let y = pageHeight - 65;

    const certEntries = [
      {
        header: '• Certificate for Competing in the First Global Robotics Challenge',
        files: ['FIRST Global Team Zambia International Participation Certificate - Singapore 2023'],
      },
      {
        header: '• Certificate for completing the Cisco Networking Academy’s Python 1 and 2 essentials courses:',
        files: [
          'Python_Essentials_1_certificate_kondwanimbewe111-gmail-com_165c1a38-1deb-4a30-a8cc-…',
          'Python_Essentials_2_certificate_kondwanimbewe111-gmail-com_2b51a5d9-ddff-404c-bde1-…',
        ],
      },
      {
        header: '• Certificate for completing the Cisco Networking Academy’s Cyber Threat Management course:',
        files: [
          'Cyber_Threat_Management_certificate_kondwanimbewe111-gmail-com_7b1feef9-e7d6-4c82…',
        ],
      },
      {
        header: '• Certificate for completing the Cisco Networking Academy’s Network Support and Security course:',
        files: [
          'Network_Support_and_Security_certificate_kondwanimbewe111-gmail-com_92a311f7-efda-4…',
        ],
      },
      {
        header: '• Certificate for completing the Cisco Networking Academy’s Ethical Hacking course:',
        files: [
          'Ethical_Hacker_certificate_kondwanimbewe111-gmail-com_23dca9ab-6bc8-4596-885f-79c4…',
        ],
      },
      {
        header: '• Certificate Of Completion for an Internship at Codveda Technologies -',
        files: [
          'Derrick Kondwani Mbewe.pdf',
        ],
      },
    ];

    for (const ce of certEntries) {
      page.drawText(ce.header, { x: marginX, y, size: 9.5, font: helvetica, color: textColor });
      y -= 14;

      for (const f of ce.files) {
        // Draw miniature PDF icon badge
        page.drawRectangle({
          x: marginX + 16,
          y: y - 1,
          width: 14,
          height: 11,
          color: rgb(0.85, 0.2, 0.2),
          borderColor: rgb(0.7, 0.15, 0.15),
          borderWidth: 0.5,
        });
        page.drawText('PDF', {
          x: marginX + 17.5,
          y: y + 1.5,
          size: 6,
          font: helveticaBold,
          color: rgb(1, 1, 1),
        });

        page.drawText(f, {
          x: marginX + 34,
          y,
          size: 8.5,
          font: helvetica,
          color: linkColor,
        });
        y -= 15;
      }
      y -= 10;
    }

    y -= 140; // Spacing down to References section as in original

    // References section
    page.drawText('References:', {
      x: marginX,
      y,
      size: 11,
      font: helveticaBold,
      color: textColor,
    });
    y -= 18;

    const refs = [
      'Mr Peter Lungu (Robotics Mentor), +260970169123, peterthepundit@gmail.com',
      'Mr Joseph Iliamupu (High school counselor), +260966311217, iliamupujoseph@yahoo.com',
      'Mr Towani Kawonga(Texila American University Lecturer and Mentor), +260979177208,',
      'towani.kawonga@tau.edu.zm',
    ];

    for (const r of refs) {
      page.drawText(r, {
        x: marginX,
        y,
        size: 9.5,
        font: helvetica,
        color: textColor,
      });
      y -= 14.5;
    }
  }

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(process.cwd(), 'public', 'Derrick_K_Mbewe_Resume.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`Successfully generated PDF resume at: ${outputPath} (${pdfBytes.length} bytes)`);
}

generateResumePdf().catch(console.error);
