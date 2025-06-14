import React, { useState } from 'react';
import { Download, FileText, Target, Award, AlertTriangle, CheckCircle, TrendingUp, User, Calendar, MapPin, Phone, Mail, RefreshCw } from 'lucide-react';
import { generatePDFReport } from '../utils/pdfGenerator';

interface ResumeAnalysisProps {
  data: any;
  fileName: string;
  onNewUpload: () => void;
}

const ResumeAnalysis: React.FC<ResumeAnalysisProps> = ({ data, fileName, onNewUpload }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-green-600';
    if (score >= 60) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return 'Great job! Your resume looks strong.';
    if (score >= 60) return 'Good start! A few improvements will make it even better.';
    return 'Your resume needs some work, but we can help you fix it!';
  };

  const handleDownloadReport = () => {
    generatePDFReport(data, fileName);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Resume Analysis</h2>
            <p className="text-gray-600">File: {fileName}</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleDownloadReport}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg flex items-center space-x-2"
            >
              <Download className="h-5 w-5" />
              <span>Download Report</span>
            </button>
            <button
              onClick={onNewUpload}
              className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-2"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Check Another Resume</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Score Card */}
      <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-200">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
              <div 
                className={`absolute inset-0 rounded-full ${getScoreBackground(data.overallScore)}`}
                style={{
                  background: `conic-gradient(${data.overallScore >= 80 ? '#10B981' : data.overallScore >= 60 ? '#F59E0B' : '#EF4444'} ${data.overallScore * 3.6}deg, #E5E7EB 0deg)`
                }}
              ></div>
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                <span className={`text-3xl font-bold ${getScoreColor(data.overallScore)}`}>
                  {data.overallScore}%
                </span>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Overall Score</h3>
            <p className="text-gray-600 text-sm">{getScoreMessage(data.overallScore)}</p>
          </div>
          
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">Content Quality</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className={`h-2 rounded-full ${getScoreBackground(data.scores.content)}`} style={{ width: `${data.scores.content}%` }}></div>
                </div>
                <span className={`font-semibold ${getScoreColor(data.scores.content)}`}>{data.scores.content}%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">ATS Compatibility</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className={`h-2 rounded-full ${getScoreBackground(data.scores.ats)}`} style={{ width: `${data.scores.ats}%` }}></div>
                </div>
                <span className={`font-semibold ${getScoreColor(data.scores.ats)}`}>{data.scores.ats}%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">Formatting</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className={`h-2 rounded-full ${getScoreBackground(data.scores.formatting)}`} style={{ width: `${data.scores.formatting}%` }}></div>
                </div>
                <span className={`font-semibold ${getScoreColor(data.scores.formatting)}`}>{data.scores.formatting}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm mb-8 border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: FileText },
              { id: 'extracted', label: 'What We Found', icon: User },
              { id: 'feedback', label: 'Detailed Feedback', icon: Award },
              { id: 'recommendations', label: 'How to Improve', icon: TrendingUp }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    What's Working Well
                  </h4>
                  <ul className="space-y-1 text-green-700">
                    {data.strengths.map((strength: string, index: number) => (
                      <li key={index}>• {strength}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Areas to Improve
                  </h4>
                  <ul className="space-y-1 text-yellow-700">
                    {data.improvements.map((improvement: string, index: number) => (
                      <li key={index}>• {improvement}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  ATS Compatibility
                </h4>
                <p className="text-blue-700">{data.atsStatus}</p>
              </div>
            </div>
          )}

          {activeTab === 'extracted' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Contact Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">{data.extractedData.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">{data.extractedData.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">{data.extractedData.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">{data.extractedData.location}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Skills We Found</h4>
                  <div className="flex flex-wrap gap-2">
                    {data.extractedData.skills.map((skill: string, index: number) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Work Experience
                </h4>
                <div className="space-y-4">
                  {data.extractedData.experience.map((exp: any, index: number) => (
                    <div key={index} className="border-l-4 border-blue-600 pl-4">
                      <h5 className="font-semibold text-gray-900">{exp.title}</h5>
                      <p className="text-gray-700">{exp.company} | {exp.duration}</p>
                      <p className="text-gray-600 text-sm mt-1">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'feedback' && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">AI Analysis Summary</h4>
                <p className="text-gray-700 leading-relaxed">{data.aiSummary}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Content Feedback</h4>
                  <div className="space-y-3">
                    {data.detailedFeedback.content.map((feedback: string, index: number) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{feedback}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Formatting Feedback</h4>
                  <div className="space-y-3">
                    {data.detailedFeedback.formatting.map((feedback: string, index: number) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{feedback}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Top Recommendations</h4>
                <p className="text-gray-600 mb-4">
                  Here are the most important changes you can make to improve your resume:
                </p>
                <div className="space-y-4">
                  {data.recommendations.map((rec: any, index: number) => (
                    <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                          rec.priority === 'High' ? 'bg-red-600' : rec.priority === 'Medium' ? 'bg-yellow-600' : 'bg-green-600'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-semibold text-gray-900">{rec.title}</h5>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              rec.priority === 'High' ? 'bg-red-100 text-red-800' : 
                              rec.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-green-100 text-green-800'
                            }`}>
                              {rec.priority} Priority
                            </span>
                          </div>
                          <p className="text-gray-700 mb-2">{rec.description}</p>
                          <p className="text-sm text-gray-600 italic">💡 {rec.impact}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalysis;