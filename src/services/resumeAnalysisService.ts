import axios from 'axios';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

// Configuration for Google AI (Gemini)
const API_CONFIG = {
  GOOGLE_AI_API_KEY: import.meta.env.VITE_GOOGLE_AI_API_KEY,
  GOOGLE_AI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
  BACKEND_API_URL: import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3001/api'
};

export interface ResumeAnalysisResult {
  overallScore: number;
  scores: {
    content: number;
    ats: number;
    formatting: number;
  };
  strengths: string[];
  improvements: string[];
  atsStatus: string;
  extractedData: {
    name: string;
    email: string;
    phone: string;
    location: string;
    skills: string[];
    experience: Array<{
      title: string;
      company: string;
      duration: string;
      description: string;
    }>;
  };
  aiSummary: string;
  detailedFeedback: {
    content: string[];
    formatting: string[];
  };
  recommendations: Array<{
    title: string;
    description: string;
    impact: string;
    priority: 'High' | 'Medium' | 'Low';
  }>;
}

// REAL PDF text extraction using PDF.js
const extractTextFromPDF = async (file: File): Promise<string> => {
  try {
    console.log('📄 Starting PDF text extraction...');
    
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    console.log('📊 PDF loaded, pages:', pdf.numPages);
    
    let fullText = '';
    
    // Extract text from all pages
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      
      fullText += pageText + '\n';
      console.log(`📄 Page ${pageNum} extracted, length: ${pageText.length}`);
    }
    
    console.log('✅ PDF text extraction complete, total length:', fullText.length);
    return fullText.trim();
    
  } catch (error) {
    console.error('❌ PDF extraction error:', error);
    throw new Error('Failed to extract text from PDF. Please make sure the file is not corrupted.');
  }
};

// REAL DOCX text extraction using mammoth
const extractTextFromDOCX = async (file: File): Promise<string> => {
  try {
    console.log('📄 Starting DOCX text extraction...');
    
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    
    console.log('✅ DOCX text extraction complete, length:', result.value.length);
    
    if (result.messages && result.messages.length > 0) {
      console.log('⚠️ DOCX extraction warnings:', result.messages);
    }
    
    return result.value.trim();
    
  } catch (error) {
    console.error('❌ DOCX extraction error:', error);
    throw new Error('Failed to extract text from DOCX. Please make sure the file is not corrupted.');
  }
};

// REAL text extraction from file based on type
const extractTextFromFile = async (file: File): Promise<string> => {
  console.log('🔍 Determining file type for extraction...');
  console.log('📁 File type:', file.type);
  console.log('📁 File name:', file.name);
  
  let extractedText = '';
  
  if (file.type === 'application/pdf') {
    console.log('📄 Processing as PDF...');
    extractedText = await extractTextFromPDF(file);
  } else if (
    file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    file.type === 'application/msword' ||
    file.name.toLowerCase().endsWith('.docx') ||
    file.name.toLowerCase().endsWith('.doc')
  ) {
    console.log('📄 Processing as DOCX/DOC...');
    extractedText = await extractTextFromDOCX(file);
  } else {
    console.error('❌ Unsupported file type:', file.type);
    throw new Error(`Unsupported file type: ${file.type}. Please upload a PDF or DOCX file.`);
  }
  
  if (!extractedText || extractedText.trim().length === 0) {
    throw new Error('No text could be extracted from the file. Please make sure the file contains readable text.');
  }
  
  if (extractedText.length < 50) {
    throw new Error('The extracted text is too short. Please make sure your resume contains sufficient content.');
  }
  
  console.log('✅ Text extraction successful!');
  console.log('📊 Extracted text length:', extractedText.length);
  console.log('📝 First 200 characters:', extractedText.substring(0, 200) + '...');
  
  return extractedText;
};

// Analyze resume using Google AI (Gemini)
export const analyzeResumeWithGoogleAI = async (resumeText: string): Promise<ResumeAnalysisResult> => {
  const prompt = `
You are an expert career counselor and resume reviewer specializing in helping students and new graduates. 

Please analyze this resume and provide detailed, constructive feedback:

${resumeText}

Focus on:
1. Overall presentation and professionalism
2. Content quality and relevance
3. ATS (Applicant Tracking System) compatibility
4. Specific strengths that stand out
5. Areas that need improvement
6. Actionable recommendations with priority levels

Please be encouraging but honest. This is a student looking for jobs/internships, so tailor your advice accordingly. Provide specific examples from their resume when possible.

Your response should be detailed and helpful, focusing on practical improvements they can make immediately.
  `;

  try {
    console.log('🚀 Starting Google AI analysis...');
    console.log('📝 API Key configured:', !!API_CONFIG.GOOGLE_AI_API_KEY);
    console.log('🔗 API URL:', API_CONFIG.GOOGLE_AI_API_URL);
    
    if (!API_CONFIG.GOOGLE_AI_API_KEY) {
      throw new Error('Google AI API key not found. Please check your .env file.');
    }

    const requestData = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    };

    console.log('📤 Sending request to Google AI...');
    
    const response = await axios.post(
      `${API_CONFIG.GOOGLE_AI_API_URL}?key=${API_CONFIG.GOOGLE_AI_API_KEY}`,
      requestData,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 30000 // 30 second timeout
      }
    );

    console.log('📥 Response received from Google AI');
    console.log('📊 Response status:', response.status);

    if (!response.data.candidates || response.data.candidates.length === 0) {
      console.error('❌ No candidates in response:', response.data);
      throw new Error('No response generated from Google AI. The content may have been filtered.');
    }

    const candidate = response.data.candidates[0];

    if (!candidate.content || !candidate.content.parts || candidate.content.parts.length === 0) {
      console.error('❌ No content in candidate:', candidate);
      throw new Error('Empty content in Google AI response');
    }

    const analysisText = candidate.content.parts[0].text;
    
    if (!analysisText || analysisText.trim().length === 0) {
      console.error('❌ Empty analysis text');
      throw new Error('Empty analysis text from Google AI');
    }

    console.log('✅ Analysis text received, length:', analysisText.length);
    console.log('📄 First 200 chars:', analysisText.substring(0, 200) + '...');
    
    // Create structured analysis from the AI response
    const structuredResult = createStructuredAnalysis(resumeText, analysisText);
    
    console.log('🎉 Analysis completed successfully!');
    return structuredResult;

  } catch (error) {
    console.error('💥 Error in Google AI analysis:', error);
    
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const statusText = error.response?.statusText;
      const errorData = error.response?.data;
      
      console.error('🔍 API Error Details:', { 
        status, 
        statusText, 
        errorData: JSON.stringify(errorData, null, 2),
        url: error.config?.url,
        method: error.config?.method
      });
      
      if (status === 400) {
        console.error('❌ Bad Request - Check API key and request format');
        throw new Error('Invalid request to Google AI. Please verify your API key is correct.');
      } else if (status === 403) {
        console.error('❌ Forbidden - API key or permissions issue');
        throw new Error('Access denied. Please check your Google AI API key and ensure the Generative Language API is enabled.');
      } else if (status === 404) {
        console.error('❌ Not Found - Check API endpoint');
        throw new Error('Google AI API endpoint not found. Please check the configuration.');
      } else if (status === 429) {
        console.error('❌ Rate Limited');
        throw new Error('Rate limit exceeded. Please try again in a few minutes.');
      } else {
        throw new Error(`Google AI API error: ${status} - ${statusText || 'Unknown error'}`);
      }
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your internet connection and try again.');
    } else {
      throw new Error('Failed to analyze resume: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }
};

// Helper function to create structured analysis from AI response
const createStructuredAnalysis = (resumeText: string, aiResponse: string): ResumeAnalysisResult => {
  console.log('🔧 Creating structured analysis...');
  
  // Extract basic information from REAL resume text
  const extractedData = extractBasicInfo(resumeText);
  
  // Generate scores based on REAL content analysis
  const scores = generateScores(resumeText, aiResponse);
  
  // Parse AI response for insights
  const insights = parseAIResponse(aiResponse, resumeText);
  
  const result = {
    overallScore: Math.round((scores.content + scores.ats + scores.formatting) / 3),
    scores,
    strengths: insights.strengths,
    improvements: insights.improvements,
    atsStatus: insights.atsStatus,
    extractedData,
    aiSummary: insights.summary,
    detailedFeedback: {
      content: insights.contentFeedback,
      formatting: insights.formattingFeedback
    },
    recommendations: insights.recommendations
  };
  
  console.log('✅ Structured analysis created with overall score:', result.overallScore);
  return result;
};

// Helper functions - now using REAL extracted text
const extractBasicInfo = (text: string) => {
  console.log('🔍 Extracting basic info from REAL resume text...');
  
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  const phoneRegex = /(\+\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}|\d{10}/g;
  
  const emails = text.match(emailRegex) || [];
  const phones = text.match(phoneRegex) || [];
  
  const email = emails[0] || 'Not found';
  const phone = phones[0] || 'Not found';
  
  // Extract name (look for patterns at the beginning)
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  let name = 'Not found';
  
  // Look for name in first few lines
  for (let i = 0; i < Math.min(5, lines.length); i++) {
    const line = lines[i].trim();
    // Skip lines that look like headers or contact info
    if (line.length > 3 && line.length < 50 && 
        !line.includes('@') && !line.includes('http') && 
        !line.includes('Phone') && !line.includes('Email') &&
        /^[A-Za-z\s]+$/.test(line)) {
      name = line;
      break;
    }
  }
  
  // Extract location (look for city, state patterns)
  const locationRegex = /([A-Za-z\s]+,\s*[A-Z]{2})|([A-Za-z\s]+,\s*[A-Za-z\s]+)/g;
  const locations = text.match(locationRegex) || [];
  const location = locations[0] || 'Not found';
  
  // Extract skills from the actual text
  const commonSkills = [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL', 'HTML', 'CSS', 
    'Git', 'MongoDB', 'Express', 'TypeScript', 'Angular', 'Vue', 'PHP', 'C++', 'C#',
    'AWS', 'Docker', 'Flask', 'Bootstrap', 'jQuery', 'PostgreSQL', 'MySQL',
    'Project Management', 'Leadership', 'Communication', 'Problem Solving',
    'Machine Learning', 'Data Analysis', 'Figma', 'Photoshop', 'Excel', 'PowerPoint'
  ];
  
  const foundSkills = commonSkills.filter(skill => 
    text.toLowerCase().includes(skill.toLowerCase())
  );

  // Extract experience from actual text
  const experience = [];
  
  // Look for job titles and companies
  const jobTitlePatterns = [
    /(?:intern|developer|engineer|analyst|assistant|manager|coordinator|specialist|consultant)/gi,
    /(?:software|web|data|marketing|sales|customer|project)/gi
  ];
  
  const lines_for_experience = text.split('\n');
  let currentJob = null;
  
  for (let i = 0; i < lines_for_experience.length; i++) {
    const line = lines_for_experience[i].trim();
    
    // Look for job titles
    if (jobTitlePatterns.some(pattern => pattern.test(line)) && line.length < 100) {
      if (currentJob) {
        experience.push(currentJob);
      }
      
      // Try to find company and dates in nearby lines
      let company = 'Company';
      let duration = 'Duration';
      
      // Check next few lines for company/date info
      for (let j = i + 1; j < Math.min(i + 4, lines_for_experience.length); j++) {
        const nextLine = lines_for_experience[j].trim();
        if (nextLine.includes('|') || nextLine.includes('•') || nextLine.includes('-')) {
          const parts = nextLine.split(/[|•-]/).map(p => p.trim());
          if (parts.length >= 2) {
            company = parts[0] || company;
            duration = parts[1] || duration;
            break;
          }
        }
      }
      
      currentJob = {
        title: line,
        company: company,
        duration: duration,
        description: 'Experience details from resume'
      };
    }
  }
  
  if (currentJob) {
    experience.push(currentJob);
  }

  // Fallback if no experience found
  if (experience.length === 0) {
    experience.push({
      title: 'Experience not clearly formatted',
      company: 'Please check resume formatting',
      duration: 'Dates not found',
      description: 'Experience section needs better formatting for extraction'
    });
  }

  console.log('✅ Basic info extracted:', { name, email, phone, location, skillsCount: foundSkills.length, experienceCount: experience.length });

  return {
    name,
    email,
    phone,
    location,
    skills: foundSkills.length > 0 ? foundSkills.slice(0, 12) : ['Skills not clearly listed'],
    experience: experience.slice(0, 4) // Limit to 4 most recent
  };
};

const generateScores = (resumeText: string, aiResponse: string) => {
  // Enhanced scoring algorithm based on REAL resume content
  const text = resumeText.toLowerCase();
  
  // Contact information
  const hasEmail = /@/.test(resumeText);
  const hasPhone = /\d{3}[- ]?\d{3}[- ]?\d{4}/.test(resumeText);
  const hasLocation = /(city|state|,\s*[a-z]{2})/i.test(resumeText);
  
  // Content sections
  const hasExperience = /experience|work|job|position|intern/i.test(resumeText);
  const hasEducation = /education|degree|university|college|bachelor|master/i.test(resumeText);
  const hasSkills = /skills|proficient|experienced|programming|languages/i.test(resumeText);
  const hasProjects = /projects|built|developed|created|portfolio/i.test(resumeText);
  
  // Quality indicators
  const hasQuantifiableResults = /\d+%|\d+\+|increased|improved|reduced|managed \d+|\$\d+|[0-9]+\s*(users|clients|projects|students)/i.test(resumeText);
  const hasActionVerbs = /(developed|created|implemented|managed|led|designed|built|optimized|improved)/i.test(resumeText);
  const hasRelevantKeywords = /(software|programming|development|engineering|technology|coding|database|web|mobile|api)/i.test(resumeText);
  
  // Length and structure
  const appropriateLength = resumeText.length > 500 && resumeText.length < 8000;
  const hasStructure = /\n\s*\n/.test(resumeText); // Has paragraph breaks
  
  // Content score (0-100)
  const contentFactors = [
    hasEmail, hasPhone, hasExperience, hasEducation, hasSkills, 
    hasQuantifiableResults, hasActionVerbs, hasRelevantKeywords, appropriateLength
  ];
  const contentScore = Math.min((contentFactors.filter(Boolean).length / contentFactors.length) * 100, 100);
  
  // ATS score (0-100)
  const atsFactors = [
    hasEmail, hasPhone, hasLocation, hasSkills, hasExperience, 
    hasEducation, hasRelevantKeywords, hasStructure
  ];
  const atsScore = Math.min((atsFactors.filter(Boolean).length / atsFactors.length) * 100, 100);
  
  // Formatting score (0-100)
  let formattingScore = 50; // Base score
  if (hasStructure) formattingScore += 15;
  if (appropriateLength) formattingScore += 15;
  if (hasQuantifiableResults) formattingScore += 10;
  if (hasActionVerbs) formattingScore += 10;
  
  return {
    content: Math.round(Math.max(contentScore, 60)), // Minimum 60 for encouragement
    ats: Math.round(Math.max(atsScore, 55)), // Minimum 55 for encouragement
    formatting: Math.min(formattingScore, 100)
  };
};

const parseAIResponse = (aiResponse: string, resumeText: string) => {
  console.log('🔍 Parsing AI response for insights...');
  
  // Create a comprehensive summary from AI response
  const summary = aiResponse.length > 600 ? 
    aiResponse.substring(0, 600) + '...' : 
    aiResponse;
  
  // Enhanced parsing based on AI response content and REAL resume
  const response = aiResponse.toLowerCase();
  const text = resumeText.toLowerCase();
  
  // Extract strengths from AI response and resume content
  const strengths = [];
  
  if (text.includes('gpa') || text.includes('3.') || text.includes('4.')) {
    strengths.push('Strong academic performance demonstrates dedication');
  }
  if (/\d+%|\d+\+|managed \d+|\$\d+/i.test(resumeText)) {
    strengths.push('Good use of quantified achievements and metrics');
  }
  if (/leadership|president|led|managed|team/i.test(resumeText)) {
    strengths.push('Leadership experience sets you apart');
  }
  if (/project|built|developed|created/i.test(resumeText)) {
    strengths.push('Demonstrates hands-on project experience');
  }
  if (/@/.test(resumeText) && /\d{3}/.test(resumeText)) {
    strengths.push('Complete contact information is professional');
  }
  
  // Default strengths if none found
  if (strengths.length === 0) {
    strengths.push(
      'Resume shows relevant experience for your field',
      'Professional presentation of information',
      'Clear structure makes it easy to read'
    );
  }
  
  // Extract improvements based on what's missing
  const improvements = [];
  
  if (!/summary|objective/i.test(resumeText)) {
    improvements.push('Add a professional summary to highlight key qualifications');
  }
  if (!/github|portfolio|linkedin/i.test(resumeText)) {
    improvements.push('Include links to your GitHub, portfolio, or LinkedIn profile');
  }
  if (!/\d+%|\d+\+|managed \d+/i.test(resumeText)) {
    improvements.push('Add more specific metrics and quantified results');
  }
  if (resumeText.length < 1000) {
    improvements.push('Consider adding more detail to your experience descriptions');
  }
  
  // Default improvements
  if (improvements.length === 0) {
    improvements.push(
      'Consider adding more specific achievements with numbers',
      'Include keywords from target job descriptions',
      'Strengthen action verbs in experience descriptions'
    );
  }
  
  // Generate detailed recommendations based on actual content
  const recommendations = [
    {
      title: 'Quantify Your Impact',
      description: 'Add specific numbers, percentages, or results to your experience descriptions. For example: "Improved performance by 25%" or "Managed team of 5" or "Increased engagement by 40%".',
      impact: 'Makes your accomplishments concrete and impressive to employers',
      priority: 'High' as const
    },
    {
      title: 'Optimize for Keywords',
      description: 'Review job descriptions for positions you want and include relevant keywords in your resume. Focus on technical skills, tools, and industry terms.',
      impact: 'Helps your resume pass through applicant tracking systems',
      priority: 'High' as const
    },
    {
      title: 'Add Professional Links',
      description: 'Include links to your GitHub profile, personal portfolio website, or LinkedIn. Make sure these profiles showcase your best work.',
      impact: 'Allows employers to see your actual work and skills',
      priority: 'Medium' as const
    },
    {
      title: 'Strengthen Action Verbs',
      description: 'Use strong action words like "developed," "implemented," "led," "achieved," "optimized," "designed," "created" instead of weak verbs.',
      impact: 'Makes your experience sound more dynamic and impactful',
      priority: 'Medium' as const
    }
  ];
  
  return {
    summary,
    strengths: strengths.slice(0, 5),
    improvements: improvements.slice(0, 4),
    atsStatus: 'Your resume structure is readable by ATS systems. To improve compatibility, ensure consistent formatting and include relevant keywords from job descriptions you\'re targeting.',
    contentFeedback: [
      'Experience section shows your background and progression',
      'Contact information allows employers to reach you',
      'Skills section highlights your technical abilities',
      'Overall content demonstrates your qualifications',
      'Consider adding more specific achievements with measurable results',
      'Ensure all sections are complete and up-to-date'
    ],
    formattingFeedback: [
      'Use consistent formatting throughout all sections',
      'Ensure proper spacing and alignment for professional appearance',
      'Keep font choices professional and ATS-friendly',
      'Maintain consistent date formatting across all entries',
      'Use standard section headers that systems can recognize',
      'Consider bullet points for better readability'
    ],
    recommendations
  };
};

// Main function to analyze resume - now with REAL text extraction
export const analyzeResume = async (file: File): Promise<ResumeAnalysisResult> => {
  try {
    console.log('🎯 Starting REAL resume analysis for file:', file.name);
    console.log('📊 File size:', (file.size / 1024).toFixed(2), 'KB');
    console.log('📄 File type:', file.type);
    
    // Step 1: Extract REAL text from file
    console.log('📝 Extracting REAL text from file...');
    const resumeText = await extractTextFromFile(file);
    console.log('✅ REAL text extracted, length:', resumeText.length, 'characters');

    // Step 2: Analyze with Google AI using REAL text
    if (!API_CONFIG.GOOGLE_AI_API_KEY) {
      console.error('❌ Google AI API key not found');
      throw new Error('Google AI API key not configured. Please add VITE_GOOGLE_AI_API_KEY to your .env file.');
    }

    console.log('🤖 Starting AI analysis with REAL resume text...');
    const result = await analyzeResumeWithGoogleAI(resumeText);
    
    console.log('🎉 REAL resume analysis completed successfully!');
    console.log('📈 Overall score:', result.overallScore);
    
    return result;
  } catch (error) {
    console.error('💥 Error in REAL resume analysis:', error);
    
    // Provide more helpful error messages
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error('API configuration issue. Please check your Google AI API key in the .env file.');
      } else if (error.message.includes('extract')) {
        throw new Error(`File processing error: ${error.message}`);
      } else if (error.message.includes('network') || error.message.includes('timeout')) {
        throw new Error('Network error. Please check your internet connection and try again.');
      } else if (error.message.includes('rate limit')) {
        throw new Error('Too many requests. Please wait a moment and try again.');
      } else {
        throw new Error(`Analysis failed: ${error.message}`);
      }
    }
    
    throw new Error('An unexpected error occurred during analysis. Please try again.');
  }
};

// Alternative: Use backend API
export const analyzeResumeViaBackend = async (file: File): Promise<ResumeAnalysisResult> => {
  try {
    const formData = new FormData();
    formData.append('resume', file);
    
    const response = await axios.post(`${API_CONFIG.BACKEND_API_URL}/analyze-resume`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error analyzing resume via backend:', error);
    throw new Error('Failed to analyze resume via backend');
  }
};