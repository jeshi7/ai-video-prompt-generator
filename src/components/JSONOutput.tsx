import React, { useState } from 'react';
import { Copy, Check, Download } from 'lucide-react';
import { VideoPrompt } from '../types';

interface JSONOutputProps {
  prompt: VideoPrompt;
}

export const JSONOutput: React.FC<JSONOutputProps> = ({ prompt }) => {
  const [copied, setCopied] = useState(false);
  const jsonString = JSON.stringify(prompt, null, 2);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'video-prompt.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Generated JSON Output</h3>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="btn-secondary flex items-center gap-2"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy'}
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
      
      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
        <pre className="text-sm font-mono whitespace-pre-wrap">
          {jsonString}
        </pre>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-800 mb-2">How to use this JSON:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Copy the JSON above and paste it into your AI video generator (like Veo 3)</li>
          <li>• The JSON follows the exact structure expected by most AI video generation APIs</li>
          <li>• You can modify any field in the JSON before using it</li>
          <li>• Save the JSON file for future reference or reuse</li>
        </ul>
      </div>
    </div>
  );
};

