import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { generateAISuggestions } from '../utils/generatePrompt';
import { FormData } from '../types';

interface AISuggestionsProps {
  initialPrompt: string;
  onApplySuggestions: (suggestions: Partial<FormData>) => void;
}

export const AISuggestions: React.FC<AISuggestionsProps> = ({
  initialPrompt,
  onApplySuggestions
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Partial<FormData> | null>(null);

  const handleGenerateSuggestions = async () => {
    if (!initialPrompt.trim()) return;
    
    setIsLoading(true);
    try {
      const aiSuggestions = await generateAISuggestions(initialPrompt);
      setSuggestions(aiSuggestions);
    } catch (error) {
      console.error('Error generating suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplySuggestions = () => {
    if (suggestions) {
      onApplySuggestions(suggestions);
      setSuggestions(null);
    }
  };

  if (!initialPrompt.trim()) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="text-purple-600" size={20} />
        <h3 className="font-semibold text-purple-800">AI-Powered Suggestions</h3>
      </div>
      
      <p className="text-sm text-purple-700 mb-4">
        Get AI-generated suggestions for your video prompt based on your initial description.
      </p>
      
      <div className="flex gap-2">
        <button
          onClick={handleGenerateSuggestions}
          disabled={isLoading}
          className="btn-primary flex items-center gap-2"
        >
          {isLoading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Sparkles size={16} />
          )}
          {isLoading ? 'Generating...' : 'Generate Suggestions'}
        </button>
        
        {suggestions && (
          <button
            onClick={handleApplySuggestions}
            className="btn-secondary"
          >
            Apply Suggestions
          </button>
        )}
      </div>
      
      {suggestions && (
        <div className="mt-4 p-3 bg-white rounded border border-purple-200">
          <h4 className="font-medium text-gray-800 mb-2">Generated Suggestions:</h4>
          <div className="space-y-2 text-sm">
            {suggestions.scene && (
              <div>
                <strong>Scene:</strong> {suggestions.scene}
              </div>
            )}
            {suggestions.character && (
              <div>
                <strong>Character:</strong> {suggestions.character}
              </div>
            )}
            {suggestions.style && (
              <div>
                <strong>Style:</strong> {suggestions.style}
              </div>
            )}
            {suggestions.camera && (
              <div>
                <strong>Camera:</strong> {suggestions.camera}
              </div>
            )}
            {suggestions.lighting && (
              <div>
                <strong>Lighting:</strong> {suggestions.lighting}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

