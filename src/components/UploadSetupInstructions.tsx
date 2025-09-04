import React, { useState } from 'react';
import { Settings, ExternalLink, Copy, Check } from 'lucide-react';
import { SETUP_INSTRUCTIONS } from '../config/uploadConfig';

export const UploadSetupInstructions: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <Settings className="text-yellow-600 mt-1" size={20} />
        <div className="flex-1">
          <h3 className="text-yellow-800 font-semibold mb-2">
            📁 File Upload Setup Required
          </h3>
          <p className="text-yellow-700 text-sm mb-4">
            To upload files and get permanent URLs, you need to configure an upload service. 
            Choose one of the options below:
          </p>

          <div className="space-y-4">
            {/* ImgBB Setup */}
            <div className="bg-white rounded-lg p-4 border border-yellow-200">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                {SETUP_INSTRUCTIONS.IMGBB.title}
                <a 
                  href="https://api.imgbb.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                  title="Open ImgBB website"
                  aria-label="Open ImgBB website"
                >
                  <ExternalLink size={14} />
                </a>
              </h4>
              <ul className="text-sm text-gray-600 space-y-1 mb-3">
                {SETUP_INSTRUCTIONS.IMGBB.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mb-3">
                {SETUP_INSTRUCTIONS.IMGBB.benefits.map((benefit, index) => (
                  <span 
                    key={index}
                    className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                  >
                    {benefit}
                  </span>
                ))}
              </div>
              <div className="bg-gray-100 rounded p-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span>API_KEY: 'your-imgbb-api-key'</span>
                  <button
                    onClick={() => copyToClipboard('your-imgbb-api-key', 'imgbb-key')}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {copied === 'imgbb-key' ? <Check size={12} /> : <Copy size={12} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Cloudinary Setup */}
            <div className="bg-white rounded-lg p-4 border border-yellow-200">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                {SETUP_INSTRUCTIONS.CLOUDINARY.title}
                <a 
                  href="https://cloudinary.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                  title="Open Cloudinary website"
                  aria-label="Open Cloudinary website"
                >
                  <ExternalLink size={14} />
                </a>
              </h4>
              <ul className="text-sm text-gray-600 space-y-1 mb-3">
                {SETUP_INSTRUCTIONS.CLOUDINARY.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mb-3">
                {SETUP_INSTRUCTIONS.CLOUDINARY.benefits.map((benefit, index) => (
                  <span 
                    key={index}
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                  >
                    {benefit}
                  </span>
                ))}
              </div>
              <div className="space-y-2">
                <div className="bg-gray-100 rounded p-2 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span>CLOUD_NAME: 'your-cloudinary-cloud-name'</span>
                    <button
                      onClick={() => copyToClipboard('your-cloudinary-cloud-name', 'cloudinary-name')}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {copied === 'cloudinary-name' ? <Check size={12} /> : <Copy size={12} />}
                    </button>
                  </div>
                </div>
                <div className="bg-gray-100 rounded p-2 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span>UPLOAD_PRESET: 'your-upload-preset'</span>
                    <button
                      onClick={() => copyToClipboard('your-upload-preset', 'cloudinary-preset')}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {copied === 'cloudinary-preset' ? <Check size={12} /> : <Copy size={12} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Configuration File Location */}
            <div className="bg-gray-100 rounded-lg p-3">
              <h5 className="font-semibold text-gray-800 mb-2">Configuration File:</h5>
              <div className="bg-gray-200 rounded p-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span>src/config/uploadConfig.ts</span>
                  <button
                    onClick={() => copyToClipboard('src/config/uploadConfig.ts', 'config-path')}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {copied === 'config-path' ? <Check size={12} /> : <Copy size={12} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Note:</strong> Without proper configuration, files will only be stored locally for preview. 
              Configure an upload service to get permanent URLs that work in your AI video prompts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
