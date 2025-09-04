# File Upload Setup Guide

This guide will help you set up file upload functionality for the AI Video Prompt Generator. By default, the app only creates local URLs for preview. To get permanent URLs that work in your AI video prompts, you need to configure an upload service.

## Quick Setup Options

### Option 1: ImgBB (Recommended for Images)
**Free, Fast, and Easy Setup**

1. Go to [https://api.imgbb.com/](https://api.imgbb.com/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Open `src/config/uploadConfig.ts`
5. Replace `'your-imgbb-api-key'` with your actual API key
6. Set `IMGBB.ENABLED` to `true`

**Benefits:**
- ✅ Free
- ✅ No file size limits
- ✅ Fast uploads
- ✅ Reliable hosting

### Option 2: Cloudinary (Recommended for Videos)
**Supports Both Images and Videos**

1. Go to [https://cloudinary.com/](https://cloudinary.com/)
2. Sign up for a free account
3. Get your cloud name from the dashboard
4. Create an unsigned upload preset
5. Open `src/config/uploadConfig.ts`
6. Replace the placeholder values:
   - `'your-cloudinary-cloud-name'` with your cloud name
   - `'your-upload-preset'` with your upload preset
7. Set `CLOUDINARY.ENABLED` to `true`

**Benefits:**
- ✅ Supports videos
- ✅ Image transformations
- ✅ CDN delivery
- ✅ Analytics

## Configuration File

Edit `src/config/uploadConfig.ts`:

```typescript
export const UPLOAD_CONFIG = {
  // ImgBB Configuration
  IMGBB: {
    API_KEY: 'your-actual-api-key-here', // Replace this
    ENABLED: true // Set to true when configured
  },

  // Cloudinary Configuration
  CLOUDINARY: {
    CLOUD_NAME: 'your-actual-cloud-name', // Replace this
    UPLOAD_PRESET: 'your-actual-upload-preset', // Replace this
    ENABLED: true // Set to true when configured
  },

  // File.io (fallback - always available)
  FILE_IO: {
    ENABLED: true
  }
};
```

## How It Works

1. **Primary Service**: The app tries ImgBB first for images, Cloudinary for videos
2. **Fallback**: If the primary service fails, it falls back to file.io
3. **Local Preview**: Without configuration, files are stored locally for preview only

## File Limits

- **Images**: 10MB maximum
- **Videos**: 100MB maximum
- **Supported Formats**: 
  - Images: JPEG, PNG, GIF, WebP
  - Videos: MP4, WebM, OGG, AVI, MOV

## Testing Your Setup

1. Configure your chosen upload service
2. Restart the development server
3. Try uploading a file
4. Check that you get a permanent URL (not a local blob URL)
5. The URL should be accessible from anywhere

## Troubleshooting

### "No upload services configured" Error
- Make sure at least one service is enabled in `uploadConfig.ts`
- Verify your API keys are correct
- Check that `ENABLED` is set to `true`

### Upload Fails
- Check your internet connection
- Verify API key is valid
- Ensure file size is within limits
- Check browser console for detailed error messages

### Files Not Accessible
- Verify the uploaded URL works in a new browser tab
- Check that your upload service account is active
- Ensure the file hasn't expired (some services have expiration dates)

## Security Notes

- Never commit API keys to version control
- Consider using environment variables for production
- ImgBB and Cloudinary are trusted services with good security practices
- File.io is a fallback service with basic security

## Need Help?

- Check the browser console for error messages
- Verify your API keys are correct
- Test with smaller files first
- Ensure your upload service account is active

Once configured, you'll be able to upload files and get permanent URLs that work perfectly in your AI video generation prompts!
