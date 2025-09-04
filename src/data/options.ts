import { DropdownOption } from '../types';

export const cameraOptions: DropdownOption[] = [
  { value: "establishing wide shot with deep focus, revealing the spatial relationship between characters and environment (thats where the camera is)", label: "Establishing Wide Shot (Deep Focus)" },
  { value: "intimate close-up with shallow depth of field, isolating emotional expression and creating psychological proximity (thats where the camera is)", label: "Intimate Close-up (Shallow DOF)" },
  { value: "medium shot with rule of thirds composition, balancing character presence with environmental context (thats where the camera is)", label: "Medium Shot (Rule of Thirds)" },
  { value: "extreme close-up with macro detail, emphasizing symbolic or narrative significance of specific elements (thats where the camera is)", label: "Extreme Close-up (Macro Detail)" },
  { value: "low angle shot with upward perspective, creating psychological dominance and heroic framing (thats where the camera is)", label: "Low Angle (Heroic Perspective)" },
  { value: "high angle shot with downward perspective, establishing vulnerability and environmental scale (thats where the camera is)", label: "High Angle (Vulnerable Perspective)" },
  { value: "over-the-shoulder shot with shallow focus, creating spatial depth and character interaction (thats where the camera is)", label: "Over-the-Shoulder (Spatial Depth)" },
  { value: "fluid tracking shot with Steadicam movement, following character through space with cinematic grace (thats where the camera is)", label: "Tracking Shot (Steadicam)" },
  { value: "sweeping pan shot with horizontal movement, revealing narrative information through spatial exploration (thats where the camera is)", label: "Panning Shot (Spatial Reveal)" },
  { value: "dynamic tilt shot with vertical movement, creating disorientation or dramatic emphasis (thats where the camera is)", label: "Tilt Shot (Dynamic Emphasis)" },
  { value: "smooth dolly shot with forward/backward movement, creating psychological intimacy or distance (thats where the camera is)", label: "Dolly Shot (Psychological Distance)" },
  { value: "handheld shot with natural camera shake, creating documentary realism and emotional immediacy (thats where the camera is)", label: "Handheld (Documentary Realism)" },
  { value: "static shot with locked-off camera, emphasizing composition and allowing action to unfold within frame (thats where the camera is)", label: "Static Shot (Compositional Focus)" },
  { value: "bird's eye view with omniscient perspective, establishing spatial relationships and narrative overview (thats where the camera is)", label: "Bird's Eye (Omniscient View)" },
  { value: "dutch angle with tilted composition, creating psychological unease and narrative tension (thats where the camera is)", label: "Dutch Angle (Psychological Tension)" },
  { value: "rack focus shot transitioning between foreground and background elements, guiding viewer attention (thats where the camera is)", label: "Rack Focus (Attention Guide)" },
  { value: "crane shot with vertical movement, revealing scale and creating dramatic emphasis (thats where the camera is)", label: "Crane Shot (Dramatic Scale)" },
  { value: "whip pan with rapid horizontal movement, creating energy and temporal transition (thats where the camera is)", label: "Whip Pan (Temporal Transition)" }
];

export const lightingOptions: DropdownOption[] = [
  { value: "natural daylight with soft diffusion, creating warm and inviting atmosphere with gentle shadow falloff", label: "Natural Daylight (Soft Diffusion)" },
  { value: "golden hour lighting with warm color temperature, creating romantic and nostalgic mood with elongated shadows", label: "Golden Hour (Romantic Warmth)" },
  { value: "blue hour lighting with cool color palette, establishing mysterious and contemplative atmosphere", label: "Blue Hour (Mysterious Cool)" },
  { value: "neon lighting with high saturation and urban grit, creating vibrant and contemporary aesthetic", label: "Neon Lighting (Urban Vibrancy)" },
  { value: "studio lighting with three-point setup, ensuring clean and professional presentation with controlled shadows", label: "Studio Lighting (Three-Point)" },
  { value: "candlelight with warm flickering quality, creating intimate and romantic atmosphere with natural movement", label: "Candlelight (Intimate Flicker)" },
  { value: "moonlight with cool blue tones and soft shadows, establishing ethereal and dreamlike quality", label: "Moonlight (Ethereal Blue)" },
  { value: "firelight with dynamic flickering patterns, creating dramatic and primal atmosphere with warm color temperature", label: "Firelight (Dramatic Flicker)" },
  { value: "fluorescent lighting with harsh and clinical quality, creating sterile and institutional atmosphere", label: "Fluorescent (Clinical Harsh)" },
  { value: "LED lighting with crisp and modern quality, ensuring clean and contemporary aesthetic with precise color rendering", label: "LED Lighting (Modern Crisp)" },
  { value: "backlighting with rim light effect, creating silhouetted subjects and dramatic separation from background", label: "Backlighting (Silhouette Effect)" },
  { value: "side lighting with dramatic shadow play, creating depth and dimension with strong chiaroscuro effect", label: "Side Lighting (Chiaroscuro)" },
  { value: "rim lighting with edge glow, creating separation and three-dimensional quality with subtle halo effect", label: "Rim Lighting (Edge Glow)" },
  { value: "soft diffused lighting with minimal shadows, creating flattering and even illumination with gentle falloff", label: "Soft Diffused (Even Illumination)" },
  { value: "high contrast lighting with strong shadow definition, creating dramatic and moody atmosphere with bold chiaroscuro", label: "High Contrast (Bold Chiaroscuro)" },
  { value: "practical lighting with motivated sources, creating realistic and immersive atmosphere with natural light sources", label: "Practical Lighting (Motivated Sources)" },
  { value: "volumetric lighting with visible light rays, creating atmospheric depth and cinematic quality", label: "Volumetric Lighting (Atmospheric Rays)" },
  { value: "color temperature mixing with warm and cool sources, creating complex and layered lighting design", label: "Mixed Temperature (Layered Design)" }
];

export const styleOptions: DropdownOption[] = [
  { value: "cinematic style with film grain texture and color grading, evoking classic Hollywood production values and narrative depth", label: "Cinematic (Hollywood Production)" },
  { value: "documentary style with verité aesthetics and natural lighting, creating authentic and unpolished realism", label: "Documentary (Verité Realism)" },
  { value: "commercial style with high production values and polished aesthetics, emphasizing brand appeal and professional quality", label: "Commercial (High Production)" },
  { value: "artistic style with experimental composition and avant-garde techniques, pushing creative boundaries and visual innovation", label: "Artistic (Avant-garde)" },
  { value: "vintage style with film stock emulation and period-appropriate color palette, evoking nostalgic and retro aesthetics", label: "Vintage (Film Stock Emulation)" },
  { value: "futuristic style with sci-fi aesthetics and technological elements, creating speculative and otherworldly atmosphere", label: "Futuristic (Sci-fi Aesthetic)" },
  { value: "minimalist style with clean composition and negative space, emphasizing simplicity and visual clarity", label: "Minimalist (Clean Composition)" },
  { value: "maximalist style with rich detail and layered composition, creating visual complexity and sensory abundance", label: "Maximalist (Rich Detail)" },
  { value: "surreal style with dreamlike imagery and impossible elements, creating psychological and subconscious atmosphere", label: "Surreal (Dreamlike Imagery)" },
  { value: "hyperrealistic style with ultra-detailed rendering and photographic precision, creating uncanny and lifelike quality", label: "Hyperrealistic (Photographic Precision)" },
  { value: "cartoonish style with exaggerated proportions and vibrant colors, creating playful and animated aesthetic", label: "Cartoonish (Exaggerated Proportions)" },
  { value: "noir style with high contrast lighting and dark atmosphere, creating mystery and psychological tension", label: "Noir (High Contrast Mystery)" },
  { value: "romantic style with soft lighting and warm color palette, creating intimate and emotionally resonant atmosphere", label: "Romantic (Soft Intimacy)" },
  { value: "action-packed style with dynamic movement and kinetic energy, creating excitement and adrenaline-fueled atmosphere", label: "Action-packed (Kinetic Energy)" },
  { value: "melancholic style with muted colors and contemplative mood, creating introspective and emotionally complex atmosphere", label: "Melancholic (Contemplative Mood)" },
  { value: "expressionist style with distorted reality and emotional intensity, creating psychological and subjective perspective", label: "Expressionist (Emotional Distortion)" },
  { value: "impressionist style with painterly textures and atmospheric effects, creating artistic and ethereal quality", label: "Impressionist (Painterly Texture)" }
];

export const soundEffectOptions: DropdownOption[] = [
  { value: "footsteps on different surfaces", label: "Footsteps" },
  { value: "wind howling through trees", label: "Wind" },
  { value: "rain falling, gentle or heavy", label: "Rain" },
  { value: "thunder rumbling in distance", label: "Thunder" },
  { value: "birds chirping in background", label: "Birds" },
  { value: "traffic sounds, urban environment", label: "Traffic" },
  { value: "ocean waves crashing", label: "Ocean Waves" },
  { value: "fire crackling and popping", label: "Fire" },
  { value: "door creaking open", label: "Door Creaking" },
  { value: "glass breaking", label: "Glass Breaking" },
  { value: "phone ringing", label: "Phone Ringing" },
  { value: "clock ticking", label: "Clock Ticking" },
  { value: "heartbeat, slow and steady", label: "Heartbeat" },
  { value: "breathing, calm or heavy", label: "Breathing" },
  { value: "silence, complete absence of sound", label: "Silence" }
];

export const musicStyleOptions: DropdownOption[] = [
  { value: "upbeat, energetic background music", label: "Upbeat & Energetic" },
  { value: "melancholic, emotional soundtrack", label: "Melancholic" },
  { value: "epic, orchestral music", label: "Epic Orchestral" },
  { value: "ambient, atmospheric soundscape", label: "Ambient" },
  { value: "electronic, modern beats", label: "Electronic" },
  { value: "acoustic, organic instruments", label: "Acoustic" },
  { value: "jazz, smooth and sophisticated", label: "Jazz" },
  { value: "rock, powerful and driving", label: "Rock" },
  { value: "classical, timeless and elegant", label: "Classical" },
  { value: "folk, traditional and earthy", label: "Folk" },
  { value: "minimalist, sparse and clean", label: "Minimalist" },
  { value: "dramatic, tension-building", label: "Dramatic" },
  { value: "romantic, soft and dreamy", label: "Romantic" },
  { value: "mysterious, haunting melodies", label: "Mysterious" },
  { value: "no music, silence or natural sounds only", label: "No Music" }
];

export const negativePromptOptions: DropdownOption[] = [
  { value: "blurry, low quality, distorted", label: "Blurry/Low Quality" },
  { value: "cartoonish, animated, unrealistic", label: "Cartoonish" },
  { value: "overexposed, too bright", label: "Overexposed" },
  { value: "underexposed, too dark", label: "Underexposed" },
  { value: "grainy, noisy, poor resolution", label: "Grainy/Noisy" },
  { value: "artificial, synthetic, fake-looking", label: "Artificial" },
  { value: "cluttered, busy, distracting elements", label: "Cluttered" },
  { value: "inconsistent lighting", label: "Inconsistent Lighting" },
  { value: "poor composition, awkward framing", label: "Poor Composition" },
  { value: "unrealistic proportions", label: "Unrealistic Proportions" },
  { value: "harsh shadows, unflattering lighting", label: "Harsh Shadows" },
  { value: "motion blur, camera shake", label: "Motion Blur" },
  { value: "color distortion, unnatural colors", label: "Color Distortion" },
  { value: "text, watermarks, logos", label: "Text/Watermarks" },
  { value: "people, faces, human subjects", label: "People/Faces" }
];

export const transitionOptions: DropdownOption[] = [
  { value: "hard cut with immediate scene change, creating abrupt narrative shift and temporal discontinuity", label: "Hard Cut (Abrupt Shift)" },
  { value: "crossfade with gradual blend between scenes, creating smooth temporal transition and visual continuity", label: "Crossfade (Smooth Blend)" },
  { value: "dissolve with overlapping imagery, creating dreamlike transition and psychological connection between scenes", label: "Dissolve (Dreamlike Overlap)" },
  { value: "wipe transition with geometric pattern, creating dynamic movement and visual interest between scenes", label: "Wipe (Geometric Pattern)" },
  { value: "fade to black with complete darkness, creating dramatic pause and narrative emphasis", label: "Fade to Black (Dramatic Pause)" },
  { value: "fade from black with gradual revelation, creating anticipation and narrative introduction", label: "Fade from Black (Gradual Revelation)" },
  { value: "iris transition with circular reveal, creating vintage aesthetic and focused attention", label: "Iris (Circular Reveal)" },
  { value: "push transition with sliding movement, creating spatial relationship and directional flow", label: "Push (Sliding Movement)" },
  { value: "slide transition with horizontal movement, creating temporal progression and narrative flow", label: "Slide (Horizontal Flow)" },
  { value: "zoom transition with scale change, creating dramatic emphasis and spatial transformation", label: "Zoom (Scale Transformation)" },
  { value: "spin transition with rotational movement, creating disorientation and dynamic energy", label: "Spin (Rotational Energy)" },
  { value: "flip transition with 3D rotation, creating dimensional change and visual surprise", label: "Flip (3D Rotation)" },
  { value: "morph transition with shape transformation, creating seamless visual evolution and continuity", label: "Morph (Shape Evolution)" },
  { value: "match cut with visual similarity, creating thematic connection and narrative continuity", label: "Match Cut (Visual Similarity)" },
  { value: "jump cut with temporal discontinuity, creating energy and modern editing aesthetic", label: "Jump Cut (Temporal Discontinuity)" },
  { value: "L-cut with audio leading visual, creating smooth narrative flow and audio-visual continuity", label: "L-Cut (Audio Lead)" },
  { value: "J-cut with visual leading audio, creating anticipation and audio-visual preparation", label: "J-Cut (Visual Lead)" },
  { value: "smash cut with dramatic contrast, creating shock and narrative emphasis", label: "Smash Cut (Dramatic Contrast)" }
];

