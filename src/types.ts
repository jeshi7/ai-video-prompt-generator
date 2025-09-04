export interface VideoPrompt {
  scene: string;
  character: string;
  camera: string;
  lighting: string;
  style: string;
  audio: {
    dialogue: string;
    sound_effects: string;
    background_music: string;
  };
  visuals: {
    reference_images: ReferenceMedia[];
    reference_videos: ReferenceMedia[];
  };
  negative_prompt: string;
  action_sequence: ActionStep[];
  transitions?: {
    between_scenes: string;
    overall_rhythm: string;
  };
}

export interface ReferenceMedia {
  url: string;
  description: string;
}

export interface ActionStep {
  step: number;
  description: string;
  transition?: string;
  duration?: string;
}

export interface FormData {
  initialPrompt: string;
  scene: string;
  character: string;
  camera: string | string[];
  lighting: string | string[];
  style: string | string[];
  dialogue: string;
  soundEffects: string | string[];
  backgroundMusic: string | string[];
  referenceImages: ReferenceMedia[];
  referenceVideos: ReferenceMedia[];
  negativePrompt: string | string[];
  actionSteps: ActionStep[];
  overallTransitionStyle?: string | string[];
  transitionRhythm?: string | string[];
}

export interface DropdownOption {
  value: string;
  label: string;
}

