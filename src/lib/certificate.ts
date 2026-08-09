import { Certificate } from '@/types/certificate';

export const certificates: Certificate[] = [
  {
    id: '1',
    title: 'Full Stack Web Development Cohort 2026',
    issuer: 'ChaiCode',
    issuerLogo: '/certificates/chaicode.png',
    issueDate: 'Sep 2025',
    credentialId: '1323851225092717102416272',
    skills: [
      'HTML',
      'CSS',
      'JavaScript',
      'React',
      'Next.js',
      'Node.js',
      'Express',
      'MongoDB',
      'Full Stack Development',
    ],
    verifyUrl: 'https://courses.chaicode.com/learn/certificate/13238512-250927',
    certificateUrl: 'https://drive.google.com/file/d/135RuIMnxW8X5R8BXkR5iMmkI56-5ogae/view',
  },
  {
    id: '2',
    title: 'Introduction to Large Language Models',
    issuer: 'IBM SkillsBuild',
    issuerLogo: '/certificates/ibm.png',
    issueDate: 'Jan 2026',
    credentialId: 'ALM-COURSE_4058915',
    skills: [
      'Large Language Models',
      'Generative AI',
      'Prompt Engineering',
      'Natural Language Processing',
      'AI Fundamentals',
    ],
    verifyUrl:
      'https://skills.yourlearning.ibm.com/certificate/share/172107953cewogICJvYmplY3RJZCIgOiAiQUxNLUNPVVJTRV80MDU4OTE1IiwKICAibGVhcm5lckNOVU0iIDogIjY1MzQyNDBSRUciLAogICJvYmplY3RUeXBlIiA6ICJBQ1RJVklUWSIKfQ2a83e7f5c0-10',
    certificateUrl: 'https://drive.google.com/file/d/13G34-wbXDQ0FH2yJ12Ptpu7AwkSRyiVf/view',
  },
];
