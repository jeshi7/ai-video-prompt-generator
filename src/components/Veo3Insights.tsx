import React, { useState } from 'react';
import { Info, CheckCircle, AlertTriangle, Lightbulb, Camera, Mic, Eye } from 'lucide-react';

export const Veo3Insights: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'techniques' | 'quality'>('overview');

  const insights = {
    overview: {
      title: "Veo 3 Meta Framework Integration",
      icon: <Info className="text-blue-600" size={20} />,
      content: (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
              <CheckCircle size={16} />
              Enhanced Character Consistency
            </h4>
            <p className="text-green-700 text-sm">
              Our AI Magic Prompt now generates characters with 15+ specific physical attributes including age, ethnicity, build, clothing, accessories, and distinctive features for maximum consistency across video generations.
            </p>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
              <Camera size={16} />
              Professional Camera Positioning
            </h4>
            <p className="text-blue-700 text-sm">
              All camera options now include explicit positioning syntax "(thats where the camera is)" which significantly improves Veo 3's understanding of spatial relationships and camera placement.
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
              <Mic size={16} />
              Audio Hallucination Prevention
            </h4>
            <p className="text-purple-700 text-sm">
              Enhanced audio specifications prevent unwanted background sounds, music, or audience reactions by explicitly defining expected environmental audio context.
            </p>
          </div>
        </div>
      )
    },
    techniques: {
      title: "Advanced Techniques Applied",
      icon: <Lightbulb className="text-yellow-600" size={20} />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Dialogue Format</h4>
              <p className="text-sm text-gray-600 mb-2">Colon syntax prevents subtitles:</p>
              <code className="text-xs bg-gray-100 p-2 rounded block">
                "The character looks directly at camera and says: 'dialogue here'"
              </code>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Camera Positioning</h4>
              <p className="text-sm text-gray-600 mb-2">Explicit positioning syntax:</p>
              <code className="text-xs bg-gray-100 p-2 rounded block">
                "medium shot with rule of thirds (thats where the camera is)"
              </code>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Audio Control</h4>
              <p className="text-sm text-gray-600 mb-2">Prevent hallucinations:</p>
              <code className="text-xs bg-gray-100 p-2 rounded block">
                "clean studio acoustics, no unwanted background music"
              </code>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Character Detail</h4>
              <p className="text-sm text-gray-600 mb-2">15+ attributes for consistency:</p>
              <code className="text-xs bg-gray-100 p-2 rounded block">
                "Marcus, 35-year-old African-American male with short black hair..."
              </code>
            </div>
          </div>
        </div>
      )
    },
    quality: {
      title: "Quality Assurance",
      icon: <Eye className="text-green-600" size={20} />,
      content: (
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
              <AlertTriangle size={16} />
              Comprehensive Negative Prompts
            </h4>
            <p className="text-red-700 text-sm mb-3">
              Enhanced negative prompting system prevents common quality issues:
            </p>
            <ul className="text-red-700 text-sm space-y-1">
              <li>• Subtitles, captions, watermarks, text overlays</li>
              <li>• Poor lighting, blurry footage, low resolution</li>
              <li>• Inconsistent character appearance, audio sync issues</li>
              <li>• Cartoon effects, unrealistic proportions, distorted hands</li>
              <li>• Oversaturation, compression noise, camera shake</li>
            </ul>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
              <CheckCircle size={16} />
              Professional Standards
            </h4>
            <p className="text-green-700 text-sm">
              All generated prompts now follow Veo 3 Meta Framework standards for professional video generation with optimized 8-second duration, proper pacing, and broadcast-quality specifications.
            </p>
          </div>
        </div>
      )
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2">
          {insights[activeTab].icon}
          <h3 className="text-lg font-bold text-indigo-800">{insights[activeTab].title}</h3>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-4">
        {Object.entries(insights).map(([key, insight]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as any)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === key
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50'
            }`}
          >
            {insight.title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[200px]">
        {insights[activeTab].content}
      </div>

      <div className="mt-4 p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
        <p className="text-indigo-800 text-sm">
          <strong>💡 Pro Tip:</strong> These Veo 3 Meta Framework optimizations are automatically applied when you use the "Let AI do the magic" feature. 
          The AI Magic Prompt now generates professional-grade prompts that follow industry best practices for maximum video generation success.
        </p>
      </div>
    </div>
  );
};
