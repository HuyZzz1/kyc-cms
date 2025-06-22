// Utility functions for image processing in the eKYC application

/**
 * Validates a base64 image string
 * @param {string} base64String - The base64 string to validate
 * @param {string} mimeType - Optional mime type to check against (e.g., 'image/jpeg')
 * @returns {boolean} - Whether the string is a valid base64 image
 */
export const isValidBase64Image = (base64String, mimeType = null) => {
  if (!base64String || typeof base64String !== 'string') {
    return false;
  }
  
  // Check for data URL format
  const dataUrlRegex = /^data:([a-z]+\/[a-z0-9-+.]+);base64,([a-zA-Z0-9+/=]+)$/;
  const matches = base64String.match(dataUrlRegex);
  
  if (!matches) {
    return false;
  }
  
  // If mime type is specified, check it matches
  if (mimeType && matches[1] !== mimeType) {
    return false;
  }
  
  try {
    // Check if the base64 part is valid by trying to decode it
    atob(matches[2]);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Converts a base64 string to a Blob object
 * @param {string} base64String - The base64 string to convert
 * @returns {Blob} - A Blob representation of the image
 */
export const base64ToBlob = (base64String) => {
  // Extract content type and base64 data
  const parts = base64String.split(';base64,');
  const contentType = parts[0].split(':')[1];
  const rawBase64 = parts[1];
  
  // Convert base64 to binary
  const binaryString = atob(rawBase64);
  const bytes = new Uint8Array(binaryString.length);
  
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  // Create and return Blob
  return new Blob([bytes], { type: contentType });
};

/**
 * Optimizes a canvas for JPEG output
 * @param {HTMLCanvasElement} canvas - The canvas to optimize
 * @param {number} quality - JPEG quality (0-1)
 * @returns {string} - Optimized base64 JPEG data URL
 */
export const optimizeCanvasForJpeg = (canvas, quality = 0.9) => {
  // Create a temporary canvas for optimization
  const tempCanvas = document.createElement('canvas');
  const ctx = tempCanvas.getContext('2d');
  
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  
  // Draw with white background to remove transparency
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
  
  // Draw original canvas on top
  ctx.drawImage(canvas, 0, 0);
  
  // Return as optimized JPEG
  return tempCanvas.toDataURL('image/jpeg', quality);
};
