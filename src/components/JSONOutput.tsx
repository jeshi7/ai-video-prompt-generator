import React, { useState } from 'react';
import { Copy, Check, Download, FileText, Code, File } from 'lucide-react';
import { VideoPrompt } from '../types';

interface JSONOutputProps {
  prompt: VideoPrompt;
}

export const JSONOutput: React.FC<JSONOutputProps> = ({ prompt }) => {
  const [copied, setCopied] = useState(false);
  const [exportFormat, setExportFormat] = useState<'json' | 'yaml' | 'text'>('json');
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  
  const jsonString = JSON.stringify(prompt, null, 2);
  
  // Convert to YAML-like format
  const yamlString = convertToYAML(prompt);
  
  // Convert to plain text format
  const textString = convertToText(prompt);

  const getCurrentContent = () => {
    switch (exportFormat) {
      case 'yaml': return yamlString;
      case 'text': return textString;
      default: return jsonString;
    }
  };

  const getFileExtension = () => {
    switch (exportFormat) {
      case 'yaml': return 'yaml';
      case 'text': return 'txt';
      default: return 'json';
    }
  };

  const getMimeType = () => {
    switch (exportFormat) {
      case 'yaml': return 'text/yaml';
      case 'text': return 'text/plain';
      default: return 'application/json';
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getCurrentContent());
      setCopiedFormat(exportFormat);
      setTimeout(() => setCopiedFormat(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDownload = () => {
    const content = getCurrentContent();
    const blob = new Blob([content], { type: getMimeType() });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `video-prompt.${getFileExtension()}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Generated Video Prompt</h3>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="btn-secondary flex items-center gap-2"
          >
            {copiedFormat === exportFormat ? <Check size={16} /> : <Copy size={16} />}
            {copiedFormat === exportFormat ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={handleDownload}
            className="btn-secondary flex items-center gap-2"
          >
            <Download size={16} />
            Download
          </button>
        </div>
      </div>

      {/* Format Selection */}
      <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
        <button
          onClick={() => setExportFormat('json')}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            exportFormat === 'json'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Code size={16} />
          JSON
        </button>
        <button
          onClick={() => setExportFormat('yaml')}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            exportFormat === 'yaml'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <FileText size={16} />
          YAML
        </button>
        <button
          onClick={() => setExportFormat('text')}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            exportFormat === 'text'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <File size={16} />
          Text
        </button>
      </div>
      
      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
        <pre className="text-sm font-mono whitespace-pre-wrap">
          {getCurrentContent()}
        </pre>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-800 mb-2">How to use this prompt:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Copy the content above and paste it into your AI video generator (like Veo 3)</li>
          <li>• The format follows the structure expected by most AI video generation APIs</li>
          <li>• You can modify any field before using it</li>
          <li>• Save the file for future reference or reuse</li>
          <li>• Switch between JSON, YAML, and Text formats using the tabs above</li>
        </ul>
      </div>
    </div>
  );
};

// Helper functions for format conversion
const convertToYAML = (prompt: VideoPrompt): string => {
  const lines: string[] = [];
  
  lines.push('scene: |');
  lines.push(`  ${prompt.scene}`);
  lines.push('');
  
  lines.push('character: |');
  lines.push(`  ${prompt.character}`);
  lines.push('');
  
  lines.push('camera: |');
  lines.push(`  ${prompt.camera}`);
  lines.push('');
  
  lines.push('lighting: |');
  lines.push(`  ${prompt.lighting}`);
  lines.push('');
  
  lines.push('style: |');
  lines.push(`  ${prompt.style}`);
  lines.push('');
  
  lines.push('audio:');
  lines.push(`  dialogue: |`);
  lines.push(`    ${prompt.audio.dialogue}`);
  lines.push(`  sound_effects: |`);
  lines.push(`    ${prompt.audio.sound_effects}`);
  lines.push(`  background_music: |`);
  lines.push(`    ${prompt.audio.background_music}`);
  lines.push('');
  
  if (prompt.visuals.reference_images.length > 0) {
    lines.push('visuals:');
    lines.push('  reference_images:');
    prompt.visuals.reference_images.forEach((img, index) => {
      lines.push(`    - url: ${img.url}`);
      lines.push(`      description: ${img.description}`);
    });
    lines.push('');
  }
  
  if (prompt.visuals.reference_videos.length > 0) {
    if (!lines.includes('visuals:')) {
      lines.push('visuals:');
    }
    lines.push('  reference_videos:');
    prompt.visuals.reference_videos.forEach((vid, index) => {
      lines.push(`    - url: ${vid.url}`);
      lines.push(`      description: ${vid.description}`);
    });
    lines.push('');
  }
  
  lines.push('negative_prompt: |');
  lines.push(`  ${prompt.negative_prompt}`);
  lines.push('');
  
  if (prompt.action_sequence.length > 0) {
    lines.push('action_sequence:');
    prompt.action_sequence.forEach((step, index) => {
      lines.push(`  - step: ${step.step}`);
      lines.push(`    description: |`);
      lines.push(`      ${step.description}`);
      if (step.transition) {
        lines.push(`    transition: |`);
        lines.push(`      ${step.transition}`);
      }
      if (step.duration) {
        lines.push(`    duration: ${step.duration}`);
      }
    });
    lines.push('');
  }
  
  if (prompt.transitions) {
    lines.push('transitions:');
    lines.push(`  between_scenes: |`);
    lines.push(`    ${prompt.transitions.between_scenes}`);
    lines.push(`  overall_rhythm: |`);
    lines.push(`    ${prompt.transitions.overall_rhythm}`);
  }
  
  return lines.join('\n');
};

const convertToText = (prompt: VideoPrompt): string => {
  const lines: string[] = [];
  
  lines.push('VIDEO PROMPT');
  lines.push('='.repeat(50));
  lines.push('');
  
  lines.push('SCENE:');
  lines.push(prompt.scene);
  lines.push('');
  
  lines.push('CHARACTER:');
  lines.push(prompt.character);
  lines.push('');
  
  lines.push('CAMERA:');
  lines.push(prompt.camera);
  lines.push('');
  
  lines.push('LIGHTING:');
  lines.push(prompt.lighting);
  lines.push('');
  
  lines.push('STYLE:');
  lines.push(prompt.style);
  lines.push('');
  
  lines.push('AUDIO:');
  lines.push(`Dialogue: ${prompt.audio.dialogue}`);
  lines.push(`Sound Effects: ${prompt.audio.sound_effects}`);
  lines.push(`Background Music: ${prompt.audio.background_music}`);
  lines.push('');
  
  if (prompt.visuals.reference_images.length > 0) {
    lines.push('REFERENCE IMAGES:');
    prompt.visuals.reference_images.forEach((img, index) => {
      lines.push(`${index + 1}. ${img.url}`);
      lines.push(`   ${img.description}`);
    });
    lines.push('');
  }
  
  if (prompt.visuals.reference_videos.length > 0) {
    lines.push('REFERENCE VIDEOS:');
    prompt.visuals.reference_videos.forEach((vid, index) => {
      lines.push(`${index + 1}. ${vid.url}`);
      lines.push(`   ${vid.description}`);
    });
    lines.push('');
  }
  
  lines.push('NEGATIVE PROMPT:');
  lines.push(prompt.negative_prompt);
  lines.push('');
  
  if (prompt.action_sequence.length > 0) {
    lines.push('ACTION SEQUENCE:');
    prompt.action_sequence.forEach((step, index) => {
      lines.push(`Step ${step.step}: ${step.description}`);
      if (step.transition) {
        lines.push(`  Transition: ${step.transition}`);
      }
      if (step.duration) {
        lines.push(`  Duration: ${step.duration}`);
      }
      lines.push('');
    });
  }
  
  if (prompt.transitions) {
    lines.push('TRANSITIONS:');
    lines.push(`Between Scenes: ${prompt.transitions.between_scenes}`);
    lines.push(`Overall Rhythm: ${prompt.transitions.overall_rhythm}`);
  }
  
  return lines.join('\n');
};

