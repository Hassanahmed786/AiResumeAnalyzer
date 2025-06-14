import React, { useState, useRef } from 'react';
import { Upload, FileText, AlertCircle, HelpCircle } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword'
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    setError(null);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      validateAndUploadFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const files = e.target.files;
    if (files && files.length > 0) {
      validateAndUploadFile(files[0]);
    }
  };

  const validateAndUploadFile = (file: File) => {
    // Check file type
    if (!acceptedTypes.includes(file.type)) {
      setError('Please upload a PDF or Word document (.pdf, .docx, .doc)');
      return;
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    onFileUpload(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 cursor-pointer ${
          isDragOver
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.doc"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-blue-600 p-4 rounded-full">
            <Upload className="h-8 w-8 text-white" />
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Upload Your Resume
            </h3>
            <p className="text-gray-600 mb-4">
              Drag and drop your resume here, or click to browse
            </p>
            <p className="text-sm text-gray-500">
              Supports PDF, DOCX, and DOC files (max 10MB)
            </p>
          </div>
          
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg">
            Choose File
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <FileText className="h-8 w-8 text-blue-600 mb-3" />
          <h4 className="font-semibold text-gray-900 mb-2">Quick Analysis</h4>
          <p className="text-gray-600 text-sm">Get feedback in under 30 seconds</p>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <Upload className="h-8 w-8 text-green-600 mb-3" />
          <h4 className="font-semibold text-gray-900 mb-2">Safe & Secure</h4>
          <p className="text-gray-600 text-sm">Your file is automatically deleted after analysis</p>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <HelpCircle className="h-8 w-8 text-purple-600 mb-3" />
          <h4 className="font-semibold text-gray-900 mb-2">Helpful Tips</h4>
          <p className="text-gray-600 text-sm">Get specific suggestions to improve your resume</p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;