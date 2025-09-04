import React, { useState } from 'react';
import { Sparkles, Wand2, Loader2, ArrowRight, CheckCircle } from 'lucide-react';
import { VideoFormData } from '../types';

interface AIMagicPromptProps {
  onApplyMagicPrompt: (formData: VideoFormData) => void;
}

export const AIMagicPrompt: React.FC<AIMagicPromptProps> = ({ onApplyMagicPrompt }) => {
  const [simplePrompt, setSimplePrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedData, setGeneratedData] = useState<VideoFormData | null>(null);

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

  const generateComprehensivePrompt = (prompt: string): VideoFormData => {
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
    const formData: VideoFormData = {
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

  const generateSceneDescription = (businessType: string, _location: string, businessName: string, isCinematic: boolean, isNeon: boolean): string => {
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
    // Veo 3 Meta Framework: Character with 15+ specific physical attributes for consistency
    const characterTemplates = {
      auto_mechanic: `Marcus, a 35-year-old African-American male with short black hair, brown eyes, strong jawline, athletic build (6'0", 180lbs), wearing navy blue work uniform with company logo, steel-toed boots, tool belt, confident posture, warm smile, professional demeanor, distinctive mechanic's hands with calluses, gold wedding ring, clean-shaven, approachable expression, authoritative voice with slight Southern accent`,
      restaurant: `Elena, a 28-year-old Hispanic female with long dark hair in a ponytail, hazel eyes, warm smile, petite build (5'4", 120lbs), wearing white chef's jacket, black pants, comfortable shoes, confident stance, passionate expression, professional grooming, minimal makeup, clean hands, silver necklace, energetic movements, clear speaking voice with slight Spanish accent`,
      retail: `David, a 32-year-old Caucasian male with styled brown hair, blue eyes, friendly face, medium build (5'10", 165lbs), wearing navy blazer, white shirt, dark jeans, polished shoes, confident posture, approachable smile, professional appearance, clean-shaven, neat grooming, silver watch, helpful gestures, clear articulate speech`,
      technology: `Sarah, a 29-year-old Asian-American female with shoulder-length black hair, dark brown eyes, intelligent expression, slim build (5'6", 130lbs), wearing modern blouse, dark jeans, comfortable sneakers, confident stance, innovative demeanor, professional grooming, minimal jewelry, tech-savvy appearance, clear communication style`,
      fitness: `Jake, a 26-year-old Caucasian male with short blonde hair, green eyes, athletic features, muscular build (6'2", 190lbs), wearing athletic shirt, workout shorts, running shoes, energetic posture, motivational expression, fit physique, clean grooming, fitness tracker, dynamic movements, enthusiastic voice`,
      general_business: `Alex, a 30-year-old mixed-race individual with professional hairstyle, brown eyes, confident features, average build (5'8", 150lbs), wearing business attire, polished shoes, professional posture, approachable smile, clean grooming, minimal accessories, confident gestures, clear articulate speech`
    };

    let character = characterTemplates[businessType as keyof typeof characterTemplates] || characterTemplates.general_business;
    
    if (isProfessional) {
      character += ', executive presence with polished appearance and business-appropriate styling';
    }

    return character;
  };

  const generateCameraOptions = (isCinematic: boolean, isNeon: boolean): string[] => {
    // Veo 3 Meta Framework: Camera positioning with explicit "(thats where the camera is)" syntax
    const baseOptions = [
      'medium shot with rule of thirds composition, balancing character presence with environmental context (thats where the camera is)',
      'establishing wide shot with deep focus, revealing the spatial relationship between characters and environment (thats where the camera is)'
    ];

    if (isCinematic) {
      baseOptions.push(
        'intimate close-up with shallow depth of field, isolating emotional expression and creating psychological proximity (thats where the camera is)',
        'low angle shot with upward perspective, creating psychological dominance and heroic framing (thats where the camera is)',
        'dolly in shot with smooth camera movement, creating emotional impact and intimacy control (thats where the camera is)'
      );
    }

    if (isNeon) {
      baseOptions.push(
        'dynamic tilt shot with vertical movement, creating disorientation or dramatic emphasis (thats where the camera is)',
        'handheld shot with natural camera shake, creating authenticity and energy (thats where the camera is)'
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
    // Veo 3 Meta Framework: Colon syntax prevents unwanted subtitles
    const dialogues = {
      auto_mechanic: `The mechanic looks directly at camera and says: "At ${businessName}, we provide reliable auto repair services with honest pricing and expert craftsmanship." His voice carries genuine confidence and expertise.`,
      restaurant: `The chef looks directly at camera and says: "Welcome to ${businessName}, where we serve fresh, locally-sourced ingredients with authentic flavors." Her voice carries passion and warmth.`,
      retail: `The sales associate looks directly at camera and says: "Discover quality products at ${businessName}. We're committed to providing excellent customer service." His voice carries helpful enthusiasm.`,
      technology: `The tech professional looks directly at camera and says: "Innovation meets excellence at ${businessName}. We deliver cutting-edge solutions with reliable support." Her voice carries confidence and expertise.`,
      fitness: `The trainer looks directly at camera and says: "Transform your fitness journey at ${businessName}. Our state-of-the-art facilities are here to help you achieve your goals." His voice carries motivation and energy.`,
      general_business: `The business professional looks directly at camera and says: "Experience the difference at ${businessName}. We're committed to providing exceptional service." Their voice carries confidence and professionalism.`
    };

    return dialogues[businessType as keyof typeof dialogues] || dialogues.general_business;
  };

  const generateSoundEffects = (businessType: string, isCinematic: boolean): string[] => {
    // Veo 3 Meta Framework: Audio hallucination prevention with specific environmental context
    const baseEffects = ['clean studio acoustics, professional microphone quality, minimal background noise, broadcast-standard clarity'];

    if (businessType === 'auto_mechanic') {
      baseEffects.push('mechanical sounds, tool usage, engine sounds, no unwanted background music, professional workshop ambiance');
    } else if (businessType === 'restaurant') {
      baseEffects.push('kitchen sounds, sizzling, ambient dining atmosphere, no audience sounds, professional restaurant ambiance');
    } else if (businessType === 'fitness') {
      baseEffects.push('equipment sounds, motivational atmosphere, no distracting music, professional gym ambiance');
    } else if (businessType === 'technology') {
      baseEffects.push('office sounds, keyboard typing, computer fans, no unwanted audio, professional tech environment');
    } else {
      baseEffects.push('professional environment sounds, no unwanted background music, clean audio quality');
    }

    if (isCinematic) {
      baseEffects.push('dramatic ambient sounds, atmospheric audio, no live studio audience, professional film quality');
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
    // Veo 3 Meta Framework: Comprehensive negative prompting for quality control
    const baseNegatives = [
      'subtitles, captions, watermark, text overlays, words on screen, logo, branding',
      'poor lighting, blurry footage, low resolution, artifacts, unwanted objects',
      'inconsistent character appearance, audio sync issues, amateur quality',
      'cartoon effects, unrealistic proportions, distorted hands, artificial lighting',
      'oversaturation, compression noise, camera shake, motion blur'
    ];

    if (isCinematic) {
      baseNegatives.push('amateur cinematography, poor composition, inconsistent lighting');
    }

    if (isNeon) {
      baseNegatives.push('dull colors, low contrast, muted tones, flat lighting');
    }

    return baseNegatives;
  };

  const generateActionSequence = (businessType: string, businessName: string, _isCinematic: boolean): any[] => {
    // Veo 3 Meta Framework: Optimized for 8-second duration with professional pacing
    const sequences = {
      auto_mechanic: [
        {
          step: 1,
          description: `Opening shot of ${businessName} exterior with professional signage and clean appearance, establishing credibility and trust`,
          transition: 'smooth cut to interior',
          duration: '2.5 seconds'
        },
        {
          step: 2,
          description: 'Mechanic working on vehicle with precision and expertise, showcasing professional service and technical competence',
          transition: 'cross dissolve',
          duration: '3 seconds'
        },
        {
          step: 3,
          description: 'Customer interaction showing trust and satisfaction with the service provided, building emotional connection',
          transition: 'fade to black',
          duration: '2.5 seconds'
        }
      ],
      restaurant: [
        {
          step: 1,
          description: `Wide shot of ${businessName} restaurant exterior with inviting atmosphere, creating appetite appeal`,
          transition: 'smooth cut to interior',
          duration: '2.5 seconds'
        },
        {
          step: 2,
          description: 'Chef preparing fresh ingredients with passion and culinary expertise, demonstrating quality and authenticity',
          transition: 'cross dissolve',
          duration: '3 seconds'
        },
        {
          step: 3,
          description: 'Customers enjoying their meal with satisfied expressions and warm atmosphere, showing social proof',
          transition: 'fade to black',
          duration: '2.5 seconds'
        }
      ],
      general_business: [
        {
          step: 1,
          description: `Establishing shot of ${businessName} business location with professional appearance, building authority`,
          transition: 'smooth cut to interior',
          duration: '2.5 seconds'
        },
        {
          step: 2,
          description: 'Staff providing excellent customer service with professional expertise, demonstrating competence',
          transition: 'cross dissolve',
          duration: '3 seconds'
        },
        {
          step: 3,
          description: 'Customer satisfaction and positive interaction showcasing business value, creating trust',
          transition: 'fade to black',
          duration: '2.5 seconds'
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
