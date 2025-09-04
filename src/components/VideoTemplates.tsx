import React, { useState } from 'react';
import { Play, Star, Users, Briefcase, Heart, Zap, Camera } from 'lucide-react';
import { VideoFormData } from '../types';

interface VideoTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  data: Partial<VideoFormData>;
}

const templates: VideoTemplate[] = [
  {
    id: 'commercial',
    name: 'Product Commercial',
    description: 'Professional product advertisement with clean, modern aesthetic',
    icon: <Briefcase className="text-blue-600" size={20} />,
    category: 'Commercial',
    data: {
      scene: 'Modern, clean commercial setting with professional lighting and minimal distractions',
      character: 'Professional model or spokesperson, well-dressed, confident and approachable',
      camera: ['medium shot with rule of thirds composition, balancing character presence with environmental context', 'establishing wide shot with deep focus, revealing the spatial relationship between characters and environment'],
      lighting: ['studio lighting with three-point setup, ensuring clean and professional presentation with controlled shadows'],
      style: ['commercial style with high production values and polished aesthetics, emphasizing brand appeal and professional quality'],
      soundEffects: ['subtle ambient sounds, professional environment'],
      backgroundMusic: ['upbeat, energetic background music'],
      negativePrompt: ['blurry, low quality, distorted', 'cartoonish, animated, unrealistic']
    }
  },
  {
    id: 'documentary',
    name: 'Documentary Style',
    description: 'Authentic, real-world storytelling with natural lighting',
    icon: <Camera className="text-green-600" size={20} />,
    category: 'Documentary',
    data: {
      scene: 'Real-world environment with authentic, lived-in details and natural atmosphere',
      character: 'Real person in their natural environment, authentic clothing and expressions',
      camera: ['handheld shot with natural camera shake, creating documentary realism and emotional immediacy', 'medium shot with rule of thirds composition, balancing character presence with environmental context'],
      lighting: ['natural daylight with soft diffusion, creating warm and inviting atmosphere with gentle shadow falloff'],
      style: ['documentary style with verité aesthetics and natural lighting, creating authentic and unpolished realism'],
      soundEffects: ['natural ambient sounds, environmental audio'],
      backgroundMusic: ['ambient, atmospheric soundscape'],
      negativePrompt: ['artificial, synthetic, fake-looking', 'overexposed, too bright']
    }
  },
  {
    id: 'cinematic',
    name: 'Cinematic Drama',
    description: 'Film-like quality with dramatic lighting and composition',
    icon: <Star className="text-purple-600" size={20} />,
    category: 'Cinematic',
    data: {
      scene: 'Cinematic environment with dramatic composition and atmospheric details',
      character: 'Dramatic character with expressive features, wearing appropriate costume for the scene',
      camera: ['intimate close-up with shallow depth of field, isolating emotional expression and creating psychological proximity', 'low angle shot with upward perspective, creating psychological dominance and heroic framing'],
      lighting: ['high contrast lighting with strong shadow definition, creating dramatic and moody atmosphere with bold chiaroscuro'],
      style: ['cinematic style with film grain texture and color grading, evoking classic Hollywood production values and narrative depth'],
      soundEffects: ['dramatic ambient sounds, atmospheric audio'],
      backgroundMusic: ['dramatic, tension-building'],
      negativePrompt: ['cartoonish, animated, unrealistic', 'overexposed, too bright']
    }
  },
  {
    id: 'social',
    name: 'Social Media',
    description: 'Engaging, short-form content optimized for social platforms',
    icon: <Users className="text-pink-600" size={20} />,
    category: 'Social',
    data: {
      scene: 'Modern, trendy environment with vibrant colors and contemporary design',
      character: 'Relatable person with casual, trendy clothing and natural expressions',
      camera: ['medium shot with rule of thirds composition, balancing character presence with environmental context', 'intimate close-up with shallow depth of field, isolating emotional expression and creating psychological proximity'],
      lighting: ['natural daylight with soft diffusion, creating warm and inviting atmosphere with gentle shadow falloff'],
      style: ['commercial style with high production values and polished aesthetics, emphasizing brand appeal and professional quality'],
      soundEffects: ['upbeat ambient sounds, modern environment'],
      backgroundMusic: ['upbeat, energetic background music'],
      negativePrompt: ['blurry, low quality, distorted', 'harsh shadows, unflattering lighting']
    }
  },
  {
    id: 'romantic',
    name: 'Romantic Scene',
    description: 'Soft, intimate atmosphere with warm lighting',
    icon: <Heart className="text-red-600" size={20} />,
    category: 'Romance',
    data: {
      scene: 'Intimate, romantic setting with soft lighting and cozy atmosphere',
      character: 'Romantic couple or individual with soft, warm expressions and elegant clothing',
      camera: ['intimate close-up with shallow depth of field, isolating emotional expression and creating psychological proximity', 'medium shot with rule of thirds composition, balancing character presence with environmental context'],
      lighting: ['candlelight with warm flickering quality, creating intimate and romantic atmosphere with natural movement', 'golden hour lighting with warm color temperature, creating romantic and nostalgic mood with elongated shadows'],
      style: ['romantic style with soft lighting and warm color palette, creating intimate and emotionally resonant atmosphere'],
      soundEffects: ['soft ambient sounds, intimate environment'],
      backgroundMusic: ['romantic, soft and dreamy'],
      negativePrompt: ['harsh shadows, unflattering lighting', 'artificial, synthetic, fake-looking']
    }
  },
  {
    id: 'action',
    name: 'Action Sequence',
    description: 'Dynamic, high-energy content with movement and excitement',
    icon: <Zap className="text-orange-600" size={20} />,
    category: 'Action',
    data: {
      scene: 'Dynamic environment with movement, energy, and exciting visual elements',
      character: 'Action-oriented character with dynamic poses and energetic expressions',
      camera: ['handheld shot with natural camera shake, creating documentary realism and emotional immediacy', 'dynamic tilt shot with vertical movement, creating disorientation or dramatic emphasis'],
      lighting: ['high contrast lighting with strong shadow definition, creating dramatic and moody atmosphere with bold chiaroscuro'],
      style: ['action-packed style with dynamic movement and kinetic energy, creating excitement and adrenaline-fueled atmosphere'],
      soundEffects: ['dynamic ambient sounds, action environment'],
      backgroundMusic: ['dramatic, tension-building'],
      negativePrompt: ['blurry, low quality, distorted', 'motion blur, camera shake']
    }
  }
];

interface VideoTemplatesProps {
  onApplyTemplate: (template: Partial<VideoFormData>) => void;
}

export const VideoTemplates: React.FC<VideoTemplatesProps> = ({ onApplyTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isExpanded, setIsExpanded] = useState(false);

  const categories = ['All', ...Array.from(new Set(templates.map(t => t.category)))];
  const filteredTemplates = selectedCategory === 'All' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  const handleApplyTemplate = (template: VideoTemplate) => {
    onApplyTemplate(template.data);
    setIsExpanded(false);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-blue-800 font-semibold mb-1">🎬 Video Templates</h3>
          <p className="text-blue-700 text-sm">
            Start with a pre-built template for common video types
          </p>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="btn-secondary flex items-center gap-2"
        >
          <Play size={16} />
          {isExpanded ? 'Hide' : 'Show'} Templates
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map(template => (
              <div
                key={template.id}
                className="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer group"
                onClick={() => handleApplyTemplate(template)}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-shrink-0">
                    {template.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {template.name}
                    </h4>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {template.category}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  {template.description}
                </p>
                <button className="w-full btn-primary text-sm py-2">
                  Apply Template
                </button>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-blue-700 text-sm">
              <strong>💡 Tip:</strong> Templates provide a starting point with pre-configured settings. 
              You can modify any field after applying a template to customize it for your specific needs.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
