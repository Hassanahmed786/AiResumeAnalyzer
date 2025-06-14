import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, Target, Award, Download, CheckCircle, ArrowRight, Users, Clock, Shield } from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: Upload,
      title: 'Easy Upload',
      description: 'Just drag and drop your resume - supports PDF and Word files'
    },
    {
      icon: Target,
      title: 'Smart Analysis',
      description: 'AI checks your resume for common issues and missing elements'
    },
    {
      icon: Award,
      title: 'Helpful Tips',
      description: 'Get specific suggestions to make your resume stand out'
    },
    {
      icon: Download,
      title: 'Save Results',
      description: 'Download a detailed report with all recommendations'
    }
  ];

  const benefits = [
    {
      icon: Users,
      title: 'Made by a Student, for Students',
      description: 'I built this because I know how stressful job hunting can be. Let me help you put your best foot forward!'
    },
    {
      icon: Clock,
      title: 'Quick Results',
      description: 'Get feedback in under 30 seconds - perfect when you\'re applying to multiple jobs'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your resume is analyzed securely and automatically deleted after processing'
    }
  ];

  const tips = [
    'Use action verbs like "developed," "managed," "created"',
    'Include specific numbers and achievements when possible',
    'Tailor your resume for each job application',
    'Keep it to 1-2 pages maximum',
    'Use a clean, readable format'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              100% Free for Students
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Get Your Resume
            <span className="block text-blue-600">Ready for Job Applications</span>
          </h1>
          <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
            Hey! 👋 I'm a developer who built this tool to help my friends and fellow students 
            get better at job applications.
          </p>
          <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
            Upload your resume and get instant AI feedback to help you land more interviews. 
            No signup required, completely free forever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/review"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg flex items-center space-x-2"
            >
              <span>Check My Resume</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/about"
              className="text-gray-700 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors duration-200"
            >
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">2,500+</div>
              <div className="text-gray-600">Students Helped</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">&lt;30s</div>
              <div className="text-gray-600">Average Analysis Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-gray-600">Free Forever</div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Story */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why I Built This
          </h2>
          <div className="bg-blue-50 rounded-xl p-8 text-left">
            <p className="text-lg text-gray-700 mb-4">
              "During my job search, I spent hours tweaking my resume and wondering if it was good enough. 
              I wished I had a friend who could give me honest feedback without judgment."
            </p>
            <p className="text-lg text-gray-700 mb-4">
              "So I built this tool to be that friend for other students. It's not perfect, but it catches 
              the common mistakes I see in resumes and gives you actionable advice to improve."
            </p>
            <p className="text-lg text-gray-700">
              "I hope it helps you land that dream job or internship! 🚀"
            </p>
            <div className="mt-6 text-right">
              <p className="text-gray-600 italic">- Your friendly neighborhood developer</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Helps */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How This Tool Helps You
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple, practical feedback to improve your resume and increase your chances of getting interviews.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Students Love It */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Students Love This Tool
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Quick Resume Tips
            </h2>
            <p className="text-gray-600">
              While you're here, check out these essential resume tips every student should know:
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Improve Your Resume?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Upload your resume now and get instant feedback to help you land more interviews.
          </p>
          <Link
            to="/review"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg inline-flex items-center space-x-2"
          >
            <span>Get Started - It's Free</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;