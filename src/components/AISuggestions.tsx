import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { generateAISuggestions } from '../utils/generatePrompt';
import { VideoFormData } from '../types';

interface AISuggestionsProps {
  initialPrompt: string;
  onApplySuggestions: (suggestions: Partial<VideoFormData>) => void;
}

export const AISuggestions: React.FC<AISuggestionsProps> = ({
  initialPrompt,
  onApplySuggestions
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Partial<VideoFormData> | null>(null);

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
        <div className="mt-4 p-4 bg-white rounded-lg border border-purple-200">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Sparkles size={16} className="text-purple-600" />
            Generated Suggestions:
          </h4>
          <div className="space-y-3 text-sm">
            {suggestions.scene && (
              <div className="p-2 bg-blue-50 rounded border-l-4 border-blue-400">
                <strong className="text-blue-800">Scene:</strong>
                <p className="text-blue-700 mt-1">{suggestions.scene}</p>
              </div>
            )}
            {suggestions.character && (
              <div className="p-2 bg-green-50 rounded border-l-4 border-green-400">
                <strong className="text-green-800">Character:</strong>
                <p className="text-green-700 mt-1">{suggestions.character}</p>
              </div>
            )}
            {suggestions.style && (
              <div className="p-2 bg-purple-50 rounded border-l-4 border-purple-400">
                <strong className="text-purple-800">Style:</strong>
                <div className="text-purple-700 mt-1">
                  {Array.isArray(suggestions.style) ? (
                    <ul className="list-disc list-inside space-y-1">
                      {suggestions.style.map((style, index) => (
                        <li key={index}>{style}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{suggestions.style}</p>
                  )}
                </div>
              </div>
            )}
            {suggestions.camera && (
              <div className="p-2 bg-orange-50 rounded border-l-4 border-orange-400">
                <strong className="text-orange-800">Camera:</strong>
                <div className="text-orange-700 mt-1">
                  {Array.isArray(suggestions.camera) ? (
                    <ul className="list-disc list-inside space-y-1">
                      {suggestions.camera.map((camera, index) => (
                        <li key={index}>{camera}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{suggestions.camera}</p>
                  )}
                </div>
              </div>
            )}
            {suggestions.lighting && (
              <div className="p-2 bg-yellow-50 rounded border-l-4 border-yellow-400">
                <strong className="text-yellow-800">Lighting:</strong>
                <div className="text-yellow-700 mt-1">
                  {Array.isArray(suggestions.lighting) ? (
                    <ul className="list-disc list-inside space-y-1">
                      {suggestions.lighting.map((lighting, index) => (
                        <li key={index}>{lighting}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{suggestions.lighting}</p>
                  )}
                </div>
              </div>
            )}
            {suggestions.soundEffects && (
              <div className="p-2 bg-indigo-50 rounded border-l-4 border-indigo-400">
                <strong className="text-indigo-800">Sound Effects:</strong>
                <div className="text-indigo-700 mt-1">
                  {Array.isArray(suggestions.soundEffects) ? (
                    <ul className="list-disc list-inside space-y-1">
                      {suggestions.soundEffects.map((sound, index) => (
                        <li key={index}>{sound}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{suggestions.soundEffects}</p>
                  )}
                </div>
              </div>
            )}
            {suggestions.backgroundMusic && (
              <div className="p-2 bg-pink-50 rounded border-l-4 border-pink-400">
                <strong className="text-pink-800">Background Music:</strong>
                <div className="text-pink-700 mt-1">
                  {Array.isArray(suggestions.backgroundMusic) ? (
                    <ul className="list-disc list-inside space-y-1">
                      {suggestions.backgroundMusic.map((music, index) => (
                        <li key={index}>{music}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{suggestions.backgroundMusic}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

