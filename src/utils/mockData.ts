export const mockAnalysisData = {
  overallScore: 72,
  scores: {
    content: 75,
    ats: 68,
    formatting: 74
  },
  strengths: [
    'Good use of action verbs in experience section',
    'Contact information is complete and professional',
    'Skills section includes relevant technical skills',
    'Education section is properly formatted',
    'Resume length is appropriate (1-2 pages)'
  ],
  improvements: [
    'Add more specific achievements with numbers',
    'Include keywords from job descriptions you\'re targeting',
    'Consider adding a brief professional summary',
    'Some bullet points could be more impactful',
    'Format could be more ATS-friendly'
  ],
  atsStatus: 'Your resume has decent ATS compatibility but could be improved. The main issues are related to keyword optimization and some formatting elements that might not parse well in applicant tracking systems.',
  extractedData: {
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '(555) 123-4567',
    location: 'Boston, MA',
    skills: [
      'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git', 'HTML/CSS', 
      'MongoDB', 'Express.js', 'Problem Solving', 'Team Collaboration', 'Communication'
    ],
    experience: [
      {
        title: 'Software Development Intern',
        company: 'TechStart Inc.',
        duration: 'Jun 2023 - Aug 2023',
        description: 'Developed web applications using React and Node.js, collaborated with team on various projects, and learned agile development practices.'
      },
      {
        title: 'Web Development Freelancer',
        company: 'Self-Employed',
        duration: 'Jan 2023 - Present',
        description: 'Built websites for local businesses, managed client relationships, and delivered projects on time and within budget.'
      },
      {
        title: 'Teaching Assistant',
        company: 'University Computer Science Dept.',
        duration: 'Sep 2022 - May 2023',
        description: 'Helped students with programming assignments, conducted lab sessions, and graded assignments for Introduction to Programming course.'
      }
    ]
  },
  aiSummary: 'This resume shows good potential for a student or recent graduate. The candidate demonstrates practical experience through internships and freelance work, which is excellent. However, there are opportunities to make the resume more impactful by quantifying achievements and optimizing for applicant tracking systems. The technical skills are relevant, but the resume could benefit from more specific examples of accomplishments and results.',
  detailedFeedback: {
    content: [
      'Good variety of experience including internship, freelance, and academic work',
      'Technical skills section shows relevant programming languages and tools',
      'Experience descriptions could be more specific about accomplishments',
      'Consider adding metrics like "improved website performance by X%" or "managed X projects"',
      'Professional summary section would help highlight key qualifications',
      'Action verbs are used well but could be more varied'
    ],
    formatting: [
      'Clean, readable layout with consistent formatting',
      'Contact information is clearly visible at the top',
      'Good use of bullet points for easy scanning',
      'Date formatting is consistent throughout',
      'Consider using a more ATS-friendly format with clear section headers',
      'Font choice and sizing are professional and appropriate'
    ]
  },
  recommendations: [
    {
      title: 'Add Quantified Achievements',
      description: 'Include specific numbers, percentages, or results in your experience descriptions. For example, "Built 5 websites for local businesses" or "Helped 50+ students improve their programming skills."',
      impact: 'Shows concrete value and makes your accomplishments more impressive',
      priority: 'High'
    },
    {
      title: 'Include a Professional Summary',
      description: 'Add a 2-3 line summary at the top highlighting your key skills, experience, and what you\'re looking for. This helps recruiters quickly understand your background.',
      impact: 'Makes a strong first impression and helps your resume get noticed',
      priority: 'High'
    },
    {
      title: 'Optimize for Keywords',
      description: 'Review job descriptions for positions you want and include relevant keywords in your skills and experience sections. Focus on technical skills and industry terms.',
      impact: 'Helps your resume pass through applicant tracking systems',
      priority: 'Medium'
    },
    {
      title: 'Improve Experience Descriptions',
      description: 'Make your bullet points more impactful by focusing on what you accomplished, not just what you did. Use the format: "Action verb + what you did + result/impact."',
      impact: 'Makes your experience more compelling to employers',
      priority: 'Medium'
    },
    {
      title: 'Consider Adding Projects Section',
      description: 'If you have personal projects, coursework, or portfolio pieces, consider adding a projects section to showcase your skills and initiative.',
      impact: 'Demonstrates practical application of your skills',
      priority: 'Low'
    }
  ]
};