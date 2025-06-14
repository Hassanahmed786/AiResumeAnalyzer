import React from 'react';
import { FileText, Target, Award, CheckCircle, Users, Shield, Zap, Brain, Heart, Coffee } from 'lucide-react';

const AboutPage: React.FC = () => {
  const steps = [
    {
      icon: FileText,
      title: 'Upload Your Resume',
      description: 'Drag and drop your resume file (PDF or Word document). I support most common formats.'
    },
    {
      icon: Brain,
      title: 'AI Analysis',
      description: 'My AI reads through your resume and checks for common issues that students face.'
    },
    {
      icon: Target,
      title: 'Check Compatibility',
      description: 'I test how well your resume works with applicant tracking systems (ATS) that companies use.'
    },
    {
      icon: Award,
      title: 'Get Feedback',
      description: 'Receive specific suggestions on what to improve, add, or change in your resume.'
    }
  ];

  const whatWeCheck = [
    'Contact information is complete and professional',
    'Skills section includes relevant keywords',
    'Work experience uses strong action verbs',
    'Education section is properly formatted',
    'Overall layout is clean and readable',
    'File format works with job application systems',
    'Content is appropriate for your career level',
    'Achievements are quantified with numbers when possible'
  ];

  const commonIssues = [
    {
      issue: 'Missing Keywords',
      solution: 'I help you identify important keywords from job descriptions to include in your resume.'
    },
    {
      issue: 'Weak Action Verbs',
      solution: 'Replace passive language with strong action verbs that show your impact and achievements.'
    },
    {
      issue: 'Poor Formatting',
      solution: 'Ensure your resume is easy to read for both humans and applicant tracking systems.'
    },
    {
      issue: 'Lack of Quantification',
      solution: 'Add specific numbers, percentages, and metrics to demonstrate your accomplishments.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16 bg-white py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            How My Resume Checker Works
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            I use AI to analyze your resume just like a recruiter would, then give you specific tips to make it better.
          </p>
          <div className="bg-blue-50 rounded-xl p-6 text-left max-w-2xl mx-auto">
            <div className="flex items-start space-x-3">
              <Heart className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
              <div>
                <p className="text-gray-700 mb-2">
                  <strong>Hey there!</strong> I'm a developer who went through the same job search struggles you're facing. 
                  I built this tool because I wished I had something like this when I was applying for jobs.
                </p>
                <p className="text-gray-600 text-sm">
                  It's not perfect, but it catches the common mistakes I see in resumes and gives you actionable advice. 
                  Hope it helps! 🚀
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Simple 4-Step Process
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm relative">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <step.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="absolute -top-3 -left-3 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Check */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20 bg-white py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            What I Check in Your Resume
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whatWeCheck.map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Issues */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Common Issues I Help Fix
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {commonIssues.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-red-600 mb-3">❌ {item.issue}</h3>
                <p className="text-gray-700">✅ {item.solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy & Security */}
      <section className="px-4 sm:px-6 lg:px-8 bg-blue-50 py-16 mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Your Privacy Matters to Me
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6">
              <Shield className="h-8 w-8 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Secure Processing</h3>
              <p className="text-gray-600 text-sm">Your resume is encrypted during analysis</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <Zap className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Auto-Delete</h3>
              <p className="text-gray-600 text-sm">Files are automatically deleted after processing</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">No Signup</h3>
              <p className="text-gray-600 text-sm">Use the tool without creating an account</p>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Touch */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20 bg-white py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Built with Students in Mind
          </h2>
          <div className="bg-gray-50 rounded-xl p-8">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Coffee className="h-6 w-6 text-brown-600" />
              <span className="text-lg font-medium text-gray-700">Powered by lots of coffee and late nights</span>
            </div>
            <p className="text-gray-600 mb-4">
              I remember the stress of job applications, the uncertainty of whether my resume was good enough, 
              and the frustration of getting rejections without knowing why.
            </p>
            <p className="text-gray-600">
              This tool is my way of paying it forward. I hope it helps you land that dream job or internship! 
              If you have feedback or suggestions, I'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="bg-white rounded-lg shadow-sm">
            <div className="divide-y divide-gray-200">
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Is this really free?</h3>
                <p className="text-gray-600">Yes! This tool is completely free for students. No hidden fees, no premium versions. I built it to help, not to make money.</p>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">What file formats do you support?</h3>
                <p className="text-gray-600">I support PDF, DOCX, and DOC files up to 10MB in size.</p>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">How accurate is the AI feedback?</h3>
                <p className="text-gray-600">The AI is trained on successful resumes and common recruiter feedback. While not perfect, it catches most common issues students face. Think of it as a helpful friend reviewing your resume!</p>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Can I use this multiple times?</h3>
                <p className="text-gray-600">Absolutely! Upload different versions of your resume as many times as you want. I encourage iterating and improving!</p>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Do you store my resume?</h3>
                <p className="text-gray-600">Nope! Your resume is analyzed and then immediately deleted. I don't store any personal information or resume content.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;