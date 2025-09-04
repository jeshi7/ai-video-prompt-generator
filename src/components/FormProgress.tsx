import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { FormData } from '../types';

interface FormProgressProps {
  formData: FormData;
}

interface ProgressItem {
  key: keyof FormData;
  label: string;
  isComplete: (data: FormData) => boolean;
  weight: number;
}

const progressItems: ProgressItem[] = [
  {
    key: 'initialPrompt',
    label: 'Initial Prompt',
    isComplete: (data) => data.initialPrompt.trim().length > 0,
    weight: 1
  },
  {
    key: 'scene',
    label: 'Scene Description',
    isComplete: (data) => data.scene.trim().length > 0,
    weight: 1
  },
  {
    key: 'character',
    label: 'Character Description',
    isComplete: (data) => data.character.trim().length > 0,
    weight: 1
  },
  {
    key: 'camera',
    label: 'Camera Settings',
    isComplete: (data) => Array.isArray(data.camera) ? data.camera.length > 0 : data.camera.trim().length > 0,
    weight: 1
  },
  {
    key: 'lighting',
    label: 'Lighting Setup',
    isComplete: (data) => Array.isArray(data.lighting) ? data.lighting.length > 0 : data.lighting.trim().length > 0,
    weight: 1
  },
  {
    key: 'style',
    label: 'Visual Style',
    isComplete: (data) => Array.isArray(data.style) ? data.style.length > 0 : data.style.trim().length > 0,
    weight: 1
  },
  {
    key: 'actionSteps',
    label: 'Action Sequence',
    isComplete: (data) => data.actionSteps.some(step => step.description.trim().length > 0),
    weight: 2
  },
  {
    key: 'referenceImages',
    label: 'Reference Media',
    isComplete: (data) => data.referenceImages.length > 0 || data.referenceVideos.length > 0,
    weight: 1
  }
];

export const FormProgress: React.FC<FormProgressProps> = ({ formData }) => {
  const completedItems = progressItems.filter(item => item.isComplete(formData));
  const totalWeight = progressItems.reduce((sum, item) => sum + item.weight, 0);
  const completedWeight = completedItems.reduce((sum, item) => sum + item.weight, 0);
  const progressPercentage = Math.round((completedWeight / totalWeight) * 100);

  const getProgressColor = (percentage: number) => {
    if (percentage < 30) return 'bg-red-500';
    if (percentage < 60) return 'bg-yellow-500';
    if (percentage < 90) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getProgressText = (percentage: number) => {
    if (percentage < 30) return 'Getting Started';
    if (percentage < 60) return 'Good Progress';
    if (percentage < 90) return 'Almost There';
    return 'Ready to Generate!';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">Form Progress</h3>
        <span className="text-sm font-medium text-gray-600">
          {progressPercentage}% Complete
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div 
          className={`h-2 rounded-full progress-bar ${getProgressColor(progressPercentage)}`}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Progress Text */}
      <p className="text-sm text-gray-600 mb-4">
        {getProgressText(progressPercentage)}
      </p>

      {/* Progress Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {progressItems.map((item) => {
          const isComplete = item.isComplete(formData);
          return (
            <div
              key={item.key}
              className={`flex items-center gap-2 text-sm ${
                isComplete ? 'text-green-700' : 'text-gray-500'
              }`}
            >
              {isComplete ? (
                <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
              ) : (
                <Circle size={16} className="text-gray-400 flex-shrink-0" />
              )}
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>

      {progressPercentage >= 90 && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 text-sm font-medium">
            🎉 Great job! Your prompt is ready to generate. Click "Generate JSON" below to create your video prompt.
          </p>
        </div>
      )}
    </div>
  );
};
