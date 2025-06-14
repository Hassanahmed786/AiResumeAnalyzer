import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import LoadingSpinner from '../components/LoadingSpinner';
import ResumeAnalysis from '../components/ResumeAnalysis';
import { analyzeResume, analyzeResumeViaBackend } from '../services/resumeAnalysisService';
import { mockAnalysisData } from '../utils/mockData';

const ReviewPage: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    setIsAnalyzing(true);
    setAnalysisData(null);
    setError(null);

    try {
      // Real implementation using Google AI
      const result = await analyzeResume(file);
      setAnalysisData(result);
      
      // Alternative options:
      // const result = await analyzeResumeViaBackend(file); // Backend API
      // setAnalysisData(mockAnalysisData); // Mock data for testing
      
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze resume');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNewUpload = () => {
    setUploadedFile(null);
    setAnalysisData(null);
    setIsAnalyzing(false);
    setError(null);
  };

  return (
    <div className="min-h-screen pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Check Your Resume
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload your resume and get instant AI feedback to help you improve it for job applications.
          </p>
        </div>

        {!uploadedFile && !isAnalyzing && !analysisData && (
          <FileUpload onFileUpload={handleFileUpload} />
        )}

        {isAnalyzing && (
          <LoadingSpinner />
        )}

        {error && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Analysis Failed</h3>
              <p className="text-red-700 mb-4">{error}</p>
              <button
                onClick={handleNewUpload}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {analysisData && (
          <ResumeAnalysis 
            data={analysisData} 
            fileName={uploadedFile?.name || 'resume.pdf'}
            onNewUpload={handleNewUpload}
          />
        )}
      </div>
    </div>
  );
};

export default ReviewPage;