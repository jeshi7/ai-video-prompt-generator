import React, { useState } from 'react';
import { Sparkles, Wand2, Loader2, ArrowRight, CheckCircle } from 'lucide-react';
import { FormData } from '../types';

interface AIMagicPromptProps {
  onApplyMagicPrompt: (formData: FormData) => void;
}

export const AIMagicPrompt: React.FC<AIMagicPromptProps> = ({ onApplyMagicPrompt }) => {
  const [simplePrompt, setSimplePrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedData, setGeneratedData] = useState<FormData | null>(null);

  const handleMagicGeneration = async () => {
    if (!simplePrompt.trim()) return;
    
    setIsGenerating(true);
    try {
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const magicData = generateComprehensivePrompt(simplePrompt);
      setGeneratedData(magicData);
    } catch (error) {
      console.error('Error generating magic prompt:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApplyMagic = () => {
    if (generatedData) {
      onApplyMagicPrompt(generatedData);
      setSimplePrompt('');
      setGeneratedData(null);
    }
  };

  const generateComprehensivePrompt = (prompt: string): FormData => {
    const lowerPrompt = prompt.toLowerCase();
    
    // Extract business type and location
    const businessType = extractBusinessType(lowerPrompt);
    const location = extractLocation(lowerPrompt);
    const businessName = extractBusinessName(prompt);
    
    // Determine style preferences
    const isCinematic = lowerPrompt.includes('cinematic') || lowerPrompt.includes('film');
    const isNeon = lowerPrompt.includes('neon') || lowerPrompt.includes('cyber');
    const isModern = lowerPrompt.includes('modern') || lowerPrompt.includes('contemporary');
    const isProfessional = lowerPrompt.includes('professional') || lowerPrompt.includes('corporate');
    
    // Generate comprehensive form data
    const formData: FormData = {
      initialPrompt: prompt,
      scene: generateSceneDescription(businessType, location, businessName, isCinematic, isNeon),
      character: generateCharacterDescription(businessType, isProfessional),
      camera: generateCameraOptions(isCinematic, isNeon),
      lighting: generateLightingOptions(isCinematic, isNeon, isModern),
      style: generateStyleOptions(isCinematic, isNeon, isModern, isProfessional),
      dialogue: generateDialogue(businessType, businessName),
      soundEffects: generateSoundEffects(businessType, isCinematic),
      backgroundMusic: generateBackgroundMusic(businessType, isCinematic, isNeon),
      referenceImages: [],
      referenceVideos: [],
      negativePrompt: generateNegativePrompt(isCinematic, isNeon),
      actionSteps: generateActionSequence(businessType, businessName, isCinematic),
      overallTransitionStyle: generateTransitionStyle(isCinematic, isNeon),
      transitionRhythm: generateTransitionRhythm(isCinematic, isNeon)
    };

    return formData;
  };

  const extractBusinessType = (prompt: string): string => {
    if (prompt.includes('auto') || prompt.includes('mechanic') || prompt.includes('car')) return 'auto_mechanic';
    if (prompt.includes('restaurant') || prompt.includes('food') || prompt.includes('cafe')) return 'restaurant';
    if (prompt.includes('clothing') || prompt.includes('fashion') || prompt.includes('store')) return 'retail';
    if (prompt.includes('tech') || prompt.includes('software') || prompt.includes('app')) return 'technology';
    if (prompt.includes('real estate') || prompt.includes('property')) return 'real_estate';
    if (prompt.includes('fitness') || prompt.includes('gym') || prompt.includes('health')) return 'fitness';
    return 'general_business';
  };

  const extractLocation = (prompt: string): string => {
    const locations = ['nairobi', 'mombasa', 'kisumu', 'nakuru', 'eldoret', 'thika', 'malindi', 'kitale'];
    for (const location of locations) {
      if (prompt.includes(location)) return location;
    }
    return 'urban_city';
  };

  const extractBusinessName = (prompt: string): string => {
    const words = prompt.split(' ');
    for (let i = 0; i < words.length; i++) {
      if (words[i].toLowerCase().includes('named') && i + 1 < words.length) {
        return words[i + 1].replace(/[.,!?]/g, '');
      }
    }
    return 'Business';
  };

  const generateSceneDescription = (businessType: string, location: string, businessName: string, isCinematic: boolean, isNeon: boolean): string => {
    const baseScenes = {
      auto_mechanic: `Professional auto repair shop with modern equipment, clean work bays, and organized tool storage. The ${businessName} garage features bright LED lighting, hydraulic lifts, and a customer waiting area with automotive magazines and refreshments.`,
      restaurant: `Cozy restaurant interior with warm lighting, wooden tables, and local artwork. The ${businessName} dining area features an open kitchen concept, fresh ingredients on display, and comfortable seating arrangements.`,
      retail: `Modern retail store with clean displays, organized product sections, and customer-friendly layout. The ${businessName} shop features bright lighting, clear signage, and attractive product presentations.`,
      technology: `Contemporary office space with modern workstations, large monitors, and collaborative areas. The ${businessName} tech environment features clean lines, natural light, and innovative design elements.`,
      fitness: `State-of-the-art fitness center with modern equipment, clean facilities, and motivating atmosphere. The ${businessName} gym features bright lighting, organized workout areas, and professional-grade equipment.`,
      general_business: `Professional business environment with modern office furniture, clean design, and welcoming atmosphere. The ${businessName} location features contemporary styling and professional presentation.`
    };

    let scene = baseScenes[businessType as keyof typeof baseScenes] || baseScenes.general_business;
    
    if (isCinematic) {
      scene += ` Cinematic composition with dramatic angles and professional film lighting.`;
    }
    
    if (isNeon) {
      scene += ` Neon accent lighting and cyberpunk-inspired design elements with vibrant colors.`;
    }

    return scene;
  };

  const generateCharacterDescription = (businessType: string, isProfessional: boolean): string => {
    const characters = {
      auto_mechanic: 'Experienced auto mechanic in clean work uniform, confident and knowledgeable, with friendly demeanor and professional appearance',
      restaurant: 'Chef or restaurant staff in clean uniform, passionate about food, with warm smile and professional presentation',
      retail: 'Friendly sales associate in professional attire, knowledgeable about products, with approachable personality and helpful attitude',
      technology: 'Tech professional in modern casual attire, innovative and confident, with approachable demeanor and expertise',
      fitness: 'Fitness trainer in athletic wear, energetic and motivating, with professional appearance and encouraging attitude',
      general_business: 'Professional business person in appropriate attire, confident and approachable, with friendly demeanor and expertise'
    };

    let character = characters[businessType as keyof typeof characters] || characters.general_business;
    
    if (isProfessional) {
      character += ' Professional presentation with polished appearance and business-appropriate styling.';
    }

    return character;
  };

  const generateCameraOptions = (isCinematic: boolean, isNeon: boolean): string[] => {
    const baseOptions = [
      'medium shot with rule of thirds composition, balancing character presence with environmental context',
      'establishing wide shot with deep focus, revealing the spatial relationship between characters and environment'
    ];

    if (isCinematic) {
      baseOptions.push(
        'intimate close-up with shallow depth of field, isolating emotional expression and creating psychological proximity',
        'low angle shot with upward perspective, creating psychological dominance and heroic framing'
      );
    }

    if (isNeon) {
      baseOptions.push(
        'dynamic tilt shot with vertical movement, creating disorientation or dramatic emphasis'
      );
    }

    return baseOptions;
  };

  const generateLightingOptions = (isCinematic: boolean, isNeon: boolean, isModern: boolean): string[] => {
    const baseOptions = [
      'natural daylight with soft diffusion, creating warm and inviting atmosphere with gentle shadow falloff'
    ];

    if (isCinematic) {
      baseOptions.push(
        'high contrast lighting with strong shadow definition, creating dramatic and moody atmosphere with bold chiaroscuro'
      );
    }

    if (isNeon) {
      baseOptions.push(
        'neon accent lighting with vibrant colors, creating futuristic and energetic atmosphere with bold color contrasts'
      );
    }

    if (isModern) {
      baseOptions.push(
        'studio lighting with three-point setup, ensuring clean and professional presentation with controlled shadows'
      );
    }

    return baseOptions;
  };

  const generateStyleOptions = (isCinematic: boolean, isNeon: boolean, isModern: boolean, isProfessional: boolean): string[] => {
    const baseOptions = ['commercial style with high production values and polished aesthetics, emphasizing brand appeal and professional quality'];

    if (isCinematic) {
      baseOptions.push('cinematic style with film grain texture and color grading, evoking classic Hollywood production values and narrative depth');
    }

    if (isNeon) {
      baseOptions.push('cyberpunk style with neon lighting and futuristic aesthetics, creating high-tech and energetic atmosphere');
    }

    if (isModern) {
      baseOptions.push('contemporary style with clean lines and modern design elements, emphasizing sophistication and current trends');
    }

    if (isProfessional) {
      baseOptions.push('corporate style with professional presentation and business-appropriate aesthetics, emphasizing trust and reliability');
    }

    return baseOptions;
  };

  const generateDialogue = (businessType: string, businessName: string): string => {
    const dialogues = {
      auto_mechanic: `"At ${businessName}, we provide reliable auto repair services with honest pricing and expert craftsmanship. Your vehicle is in good hands with our certified technicians."`,
      restaurant: `"Welcome to ${businessName}, where we serve fresh, locally-sourced ingredients with authentic flavors. Experience the taste of quality in every dish."`,
      retail: `"Discover quality products at ${businessName}. We're committed to providing excellent customer service and the best selection for your needs."`,
      technology: `"Innovation meets excellence at ${businessName}. We deliver cutting-edge solutions with reliable support and professional expertise."`,
      fitness: `"Transform your fitness journey at ${businessName}. Our state-of-the-art facilities and expert trainers are here to help you achieve your goals."`,
      general_business: `"Experience the difference at ${businessName}. We're committed to providing exceptional service and building lasting relationships with our customers."`
    };

    return dialogues[businessType as keyof typeof dialogues] || dialogues.general_business;
  };

  const generateSoundEffects = (businessType: string, isCinematic: boolean): string[] => {
    const baseEffects = ['subtle ambient sounds, professional environment'];

    if (businessType === 'auto_mechanic') {
      baseEffects.push('mechanical sounds, tool usage, engine sounds');
    } else if (businessType === 'restaurant') {
      baseEffects.push('kitchen sounds, sizzling, ambient dining atmosphere');
    } else if (businessType === 'fitness') {
      baseEffects.push('equipment sounds, motivational atmosphere');
    }

    if (isCinematic) {
      baseEffects.push('dramatic ambient sounds, atmospheric audio');
    }

    return baseEffects;
  };

  const generateBackgroundMusic = (businessType: string, isCinematic: boolean, isNeon: boolean): string[] => {
    const baseMusic = ['upbeat, energetic background music'];

    if (isCinematic) {
      baseMusic.push('dramatic, tension-building orchestral music');
    }

    if (isNeon) {
      baseMusic.push('electronic, synthwave-inspired music');
    }

    if (businessType === 'restaurant') {
      baseMusic.push('warm, inviting acoustic music');
    }

    return baseMusic;
  };

  const generateNegativePrompt = (isCinematic: boolean, isNeon: boolean): string[] => {
    const baseNegatives = ['blurry, low quality, distorted'];

    if (isCinematic) {
      baseNegatives.push('cartoonish, animated, unrealistic');
    }

    if (isNeon) {
      baseNegatives.push('dull colors, low contrast');
    }

    return baseNegatives;
  };

  const generateActionSequence = (businessType: string, businessName: string, isCinematic: boolean): any[] => {
    const sequences = {
      auto_mechanic: [
        {
          step: 1,
          description: `Opening shot of ${businessName} exterior with professional signage and clean appearance`,
          transition: 'smooth cut to interior',
          duration: '3 seconds'
        },
        {
          step: 2,
          description: 'Mechanic working on vehicle with precision and expertise, showcasing professional service',
          transition: 'cross dissolve',
          duration: '4 seconds'
        },
        {
          step: 3,
          description: 'Customer interaction showing trust and satisfaction with the service provided',
          transition: 'fade to black',
          duration: '3 seconds'
        }
      ],
      restaurant: [
        {
          step: 1,
          description: `Wide shot of ${businessName} restaurant exterior with inviting atmosphere`,
          transition: 'smooth cut to interior',
          duration: '3 seconds'
        },
        {
          step: 2,
          description: 'Chef preparing fresh ingredients with passion and culinary expertise',
          transition: 'cross dissolve',
          duration: '4 seconds'
        },
        {
          step: 3,
          description: 'Customers enjoying their meal with satisfied expressions and warm atmosphere',
          transition: 'fade to black',
          duration: '3 seconds'
        }
      ],
      general_business: [
        {
          step: 1,
          description: `Establishing shot of ${businessName} business location with professional appearance`,
          transition: 'smooth cut to interior',
          duration: '3 seconds'
        },
        {
          step: 2,
          description: 'Staff providing excellent customer service with professional expertise',
          transition: 'cross dissolve',
          duration: '4 seconds'
        },
        {
          step: 3,
          description: 'Customer satisfaction and positive interaction showcasing business value',
          transition: 'fade to black',
          duration: '3 seconds'
        }
      ]
    };

    return sequences[businessType as keyof typeof sequences] || sequences.general_business;
  };

  const generateTransitionStyle = (isCinematic: boolean, isNeon: boolean): string[] => {
    const baseTransitions = ['smooth cuts with professional pacing'];

    if (isCinematic) {
      baseTransitions.push('cinematic transitions with dramatic timing');
    }

    if (isNeon) {
      baseTransitions.push('dynamic transitions with energetic flow');
    }

    return baseTransitions;
  };

  const generateTransitionRhythm = (isCinematic: boolean, isNeon: boolean): string[] => {
    if (isCinematic) {
      return ['dramatic pacing with tension and release'];
    }
    
    if (isNeon) {
      return ['fast-paced rhythm with high energy'];
    }

    return ['medium-paced rhythm with professional flow'];
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 border-2 border-purple-200 rounded-xl p-6 mb-6">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Wand2 className="text-purple-600" size={28} />
          <h2 className="text-2xl font-bold text-purple-800">AI Magic Prompt</h2>
          <Sparkles className="text-purple-600" size={28} />
        </div>
        <p className="text-purple-700 text-lg">
          Just describe what you want, and let AI create a comprehensive video prompt for you!
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Simple Description
          </label>
          <textarea
            value={simplePrompt}
            onChange={(e) => setSimplePrompt(e.target.value)}
            placeholder="e.g., an ad for an auto mechanic store named EconoParts in Nairobi. Cinematic and Neon."
            className="w-full p-4 border-2 border-purple-200 rounded-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-200 resize-none"
            rows={3}
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleMagicGeneration}
            disabled={!simplePrompt.trim() || isGenerating}
            className="btn-primary flex items-center gap-3 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                AI is working its magic...
              </>
            ) : (
              <>
                <Wand2 size={20} />
                Let AI do the magic
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>

        {generatedData && (
          <div className="mt-6 p-4 bg-white rounded-lg border border-purple-200 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Sparkles size={16} className="text-purple-600" />
              AI Generated Comprehensive Prompt
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Scene:</strong> {generatedData.scene}</p>
              <p><strong>Character:</strong> {generatedData.character}</p>
              <p><strong>Style:</strong> {Array.isArray(generatedData.style) ? generatedData.style.join(', ') : generatedData.style}</p>
            </div>
            <button
              onClick={handleApplyMagic}
              className="mt-4 w-full btn-primary flex items-center justify-center gap-2"
            >
              <CheckCircle size={16} />
              Apply This Magic Prompt
            </button>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-2">✨ How it works:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Describe your video idea in simple terms</li>
            <li>• AI analyzes your description and extracts key elements</li>
            <li>• Generates a comprehensive prompt with all technical details</li>
            <li>• Automatically fills in scene, character, camera, lighting, and more</li>
            <li>• Perfect for quick starts or when you need inspiration</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
