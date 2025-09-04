# 🎬 AI Video Prompt Generator

A comprehensive web application for creating detailed JSON prompts for AI video generators like Veo 3 by Google. This tool helps you craft professional-grade video prompts with advanced features including file uploads, transition controls, and film theory-based options.

![AI Video Prompt Generator](https://img.shields.io/badge/AI-Video%20Prompt%20Generator-blue?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5+-646CFF?style=for-the-badge&logo=vite)

## ✨ Features

### 🎯 **Advanced Prompt Generation**
- **Multi-Selection Checkboxes**: Select multiple options for camera shots, lighting, styles, and more
- **Film Theory Language**: Professional terminology with detailed descriptions
- **Smart AI Suggestions**: Context-aware recommendations based on your initial prompt
- **Comprehensive Categories**: Camera, lighting, style, audio, transitions, and negative prompts

### 📁 **File Upload System**
- **Real URL Generation**: Upload images and videos to get permanent, working URLs
- **Multiple Upload Services**: ImgBB, Cloudinary, and File.io support
- **Drag & Drop Interface**: Intuitive file upload with progress tracking
- **File Validation**: Automatic type and size validation
- **Preview System**: Immediate preview of uploaded media

### 🎬 **Professional Video Controls**
- **18 Transition Types**: Hard cut, crossfade, dissolve, wipe, iris, and more
- **Transition Rhythm**: Control pacing with fast, medium, slow, or varied rhythms
- **Action Sequences**: Step-by-step video breakdown with individual transitions
- **Duration Control**: Precise timing for each scene

### 🎨 **Modern UI/UX**
- **Responsive Design**: Works perfectly on desktop and mobile
- **Accessibility**: Full ARIA support and keyboard navigation
- **Visual Feedback**: Progress bars, success states, and error handling
- **Professional Styling**: Clean, modern interface with smooth animations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-video-prompt-generator.git
   cd ai-video-prompt-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 File Upload Setup

To enable file uploads with permanent URLs, configure an upload service:

### Option 1: ImgBB (Recommended for Images)
1. Sign up at [api.imgbb.com](https://api.imgbb.com/)
2. Get your API key
3. Edit `src/config/uploadConfig.ts`
4. Replace `'your-imgbb-api-key'` with your actual key
5. Set `IMGBB.ENABLED` to `true`

### Option 2: Cloudinary (Recommended for Videos)
1. Sign up at [cloudinary.com](https://cloudinary.com/)
2. Get your cloud name and create an upload preset
3. Edit `src/config/uploadConfig.ts`
4. Replace placeholder values with your credentials
5. Set `CLOUDINARY.ENABLED` to `true`

See [UPLOAD_SETUP.md](UPLOAD_SETUP.md) for detailed instructions.

## 🎯 Usage

### 1. **Basic Prompt Creation**
- Enter your initial idea in "What do you want to create?"
- Use AI suggestions to get started quickly
- Fill in scene and character descriptions

### 2. **Advanced Configuration**
- **Camera**: Select up to 3 camera shots and movements
- **Lighting**: Choose up to 2 lighting styles
- **Style**: Pick up to 2 visual styles
- **Audio**: Configure dialogue, sound effects, and music
- **Transitions**: Set overall transition style and rhythm

### 3. **Reference Media**
- Upload images or videos for visual reference
- Add URLs for existing media
- Preview all uploaded content

### 4. **Action Sequences**
- Break down your video into steps
- Add transitions between scenes
- Set duration for each step

### 5. **Generate JSON**
- Click "Generate JSON" to create your prompt
- Copy the output for use in AI video generators
- Reset form to start over

## 📋 Example Output

```json
{
  "scene": "A modern auto repair shop with clean, professional environment",
  "character": "Professional mechanic wearing work clothes, confident and knowledgeable",
  "camera": "establishing wide shot with deep focus, revealing the spatial relationship between characters and environment, medium shot with rule of thirds composition, balancing character presence with environmental context",
  "lighting": "natural daylight with soft diffusion, creating warm and inviting atmosphere with gentle shadow falloff, studio lighting with three-point setup, ensuring clean and professional presentation with controlled shadows",
  "style": "commercial style with high production values and polished aesthetics, emphasizing brand appeal and professional quality",
  "audio": {
    "dialogue": "Welcome to our auto repair shop, where quality meets reliability",
    "sound_effects": "subtle ambient sounds, professional environment, tools working in background",
    "background_music": "upbeat, energetic background music"
  },
  "visuals": {
    "reference_images": [
      {
        "url": "https://example.com/auto-shop-reference.jpg",
        "description": "Modern auto repair shop interior"
      }
    ],
    "reference_videos": []
  },
  "negative_prompt": "blurry, low quality, distorted, cartoonish, animated, unrealistic",
  "action_sequence": [
    {
      "step": 1,
      "description": "Wide establishing shot of the auto repair shop exterior",
      "transition": "crossfade with gradual blend between scenes, creating smooth temporal transition and visual continuity",
      "duration": "3 seconds"
    },
    {
      "step": 2,
      "description": "Medium shot of mechanic working on engine",
      "transition": "hard cut with immediate scene change, creating abrupt narrative shift and temporal discontinuity",
      "duration": "5 seconds"
    }
  ],
  "transitions": {
    "between_scenes": "crossfade with gradual blend between scenes, creating smooth temporal transition and visual continuity",
    "overall_rhythm": "medium-paced with balanced transitions, creating steady narrative flow"
  }
}
```

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **File Upload**: Custom service with multiple providers
- **State Management**: React Hooks

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── FormField.tsx   # Reusable form field with checkbox support
│   ├── ReferenceMediaSection.tsx  # File upload and media management
│   ├── ActionSequenceSection.tsx  # Video sequence builder
│   ├── JSONOutput.tsx  # JSON display and copy functionality
│   ├── AISuggestions.tsx  # AI-powered suggestions
│   └── UploadSetupInstructions.tsx  # Upload service setup guide
├── services/           # External services
│   └── uploadService.ts  # File upload service with multiple providers
├── config/            # Configuration files
│   └── uploadConfig.ts  # Upload service configuration
├── data/              # Static data
│   └── options.ts     # Dropdown options with film theory language
├── hooks/             # Custom React hooks
│   └── useFormData.ts # Form state management
├── utils/             # Utility functions
│   └── generatePrompt.ts  # JSON generation logic
└── types.ts           # TypeScript type definitions
```

## 🎨 Customization

### Adding New Options
Edit `src/data/options.ts` to add new camera shots, lighting styles, or other options:

```typescript
export const cameraOptions: DropdownOption[] = [
  { 
    value: "your new camera technique with detailed description", 
    label: "Your New Camera Technique" 
  },
  // ... existing options
];
```

### Styling
The app uses Tailwind CSS. Customize styles in `src/index.css` or modify component classes.

### Upload Services
Add new upload services by extending the `UploadService` class in `src/services/uploadService.ts`.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Veo 3 by Google** for inspiring this prompt generator
- **Film Theory Community** for the professional terminology
- **Open Source Community** for the amazing tools and libraries

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/ai-video-prompt-generator/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/ai-video-prompt-generator/discussions)
- **Documentation**: Check the `/docs` folder for detailed guides

---

**Made with ❤️ for the AI video generation community**

*Create professional video prompts with ease and precision.*