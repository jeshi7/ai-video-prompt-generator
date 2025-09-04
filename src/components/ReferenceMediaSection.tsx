import React, { useRef, useState } from 'react';
import { Plus, Trash2, Upload, Image, Video, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { ReferenceMedia } from '../types';
import { uploadService, UploadProgress } from '../services/uploadService';

interface ReferenceMediaSectionProps {
  title: string;
  items: ReferenceMedia[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, field: keyof ReferenceMedia, value: string) => void;
}

export const ReferenceMediaSection: React.FC<ReferenceMediaSectionProps> = ({
  title,
  items,
  onAdd,
  onRemove,
  onUpdate
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const isImageSection = title.toLowerCase().includes('image');
  const acceptedFileTypes = isImageSection 
    ? 'image/*' 
    : 'video/*';
  const maxFileSize = isImageSection ? 10 * 1024 * 1024 : 100 * 1024 * 1024; // 10MB for images, 100MB for videos

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file using the upload service
    const validation = uploadService.validateFile(file, isImageSection);
    if (!validation.valid) {
      setUploadError(validation.error || 'Invalid file');
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadProgress(null);
    setUploadSuccess(false);

    try {
      // Use the upload service to get a real URL
      const result = await uploadService.uploadFile(file, (progress) => {
        setUploadProgress(progress);
      });

      // Add the uploaded file as a new reference media item
      onAdd();
      const newIndex = items.length;
      onUpdate(newIndex, 'url', result.url);
      onUpdate(newIndex, 'description', `Uploaded ${isImageSection ? 'image' : 'video'}: ${file.name}`);
      
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000); // Hide success message after 3 seconds
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Failed to upload file. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const file = files.find(f => {
      const isValidType = isImageSection 
        ? f.type.startsWith('image/')
        : f.type.startsWith('video/');
      return isValidType;
    });

    if (file) {
      // Create a synthetic event to reuse the upload logic
      const syntheticEvent = {
        target: { files: [file] }
      } as React.ChangeEvent<HTMLInputElement>;
      handleFileUpload(syntheticEvent);
    } else {
      setUploadError(`Please drop a valid ${isImageSection ? 'image' : 'video'} file`);
    }
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={triggerFileUpload}
            disabled={isUploading}
            className="btn-primary flex items-center gap-2"
          >
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Uploading...
              </>
            ) : (
              <>
                <Upload size={16} />
                Upload {title.slice(0, -1)}
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onAdd}
            className="btn-secondary flex items-center gap-2"
          >
            <Plus size={16} />
            Add URL
          </button>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFileTypes}
        onChange={handleFileUpload}
        className="hidden"
        aria-label={`Upload ${title.slice(0, -1)}`}
      />

      {/* Upload progress */}
      {uploadProgress && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <p className="text-blue-600 text-sm font-medium">Uploading... {uploadProgress.percentage}%</p>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress.percentage}%` }}
              role="progressbar"
              aria-valuenow={uploadProgress.percentage.toString()}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label={`Upload progress: ${uploadProgress.percentage}%`}
            ></div>
          </div>
        </div>
      )}

      {/* Upload success message */}
      {uploadSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-600" size={16} />
            <p className="text-green-600 text-sm font-medium">File uploaded successfully!</p>
          </div>
        </div>
      )}

      {/* Upload error message */}
      {uploadError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="text-red-600" size={16} />
            <p className="text-red-600 text-sm">{uploadError}</p>
          </div>
        </div>
      )}
      
      {items.length === 0 ? (
        <div 
          className={`upload-area ${isDragOver ? 'dragover' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center gap-2">
            {isImageSection ? (
              <Image className="text-gray-400" size={32} />
            ) : (
              <Video className="text-gray-400" size={32} />
            )}
            <p>No {title.toLowerCase()} added yet</p>
            <p className="text-sm">Drag and drop files here, or use the upload button above</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-700">
                  {title.slice(0, -1)} #{index + 1}
                </h4>
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="text-red-500 hover:text-red-700 p-1"
                  title="Remove this item"
                  aria-label="Remove this item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              
              {/* Preview section */}
              {item.url && (
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Preview
                  </label>
                  <div className="media-preview">
                    {isImageSection ? (
                      <img
                        src={item.url}
                        alt="Reference preview"
                        className="max-w-full h-32 object-cover rounded"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <video
                        src={item.url}
                        className="max-w-full h-32 object-cover rounded"
                        controls
                        onError={(e) => {
                          const target = e.target as HTMLVideoElement;
                          target.style.display = 'none';
                        }}
                      />
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    URL
                  </label>
                  <input
                    type="url"
                    value={item.url}
                    onChange={(e) => onUpdate(index, 'url', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => onUpdate(index, 'description', e.target.value)}
                    placeholder="Brief description of the reference"
                    className="input-field"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
