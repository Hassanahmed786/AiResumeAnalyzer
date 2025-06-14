import React from 'react';
import { FileText, Heart, Github, Mail, ExternalLink, User } from 'lucide-react';

const Footer: React.FC = () => {
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'your.email@example.com';
  const portfolioUrl = import.meta.env.VITE_PORTFOLIO_URL || 'https://yourportfolio.com';
  const githubUrl = import.meta.env.VITE_GITHUB_URL || 'https://github.com/yourusername';

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900">Resume Helper</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Hey there! 👋 I'm a developer who built this tool to help my friends and fellow students 
              improve their resumes. It's completely free because I believe everyone deserves a chance 
              to put their best foot forward in job applications.
            </p>
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>for students everywhere</span>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Get in Touch</h3>
            <div className="space-y-3">
              <p className="text-gray-600 text-sm">
                Have feedback, suggestions, or just want to say hi? I'd love to hear from you!
              </p>
              <div className="space-y-2">
                <a 
                  href={`mailto:${contactEmail}`}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200 text-sm"
                >
                  <Mail className="h-4 w-4" />
                  <span>{contactEmail}</span>
                </a>
                <a 
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                >
                  <Github className="h-4 w-4" />
                  <span>View the source code</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Portfolio Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">More About Me</h3>
            <div className="space-y-3">
              <p className="text-gray-600 text-sm">
                I'm passionate about building tools that help people succeed. 
                Check out my other projects and learn more about my work.
              </p>
              <a 
                href={portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
              >
                <User className="h-4 w-4" />
                <span>Visit My Portfolio</span>
                <ExternalLink className="h-4 w-4" />
              </a>
              <div className="text-xs text-gray-500">
                <p>Built with React, TypeScript, and lots of ☕</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500 text-center md:text-left">
              <p>
                This tool is designed to help students improve their resumes. 
                Your files are processed securely and never stored permanently.
              </p>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>© 2024</span>
              <span>•</span>
              <span>100% Free Forever</span>
              <span>•</span>
              <span>Privacy First</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;