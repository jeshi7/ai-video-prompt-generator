import { UPLOAD_CONFIG } from '../config/uploadConfig';

// File upload service using multiple providers for reliability
export interface UploadResult {
  url: string;
  publicId?: string;
  width?: number;
  height?: number;
  size?: number;
  format?: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

const IMGBB_UPLOAD_URL = 'https://api.imgbb.com/1/upload';

export class UploadService {
  private static instance: UploadService;
  
  public static getInstance(): UploadService {
    if (!UploadService.instance) {
      UploadService.instance = new UploadService();
    }
    return UploadService.instance;
  }

  // Upload to ImgBB (free service for images)
  async uploadToImgBB(file: File, onProgress?: (progress: UploadProgress) => void): Promise<UploadResult> {
    if (!UPLOAD_CONFIG.IMGBB.ENABLED || UPLOAD_CONFIG.IMGBB.API_KEY === 'your-imgbb-api-key') {
      throw new Error('ImgBB not configured. Please set up your API key.');
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('key', UPLOAD_CONFIG.IMGBB.API_KEY);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      // Track upload progress
      if (onProgress) {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const progress: UploadProgress = {
              loaded: event.loaded,
              total: event.total,
              percentage: Math.round((event.loaded / event.total) * 100)
            };
            onProgress(progress);
          }
        });
      }

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          try {
            const response = JSON.parse(xhr.responseText);
            if (response.success) {
              resolve({
                url: response.data.url,
                width: response.data.width,
                height: response.data.height,
                size: response.data.size,
                format: response.data.image?.format
              });
            } else {
              reject(new Error(response.error?.message || 'Upload failed'));
            }
          } catch (error) {
            reject(new Error('Failed to parse upload response'));
          }
        } else {
          reject(new Error(`Upload failed with status: ${xhr.status}`));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Network error during upload'));
      });

      xhr.open('POST', IMGBB_UPLOAD_URL);
      xhr.send(formData);
    });
  }

  // Upload to Cloudinary (supports both images and videos)
  async uploadToCloudinary(file: File, onProgress?: (progress: UploadProgress) => void): Promise<UploadResult> {
    if (!UPLOAD_CONFIG.CLOUDINARY.ENABLED || 
        UPLOAD_CONFIG.CLOUDINARY.CLOUD_NAME === 'your-cloudinary-cloud-name') {
      throw new Error('Cloudinary not configured. Please set up your credentials.');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_CONFIG.CLOUDINARY.UPLOAD_PRESET);
    formData.append('cloud_name', UPLOAD_CONFIG.CLOUDINARY.CLOUD_NAME);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      // Track upload progress
      if (onProgress) {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const progress: UploadProgress = {
              loaded: event.loaded,
              total: event.total,
              percentage: Math.round((event.loaded / event.total) * 100)
            };
            onProgress(progress);
          }
        });
      }

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve({
              url: response.secure_url,
              publicId: response.public_id,
              width: response.width,
              height: response.height,
              size: response.bytes,
              format: response.format
            });
          } catch (error) {
            reject(new Error('Failed to parse upload response'));
          }
        } else {
          reject(new Error(`Upload failed with status: ${xhr.status}`));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Network error during upload'));
      });

      xhr.open('POST', `https://api.cloudinary.com/v1_1/${UPLOAD_CONFIG.CLOUDINARY.CLOUD_NAME}/upload`);
      xhr.send(formData);
    });
  }

  // Fallback: Upload to a simple file hosting service
  async uploadToFileIO(file: File, onProgress?: (progress: UploadProgress) => void): Promise<UploadResult> {
    const formData = new FormData();
    formData.append('file', file);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      // Track upload progress
      if (onProgress) {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const progress: UploadProgress = {
              loaded: event.loaded,
              total: event.total,
              percentage: Math.round((event.loaded / event.total) * 100)
            };
            onProgress(progress);
          }
        });
      }

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          try {
            const response = JSON.parse(xhr.responseText);
            if (response.success) {
              resolve({
                url: response.link,
                size: file.size,
                format: file.type
              });
            } else {
              reject(new Error('Upload failed'));
            }
          } catch (error) {
            reject(new Error('Failed to parse upload response'));
          }
        } else {
          reject(new Error(`Upload failed with status: ${xhr.status}`));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Network error during upload'));
      });

      xhr.open('POST', 'https://file.io');
      xhr.send(formData);
    });
  }

  // Main upload method that tries multiple services
  async uploadFile(file: File, onProgress?: (progress: UploadProgress) => void): Promise<UploadResult> {
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    try {
      // For images, try ImgBB first
      if (isImage && UPLOAD_CONFIG.IMGBB.ENABLED) {
        return await this.uploadToImgBB(file, onProgress);
      }

      // For videos or if ImgBB fails, try Cloudinary
      if (UPLOAD_CONFIG.CLOUDINARY.ENABLED) {
        return await this.uploadToCloudinary(file, onProgress);
      }

      // Fallback to file.io
      if (UPLOAD_CONFIG.FILE_IO.ENABLED) {
        return await this.uploadToFileIO(file, onProgress);
      }

      throw new Error('No upload services configured. Please set up at least one upload service.');
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  }

  // Validate file before upload
  validateFile(file: File, isImage: boolean): { valid: boolean; error?: string } {
    const maxSize = isImage ? UPLOAD_CONFIG.LIMITS.IMAGE_MAX_SIZE : UPLOAD_CONFIG.LIMITS.VIDEO_MAX_SIZE;

    if (file.size > maxSize) {
      return {
        valid: false,
        error: `File size must be less than ${isImage ? '10MB' : '100MB'}`
      };
    }

    const isValidType = isImage 
      ? file.type.startsWith('image/')
      : file.type.startsWith('video/');
    
    if (!isValidType) {
      return {
        valid: false,
        error: `Please select a valid ${isImage ? 'image' : 'video'} file`
      };
    }

    return { valid: true };
  }
}

export const uploadService = UploadService.getInstance();
