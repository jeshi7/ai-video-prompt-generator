// Upload service configuration
// You can get these API keys from the respective services

export const UPLOAD_CONFIG = {
  // ImgBB (free image hosting) - Get API key from https://api.imgbb.com/
  IMGBB: {
    API_KEY: 'your-imgbb-api-key', // Replace with your actual API key
    ENABLED: false // Set to true when you have an API key
  },

  // Cloudinary (supports images and videos) - Get from https://cloudinary.com/
  CLOUDINARY: {
    CLOUD_NAME: 'your-cloudinary-cloud-name', // Replace with your cloud name
    UPLOAD_PRESET: 'your-upload-preset', // Replace with your upload preset
    ENABLED: false // Set to true when you have credentials
  },

  // File.io (fallback service)
  FILE_IO: {
    ENABLED: true // Always available as fallback
  },

  // File size limits
  LIMITS: {
    IMAGE_MAX_SIZE: 10 * 1024 * 1024, // 10MB
    VIDEO_MAX_SIZE: 100 * 1024 * 1024, // 100MB
  },

  // Allowed file types
  ALLOWED_TYPES: {
    IMAGES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
    VIDEOS: ['video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mov']
  }
};

// Instructions for setting up upload services
export const SETUP_INSTRUCTIONS = {
  IMGBB: {
    title: 'ImgBB Setup (Recommended for Images)',
    steps: [
      '1. Go to https://api.imgbb.com/',
      '2. Sign up for a free account',
      '3. Get your API key from the dashboard',
      '4. Replace "your-imgbb-api-key" in uploadConfig.ts',
      '5. Set IMGBB.ENABLED to true'
    ],
    benefits: ['Free', 'No file size limits', 'Fast uploads', 'Reliable hosting']
  },

  CLOUDINARY: {
    title: 'Cloudinary Setup (Recommended for Videos)',
    steps: [
      '1. Go to https://cloudinary.com/',
      '2. Sign up for a free account',
      '3. Get your cloud name from the dashboard',
      '4. Create an unsigned upload preset',
      '5. Replace credentials in uploadConfig.ts',
      '6. Set CLOUDINARY.ENABLED to true'
    ],
    benefits: ['Supports videos', 'Image transformations', 'CDN delivery', 'Analytics']
  }
};
