import { FormData, VideoPrompt } from '../types';

const formatArrayToString = (value: string | string[]): string => {
  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(', ') : '';
  }
  return value;
};

export const generateVideoPrompt = (formData: FormData): VideoPrompt => {
  const prompt: VideoPrompt = {
    scene: formData.scene,
    character: formData.character,
    camera: formatArrayToString(formData.camera),
    lighting: formatArrayToString(formData.lighting),
    style: formatArrayToString(formData.style),
    audio: {
      dialogue: formData.dialogue,
      sound_effects: formatArrayToString(formData.soundEffects),
      background_music: formatArrayToString(formData.backgroundMusic)
    },
    visuals: {
      reference_images: formData.referenceImages.filter(img => img.url.trim() !== ''),
      reference_videos: formData.referenceVideos.filter(vid => vid.url.trim() !== '')
    },
    negative_prompt: formatArrayToString(formData.negativePrompt),
    action_sequence: formData.actionSteps.filter(step => step.description.trim() !== '')
  };

  // Add transition information if provided
  const transitionStyle = formatArrayToString(formData.overallTransitionStyle || []);
  const transitionRhythm = formatArrayToString(formData.transitionRhythm || []);
  
  if (transitionStyle || transitionRhythm) {
    prompt.transitions = {
      between_scenes: transitionStyle,
      overall_rhythm: transitionRhythm
    };
  }

  return prompt;
};

export const generateAISuggestions = async (initialPrompt: string): Promise<Partial<FormData>> => {
  // This would integrate with an AI service like OpenAI
  // For now, we'll return some basic suggestions based on the prompt
  const suggestions: Partial<FormData> = {};
  
  const lowerPrompt = initialPrompt.toLowerCase();
  
  // Scene suggestions based on prompt
  if (lowerPrompt.includes('ad') || lowerPrompt.includes('commercial')) {
    suggestions.scene = "Professional commercial setting with clean, modern environment";
    suggestions.style = ["commercial style with high production values and polished aesthetics, emphasizing brand appeal and professional quality"];
    suggestions.camera = ["medium shot with rule of thirds composition, balancing character presence with environmental context"];
    suggestions.lighting = ["studio lighting with three-point setup, ensuring clean and professional presentation with controlled shadows"];
  } else if (lowerPrompt.includes('nature') || lowerPrompt.includes('outdoor')) {
    suggestions.scene = "Natural outdoor environment with beautiful landscapes";
    suggestions.style = ["cinematic style with film grain texture and color grading, evoking classic Hollywood production values and narrative depth"];
    suggestions.camera = ["establishing wide shot with deep focus, revealing the spatial relationship between characters and environment"];
    suggestions.lighting = ["natural daylight with soft diffusion, creating warm and inviting atmosphere with gentle shadow falloff"];
  } else if (lowerPrompt.includes('dramatic') || lowerPrompt.includes('emotional')) {
    suggestions.style = ["dramatic, tension-building"];
    suggestions.lighting = ["high contrast lighting with strong shadow definition, creating dramatic and moody atmosphere with bold chiaroscuro"];
    suggestions.camera = ["intimate close-up with shallow depth of field, isolating emotional expression and creating psychological proximity"];
  }
  
  // Character suggestions
  if (lowerPrompt.includes('auto parts') || lowerPrompt.includes('car')) {
    suggestions.character = "Professional mechanic or car enthusiast, wearing work clothes, confident and knowledgeable";
  } else if (lowerPrompt.includes('tech') || lowerPrompt.includes('software')) {
    suggestions.character = "Modern professional, wearing business casual attire, tech-savvy and innovative";
  }
  
  // Audio suggestions
  if (lowerPrompt.includes('ad') || lowerPrompt.includes('commercial')) {
    suggestions.backgroundMusic = ["upbeat, energetic background music"];
    suggestions.soundEffects = ["subtle ambient sounds, professional environment"];
  }
  
  return suggestions;
};

