import React from 'react';
import { FileText, Target, Award, Brain } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  const steps = [
    { icon: FileText, text: 'Reading your resume...' },
    { icon: Brain, text: 'Analyzing content...' },
    { icon: Target, text: 'Checking formatting...' },
    { icon: Award, text: 'Preparing feedback...' }
  ];

  const [currentStep, setCurrentStep] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 750);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <div className="bg-white rounded-2xl shadow-lg p-12">
        <div className="mb-8">
          <div className="relative">
            <div className="w-20 h-20 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-blue-600 rounded-full animate-pulse"></div>
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                <Brain className="h-8 w-8 text-blue-600 animate-bounce" />
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Analyzing Your Resume
        </h2>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`flex items-center justify-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                index === currentStep 
                  ? 'bg-blue-50 text-blue-700' 
                  : index < currentStep 
                    ? 'text-green-600' 
                    : 'text-gray-400'
              }`}
            >
              <step.icon className={`h-5 w-5 ${
                index === currentStep ? 'animate-pulse' : ''
              }`} />
              <span className="font-medium">{step.text}</span>
              {index < currentStep && (
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-sm text-gray-500">
          This usually takes 15-30 seconds...
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;